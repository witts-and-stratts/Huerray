/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiClient, apiConfiguration } from '@/lib/api/client';
import { UploadApiFactory } from '@/lib/api/generated/api/upload-api';
import { toAbsoluteSource } from '@/lib/utils/imgproxy';
import { useEffect, useState } from 'react';
import { UploadedFile } from '../types';

type UploadApiFn = (
  api: ReturnType<typeof UploadApiFactory>,
  file: File,
  onProgress: ( e: any ) => void,
  signal: AbortSignal,
) => Promise<any>;

export function useFileUpload(
  item: UploadedFile,
  isOverlay: boolean | undefined,
  onUploadSuccess: ( id: string, url: string ) => void,
  onUploadError: ( id: string, error: any, name?: string ) => void,
  uploadFn: UploadApiFn,
): number {
  const [ progress, setProgress ] = useState( 0 );

  useEffect( () => {
    if ( isOverlay || item.status !== 'uploading' || !item.file || item.url ) return;

    const controller = new AbortController();
    queueMicrotask( () => setProgress( 0 ) );

    ( async () => {
      try {
        const api = UploadApiFactory( apiConfiguration, undefined, apiClient );
        let localMaxProgress = 0;
        const onProgress = ( e: any ) => {
          localMaxProgress = Math.max( localMaxProgress, Math.round( ( e.loaded * 100 ) / ( e.total || 100 ) ) );
          setProgress( localMaxProgress );
        };

        const response = await uploadFn( api, item.file!, onProgress, controller.signal );
        const uploaded = response.data.data[ 0 ] as any;

        if ( uploaded?.url ) {
          onUploadSuccess( item.id, toAbsoluteSource( uploaded.url ) );
        } else {
          onUploadError( item.id, new Error( 'No file url returned' ), item.name );
        }
      } catch ( e: any ) {
        if ( e?.code !== 'ERR_CANCELED' ) onUploadError( item.id, e, item.name );
      }
    } )();

    return () => controller.abort();
  }, [ item.status, item.file, item.url, item.id, isOverlay, onUploadSuccess, onUploadError, uploadFn ] );

  return progress;
}
