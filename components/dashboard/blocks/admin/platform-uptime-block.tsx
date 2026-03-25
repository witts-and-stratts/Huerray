import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { platformUptime } from './dashboard-mock-data';
import { useTranslations } from 'next-intl';

export function PlatformUptimeBlock() {
  const t = useTranslations( 'dashboard.admin' );

  return (
    <Card className="ad-summary-card">
      <CardHeader className="pb-2">
        <CardTitle className="ad-card-title">{ t( 'dashboardBlocks.platformUptime.title' ) }</CardTitle>
        <CardDescription className="ad-card-description">{ t( 'dashboardBlocks.platformUptime.description' ) }</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="rounded-lg border border-border/60 bg-white p-2.5">
          <p className="ad-stat-label mb-1.5">{ t( 'dashboardBlocks.platformUptime.labels.uptime' ) }</p>
          <p className="text-2xl leading-none font-primary font-medium">{ platformUptime.value }</p>
          <span className="ad-delta-neutral">{ platformUptime.delta }</span>
        </div>
      </CardContent>
    </Card>
  );
}
