'use client';
'use no memo';

import type { ModelsCreatorResponse, ModelsGigInvitationResponse } from '@/lib/api/generated/models';
import type { RoleShapedGig } from '@/lib/types/role-shaped-gig';
import { useCampaignInvitations } from '@/lib/api/hooks/campaigns';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

import { CreatorDetailsSheet } from '@/components/admin/creators/creator-details-sheet';
import { EmptyInvitations } from '@/components/admin/empty-states/empty-invitations';
import { GigSelectionDialog } from '@/components/campaigns/gig-selection-dialog';
import { InviteCreatorsDialog } from '@/components/campaigns/invite-creators-dialog';
import { InvitationCard } from '@/components/creator/invitation-card';
import { Button } from '@/components/dashboard-ui/button';
import { useRole } from '@/contexts/role-context';
import { UtilsContentType } from '@/lib/api/generated/models/utils-content-type';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useBasePath } from '@/lib/providers/path-provider';

interface CampaignInvitationsSectionProps {
  campaignId: string;
  campaignStatus?: string;
  campaignContentType?: string;
}


export function CampaignInvitationsSection( { campaignId, campaignStatus, campaignContentType }: CampaignInvitationsSectionProps ) {
  const t = useTranslations( 'dashboard.brand.campaignsPage' );
  const role = useRole();
  const router = useRouter();
  const basePath = useBasePath();
  const isAiCampaign = campaignContentType === UtilsContentType.ContentTypeAIGenerated;
  const { data: invitationsData, isLoading, error } = useCampaignInvitations( campaignId );
  const [ selectedCreator, setSelectedCreator ] = useState<ModelsCreatorResponse | null>( null );
  const [ creatorSheetOpen, setCreatorSheetOpen ] = useState( false );
  const [ selectedIsAccepted, setSelectedIsAccepted ] = useState( false );
  const [ selectionOpen, setSelectionOpen ] = useState( false );
  const [ inviteSheetOpen, setInviteSheetOpen ] = useState( false );
  const [ selectedGigId, setSelectedGigId ] = useState<string>( '' );

  const handleGigSelect = ( gigId: string ) => {
    setSelectedGigId( gigId );
    setSelectionOpen( false );
    setInviteSheetOpen( true );
  };

  const handleViewDetails = ( invitation: ModelsGigInvitationResponse ) => {
    const gig = invitation.gig as RoleShapedGig | undefined;
    const gigId = gig?.id || invitation.gig_id;
    const invitationCampaignId = gig?.campaign_id || gig?.campaign?.id || campaignId;
    if ( !gigId ) return;
    // ?from=invitations tells the gig details page's breadcrumb to link
    // back to this same Invitations tab, not the campaign's default tab.
    router.push( `${ basePath }/campaigns/${ invitationCampaignId }/gigs/${ gigId }?from=invitations` );
  };

  const handleViewCreatorDetails = ( creator: ModelsCreatorResponse, invitationStatus?: string ) => {
    setSelectedCreator( creator );
    setSelectedIsAccepted( invitationStatus === 'accepted' );
    setCreatorSheetOpen( true );
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
        { t( 'errorLoadingInvitations' ) }: { error.message }
      </div>
    );
  }

  const invitations = ( invitationsData?.data || [] ) as ModelsGigInvitationResponse[];

  if ( invitations.length === 0 ) {
    return (
      <>
        <EmptyInvitations
          fill={ true }
        >
          { role === 'brand' && campaignStatus === 'running' && !isAiCampaign && (
            <Button size='lg' className='min-w-[200px]' onClick={ () => setSelectionOpen( true ) }>{ t( 'inviteCreators' ) }</Button>
          ) }
        </EmptyInvitations>

        <GigSelectionDialog
          campaignId={ campaignId }
          open={ selectionOpen }
          onOpenChange={ setSelectionOpen }
          onSelect={ handleGigSelect }
        />

        <InviteCreatorsDialog
          campaignId={ campaignId }
          gigId={ selectedGigId }
          open={ inviteSheetOpen }
          onOpenChange={ setInviteSheetOpen }
        />
      </>
    );
  }

  return (
    <div className='@container'>
      <div className="grid grid-cols-2 @md:grid-cols-4 @lg:grid-cols-5 gap-4">
        { invitations.map( ( invitation ) => {
          return (
            <InvitationCard
              key={ invitation.id }
              invitation={ invitation }
              onViewDetails={ handleViewDetails }
              onViewCreatorDetails={ ( creator ) => handleViewCreatorDetails( creator, invitation.status ) }
            />
          );
        } ) }
      </div>

      <CreatorDetailsSheet
        creator={ selectedCreator }
        open={ creatorSheetOpen }
        onOpenChange={ setCreatorSheetOpen }
        revealAddress={ selectedIsAccepted }
      />

      <GigSelectionDialog
        campaignId={ campaignId }
        open={ selectionOpen }
        onOpenChange={ setSelectionOpen }
        onSelect={ handleGigSelect }
      />

      <InviteCreatorsDialog
        campaignId={ campaignId }
        gigId={ selectedGigId }
        open={ inviteSheetOpen }
        onOpenChange={ setInviteSheetOpen }
      />
    </div>
  );
}
