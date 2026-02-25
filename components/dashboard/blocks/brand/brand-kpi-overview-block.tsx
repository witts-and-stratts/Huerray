import { Card, CardContent, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import type { BrandDashboardSummary } from './types';
import { toMoney } from './types';

function KpiCard( {
  title,
  value,
  caption,
}: {
  title: string;
  value: string;
  caption: string;
} ) {
  return (
    <Card className="ad-kpi-card h-full justify-between gap-1">
      <CardHeader className="pb-2">
        <CardTitle className="ad-card-title leading-tight">{ title }</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="ad-stat-value">{ value }</p>
        <p className="mt-1 text-xs text-muted-foreground">{ caption }</p>
      </CardContent>
    </Card>
  );
}

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
      />
      <KpiCard
        title="Total Spend"
        value={ toMoney( summary.totalSpend ) }
        caption="Estimated from gig budgets and compensation"
      />
    </section>
  );
}
