import { Badge } from '@/components/dashboard-ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { operationalAlerts } from './dashboard-mock-data';

function severityVariant( severity: 'high' | 'medium' | 'low' ) {
  if ( severity === 'high' ) return 'destructive';
  if ( severity === 'medium' ) return 'secondary';
  return 'outline';
}

export function OperationalAlertsBlock() {
  return (
    <Card className="ad-card">
      <CardHeader>
        <CardTitle className="ad-card-title">Operational Alerts</CardTitle>
        <CardDescription className="ad-card-description">System and workflow signals that may require intervention</CardDescription>
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
