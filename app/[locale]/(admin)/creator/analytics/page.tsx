'use client';

import {
  DashboardAnalyticsPage,
  type AnalyticsMetric,
  type AnalyticsMetricGroup,
  type AnalyticsPeriod,
} from '@/components/dashboard/analytics/dashboard-analytics-page';
import type { ModelsCreatorAnalyticsResponse } from '@/lib/api/generated/models';
import { useCreatorAnalytics } from '@/lib/api/hooks/analytics';
import { useTranslations } from 'next-intl';

type CreatorAnalytics = ModelsCreatorAnalyticsResponse;

export default function CreatorAnalyticsPage() {
  const t = useTranslations( 'dashboard.creator.analyticsPage' );

  const summaryMetrics: AnalyticsMetric<CreatorAnalytics>[] = [
    { key: 'gigs_completed', label: t( 'items.gigsCompleted' ) },
    { key: 'success_rate', label: t( 'items.successRate' ), kind: 'percent' },
    { key: 'total_earned', label: t( 'items.totalEarned' ), kind: 'currency' },
    { key: 'videos_approved', label: t( 'items.videosApproved' ) },
  ];

  const metricGroups: AnalyticsMetricGroup<CreatorAnalytics>[] = [
    {
      title: t( 'groups.applications' ),
      description: t( 'groupDescriptions.applications' ),
      items: [
        { key: 'applications_sent', label: t( 'items.applicationsSent' ), shortLabel: t( 'shortLabels.sent' ) },
        { key: 'applications_accepted', label: t( 'items.applicationsAccepted' ), shortLabel: t( 'shortLabels.accepted' ) },
        { key: 'approval_rate', label: t( 'items.approvalRate' ), kind: 'percent' },
      ],
    },
    {
      title: t( 'groups.invitations' ),
      description: t( 'groupDescriptions.invitations' ),
      items: [
        { key: 'invitations_received', label: t( 'items.invitationsReceived' ), shortLabel: t( 'shortLabels.received' ) },
        { key: 'invitations_accepted', label: t( 'items.invitationsAccepted' ), shortLabel: t( 'shortLabels.accepted' ) },
      ],
    },
    {
      title: t( 'groups.gigs' ),
      description: t( 'groupDescriptions.gigs' ),
      items: [
        { key: 'gigs_completed', label: t( 'items.gigsCompleted' ), shortLabel: t( 'shortLabels.completed' ) },
        { key: 'total_earned', label: t( 'items.totalEarned' ), kind: 'currency', shortLabel: t( 'shortLabels.earned' ) },
        { key: 'success_rate', label: t( 'items.successRate' ), kind: 'percent' },
      ],
    },
    {
      title: t( 'groups.videoSubmissions' ),
      description: t( 'groupDescriptions.videoSubmissions' ),
      items: [
        { key: 'videos_submitted', label: t( 'items.videosSubmitted' ), shortLabel: t( 'shortLabels.submitted' ) },
        { key: 'videos_approved', label: t( 'items.videosApproved' ), shortLabel: t( 'shortLabels.approved' ) },
      ],
    },
    {
      title: t( 'groups.support' ),
      description: t( 'groupDescriptions.support' ),
      items: [
        { key: 'cases_reported', label: t( 'items.casesReported' ), shortLabel: t( 'shortLabels.reported' ) },
        { key: 'cases_resolved', label: t( 'items.casesResolved' ), shortLabel: t( 'shortLabels.resolved' ) },
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
    <DashboardAnalyticsPage<CreatorAnalytics>
      title={ t( 'title' ) }
      description={ t( 'description' ) }
      periodLabel={ t( 'periodLabel' ) }
      dateRangeLabel={ t( 'dateRangeLabel' ) }
      dateRangePlaceholder={ t( 'dateRangePlaceholder' ) }
      storageKey="creator-analytics"
      refreshLabel={ t( 'refresh' ) }
      errorLabel={ t( 'error' ) }
      periodOptions={ periodOptions }
      summaryMetrics={ summaryMetrics }
      rows={ [
        [ metricGroups[ 0 ], metricGroups[ 1 ] ],
        [ metricGroups[ 2 ], metricGroups[ 3 ] ],
        [ metricGroups[ 4 ] ],
      ] }
      useAnalytics={ useCreatorAnalytics }
    />
  );
}
