"use client";

import { cn } from '@/lib/dashboard-utils';
import { useCallback, useEffect, useState } from 'react';
import { Dropzone, DropzoneEmptyState } from '@/components/ui/shadcn-io/dropzone';
import { VideoFileIcon } from '@/components/campaigns/sections/documents/video-file-icon';
import { FileCardVideoSubmission } from '@/components/creator/file-card-video-submission';
import { UploadedFile, VideoUploadResponseData } from '@/components/campaigns/sections/documents/types';
import { nanoid } from 'nanoid';
import { ALL_FORMATS, BlobSource, CanvasSink, Input } from 'mediabunny';

interface VideoDropzoneProps {
  value?: File | null;
  onChange: ( file: File | null ) => void;
  onUploadSuccess?: ( data: VideoUploadResponseData ) => void;
  className?: string;
  gigId: string;
}

export function VideoDropzone( { value, onChange, onUploadSuccess, className, gigId }: VideoDropzoneProps ) {
  const [ fileItem, setFileItem ] = useState<UploadedFile | null>( null );

  const handleDrop = useCallback(
    async ( files: File[] ) => {
      if ( files.length > 0 ) {
        const file = files[ 0 ];
        onChange( file );

        // Generate preview
        let preview = URL.createObjectURL( file ); // Default to blob URL (might work for some browsers/players)

        if ( file.type.startsWith( 'video/' ) ) {
          try {
            const source = new BlobSource( file );
            const input = new Input( {
              source,
              formats: ALL_FORMATS,
            } );
            const videoTrack = await input.getPrimaryVideoTrack();
            if ( videoTrack && await videoTrack.canDecode() ) {
              const width = 320;
              const sink = new CanvasSink( videoTrack, { width } );
              const result = await sink.getCanvas( 0 ); // Get first frame
              if ( result ) {
                preview = ( result.canvas as HTMLCanvasElement ).toDataURL();
              }
            }
          } catch ( e ) {
            console.error( "Failed to generate video thumbnail", e );
          }
        }

        // Create an UploadedFile item for the card
        const newItem: UploadedFile = {
          id: nanoid(),
          file: file,
          name: file.name,
          type: file.type,
          status: 'uploading',
          preview: preview,
          url: '',
        };
        setFileItem( newItem );
      }
    },
    [ onChange ]
  );

  const handleRemove = useCallback( () => {
    onChange( null );
    setFileItem( null );
  }, [ onChange ] );

  const handleUploadSuccess = useCallback( ( id: string, data: VideoUploadResponseData ) => {
    setFileItem( prev => prev ? { ...prev, status: 'success', url: data.video_url } : null );
    onUploadSuccess?.( data );
  }, [ onUploadSuccess ] );

  const handleUploadError = useCallback( ( id: string, error: Error ) => {
    setFileItem( prev => prev ? { ...prev, status: 'error', error: error.message } : null );
    console.error( 'Upload failed:', error );
  }, [] );

  const handleRetry = useCallback( () => {
    setFileItem( prev => prev ? { ...prev, status: 'uploading' } : null );
  }, [] );


  // Sync external value reset
  useEffect( () => {
    if ( !value && fileItem ) {
      queueMicrotask( () => setFileItem( null ) );
    }
  }, [ value, fileItem ] );

  return (
    <div className={ cn( "w-full", className ) }>
      { !fileItem ? (
        <Dropzone
          onDrop={ handleDrop }
          accept={ { 'video/*': [ '.mp4', '.mov', '.webm' ] } }
          maxFiles={ 1 }
          className="bg-card border-dashed border-2 border-muted-foreground/25 hover:bg-accent/50 transition-colors"
        >
          { () => (
            <div className="flex flex-col items-center justify-center p-6 gap-4 text-center min-h-[200px]">
              <DropzoneEmptyState className="gap-2">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-2">
                  <VideoFileIcon className="w-8 h-8 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">
                    Drag & drop your video here
                  </p>
                  <p className="text-xs text-muted-foreground">
                    or click to browse from your computer
                  </p>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Supports MP4, MOV, WEBM (Max 500MB)
                </p>
              </DropzoneEmptyState>
            </div>
          ) }
        </Dropzone>
      ) : (
        <div className="w-full max-w-[200px] mx-auto">
          <FileCardVideoSubmission
            item={ fileItem }
            onRemove={ handleRemove }
            onUploadSuccess={ handleUploadSuccess }
            onUploadError={ handleUploadError }
            onRetry={ handleRetry }
            onPreview={ () => { } } // No preview action needed for now
            isOverlay={ false }
            gigId={ gigId }
          />
        </div>
      ) }
    </div>
  );
}
