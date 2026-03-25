/* eslint-disable @typescript-eslint/no-explicit-any */
import { UploadApiFactory } from '@/lib/api/generated/api/upload-api';
import { PlayCircle } from 'lucide-react';
import { memo, useCallback } from 'react';
import { BaseFileCard } from './base-file-card';
import { FileCardProps } from './file-card-types';
import { useFileUpload } from './use-file-upload';
import { imgpresets } from '@/lib/utils/imgproxy';

export const FileCardVideo = memo( ( props: FileCardProps ) => {
  const { item, onUploadSuccess, onUploadError, isOverlay, showTitle } = props;

  const uploadFn = useCallback( ( api: ReturnType<typeof UploadApiFactory>, file: File, onProgress: ( e: any ) => void, signal: AbortSignal ) =>
    api.uploadsVideosPost( { videos: file }, { headers: { 'Content-Type': undefined } as any, onUploadProgress: onProgress, signal, timeout: 3600000 } ),
    [] );

  const progress = useFileUpload( item, isOverlay, onUploadSuccess, onUploadError, uploadFn );
  const posterUrl = item.thumbnail ? imgpresets.card( item.thumbnail ) : item.preview ?? undefined;

  return (
    <BaseFileCard { ...props } progress={ progress } showTitle={ showTitle } aspect="aspect-video" onSelect={ ( id ) => props.onSelect?.( id, false ) }>
      { posterUrl && (
        <>
          <video
            poster={ posterUrl }
            className="w-full h-full object-contain object-top"
            preload="none"
            muted
            playsInline
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors group">
            <PlayCircle className="size-10 text-white/90 drop-shadow-md opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-400 ease-out" strokeWidth={ 1 } />
          </div>
        </>
      ) }
    </BaseFileCard>
  );
} );

FileCardVideo.displayName = 'FileCardVideo';
