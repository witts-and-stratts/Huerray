'use client';

import {
  DashboardAnalyticsPage,
  type AnalyticsMetric,
  type AnalyticsMetricGroup,
  type AnalyticsPeriod,
  type PeriodEndpoint,
} from '@/components/dashboard/analytics/dashboard-analytics-page';
import type { ModelsPlatformAnalyticsResponse } from '@/lib/api/generated/models';
import { usePlatformAnalytics, usePlatformAnalyticsByPeriod } from '@/lib/api/hooks/analytics';
import { useTranslations } from 'next-intl';

type PlatformAnalytics = ModelsPlatformAnalyticsResponse;

export default function AdminPlatformAnalyticsPage() {
  const t = useTranslations( 'dashboard.admin.analyticsPage' );

  const summaryMetrics: AnalyticsMetric<PlatformAnalytics>[] = [
    { key: 'total_users', label: t( 'items.totalUsers' ) },
    { key: 'total_revenue', label: t( 'items.totalRevenue' ), kind: 'currency' },
    { key: 'completed_campaigns', label: t( 'items.completedCampaigns' ) },
    { key: 'approved_video_submissions', label: t( 'items.approvedVideoSubmissions' ) },
  ];

  const metricGroups: AnalyticsMetricGroup<PlatformAnalytics>[] = [
    {
      title: t( 'groups.users' ),
      description: t( 'groupDescriptions.users' ),
      items: [
        { key: 'total_users', label: t( 'items.totalUsers' ), shortLabel: t( 'shortLabels.users' ) },
        { key: 'total_brands', label: t( 'items.totalBrands' ), shortLabel: t( 'shortLabels.brands' ) },
        { key: 'total_creators', label: t( 'items.totalCreators' ), shortLabel: t( 'shortLabels.creators' ) },
        { key: 'new_users_today', label: t( 'items.newUsersToday' ), shortLabel: t( 'shortLabels.new' ) },
      ],
    },
    {
      title: t( 'groups.contentPipeline' ),
      description: t( 'groupDescriptions.contentPipeline' ),
      items: [
        { key: 'total_campaigns', label: t( 'items.totalCampaigns' ), shortLabel: t( 'shortLabels.campaigns' ) },
        { key: 'completed_campaigns', label: t( 'items.completedCampaigns' ), shortLabel: t( 'shortLabels.completed' ) },
        { key: 'total_gigs', label: t( 'items.totalGigs' ), shortLabel: t( 'shortLabels.gigs' ) },
        { key: 'completed_gigs', label: t( 'items.completedGigs' ), shortLabel: t( 'shortLabels.done' ) },
      ],
    },
    {
      title: t( 'groups.videoSubmissions' ),
      description: t( 'groupDescriptions.videoSubmissions' ),
      items: [
        { key: 'total_video_submissions', label: t( 'items.totalVideoSubmissions' ), shortLabel: t( 'shortLabels.total' ) },
        { key: 'approved_video_submissions', label: t( 'items.approvedVideoSubmissions' ), shortLabel: t( 'shortLabels.approved' ) },
      ],
    },
    {
      title: t( 'groups.revenue' ),
      description: t( 'groupDescriptions.revenue' ),
      items: [
        { key: 'total_revenue', label: t( 'items.totalRevenue' ), kind: 'currency', shortLabel: t( 'shortLabels.total' ) },
        { key: 'net_revenue', label: t( 'items.netRevenue' ), kind: 'currency', shortLabel: t( 'shortLabels.net' ) },
        { key: 'total_payouts', label: t( 'items.totalPayouts' ), kind: 'currency', shortLabel: t( 'shortLabels.payouts' ) },
      ],
    },
    {
      title: t( 'groups.support' ),
      description: t( 'groupDescriptions.support' ),
      items: [
        { key: 'total_cases', label: t( 'items.totalCases' ), shortLabel: t( 'shortLabels.cases' ) },
        { key: 'resolved_cases', label: t( 'items.resolvedCases' ), shortLabel: t( 'shortLabels.resolved' ) },
        { key: 'case_resolution_rate', label: t( 'items.caseResolutionRate' ), kind: 'percent' },
      ],
    },
  ];

  const periodOptions: Array<{ value: AnalyticsPeriod; label: string; }> = [
    { value: 'all_time', label: t( 'periods.allTime' ) },
    { value: 'last_week', label: t( 'periods.lastWeek' ) },
    { value: 'last_month', label: t( 'periods.lastMonth' ) },
    { value: 'last_three_months', label: t( 'periods.lastThreeMonths' ) },
    { value: 'last_year', label: t( 'periods.lastYear' ) },
  ];

  return (
    <DashboardAnalyticsPage<PlatformAnalytics>
      title={ t( 'title' ) }
      description={ t( 'description' ) }
      periodLabel={ t( 'periodLabel' ) }
      refreshLabel={ t( 'refresh' ) }
      errorLabel={ t( 'error' ) }
      periodOptions={ periodOptions }
      summaryMetrics={ summaryMetrics }
      rows={ [
        [ metricGroups[ 0 ], metricGroups[ 1 ] ],
        [ metricGroups[ 3 ], metricGroups[ 2 ] ],
        [ metricGroups[ 4 ] ],
      ] }
      useAllAnalytics={ usePlatformAnalytics }
      usePeriodAnalytics={ ( period: PeriodEndpoint, options ) => usePlatformAnalyticsByPeriod( period, options ) }
    />
  );
}
