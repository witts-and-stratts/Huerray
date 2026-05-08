'use client';

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from 'recharts';

interface StatsBarChartProps {
  chartData: Array<{ label: string; value: number; }>;
  dataLabel: string;
  color?: string;
  className?: string;
}

export function StatsBarChart( { chartData, dataLabel, color = 'var(--chart-2)', className }: StatsBarChartProps ) {
  const chartConfig = {
    value: {
      label: dataLabel,
      color,
    },
    label: {
      color: 'var(--background)',
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={ chartConfig } className={ className ?? "h-[180px] w-full" }>
      <BarChart
        accessibilityLayer
        data={ chartData }
        layout="vertical"
        margin={ { right: 24 } }
      >
        <CartesianGrid horizontal={ false } />
        <YAxis
          dataKey="label"
          type="category"
          tickLine={ false }
          tickMargin={ 10 }
          axisLine={ false }
          hide
        />
        <XAxis dataKey="value" type="number" hide />
        <ChartTooltip cursor={ false } content={ <ChartTooltipContent indicator="line" /> } />
        <Bar dataKey="value" layout="vertical" fill="var(--color-value)" radius={ 4 }>
          <LabelList
            dataKey="label"
            position="insideLeft"
            offset={ 8 }
            className="fill-background"
            fontSize={ 12 }
          />
          <LabelList
            dataKey="value"
            position="right"
            offset={ 8 }
            className="fill-foreground"
            fontSize={ 12 }
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}
