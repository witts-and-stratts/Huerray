'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';

import { CreatorDetailsSheet } from '@/components/admin/creators/creator-details-sheet';
import { EmptyApplications } from '@/components/admin/empty-states/empty-applications';
import { EmptyInvitations } from '@/components/admin/empty-states/empty-invitations';
import { ApplicationCard } from '@/components/campaigns/application-card';
import { InviteCreatorsDialog } from '@/components/campaigns/invite-creators-dialog';
import { Button } from '@/components/dashboard-ui/button';
import { Separator } from '@/components/dashboard-ui/separator';
import { InvitationCard } from '@/components/creator/invitation-card';
import type { ModelsCreatorResponse, ModelsGigInvitationResponse } from '@/lib/api/generated/models';
import { useGigApplications, useGigInvitations } from '@/lib/api/hooks/gigs';
import { useTranslations } from 'next-intl';

interface GigApplicationsInvitationsSectionProps {
  gigId: string;
  campaignId?: string;
}

export function GigApplicationsInvitationsSection( { gigId, campaignId }: GigApplicationsInvitationsSectionProps ) {
  const t = useTranslations( 'dashboard.brand.campaignsPage' );
  const { data: applicationsData, isLoading: applicationsLoading, error: applicationsError } = useGigApplications( gigId );
  const { data: invitationsData, isLoading: invitationsLoading, error: invitationsError } = useGigInvitations( gigId );
  const [ selectedCreator, setSelectedCreator ] = useState<ModelsCreatorResponse | null>( null );
  const [ creatorSheetOpen, setCreatorSheetOpen ] = useState( false );
  const [ inviteOpen, setInviteOpen ] = useState( false );

  const isLoading = applicationsLoading || invitationsLoading;
  const error = applicationsError || invitationsError;

  const handleViewCreatorDetails = ( creator?: ModelsCreatorResponse ) => {
    if ( !creator ) return;
    setSelectedCreator( creator );
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
        Error loading applications and invitations: { error.message }
      </div>
    );
  }

  const applications = applicationsData?.data ?? [];
  const invitationsRaw = invitationsData?.data;
  const invitations = ( Array.isArray( invitationsRaw ) ? invitationsRaw : invitationsRaw ? [ invitationsRaw ] : [] ) as ModelsGigInvitationResponse[];

  return (
    <div className="@container flex flex-col gap-6">
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium tracking-widest uppercase text-muted-foreground">{ t( 'actions.applications' ) }</h4>
        </div>
        { applications.length === 0 ? (
          <EmptyApplications fill={ false } />
        ) : (
          <div className="grid grid-cols-1 @sm:grid-cols-2 @md:grid-cols-4 gap-6">
            { applications.map( ( application ) => (
              <ApplicationCard
                key={ application.id }
                application={ application }
                onClick={ () => handleViewCreatorDetails( application.creator ) }
              />
            ) ) }
          </div>
        ) }
      </div>

      <Separator />

      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium tracking-widest uppercase text-muted-foreground">{ t( 'actions.invitations' ) }</h4>
          { campaignId && (
            <Button size="sm" className="font-regular" onClick={ () => setInviteOpen( true ) }>
              { t( 'inviteCreators' ) }
            </Button>
          ) }
        </div>
        { invitations.length === 0 ? (
          <EmptyInvitations fill={ false } />
        ) : (
          <div className="grid grid-cols-2 @md:grid-cols-4 @lg:grid-cols-5 gap-4">
            { invitations.map( ( invitation ) => (
              <InvitationCard
                key={ invitation.id }
                invitation={ invitation }
                onViewDetails={ () => { } }
                onViewCreatorDetails={ handleViewCreatorDetails }
              />
            ) ) }
          </div>
        ) }
      </div>

      <CreatorDetailsSheet
        creator={ selectedCreator }
        open={ creatorSheetOpen }
        onOpenChange={ setCreatorSheetOpen }
      />

      { campaignId && (
        <InviteCreatorsDialog
          campaignId={ campaignId }
          gigId={ gigId }
          open={ inviteOpen }
          onOpenChange={ setInviteOpen }
        />
      ) }
    </div>
  );
}
