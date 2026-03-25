'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { CampaignsTable } from '@/components/campaigns/campaigns-table';
import { SubHeader } from '@/components/subheader';
import { useCampaigns } from '@/lib/api/hooks/campaigns';
import * as React from 'react';
import { useTranslations } from 'next-intl';
import { ModelsCampaignResponse } from '@/lib/api/generated';

export default function CampaignsPage() {
  const t = useTranslations( 'dashboard.admin' );
  const { data: response, isLoading, error } = useCampaigns( {
  } );

  const campaigns = React.useMemo( () => {
    const campaignsData = response?.data;

    if ( !campaignsData || !Array.isArray( campaignsData ) ) {
      return [] as ModelsCampaignResponse[];
    }

    return campaignsData.map( ( c: any ) => ( {
      ...c,
      campaign_id: c.campaign_id || c.id,
      product_image: c.product_image?.asset,
      creators: c.creators || [],
      applications: c.applications || [],
      brand_logo: c.brand?.logo,
    } as ModelsCampaignResponse ) );
  }, [ response ] );

  return (
    <>
      <SubHeader
        title={ t( 'campaignsPage.title' ) }
        description={ t( 'campaignsPage.description' ) }
      />
      <CampaignsTable
        campaigns={ campaigns }
        isLoading={ isLoading }
        error={ error }
      />
    </>
  );
}
