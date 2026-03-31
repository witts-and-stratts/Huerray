'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { Badge } from '@/components/dashboard-ui/badge';
import { Button } from '@/components/dashboard-ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { Skeleton } from '@/components/dashboard-ui/skeleton';
import { useCreatorInvitations } from '@/lib/api/hooks/gigs';
import type { ModelsGigInvitationResponse } from '@/lib/api/generated/models';
import { InvitationCard } from '@/components/creator/invitation-card';
import { ScrollArea } from '@/components/dashboard-ui/scroll-area';

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

export function CreatorInvitationsBlock() {
  const { data: invitationsResponse, isLoading } = useCreatorInvitations();

  const invitations = useMemo<ModelsGigInvitationResponse[]>(
    () => ( invitationsResponse?.data || [] ) as ModelsGigInvitationResponse[],
    [ invitationsResponse?.data ]
  );

  const recentInvitations = invitations.slice( 0, 4 );

  return (
    <Card className="ad-summary-card">
      <CardHeader className="pb-2">
        <CardTitle>Invitations</CardTitle>
        <CardDescription>Latest invitations from brands</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        { isLoading ? (
          <div className="flex gap-3 pb-3">
            { Array.from( { length: 4 } ).map( ( _, i ) => (
              <div key={ i } className="w-[200px] shrink-0">
                <div className="relative rounded-2xl overflow-hidden aspect-[3/4]">
                  {/* Background image */ }
                  <Skeleton className="absolute inset-0 w-full h-full" />
                  {/* Top row: status badge + action menu */ }
                  <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
                    <Skeleton className="h-5 w-16 rounded-full" />
                    <Skeleton className="h-5 w-5 rounded-md" />
                  </div>
                  {/* Bottom frosted block */ }
                  <div className="absolute bottom-0 left-0 right-0 m-2 rounded-2xl px-3 py-2 flex flex-col gap-1.5 bg-black/20">
                    {/* Title */ }
                    <Skeleton className="h-4 w-4/5 rounded-md" />
                    <Skeleton className="h-4 w-3/5 rounded-md" />
                    {/* Meta row (video count + duration) */ }
                    <div className="flex items-center gap-2 mt-0.5">
                      <Skeleton className="h-3 w-10 rounded-sm" />
                      <Skeleton className="h-3 w-8 rounded-sm" />
                    </div>
                    {/* Compensation */ }
                    <div className="flex flex-col gap-1 mt-1">
                      <Skeleton className="h-2 w-12 rounded-sm" />
                      <Skeleton className="h-4 w-20 rounded-md" />
                    </div>
                    {/* Brand row */ }
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <Skeleton className="size-4 rounded-full shrink-0" />
                      <Skeleton className="h-3 w-24 rounded-sm" />
                    </div>
                    {/* CTA buttons */ }
                    <div className="flex gap-2 mt-1">
                      <Skeleton className="h-7 flex-1 rounded-md" />
                      <Skeleton className="h-7 flex-1 rounded-md" />
                    </div>
                  </div>
                </div>
              </div>
            ) ) }
          </div>
        ) : recentInvitations.length === 0 ? (
          <p className="text-sm text-muted-foreground">No invitations yet.</p>
        ) : (
          <ScrollArea scrollbar={ {
            orientation: 'horizontal', style: {
              height: '6px'
            }
          } } className="w-full pb-3">
            <div className="flex gap-3">
              { recentInvitations.map( ( invitation ) => (
                <div key={ invitation.id } className="w-[200px] shrink-0">
                  <InvitationCard invitation={ invitation } onViewDetails={ () => { } } />
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
          render={ <Link href="/creator/invitations" /> }
        >
          View all invitations
        </Button>
      </CardFooter>
    </Card>
  );
}
