'use client';

import { Card, CardContent } from '@/components/dashboard-ui/card';
import { GigsTable } from '../gigs-table';
import { useGigsByCampaign } from '@/lib/api/hooks/gigs';
import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';
import { ModelsGigResponse } from '@/lib/api/generated/models';

interface CampaignGigsSectionProps {
  campaignId: string;
  role?: 'brand' | 'admin';
  basePath?: string;
}

export function CampaignGigsSection( { campaignId, role = 'admin', basePath }: CampaignGigsSectionProps ) {
  const { data: gigsResponse, isLoading } = useGigsByCampaign( campaignId, role );
  const gigs = ( gigsResponse?.data || [] ) as ModelsGigResponse[];

  useEffect( () => {
    console.log( 'campaignId', campaignId );
  }, [ campaignId ] );

  if ( isLoading ) {
    return (
      <div className='flex items-center justify-center min-h-[200px]'>
        <Loader2 className='size-8 animate-spin text-muted-foreground' />
      </div>
    );
  }

  return (
    <Card>
      <CardContent className='relative'>
        <GigsTable data={ gigs } isLoading={ isLoading } basePath={ basePath } />
      </CardContent>
    </Card>
  );
}
