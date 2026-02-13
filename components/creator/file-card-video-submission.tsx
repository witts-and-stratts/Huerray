/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiClient, apiConfiguration, BASE_URL } from '@/lib/api/client';
import { UploadApiFactory } from '@/lib/api/generated/api/upload-api';
import { ModelsStandardVideoSubmissionUploadResponse } from '@/lib/api/generated/models/models-standard-video-submission-upload-response';
import { BaseFileCard } from '@/components/campaigns/sections/documents/file-cards/base-file-card';
import { FileCardProps } from '@/components/campaigns/sections/documents/file-cards/file-card-types';
import { Media } from '@/components/campaigns/sections/documents/media';
import { PlayCircle } from 'lucide-react';
import { memo, useEffect, useState } from 'react';

interface FileCardVideoSubmissionProps extends FileCardProps {
  gigId: string;
}

export const FileCardVideoSubmission = memo( ( props: FileCardVideoSubmissionProps ) => {
  const { item, onUploadSuccess, onUploadError, isOverlay, gigId } = props;
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

          // The response structure might be different for this endpoint. 
          // Based on ModelsStandardVideoSubmissionUploadResponse:
          // { data: ModelsVideoSubmissionUploadResponse, message: string, success: boolean }

          if ( responseData.success && responseData.data?.video_url ) {
            // Use the URL directly from the API response
            const fullUrl = responseData.data.video_url.startsWith( 'http' )
              ? responseData.data.video_url
              : `${ BASE_URL.replace( '/api/v1', '' ) }${ responseData.data.video_url }`;

            // We might also want to pass back the filename or other metadata if needed, 
            // but the current onUploadSuccess only takes url.
            // The CreateSubmissionSheet will need to handle extracting filename if needed,
            // or we might need to update the prop signature, but for now let's stick to URL.
            // Actually, for this specific flow, we are setting the state in VideoDropzone.
            onUploadSuccess( item.id, fullUrl );
          } else {
            onUploadError( item.id, new Error( responseData.message || 'No file url returned' ), item.name );
          }

        } catch ( error ) {
          onUploadError( item.id, error, item.name );
        }
      };
      uploadFile();
    }
  }, [ item.status, item.file, item.url, item.id, onUploadSuccess, onUploadError, isOverlay, gigId ] );

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

FileCardVideoSubmission.displayName = 'FileCardVideoSubmission';
