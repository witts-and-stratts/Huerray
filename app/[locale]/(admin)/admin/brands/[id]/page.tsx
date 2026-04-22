'use client';

import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import { ChevronDown, Loader2 } from 'lucide-react';
import { SubHeader } from '@/components/subheader';
import { useBrand } from '@/lib/api/hooks/brands';
import { useBrandAnalytics } from '@/lib/api/hooks/analytics';
import {
  BrandCampaignMetricsBlock,
  BrandFinancialsBlock,
  BrandRecentCampaignsBlock,
  BrandRecentSubmissionsBlock,
  BrandProfileBlock,
  toCurrency,
  toPercent,
  type BrandStatRow,
} from '@/components/admin/brands/dashboard';
import { useTranslations } from "next-intl";
import { BrandActionMenu } from '@/components/admin/brands/brand-action-menu';
import { ButtonGroup } from '@/components/dashboard-ui/button-group';
import { Button } from '@/components/dashboard-ui/button';
import { useFormatCurrency } from '@/lib/hooks/format';

function metric( value?: number ) {
  return typeof value === 'number' ? value : 0;
}

export default function BrandDashboardPage() {
  const t = useTranslations( 'dashboard.admin.brandDashboard' );
  const params = useParams<{ id: string; }>();
  const brandId = params.id;
  const formatCurrency = useFormatCurrency();

  const { data: brandData, isLoading: isBrandLoading, error: brandError } = useBrand( brandId );
  const { data: analyticsData, isLoading: isAnalyticsLoading } = useBrandAnalytics(
    { brandId },
    { enabled: !!brandId }
  );

  const brand = useMemo( () => {
    if ( !brandData?.data ) return null;
    return Array.isArray( brandData.data ) ? brandData.data[ 0 ] : brandData.data;
  }, [ brandData ] );

  const analytics = analyticsData?.data;

  const financialRows = useMemo<BrandStatRow[]>( () => ( [
    {
      label: t( 'totalSpent' ),
      value: formatCurrency( metric( analytics?.total_spent ) ),
      numeric: metric( analytics?.total_spent ),
    },
    {
      label: t( 'approvalRate' ),
      value: toPercent( metric( analytics?.approval_rate ) ),
      numeric: metric( analytics?.approval_rate ),
    },
  ] ), [ analytics?.approval_rate, analytics?.total_spent, formatCurrency, t ] );

  const campaignRows = useMemo<BrandStatRow[]>( () => ( [
    { label: t( 'campaignsCreated' ), value: `${ metric( analytics?.campaigns_created ) }`, numeric: metric( analytics?.campaigns_created ) },
    { label: t( 'campaignsCompleted' ), value: `${ metric( analytics?.campaigns_completed ) }`, numeric: metric( analytics?.campaigns_completed ) },
    { label: t( 'gigsCreated' ), value: `${ metric( analytics?.gigs_created ) }`, numeric: metric( analytics?.gigs_created ) },
    { label: t( 'gigsCompleted' ), value: `${ metric( analytics?.gigs_completed ) }`, numeric: metric( analytics?.gigs_completed ) },
  ] ), [
    analytics?.campaigns_completed,
    analytics?.campaigns_created,
    analytics?.gigs_completed,
    analytics?.gigs_created,
    t,
  ] );


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
        <h3 className="text-lg font-medium text-red-800">{ t( 'failedToLoad' ) }</h3>
        <p className="text-sm text-red-600">{ ( brandError as Error )?.message || t( 'brandNotFound' ) }</p>
      </div>
    );
  }

  const brandName = brand?.company_name || t( 'brandDashboard' );
  const brandLogo = brand?.profile_photo?.asset || brand?.logo_url || brand?.logo || '';

  return (
    <div className="flex flex-1 flex-col h-full">
      <SubHeader
        title={ brandName }
        description={ t( 'overview' ) }
        breadcrumbs={ [
          { label: t( 'brands' ), href: '/admin/brands' },
          { label: brandName, href: `/admin/brands/${ brandId }` },
        ] }
      />

      <div className="ad-shell bg-slate-50/50 mt-0 flex-1 p-2 md:p-5">
        <section className="grid gap-4 md:grid-cols-12 lg:h-full">
          <aside className="space-y-4 md:col-span-5 md:sticky md:top-24 md:self-start h-full">
            <BrandProfileBlock brand={ brand } brandName={ brandName } brandLogo={ brandLogo }>
              <BrandActionMenu brand={ brand } trigger={ <ButtonGroup className='mt-auto min-w-[200px]'>
                <Button variant='outline' size={ 'sm' } className='flex-1 font-regular'>{ t( 'actions' ) }</Button>
                <Button variant='outline' size={ 'sm' }><ChevronDown strokeWidth={ 1 } /></Button>
              </ButtonGroup> } />
            </BrandProfileBlock>
          </aside>

          <section className="space-y-4 md:col-span-7">
            <div className="flex flex-col gap-4 h-full">
              <div className='flex flex-col md:flex-row gap-4 w-full flex-1'>
                <BrandFinancialsBlock rows={ financialRows } isLoading={ isAnalyticsLoading } />
                <BrandCampaignMetricsBlock rows={ campaignRows } isLoading={ isAnalyticsLoading } />
              </div>
              <BrandRecentCampaignsBlock brandId={ brandId } />
              <BrandRecentSubmissionsBlock brandId={ brandId } />
            </div>
          </section>
        </section>
      </div>
    </div>
  );
}
