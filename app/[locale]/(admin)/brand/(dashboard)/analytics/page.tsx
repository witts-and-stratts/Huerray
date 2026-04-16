'use client';

import {
  DashboardAnalyticsPage,
  type AnalyticsMetric,
  type AnalyticsMetricGroup,
  type AnalyticsPeriod,
} from '@/components/dashboard/analytics/dashboard-analytics-page';
import type { ModelsBrandAnalyticsResponse } from '@/lib/api/generated/models';
import { useBrandAnalytics } from '@/lib/api/hooks/analytics';
import { useTranslations } from 'next-intl';

type BrandAnalytics = ModelsBrandAnalyticsResponse;

export default function BrandAnalyticsPage() {
  const t = useTranslations( 'dashboard.brand.landing.analytics' );

  const summaryMetrics: AnalyticsMetric<BrandAnalytics>[] = [
    { key: 'campaigns_created', label: t( 'items.campaignsCreated' ) },
    { key: 'completion_rate', label: t( 'items.completionRate' ), kind: 'percent' },
    { key: 'total_spent', label: t( 'items.totalSpent' ), kind: 'currency' },
    { key: 'videos_approved', label: t( 'items.videosApproved' ) },
  ];

  const metricGroups: AnalyticsMetricGroup<BrandAnalytics>[] = [
    {
      title: t( 'groups.campaigns' ),
      description: t( 'page.groupDescriptions.campaigns' ),
      items: [
        { key: 'campaigns_created', label: t( 'items.campaignsCreated' ) },
        { key: 'campaigns_completed', label: t( 'items.campaignsCompleted' ) },
        { key: 'completion_rate', label: t( 'items.completionRate' ), kind: 'percent' },
      ],
    },
    {
      title: t( 'groups.gigs' ),
      description: t( 'page.groupDescriptions.gigs' ),
      items: [
        { key: 'gigs_created', label: t( 'items.gigsCreated' ) },
        { key: 'gigs_accepted', label: t( 'items.gigsAccepted' ) },
        { key: 'gigs_completed', label: t( 'items.gigsCompleted' ) },
      ],
    },
    {
      title: t( 'groups.outreach' ),
      description: t( 'page.groupDescriptions.outreach' ),
      items: [
        { key: 'invitations_sent', label: t( 'items.invitationsSent' ) },
        { key: 'applications_received', label: t( 'items.applicationsReceived' ) },
        { key: 'approval_rate', label: t( 'items.approvalRate' ), kind: 'percent' },
      ],
    },
    {
      title: t( 'groups.contentSpend' ),
      description: t( 'page.groupDescriptions.contentSpend' ),
      items: [
        { key: 'videos_received', label: t( 'items.videosReceived' ) },
        { key: 'videos_approved', label: t( 'items.videosApproved' ) },
      ],
    },
    {
      title: t( 'page.groups.support' ),
      description: t( 'page.groupDescriptions.support' ),
      items: [
        { key: 'cases_reported', label: t( 'page.items.casesReported' ) },
        { key: 'cases_resolved', label: t( 'page.items.casesResolved' ) },
        { key: 'case_resolution_rate', label: t( 'page.items.caseResolutionRate' ), kind: 'percent' },
      ],
    },
  ];

  const periodOptions: Array<{ value: AnalyticsPeriod; label: string; }> = [
    { value: 'all_time', label: t( 'page.periods.allTime' ) },
    { value: 'last_week', label: t( 'page.periods.lastWeek' ) },
    { value: 'last_month', label: t( 'page.periods.lastMonth' ) },
    { value: 'last_three_months', label: t( 'page.periods.lastThreeMonths' ) },
    { value: 'last_year', label: t( 'page.periods.lastYear' ) },
  ];

  return (
    <DashboardAnalyticsPage<BrandAnalytics>
      title={ t( 'page.title' ) }
      description={ t( 'page.description' ) }
      periodLabel={ t( 'page.periodLabel' ) }
      dateRangeLabel={ t( 'page.dateRangeLabel' ) }
      dateRangePlaceholder={ t( 'page.dateRangePlaceholder' ) }
      storageKey="brand-analytics"
      refreshLabel={ t( 'page.refresh' ) }
      errorLabel={ t( 'error' ) }
      periodOptions={ periodOptions }
      summaryMetrics={ summaryMetrics }
      rows={ [
        [ metricGroups[ 0 ], metricGroups[ 2 ] ],
        [ metricGroups[ 1 ], metricGroups[ 3 ] ],
        [ metricGroups[ 4 ] ],
      ] }
      useAnalytics={ useBrandAnalytics }
    />
  );
}
