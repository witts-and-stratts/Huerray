"use client";

import Link from 'next/link';
import { useMemo } from 'react';
import { ArrowUpRight, CirclePlus } from 'lucide-react';
import { Button } from '@/components/dashboard-ui/button';
import { SubHeader } from '@/components/subheader';
import { useAuth } from '@/lib/auth/auth-context';
import { useBrandGigs, useBrandProfile } from '@/lib/api/hooks/brands';
import { useBrandCampaigns } from '@/lib/api/hooks/campaigns';
import type { ModelsCampaignResponse, ModelsGigBrandResponse } from '@/lib/api/generated/models';
import {
  BrandActionCenterBlock,
  BrandCampaignsRadialBlock,
  BrandGigsStatsBlock,
  BrandNotificationsBlock,
  BrandProfileSnapshotBlock,
  BrandRecentApplicationsBlock,
  BrandRecentCampaignsBlock,
  BrandRecentSubmissionsBlock,
  buildSummary,
} from '@/components/dashboard/blocks/brand';
import { RecentActivityBlock } from '@/components/dashboard/blocks/admin/recent-activity-block';
import { useFormatCurrency } from '@/lib/hooks/format';
import { useTranslations } from 'next-intl';

export function BrandDashboard() {
  const t = useTranslations( 'dashboard.brand.landing' );
  const tStats = useTranslations( 'dashboard.brand.landing.campaignStatsLabels' );
  const formatCurrency = useFormatCurrency();
  const { user } = useAuth();
  const brandId = user?.id || '';

  const { data: brandData } = useBrandProfile();
  const { data: campaignsResponse, isLoading: isCampaignsLoading } = useBrandCampaigns( { limit: 100, page: 1 } );
  const { data: gigsResponse } = useBrandGigs( { brandId, limit: 100, page: 1 }, { enabled: !!brandId } );

  const brand = useMemo( () => {
    if ( !brandData?.data ) return null;
    return Array.isArray( brandData.data ) ? brandData.data[ 0 ] : brandData.data;
  }, [ brandData ] );

  const campaigns = useMemo<ModelsCampaignResponse[]>( () => {
    if ( !campaignsResponse?.data || !Array.isArray( campaignsResponse.data ) ) return [];
    return campaignsResponse.data;
  }, [ campaignsResponse ] );

  const gigs = useMemo<ModelsGigBrandResponse[]>( () => {
    if ( !gigsResponse?.data || !Array.isArray( gigsResponse.data ) ) return [];
    return gigsResponse.data;
  }, [ gigsResponse ] );

  const summary = useMemo( () => buildSummary( campaigns, gigs ), [ campaigns, gigs ] );

  const campaignStats = useMemo( () => [
    { label: tStats( 'total' ), value: `${ campaigns.length }`, numeric: campaigns.length },
    { label: tStats( 'active' ), value: `${ summary.running }`, numeric: summary.running },
    { label: tStats( 'totalGigs' ), value: `${ gigs.length }`, numeric: gigs.length },
    { label: tStats( 'totalSpend' ), value: formatCurrency( summary.totalSpend ), numeric: summary.totalSpend },
  ], [ campaigns.length, gigs.length, summary.running, summary.totalSpend, formatCurrency, tStats ] );

  return (
    <>
      <SubHeader
        title={ t( 'title' ) }
        description={ t( 'description' ) }
      >
        <Link href="/brand/campaigns/new">
          <Button className="gap-2">
            <CirclePlus className="size-4" />
            { t( 'createCampaign' ) }
          </Button>
        </Link>
        <Link href="/brand/campaigns">
          <Button variant="outline" className="gap-2">
            { t( 'viewCampaigns' ) }
            <ArrowUpRight className="size-4" />
          </Button>
        </Link>
      </SubHeader>

      <div className="ad-shell py-4 bg-burgundy-50/50 mt-0">
        <section className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          <div className="order-2 lg:order-1 lg:col-span-8 space-y-4">
            <BrandCampaignsRadialBlock campaigns={ campaigns } isLoading={ isCampaignsLoading } kpiStats={ campaignStats } />
          </div>
          <div className="order-1 lg:order-2 lg:col-span-4">
            <BrandProfileSnapshotBlock
              brand={ brand }
              fallbackName={ `${ user?.firstName || '' } ${ user?.lastName || '' }`.trim() }
              fallbackEmail={ user?.email }
            />
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <BrandRecentCampaignsBlock campaigns={ campaigns } />
          <BrandRecentSubmissionsBlock />
        </section>

        <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <BrandRecentApplicationsBlock campaigns={ campaigns } />
          <BrandGigsStatsBlock />
        </section>

        <section>
          <BrandActionCenterBlock />
        </section>

        {/* <section>
          <BrandNotificationsBlock />
        </section> */}

        <section>
          <RecentActivityBlock />
        </section>
      </div>
    </>
  );
}
