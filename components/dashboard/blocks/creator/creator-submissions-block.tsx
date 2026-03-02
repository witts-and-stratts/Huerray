'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { Badge } from '@/components/dashboard-ui/badge';
import { Button } from '@/components/dashboard-ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { Skeleton } from '@/components/dashboard-ui/skeleton';
import { useMyVideoSubmissions } from '@/lib/api/hooks/video-submissions';
import type { ModelsVideoSubmissionResponse } from '@/lib/api/generated/models';

function toDate( value?: string ) {
  if ( !value ) return 'N/A';
  const date = new Date( value );
  if ( Number.isNaN( date.getTime() ) ) return 'N/A';
  return date.toLocaleDateString( 'en-US', { month: 'short', day: 'numeric', year: 'numeric' } );
}

function statusVariant( status?: string ): 'secondary' | 'outline' | 'destructive' {
  const value = ( status || '' ).toLowerCase();
  if ( [ 'accepted', 'approved', 'active', 'running', 'submitted' ].includes( value ) ) return 'secondary';
  if ( [ 'rejected', 'declined', 'cancelled' ].includes( value ) ) return 'destructive';
  return 'outline';
}

export function CreatorSubmissionsBlock() {
  const { data: submissionsResponse, isLoading } = useMyVideoSubmissions();

  const submissions = useMemo<ModelsVideoSubmissionResponse[]>(
    () => ( submissionsResponse?.data || [] ) as ModelsVideoSubmissionResponse[],
    [ submissionsResponse?.data ]
  );

  const recentSubmissions = useMemo( () =>
    [ ...submissions ]
      .sort( ( a, b ) => {
        const aTime = a.created_at ? new Date( a.created_at ).getTime() : 0;
        const bTime = b.created_at ? new Date( b.created_at ).getTime() : 0;
        return bTime - aTime;
      } )
      .slice( 0, 4 ),
    [ submissions ]
  );

  return (
    <Card className="ad-summary-card">
      <CardHeader className="pb-2">
        <CardTitle className="ad-card-title">Recent Submissions</CardTitle>
        <CardDescription className="ad-card-description">Your latest delivered videos</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        { isLoading ? (
          <>
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-14 w-full" />
          </>
        ) : recentSubmissions.length === 0 ? (
          <p className="text-sm text-muted-foreground">No submissions yet.</p>
        ) : (
          recentSubmissions.map( ( submission ) => (
            <div key={ submission.id || `${ submission.title }-${ submission.created_at }` } className="rounded-lg border border-border/60 bg-white p-3">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{ submission.title || submission.video_filename || 'Untitled submission' }</p>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    Submitted { toDate( submission.created_at ) }
                  </p>
                </div>
                <Badge variant={ statusVariant( submission.status ) }>
                  { ( submission.status || 'pending' ).replace( /_/g, ' ' ) }
                </Badge>
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
          render={ <Link href="/creator/my-gigs" /> }
        >
          View all submissions
        </Button>
      </CardFooter>
    </Card>
  );
}
