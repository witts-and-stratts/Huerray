'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { Skeleton } from '@/components/dashboard-ui/skeleton';
import { useCreatorAnalytics } from '@/lib/api/hooks/analytics';

function toMoney( value: number ) {
  return new Intl.NumberFormat( 'en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  } ).format( value );
}

function KpiCard( {
  title,
  value,
  caption,
  isLoading = false,
}: {
  title: string;
  value: string;
  caption: string;
  isLoading?: boolean;
} ) {
  return (
    <Card className="ad-kpi-card h-full">
      <CardHeader className="pb-2 min-h-12">
        <CardTitle className="ad-card-title flex items-center gap-2 leading-tight">
          { title }
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        { isLoading ? (
          <>
            <Skeleton className="h-9 w-24" />
            <Skeleton className="mt-2 h-4 w-44" />
          </>
        ) : (
          <>
            <p className="ad-stat-value">{ value }</p>
            <p className="mt-1 text-xs text-muted-foreground">{ caption }</p>
          </>
        ) }
      </CardContent>
    </Card>
  );
}

export function CreatorKpiOverviewBlock() {
  const { data: analyticsResponse, isLoading } = useCreatorAnalytics();
  const analytics = analyticsResponse?.data;

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
        value={ toMoney( analytics?.total_earned ?? 0 ) }
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
