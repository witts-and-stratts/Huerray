'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { Badge } from '@/components/dashboard-ui/badge';
import { Button } from '@/components/dashboard-ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { Skeleton } from '@/components/dashboard-ui/skeleton';
import { useMyVideoSubmissions } from '@/lib/api/hooks/video-submissions';
import type { ModelsVideoSubmissionResponse } from '@/lib/api/generated/models';
import { SubmissionCard } from '@/components/campaigns/submission-card';
import { ScrollArea } from '@/components/dashboard-ui/scroll-area';
import { EmptySubmission } from '@/components/admin/empty-states/empty-submissions';

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
        <CardTitle>Recent Submissions</CardTitle>
        <CardDescription>Your latest delivered videos</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        { isLoading ? (
          <div className="flex gap-4 pb-3">
            { Array.from( { length: 4 } ).map( ( _, i ) => (
              <div key={ i } className="w-[340px] shrink-0 rounded-xl overflow-hidden border border-border">
                <Skeleton className="w-full aspect-video" />
                <div className="p-3 flex items-center gap-3">
                  <Skeleton className="size-8 rounded-full shrink-0" />
                  <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                    <Skeleton className="h-3.5 w-2/3 rounded-md" />
                    <Skeleton className="h-3 w-1/3 rounded-md" />
                  </div>
                  <Skeleton className="h-5 w-16 rounded-full shrink-0" />
                </div>
              </div>
            ) ) }
          </div>
        ) : recentSubmissions.length === 0 ? (
          <EmptySubmission />
        ) : (
          <ScrollArea scrollbar={ { orientation: 'horizontal' } } className="w-full pb-3">
            <div className="flex gap-4">
              { recentSubmissions.map( ( submission ) => (
                <div key={ submission.id } className="w-[340px] shrink-0">
                  <SubmissionCard submission={ submission } layout="media-overlay" />
                </div>
              ) ) }
            </div>
          </ScrollArea>
        ) }
      </CardContent>
      <CardFooter className="flex-col justify-end gap-2 text-sm grow">
        <Button
          variant="outline"
          size="sm"
          className="mt-2 w-full font-normal"
          nativeButton={ false }
          render={ <Link href="/creator/my-gigs" /> }
        >
          View all submissions
        </Button>
      </CardFooter>
    </Card>
  );
}
