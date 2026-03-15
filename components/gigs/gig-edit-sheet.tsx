'use client';

import * as React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/dashboard-ui/sheet';
import { GigForm } from './gig-form';
import { ModelsGigResponse, ModelsUpdateGigRequest, ModelsUpdateGigRequestGenderRequirementEnum, ModelsMoney } from '@/lib/api/generated/models';
import { useUpdateGig } from '@/lib/api/hooks/gigs';
import { toast } from 'sonner';
import { CreateGigSchema } from './schema';

interface GigEditSheetProps {
  gig: ModelsGigResponse | null;
  open: boolean;
  onOpenChange: ( open: boolean ) => void;
  onSuccess?: () => void;
}

export function GigEditSheet( { gig, open, onOpenChange, onSuccess }: GigEditSheetProps ) {
  const updateGig = useUpdateGig();

  if ( !gig ) return null;

  const initialData: Partial<CreateGigSchema> = {
    title: gig.title || '',
    compensation: gig.compensation?.value ?? 0,
    gig_cost: gig.gig_cost?.value ?? 0,
    number_of_videos: gig.number_of_videos || 1,
    video_duration_in_seconds: gig.video_duration_in_seconds || 30,
    posting_start_date: gig.posting_start_date ? new Date( gig.posting_start_date ) : undefined,
    posting_end_date: gig.posting_end_date ? new Date( gig.posting_end_date ) : undefined,
    age_min: gig.age_min || 18,
    age_max: gig.age_max || 65,
    gender_requirement: ( gig.gender_requirement as any ) || 'any',
    requirements: gig.requirements || '',
    content_guidelines: gig.content_guidelines || '',
    ambience: gig.ambience || '',
    submission_enforcement: gig.enforce_unique_creator_submission ? 'unique' : 'single',
  };

  const handleSubmit = async ( data: CreateGigSchema ) => {
    if ( !gig.id ) return;

    const requestData: ModelsUpdateGigRequest = {
      title: data.title,
      compensation: { value: data.compensation, currency: 'EUR' } as ModelsMoney,
      gig_cost: { value: data.gig_cost, currency: 'EUR' } as ModelsMoney,
      number_of_videos: data.number_of_videos,
      video_duration_in_seconds: data.video_duration_in_seconds,
      posting_start_date: data.posting_start_date.toISOString(),
      posting_end_date: data.posting_end_date.toISOString(),
      age_min: data.age_min,
      age_max: data.age_max,
      gender_requirement: ( data.gender_requirement || undefined ) as ModelsUpdateGigRequestGenderRequirementEnum,
      requirements: data.requirements || undefined,
      content_guidelines: data.content_guidelines || undefined,
      ambience: data.ambience || undefined,
      enforce_single_creator_submission: data.submission_enforcement === 'single',
      enforce_unique_creator_submission: data.submission_enforcement === 'unique',
    };

    try {
      await updateGig.mutateAsync( { id: gig.id, gig: requestData } );
      toast.success( 'Gig updated successfully', {
        description: 'Your gig has been updated successfully',
        richColors: true,
      } );
      onOpenChange( false );
      onSuccess?.();
    } catch ( error ) {
      toast.error( 'Failed to update gig' );
      console.error( 'Failed to update gig:', error );
    }
  };

  return (
    <Sheet open={ open } onOpenChange={ onOpenChange }>
      <SheetContent className="w-full data-[side=right]:sm:max-w-2xl overflow-hidden p-0 flex flex-col" side="right">
        <SheetHeader className="px-6 py-4 border-b">
          <SheetTitle>Edit Gig</SheetTitle>
          <SheetDescription>
            Make changes to your gig details below.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-hidden">
          <GigForm
            campaignId={ gig.campaign_id || '' }
            campaignName="Campaign" // We might want to pass this if available, or just generic
            onSubmit={ handleSubmit }
            isSubmitting={ updateGig.isPending }
            initialData={ initialData }
            layout="sheet"
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
