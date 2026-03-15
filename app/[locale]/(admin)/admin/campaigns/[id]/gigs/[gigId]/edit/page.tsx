'use client';

import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import * as React from 'react';

import { useUpdateGig, useGig } from '@/lib/api/hooks/gigs';
import { useCampaign } from '@/lib/api/hooks/campaigns';
import { ModelsUpdateGigRequest, ModelsUpdateGigRequestGenderRequirementEnum, ModelsMoney } from '@/lib/api/generated/models';
import { GigForm } from '@/components/gigs/gig-form';
import { CreateGigSchema } from '@/components/gigs/schema';
import { ModelsStandardCampaignResponse, ModelsStandardGigResponse } from '@/lib/api/generated/models';

export default function EditGigPage() {
  const params = useParams<{ id: string; gigId: string; }>();
  const router = useRouter();
  const campaignId = params.id;
  const gigId = params.gigId;

  const { data: campaignResponse, isLoading: campaignLoading } = useCampaign( campaignId );
  const { data: gigResponse, isLoading: gigLoading } = useGig( gigId );
  const updateGig = useUpdateGig();

  if ( campaignLoading || gigLoading ) {
    return (
      <div className='flex items-center justify-center min-h-[400px]'>
        <Loader2 className='size-8 animate-spin text-muted-foreground' />
      </div>
    );
  }

  const campaign = ( campaignResponse as ModelsStandardCampaignResponse )?.data;
  const gig = ( gigResponse as ModelsStandardGigResponse )?.data;
  const campaignName = campaign?.campaign_name || 'Campaign';

  if ( !gig ) {
    return <div>Gig not found</div>;
  }

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
      await updateGig.mutateAsync( { id: gigId, gig: requestData } );
      toast.success( 'Gig updated successfully' );
      router.push( `/admin/campaigns/${ campaignId }` );
    } catch ( error ) {
      toast.error( 'Failed to update gig' );
      console.error( 'Failed to update gig:', error );
    }
  };

  return (
    <GigForm
      campaignId={ campaignId }
      campaignName={ campaignName }
      onSubmit={ handleSubmit }
      isSubmitting={ updateGig.isPending }
      initialData={ initialData }
    />
  );
}
