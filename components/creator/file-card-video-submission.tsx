/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiClient, apiConfiguration, BASE_URL } from '@/lib/api/client';
import { UploadApiFactory } from '@/lib/api/generated/api/upload-api';
import { BaseFileCard } from '@/components/campaigns/sections/documents/file-cards/base-file-card';
import { FileCardProps } from '@/components/campaigns/sections/documents/file-cards/file-card-types';
import { VideoUploadResponseData } from '@/components/campaigns/sections/documents/types';
import { Media } from '@/components/campaigns/sections/documents/media';
import { PlayCircle } from 'lucide-react';
import { memo, useEffect, useRef, useState } from 'react';

function resolveUploadUrl( url: string ): string {
  if ( !url ) return url;
  if ( url.startsWith( 'http' ) ) return url;
  return `${ BASE_URL.replace( '/api/v1', '' ) }${ url }`;
}

function dataUrlToFile( dataUrl: string, filename: string ): File {
  const [ header, data ] = dataUrl.split( ',' );
  const mime = header.match( /:(.*?);/ )?.[ 1 ] ?? 'image/png';
  const bytes = atob( data );
  const arr = new Uint8Array( bytes.length );
  for ( let i = 0; i < bytes.length; i++ ) arr[ i ] = bytes.charCodeAt( i );
  return new File( [ arr ], filename, { type: mime } );
}

interface FileCardVideoSubmissionProps extends Omit<FileCardProps, 'onUploadSuccess'> {
  onUploadSuccess: ( id: string, data: VideoUploadResponseData ) => void;
}

export const FileCardVideoSubmission = memo( ( props: FileCardVideoSubmissionProps ) => {
  const { item, onUploadSuccess, onUploadError, isOverlay, ...rest } = props;
  const [ progress, setProgress ] = useState( 0 );

  // Store callbacks in refs so they never appear as useEffect deps.
  // This prevents the effect from re-firing (and restarting the upload) every
  // time the parent re-renders and creates new inline callback instances.
  const onUploadSuccessRef = useRef( onUploadSuccess );
  const onUploadErrorRef = useRef( onUploadError );
  useEffect( () => { onUploadSuccessRef.current = onUploadSuccess; }, [ onUploadSuccess ] );
  useEffect( () => { onUploadErrorRef.current = onUploadError; }, [ onUploadError ] );

  useEffect( () => {
    if ( !isOverlay && item.status === 'uploading' && item.file && !item.url ) {
      const controller = new AbortController();
      setProgress( 0 );

      const uploadFile = async () => {
        try {
          const uploadApi = UploadApiFactory( apiConfiguration, undefined, apiClient );

          // Track combined progress: video upload weighted at 90%, thumbnail at 10%.
          // Each stream's value is clamped to never decrease, and the combined
          // result is also clamped — preventing any backward jumps in the UI.
          let videoProgress = 0;
          let thumbProgress = 0;
          let combinedProgress = 0;
          const updateProgress = () => {
            if ( controller.signal.aborted ) return;
            const next = Math.round( videoProgress * 0.9 + thumbProgress * 0.1 );
            combinedProgress = Math.max( combinedProgress, next );
            setProgress( combinedProgress );
          };

          const onVideoProgress = ( progressEvent: any ) => {
            const pct = Math.round( ( progressEvent.loaded * 100 ) / ( progressEvent.total || 100 ) );
            videoProgress = Math.max( videoProgress, pct );
            updateProgress();
          };

          // Upload video to /uploads/videos
          const videoUploadPromise = uploadApi.uploadsVideosPost(
            { videos: item.file! },
            {
              headers: { 'Content-Type': 'multipart/form-data' },
              onUploadProgress: onVideoProgress,
              timeout: 3600000, // 1 hour
              signal: controller.signal,
            }
          );

          // Upload thumbnail to /uploads/images (only if preview is a data URL from mediabunny)
          const thumbnailUploadPromise = item.preview?.startsWith( 'data:' )
            ? uploadApi.uploadsImagesPost(
              { images: dataUrlToFile( item.preview, `${ item.name }-thumbnail.png` ) },
              {
                headers: { 'Content-Type': 'multipart/form-data' },
                onUploadProgress: ( progressEvent: any ) => {
                  const pct = Math.round( ( progressEvent.loaded * 100 ) / ( progressEvent.total || 100 ) );
                  thumbProgress = Math.max( thumbProgress, pct );
                  updateProgress();
                },
                signal: controller.signal,
              }
            )
            : Promise.resolve( null );

          const [ videoResponse, thumbResponse ] = await Promise.all( [ videoUploadPromise, thumbnailUploadPromise ] );

          if ( controller.signal.aborted ) return;

          const videoData = videoResponse.data;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const videoFiles = Array.isArray( ( videoData as any ).data ) ? ( videoData as any ).data : [ videoData.data ];
          const uploadedVideo = videoFiles[ 0 ];

          if ( videoData.success && uploadedVideo?.url ) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const thumbRaw = ( thumbResponse?.data as any )?.data;
            const thumbFile = Array.isArray( thumbRaw ) ? thumbRaw[ 0 ] : thumbRaw;

            onUploadSuccessRef.current( item.id, {
              filename: uploadedVideo.filename || item.name,
              video_url: resolveUploadUrl( uploadedVideo.url ),
              thumbnail_url: thumbFile?.url ? resolveUploadUrl( thumbFile.url ) : undefined,
              file_size: uploadedVideo.size || item.file?.size || 0,
              content_type: uploadedVideo.content_type || item.type,
              original_name: item.name,
            } );
          } else {
            onUploadErrorRef.current( item.id, new Error( videoData.message || 'No file url returned' ), item.name );
          }

        } catch ( error: any ) {
          if ( error?.name === 'CanceledError' || error?.name === 'AbortError' || controller.signal.aborted ) return;
          onUploadErrorRef.current( item.id, error, item.name );
        }
      };

      uploadFile();

      // Clean up: abort any in-flight request if the file/status changes underneath us
      return () => { controller.abort(); };
    }
    // Callbacks are intentionally excluded — they live in refs updated above.
    // Only the identity of the file being uploaded should trigger a new upload.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ item.status, item.file, item.url, item.id, item.name, item.type, item.preview, isOverlay ] );

  return (
    <BaseFileCard { ...rest } item={ item } onRemove={ props.onRemove } onRetry={ props.onRetry } onPreview={ props.onPreview } onUploadSuccess={ () => { } } onUploadError={ onUploadError } isOverlay={ isOverlay } progress={ progress } showTitle={ props.showTitle } aspect={ props.aspect } onSelect={ ( id ) => props.onSelect?.( id, false ) }>
      { item.preview && (
        <>
          <Media url={ item.preview } alt={ item.name } className={ props.aspect ? "w-full h-full object-cover object-top" : "w-full max-h-40 object-cover object-top" } />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors group">
            <PlayCircle className="size-10 text-white/90 drop-shadow-md opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-400 ease-out" strokeWidth={ 1 } />
          </div>
        </>
      ) }
    </BaseFileCard>
  );
} );

FileCardVideoSubmission.displayName = 'FileCardVideoSubmission';
