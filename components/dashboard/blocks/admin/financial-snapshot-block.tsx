'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
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

export function FinancialSnapshotBlock() {
  return (
    <Card className="ad-card">
      <CardHeader>
        <CardTitle className="ad-card-title">Financial Snapshot</CardTitle>
        <CardDescription className="ad-card-description">Monthly revenue versus creator payouts</CardDescription>
        <div className="ad-chart-legend">
          <span className="ad-chart-legend-item">
            <span className="ad-chart-dot bg-[var(--chart-4)]" />
            Revenue
          </span>
          <span className="ad-chart-legend-item">
            <span className="ad-chart-dot bg-[var(--chart-2)]" />
            Payouts
          </span>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <ChartContainer config={ chartConfig } className="ad-chart-md">
          <AreaChart data={ financialSnapshot }>
            <defs>
              <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-revenue)" stopOpacity={ 0.35 } />
                <stop offset="95%" stopColor="var(--color-revenue)" stopOpacity={ 0.1 } />
              </linearGradient>
              <linearGradient id="fillPayouts" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-payouts)" stopOpacity={ 0.35 } />
                <stop offset="95%" stopColor="var(--color-payouts)" stopOpacity={ 0.1 } />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={ false } />
            <XAxis dataKey="month" tickLine={ false } axisLine={ false } tickMargin={ 8 } />
            <ChartTooltip content={ <ChartTooltipContent indicator="dot" /> } />
            <Area dataKey="revenue" type="natural" stroke="var(--color-revenue)" fill="url(#fillRevenue)" strokeWidth={ 2 } />
            <Area dataKey="payouts" type="natural" stroke="var(--color-payouts)" fill="url(#fillPayouts)" strokeWidth={ 2 } />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
