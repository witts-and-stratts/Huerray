"use client";

import { useCreatorInvitations } from '@/lib/api/hooks/gigs';
import { SubHeader } from '@/components/subheader';
import { InvitationCard } from './invitation-card';
import { Loader2, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import { GigDetailsSheet } from '@/components/campaigns/gig-details-sheet';
import { ModelsGigInvitationResponse } from '@/lib/api/generated/models';
import { useTranslations } from 'next-intl';

import { InvitationsSkeleton } from './invitations-skeleton';

export function InvitationsView() {
  const t = useTranslations( 'dashboard.creator.invitations' );
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
        <p className="text-destructive font-medium">{ t( 'loadFailed' ) }</p>
        <p className="text-muted-foreground text-sm">{ ( error as Error ).message || t( 'somethingWentWrong' ) }</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 h-full bg-slate-50/50">
      <SubHeader
        title={ t( 'title' ) }
        description={ t( 'description' ) }
      />

      <div className="flex-1 h-full ad-shell p-0">
        { invitations.length === 0 ? (
          <div className="flex h-[400px] flex-col items-center justify-center gap-4 border-2 border-dashed rounded-xl bg-muted/10">
            <div className="p-4 bg-background rounded-full border shadow-sm">
              <MessageSquare className="size-8 text-muted-foreground" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="font-semibold text-lg">{ t( 'noInvitationsYet' ) }</h3>
              <p className="text-muted-foreground text-sm max-w-[300px]">
                { t( 'noInvitationsDesc' ) }
              </p>
            </div>
          </div>
        ) : (
          <div className='@container'>
            <div className='grid grid-cols-1 @sm:grid-cols-2 @md:grid-cols-3 @lg:grid-cols-4 @xl:grid-cols-5 gap-4 p-5'>
              { invitations.map( ( invitation ) => (
                <InvitationCard
                  key={ invitation.id }
                  invitation={ invitation }
                  onViewDetails={ handleOpenGig }
                />
              ) ) }
            </div>
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
