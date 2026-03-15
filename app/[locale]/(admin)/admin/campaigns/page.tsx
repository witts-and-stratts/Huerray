'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { CampaignsTable } from '@/components/campaigns/campaigns-table';
import { SubHeader } from '@/components/subheader';
import { useCampaigns } from '@/lib/api/hooks/campaigns';
import { ModelCampaign } from '@/components/campaigns/types';
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
    } as ModelCampaign ) );
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
