'use client';

import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import * as React from 'react';

import { useCreateGig } from '@/lib/api/hooks/gigs';
import { useCampaign } from '@/lib/api/hooks/campaigns';
import { ModelsCampaignResponse, ModelsCreateGigRequest, ModelsCreateGigRequestGenderRequirementEnum } from '@/lib/api/generated/models';
import { GigForm } from '@/components/gigs/gig-form';
import { CreateGigSchema } from '@/components/gigs/schema';
import { ModelsStandardCampaignResponse, ModelsStandardGenericResponse } from '@/lib/api/generated/models';

export default function CreateGigPage() {
  const params = useParams<{ id: string; }>();
  const router = useRouter();
  const campaignId = params.id;

  const { data: campaignResponse, isLoading: campaignLoading } = useCampaign( campaignId );
  const createGig = useCreateGig();

  if ( campaignLoading ) {
    return (
      <div className='flex items-center justify-center min-h-[400px]'>
        <Loader2 className='size-8 animate-spin text-muted-foreground' />
      </div>
    );
  }

  const campaign = ( campaignResponse as ModelsStandardCampaignResponse )?.data;
  const campaignName = campaign?.campaign_name || 'Campaign';

  const handleSubmit = async ( data: CreateGigSchema ) => {
    const requestData: ModelsCreateGigRequest = {
      ...data,
      campaign_id: campaignId,
      posting_start_date: data.posting_start_date.toISOString(),
      posting_end_date: data.posting_end_date.toISOString(),
      requirements: data.requirements || undefined,
      content_guidelines: data.content_guidelines || undefined,
      ambience: data.ambience || undefined,
      gender_requirement: ( data.gender_requirement || undefined ) as ModelsCreateGigRequestGenderRequirementEnum,
    };

    try {
      await createGig.mutateAsync( requestData );
      toast.success( 'Gig created successfully' );
      router.push( `/admin/campaigns/${ campaignId }` );
    } catch ( error ) {
      toast.error( 'Failed to create gig', {
        description: ( error as any )?.response?.error.message,
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
    />
  );
}
