'use client';

import { useMemo } from 'react';
import { Skeleton } from '@/components/dashboard-ui/skeleton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LabelList, RadialBar, RadialBarChart } from 'recharts';
import type { ModelsCampaignResponse } from '@/lib/api/generated/models';
import { useTranslations } from 'next-intl';

const STATUS_COLORS = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
  'var(--chart-5)',
];

interface BrandCampaignsRadialBlockProps {
  campaigns: ModelsCampaignResponse[];
  isLoading: boolean;
}

export function BrandCampaignsRadialBlock( { campaigns, isLoading }: BrandCampaignsRadialBlockProps ) {
  const t = useTranslations( 'dashboard.brand.landing.campaignsRadial' );
  const { chartConfig, campaignsStatusBreakdown, chartData } = useMemo( () => {
    const counts = new Map<string, number>();

    campaigns.forEach( ( campaign ) => {
      const normalizedStatus = String( campaign.campaign_status || '' ).trim().toLowerCase() || 'unknown';
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
      campaigns: {
        label: t( 'chartCampaignsLabel' ),
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
      campaigns: item.count,
      fill: `var(--color-${ item.key })`,
    } ) );

    return {
      chartConfig: dynamicChartConfig,
      campaignsStatusBreakdown: breakdown,
      chartData: radialData,
    };
  }, [ campaigns, t ] );

  const totalCampaigns = campaigns.length;

  return (
    <Card className="ad-users-card">
      <CardHeader className="pb-2">
        <CardTitle className="ad-card-title">{ t( 'title' ) }</CardTitle>
        <CardDescription className="ad-card-description">{ t( 'description' ) }</CardDescription>
      </CardHeader>
      <CardContent className="ad-users-content">
        { isLoading ? (
          <>
            <div className="ad-chart-radial flex items-center justify-center">
              <Skeleton className="h-[220px] w-[220px] rounded-full" />
            </div>
            <div className="space-y-3">
              <div>
                <Skeleton className="h-3 w-28" />
                <Skeleton className="mt-2 h-10 w-28" />
              </div>
              <div className="ad-users-breakdown space-y-2">
                { Array.from( { length: 4 } ).map( ( _, index ) => (
                  <div key={ `campaign-breakdown-skeleton-${ index }` } className="ad-users-breakdown-item">
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
                <RadialBar
                  dataKey="campaigns"
                  background={ {
                    fill: '#000000',
                    fillOpacity: 1,
                  } }
                >
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
                <p className="ad-total-label">{ t( 'totalCampaigns' ) }</p>
                <p className="ad-total-value">{ totalCampaigns.toLocaleString() }</p>
              </div>
              <div className="ad-users-breakdown">
                { campaignsStatusBreakdown.length === 0 && (
                  <div className="ad-users-breakdown-item">
                    <span className="text-sm text-muted-foreground">{ t( 'emptyState' ) }</span>
                  </div>
                ) }
                { campaignsStatusBreakdown.map( ( item ) => {
                  const pct = totalCampaigns > 0 ? ( item.count / totalCampaigns ) * 100 : 0;
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
      </CardContent>
    </Card>
  );
}
