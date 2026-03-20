"use client";

import { useCreateVideoSubmission } from '@/lib/api/hooks/video-submissions';
import { useGig } from '@/lib/api/hooks/gigs';
import { VideoDropzone } from '@/components/creator/video-dropzone';
import { Button } from '@/components/dashboard-ui/button';
import { FieldGroup } from '@/components/dashboard-ui/field';
import { SuperField } from '@/components/dashboard-ui/super-field';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/dashboard-ui/sheet';
import { Separator } from '@/components/dashboard-ui/separator';
import { WrappedCard } from '@/components/dashboard-ui/wrapped-card';
import { BrandAvatar } from '@/components/campaigns/brand-avatar';
import { GigStatusBadge } from '@/components/campaigns/gig-status-badge';
import { imgpresets } from '@/lib/utils/imgproxy';
import { formatDate } from '@/lib/utils';
import { useFormatCurrency } from '@/lib/hooks/format';
import type { ModelsGigResponse } from '@/lib/api/generated';
import { useForm } from '@tanstack/react-form';
import { Loader2, Upload, VideoIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod/v4';
import { SentenceCase, TextCapitalize } from '../text-case';

// ─── Schema ───────────────────────────────────────────────────────────────────

const submissionSchema = z.object( {
  title: z.string().min( 1, 'Title is required' ),
  description: z.union( [ z.string(), z.undefined() ] ),
  video: z
    .any()
    .refine( ( file ) => file instanceof File, 'Video file is required' )
    .refine( ( file ) => file?.size <= 500 * 1024 * 1024, 'Max file size is 500MB' )
    .refine(
      ( file ) => [ 'video/mp4', 'video/quicktime', 'video/webm' ].includes( file?.type ),
      'Only .mp4, .mov, and .webm formats are supported'
    ),
} );

type SubmissionValues = z.infer<typeof submissionSchema>;

type ValidationError = string | { message?: string; } | undefined;

function getErrorMessage( error: ValidationError ): string {
  if ( typeof error === 'string' ) return error;
  if ( error && typeof error === 'object' && 'message' in error ) return error.message || '';
  return String( error ?? '' );
}

function getFieldError( field: { state: { meta: { isTouched: boolean; errors: ValidationError[] | null; }; }; } ): string | undefined {
  const { isTouched, errors } = field.state.meta;
  return isTouched && errors?.length ? errors.map( getErrorMessage ).join( ', ' ) : undefined;
}

// ─── Gig context card ────────────────────────────────────────────────────────

function GigContextCard( { gig }: { gig: ModelsGigResponse; } ) {
  const formattedCompensation = useFormatCurrency(
    gig.compensation?.value ?? 0,
    gig.compensation?.currency || 'EUR'
  );

  const coverImage =
    gig.campaign?.product_image?.asset !== ''
      ? gig.campaign?.product_image?.asset
      : gig.campaign?.campaign_images?.[ 0 ]?.asset;

  const brand = gig.campaign?.brand;

  return (
    <div className="relative mx-1">
      { /* Header card — mirrors GigSheetHeader */ }
      <div className="relative flex flex-row items-start gap-4 bg-burgundy-50/70 rounded-lg border border-primary/20 p-4">
        <div className="flex gap-8 flex-1 min-w-0 justify-between">
          <div className='flex flex-col gap-2 flex- min-w-0'>
            <p className="text-xl font-normal text-primary font-primary tracking-tight leading-snug">
              { gig.title }
            </p>
            <div className="flex flex-wrap gap-2 items-center text-sm">
              { gig.number_of_videos && (
                <div className="flex items-center gap-1.5">
                  <VideoIcon className="size-4 shrink-0" strokeWidth={ 1 } />
                  { gig.number_of_videos } video{ gig.number_of_videos > 1 ? 's' : '' }
                  { gig.video_duration_in_seconds ? ` · ${ gig.video_duration_in_seconds }s` : '' }
                </div>
              ) }
              { gig.posting_end_date && (
                <>
                  <Separator orientation="vertical" className="h-3.5 bg-muted-foreground/30" />
                  <span className="text-muted-foreground/70">Deadline </span>
                  { formatDate( gig.posting_end_date ) }
                </>
              ) }
            </div>
            <div className="flex items-center gap-3">
              <GigStatusBadge status={ gig.gig_status } className="self-start" />
              { gig.compensation?.value && (
                <span className="font-primary text-primary text-base leading-none">
                  { formattedCompensation }
                </span>
              ) }
            </div>
          </div>
          { /* Cover image */ }
          { coverImage && (
            <div className="relative aspect-4/3 overflow-hidden rounded-lg w-30">
              <img
                src={ imgpresets.banner( coverImage ) }
                alt={ gig.campaign?.campaign_name }
                className="w-full h-full object-cover object-[50%_20%]"
              />
            </div>
          ) }
        </div>

        { brand && (
          <BrandAvatar
            brand={ brand as any }
            className="size-12 shrink-0 cursor-pointer bg-background ring-2 ring-background"
          />
        ) }
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

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
  const { data: gigResponse } = useGig( gigId, { enabled: open && !!gigId } );
  const gig = gigResponse?.data;
  const [ videoData, setVideoData ] = useState<{ url: string; filename: string; thumbnail?: string; } | null>( null );

  const form = useForm( {
    defaultValues: {
      title: '',
      description: undefined,
      video: null,
    } as SubmissionValues,
    validators: {
      onSubmit: submissionSchema
    },
    onSubmit: async ( { value } ) => {
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
          title: value.title,
          description: value.description,
          video: { asset: videoData.url, thumbnail: videoData.thumbnail },
          video_filename: videoData.filename,
        },
        {
          onSuccess: () => {
            toast.success( 'Submission created successfully' );
            onOpenChange( false );
            form.reset();
            setVideoData( null );
          },
          onError: ( error ) => {
            toast.error( 'Failed to create submission', {
              description: <SentenceCase>{ error.response?.data?.error?.message ?? "" }</SentenceCase>,
              richColors: true,
            } );
            console.error( error );
          },
        }
      );
    },
  } );

  const handleFormSubmit = ( e: React.BaseSyntheticEvent ) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  };

  return (
    <Sheet open={ open } onOpenChange={ onOpenChange }>
      <SheetContent className="w-[97%]! max-w-[550px]! overflow-hidden bg-background/80 flex flex-col p-0!">

        { /* ── Header ── */ }
        <SheetHeader className="relative flex flex-col gap-2 mx-3 rounded-lg pb-0">
          <SheetTitle className="text-xl font-normal text-primary font-primary tracking-tight leading-snug">
            Create Submission
          </SheetTitle>
          <SheetDescription>
            Upload your video and add details for this gig.
          </SheetDescription>
        </SheetHeader>

        { /* ── Form body ── */ }
        <form
          id="create-submission-form"
          noValidate
          onSubmit={ handleFormSubmit }
          className="flex flex-col flex-1 min-h-0"
        >
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">

            { /* Gig context */ }
            { gig && <GigContextCard gig={ gig } /> }

            { /* Video upload */ }
            <div className="m-1 mb-3">
              <form.Field name="video">
                { ( field ) => (
                  <>
                    <VideoDropzone
                      value={ field.state.value }
                      videoAspect
                      showTitle={ false }
                      onChange={ ( file ) => {
                        field.handleChange( file );
                        if ( !file ) setVideoData( null );
                      } }
                      onUploadSuccess={ ( data ) => {
                        setVideoData( { url: data.video_url, filename: data.filename, thumbnail: data.thumbnail_url } );
                      } }
                    />
                    { getFieldError( field ) && (
                      <p className="text-sm text-destructive mt-1">{ getFieldError( field ) }</p>
                    ) }
                  </>
                ) }
              </form.Field>
            </div>

            { /* Submission details */ }
            <WrappedCard title="Submission Details" className="m-1">
              <FieldGroup>
                <form.Field name="title">
                  { ( field ) => (
                    <SuperField
                      type="text"
                      label="Title"
                      required
                      placeholder="Give your submission a title"
                      value={ field.state.value }
                      onChange={ ( e: React.ChangeEvent<HTMLInputElement> ) => field.handleChange( e.target.value ) }
                      onBlur={ field.handleBlur }
                      error={ getFieldError( field ) }
                    />
                  ) }
                </form.Field>

                <form.Field name="description">
                  { ( field ) => (
                    <SuperField
                      type="textarea"
                      label="Notes"
                      placeholder="Add any notes about your submission..."
                      fieldClassName="resize-none min-h-[90px]"
                      value={ field.state.value }
                      onChange={ ( e: React.ChangeEvent<HTMLTextAreaElement> ) => field.handleChange( e.target.value ) }
                      onBlur={ field.handleBlur }
                      error={ getFieldError( field ) }
                    />
                  ) }
                </form.Field>
              </FieldGroup>
            </WrappedCard>

          </div>

          { /* ── Footer ── */ }
          <SheetFooter className="px-6 pb-6 pt-3 shrink-0 flex flex-col gap-2 border-t border-border/50">
            <form.Subscribe selector={ ( state ) => [ state.canSubmit, state.isSubmitting ] }>
              { ( [ canSubmit, isSubmitting ] ) => {
                const isPending = isSubmitting || isCreating;
                return (
                  <Button
                    type="submit"
                    form="create-submission-form"
                    disabled={ !canSubmit || isPending }
                    className="w-full"
                  >
                    { isPending
                      ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Submitting...</>
                      : <><Upload className="mr-2 h-4 w-4" />Submit Video</>
                    }
                  </Button>
                );
              } }
            </form.Subscribe>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={ () => onOpenChange( false ) }
              disabled={ isCreating }
            >
              Cancel
            </Button>
          </SheetFooter>
        </form>

      </SheetContent>
    </Sheet>
  );
}
