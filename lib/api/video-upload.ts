/**
 * Direct (multipart) video upload
 *
 * Uploads a video straight to storage using presigned part URLs:
 *   1. POST /uploads/video-multipart/init      -> presigned PUT URL per part
 *   2. PUT each part to its URL (parallel, individually retried)
 *   3. POST /uploads/video-multipart/complete  -> backend assembles + validates
 * If anything fails after init, POST /uploads/video-multipart/abort discards the parts.
 */

import axios from 'axios';
import { apiClient, apiConfiguration } from './client';
import { UploadApiFactory } from './generated/api/upload-api';
import type { ModelsMultipartPartURL, ModelsVideoUploadResponse } from './generated/models';
import { ModelsVideoMultipartInitRequestPurposeEnum } from './generated/models';

export type VideoUploadPurpose = ModelsVideoMultipartInitRequestPurposeEnum;
export const VideoUploadPurpose = ModelsVideoMultipartInitRequestPurposeEnum;

export interface UploadVideoOptions {
  file: File;
  purpose: VideoUploadPurpose;
  /** Required when purpose is 'submission' */
  gigId?: string;
  /** Overall progress, 0-100. Reaches 100 only once the backend has accepted the video. */
  onProgress?: ( percent: number ) => void;
  signal?: AbortSignal;
}

const PART_CONCURRENCY = 4;
const PART_MAX_ATTEMPTS = 3;
const PART_RETRY_BASE_DELAY_MS = 1000;
const COMPLETE_MAX_ATTEMPTS = 3;
const PART_TIMEOUT_MS = 30 * 60 * 1000;

const CONTENT_TYPE_BY_EXTENSION: Record<string, string> = {
  mp4: 'video/mp4',
  mov: 'video/quicktime',
  webm: 'video/webm',
  avi: 'video/x-msvideo',
};

function resolveContentType( file: File ): string {
  if ( file.type ) return file.type;
  const extension = file.name.split( '.' ).pop()?.toLowerCase() ?? '';
  return CONTENT_TYPE_BY_EXTENSION[ extension ] ?? 'application/octet-stream';
}

function isAborted( error: unknown, signal?: AbortSignal ): boolean {
  return !!signal?.aborted || axios.isCancel( error );
}

/** Network failures and 5xx/408/429 are worth retrying; other 4xx (e.g. an expired URL) are not. */
function isRetryable( error: unknown ): boolean {
  if ( !axios.isAxiosError( error ) ) return false;
  const status = error.response?.status;
  return !status || ( status >= 500 && status !== 501 ) || status === 408 || status === 429;
}

function delay( ms: number, signal?: AbortSignal ): Promise<void> {
  return new Promise( ( resolve ) => {
    const timer = setTimeout( resolve, ms );
    signal?.addEventListener( 'abort', () => { clearTimeout( timer ); resolve(); }, { once: true } );
  } );
}

async function withRetry<T>( attempts: number, signal: AbortSignal | undefined, run: () => Promise<T> ): Promise<T> {
  for ( let attempt = 1; ; attempt++ ) {
    try {
      return await run();
    } catch ( error ) {
      if ( isAborted( error, signal ) || attempt >= attempts || !isRetryable( error ) ) throw error;
      await delay( PART_RETRY_BASE_DELAY_MS * 2 ** ( attempt - 1 ), signal );
      if ( signal?.aborted ) throw error;
    }
  }
}

/** Pairs each part with its byte range of the file; the sizes must add up to the file size. */
function planParts( parts: ModelsMultipartPartURL[], fileSize: number ) {
  let offset = 0;
  const plan = [ ...parts ]
    .sort( ( a, b ) => ( a.part_number ?? 0 ) - ( b.part_number ?? 0 ) )
    .map( ( part ) => {
      const start = offset;
      offset += part.size ?? 0;
      return { url: part.url as string, start, end: offset };
    } );

  if ( !plan.length || offset !== fileSize || plan.some( ( p ) => !p.url ) ) {
    throw new Error( 'Upload could not be started: invalid part layout returned by the server' );
  }
  return plan;
}

export async function uploadVideoMultipart( { file, purpose, gigId, onProgress, signal }: UploadVideoOptions ): Promise<ModelsVideoUploadResponse> {
  const uploadApi = UploadApiFactory( apiConfiguration, undefined, apiClient );

  const { data: initResponse } = await uploadApi.uploadsVideoMultipartInitPost(
    {
      request: {
        purpose,
        gig_id: gigId,
        filename: file.name,
        content_type: resolveContentType( file ),
        file_size: file.size,
      },
    },
    { signal }
  );
  const init = initResponse.data;
  if ( !init?.filename || !init.upload_id || !init.parts ) {
    throw new Error( initResponse.message || 'Upload could not be started' );
  }
  const { filename, upload_id: uploadId } = init;

  const abortUpload = () =>
    uploadApi.uploadsVideoMultipartAbortPost( { request: { filename, upload_id: uploadId } } ).catch( () => { } );

  try {
    const plan = planParts( init.parts, file.size );

    // Bytes sent per part, so retries restart from zero without double-counting.
    const loadedByPart = plan.map( () => 0 );
    let lastPercent = 0;
    const reportProgress = () => {
      const loaded = loadedByPart.reduce( ( sum, bytes ) => sum + bytes, 0 );
      // Hold at 99 until the backend has validated the assembled file.
      const percent = Math.min( 99, Math.floor( ( loaded / file.size ) * 100 ) );
      if ( percent > lastPercent ) {
        lastPercent = percent;
        onProgress?.( percent );
      }
    };

    // Any part failing stops the others from starting new work.
    const failed = new AbortController();
    const partSignal = failed.signal;
    signal?.addEventListener( 'abort', () => failed.abort(), { once: true } );

    let next = 0;
    const worker = async () => {
      while ( next < plan.length && !partSignal.aborted ) {
        const index = next++;
        const { url, start, end } = plan[ index ];
        await withRetry( PART_MAX_ATTEMPTS, partSignal, () => {
          loadedByPart[ index ] = 0;
          return axios.put( url, file.slice( start, end ), {
            // Presigned URL: no cookies, no JSON default, and no Content-Type unless it was signed.
            withCredentials: false,
            headers: { 'Content-Type': undefined },
            signal: partSignal,
            timeout: PART_TIMEOUT_MS,
            onUploadProgress: ( e ) => {
              loadedByPart[ index ] = e.loaded;
              reportProgress();
            },
          } );
        } );
        loadedByPart[ index ] = end - start;
        reportProgress();
      }
    };

    try {
      await Promise.all( Array.from( { length: Math.min( PART_CONCURRENCY, plan.length ) }, worker ) );
    } catch ( error ) {
      failed.abort();
      throw error;
    }
    if ( signal?.aborted ) throw new DOMException( 'Upload aborted', 'AbortError' );

    const { data: completeResponse } = await withRetry( COMPLETE_MAX_ATTEMPTS, signal, () =>
      uploadApi.uploadsVideoMultipartCompletePost(
        { request: { filename, upload_id: uploadId, file_size: file.size, original_name: file.name } },
        { signal }
      )
    );
    const video = completeResponse.data;
    if ( !completeResponse.success || !video?.video_url ) {
      throw new Error( completeResponse.message || 'No file url returned' );
    }

    onProgress?.( 100 );
    return video;
  } catch ( error ) {
    // Best effort: lets the backend discard stored parts so a retry starts clean.
    await abortUpload();
    throw error;
  }
}
