'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LabelList, RadialBar, RadialBarChart } from 'recharts';
import { usersStatusBreakdown } from './dashboard-mock-data';

const chartConfig = {
  users: {
    label: 'Users',
  },
  approved: {
    label: 'Approved',
    color: 'var(--chart-1)',
  },
  pending: {
    label: 'Pending Approval',
    color: 'var(--chart-2)',
  },
  returned: {
    label: 'Returned',
    color: 'var(--chart-4)',
  },
  suspended: {
    label: 'Suspended',
    color: 'var(--chart-5)',
  },
} satisfies ChartConfig;

export function UsersStatusRadialCard() {
  const totalUsers = usersStatusBreakdown.reduce( ( acc, item ) => acc + item.count, 0 );
  const chartData = [
    { key: 'approved', status: 'approved', users: usersStatusBreakdown[ 0 ]?.count || 0, fill: 'var(--color-approved)' },
    { key: 'pending', status: 'pending', users: usersStatusBreakdown[ 1 ]?.count || 0, fill: 'var(--color-pending)' },
    { key: 'returned', status: 'returned', users: usersStatusBreakdown[ 2 ]?.count || 0, fill: 'var(--color-returned)' },
    { key: 'suspended', status: 'suspended', users: usersStatusBreakdown[ 3 ]?.count || 0, fill: 'var(--color-suspended)' },
  ];

  return (
    <Card className="ad-users-card">
      <CardHeader className="pb-2">
        <CardTitle className="ad-card-title">Users</CardTitle>
        <CardDescription className="ad-card-description">Status distribution across all platform users</CardDescription>
      </CardHeader>
      <CardContent className="ad-users-content">
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
              const pct = ( item.count / totalUsers ) * 100;
              return (
                <div key={ item.status } className="ad-users-breakdown-item">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 rounded-full" style={ { backgroundColor: item.fill } } />
                    <span>{ item.status }</span>
                  </div>
                  <span className="font-medium tabular-nums">
                    { item.count.toLocaleString() } ({ pct.toFixed( 1 ) }%)
                  </span>
                </div>
              );
            } ) }
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
