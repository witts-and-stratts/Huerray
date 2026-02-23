/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiClient, apiConfiguration, BASE_URL } from '@/lib/api/client';
import { UploadApiFactory } from '@/lib/api/generated/api/upload-api';
import { BaseFileCard } from '@/components/campaigns/sections/documents/file-cards/base-file-card';
import { FileCardProps } from '@/components/campaigns/sections/documents/file-cards/file-card-types';
import { VideoUploadResponseData } from '@/components/campaigns/sections/documents/types';
import { Media } from '@/components/campaigns/sections/documents/media';
import { PlayCircle } from 'lucide-react';
import { memo, useEffect, useState } from 'react';

interface FileCardVideoSubmissionProps extends Omit<FileCardProps, 'onUploadSuccess'> {
  gigId: string;
  onUploadSuccess: ( id: string, data: VideoUploadResponseData ) => void;
}

export const FileCardVideoSubmission = memo( ( props: FileCardVideoSubmissionProps ) => {
  const { item, onUploadSuccess, onUploadError, isOverlay, gigId, ...rest } = props;
  const [ progress, setProgress ] = useState( 0 );

  useEffect( () => {
    if ( !isOverlay && item.status === 'uploading' && item.file && !item.url ) {
      queueMicrotask( () => setProgress( 0 ) );
      const uploadFile = async () => {
        try {
          let localMaxProgress = 0;
          const onProgress = ( progressEvent: any ) => {
            const percentCompleted = Math.round( ( progressEvent.loaded * 100 ) / ( progressEvent.total || 100 ) );
            localMaxProgress = Math.max( localMaxProgress, percentCompleted );
            setProgress( localMaxProgress );
          };

          const uploadApi = UploadApiFactory( apiConfiguration, undefined, apiClient );

          // generatedAPI: uploadsVideoSubmissionPost(requestParameters: UploadApiUploadsVideoSubmissionPostRequest, options?: RawAxiosRequestConfig)
          const response = await uploadApi.uploadsVideoSubmissionPost(
            { gigId: gigId, video: item.file! },
            {
              headers: { 'Content-Type': 'multipart/form-data' },
              onUploadProgress: onProgress,
              timeout: 3600000 // 1 hour
            }
          );

          const responseData = response.data;

          if ( responseData.success && responseData.data?.video_url ) {
            const fullUrl = responseData.data.video_url.startsWith( 'http' )
              ? responseData.data.video_url
              : `${ BASE_URL.replace( '/api/v1', '' ) }${ responseData.data.video_url }`;

            onUploadSuccess( item.id, {
              filename: responseData.data.filename || item.name,
              video_url: fullUrl,
              file_size: responseData.data.file_size || item.file?.size || 0,
              content_type: responseData.data.content_type || item.type,
              original_name: responseData.data.original_name || item.name
            } );
          } else {
            onUploadError( item.id, new Error( responseData.message || 'No file url returned' ), item.name );
          }

        } catch ( error ) {
          onUploadError( item.id, error, item.name );
        }
      };
      uploadFile();
    }
  }, [ item.status, item.file, item.url, item.id, item.name, item.type, onUploadSuccess, onUploadError, isOverlay, gigId ] );

  return (
    <BaseFileCard { ...rest } item={ item } onRemove={ props.onRemove } onRetry={ props.onRetry } onPreview={ props.onPreview } onUploadSuccess={ () => { } } onUploadError={ onUploadError } isOverlay={ isOverlay } progress={ progress }>
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

FileCardVideoSubmission.displayName = 'FileCardVideoSubmission';
