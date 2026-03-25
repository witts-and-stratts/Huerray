import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import type { BrandDashboardSummary } from './types';
import { toMoney } from './types';
import { useTranslations } from 'next-intl';

interface BrandBudgetSnapshotBlockProps {
  summary: BrandDashboardSummary;
}

export function BrandBudgetSnapshotBlock( { summary }: BrandBudgetSnapshotBlockProps ) {
  const t = useTranslations( 'dashboard.brand.landing.budgetSnapshot' );
  return (
    <Card className="ad-summary-card">
      <CardHeader className="pb-2">
        <CardTitle className="ad-card-title">{ t( 'title' ) }</CardTitle>
        <CardDescription className="ad-card-description">{ t( 'description' ) }</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="rounded-lg border border-border/60 bg-white p-3">
          <p className="ad-stat-label">{ t( 'totalSpend' ) }</p>
          <p className="text-2xl font-primary font-medium">{ toMoney( summary.totalSpend ) }</p>
        </div>
        <div className="rounded-lg border border-border/60 bg-white p-3">
          <p className="ad-stat-label">{ t( 'thisMonth' ) }</p>
          <p className="text-2xl font-primary font-medium">{ toMoney( summary.thisMonthSpend ) }</p>
        </div>
        <div className="rounded-lg border border-border/60 bg-white p-3">
          <p className="ad-stat-label">{ t( 'averagePerGig' ) }</p>
          <p className="text-2xl font-primary font-medium">{ toMoney( summary.avgGigSpend ) }</p>
        </div>
      </CardContent>
    </Card>
  );
}
