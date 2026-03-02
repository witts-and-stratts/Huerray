'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { Badge } from '@/components/dashboard-ui/badge';
import { Button } from '@/components/dashboard-ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { Skeleton } from '@/components/dashboard-ui/skeleton';
import { useCreatorInvitations } from '@/lib/api/hooks/gigs';
import type { ModelsGigInvitationResponse } from '@/lib/api/generated/models';

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
        <CardTitle className="ad-card-title">Invitations</CardTitle>
        <CardDescription className="ad-card-description">Latest invitations from brands</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        { isLoading ? (
          <>
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-14 w-full" />
          </>
        ) : recentInvitations.length === 0 ? (
          <p className="text-sm text-muted-foreground">No invitations yet.</p>
        ) : (
          recentInvitations.map( ( invitation ) => (
            <div key={ invitation.id || `${ invitation.gig_id }-${ invitation.invited_at }` } className="rounded-lg border border-border/60 bg-white p-3">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{ invitation.gig?.title || 'Untitled gig' }</p>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    Invited { toDate( invitation.invited_at ) }
                  </p>
                </div>
                <Badge variant={ statusVariant( invitation.status ) }>
                  { ( invitation.status || 'pending' ).replace( /_/g, ' ' ) }
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
          render={ <Link href="/creator/invitations" /> }
        >
          View all invitations
        </Button>
      </CardFooter>
    </Card>
  );
}
