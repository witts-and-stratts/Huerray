'use client';

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
import { type DateRange } from '@/components/dashboard-ui/superfield/date-picker-input';
import { KpiCard } from '@/components/dashboard/blocks/shared/kpi-card';
import { SubHeader } from '@/components/subheader';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { cn } from '@/lib/dashboard-utils';
import { type AnalyticsFilters } from '@/lib/api/hooks/analytics';
import { usePersistedAnalyticsTimeframe } from '@/lib/hooks/use-persisted-analytics-timeframe';
import type { AnalyticsTimeframe } from '@/lib/redux/features/ui/uiSlice';
import { useLocale } from 'next-intl';
import { Bar, BarChart, CartesianGrid, Cell, LabelList, XAxis, YAxis } from 'recharts';

export type AnalyticsPeriod = 'all_time' | 'last_week' | 'last_month' | 'last_three_months' | 'last_year' | 'date_range';
export type PeriodEndpoint = Exclude<AnalyticsPeriod, 'all_time' | 'date_range'>;

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
  dateRangeLabel: string;
  dateRangePlaceholder: string;
  storageKey: string;
  refreshLabel: string;
  errorLabel: string;
  periodOptions: AnalyticsPeriodOption[];
  summaryMetrics: AnalyticsMetric<TData>[];
  rows: AnalyticsMetricGroup<TData>[][];
  useAnalytics: ( filters: AnalyticsFilters | undefined, options: { enabled: boolean; } ) => AnalyticsQuery<TData>;
};

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

function formatDateParam( date: Date ) {
  const year = date.getFullYear();
  const month = `${ date.getMonth() + 1 }`.padStart( 2, '0' );
  const day = `${ date.getDate() }`.padStart( 2, '0' );
  return `${ year }-${ month }-${ day }`;
}

function getDateRangeFilters( dateRange: DateRange | undefined ): AnalyticsFilters | undefined {
  if ( !dateRange?.from || !dateRange?.to ) return undefined;
  return {
    startDate: formatDateParam( dateRange.from ),
    endDate: formatDateParam( dateRange.to ),
  };
}

function isAnalyticsPeriod( value: string | undefined ): value is AnalyticsPeriod {
  return value === 'all_time'
    || value === 'last_week'
    || value === 'last_month'
    || value === 'last_three_months'
    || value === 'last_year'
    || value === 'date_range';
}

function parseStoredDate( value: string | undefined ): Date | undefined {
  if ( !value ) return undefined;
  const date = new Date( `${ value }T00:00:00` );
  return isNaN( date.getTime() ) ? undefined : date;
}

function parseStoredDateRange( dateRange: AnalyticsTimeframe[ 'dateRange' ] ): DateRange | undefined {
  if ( !dateRange?.from && !dateRange?.to ) return undefined;
  return {
    from: parseStoredDate( dateRange.from ),
    to: parseStoredDate( dateRange.to ),
  };
}

function serializeDateRange( dateRange: DateRange | undefined ): AnalyticsTimeframe[ 'dateRange' ] {
  if ( !dateRange?.from && !dateRange?.to ) return undefined;
  return {
    from: dateRange.from ? formatDateParam( dateRange.from ) : undefined,
    to: dateRange.to ? formatDateParam( dateRange.to ) : undefined,
  };
}

function formatDateRangeCaption( dateRange: DateRange, locale: string ) {
  if ( !dateRange.from || !dateRange.to ) return '';
  const formatter = new Intl.DateTimeFormat( locale, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  } );
  return `${ formatter.format( dateRange.from ) } - ${ formatter.format( dateRange.to ) }`;
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
  dateRangeLabel,
  dateRangePlaceholder,
  storageKey,
  refreshLabel,
  errorLabel,
  periodOptions,
  summaryMetrics,
  rows,
  useAnalytics,
}: DashboardAnalyticsPageProps<TData> ) {
  const locale = useLocale();
  const { timeframe, setTimeframe } = usePersistedAnalyticsTimeframe( storageKey );
  const period = isAnalyticsPeriod( timeframe.period ) ? timeframe.period : 'all_time';
  const dateRange = parseStoredDateRange( timeframe.dateRange );

  const isDateRangeSelected = period === 'date_range';
  const dateRangeFilters = isDateRangeSelected ? getDateRangeFilters( dateRange ) : undefined;
  const activeFilters = dateRangeFilters ?? ( period === 'all_time' || isDateRangeSelected ? undefined : { period } );
  const activeQuery = useAnalytics( activeFilters, { enabled: !isDateRangeSelected || !!dateRangeFilters } );
  const analytics = isDateRangeSelected && !dateRangeFilters ? undefined : activeQuery.data?.data;
  const selectedPeriodLabel = isDateRangeSelected
    ? dateRangeFilters && dateRange
      ? formatDateRangeCaption( dateRange, locale )
      : dateRangeLabel
    : periodOptions.find( ( option ) => option.value === period )?.label || periodOptions[ 0 ]?.label || '';

  return (
    <>
      <SubHeader title={ title } description={ description } childrenClassName='items-end'>
        <SuperField
          type="date-range-with-options"
          label={ periodLabel }
          labelClassName="sr-only"
          className='w-full md:w-[240px]'
          dropdownClassName='w-[240px]'
          value={ period }
          options={ periodOptions }
          dateRange={ dateRange }
          onDateRangeChange={ ( value ) => {
            setTimeframe( {
              period: 'date_range',
              dateRange: serializeDateRange( value ),
            } );
          } }
          dateRangeValue="date_range"
          dateRangeLabel={ dateRangeLabel }
          dateRangePlaceholder={ dateRangePlaceholder }
          placeholder={ periodOptions[ 0 ]?.label }
          locale={ locale }
          onValueChange={ ( value ) => {
            if ( !value ) return;
            const nextPeriod = isAnalyticsPeriod( value ) ? value : 'all_time';
            setTimeframe( {
              period: nextPeriod,
              dateRange: nextPeriod === 'date_range' ? timeframe.dateRange : undefined,
            } );
          } }
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
