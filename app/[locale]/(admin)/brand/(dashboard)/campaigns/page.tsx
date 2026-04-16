'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { CampaignsTable } from '@/components/campaigns/campaigns-table';
import { Button } from '@/components/dashboard-ui/button';
import { SubHeader } from '@/components/subheader';
import { ModelsCampaignResponse } from '@/lib/api/generated';
import { useBrandCampaigns } from '@/lib/api/hooks/campaigns';
import { usePersistedPagination } from '@/lib/hooks/use-persisted-pagination';
import Link from 'next/link';
import * as React from 'react';
import { useTranslations } from 'next-intl';

export default function CampaignsPage() {
  const t = useTranslations( 'dashboard.brand.campaignsPage' );
  const { pagination, setPagination } = usePersistedPagination( 'campaigns' );
  const { data: response, isLoading, isFetching, error } = useBrandCampaigns( {
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
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
    } as ModelsCampaignResponse ) );
  }, [ response ] );

  return (
    <>
      <SubHeader
        title={ t( 'title' ) }
        description={ t( 'description' ) }
      >
        <Link href='/brand/campaigns/new'>
          <Button className='gap-2 rounded-md'>{ t( 'create' ) }</Button>
        </Link>
      </SubHeader>
      <CampaignsTable
        campaigns={ campaigns }
        isLoading={ isLoading }
        isFetching={ isFetching }
        error={ error }
        pagination={ pagination }
        onPaginationChange={ setPagination }
        rowCount={ response?.pagination?.total }
      />
    </>
  );
}
