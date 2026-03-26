import { UploadApiFactory } from '@/lib/api/generated/api/upload-api';
import { memo, useCallback } from 'react';
import { BaseFileCard } from './base-file-card';
import { FileCardProps } from './file-card-types';
import { useFileUpload } from './use-file-upload';
import { Media } from '../media';
import { imgpresets } from '@/lib/utils/imgproxy';

export const FileCardImage = memo( ( props: FileCardProps ) => {
  const { item, onUploadSuccess, onUploadError, isOverlay, showTitle } = props;

  const uploadFn = useCallback( ( api: ReturnType<typeof UploadApiFactory>, file: File, onProgress: ( e: any ) => void, signal: AbortSignal ) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    api.uploadsImagesPost( { images: file }, { headers: { 'Content-Type': undefined } as any, onUploadProgress: onProgress, signal } ),
    [] );

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
