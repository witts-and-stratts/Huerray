import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import type { BrandDashboardSummary } from './types';
import { toMoney } from './types';

interface BrandBudgetSnapshotBlockProps {
  summary: BrandDashboardSummary;
}

export function BrandBudgetSnapshotBlock( { summary }: BrandBudgetSnapshotBlockProps ) {
  return (
    <Card className="ad-summary-card">
      <CardHeader className="pb-2">
        <CardTitle className="ad-card-title">Budget Snapshot</CardTitle>
        <CardDescription className="ad-card-description">Current spend footprint from all gigs</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="rounded-lg border border-border/60 bg-white p-3">
          <p className="ad-stat-label">Total Spend</p>
          <p className="text-2xl font-primary font-medium">{ toMoney( summary.totalSpend ) }</p>
        </div>
        <div className="rounded-lg border border-border/60 bg-white p-3">
          <p className="ad-stat-label">This Month</p>
          <p className="text-2xl font-primary font-medium">{ toMoney( summary.thisMonthSpend ) }</p>
        </div>
        <div className="rounded-lg border border-border/60 bg-white p-3">
          <p className="ad-stat-label">Average Per Gig</p>
          <p className="text-2xl font-primary font-medium">{ toMoney( summary.avgGigSpend ) }</p>
        </div>
      </CardContent>
    </Card>
  );
}
