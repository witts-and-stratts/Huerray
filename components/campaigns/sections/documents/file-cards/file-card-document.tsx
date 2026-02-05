/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiClient, apiConfiguration, BASE_URL } from '@/lib/api/client';
import { UploadApiFactory } from '@/lib/api/generated/api/upload-api';
import { ModelsUploadsImagePost200Response } from '@/lib/api/models/models-uploads-image-post200-response';
import { File01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { memo, useEffect, useState } from 'react';
import { PdfFileIcon } from '../pdf-file-icon';
import { BaseFileCard } from './base-file-card';
import { FileCardProps } from './file-card-types';

export const FileCardDocument = memo( ( props: FileCardProps ) => {
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

          const response = await uploadApi.uploadsDocumentsPost( { documents: item.file! }, {
            headers: { 'Content-Type': undefined } as any,
            onUploadProgress: onProgress
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

  const isPdf = item.type.includes( 'pdf' ) || item.name.toLowerCase().endsWith( '.pdf' );

  return (
    <BaseFileCard { ...props } progress={ progress }>
      { isPdf ? (
        <PdfFileIcon className="text-muted-foreground w-20! h-20!" />
      ) : (
        <HugeiconsIcon icon={ File01Icon } className="text-muted-foreground" />
      ) }
    </BaseFileCard>
  );
} );

FileCardDocument.displayName = 'FileCardDocument';

