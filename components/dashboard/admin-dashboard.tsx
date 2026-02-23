import {
  ActionCenterBlock,
  ApprovalQueuesBlock,
  FinancialSnapshotBlock,
  KpiOverviewBlock,
  OperationalAlertsBlock,
  PipelineBreakdownBlock,
  PlatformHealthAreaBlock,
  RecentActivityBlock,
} from '@/components/dashboard/blocks/admin';
import { AdminDateRangePicker } from '@/components/dashboard/admin-date-range-picker';
import { SubHeader } from '@/components/subheader';

export function AdminDashboard() {
  return (
    <>
      <SubHeader
        title='Dashboard'
        description='Platform overview and operational monitoring'
      >
        <AdminDateRangePicker />
      </SubHeader>

      <div className="ad-shell py-4 bg-burgundy-50/50 mt-0">
        <KpiOverviewBlock />

        <section className="ad-grid-main">
          <div className="ad-main-span">
            <PlatformHealthAreaBlock />
          </div>
          <ApprovalQueuesBlock />
        </section>

        <section className="ad-grid-two">
          <PipelineBreakdownBlock />
          <FinancialSnapshotBlock />
        </section>

        <section className="ad-grid-two">
          <ActionCenterBlock />
          <OperationalAlertsBlock />
        </section>

        <RecentActivityBlock />
      </div>
    </>
  );
}
