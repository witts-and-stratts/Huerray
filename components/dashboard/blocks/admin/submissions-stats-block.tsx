'use client';

import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { Skeleton } from '@/components/dashboard-ui/skeleton';
import { Tabs, TabsList, TabsTab, TabsPanel, TabsPanels } from '@/components/animate-ui/components/base/tabs';
import { usePlatformAnalytics } from '@/lib/api/hooks/analytics';
import { useCampaigns } from '@/lib/api/hooks/campaigns';
import type { ModelsVideoSubmissionResponse } from '@/lib/api/generated/models';
import { VideoSubmissionsApi } from '@/lib/api/generated/api';
import { apiClient, apiConfiguration } from '@/lib/api/client';
import { SubmissionsStatsPanel } from './submissions-stats-panel';
import { SubmissionsRecentPanel, type RecentSubmissionItem } from './submissions-recent-panel';

const videoSubmissionsApi = new VideoSubmissionsApi( apiConfiguration, undefined, apiClient );

function SubmissionsStatsSkeleton() {
  return (
    <div className="space-y-2">
      { Array.from( { length: 3 } ).map( ( _, index ) => (
        <div key={ `stats-skeleton-${ index }` } className="rounded-lg border border-border/60 bg-white p-2.5">
          <div className="mb-2 flex items-center justify-between gap-3">
            <Skeleton className="h-3 w-28" />
            <Skeleton className="h-4 w-10 rounded-full" />
          </div>
          <Skeleton className="mb-2 h-8 w-24" />
          <Skeleton className="h-2 w-full rounded-full" />
        </div>
      ) ) }
    </div>
  );
}

function SubmissionsRecentSkeleton() {
  return (
    <div className="space-y-2">
      { Array.from( { length: 3 } ).map( ( _, index ) => (
        <div key={ `recent-skeleton-${ index }` } className="rounded-lg border border-border/60 bg-white p-2.5">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
            <div className="md:col-span-5">
              <Skeleton className="aspect-video w-full rounded-sm" />
              <div className="mt-2 flex items-center gap-2">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
            <div className="md:col-span-7 space-y-2">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-3 w-1/2" />
              <Skeleton className="h-3 w-1/2" />
              <Skeleton className="h-3 w-1/3" />
              <Skeleton className="h-5 w-20 rounded-full" />
            </div>
          </div>
        </div>
      ) ) }
    </div>
  );
}

export function SubmissionsStatsBlock() {
  const [ activeTab, setActiveTab ] = useState<'stats' | 'recent'>( 'stats' );
  const { data: analyticsResponse, isLoading: isAnalyticsLoading, isError: isAnalyticsError } = usePlatformAnalytics();
  const { data: campaignsResponse, isLoading: isCampaignsLoading, isError: isCampaignsError } = useCampaigns( { limit: 20, page: 1 } );

  const recentCampaignIds = useMemo( () => {
    const campaigns = campaignsResponse?.data || [];
    return [ ...campaigns ]
      .sort( ( a, b ) => {
        const aTime = a.created_at ? new Date( a.created_at ).getTime() : 0;
        const bTime = b.created_at ? new Date( b.created_at ).getTime() : 0;
        return bTime - aTime;
      } )
      .map( ( campaign ) => campaign.id || campaign.campaign_id )
      .filter( Boolean )
      .slice( 0, 8 ) as string[];
  }, [ campaignsResponse ] );

  const {
    data: recentSubmissionsByCampaign = [],
    isLoading: isRecentSubmissionsLoading,
    isError: isRecentSubmissionsError,
  } = useQuery( {
    queryKey: [ 'dashboard-recent-campaign-videos', recentCampaignIds ],
    enabled: recentCampaignIds.length > 0,
    queryFn: async () => {
      const responses = await Promise.all(
        recentCampaignIds.map( async ( campaignId ) => {
          try {
            const response = await videoSubmissionsApi.videosCampaignCampaignIdGet( { campaignId } );
            return response.data?.data || [];
          } catch {
            return [];
          }
        } )
      );

      const merged = responses.flat() as ModelsVideoSubmissionResponse[];
      const byId = new Map<string, ModelsVideoSubmissionResponse>();
      for ( const submission of merged ) {
        if ( submission.id ) byId.set( submission.id, submission );
      }

      return [ ...byId.values() ]
        .sort( ( a, b ) => {
          const aTime = a.created_at ? new Date( a.created_at ).getTime() : 0;
          const bTime = b.created_at ? new Date( b.created_at ).getTime() : 0;
          return bTime - aTime;
        } )
        .slice( 0, 12 );
    },
  } );

  const parsed = useMemo( () => {
    const analytics = analyticsResponse?.data;
    const total = analytics?.total_video_submissions ?? 0;
    const approved = analytics?.approved_video_submissions ?? 0;
    const pending = total - approved;

    return [
      { label: 'Total Submissions', value: `${ total }`, delta: '+0.0%', numeric: total },
      { label: 'Pending Submissions', value: `${ pending }`, delta: pending > 0 ? '-0.0%' : '+0.0%', numeric: pending },
      { label: 'Approved Submissions', value: `${ approved }`, delta: '+0.0%', numeric: approved },
    ];
  }, [ analyticsResponse ] );

  const recentItems = useMemo<RecentSubmissionItem[]>( () => {
    return recentSubmissionsByCampaign.map( ( item ) => ( { raw: item } ) );
  }, [ recentSubmissionsByCampaign ] );

  return (
    <Card className="ad-summary-card justify-start">
      <CardHeader className="pb-2">
        <CardTitle className="ad-card-title">Submissions</CardTitle>
        <CardDescription className="ad-card-description">Submission review status and throughput snapshot</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={ activeTab } onValueChange={ ( value ) => setActiveTab( value as 'stats' | 'recent' ) }>
          <TabsList variant="default" className="mb-2 w-full">
            <TabsTab value="stats" className={ 'text-xs font-normal' }>Stats</TabsTab>
            <TabsTab value="recent" className={ 'text-xs font-normal' }>Recent Submissions</TabsTab>
          </TabsList>

          <TabsPanels>
            <TabsPanel value="stats" keepMounted>
              { isAnalyticsLoading && <SubmissionsStatsSkeleton /> }
              { isAnalyticsError && <p className="py-8 text-center text-xs text-destructive">Unable to load submissions.</p> }
              { !isAnalyticsLoading && !isAnalyticsError && <SubmissionsStatsPanel items={ parsed } /> }
            </TabsPanel>

            <TabsPanel value="recent" keepMounted>
              { ( isCampaignsLoading || isRecentSubmissionsLoading ) && <SubmissionsRecentSkeleton /> }
              { ( isCampaignsError || isRecentSubmissionsError ) && <p className="py-8 text-center text-xs text-destructive">Unable to load recent submissions.</p> }
              { !isCampaignsLoading && !isRecentSubmissionsLoading && !isCampaignsError && !isRecentSubmissionsError && recentItems.length === 0 && (
                <p className="py-8 text-center text-xs text-muted-foreground">No submissions found.</p>
              ) }
              { !isCampaignsLoading && !isRecentSubmissionsLoading && !isCampaignsError && !isRecentSubmissionsError && recentItems.length > 0 && (
                <SubmissionsRecentPanel items={ recentItems } />
              ) }
            </TabsPanel>
          </TabsPanels>
        </Tabs>
      </CardContent>
    </Card>
  );
}
