import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import type { CreatorStatRow } from './creator-dashboard-utils';
import { useTranslations } from 'next-intl';

interface CreatorFinancialsBlockProps {
  rows: CreatorStatRow[];
}

export function CreatorFinancialsBlock( { rows }: CreatorFinancialsBlockProps ) {
  const t = useTranslations( 'dashboard.admin' );
  return (
    <Card className="ad-summary-card flex-1">
      <CardHeader className="pb-2">
        <CardTitle className="ad-card-title">{ t( 'creatorDashboard.blocks.financials' ) }</CardTitle>
        <CardDescription className="ad-card-description">{ t( 'creatorDashboard.description' ) }</CardDescription>
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
