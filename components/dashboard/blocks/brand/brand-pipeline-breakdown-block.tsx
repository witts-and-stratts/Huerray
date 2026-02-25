import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import type { BrandDashboardSummary } from './types';

interface BrandPipelineBreakdownBlockProps {
  summary: BrandDashboardSummary;
}

export function BrandPipelineBreakdownBlock( { summary }: BrandPipelineBreakdownBlockProps ) {
  const campaignBars = [
    { label: 'Pending Approval', value: summary.pending },
    { label: 'Approved', value: summary.approved },
    { label: 'Running', value: summary.running },
    { label: 'Returned', value: summary.returned },
  ];
  const maxCampaignBar = Math.max( ...campaignBars.map( ( item ) => item.value ), 1 );

  return (
    <Card className="ad-card">
      <CardHeader className="pb-2">
        <CardTitle className="ad-card-title">Campaign Pipeline</CardTitle>
        <CardDescription className="ad-card-description">How your campaigns are distributed by status</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        { campaignBars.map( ( item ) => {
          const widthPct = Math.max( 10, Math.round( ( item.value / maxCampaignBar ) * 100 ) );
          return (
            <div key={ item.label } className="rounded-lg border border-border/60 bg-white p-3">
              <div className="mb-2 flex items-center justify-between gap-2">
                <p className="ad-stat-label">{ item.label }</p>
                <p className="text-sm font-medium">{ item.value }</p>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-2 rounded-full bg-primary transition-all" style={ { width: `${ widthPct }%` } } />
              </div>
            </div>
          );
        } ) }
      </CardContent>
    </Card>
  );
}
