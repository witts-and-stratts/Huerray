'use client';

import { Button } from '@/components/dashboard-ui/button';
import { Dropzone } from '@/components/ui/shadcn-io/dropzone';
import { MediaPreview } from '@/components/campaigns/media-preview';
import { UploadApi } from '@/lib/api/generated/api/upload-api';
import { BASE_URL, apiClient } from '@/lib/api/client';
import { cn } from '@/lib/utils';
import { imgpresets } from '@/lib/utils/imgproxy';
import { Trash2, UploadIcon, ZoomIn, Loader2 } from 'lucide-react';
import { useCallback, useState, ReactNode, useEffect, useRef } from 'react';
import { toast } from 'sonner';

interface ImageUploaderProps {
  value?: string | null;
  onChange: ( url: string ) => void;
  disabled?: boolean;
  className?: string;
  renderDefault?: ( isDragActive: boolean ) => ReactNode;
  previewTitle?: string;
}

export function ImageUploader( {
  value,
  onChange,
  disabled = false,
  className,
  renderDefault,
  previewTitle = "Image Preview"
}: ImageUploaderProps ) {
  const [ previewUrl, setPreviewUrl ] = useState<string | null>( null );
  const [ file, setFile ] = useState<File | null>( null );
  const [ isPreviewOpen, setIsPreviewOpen ] = useState( false );
  const [ isHovering, setIsHovering ] = useState( false );
  const [ isUploading, setIsUploading ] = useState( false );
  const [ uploadProgress, setUploadProgress ] = useState( 0 );
  const [ uploadError, setUploadError ] = useState( false );

  const prevValueRef = useRef( value );
  const lastUploadedUrlRef = useRef<string | null>( null );

  // Clear preview if value changes externally (e.g. discard changes)
  // But keep preview if change matches our just-uploaded file to avoid flicker
  useEffect( () => {
    if ( value !== prevValueRef.current ) {
      if ( value !== lastUploadedUrlRef.current ) {
        setPreviewUrl( null );
      }
    }
    prevValueRef.current = value;
  }, [ value ] );

  const currentImageUrl = previewUrl || value;

  const handleImageDrop = useCallback( async ( acceptedFiles: File[] ) => {
    const droppedFile = acceptedFiles[ 0 ];
    if ( !droppedFile ) return;

    // Optimistic preview
    if ( previewUrl ) URL.revokeObjectURL( previewUrl );
    const objectUrl = URL.createObjectURL( droppedFile );
    setPreviewUrl( objectUrl );
    setFile( droppedFile );
    setUploadError( false );
    setIsUploading( true );
    setUploadProgress( 0 );
    lastUploadedUrlRef.current = null;

    try {
      const uploadApi = new UploadApi( undefined, undefined, apiClient );

      // Upload the image
      const response = await uploadApi.uploadsImagesPost( { images: droppedFile }, {
        onUploadProgress: ( progressEvent ) => {
          const percentCompleted = Math.round( ( progressEvent.loaded * 100 ) / ( progressEvent.total || 100 ) );
          setUploadProgress( percentCompleted );
        }
      } );

      const data: any = response.data;
      const files = Array.isArray( data.data ) ? data.data : [ data.data ];
      const uploadedFile = files[ 0 ];

      if ( uploadedFile ) {
        let fullUrl = '';
        if ( uploadedFile.url ) {
          fullUrl = uploadedFile.url.startsWith( 'http' )
            ? uploadedFile.url
            : `${ BASE_URL.replace( '/api/v1', '' ) }${ uploadedFile.url }`;
        } else if ( uploadedFile.filename ) {
          // Fallback if url is missing but filename is present
          fullUrl = `${ BASE_URL }/uploads/preview/images/${ uploadedFile.filename }`;
        }

        if ( fullUrl ) {
          lastUploadedUrlRef.current = fullUrl;
          onChange( fullUrl );
          toast.success( 'Image uploaded successfully' );
          // Once successfully uploaded and parent updated, we can potentially clear local previewUrl 
          // and let parent value take over, but keeping previewUrl is fine too.
        }
      }

    } catch ( error: any ) {
      console.error( 'Upload failed:', error );
      setUploadError( true );
      toast.error( 'Failed to upload image' );
    } finally {
      setIsUploading( false );
    }
  }, [ previewUrl, onChange ] );

  const handleRemoveImage = useCallback( ( e: React.MouseEvent ) => {
    e.stopPropagation();
    if ( previewUrl ) {
      URL.revokeObjectURL( previewUrl );
    }
    setFile( null );
    setPreviewUrl( null );
    onChange( '' );
    setUploadError( false );
  }, [ previewUrl, onChange ] );

  const handleDropError = useCallback( ( error: Error ) => {
    const message = error.message || 'Failed to upload image';
    if ( message.toLowerCase().includes( 'larger' ) || message.toLowerCase().includes( 'size' ) ) {
      toast.error( 'File too large', {
        description: 'Please select an image smaller than 5MB.',
        richColors: true,
        cancel: true,
      } );
    } else {
      toast.error( 'Upload failed', {
        description: message,
        richColors: true,
        cancel: true,
      } );
    }
  }, [] );

  return (
    <>
      <Dropzone
        accept={ {
          'image/png': [ '.png' ],
          'image/jpeg': [ '.jpg', '.jpeg' ],
          'image/gif': [ '.gif' ],
        } }
        maxSize={ 5 * 1024 * 1024 }
        maxFiles={ 1 }
        onDrop={ handleImageDrop }
        onError={ handleDropError }
        disabled={ disabled || isUploading }
        className={ cn(
          "w-full border-dashed transition-all",
          currentImageUrl && "border-green-500/30 bg-green-500/5",
          uploadError && "border-destructive/30 bg-destructive/5",
          className
        ) }
      >
        { ( { isDragActive } ) => (
          <div className="flex flex-col items-center justify-center py-4 w-full">
            { currentImageUrl ? (
              <div
                className="relative group flex flex-col items-center"
                onMouseEnter={ () => setIsHovering( true ) }
                onMouseLeave={ () => setIsHovering( false ) }
              >
                {/* Preview Image */ }
                <div className={ cn(
                  "relative w-50 max-w-full aspect-square rounded-full overflow-hidden border-2 bg-muted/30",
                  uploadError ? "border-destructive" : "border-slate-200"
                ) }>
                  {/* eslint-disable-next-line @next/next/no-img-element */ }
                  <img
                    src={ currentImageUrl.startsWith( 'blob:' ) || currentImageUrl.startsWith( 'data:' ) ? currentImageUrl : imgpresets.card( currentImageUrl ) }
                    alt="Preview"
                    className={ cn(
                      "w-full h-full object-cover",
                      isUploading && "opacity-50"
                    ) }
                  />

                  {/* Upload Loader */ }
                  { isUploading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 text-white">
                      <Loader2 className="w-8 h-8 animate-spin mb-1" />
                      <span className="text-xs font-medium">{ uploadProgress }%</span>
                    </div>
                  ) }

                  {/* Overlay with actions on hover */ }
                  { !isUploading && (
                    <div
                      className={ cn(
                        "absolute inset-0 bg-black/50 flex items-center justify-center gap-2 transition-opacity",
                        ( isHovering || uploadError ) ? "opacity-100" : "opacity-0"
                      ) }
                    >
                      { !uploadError && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="bg-background/80 hover:bg-background rounded-full h-8 w-8"
                          onClick={ ( e ) => {
                            e.stopPropagation();
                            setIsPreviewOpen( true );
                          } }
                          title="Preview"
                        >
                          <ZoomIn className="w-4 h-4" />
                        </Button>
                      ) }
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="bg-background/80 hover:bg-background hover:text-destructive rounded-full h-8 w-8"
                        onClick={ ( e ) => {
                          handleRemoveImage( e );
                        } }
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ) }
                </div>

                <p className="text-xs text-muted-foreground/60 text-center mt-3">
                  { isUploading ? 'Uploading...' : ( uploadError ? 'Upload failed' : 'Click or drag to replace' ) }
                </p>
              </div>
            ) : (
              renderDefault ? renderDefault( isDragActive ) : (
                <>
                  <div className={ cn(
                    "relative w-3/4 aspect-square rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200 mb-4 transition-colors",
                    isDragActive && "bg-primary/10 border-primary"
                  ) }>
                    <UploadIcon className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-sm font-medium text-center">
                    { isDragActive ? 'Drop your image here' : 'Upload Image' }
                  </p>
                  <p className="text-xs text-muted-foreground text-center mt-1">
                    Drag and drop or click to upload
                  </p>
                  <p className="text-xs text-muted-foreground text-center mt-1">
                    PNG, JPG, GIF up to 5MB
                  </p>
                </>
              )
            ) }
          </div>
        ) }
      </Dropzone>

      { currentImageUrl && (
        <MediaPreview
          items={ [ { kind: 'image', url: currentImageUrl, name: file?.name || previewTitle } ] }
          initialIndex={ isPreviewOpen ? 0 : null }
          onOpenChange={ ( open ) => setIsPreviewOpen( open ) }
        />
      ) }
    </>
  );
}
