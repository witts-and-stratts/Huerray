'use client';

import { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { Skeleton } from '@/components/dashboard-ui/skeleton';
import { useCreatorGigs } from '@/lib/api/hooks/creators';
import { ScrollArea } from '@/components/dashboard-ui/scroll-area';
import { GigCard } from '@/components/campaigns/gig-card';
import type { ModelsGigResponse } from '@/lib/api/generated/models';

interface CreatorRecentGigsBlockProps {
  creatorId: string;
}

function GigCardSkeleton() {
  return (
    <div className="rounded-lg border border-border/60 bg-white p-3">
      <div className="space-y-2">
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-4/5" />
      </div>
      <div className="mt-4 flex items-center justify-between">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
    </div>
  );
}

export function CreatorRecentGigsBlock( { creatorId }: CreatorRecentGigsBlockProps ) {
  // Use appropriate API endpoint for getting creator's gigs...
  const { data: gigsResponse, isLoading, isError } = useCreatorGigs( { creator_id: creatorId } as any );

  const recentGigs = useMemo( () => {
    // If the data comes as data.data
    const gigs = gigsResponse?.data || [];

    // Sort and slice logic assuming a typical list of ModelsGigResponse[]
    if ( Array.isArray( gigs ) ) {
      return [ ...gigs ]
        .sort( ( a, b ) => {
          const aTime = a.created_at ? new Date( a.created_at ).getTime() : 0;
          const bTime = b.created_at ? new Date( b.created_at ).getTime() : 0;
          return bTime - aTime;
        } )
        .slice( 0, 6 );
    }

    // Handle paginated response if that's the type returned
    if ( ( gigs as any ).items && Array.isArray( ( gigs as any ).items ) ) {
      return [ ...( ( gigs as any ).items ) ]
        .sort( ( a, b ) => {
          const aTime = a.created_at ? new Date( a.created_at ).getTime() : 0;
          const bTime = b.created_at ? new Date( b.created_at ).getTime() : 0;
          return bTime - aTime;
        } )
        .slice( 0, 6 );
    }

    return [];
  }, [ gigsResponse?.data ] );

  return (
    <Card className="ad-summary-card xl:col-span-2 grow">
      <CardHeader className="pb-2">
        <CardTitle className="ad-card-title">Recent Gigs</CardTitle>
        <CardDescription className="ad-card-description">Latest gigs for this creator</CardDescription>
      </CardHeader>
      <CardContent className="grow">
        { isLoading && (
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            { Array.from( { length: 4 } ).map( ( _, index ) => (
              <GigCardSkeleton key={ `recent-gig-card-skeleton-${ index }` } />
            ) ) }
          </div>
        ) }

        { isError && (
          <p className="py-8 text-center text-xs text-destructive">Unable to load recent gigs.</p>
        ) }

        { !isLoading && !isError && recentGigs.length === 0 && (
          <p className="py-8 text-center text-xs text-muted-foreground">No gigs found.</p>
        ) }

        { !isLoading && !isError && recentGigs.length > 0 && (
          <ScrollArea className="w-full overflow-hidden pb-2" scrollbar={ { orientation: 'horizontal', style: { height: '6px', opacity: 0.5 } } }>
            <div className="flex w-max gap-2 p-0.5">
              { recentGigs.map( ( gig: ModelsGigResponse ) => (
                <div key={ gig.id || ( gig as any ).gig_id || gig.title } className="w-[320px] md:w-[360px] shrink-0">
                  <GigCard
                    gig={ gig as any }
                    onViewGig={ () => { } }
                    onCreateSubmission={ () => { } }
                  />
                </div>
              ) ) }
            </div>
          </ScrollArea>
        ) }
      </CardContent>
    </Card>
  );
}
