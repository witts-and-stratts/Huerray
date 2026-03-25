'use client';

import { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { Skeleton } from '@/components/dashboard-ui/skeleton';
import { usePlatformAnalytics } from '@/lib/api/hooks/analytics';
import type { ModelsPlatformAnalyticsResponse } from '@/lib/api/generated/models';
import { useTranslations } from 'next-intl';

type StatItem = {
  label: string;
  value: string;
  key: keyof ModelsPlatformAnalyticsResponse;
};

function formatValue( key: string, raw?: number ): string {
  if ( raw === undefined || raw === null ) return '—';
  return raw.toLocaleString();
}

export function PlatformAnalyticsBlock() {
  const t = useTranslations( 'dashboard.admin' );
  const { data: response, isLoading, isError } = usePlatformAnalytics();
  const analytics = response?.data;

  const STAT_GROUPS = useMemo( () => [
    {
      title: t( 'dashboardBlocks.platformAnalytics.groups.contentPipeline' ),
      items: [
        { label: t( 'dashboardBlocks.platformAnalytics.stats.total_campaigns' ), value: '0', key: 'total_campaigns' as const },
        { label: t( 'dashboardBlocks.platformAnalytics.stats.completed_campaigns' ), value: '0', key: 'completed_campaigns' as const },
        { label: t( 'dashboardBlocks.platformAnalytics.stats.total_gigs' ), value: '0', key: 'total_gigs' as const },
        { label: t( 'dashboardBlocks.platformAnalytics.stats.completed_gigs' ), value: '0', key: 'completed_gigs' as const },
      ],
    },
  ], [ t ] );

  const groups = useMemo( () => {
    if ( !analytics ) return STAT_GROUPS;
    return STAT_GROUPS.map( ( group ) => ( {
      ...group,
      items: group.items.map( ( item ) => ( {
        ...item,
        value: formatValue( item.key, analytics[ item.key as keyof ModelsPlatformAnalyticsResponse ] ),
      } ) ),
    } ) );
  }, [ analytics, STAT_GROUPS ] );

  return (
    <Card className="ad-card">
      <CardHeader>
        <CardTitle className="ad-card-title">{ t( 'dashboardBlocks.platformAnalytics.title' ) }</CardTitle>
        <CardDescription className="ad-card-description">
          { t( 'dashboardBlocks.platformAnalytics.description' ) }
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
          <p className="py-8 text-center text-xs text-destructive">{ t( 'dashboardBlocks.platformAnalytics.states.error' ) }</p>
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
