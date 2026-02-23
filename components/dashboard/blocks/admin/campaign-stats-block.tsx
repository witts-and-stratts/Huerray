import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { campaignKpis } from './dashboard-mock-data';

export function CampaignStatsBlock() {
  const parsed = campaignKpis.map( ( item ) => ( {
    ...item,
    numeric: Number( item.value.replace( /,/g, '' ) ),
  } ) );
  const maxValue = Math.max( ...parsed.map( ( item ) => item.numeric ) );

  return (
    <Card className="ad-summary-card">
      <CardHeader className="pb-2">
        <CardTitle className="ad-card-title">Campaigns</CardTitle>
        <CardDescription className="ad-card-description">Overall campaign lifecycle overview</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        { parsed.map( ( item ) => {
          const widthPct = Math.max( 10, Math.round( ( item.numeric / maxValue ) * 100 ) );

          return (
            <div key={ item.label } className="rounded-lg border border-border/60 bg-white p-2.5">
              <div className="mb-1.5 flex items-end justify-between gap-3">
                <p className="ad-stat-label">{ item.label }</p>
                <span className="ad-delta-positive-compact">{ item.delta }</span>
              </div>
              <p className="mb-1.5 text-2xl leading-none font-primary font-medium">{ item.value }</p>
              <div className="h-2 w-full rounded-full bg-muted">
                <div
                  className="h-2 rounded-full bg-primary transition-all"
                  style={ { width: `${ widthPct }%` } }
                />
              </div>
            </div>
          );
        } ) }
      </CardContent>
    </Card>
  );
}
