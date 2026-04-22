'use client';

import { useCreatorAnalytics } from '@/lib/api/hooks/analytics';
import { useFormatCurrency } from '@/lib/hooks/format';
import { KpiCard } from '@/components/dashboard/blocks/shared/kpi-card';

export function CreatorKpiOverviewBlock() {
  const { data: analyticsResponse, isLoading } = useCreatorAnalytics();
  const analytics = analyticsResponse?.data;
  const formatCurrency = useFormatCurrency();

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <KpiCard
        title="Gigs Completed"
        value={ `${ analytics?.gigs_completed ?? 0 }` }
        caption="Total gigs you've successfully completed"
        isLoading={ isLoading }
      />
      <KpiCard
        title="Total Earned"
        value={ formatCurrency( analytics?.total_earned ?? 0 ) }
        caption="Lifetime earnings across all gigs"
        isLoading={ isLoading }
      />
      <KpiCard
        title="Approval Rate"
        value={ `${ analytics?.approval_rate ?? 0 }%` }
        caption="Percentage of videos approved by brands"
        isLoading={ isLoading }
      />
      <KpiCard
        title="Success Rate"
        value={ `${ analytics?.success_rate ?? 0 }%` }
        caption="Applications that converted to active gigs"
        isLoading={ isLoading }
      />
    </section>
  );
}
