'use client';

import { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import '@/app/styles/components/dashboard-stats.css';
import '@/app/styles/components/dashboard-analytics.css';
import { Button } from '@/components/dashboard-ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/dashboard-ui/card';
import { Skeleton } from '@/components/dashboard-ui/skeleton';
import { SuperField } from '@/components/dashboard-ui/super-field';
import { KpiCard } from '@/components/dashboard/blocks/shared/kpi-card';
import { SubHeader } from '@/components/subheader';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { cn } from '@/lib/dashboard-utils';
import { useLocale } from 'next-intl';
import { Bar, BarChart, CartesianGrid, Cell, LabelList, XAxis, YAxis } from 'recharts';

export type AnalyticsPeriod = 'all_time' | 'last_week' | 'last_month' | 'last_three_months' | 'last_year';
export type PeriodEndpoint = Exclude<AnalyticsPeriod, 'all_time'>;

type AnalyticsQuery<TData extends object> = {
  data?: {
    data?: TData;
  };
  isLoading: boolean;
  isError: boolean;
  isFetching: boolean;
  refetch: () => unknown;
};

export type AnalyticsMetric<TData extends object> = {
  key: keyof TData;
  label: string;
  kind?: 'currency' | 'percent' | 'number';
  shortLabel?: string;
};

export type AnalyticsMetricGroup<TData extends object> = {
  title: string;
  description: string;
  items: AnalyticsMetric<TData>[];
};

type AnalyticsPeriodOption = {
  value: AnalyticsPeriod;
  label: string;
};

type DashboardAnalyticsPageProps<TData extends object> = {
  title: string;
  description: string;
  periodLabel: string;
  refreshLabel: string;
  errorLabel: string;
  periodOptions: AnalyticsPeriodOption[];
  summaryMetrics: AnalyticsMetric<TData>[];
  rows: AnalyticsMetricGroup<TData>[][];
  useAllAnalytics: ( options: { enabled: boolean } ) => AnalyticsQuery<TData>;
  usePeriodAnalytics: ( period: PeriodEndpoint, options: { enabled: boolean } ) => AnalyticsQuery<TData>;
};

const PERIOD_FALLBACK: PeriodEndpoint = 'last_month';
const BAR_COLORS = [ 'var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)' ];

const groupChartConfig = {
  value: {
    label: 'Value',
    color: 'var(--chart-2)',
  },
  label: {
    color: 'var(--background)',
  },
} satisfies ChartConfig;

function formatMetric( value: unknown, kind: AnalyticsMetric<object>[ 'kind' ], locale: string ) {
  const numericValue = typeof value === 'number' ? value : undefined;
  if ( numericValue === undefined || numericValue === null ) return '-';

  if ( kind === 'currency' ) {
    return new Intl.NumberFormat( locale, {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    } ).format( numericValue );
  }

  if ( kind === 'percent' ) {
    const normalized = numericValue > 1 ? numericValue : numericValue * 100;
    return `${ normalized.toFixed( 1 ) }%`;
  }

  return new Intl.NumberFormat( locale ).format( numericValue );
}

function readMetric<TData extends object>( analytics: TData | undefined, key: keyof TData ) {
  const value = analytics?.[ key ];
  return typeof value === 'number' ? value : 0;
}

function getAxisLabel( label: string ) {
  const words = label.split( ' ' ).filter( Boolean );
  if ( words.length <= 1 ) return label;
  return words[ words.length - 1 ];
}

function MetricGroupChart<TData extends object>( {
  analytics,
  group,
  locale,
}: {
  analytics: TData | undefined;
  group: AnalyticsMetricGroup<TData>;
  locale: string;
} ) {
  const chartItems = group.items.filter( ( item ) => item.kind !== 'percent' );
  const rateItem = group.items.find( ( item ) => item.kind === 'percent' );
  const chartData = chartItems.map( ( item ) => ( {
    metric: item.label,
    axisLabel: item.shortLabel || getAxisLabel( item.label ),
    value: readMetric( analytics, item.key ),
    displayValue: formatMetric( analytics?.[ item.key ], item.kind, locale ),
  } ) );

  const rateValue = rateItem ? readMetric( analytics, rateItem.key ) : 0;

  return (
    <div className={ cn( rateItem ? 'analytics-chart-layout' : 'analytics-chart-layout-single' ) }>
      <div className="analytics-chart-box">
        <ChartContainer config={ groupChartConfig } className="analytics-chart-container">
          <BarChart
            accessibilityLayer
            data={ chartData }
            barCategoryGap="34%"
            margin={ { top: 20, right: 18, left: 18, bottom: 8 } }
          >
            <CartesianGrid vertical={ false } />
            <XAxis
              dataKey="axisLabel"
              type="category"
              tickLine={ false }
              axisLine={ false }
              tickMargin={ 8 }
            />
            <YAxis dataKey="value" type="number" hide />
            <ChartTooltip
              cursor={ false }
              content={
                <ChartTooltipContent
                  indicator="line"
                  formatter={ ( value, name, item ) => (
                    <div className="flex min-w-[10rem] items-center justify-between gap-4">
                      <span className="text-muted-foreground">{ item.payload.metric }</span>
                      <span className="font-mono font-medium tabular-nums">
                        { item.payload.displayValue || value?.toLocaleString() }
                      </span>
                    </div>
                  ) }
                />
              }
            />
            <Bar dataKey="value" fill="var(--color-value)" radius={ [ 2, 2, 0, 0 ] } barSize={ 40 } maxBarSize={ 40 }>
              { chartData.map( ( item, index ) => (
                <Cell key={ item.metric } fill={ BAR_COLORS[ index % BAR_COLORS.length ] } />
              ) ) }
              <LabelList
                dataKey="displayValue"
                position="top"
                offset={ 8 }
                className="fill-foreground"
                fontSize={ 12 }
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </div>

      { rateItem && (
        <div className="analytics-rate-card">
          <p className="ad-stat-label">{ rateItem.label }</p>
          <p className="ad-stat-value mt-3 text-primary tabular-nums">
            { formatMetric( rateValue, 'percent', locale ) }
          </p>
          <p className="mt-2 text-xs leading-snug text-muted-foreground">
            { group.title }
          </p>
        </div>
      ) }
    </div>
  );
}

function LoadingGroup() {
  return (
    <div className="analytics-chart-layout">
      <div className="space-y-3">
        { Array.from( { length: 3 } ).map( ( _, index ) => (
          <div key={ `analytics-skeleton-${ index }` } className="rounded-lg border border-border/60 bg-white p-3">
            <Skeleton className="mb-3 h-4 w-32" />
            <Skeleton className="h-6 w-full" />
          </div>
        ) ) }
      </div>
      <div className="rounded-lg border border-border/60 bg-white p-4">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="mt-3 h-10 w-20" />
        <Skeleton className="mt-2 h-4 w-24" />
      </div>
    </div>
  );
}

export function DashboardAnalyticsPage<TData extends object>( {
  title,
  description,
  periodLabel,
  refreshLabel,
  errorLabel,
  periodOptions,
  summaryMetrics,
  rows,
  useAllAnalytics,
  usePeriodAnalytics,
}: DashboardAnalyticsPageProps<TData> ) {
  const locale = useLocale();
  const [ period, setPeriod ] = useState<AnalyticsPeriod>( 'all_time' );

  const baseQuery = useAllAnalytics( {
    enabled: period === 'all_time',
  } );
  const periodQuery = usePeriodAnalytics(
    period === 'all_time' ? PERIOD_FALLBACK : period,
    {
      enabled: period !== 'all_time',
    }
  );

  const activeQuery = period === 'all_time' ? baseQuery : periodQuery;
  const analytics = activeQuery.data?.data;
  const selectedPeriodLabel = periodOptions.find( ( option ) => option.value === period )?.label || periodOptions[ 0 ]?.label || '';

  return (
    <>
      <SubHeader title={ title } description={ description } childrenClassName='items-end'>
        <SuperField
          type="select"
          label={ periodLabel }
          labelClassName="sr-only"
          value={ period }
          options={ periodOptions }
          onValueChange={ ( value ) => value && setPeriod( value as AnalyticsPeriod ) }
          fieldClassName="w-52 bg-white"
        />
        <Button variant="outline" className="gap-2" onClick={ () => activeQuery.refetch() }>
          <RefreshCw className={ cn( 'size-4', activeQuery.isFetching && 'animate-spin' ) } />
          { refreshLabel }
        </Button>
      </SubHeader>

      <div className="ad-shell py-4 bg-burgundy-50/50 mt-0">
        <section className="analytics-kpi-grid">
          { summaryMetrics.map( ( metric ) => (
            <KpiCard
              key={ String( metric.key ) }
              title={ metric.label }
              value={ formatMetric( analytics?.[ metric.key ], metric.kind, locale ) }
              caption={ selectedPeriodLabel }
              isLoading={ activeQuery.isLoading }
            />
          ) ) }
        </section>

        { activeQuery.isError && (
          <Card className="ad-card">
            <CardContent>
              <p className="py-8 text-center text-xs text-destructive">{ errorLabel }</p>
            </CardContent>
          </Card>
        ) }

        { !activeQuery.isError && (
          <div className="space-y-4 @container">
            { rows.map( ( row, rowIndex ) => (
              <section
                key={ `analytics-row-${ rowIndex }` }
                className={ row.length > 1 ? 'analytics-chart-row-two' : 'analytics-chart-row' }
              >
                { row.map( ( group ) => (
                  <Card key={ group.title } className="ad-summary-card justify-start">
                    <CardHeader>
                      <CardTitle className="ad-card-title">{ group.title }</CardTitle>
                      <CardDescription className="ad-card-description">{ group.description }</CardDescription>
                    </CardHeader>
                    <CardContent>
                      { activeQuery.isLoading ? (
                        <LoadingGroup />
                      ) : (
                        <MetricGroupChart
                          analytics={ analytics }
                          group={ group }
                          locale={ locale }
                        />
                      ) }
                    </CardContent>
                  </Card>
                ) ) }
              </section>
            ) ) }
          </div>
        ) }
      </div>
    </>
  );
}
