'use client';

import { useParams, useRouter } from 'next/navigation';
import { useBasePath } from '@/lib/providers/path-provider';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import * as React from 'react';

import { useCreateGig } from '@/lib/api/hooks/gigs';
import type { ApiError } from '@/lib/api/hooks/types';
import { useCampaign } from '@/lib/api/hooks/campaigns';
import { ModelsCreateGigRequest, ModelsCreateGigRequestGenderRequirementEnum } from '@/lib/api/generated/models';
import { GigForm } from '@/components/gigs/gig-form';
import { CreateGigSchema } from '@/components/gigs/schema';

export default function CreateGigPage() {
  const params = useParams<{ id: string; }>();
  const router = useRouter();
  const basePath = useBasePath();
  const campaignId = params.id;

  const { data: campaignResponse, isLoading: campaignLoading } = useCampaign( campaignId );
  const createGig = useCreateGig();

  // Prepopulate fields from campaign
  const initialData = React.useMemo( () => ( {
    video_duration_in_seconds: campaignResponse?.video_duration_in_seconds || 30,
    number_of_videos: campaignResponse?.number_of_videos_wanted || 1,
    ambience: campaignResponse?.tone_of_voice || '',
    content_guidelines: campaignResponse?.dos || '',
  } ), [ campaignResponse ] );

  if ( campaignLoading ) {
    return (
      <div className='flex items-center justify-center min-h-[400px]'>
        <Loader2 className='size-8 animate-spin text-muted-foreground' />
      </div>
    );
  }

  const campaignName = campaignResponse?.campaign_name || 'Campaign';

  const handleSubmit = async ( data: CreateGigSchema ) => {
    const { submission_enforcement, ...rest } = data as any;
    const requestData: ModelsCreateGigRequest = {
      ...rest,
      campaign_id: campaignId,
      posting_start_date: data.posting_start_date.toISOString(),
      posting_end_date: data.posting_end_date.toISOString(),
      requirements: data.requirements || undefined,
      content_guidelines: data.content_guidelines || undefined,
      ambience: data.ambience || undefined,
      gender_requirement: ( data.gender_requirement || undefined ) as ModelsCreateGigRequestGenderRequirementEnum,
      enforce_single_creator_submission: submission_enforcement === 'single',
      enforce_unique_creator_submission: submission_enforcement === 'unique',
    };

    try {
      await createGig.mutateAsync( requestData );
      toast.success( 'Gig created successfully', {
        richColors: true,
      } );
      router.push( `${ basePath }/campaigns/${ campaignId }#gigs` );
    } catch ( err ) {
      const error = err as ApiError;
      toast.error( 'Failed to create gig', {
        description: error?.response?.data?.error?.message,
        richColors: true,
      } );
      console.error( 'Failed to create gig:', error );
    }
  };

  return (
    <GigForm
      campaignId={ campaignId }
      campaignName={ campaignName }
      onSubmit={ handleSubmit }
      isSubmitting={ createGig.isPending }
      initialData={ initialData }
    />
  );
}
