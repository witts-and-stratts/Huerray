"use client";

import { useCreatorInvitations } from '@/lib/api/hooks/gigs';
import { SubHeader } from '@/components/subheader';
import { InvitationCard } from './invitation-card';
import { Loader2, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import { GigDetailsSheet } from '@/components/campaigns/gig-details-sheet';
import { ModelsGigInvitationResponse } from '@/lib/api/generated/models';

import { InvitationsSkeleton } from './invitations-skeleton';

export function InvitationsView() {
  const { data, isLoading, error } = useCreatorInvitations();
  const [ selectedGig, setSelectedGig ] = useState<ModelsGigInvitationResponse | null>( null );
  const [ sheetOpen, setSheetOpen ] = useState( false );

  const invitations = ( data?.data || [] ) as ModelsGigInvitationResponse[];

  const handleOpenGig = ( invitation: ModelsGigInvitationResponse ) => {
    setSelectedGig( invitation );
    setSheetOpen( true );
  };

  if ( isLoading ) {
    return <InvitationsSkeleton />;
  }

  if ( error ) {
    return (
      <div className="flex h-[400px] flex-col items-center justify-center gap-2">
        <p className="text-destructive font-medium">Failed to load invitations</p>
        <p className="text-muted-foreground text-sm">{ ( error as Error ).message || 'Something went wrong' }</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 h-full bg-slate-50/50">
      <SubHeader
        title="Invitations"
        description="Manage your gig invitations from brands."
      />

      <div className="flex-1 h-full ad-shell p-0">
        { invitations.length === 0 ? (
          <div className="flex h-[400px] flex-col items-center justify-center gap-4 border-2 border-dashed rounded-xl bg-muted/10">
            <div className="p-4 bg-background rounded-full border shadow-sm">
              <MessageSquare className="size-8 text-muted-foreground" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="font-semibold text-lg">No invitations yet</h3>
              <p className="text-muted-foreground text-sm max-w-[300px]">
                When brands invite you to their gigs, they will appear here.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
            { invitations.map( ( invitation ) => (
              <InvitationCard
                key={ invitation.id }
                invitation={ invitation }
                onViewDetails={ handleOpenGig }
              />
            ) ) }
          </div>
        ) }
      </div>


      <GigDetailsSheet
        gig={ selectedGig?.gig as any }
        open={ sheetOpen }
        onOpenChange={ setSheetOpen }
        invitationId={ selectedGig?.id }
        invitationStatus={ selectedGig?.status }
      />
    </div>
  );
}
