"use client";

import { useCreateVideoSubmission } from '@/lib/api/hooks/video-submissions';
import { VideoDropzone } from '@/components/creator/video-dropzone';
import { Button } from '@/components/dashboard-ui/button';
import { Input } from '@/components/dashboard-ui/input';
import { Label } from '@/components/dashboard-ui/label';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/dashboard-ui/sheet';
import { Textarea } from '@/components/dashboard-ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

const formSchema = z.object( {
  title: z.string().min( 1, 'Title is required' ),
  description: z.string().optional(),
  video: z
    .any()
    .refine( ( file ) => file instanceof File, 'Video file is required' )
    .refine( ( file ) => file?.size <= 500 * 1024 * 1024, 'Max file size is 500MB' ) // 500MB limit
    .refine(
      ( file ) => [ 'video/mp4', 'video/quicktime', 'video/webm' ].includes( file?.type ),
      'Only .mp4, .mov, and .webm formats are supported'
    ),
} );

interface CreateSubmissionSheetProps {
  open: boolean;
  onOpenChange: ( open: boolean ) => void;
  gigId: string;
}

export function CreateSubmissionSheet( {
  open,
  onOpenChange,
  gigId,
}: CreateSubmissionSheetProps ) {
  const { mutate: createSubmission, isPending: isCreating } = useCreateVideoSubmission();
  const [ videoData, setVideoData ] = useState<{ url: string; filename: string; } | null>( null );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm<z.infer<typeof formSchema>>( {
    resolver: zodResolver( formSchema ),
    defaultValues: {
      title: '',
      description: '',
    },
  } );

  const onSubmit = async ( values: z.infer<typeof formSchema> ) => {
    if ( !gigId ) {
      toast.error( 'Gig ID is missing' );
      return;
    }

    if ( !videoData ) {
      toast.error( 'Please wait for the video to finish uploading' );
      return;
    }

    createSubmission(
      {
        gig_id: gigId,
        title: values.title,
        description: values.description,
        video_url: videoData.url,
        video_filename: videoData.filename,
      },
      {
        onSuccess: () => {
          toast.success( 'Submission created successfully' );
          onOpenChange( false );
          reset();
          setVideoData( null );
        },
        onError: ( error ) => {
          toast.error( 'Failed to create submission' );
          console.error( error );
        },
      }
    );
  };

  const isSubmitting = isCreating;

  return (
    <Sheet open={ open } onOpenChange={ onOpenChange }>
      <SheetContent className="sm:max-w-[500px] w-full">
        <SheetHeader>
          <SheetTitle>Create Submission</SheetTitle>
          <SheetDescription>
            Upload your video submission for this gig and add details.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={ handleSubmit( onSubmit ) } className="space-y-6 py-6 h-full flex flex-col">
          <div className="space-y-4 flex-1 overflow-y-auto">
            <div className="space-y-2">
              <Label htmlFor="video">Video File</Label>
              <Controller
                control={ control }
                name="video"
                render={ ( { field: { value, onChange } } ) => (
                  <VideoDropzone
                    value={ value }
                    gigId={ gigId || '' }
                    onChange={ ( file ) => {
                      onChange( file );
                      if ( !file ) setVideoData( null );
                    } }
                    onUploadSuccess={ ( data ) => {
                      console.log( "Video uploaded", data );
                      setVideoData( { url: data.video_url, filename: data.filename } );
                    } }
                  />
                ) }
              />
              { errors.video && (
                <p className="text-sm text-destructive">{ errors.video.message as string }</p>
              ) }
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Submission title"
                { ...register( 'title' ) }
              />
              { errors.title && (
                <p className="text-sm text-destructive">{ errors.title.message }</p>
              ) }
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                placeholder="Add any notes about your submission..."
                className="resize-none min-h-[100px]"
                { ...register( 'description' ) }
              />
              { errors.description && (
                <p className="text-sm text-destructive">{ errors.description.message }</p>
              ) }
            </div>
          </div>

          <SheetFooter>
            <Button
              type="button"
              variant="outline"
              onClick={ () => onOpenChange( false ) }
              disabled={ isSubmitting }
            >
              Cancel
            </Button>
            <Button type="submit" disabled={ isSubmitting }>
              { isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" /> }
              { isCreating ? 'Submitting...' : 'Submit' }
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
