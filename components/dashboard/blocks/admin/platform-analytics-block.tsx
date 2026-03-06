'use client';

import { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { Skeleton } from '@/components/dashboard-ui/skeleton';
import { usePlatformAnalytics } from '@/lib/api/hooks/analytics';
import type { ModelsPlatformAnalyticsResponse } from '@/lib/api/generated/models';

type StatItem = {
  label: string;
  value: string;
  key: keyof ModelsPlatformAnalyticsResponse;
};

const STAT_GROUPS: { title: string; items: StatItem[]; }[] = [
  {
    title: 'Content Pipeline',
    items: [
      { label: 'Total Campaigns', value: '0', key: 'total_campaigns' },
      { label: 'Completed Campaigns', value: '0', key: 'completed_campaigns' },
      { label: 'Total Gigs', value: '0', key: 'total_gigs' },
      { label: 'Completed Gigs', value: '0', key: 'completed_gigs' },
    ],
  },
];

function formatValue( key: string, raw?: number ): string {
  if ( raw === undefined || raw === null ) return '—';
  return raw.toLocaleString();
}

export function PlatformAnalyticsBlock() {
  const { data: response, isLoading, isError } = usePlatformAnalytics();
  const analytics = response?.data;

  const groups = useMemo( () => {
    if ( !analytics ) return STAT_GROUPS;
    return STAT_GROUPS.map( ( group ) => ( {
      ...group,
      items: group.items.map( ( item ) => ( {
        ...item,
        value: formatValue( item.key, analytics[ item.key ] ),
      } ) ),
    } ) );
  }, [ analytics ] );

  return (
    <Card className="ad-card">
      <CardHeader>
        <CardTitle className="ad-card-title">Platform Analytics</CardTitle>
        <CardDescription className="ad-card-description">
          Live platform-wide metrics from the analytics endpoint
        </CardDescription>
      </CardHeader>
      <CardContent>
        { isLoading && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            { Array.from( { length: 8 } ).map( ( _, index ) => (
              <div key={ `platform-analytics-skeleton-${ index }` } className="rounded-lg border border-border/60 bg-white p-3">
                <Skeleton className="mb-2 h-3 w-20" />
                <Skeleton className="h-7 w-16" />
              </div>
            ) ) }
          </div>
        ) }

        { isError && (
          <p className="py-8 text-center text-xs text-destructive">Unable to load platform analytics.</p>
        ) }

        { !isLoading && !isError && (
          <div className="space-y-4">
            { groups.map( ( group ) => (
              <div key={ group.title }>
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  { group.title }
                </p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
                  { group.items.map( ( item ) => (
                    <div key={ item.key } className="rounded-lg border border-border/60 bg-white p-2.5">
                      <p className="ad-stat-label mb-1.5">{ item.label }</p>
                      <p className="text-2xl leading-none font-primary font-medium">{ item.value }</p>
                    </div>
                  ) ) }
                </div>
              </div>
            ) ) }
          </div>
        ) }
      </CardContent>
    </Card>
  );
}
