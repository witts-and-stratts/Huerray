'use client';

import { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { Skeleton } from '@/components/dashboard-ui/skeleton';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
import { usePlatformAnalytics } from '@/lib/api/hooks/analytics';
import { formatCurrency } from '@/lib/utils/format';
import { useLocale, useTranslations } from 'next-intl';
import { financialSnapshot } from './dashboard-mock-data';

const chartConfig = {
  revenue: {
    label: 'Revenue',
    color: 'var(--chart-4)',
  },
  payouts: {
    label: 'Payouts',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig;

export function RevenueStatsBlock() {
  const { data: response, isLoading, isError } = usePlatformAnalytics();
  const locale = useLocale();
  const t = useTranslations( 'dashboard.admin' );
  const analytics = response?.data;

  const stats = useMemo( () => [
    { label: t( 'dashboardBlocks.revenueStats.stats.totalRevenue' ), value: formatCurrency( analytics?.total_revenue, 'EUR', locale ) },
    { label: t( 'dashboardBlocks.revenueStats.stats.netRevenue' ), value: formatCurrency( analytics?.net_revenue, 'EUR', locale ) },
    { label: t( 'dashboardBlocks.revenueStats.stats.totalPayouts' ), value: formatCurrency( analytics?.total_payouts, 'EUR', locale ) },
  ], [ analytics, locale, t ] );

  return (
    <Card className="ad-summary-card justify-start">
      <CardHeader className="pb-2">
        <CardTitle className="ad-card-title">{ t( 'dashboardBlocks.revenueStats.title' ) }</CardTitle>
        <CardDescription className="ad-card-description">
          { t( 'dashboardBlocks.revenueStats.description' ) }
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        { isLoading && (
          <div className="grid grid-cols-3 gap-2">
            { Array.from( { length: 3 } ).map( ( _, i ) => (
              <div key={ `rev-skeleton-${ i }` } className="rounded-lg border border-border/60 bg-white p-2.5">
                <Skeleton className="mb-2 h-3 w-20" />
                <Skeleton className="h-7 w-16" />
              </div>
            ) ) }
          </div>
        ) }

        { isError && (
          <p className="py-8 text-center text-xs text-destructive">{ t( 'dashboardBlocks.revenueStats.states.error' ) }</p>
        ) }

        { !isLoading && !isError && (
          <>
            <div className="grid grid-cols-3 gap-2">
              { stats.map( ( item ) => (
                <div key={ item.label } className="rounded-lg border border-border/60 bg-white p-2.5">
                  <p className="ad-stat-label mb-1.5">{ item.label }</p>
                  <p className="text-2xl leading-none font-primary font-medium">{ item.value }</p>
                </div>
              ) ) }
            </div>

            <div>
              <div className="ad-chart-legend mb-2">
                <span className="ad-chart-legend-item">
                  <span className="ad-chart-dot bg-chart-4" />
                  { t( 'dashboardBlocks.revenueStats.labels.revenue' ) }
                </span>
                <span className="ad-chart-legend-item">
                  <span className="ad-chart-dot bg-chart-2" />
                  { t( 'dashboardBlocks.revenueStats.labels.payouts' ) }
                </span>
              </div>
              <ChartContainer config={ chartConfig } className="ad-chart-md">
                <AreaChart data={ financialSnapshot }>
                  <defs>
                    <linearGradient id="fillRevStats" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-revenue)" stopOpacity={ 0.35 } />
                      <stop offset="95%" stopColor="var(--color-revenue)" stopOpacity={ 0.1 } />
                    </linearGradient>
                    <linearGradient id="fillPayStats" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-payouts)" stopOpacity={ 0.35 } />
                      <stop offset="95%" stopColor="var(--color-payouts)" stopOpacity={ 0.1 } />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={ false } />
                  <XAxis dataKey="month" tickLine={ false } axisLine={ false } tickMargin={ 8 } />
                  <ChartTooltip content={ <ChartTooltipContent indicator="dot" /> } />
                  <Area dataKey="revenue" type="natural" stroke="var(--color-revenue)" fill="url(#fillRevStats)" strokeWidth={ 2 } />
                  <Area dataKey="payouts" type="natural" stroke="var(--color-payouts)" fill="url(#fillPayStats)" strokeWidth={ 2 } />
                </AreaChart>
              </ChartContainer>
            </div>
          </>
        ) }
      </CardContent>
    </Card>
  );
}
