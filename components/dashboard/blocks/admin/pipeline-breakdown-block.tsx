'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import { pipelineByStatus } from './dashboard-mock-data';

const chartConfig = {
  campaigns: {
    label: 'Campaigns',
    color: 'var(--chart-1)',
  },
  gigs: {
    label: 'Gigs',
    color: 'var(--chart-2)',
  },
  submissions: {
    label: 'Submissions',
    color: 'var(--chart-5)',
  },
} satisfies ChartConfig;

export function PipelineBreakdownBlock() {
  return (
    <Card className="ad-card">
      <CardHeader>
        <CardTitle className="ad-card-title">Pipeline By Status</CardTitle>
        <CardDescription className="ad-card-description">Campaigns, gigs, and submissions grouped by current status</CardDescription>
        <div className="ad-chart-legend">
          <span className="ad-chart-legend-item">
            <span className="ad-chart-dot bg-[var(--chart-1)]" />
            Campaigns
          </span>
          <span className="ad-chart-legend-item">
            <span className="ad-chart-dot bg-[var(--chart-2)]" />
            Gigs
          </span>
          <span className="ad-chart-legend-item">
            <span className="ad-chart-dot bg-[var(--chart-5)]" />
            Submissions
          </span>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <ChartContainer config={ chartConfig } className="ad-chart-lg">
          <BarChart data={ pipelineByStatus }>
            <CartesianGrid vertical={ false } />
            <XAxis
              dataKey="status"
              tickLine={ false }
              axisLine={ false }
              tickMargin={ 8 }
              tickFormatter={ ( value ) => value.slice( 0, 12 ) }
            />
            <ChartTooltip content={ <ChartTooltipContent indicator="dot" /> } />
            <Bar dataKey="campaigns" fill="var(--color-campaigns)" radius={ 4 } />
            <Bar dataKey="gigs" fill="var(--color-gigs)" radius={ 4 } />
            <Bar dataKey="submissions" fill="var(--color-submissions)" radius={ 4 } />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
