import { getTranslations } from 'next-intl/server';
import { Button } from '@/components/dashboard-ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/dashboard-ui/card';

export async function BrandDashboard() {
  const t = await getTranslations( 'dashboard.brand' );
  const tCommon = await getTranslations( 'dashboard.common' );

  const stats = [
    {
      labelKey: 'stats.activeCampaigns',
      value: '12',
      change: '+20%',
    },
    {
      labelKey: 'stats.connectedCreators',
      value: '45',
      change: '+15%',
    },
    {
      labelKey: 'stats.totalSpend',
      value: '$24,500',
      change: '+8%',
    },
    {
      labelKey: 'stats.averageRoi',
      value: '3.2x',
      change: '+12%',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */ }
      <div>
        <h1 className="text-h3 font-primary font-medium tracking-tight">
          { tCommon( 'dashboard' ) }
        </h1>
        <p className="text-muted-foreground mt-1">
          { t( 'welcome' ) } { t( 'overview' ) }
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
                <span className="text-green-500 font-medium">{ stat.change }</span> { t( 'stats.fromLastMonth' ) }
              </p>
            </CardContent>
          </Card>
        ) ) }
      </div>

      {/* Recent Campaigns */ }
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold">
            { t( 'recentCampaigns' ) }
          </CardTitle>
          <Button variant="link" className="text-sm">
            { tCommon( 'viewAll' ) }
          </Button>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            { t( 'noCampaigns' ) }
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
            { t( 'createCampaign' ) }
          </Button>
          <Button variant="outline">
            { t( 'findCreators' ) }
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
