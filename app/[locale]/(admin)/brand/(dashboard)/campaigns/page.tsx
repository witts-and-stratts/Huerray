'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { CampaignsTable } from '@/components/campaigns/campaigns-table';
import { Button } from '@/components/dashboard-ui/button';
import { SubHeader } from '@/components/subheader';
import { useBrandCampaigns } from '@/lib/api/hooks/campaigns';
import { ModelCampaign } from '@/components/campaigns/types';
import Link from 'next/link';
import * as React from 'react';

export default function CampaignsPage() {
  const { data: response, isLoading, error } = useBrandCampaigns( {
  } );

  const campaigns = React.useMemo( () => {
    const campaignsData = response?.data;

    if ( !campaignsData || !Array.isArray( campaignsData ) ) {
      return [];
    }

    return campaignsData.map( ( c: any ) => ( {
      ...c,
      campaign_id: c.campaign_id || c.id,
      product_image: c.product_image_url || c.product_image,
      creators: c.creators || [],
      applications: c.applications || [],
    } as ModelCampaign ) );
  }, [ response ] );

  return (
    <>
      <SubHeader
        title='Campaigns'
        description='Manage and track all your marketing campaigns'
      >
        <Link href='/brand/campaigns/new'>
          <Button className='gap-2 rounded-md'>Create</Button>
        </Link>
      </SubHeader>
      <CampaignsTable
        campaigns={ campaigns }
        isLoading={ isLoading }
        error={ error }
      />
    </>
  );
}
