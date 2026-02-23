'use client';

import { TrendingUp } from 'lucide-react';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from 'recharts';

interface GigsStatsPanelProps {
  chartData: Array<{ label: string; gigs: number; }>;
}

export function GigsStatsPanel( { chartData }: GigsStatsPanelProps ) {
  const chartConfig = {
    gigs: {
      label: 'Gigs',
      color: 'var(--chart-2)',
    },
    label: {
      color: 'var(--background)',
    },
  } satisfies ChartConfig;

  return (
    <>
      <ChartContainer config={ chartConfig } className="h-[140px] w-full">
        <BarChart
          accessibilityLayer
          data={ chartData }
          layout="vertical"
          margin={ {
            right: 16,
          } }
        >
          <CartesianGrid horizontal={ false } />
          <YAxis
            dataKey="label"
            type="category"
            tickLine={ false }
            tickMargin={ 10 }
            axisLine={ false }
            tickFormatter={ ( value ) => value.slice( 0, 3 ) }
            hide
          />
          <XAxis dataKey="gigs" type="number" hide />
          <ChartTooltip
            cursor={ false }
            content={ <ChartTooltipContent indicator="line" /> }
          />
          <Bar
            dataKey="gigs"
            layout="vertical"
            fill="var(--color-gigs)"
            radius={ 4 }
          >
            <LabelList
              dataKey="label"
              position="insideLeft"
              offset={ 8 }
              className="fill-background"
              fontSize={ 12 }
            />
            <LabelList
              dataKey="gigs"
              position="right"
              offset={ 8 }
              className="fill-foreground"
              fontSize={ 12 }
            />
          </Bar>
        </BarChart>
      </ChartContainer>
      <div className='mt-4 flex gap-1 flex-col'>
        <div className="flex gap-2 leading-none font-medium text-xs">
          Trending up by 4.6% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none text-xs">
          Showing total gigs across key lifecycle stages
        </div>
      </div>
    </>
  );
}
