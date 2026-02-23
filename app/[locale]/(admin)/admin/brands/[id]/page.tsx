'use client';

import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import { Loader2 } from 'lucide-react';
import { SubHeader } from '@/components/subheader';
import { useBrand } from '@/lib/api/hooks/brands';
import { useBrandCampaigns } from '@/lib/api/hooks/campaigns';
import { useGigs } from '@/lib/api/hooks/gigs';
import type { ModelCampaign } from '@/components/campaigns/types';
import type { ModelsGigResponse } from '@/lib/api/generated/models';
import {
  BrandCampaignMetricsBlock,
  BrandCampaignsTableBlock,
  BrandContactBlock,
  BrandFinancialsBlock,
  BrandRecentSubmissionsBlock,
  BrandProfileBlock,
  toCurrency,
  type BrandStatRow,
} from '@/components/admin/brands/dashboard';

export default function BrandDashboardPage() {
  const params = useParams<{ id: string; }>();
  const brandId = params.id;

  const { data: brandData, isLoading: isBrandLoading, error: brandError } = useBrand( brandId );
  const { data: campaignsData, isLoading: isCampaignsLoading } = useBrandCampaigns( { brandId } );
  const { data: gigsData } = useGigs( { brandId, page: 1, limit: 500 } );

  const brand = useMemo( () => {
    if ( !brandData?.data ) return null;
    return Array.isArray( brandData.data ) ? brandData.data[ 0 ] : brandData.data;
  }, [ brandData ] );

  const campaigns = useMemo<ModelCampaign[]>( () => {
    if ( !campaignsData?.data || !Array.isArray( campaignsData.data ) ) return [];
    return campaignsData.data as unknown as ModelCampaign[];
  }, [ campaignsData ] );

  const gigs = useMemo<ModelsGigResponse[]>( () => {
    if ( !gigsData?.data || !Array.isArray( gigsData.data ) ) return [];
    return gigsData.data;
  }, [ gigsData ] );

  const campaignMetrics = useMemo( () => {
    const total = campaigns.length;

    const active = campaigns.filter( ( campaign ) => {
      const status = String( ( campaign as { status?: string; campaign_status?: string; } ).campaign_status || ( campaign as { status?: string; } ).status || '' ).toLowerCase();
      return [ 'active', 'in_progress', 'ongoing', 'open' ].includes( status );
    } ).length;

    const finished = campaigns.filter( ( campaign ) => {
      const status = String( ( campaign as { status?: string; campaign_status?: string; } ).campaign_status || ( campaign as { status?: string; } ).status || '' ).toLowerCase();
      return [ 'completed', 'finished', 'closed' ].includes( status );
    } ).length;

    const draft = campaigns.filter( ( campaign ) => {
      const status = String( ( campaign as { status?: string; campaign_status?: string; } ).campaign_status || ( campaign as { status?: string; } ).status || '' ).toLowerCase();
      return [ 'draft', 'pending', 'pending_approval' ].includes( status );
    } ).length;

    return { total, active, finished, draft };
  }, [ campaigns ] );

  const spendMetrics = useMemo( () => {
    const totalGigs = gigs.length;

    const totalSpend = gigs.reduce( ( sum, gig ) => {
      if ( typeof gig.gig_cost === 'number' ) return sum + gig.gig_cost;
      if ( typeof gig.compensation === 'number' && typeof gig.number_of_videos === 'number' ) {
        return sum + ( gig.compensation * gig.number_of_videos );
      }
      if ( typeof gig.compensation === 'number' ) return sum + gig.compensation;
      return sum;
    }, 0 );

    const avgGigSpend = totalGigs > 0 ? totalSpend / totalGigs : 0;

    return { totalSpend, avgGigSpend };
  }, [ gigs ] );

  const financialRows = useMemo<BrandStatRow[]>( () => ( [
    { label: 'Total Spend', value: toCurrency( spendMetrics.totalSpend ), numeric: spendMetrics.totalSpend || 0 },
    { label: 'Avg Gig Spend', value: toCurrency( spendMetrics.avgGigSpend ), numeric: spendMetrics.avgGigSpend || 0 },
  ] ), [ spendMetrics.avgGigSpend, spendMetrics.totalSpend ] );

  const campaignRows = useMemo<BrandStatRow[]>( () => ( [
    { label: 'Total', value: `${ campaignMetrics.total }`, numeric: campaignMetrics.total },
    { label: 'Active', value: `${ campaignMetrics.active }`, numeric: campaignMetrics.active },
    { label: 'Finished', value: `${ campaignMetrics.finished }`, numeric: campaignMetrics.finished },
    { label: 'Draft', value: `${ campaignMetrics.draft }`, numeric: campaignMetrics.draft },
  ] ), [ campaignMetrics.active, campaignMetrics.draft, campaignMetrics.finished, campaignMetrics.total ] );

  const campaignIds = useMemo(
    () => campaigns
      .map( ( campaign ) => campaign.id || campaign.campaign_id )
      .filter( ( id ): id is string => Boolean( id ) ),
    [ campaigns ]
  );

  if ( isBrandLoading ) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if ( brandError || ( !isBrandLoading && !brand ) ) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
        <h3 className="text-lg font-medium text-red-800">Failed to load brand profile</h3>
        <p className="text-sm text-red-600">{ ( brandError as Error )?.message || 'Brand not found' }</p>
      </div>
    );
  }

  const brandName = brand?.company_name || 'Brand Dashboard';
  const brandLogo = brand?.profile_photo_url || brand?.logo_url || brand?.logo || '';

  return (
    <div>
      <SubHeader
        title={ brandName }
        description="Overview of brand performance and details"
        breadcrumbs={ [
          { label: 'Brands', href: '/admin/brands' },
          { label: brandName, href: `/admin/brands/${ brandId }` },
        ] }
      />

      <div className="ad-shell py-4 bg-slate-50/50 mt-0 min-h-full">
        <section className="grid gap-4 xl:grid-cols-12">
          <aside className="space-y-4 xl:col-span-5 xl:sticky xl:top-24 xl:self-start h-full">
            <BrandProfileBlock brand={ brand } brandName={ brandName } brandLogo={ brandLogo } />
            <BrandContactBlock brand={ brand } />
          </aside>

          <section className="space-y-4 xl:col-span-7">
            <div className="grid gap-4 md:grid-cols-2">
              <BrandFinancialsBlock rows={ financialRows } />
              <BrandCampaignMetricsBlock rows={ campaignRows } />
              <BrandRecentSubmissionsBlock brandId={ brandId } campaignIds={ campaignIds } />
            </div>

            <BrandCampaignsTableBlock
              brandId={ brandId }
              campaigns={ campaigns }
              isLoading={ isCampaignsLoading }
            />
          </section>
        </section>
      </div>
    </div>
  );
}
