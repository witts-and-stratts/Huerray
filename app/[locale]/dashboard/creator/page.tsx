import { getTranslations } from 'next-intl/server';
import { Button } from '@/components/dashboard-ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/dashboard-ui/card';

export default async function CreatorDashboardPage() {
  const t = await getTranslations( 'dashboard.creator' );
  const tCommon = await getTranslations( 'dashboard.common' );

  const stats = [
    {
      labelKey: 'stats.activeGigs',
      value: '4',
      change: '+1',
    },
    {
      labelKey: 'stats.completedGigs',
      value: '18',
      change: '+3',
    },
    {
      labelKey: 'stats.totalEarnings',
      value: '$3,200',
      change: '+15%',
    },
    {
      labelKey: 'stats.avgRating',
      value: '4.9',
      change: '+0.1',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */ }
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          { tCommon( 'dashboard' ) }
        </h1>
        <p className="text-muted-foreground mt-1">
          { t( 'welcome' ) } { t( 'overview' ) }
        </p>
      </div>

      {/* Stats Grid */ }
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        { stats.map( ( stat ) => (
          <Card key={ stat.labelKey }>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                { t( stat.labelKey ) }
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{ stat.value }</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-500 font-medium">{ stat.change }</span> { t( 'stats.fromLastMonth' ) }
              </p>
            </CardContent>
          </Card>
        ) ) }
      </div>

      {/* Recent Activity / Gigs */ }
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold">
            { t( 'recentGigs' ) }
          </CardTitle>
          <Button variant="link" className="text-sm">
            { tCommon( 'viewAll' ) }
          </Button>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            { t( 'noGigs' ) }
          </p>
        </CardContent>
      </Card>

      {/* Quick Actions */ }
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            { tCommon( 'quickActions' ) }
          </CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4">
          <Button>
            { t( 'browseGigs' ) }
          </Button>
          <Button variant="outline">
            { t( 'updatePortfolio' ) }
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
