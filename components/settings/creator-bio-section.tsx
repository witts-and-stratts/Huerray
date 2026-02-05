'use client';

import { useState, useCallback } from 'react';
import { SuperField } from '@/components/dashboard-ui/super-field';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/dashboard-ui/card';
import { Dropzone } from '@/components/ui/shadcn-io/dropzone';
import { Button } from '@/components/dashboard-ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/dashboard-ui/dialog';
import { VideoIcon, UploadIcon, Trash2, Play, Loader2, RefreshCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { creatorSettingsSchema, CreatorSettings, ReactFormApi } from './creator-settings-schema';
import { UploadApiFactory } from '@/lib/api/generated/api/upload-api';
import { apiClient, apiConfiguration, BASE_URL } from '@/lib/api/client';
import { ModelsUploadsImagePost200Response } from '@/lib/api/models/models-uploads-image-post200-response';
import { VideoFileIcon } from '../campaigns/sections/documents/video-file-icon';
import { UtilsBrandCategory } from '@/lib/api/generated';

export function CreatorBioSection( { form }: { form: ReactFormApi<CreatorSettings>; } ) {
  const [ videoFile, setVideoFile ] = useState<File | null>( null );
  const [ videoPreviewUrl, setVideoPreviewUrl ] = useState<string | null>( null );
  const [ isVideoPreviewOpen, setIsVideoPreviewOpen ] = useState( false );
  const [ isHovering, setIsHovering ] = useState( false );
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
      const onProgress = ( progressEvent: any ) => {
        const percentCompleted = Math.round( ( progressEvent.loaded * 100 ) / ( progressEvent.total || 100 ) );
        localMaxProgress = Math.max( localMaxProgress, percentCompleted );
        setUploadProgress( localMaxProgress );
      };

      const response = await uploadApi.uploadsVideosPost( { videos: file }, {
        headers: { 'Content-Type': undefined } as any,
        onUploadProgress: onProgress,
        timeout: 3600000 // 1 hour
      } ) as unknown as ModelsUploadsImagePost200Response;

      const result = response.data as any;
      const uploadedFile = ( result.data as any[] )?.[ 0 ];

      if ( uploadedFile ) {
        let fullUrl = '';
        if ( uploadedFile.url ) {
          fullUrl = uploadedFile.url.startsWith( 'http' )
            ? uploadedFile.url
            : `${ BASE_URL.replace( '/api/v1', '' ) }${ uploadedFile.url }`;
        }

        console.log( "fullUrl", fullUrl );

        if ( fullUrl ) {
          form.setFieldValue( 'applicationVideo', fullUrl );
          toast.success( 'Video uploaded successfully' );
        } else {
          console.error( 'Upload successful but could not resolve URL:', uploadedFile );
          toast.error( 'Upload verification failed' );
          setUploadError( true );
        }
      } else {
        console.error( 'Unexpected upload response structure:', result );
        toast.error( 'Upload response invalid' );
        setUploadError( true );
      }

    } catch ( error: any ) {
      console.error( 'Video upload failed', error );
      const msg = error.response?.data?.message || error.message || 'Failed to upload video';
      toast.error( msg );
      setUploadError( true );
    } finally {
      setIsUploading( false );
      setUploadProgress( 0 );
    }
  }, [ form ] );

  const handleVideoDrop = useCallback( async ( acceptedFiles: File[] ) => {
    const file = acceptedFiles[ 0 ];
    if ( file ) {
      // Set preview immediately
      if ( videoPreviewUrl ) {
        URL.revokeObjectURL( videoPreviewUrl );
      }
      setVideoFile( file );
      const url = URL.createObjectURL( file );
      setVideoPreviewUrl( url );

      await uploadVideo( file );
    }
  }, [ videoPreviewUrl, uploadVideo ] );

  const handleRetryUpload = useCallback( ( e: React.MouseEvent ) => {
    e.stopPropagation();
    if ( videoFile ) {
      uploadVideo( videoFile );
    }
  }, [ videoFile, uploadVideo ] );

  const handleRemoveVideo = useCallback( ( e: React.MouseEvent ) => {
    e.stopPropagation();
    if ( videoPreviewUrl ) {
      URL.revokeObjectURL( videoPreviewUrl );
    }
    setVideoFile( null );
    setVideoPreviewUrl( null );
    setUploadError( false );
    form.setFieldValue( 'applicationVideo', '' );
  }, [ videoPreviewUrl, form ] );

  const handleVideoPreviewClick = useCallback( ( e: React.MouseEvent ) => {
    e.stopPropagation();
    if ( videoPreviewUrl ) {
      setIsVideoPreviewOpen( true );
    }
  }, [ videoPreviewUrl ] );

  const handleDropError = useCallback( ( error: Error ) => {
    const message = error.message || 'Failed to upload video';
    if ( message.toLowerCase().includes( 'larger' ) || message.toLowerCase().includes( 'size' ) ) {
      toast.error( 'File too large', {
        description: 'Please select a video smaller than 100MB.'
      } );
    } else {
      toast.error( 'Upload failed', {
        description: message
      } );
    }
  }, [] );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 max-w-5xl">
      <Card className='md:col-span-3'>
        <CardHeader>
          <CardTitle>Biography</CardTitle>
          <CardDescription>Tell us about yourself. This will be shown on your public profile.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form.Field
            name="bio"
            validators={ {
              onBlur: creatorSettingsSchema.shape.bio,
            } }
            children={ ( field: any ) => (
              <SuperField
                type="editor"
                value={ field.state.value }
                onChange={ ( value ) => field.handleChange( value ) }
                placeholder="Write something about yourself..."
                fieldClassName="min-h-[250px]"
                error={ field.state.meta.errors ? field.state.meta.errors.map( ( e: any ) => e.message || String( e ) ).join( ', ' ) : undefined }
              />
            ) }
          />

          <form.Field
            name="preferredCategories"
            validators={ {
              onBlur: creatorSettingsSchema.shape.preferredCategories,
            } }
            children={ ( field: any ) => (
              <SuperField
                type="multi-select"
                allowCustom={ true }
                label="Preferred Categories"
                description="Select the categories that best describe your content."
                value={ field.state.value || [] }
                onValueChange={ ( val: string[] ) => field.handleChange( val ) }
                options={ Object.values( UtilsBrandCategory ).map( ( category ) => ( {
                  label: category.replace( /_/g, ' ' ),
                  value: category
                } ) ) }
                placeholder="Select categories..."
                error={ field.state.meta.errors ? field.state.meta.errors.map( ( e: any ) => e.message || String( e ) ).join( ', ' ) : undefined }
              />
            ) }
          />
        </CardContent>
      </Card>

      <Card className='md:col-span-2'>
        <CardHeader>
          <CardTitle>Application Video</CardTitle>
          <CardDescription>Upload a short video introducing yourself to brands.</CardDescription>
        </CardHeader>
        <CardContent>
          <form.Field
            name="applicationVideo"
            validators={ {
              onSubmit: creatorSettingsSchema.shape.applicationVideo,
            } }
            children={ ( field: any ) => {
              const hasVideo = !!( videoPreviewUrl || field.state.value );
              const currentVideoUrl = videoPreviewUrl || field.state.value;
              const fieldError = field.state.meta.errors?.length > 0
                ? field.state.meta.errors.map( ( e: any ) => e.message || String( e ) ).join( ', ' )
                : undefined;

              return (
                <>
                  <Dropzone
                    accept={ { 'video/*': [ '.mp4', '.mov', '.avi', '.webm' ] } }
                    maxSize={ 100 * 1024 * 1024 }
                    maxFiles={ 1 }
                    onDrop={ handleVideoDrop }
                    onError={ handleDropError }
                    disabled={ isUploading }
                    className={ cn(
                      "w-full border-dashed transition-all min-h-[250px]",
                      hasVideo && !uploadError && "border-green-500/30 bg-green-500/5",
                      hasVideo && uploadError && "border-destructive/30 bg-destructive/5",
                      isUploading && "pointer-events-none opacity-50",
                      fieldError && !hasVideo && "border-destructive bg-destructive/5"
                    ) }
                  >
                    { ( { isDragActive } ) => (
                      <div className="flex flex-col items-center justify-center py-6 w-full h-full">
                        { hasVideo ? (
                          <div
                            className="relative group flex flex-col items-center w-full"
                            onMouseEnter={ () => setIsHovering( true ) }
                            onMouseLeave={ () => setIsHovering( false ) }
                          >
                            {/* Video Thumbnail */ }
                            <div className={ cn(
                              "relative w-full aspect-video rounded-lg overflow-hidden border-2 bg-black",
                              uploadError ? "border-destructive" : "border-slate-200"
                            ) }>
                              <video
                                src={ currentVideoUrl }
                                className="w-full h-full object-contain"
                                muted
                                playsInline
                              />

                              {/* Upload Progress Overlay */ }
                              { isUploading && (
                                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-2 z-20">
                                  <Loader2 className="w-8 h-8 animate-spin text-white" />
                                  <p className="text-sm font-medium text-white">Uploading... { uploadProgress }%</p>
                                  <div className="w-32 h-1 bg-white/20 rounded-full overflow-hidden mt-1">
                                    <div
                                      className="h-full bg-primary transition-all duration-300 ease-out"
                                      style={ { width: `${ uploadProgress }%` } }
                                    />
                                  </div>
                                </div>
                              ) }

                              {/* Error Overlay */ }
                              { !isUploading && uploadError && (
                                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-3 z-10 p-4">
                                  <p className="text-white text-sm font-medium text-center">Upload Failed</p>
                                  <div className="flex items-center gap-2">
                                    <Button
                                      type="button"
                                      variant="secondary"
                                      size="sm"
                                      className="h-8 gap-2"
                                      onClick={ handleRetryUpload }
                                    >
                                      <RefreshCcw className="w-4 h-4" />
                                      Retry
                                    </Button>
                                    <Button
                                      type="button"
                                      variant="destructive"
                                      size="icon"
                                      className="h-8 w-8"
                                      onClick={ handleRemoveVideo }
                                      title="Remove"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                  </div>
                                </div>
                              ) }

                              {/* Overlay with actions on hover (only when not uploading and no error) */ }
                              { !isUploading && !uploadError && (
                                <div
                                  className={ cn(
                                    "absolute inset-0 bg-black/50 flex items-center justify-center gap-3 transition-opacity",
                                    isHovering ? "opacity-100" : "opacity-0"
                                  ) }
                                >
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="bg-background/80 hover:bg-background rounded-full h-10 w-10"
                                    onClick={ ( e ) => {
                                      e.stopPropagation();
                                      setVideoPreviewUrl( currentVideoUrl );
                                      setIsVideoPreviewOpen( true );
                                    } }
                                    title="Play"
                                  >
                                    <Play className="w-5 h-5" />
                                  </Button>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="bg-background/80 hover:bg-background hover:text-destructive rounded-full h-10 w-10"
                                    onClick={ handleRemoveVideo }
                                    title="Remove"
                                  >
                                    <Trash2 className="w-5 h-5" />
                                  </Button>
                                </div>
                              ) }
                            </div>

                            {/* File name */ }
                            <p className="text-xs text-muted-foreground text-center mt-3 max-w-full truncate px-4">
                              { videoFile?.name || 'Current Video' }
                            </p>
                            <p className="text-xs text-muted-foreground/60 text-center mt-1">
                              { isUploading ? 'Please wait...' : 'Click or drag to replace' }
                            </p>
                          </div>
                        ) : (
                          <>
                            <div className={ cn(
                              "relative w-16 h-16 rounded-lg flex items-center justify-center mb-4 transition-colors",
                              isDragActive && "bg-primary/10 border-primary"
                            ) }>
                              { isDragActive ? (
                                <UploadIcon className="w-8 h-8 text-primary" />
                              ) : (
                                <VideoFileIcon className={ cn( 'size-10', fieldError ? 'text-destructive' : 'text-primary' ) } />
                              ) }
                            </div>
                            <p className={ cn( "text-sm font-medium text-center", fieldError && "text-destructive" ) }>
                              { isDragActive ? 'Drop your video here' : 'Upload Application Video' }
                            </p>
                            <p className="text-xs text-muted-foreground text-center mt-1 font-regular">
                              Drag and drop or click to upload
                            </p>
                            <p className="text-xs text-muted-foreground text-center mt-1 font-regular">
                              MP4, MOV, AVI, WebM up to 100MB
                            </p>
                          </>
                        ) }
                      </div>
                    ) }
                  </Dropzone>
                  { fieldError && (
                    <p className="text-xs text-destructive mt-2">{ fieldError }</p>
                  ) }
                </>
              );
            }
            }
          />
        </CardContent>
      </Card>

      {/* Video Preview Dialog */ }
      <Dialog open={ isVideoPreviewOpen } onOpenChange={ setIsVideoPreviewOpen }>
        <DialogContent className="w-full md:w-[800px] md:max-w-none p-0 overflow-hidden flex flex-col bg-background/95 backdrop-blur-sm gap-0">
          <DialogHeader className="p-4 border-b shrink-0">
            <DialogTitle className="truncate pr-8 text-sm font-normal text-muted-foreground">
              { videoFile?.name }
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-hidden relative bg-black flex items-center justify-center">
            { videoPreviewUrl && (
              <video
                src={ videoPreviewUrl }
                className="max-w-full max-h-[70vh] object-contain"
                controls
                autoPlay
                playsInline
              />
            ) }
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
