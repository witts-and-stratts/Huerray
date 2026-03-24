'use client';

import { SubmissionCard } from '@/components/campaigns/submission-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { Skeleton } from '@/components/dashboard-ui/skeleton';
import { useVideoSubmissionsSearch } from '@/lib/api/hooks/video-submissions';
import { useMemo } from 'react';
import { EmptySubmission } from '../../empty-states/empty-submissions';

interface CreatorRecentGigsBlockProps {
  creatorId: string;
}

function SubmissionCardSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-lg bg-muted max-w-[240px]">
      {/* Thumbnail */ }
      <Skeleton className="aspect-video w-full rounded-none" />
      {/* Status badge */ }
      <div className="absolute left-2 top-2">
        <Skeleton className="h-4 w-12 rounded-full" />
      </div>
      {/* Bottom content */ }
      <div className="absolute inset-x-0 bottom-0 flex items-end gap-2 p-2">
        <Skeleton className="size-6 shrink-0 rounded-full" />
        <div className="flex flex-col gap-1 flex-1 min-w-0">
          <Skeleton className="h-2.5 w-3/4" />
          <Skeleton className="h-2 w-1/2" />
        </div>
      </div>
    </div>
  );
}

function SubmissionSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-2">
      { Array.from( { length: 5 } ).map( ( _, i ) => (
        <SubmissionCardSkeleton key={ i } />
      ) ) }
    </div>
  );
}

export function CreatorRecentGigsBlock( { creatorId }: CreatorRecentGigsBlockProps ) {
  const { data: submissionsData, isLoading, isError } = useVideoSubmissionsSearch( { creatorId, limit: 20 } );

  const recentItems = useMemo( () => {
    const items = submissionsData?.data ?? [];
    return [ ...items ]
      .sort( ( a, b ) => {
        const aTime = a.created_at ? new Date( a.created_at ).getTime() : 0;
        const bTime = b.created_at ? new Date( b.created_at ).getTime() : 0;
        return bTime - aTime;
      } )
      .slice( 0, 10 );
  }, [ submissionsData ] );

  return (
    <Card className="ad-summary-card grow">
      <CardHeader className="pb-2">
        <CardTitle className="ad-card-title">Recent Submissions</CardTitle>
        <CardDescription className="ad-card-description">Latest video submissions for this creator</CardDescription>
      </CardHeader>
      <CardContent className="grow">
        { isLoading && <SubmissionSkeleton /> }
        { isError && (
          <p className="py-8 text-center text-xs text-destructive">Unable to load submission activity.</p>
        ) }
        { !isLoading && !isError && recentItems.length === 0 && <EmptySubmission /> }

        { !isLoading && !isError && recentItems.length > 0 && (
          <div className="flex flex-col gap-2">
            { recentItems.map( ( item ) => (
              <SubmissionCard key={ item.id } submission={ item } layout="mini" />
            ) ) }
          </div>
        ) }
      </CardContent>
    </Card>
  );
}
