/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiClient, apiConfiguration, BASE_URL } from '@/lib/api/client';
import { UploadApiFactory } from '@/lib/api/generated/api/upload-api';
import { ModelsUploadsImagePost200Response } from '@/lib/api/models/models-uploads-image-post200-response';
import { PlayCircle } from 'lucide-react';
import { memo, useEffect, useState } from 'react';
import { BaseFileCard } from './base-file-card';
import { FileCardProps } from './file-card-types';
import { Media } from '../media';

export const FileCardVideo = memo( ( props: FileCardProps ) => {
  const { item, onUploadSuccess, onUploadError, isOverlay } = props;
  const [ progress, setProgress ] = useState( 0 );

  useEffect( () => {
    if ( !isOverlay && item.status === 'uploading' && item.file && !item.url ) {
      queueMicrotask( () => setProgress( 0 ) );
      const uploadFile = async () => {
        try {
          const uploadApi = UploadApiFactory( apiConfiguration, undefined, apiClient );

          let localMaxProgress = 0;
          const onProgress = ( progressEvent: any ) => {
            const percentCompleted = Math.round( ( progressEvent.loaded * 100 ) / ( progressEvent.total || 100 ) );
            localMaxProgress = Math.max( localMaxProgress, percentCompleted );
            setProgress( localMaxProgress );
          };

          const response = await uploadApi.uploadsVideosPost( { videos: item.file! }, {
            headers: { 'Content-Type': undefined } as any,
            onUploadProgress: onProgress,
            timeout: 3600000 // 1 hour
          } ) as unknown as ModelsUploadsImagePost200Response;

          const uploadedFile = response.data.data[ 0 ] as any;
          if ( uploadedFile && uploadedFile.url ) {
            // Use the URL directly from the API response
            const fullUrl = uploadedFile.url.startsWith( 'http' )
              ? uploadedFile.url
              : `${ BASE_URL.replace( '/api/v1', '' ) }${ uploadedFile.url }`;
            onUploadSuccess( item.id, fullUrl );
          } else {
            onUploadError( item.id, new Error( 'No file url returned' ), item.name );
          }
        } catch ( error ) {
          onUploadError( item.id, error, item.name );
        }
      };
      uploadFile();
    }
  }, [ item.status, item.file, item.url, item.id, onUploadSuccess, onUploadError, isOverlay ] );

  return (
    <BaseFileCard { ...props } progress={ progress }>
      { item.preview && (
        <>
          <Media url={ item.preview } alt={ item.name } className="w-full max-h-40 object-cover object-top" />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors group">
            <PlayCircle className="size-10 text-white/90 drop-shadow-md opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-400 ease-out" strokeWidth={ 1 } />
          </div>
        </>
      ) }
    </BaseFileCard>
  );
} );

FileCardVideo.displayName = 'FileCardVideo';

