import { Badge } from '@/components/dashboard-ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { operationalAlerts } from './dashboard-mock-data';
import { useTranslations } from 'next-intl';

function severityVariant( severity: 'high' | 'medium' | 'low' ) {
  if ( severity === 'high' ) return 'destructive';
  if ( severity === 'medium' ) return 'secondary';
  return 'outline';
}

export function OperationalAlertsBlock() {
  const t = useTranslations( 'dashboard.admin' );
  return (
    <Card className="ad-card">
      <CardHeader>
        <CardTitle className="ad-card-title">{ t( 'dashboardBlocks.operationalAlerts.title' ) }</CardTitle>
        <CardDescription className="ad-card-description">{ t( 'dashboardBlocks.operationalAlerts.description' ) }</CardDescription>
      </CardHeader>
      <CardContent className="ad-alert-list">
        { operationalAlerts.map( ( alert ) => (
          <div
            key={ alert.title }
            className={
              alert.severity === 'high'
                ? 'ad-alert-item-high'
                : alert.severity === 'medium'
                  ? 'ad-alert-item-medium'
                  : 'ad-alert-item-low'
            }
          >
            <div className="ad-alert-top">
              <p className="text-sm font-medium">{ alert.title }</p>
              <Badge variant={ severityVariant( alert.severity ) }>
                { alert.severity.toUpperCase() }
              </Badge>
            </div>
            <p className="ad-alert-detail">{ alert.detail }</p>
          </div>
        ) ) }
      </CardContent>
    </Card>
  );
}
