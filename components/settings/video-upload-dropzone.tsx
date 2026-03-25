'use client';

import { useState, useCallback } from 'react';
import { Dropzone } from '@/components/ui/shadcn-io/dropzone';
import { Button } from '@/components/dashboard-ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/dashboard-ui/dialog';
import { UploadIcon, Trash2, Play, Loader2, RefreshCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { UploadApiFactory } from '@/lib/api/generated/api/upload-api';
import { apiClient, apiConfiguration, BASE_URL } from '@/lib/api/client';
import { ModelsUploadsImagePost200Response } from '@/lib/api/models/models-uploads-image-post200-response';
import { VideoFileIcon } from '../campaigns/sections/documents/video-file-icon';
import { ALL_FORMATS, BlobSource, CanvasSink, Input } from 'mediabunny';
import { imgpresets } from '@/lib/utils/imgproxy';
import { useTranslations } from 'next-intl';

interface UseVideoUploadOptions {
  onSuccess: ( url: string ) => void;
  onThumbnailReady?: ( url: string ) => void;
}

async function generateAndUploadThumbnail( file: File ): Promise<string | null> {
  try {
    const source = new BlobSource( file );
    const input = new Input( { source, formats: ALL_FORMATS } );
    const videoTrack = await input.getPrimaryVideoTrack();
    if ( !videoTrack || !( await videoTrack.canDecode() ) ) return null;

    const sink = new CanvasSink( videoTrack, { width: 1280 } );
    const result = await sink.getCanvas( 0 );
    if ( !result ) return null;

    const dataUrl = ( result.canvas as HTMLCanvasElement ).toDataURL( 'image/jpeg', 0.8 );
    const res = await fetch( dataUrl );
    const blob = await res.blob();
    const thumbFile = new File( [ blob ], 'thumbnail.jpg', { type: 'image/jpeg' } );

    const uploadApi = UploadApiFactory( apiConfiguration, undefined, apiClient );
    const thumbResponse = await uploadApi.uploadsImagesPost( { images: thumbFile } ) as any;
    const uploadedFile = ( thumbResponse.data?.data as any[] )?.[ 0 ];
    if ( !uploadedFile ) return null;

    const raw: string = uploadedFile.url ?? '';
    return raw.startsWith( 'http' ) ? raw : `${ BASE_URL.replace( '/api/v1', '' ) }${ raw }`;
  } catch ( e ) {
    console.error( 'Failed to generate/upload video thumbnail', e );
    return null;
  }
}

function useVideoUpload( { onSuccess, onThumbnailReady }: UseVideoUploadOptions ) {
  const t = useTranslations( 'dashboard.creator.settings.media' );
  const [ videoFile, setVideoFile ] = useState<File | null>( null );
  const [ videoPreviewUrl, setVideoPreviewUrl ] = useState<string | null>( null );
  const [ isUploading, setIsUploading ] = useState( false );
  const [ uploadProgress, setUploadProgress ] = useState( 0 );
  const [ uploadError, setUploadError ] = useState( false );

  const uploadVideo = useCallback( async ( file: File ) => {
    setIsUploading( true );
    setUploadProgress( 0 );
    setUploadError( false );

    try {
      const uploadApi = UploadApiFactory( apiConfiguration, undefined, apiClient );
      let localMaxProgress = 0;

      const response = await uploadApi.uploadsVideosPost( { videos: file }, {
        headers: { 'Content-Type': undefined } as any,
        onUploadProgress: ( e: any ) => {
          const pct = Math.round( ( e.loaded * 100 ) / ( e.total || 100 ) );
          localMaxProgress = Math.max( localMaxProgress, pct );
          setUploadProgress( localMaxProgress );
        },
        timeout: 3_600_000,
      } ) as unknown as ModelsUploadsImagePost200Response;

      const uploadedFile = ( ( response.data as any )?.data as any[] )?.[ 0 ];

      if ( !uploadedFile ) {
        toast.error( t( 'uploadResponseInvalid' ) );
        setUploadError( true );
        return;
      }

      const raw: string = uploadedFile.url ?? '';
      const fullUrl = raw.startsWith( 'http' ) ? raw : `${ BASE_URL.replace( '/api/v1', '' ) }${ raw }`;

      if ( fullUrl ) {
        onSuccess( fullUrl );
        toast.success( t( 'videoUploadedSuccessfully' ) );
        generateAndUploadThumbnail( file ).then( ( thumbUrl ) => {
          if ( thumbUrl ) onThumbnailReady?.( thumbUrl );
        } );
      } else {
        toast.error( t( 'uploadVerificationFailed' ) );
        setUploadError( true );
      }
    } catch ( error: any ) {
      const msg = error.response?.data?.message || error.message || t( 'failedToUploadVideo' );
      toast.error( msg );
      setUploadError( true );
    } finally {
      setIsUploading( false );
      setUploadProgress( 0 );
    }
  }, [ onSuccess, onThumbnailReady, t ] );

  const handleDrop = useCallback( async ( acceptedFiles: File[] ) => {
    const file = acceptedFiles[ 0 ];
    if ( !file ) return;

    if ( videoPreviewUrl ) URL.revokeObjectURL( videoPreviewUrl );
    setVideoFile( file );
    setVideoPreviewUrl( URL.createObjectURL( file ) );
    await uploadVideo( file );
  }, [ videoPreviewUrl, uploadVideo ] );

  const handleRetry = useCallback( ( e: React.MouseEvent ) => {
    e.stopPropagation();
    if ( videoFile ) uploadVideo( videoFile );
  }, [ videoFile, uploadVideo ] );

  const handleRemove = useCallback( ( e: React.MouseEvent ) => {
    e.stopPropagation();
    if ( videoPreviewUrl ) URL.revokeObjectURL( videoPreviewUrl );
    setVideoFile( null );
    setVideoPreviewUrl( null );
    setUploadError( false );
    onSuccess( '' );
  }, [ videoPreviewUrl, onSuccess ] );

  const handleDropError = useCallback( ( error: Error ) => {
    const msg = error.message || t( 'failedToUploadVideo' );
    if ( /larger|size/i.test( msg ) ) {
      toast.error( t( 'fileTooLarge' ), { description: t( 'videoSizeHint' ) } );
    } else {
      toast.error( t( 'uploadFailed' ), { description: msg } );
    }
  }, [ t ] );

  return {
    videoFile,
    videoPreviewUrl,
    isUploading,
    uploadProgress,
    uploadError,
    handleDrop,
    handleRetry,
    handleRemove,
    handleDropError,
  };
}

// ── Sub-components ────────────────────────────────────────────────────────────

interface VideoThumbnailProps {
  src: string;
  poster?: string;
  fileName: string;
  isUploading: boolean;
  uploadProgress: number;
  uploadError: boolean;
  isHovering: boolean;
  onRetry: ( e: React.MouseEvent ) => void;
  onRemove: ( e: React.MouseEvent ) => void;
  onPlay: ( e: React.MouseEvent ) => void;
}

function VideoThumbnail( {
  src, poster: poster, fileName, isUploading, uploadProgress, uploadError,
  isHovering, onRetry, onRemove, onPlay,
}: VideoThumbnailProps ) {
  const t = useTranslations( 'dashboard.creator.settings.media' );
  const optimisedPoster = poster ? imgpresets.banner( poster ) : undefined;
  return (
    <div className="flex flex-col items-center w-full">
      <div className={ cn(
        'relative w-full aspect-video rounded-lg overflow-hidden border-2 bg-black',
        uploadError ? 'border-destructive' : 'border-slate-200',
      ) }>
        <video src={ src } className="w-full h-full object-contain" poster={ optimisedPoster } muted playsInline />

        { isUploading && (
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-2 z-20">
            <Loader2 className="w-8 h-8 animate-spin text-white" />
            <p className="text-sm font-medium text-white">{ t( 'uploading' ) } { uploadProgress }%</p>
            <div className="w-32 h-1 bg-white/20 rounded-full overflow-hidden mt-1">
              <div className="h-full bg-primary transition-all duration-300 ease-out" style={ { width: `${ uploadProgress }%` } } />
            </div>
          </div>
        ) }

        { !isUploading && uploadError && (
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-3 z-10 p-4">
            <p className="text-white text-sm font-medium text-center">{ t( 'uploadFailed' ) }</p>
            <div className="flex items-center gap-2">
              <Button type="button" variant="secondary" size="sm" className="h-8 gap-2" onClick={ onRetry }>
                <RefreshCcw className="w-4 h-4" /> { t( 'retry' ) }
              </Button>
              <Button type="button" variant="destructive" size="icon" className="h-8 w-8" onClick={ onRemove } title={ t( 'remove' ) }>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ) }

        { !isUploading && !uploadError && (
          <div className={ cn(
            'absolute inset-0 bg-black/50 flex items-center justify-center gap-3 transition-opacity',
            isHovering ? 'opacity-100' : 'opacity-0',
          ) }>
            <Button type="button" variant="ghost" size="icon"
              className="bg-background/80 hover:bg-background rounded-full h-10 w-10"
              onClick={ onPlay } title={ t( 'play' ) }>
              <Play className="w-5 h-5" />
            </Button>
            <Button type="button" variant="ghost" size="icon"
              className="bg-background/80 hover:bg-background hover:text-destructive rounded-full h-10 w-10"
              onClick={ onRemove } title={ t( 'remove' ) }>
              <Trash2 className="w-5 h-5" />
            </Button>
          </div>
        ) }
      </div>

      <p className="text-xs text-muted-foreground text-center mt-3 max-w-full truncate px-4">
        { fileName || t( 'currentVideo' ) }
      </p>
      <p className="text-xs text-muted-foreground/60 text-center mt-1">
        { isUploading ? t( 'pleaseWait' ) : t( 'clickOrDragToReplace' ) }
      </p>
    </div>
  );
}

function DropPlaceholder( { isDragActive, hasError }: { isDragActive: boolean; hasError: boolean; } ) {
  const t = useTranslations( 'dashboard.creator.settings.media' );
  return (
    <>
      <div className={ cn(
        'relative w-16 h-16 rounded-lg flex items-center justify-center mb-4 transition-colors',
        isDragActive && 'bg-primary/10 border-primary',
      ) }>
        { isDragActive
          ? <UploadIcon className="w-8 h-8 text-primary" />
          : <VideoFileIcon className={ cn( 'size-10', hasError ? 'text-destructive' : 'text-primary' ) } />
        }
      </div>
      <p className={ cn( 'text-sm font-medium text-center', hasError && 'text-destructive' ) }>
        { isDragActive ? t( 'dropVideoHere' ) : t( 'uploadApplicationVideo' ) }
      </p>
      <p className="text-xs text-muted-foreground text-center mt-1">{ t( 'uploadHint' ) }</p>
      <p className="text-xs text-muted-foreground text-center mt-1">{ t( 'videoSpecs' ) }</p>
    </>
  );
}

// ── Public component ──────────────────────────────────────────────────────────

interface VideoUploadDropzoneProps {
  value: string;
  thumbnailValue?: string;
  onChange: ( url: string ) => void;
  onThumbnailChange?: ( url: string ) => void;
  error?: string;
}

export function VideoUploadDropzone( { value, thumbnailValue, onChange, onThumbnailChange, error }: VideoUploadDropzoneProps ) {
  const [ isHovering, setIsHovering ] = useState( false );
  const [ isPreviewOpen, setIsPreviewOpen ] = useState( false );
  const [ localThumbnail, setLocalThumbnail ] = useState<string>( '' );

  const handleThumbnailReady = useCallback( ( url: string ) => {
    setLocalThumbnail( url );
    onThumbnailChange?.( url );
  }, [ onThumbnailChange ] );

  const {
    videoFile, videoPreviewUrl, isUploading, uploadProgress, uploadError,
    handleDrop, handleRetry, handleRemove, handleDropError,
  } = useVideoUpload( { onSuccess: onChange, onThumbnailReady: handleThumbnailReady } );

  const currentUrl = videoPreviewUrl || value;
  const currentPoster = localThumbnail || thumbnailValue || undefined;
  const hasVideo = !!currentUrl;

  return (
    <>
      <Dropzone
        accept={ { 'video/*': [ '.mp4', '.mov', '.avi', '.webm' ] } }
        maxSize={ 100 * 1024 * 1024 }
        maxFiles={ 1 }
        onDrop={ handleDrop }
        onError={ handleDropError }
        disabled={ isUploading }
        className={ cn(
          'w-full border-dashed transition-all min-h-[250px]',
          hasVideo && !uploadError && 'border-green-500/30 bg-green-500/5',
          hasVideo && uploadError && 'border-destructive/30 bg-destructive/5',
          isUploading && 'pointer-events-none opacity-50',
          error && !hasVideo && 'border-destructive bg-destructive/5',
        ) }
      >
        { ( { isDragActive } ) => (
          <div
            className="flex flex-col items-center justify-center py-6 w-full h-full"
            onMouseEnter={ () => setIsHovering( true ) }
            onMouseLeave={ () => setIsHovering( false ) }
          >
            { hasVideo ? (
              <VideoThumbnail
                src={ currentUrl }
                poster={ currentPoster }
                fileName={ videoFile?.name ?? '' }
                isUploading={ isUploading }
                uploadProgress={ uploadProgress }
                uploadError={ uploadError }
                isHovering={ isHovering }
                onRetry={ handleRetry }
                onRemove={ handleRemove }
                onPlay={ ( e ) => { e.stopPropagation(); setIsPreviewOpen( true ); } }
              />
            ) : (
              <DropPlaceholder isDragActive={ isDragActive } hasError={ !!error } />
            ) }
          </div>
        ) }
      </Dropzone>

      { error && <p className="text-xs text-destructive mt-2">{ error }</p> }

      <Dialog open={ isPreviewOpen } onOpenChange={ setIsPreviewOpen }>
        <DialogContent className="w-full md:w-[800px] md:max-w-none p-0 overflow-hidden flex flex-col bg-background/95 backdrop-blur-sm gap-0">
          <DialogHeader className="p-4 border-b shrink-0">
            <DialogTitle className="truncate pr-8 text-sm font-normal text-muted-foreground">
              { videoFile?.name }
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-hidden relative bg-black flex items-center justify-center">
            { currentUrl && (
              <video
                src={ currentUrl }
                className="max-w-full max-h-[70vh] object-contain"
                controls autoPlay playsInline
              />
            ) }
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
