'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { CampaignsTable } from '@/components/campaigns/campaigns-table';
import { SubHeader } from '@/components/subheader';
import { ModelsCampaignResponse } from '@/lib/api/generated';
import { useCampaigns } from '@/lib/api/hooks/campaigns';
import * as React from 'react';

export default function CampaignsPage() {
  const { data: response, isLoading, error } = useCampaigns( {
  } );

  const campaigns = React.useMemo( () => {
    const campaignsData = response?.data;

    if ( !campaignsData || !Array.isArray( campaignsData ) ) {
      return [];
    }

    return campaignsData.map( ( c: any ) => ( {
      ...c,
      campaign_id: c.campaign_id || c.id,
      product_image: c.product_image?.asset,
      creators: c.creators || [],
      applications: c.applications || [],
    } as ModelsCampaignResponse ) );
  }, [ response ] );

  return (
    <>
      <SubHeader
        title='Campaigns'
        description='Manage and track all your marketing campaigns'
      />
      <CampaignsTable
        campaigns={ campaigns }
        isLoading={ isLoading }
        error={ error }
      />
    </>
  );
}
