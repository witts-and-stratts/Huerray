import { UsersStatusRadialCard } from './users-status-radial-card';
import { CampaignStatsBlock } from './campaign-stats-block';
import { CreatorsStatsBlock } from './creators-stats-block';
import { GigsStatsBlock } from './gigs-stats-block';
import { SubmissionsStatsBlock } from './submissions-stats-block';
import { UnreadNotificationsBlock } from './unread-notifications-block';
import { PlatformUptimeBlock } from './platform-uptime-block';

export function KpiOverviewBlock() {
  return (
    <div className="ad-kpi-grid">
      <UsersStatusRadialCard />
      <CampaignStatsBlock />
      <CreatorsStatsBlock />
      <GigsStatsBlock />
      <SubmissionsStatsBlock />
      <UnreadNotificationsBlock />
      <PlatformUptimeBlock />
    </div>
  );
}
