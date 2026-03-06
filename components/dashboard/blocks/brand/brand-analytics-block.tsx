'use client';

import { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { Skeleton } from '@/components/dashboard-ui/skeleton';
import { useBrandAnalytics } from '@/lib/api/hooks/analytics';
import type { ModelsBrandAnalyticsResponse } from '@/lib/api/generated/models';

type StatItem = {
  label: string;
  value: string;
  key: keyof ModelsBrandAnalyticsResponse;
};

const STAT_GROUPS: { title: string; items: StatItem[]; }[] = [
  {
    title: 'Campaigns',
    items: [
      { label: 'Campaigns Created', value: '0', key: 'campaigns_created' },
      { label: 'Campaigns Completed', value: '0', key: 'campaigns_completed' },
      { label: 'Completion Rate', value: '0%', key: 'completion_rate' },
    ],
  },
  {
    title: 'Gigs',
    items: [
      { label: 'Gigs Created', value: '0', key: 'gigs_created' },
      { label: 'Gigs Accepted', value: '0', key: 'gigs_accepted' },
      { label: 'Gigs Completed', value: '0', key: 'gigs_completed' },
    ],
  },
  {
    title: 'Outreach',
    items: [
      { label: 'Invitations Sent', value: '0', key: 'invitations_sent' },
      { label: 'Applications Received', value: '0', key: 'applications_received' },
      { label: 'Approval Rate', value: '0%', key: 'approval_rate' },
    ],
  },
  {
    title: 'Content & Spend',
    items: [
      { label: 'Videos Received', value: '0', key: 'videos_received' },
      { label: 'Videos Approved', value: '0', key: 'videos_approved' },
      { label: 'Total Spent', value: '€0', key: 'total_spent' },
    ],
  },
];

const CURRENCY_KEYS = new Set<string>( [ 'total_spent' ] );
const PERCENT_KEYS = new Set<string>( [ 'completion_rate', 'approval_rate' ] );

function formatValue( key: string, raw?: number ): string {
  if ( raw === undefined || raw === null ) return '—';
  if ( CURRENCY_KEYS.has( key ) ) {
    return new Intl.NumberFormat( 'en-US', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    } ).format( raw );
  }
  if ( PERCENT_KEYS.has( key ) ) {
    return `${ ( raw * 100 ).toFixed( 1 ) }%`;
  }
  return raw.toLocaleString();
}

export function BrandAnalyticsBlock() {
  const { data: response, isLoading, isError } = useBrandAnalytics();
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
        <CardTitle className="ad-card-title">Brand Analytics</CardTitle>
        <CardDescription className="ad-card-description">
          Performance metrics for your brand account
        </CardDescription>
      </CardHeader>
      <CardContent>
        { isLoading && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            { Array.from( { length: 8 } ).map( ( _, index ) => (
              <div key={ `brand-analytics-skeleton-${ index }` } className="rounded-lg border border-border/60 bg-white p-3">
                <Skeleton className="mb-2 h-3 w-20" />
                <Skeleton className="h-7 w-16" />
              </div>
            ) ) }
          </div>
        ) }

        { isError && (
          <p className="py-8 text-center text-xs text-destructive">Unable to load brand analytics.</p>
        ) }

        { !isLoading && !isError && (
          <div className="space-y-4">
            { groups.map( ( group ) => (
              <div key={ group.title }>
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  { group.title }
                </p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
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
