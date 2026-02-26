'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useParams } from 'next/navigation';
import { useCampaign } from '@/lib/api/hooks/campaigns';
import { CampaignDetailsView } from '@/components/campaigns/campaign-details-view';
import { ModelCampaign } from '@/components/campaigns/types';
import { Loader2 } from 'lucide-react';

export default function CampaignPage() {
  const params = useParams<{ id: string; }>();
  console.log( "Params ID:", params.id );
  const { data, isLoading, error } = useCampaign( params.id );

  if ( isLoading ) {
    return (
      <div className='flex items-center justify-center min-h-[400px]'>
        <Loader2 className='size-8 animate-spin text-muted-foreground' />
      </div>
    );
  }

  if ( error || !data ) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[400px] gap-2'>
        <p className='text-destructive font-medium'>Failed to load campaign</p>
        <p className='text-muted-foreground text-sm'>{ error?.message || 'Campaign not found' }</p>
      </div>
    );
  }

  const campaign: ModelCampaign = {
    ...data,
    creators: [],
    applications: [],
  };

  return <CampaignDetailsView campaign={ campaign } basePath='/brand' />;
}
