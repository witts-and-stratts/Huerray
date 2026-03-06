'use client';

import { useMemo } from 'react';
import { Skeleton } from '@/components/dashboard-ui/skeleton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LabelList, RadialBar, RadialBarChart } from 'recharts';
import { useUsers } from '@/lib/api/hooks/users';
import { usePlatformAnalytics } from '@/lib/api/hooks/analytics';
import type { ModelsUserResponse } from '@/lib/api/generated/models';

const STATUS_COLORS = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
  'var(--chart-5)',
];

const USER_STATS_KEYS = [
  { label: 'Total Users', key: 'total_users' as const },
  { label: 'Total Brands', key: 'total_brands' as const },
  { label: 'Total Creators', key: 'total_creators' as const },
  { label: 'New Users Today', key: 'new_users_today' as const },
  { label: 'Active Brands', key: 'active_brands' as const },
  { label: 'Active Creators', key: 'active_creators' as const },
];

export function UsersStatusRadialCard() {
  const { data: response, isLoading } = useUsers( { limit: 1000, page: 1 } );
  const { data: analyticsResponse, isLoading: isAnalyticsLoading } = usePlatformAnalytics();
  const users = useMemo( () => ( response?.data?.data as unknown as ModelsUserResponse[] ) || [], [ response ] );

  const { chartConfig, usersStatusBreakdown, chartData } = useMemo( () => {
    const counts = new Map<string, number>();

    users.forEach( ( user ) => {
      const normalizedStatus = String( user.user_status || '' ).trim().toLowerCase() || 'unknown';
      counts.set( normalizedStatus, ( counts.get( normalizedStatus ) || 0 ) + 1 );
    } );

    const breakdown = Array.from( counts.entries() )
      .sort( ( a, b ) => b[ 1 ] - a[ 1 ] )
      .map( ( [ status, count ], index ) => {
        const key = status.replace( /[^a-z0-9]+/g, '_' ) || 'unknown';
        const label = status.replace( /_/g, ' ' );
        const fill = STATUS_COLORS[ index % STATUS_COLORS.length ];
        return { key, status, label, count, fill };
      } );

    const dynamicChartConfig: ChartConfig = {
      users: {
        label: 'Users',
      },
    };

    breakdown.forEach( ( item ) => {
      dynamicChartConfig[ item.key ] = {
        label: item.label,
        color: item.fill,
      };
    } );

    const radialData = breakdown.map( ( item ) => ( {
      key: item.key,
      status: item.label,
      users: item.count,
      fill: `var(--color-${ item.key })`,
    } ) );

    return {
      chartConfig: dynamicChartConfig,
      usersStatusBreakdown: breakdown,
      chartData: radialData,
    };
  }, [ users ] );

  const totalUsers = users.length;

  return (
    <Card className="ad-users-card">
      <CardHeader className="pb-2">
        <CardTitle className="ad-card-title">Users</CardTitle>
        <CardDescription className="ad-card-description">Status distribution across all platform users</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          { isAnalyticsLoading
            ? Array.from( { length: 6 } ).map( ( _, i ) => (
              <div key={ `user-stat-skeleton-${ i }` } className="rounded-lg border border-border/60 bg-white p-2.5">
                <Skeleton className="mb-2 h-3 w-20" />
                <Skeleton className="h-7 w-16" />
              </div>
            ) )
            : USER_STATS_KEYS.map( ( item ) => (
              <div key={ item.key } className="rounded-lg border border-border/60 bg-white p-2.5">
                <p className="ad-stat-label mb-1.5">{ item.label }</p>
                <p className="text-2xl leading-none font-primary font-medium">
                  { ( analyticsResponse?.data?.[ item.key ] ?? 0 ).toLocaleString() }
                </p>
              </div>
            ) )
          }
        </div>

        <div className="ad-users-content">
          { isLoading ? (
            <>
              <div className="ad-chart-radial flex items-center justify-center">
                <Skeleton className="h-[220px] w-[220px] rounded-full" />
              </div>
              <div className="space-y-3">
                <div>
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="mt-2 h-10 w-28" />
                </div>
                <div className="ad-users-breakdown space-y-2">
                  { Array.from( { length: 4 } ).map( ( _, index ) => (
                    <div key={ `users-breakdown-skeleton-${ index }` } className="ad-users-breakdown-item">
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-2.5 w-2.5 rounded-full" />
                        <Skeleton className="h-3 w-20" />
                      </div>
                      <Skeleton className="h-3 w-24" />
                    </div>
                  ) ) }
                </div>
              </div>
            </>
          ) : (
            <>
              <ChartContainer config={ chartConfig } className="ad-chart-radial">
                <RadialBarChart
                  data={ chartData }
                  startAngle={ 90 }
                  endAngle={ 360 }
                  innerRadius={ 70 }
                  outerRadius={ 160 }
                  barSize={ 16 }
                >
                  <ChartTooltip
                    cursor={ false }
                    content={ <ChartTooltipContent hideLabel nameKey="key" /> }
                  />
                  <RadialBar dataKey="users" background={
                    {
                      fill: '#000000',
                      fillOpacity: 1
                    }
                  }>
                    <LabelList
                      position="insideStart"
                      dataKey="status"
                      className="fill-white capitalize mix-blend-luminosity"
                      fontSize={ 11 }
                    />
                  </RadialBar>
                </RadialBarChart>
              </ChartContainer>

              <div className="space-y-3">
                <div>
                  <p className="ad-total-label">Total users</p>
                  <p className="ad-total-value">{ totalUsers.toLocaleString() }</p>
                </div>
                <div className="ad-users-breakdown">
                  { usersStatusBreakdown.map( ( item ) => {
                    const pct = totalUsers > 0 ? ( item.count / totalUsers ) * 100 : 0;
                    return (
                      <div key={ item.key } className="ad-users-breakdown-item">
                        <div className="flex items-center gap-2">
                          <span className="h-2.5 rounded-full" style={ { backgroundColor: item.fill } } />
                          <span>{ item.label }</span>
                        </div>
                        <span className="font-medium tabular-nums">
                          { item.count.toLocaleString() } ({ pct.toFixed( 1 ) }%)
                        </span>
                      </div>
                    );
                  } ) }
                </div>
              </div>
            </>
          ) }
        </div>
      </CardContent>
    </Card>
  );
}
