import {
  ActionCenterBlock,
  ApprovalQueuesBlock,
  KpiOverviewBlock,
  PipelineBreakdownBlock,
  PlatformAnalyticsBlock,
  PlatformHealthAreaBlock,
  RecentActivityBlock,
  RevenueStatsBlock,
} from '@/components/dashboard/blocks/admin';
import { AdminDateRangePicker } from '@/components/dashboard/admin-date-range-picker';
import { SubHeader } from '@/components/subheader';
import '@/app/styles/components/dashboard-stats.css';
import { useTranslations } from 'next-intl';

export function AdminDashboard() {
  const t = useTranslations( 'dashboard.admin' );
  return (
    <>
      <SubHeader
        title={ t( 'overview' ) }
        description={ t( 'description' ) }
      >
        {/* <AdminDateRangePicker /> */ }
      </SubHeader>

      <div className="ad-shell py-4 bg-burgundy-50/50 mt-0">
        <KpiOverviewBlock />

        <PlatformAnalyticsBlock />

        <section className="ad-grid-main">
          <div className="ad-main-span">
            <PlatformHealthAreaBlock />
          </div>
          <ApprovalQueuesBlock />
        </section>

        <section className="ad-grid-two">
          <PipelineBreakdownBlock />
          <RevenueStatsBlock />
        </section>

        <section className="ad-grid-two">
          <ActionCenterBlock />
          <RecentActivityBlock />
        </section>
      </div>
    </>
  );
}
