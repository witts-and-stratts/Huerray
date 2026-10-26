/* eslint-disable @typescript-eslint/no-explicit-any */
import { toAbsoluteSource } from '@/lib/utils/imgproxy';
import { useEffect, useState } from 'react';
import { UploadedFile } from '../types';

/** Uploads the file, reporting progress as 0-100, and resolves with the uploaded file's url. */
type UploadFn = (
  file: File,
  onProgress: ( percent: number ) => void,
  signal: AbortSignal,
) => Promise<string | undefined>;

export const toPercent = ( e: { loaded: number; total?: number; } ) => Math.round( ( e.loaded * 100 ) / ( e.total || 100 ) );

export function useFileUpload(
  item: UploadedFile,
  isOverlay: boolean | undefined,
  onUploadSuccess: ( id: string, url: string ) => void,
  onUploadError: ( id: string, error: any, name?: string ) => void,
  uploadFn: UploadFn,
): number {
  const [ progress, setProgress ] = useState( 0 );

  useEffect( () => {
    if ( isOverlay || item.status !== 'uploading' || !item.file || item.url ) return;

    const controller = new AbortController();
    queueMicrotask( () => setProgress( 0 ) );

    ( async () => {
      try {
        let localMaxProgress = 0;
        const onProgress = ( percent: number ) => {
          localMaxProgress = Math.max( localMaxProgress, percent );
          setProgress( localMaxProgress );
        };

        const url = await uploadFn( item.file!, onProgress, controller.signal );

        if ( url ) {
          onUploadSuccess( item.id, toAbsoluteSource( url ) );
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
