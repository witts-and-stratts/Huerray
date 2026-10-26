import { apiClient, apiConfiguration } from '@/lib/api/client';
import { UploadApiFactory } from '@/lib/api/generated/api/upload-api';
import { memo, useCallback } from 'react';
import { BaseFileCard } from './base-file-card';
import { FileCardProps } from './file-card-types';
import { toPercent, useFileUpload } from './use-file-upload';
import { Media } from '../media';
import { imgpresets } from '@/lib/utils/imgproxy';

export const FileCardImage = memo( ( props: FileCardProps ) => {
  const { item, onUploadSuccess, onUploadError, isOverlay, showTitle } = props;

  const uploadFn = useCallback( async ( file: File, onProgress: ( percent: number ) => void, signal: AbortSignal ) => {
    const api = UploadApiFactory( apiConfiguration, undefined, apiClient );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await api.uploadsImagesPost( { images: file }, { headers: { 'Content-Type': undefined } as any, onUploadProgress: ( e ) => onProgress( toPercent( e ) ), signal } );
    // The spec types `data` as a single object, but the backend returns an array of uploaded files.
    return ( response.data.data as unknown as Array<{ url?: string; }> | undefined )?.[ 0 ]?.url;
  }, [] );

  const progress = useFileUpload( item, isOverlay, onUploadSuccess, onUploadError, uploadFn );

  return (
    <BaseFileCard { ...props } progress={ progress } showTitle={ showTitle } onSelect={ props.onSelect }>
      { ( item.preview || item.url ) && (
        <Media url={ item.preview || imgpresets.card( item.url! ) } alt={ item.name } className="w-full max-h-60 object-contain object-top" type='image' />
      ) }
    </BaseFileCard>
  );
} );

FileCardImage.displayName = 'FileCardImage';
