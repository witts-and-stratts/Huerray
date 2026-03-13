import { KpiCard } from '@/components/dashboard/blocks/shared/kpi-card';
import type { BrandDashboardSummary } from './types';
import { toMoney } from './types';

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
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <KpiCard
        title="Total Campaigns"
        value={ `${ campaignsCount }` }
        caption={ isCampaignsLoading ? 'Loading campaigns...' : 'Across all campaign statuses' }
        isLoading={ isCampaignsLoading }
      />
      <KpiCard
        title="Active Campaigns"
        value={ `${ summary.running }` }
        caption="Campaigns currently in running state"
      />
      <KpiCard
        title="Total Gigs"
        value={ `${ gigsCount }` }
        caption={ isGigsLoading ? 'Loading gigs...' : 'All gigs linked to your campaigns' }
        isLoading={ isGigsLoading }
      />
      <KpiCard
        title="Total Spend"
        value={ toMoney( summary.totalSpend ) }
        caption="Estimated from gig budgets and compensation"
      />
    </section>
  );
}
