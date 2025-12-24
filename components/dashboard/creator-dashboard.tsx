import { getTranslations } from 'next-intl/server';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/dashboard-ui/card';

export async function CreatorDashboard() {
  const tCommon = await getTranslations( 'dashboard.common' );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-h3 font-primary font-medium tracking-tight">
          Creator { tCommon( 'dashboard' ) }
        </h1>
        <p className="text-muted-foreground mt-1">
          View your gigs, earnings, and portfolio
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">Available Gigs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-primary font-medium">23</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">Active Gigs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-primary font-medium">5</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">Total Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-primary font-medium">$4,250</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-primary font-medium">98%</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
