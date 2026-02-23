'use client';

import { useState } from 'react';
import type { ModelsGigInvitationResponse } from '@/lib/api/generated/models';
import { useCampaignInvitations } from '@/lib/api/hooks/campaigns';
import { Loader2, Mail } from 'lucide-react';

import { InvitationCard } from '@/components/creator/invitation-card';
import { GigDetailsSheet } from '@/components/campaigns/gig-details-sheet';

interface CampaignInvitationsSectionProps {
  campaignId: string;
}


export function CampaignInvitationsSection( { campaignId }: CampaignInvitationsSectionProps ) {
  const { data: invitationsData, isLoading, error } = useCampaignInvitations( campaignId );
  const [ selectedInvitation, setSelectedInvitation ] = useState<ModelsGigInvitationResponse | null>( null );
  const [ sheetOpen, setSheetOpen ] = useState( false );

  const handleViewDetails = ( invitation: ModelsGigInvitationResponse ) => {
    setSelectedInvitation( invitation );
    setSheetOpen( true );
  };

  if ( isLoading ) {
    return (
      <div className="flex justify-center items-center p-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if ( error ) {
    return (
      <div className="p-4 text-red-500 bg-red-50 rounded-md border border-red-200">
        Error loading invitations: { error.message }
      </div>
    );
  }

  const invitations = ( invitationsData?.data || [] ) as ModelsGigInvitationResponse[];

  if ( invitations.length === 0 ) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-muted/10 border-2 border-dashed rounded-xl space-y-3">
        <div className="p-4 bg-background rounded-full border shadow-sm">
          <Mail className="size-8 text-muted-foreground" />
        </div>
        <p className="text-muted-foreground font-medium">No invitations yet</p>
        <p className="text-sm text-muted-foreground">Invitations sent to creators for this campaign will appear here.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        { invitations.map( ( invitation ) => {
          return (
            <InvitationCard
              key={ invitation.id }
              invitation={ invitation }
              onViewDetails={ handleViewDetails }
            />
          );
        } ) }
      </div>

      <GigDetailsSheet
        gig={ selectedInvitation?.gig as any }
        open={ sheetOpen }
        onOpenChange={ setSheetOpen }
        invitationId={ selectedInvitation?.id }
        invitationStatus={ selectedInvitation?.status }
      />
    </>
  );
}
