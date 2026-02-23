import { Badge } from '@/components/dashboard-ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { recentActivity } from './dashboard-mock-data';

export function RecentActivityBlock() {
  return (
    <Card className="ad-card">
      <CardHeader>
        <CardTitle className="ad-card-title">Recent Activity</CardTitle>
        <CardDescription className="ad-card-description">Latest event stream from notification activity</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="ad-table-wrap">
          <table className="ad-table">
            <thead className="ad-table-head">
              <tr className="ad-table-head-row">
                <th className="ad-table-header">Event Name</th>
                <th className="ad-table-header">Event Type</th>
                <th className="ad-table-header">Actor</th>
                <th className="ad-table-header">When</th>
              </tr>
            </thead>
            <tbody>
              { recentActivity.map( ( item ) => (
                <tr key={ `${ item.eventName }-${ item.actor }-${ item.time }` } className="ad-table-row">
                  <td className="ad-table-cell font-medium">{ item.eventName }</td>
                  <td className="ad-table-cell">
                    <Badge variant="outline">{ item.eventType }</Badge>
                  </td>
                  <td className="ad-table-cell-muted">{ item.actor }</td>
                  <td className="ad-table-cell-muted">{ item.time }</td>
                </tr>
              ) ) }
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
