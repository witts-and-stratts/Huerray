import { UsersStatusRadialCard } from './users-status-radial-card';
import { CampaignStatsBlock } from './campaign-stats-block';
import { CreatorsStatsBlock } from './creators-stats-block';
import { GigsStatsBlock } from './gigs-stats-block';
import { SubmissionsStatsBlock } from './submissions-stats-block';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { adminKpis } from './dashboard-mock-data';

export function KpiOverviewBlock() {
  return (
    <div className="ad-kpi-grid">
      <UsersStatusRadialCard />
      <CampaignStatsBlock />
      <CreatorsStatsBlock />
      <GigsStatsBlock />
      <SubmissionsStatsBlock />
      { adminKpis.map( ( item ) => (
        <Card key={ item.label } className="ad-kpi-card">
          <CardHeader className="pb-2">
            <CardTitle className="ad-stat-label">{ item.label }</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="ad-stat-value">{ item.value }</p>
            <p
              className={
                item.tone === 'positive'
                  ? 'ad-delta-positive'
                  : item.tone === 'negative'
                    ? 'ad-delta-negative'
                    : 'ad-delta-neutral'
              }
            >
              { item.delta }
            </p>
          </CardContent>
        </Card>
      ) ) }
    </div>
  );
}
