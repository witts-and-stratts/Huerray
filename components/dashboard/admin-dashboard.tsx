/* eslint-disable @next/next/no-html-link-for-pages */
import { getTranslations } from 'next-intl/server';
import { Button } from '@/components/dashboard-ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/dashboard-ui/card';

export async function AdminDashboard() {
  const t = await getTranslations( 'dashboard.admin' );
  const tCommon = await getTranslations( 'dashboard.common' );

  const stats = [
    {
      labelKey: 'stats.totalUsers',
      value: '1,240',
      change: '+150',
      changeLabel: 'this month',
    },
    {
      labelKey: 'stats.activeCampaigns',
      value: '35',
      change: '+5',
      changeLabel: 'this week',
    },
    {
      labelKey: 'stats.pendingReports',
      value: '2',
      change: '-1',
      changeLabel: 'vs yesterday',
    },
    {
      labelKey: 'stats.systemHealth',
      value: '99.9%',
      change: 'Stable',
      changeLabel: 'uptime',
    },
  ];

  const recentUsers = [
    { name: 'Acme Corp', type: 'Brand', status: 'Active', date: '2 hours ago' },
    { name: 'Jane Smith', type: 'Creator', status: 'Pending', date: '5 hours ago' },
    { name: 'Tech Startup', type: 'Brand', status: 'Active', date: '1 day ago' },
  ];

  const pendingActions = [
    { action: 'Review content report', priority: 'High', count: 2 },
    { action: 'Approve new brands', priority: 'Medium', count: 5 },
    { action: 'System maintenance', priority: 'Low', count: 1 },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */ }
      <div>
        <h1 className="text-h3 font-primary font-medium tracking-tight">
          { tCommon( 'dashboard' ) }
        </h1>
        <p className="text-muted-foreground mt-1">
          Platform overview and system management
        </p>
      </div>

      {/* Stats Grid */ }
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        { stats.map( ( stat ) => (
          <Card key={ stat.labelKey } className="py-4">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-regular text-slate-600">
                { t( stat.labelKey ) }
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-medium font-primary">{ stat.value }</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className={
                  stat.change.startsWith( '+' )
                    ? "text-green-500 font-medium"
                    : stat.change === 'Stable'
                      ? "text-blue-500 font-medium"
                      : stat.change.startsWith( '-' )
                        ? "text-red-500 font-medium"
                        : "font-medium"
                }>
                  { stat.change }
                </span> { stat.changeLabel }
              </p>
            </CardContent>
          </Card>
        ) ) }
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */ }
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">
              Recent User Registrations
            </CardTitle>
            <Button variant="link" className="text-sm" render={ <a href="/dashboard/admin/users">View All</a> }>
              { tCommon( 'viewAll' ) }
            </Button>
          </CardHeader>
          <CardContent>
            { recentUsers.length > 0 ? (
              <div className="space-y-4">
                { recentUsers.map( ( user, index ) => (
                  <div key={ index } className="flex items-center justify-between py-2 border-b last:border-0">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{ user.name }</p>
                      <p className="text-xs text-muted-foreground">{ user.type } • { user.date }</p>
                    </div>
                    <span className={ `text-xs px-2 py-1 rounded-full ${ user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700' }` }>
                      { user.status }
                    </span>
                  </div>
                ) ) }
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No recent users</p>
            ) }
          </CardContent>
        </Card>

        {/* Pending Actions */ }
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">
              Pending Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            { pendingActions.length > 0 ? (
              <div className="space-y-4">
                { pendingActions.map( ( item, index ) => (
                  <div key={ index } className="flex items-center justify-between py-2 border-b last:border-0">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{ item.action }</p>
                      <p className="text-xs text-muted-foreground">{ item.count } item{ item.count !== 1 ? 's' : '' }</p>
                    </div>
                    <span className={ `text-xs px-2 py-1 rounded-full ${ item.priority === 'High'
                      ? 'bg-red-100 text-red-700'
                      : item.priority === 'Medium'
                        ? 'bg-orange-100 text-orange-700'
                        : 'bg-gray-100 text-gray-700'
                      }` }>
                      { item.priority }
                    </span>
                  </div>
                ) ) }
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No pending actions</p>
            ) }
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */ }
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            { tCommon( 'quickActions' ) }
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <Button render={ <a href="/dashboard/admin/users">Manage Users</a> }>
            { t( 'manageUsers' ) }
          </Button>
          <Button variant="outline" render={ <a href="/dashboard/admin/moderation">Review Reports</a> }>
            { t( 'reviewReports' ) }
          </Button>
          <Button variant="outline" render={ <a href="/dashboard/admin/campaigns">View All Campaigns</a> }>
            View Campaigns
          </Button>
          <Button variant="outline" render={ <a href="/dashboard/admin/analytics">Platform Analytics</a> }>
            Analytics
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
