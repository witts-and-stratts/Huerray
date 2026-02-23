'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
import { platformHealthSeries } from './dashboard-mock-data';

const chartConfig = {
  users: {
    label: 'Users',
    color: 'var(--chart-1)',
  },
  campaigns: {
    label: 'Campaigns',
    color: 'var(--chart-2)',
  },
  submissions: {
    label: 'Submissions',
    color: 'var(--chart-3)',
  },
} satisfies ChartConfig;

export function PlatformHealthAreaBlock() {
  return (
    <Card className="ad-card">
      <CardHeader>
        <CardTitle className="ad-card-title">Platform Health Trend</CardTitle>
        <CardDescription className="ad-card-description">Users, campaigns, and submissions over the last 6 months</CardDescription>
        <div className="ad-chart-legend">
          <span className="ad-chart-legend-item">
            <span className="ad-chart-dot bg-[var(--chart-1)]" />
            Users
          </span>
          <span className="ad-chart-legend-item">
            <span className="ad-chart-dot bg-[var(--chart-2)]" />
            Campaigns
          </span>
          <span className="ad-chart-legend-item">
            <span className="ad-chart-dot bg-[var(--chart-3)]" />
            Submissions
          </span>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <ChartContainer config={ chartConfig } className="ad-chart-lg">
          <AreaChart data={ platformHealthSeries }>
            <defs>
              <linearGradient id="fillUsers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-users)" stopOpacity={ 0.35 } />
                <stop offset="95%" stopColor="var(--color-users)" stopOpacity={ 0.05 } />
              </linearGradient>
              <linearGradient id="fillCampaigns" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-campaigns)" stopOpacity={ 0.35 } />
                <stop offset="95%" stopColor="var(--color-campaigns)" stopOpacity={ 0.05 } />
              </linearGradient>
              <linearGradient id="fillSubmissions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-submissions)" stopOpacity={ 0.35 } />
                <stop offset="95%" stopColor="var(--color-submissions)" stopOpacity={ 0.05 } />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={ false } />
            <XAxis dataKey="month" tickLine={ false } axisLine={ false } tickMargin={ 8 } />
            <ChartTooltip content={ <ChartTooltipContent indicator="dot" /> } />
            <Area dataKey="users" type="natural" stroke="var(--color-users)" fill="url(#fillUsers)" strokeWidth={ 2 } />
            <Area dataKey="campaigns" type="natural" stroke="var(--color-campaigns)" fill="url(#fillCampaigns)" strokeWidth={ 2 } />
            <Area dataKey="submissions" type="natural" stroke="var(--color-submissions)" fill="url(#fillSubmissions)" strokeWidth={ 2 } />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
