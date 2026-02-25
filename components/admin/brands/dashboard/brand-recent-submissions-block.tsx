'use client';

import { useQuery } from '@tanstack/react-query';
import { SubmissionCard } from '@/components/campaigns/submission-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { ScrollArea } from '@/components/dashboard-ui/scroll-area';
import { Skeleton } from '@/components/dashboard-ui/skeleton';
import { VideoSubmissionsApi } from '@/lib/api/generated/api';
import { apiClient, apiConfiguration } from '@/lib/api/client';
import type { ModelsVideoSubmissionResponse } from '@/lib/api/generated/models';

interface BrandRecentSubmissionsBlockProps {
  brandId: string;
  recentCampaignIds: string[];
}

function RecentSubmissionItemSkeleton() {
  return (
    <div className="rounded-lg border border-border/60 bg-white p-2.5">
      <div className="space-y-1.5">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-3 w-1/3" />
      </div>
      <div className="mt-2">
        <Skeleton className="h-5 w-20 rounded-full" />
      </div>
    </div>
  );
}

export function BrandRecentSubmissionsBlock( { brandId, recentCampaignIds }: BrandRecentSubmissionsBlockProps ) {
  const { data: recentSubmissions = [], isLoading, isError } = useQuery( {
    queryKey: [ 'brand-recent-submissions', brandId, recentCampaignIds ],
    enabled: recentCampaignIds.length > 0,
    queryFn: async () => {
      const videoSubmissionsApi = new VideoSubmissionsApi( apiConfiguration, undefined, apiClient );
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
        .slice( 0, 8 );
    },
  } );

  return (
    <Card className="ad-summary-card xl:col-span-2 grow">
      <CardHeader className="pb-2">
        <CardTitle className="ad-card-title">Recent Submissions</CardTitle>
        <CardDescription className="ad-card-description">Latest video submissions across this brand&apos;s campaigns</CardDescription>
      </CardHeader>
      <CardContent className="grow">
        { isLoading && (
          <div className="space-y-2">
            { Array.from( { length: 4 } ).map( ( _, index ) => (
              <RecentSubmissionItemSkeleton key={ `recent-submission-skeleton-${ index }` } />
            ) ) }
          </div>
        ) }

        { isError && (
          <p className="py-8 text-center text-xs text-destructive">Unable to load recent submissions.</p>
        ) }

        { !isLoading && !isError && recentSubmissions.length === 0 && (
          <p className="py-8 text-center text-xs text-muted-foreground">No submissions yet.</p>
        ) }

        { !isLoading && !isError && recentSubmissions.length > 0 && (
          <ScrollArea className="w-full overflow-hidden pb-2" scrollbar={ { orientation: 'horizontal', style: { height: '6px', opacity: 0.5 } } }>
            <div className="flex w-max gap-2 p-0.5">
              { recentSubmissions.map( ( submission ) => (
                <div
                  key={ submission.id || `${ submission.title }-${ submission.created_at }` }
                  className="w-[320px] md:w-[360px] shrink-0"
                >
                  <SubmissionCard submission={ submission } layout="media-overlay" />
                </div>
              ) ) }
            </div>
          </ScrollArea>
        ) }
      </CardContent>
    </Card>
  );
}
