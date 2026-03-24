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
                  <Skeleton className="absolute inset-0 w-full h-full" />
                  {/* Status badge */ }
                  <div className="absolute top-3 left-3">
                    <Skeleton className="h-5 w-16 rounded-full" />
                  </div>
                  {/* Bottom content block */ }
                  <div className="absolute bottom-2 left-2 right-2 rounded-2xl p-3 flex flex-col gap-2">
                    <Skeleton className="h-4 w-3/4 rounded-md" />
                    <Skeleton className="h-3 w-1/2 rounded-md" />
                    <Skeleton className="h-3 w-2/3 rounded-md" />
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
          render={ <Link href="/creator/invitations" /> }
        >
          View all invitations
        </Button>
      </CardFooter>
    </Card>
  );
}
