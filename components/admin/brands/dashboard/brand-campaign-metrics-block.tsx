import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import type { BrandStatRow } from './brand-dashboard-utils';

interface BrandCampaignMetricsBlockProps {
  rows: BrandStatRow[];
}

export function BrandCampaignMetricsBlock( { rows }: BrandCampaignMetricsBlockProps ) {
  const maxValue = Math.max( ...rows.map( ( row ) => row.numeric ), 1 );

  return (
    <Card className="ad-summary-card flex-1">
      <CardHeader className="pb-2">
        <CardTitle className="ad-card-title">Campaigns</CardTitle>
        <CardDescription className="ad-card-description">Campaign lifecycle overview</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-2 space-y-0">
        { rows.map( ( item ) => {
          const widthPct = Math.max( 10, Math.round( ( item.numeric / maxValue ) * 100 ) );

          return (
            <div key={ item.label } className="rounded-lg border border-border/60 bg-white p-2.5">
              <div className="mb-1.5 flex items-end justify-between gap-3">
                <p className="ad-stat-label">{ item.label }</p>
              </div>
              <p className="mb-1.5 text-2xl leading-none font-primary font-medium">{ item.value }</p>
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
