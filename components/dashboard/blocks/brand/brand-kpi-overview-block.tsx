import { KpiCard } from '@/components/dashboard/blocks/shared/kpi-card';
import type { BrandDashboardSummary } from './types';
import { useFormatCurrency } from '@/lib/hooks/format';
import { useTranslations } from 'next-intl';

interface BrandKpiOverviewBlockProps {
  campaignsCount: number;
  gigsCount: number;
  summary: BrandDashboardSummary;
  isCampaignsLoading: boolean;
  isGigsLoading: boolean;
}

export function BrandKpiOverviewBlock( {
  campaignsCount,
  gigsCount,
  summary,
  isCampaignsLoading,
  isGigsLoading,
}: BrandKpiOverviewBlockProps ) {
  const t = useTranslations( 'dashboard.brand.landing.kpiOverview' );
  const formatCurrency = useFormatCurrency();

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <KpiCard
        title={ t( 'totalCampaigns.title' ) }
        value={ `${ campaignsCount }` }
        caption={ isCampaignsLoading ? t( 'totalCampaigns.loading' ) : t( 'totalCampaigns.caption' ) }
        isLoading={ isCampaignsLoading }
      />
      <KpiCard
        title={ t( 'activeCampaigns.title' ) }
        value={ `${ summary.running }` }
        caption={ t( 'activeCampaigns.caption' ) }
      />
      <KpiCard
        title={ t( 'totalGigs.title' ) }
        value={ `${ gigsCount }` }
        caption={ isGigsLoading ? t( 'totalGigs.loading' ) : t( 'totalGigs.caption' ) }
        isLoading={ isGigsLoading }
      />
      <KpiCard
        title={ t( 'totalSpend.title' ) }
        value={ formatCurrency( summary.totalSpend ) }
        caption={ t( 'totalSpend.caption' ) }
      />
    </section>
  );
}
