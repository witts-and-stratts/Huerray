import { Badge } from '@/components/dashboard-ui/badge';
import { Button } from '@/components/dashboard-ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { Progress } from '@/components/dashboard-ui/progress';
import { approvalQueues } from './dashboard-mock-data';

export function ApprovalQueuesBlock() {
  const maxQueue = Math.max( ...approvalQueues.map( ( q ) => q.count ) );

  return (
    <Card className="ad-card">
      <CardHeader className="ad-queue-header">
        <div>
          <CardTitle className="ad-card-title">Approval Queues</CardTitle>
          <CardDescription className="ad-card-description">Prioritize review queues to avoid blocking marketplace operations</CardDescription>
        </div>
        <Button variant="outline" size="sm">View All Queues</Button>
      </CardHeader>
      <CardContent className="ad-queue-list">
        { approvalQueues.map( ( queue ) => (
          <div key={ queue.label } className="ad-queue-item">
            <div className="ad-queue-top">
              <p className="text-sm font-medium">{ queue.label }</p>
              <Badge variant={ queue.slaHours <= 12 ? 'destructive' : queue.slaHours <= 24 ? 'secondary' : 'outline' }>
                SLA: { queue.slaHours }h
              </Badge>
            </div>
            <Progress
              value={ Math.round( ( queue.count / maxQueue ) * 100 ) }
              className="mb-3"
            />
            <div className="ad-queue-bottom">
              <p className="ad-queue-count">{ queue.count }</p>
              <Button variant="ghost" size="sm">Review Queue</Button>
            </div>
          </div>
        ) ) }
      </CardContent>
    </Card>
  );
}
