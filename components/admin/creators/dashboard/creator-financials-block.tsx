import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import type { CreatorStatRow } from './creator-dashboard-utils';

interface CreatorFinancialsBlockProps {
  rows: CreatorStatRow[];
}

export function CreatorFinancialsBlock( { rows }: CreatorFinancialsBlockProps ) {
  return (
    <Card className="ad-summary-card flex-1">
      <CardHeader className="pb-2">
        <CardTitle className="ad-card-title">Financials</CardTitle>
        <CardDescription className="ad-card-description">Earnings performance for this creator</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        { rows.map( ( item ) => (
          <div key={ item.label } className="rounded-lg border border-border/60 bg-white p-2.5">
            <p className="ad-stat-label mb-1.5">{ item.label }</p>
            <p className="text-2xl leading-none font-primary font-medium">{ item.value }</p>
          </div>
        ) ) }
      </CardContent>
    </Card>
  );
}
