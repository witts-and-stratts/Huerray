'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { Badge } from '@/components/dashboard-ui/badge';
import { Button } from '@/components/dashboard-ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { Skeleton } from '@/components/dashboard-ui/skeleton';
import { useActiveGigs } from '@/lib/api/hooks/creators';
import type { ModelsGigCreatorResponse } from '@/lib/api/generated/models';
import { toMoney } from '@/lib/utils';

function toDate( value?: string ) {
  if ( !value ) return 'N/A';
  const date = new Date( value );
  if ( Number.isNaN( date.getTime() ) ) return 'N/A';
  return date.toLocaleDateString( 'en-US', { month: 'short', day: 'numeric', year: 'numeric' } );
}

function projectedGigEarning( gig: ModelsGigCreatorResponse ) {
  if ( !gig.compensation?.value ) return 0;
  if ( typeof gig.number_of_videos === 'number' && gig.number_of_videos > 0 ) {
    return ( gig.compensation?.value ?? 0 ) * gig.number_of_videos;
  }
  return gig.compensation?.value ?? 0;
}

function statusVariant( status?: string ): 'secondary' | 'outline' | 'destructive' {
  const value = ( status || '' ).toLowerCase();
  if ( [ 'accepted', 'approved', 'active', 'running', 'submitted' ].includes( value ) ) return 'secondary';
  if ( [ 'rejected', 'declined', 'cancelled' ].includes( value ) ) return 'destructive';
  return 'outline';
}

export function CreatorActiveGigsBlock() {
  const { data: activeResponse, isLoading } = useActiveGigs();

  const activeGigs = useMemo<ModelsGigCreatorResponse[]>(
    () => ( activeResponse?.data?.gigs || [] ) as ModelsGigCreatorResponse[],
    [ activeResponse?.data?.gigs ]
  );

  const recentActiveGigs = activeGigs.slice( 0, 4 );

  return (
    <Card className="ad-summary-card">
      <CardHeader className="pb-2">
        <CardTitle className="ad-card-title">Active Gigs</CardTitle>
        <CardDescription className="ad-card-description">Current commitments and next deadlines</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        { isLoading ? (
          <>
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </>
        ) : recentActiveGigs.length === 0 ? (
          <p className="text-sm text-muted-foreground">No active gigs yet.</p>
        ) : (
          recentActiveGigs.map( ( gig ) => (
            <div key={ gig.id || `${ gig.title }-${ gig.created_at }` } className="rounded-lg border border-border/60 bg-white p-3">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{ gig.title || 'Untitled gig' }</p>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    { gig.brand?.company_name || gig.campaign_name || 'Unknown brand' }
                  </p>
                </div>
                <Badge variant={ statusVariant( gig.gig_status ) }>
                  { ( gig.gig_status || 'pending' ).replace( /_/g, ' ' ) }
                </Badge>
              </div>
              <div className="mt-2 flex items-center justify-between gap-2 text-xs text-muted-foreground">
                <span>{ toMoney( projectedGigEarning( gig ) ) }</span>
                <span>Ends { toDate( gig.posting_end_date ) }</span>
              </div>
            </div>
          ) )
        ) }
      </CardContent>
      <CardFooter className="flex-col justify-end gap-2 text-sm grow">
        <Button
          variant="outline"
          size="sm"
          className="mt-2 w-full font-normal"
          nativeButton={false}
          render={ <Link href="/creator/my-gigs" /> }
        >
          View all my gigs
        </Button>
      </CardFooter>
    </Card>
  );
}
