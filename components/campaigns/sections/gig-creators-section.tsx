'use client';

import { useMemo, useState } from 'react';
import { Loader2, MessageCircle } from 'lucide-react';

import { CreatorDetailsSheet } from '@/components/admin/creators/creator-details-sheet';
import { StartConversationDialog } from '@/components/conversations/start-conversation-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/dashboard-ui/avatar';
import { Badge } from '@/components/dashboard-ui/badge';
import { Button } from '@/components/dashboard-ui/button';
import type { ModelsCreatorResponse } from '@/lib/api/generated/models';
import { UtilsEntityType } from '@/lib/api/generated/models/utils-entity-type';
import { useGigApplications, useGigInvitations } from '@/lib/api/hooks/gigs';
import { imgpresets } from '@/lib/utils/imgproxy';

interface GigCreatorsSectionProps {
  gigId: string;
}

type AcceptedSource = 'application' | 'invitation';

interface AcceptedCreator {
  creator: ModelsCreatorResponse;
  source: AcceptedSource;
}

function GigCreatorCard( { entry, onViewDetails, onMessage }: {
  entry: AcceptedCreator;
  onViewDetails: ( creator: ModelsCreatorResponse ) => void;
  onMessage: ( creator: ModelsCreatorResponse ) => void;
} ) {
  const { creator, source } = entry;
  const fullName = `${ creator.first_name || '' } ${ creator.last_name || '' }`.trim() || creator.email || 'Unknown';
  const initials = fullName.slice( 0, 2 ).toUpperCase();
  const profileImage = creator.profile_image?.asset;

  return (
    <div className="rounded-2xl border bg-background p-4 flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <Avatar className="size-12 shrink-0">
          { profileImage && <AvatarImage src={ imgpresets.avatar( profileImage ) } alt={ fullName } /> }
          <AvatarFallback>{ initials }</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="font-medium text-sm truncate">{ fullName }</p>
          { creator.email && <p className="text-xs text-muted-foreground truncate">{ creator.email }</p> }
        </div>
        <Badge variant="secondary" className="text-[10px] font-normal capitalize shrink-0">
          via { source }
        </Badge>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="flex-1 font-regular" onClick={ () => onViewDetails( creator ) }>
          View Details
        </Button>
        <Button size="sm" className="flex-1 font-regular" onClick={ () => onMessage( creator ) }>
          <MessageCircle className="size-3.5" />
          Message
        </Button>
      </div>
    </div>
  );
}

export function GigCreatorsSection( { gigId }: GigCreatorsSectionProps ) {
  const { data: applicationsData, isLoading: applicationsLoading } = useGigApplications( gigId );
  const { data: invitationsData, isLoading: invitationsLoading } = useGigInvitations( gigId );
  const [ selectedCreator, setSelectedCreator ] = useState<ModelsCreatorResponse | null>( null );
  const [ detailsOpen, setDetailsOpen ] = useState( false );
  const [ messageCreator, setMessageCreator ] = useState<ModelsCreatorResponse | null>( null );
  const [ messageOpen, setMessageOpen ] = useState( false );

  const isLoading = applicationsLoading || invitationsLoading;

  const acceptedCreators = useMemo<AcceptedCreator[]>( () => {
    const applications = applicationsData?.data ?? [];
    const invitationsRaw = invitationsData?.data;
    const invitations = Array.isArray( invitationsRaw ) ? invitationsRaw : invitationsRaw ? [ invitationsRaw ] : [];

    const byId = new Map<string, AcceptedCreator>();
    for ( const app of applications ) {
      if ( app.status === 'accepted' && app.creator?.id ) {
        byId.set( app.creator.id, { creator: app.creator, source: 'application' } );
      }
    }
    for ( const inv of invitations ) {
      if ( inv.status === 'accepted' && inv.creator?.id ) {
        byId.set( inv.creator.id, { creator: inv.creator, source: 'invitation' } );
      }
    }
    return Array.from( byId.values() );
  }, [ applicationsData, invitationsData ] );

  const handleViewDetails = ( creator: ModelsCreatorResponse ) => {
    setSelectedCreator( creator );
    setDetailsOpen( true );
  };

  const handleMessage = ( creator: ModelsCreatorResponse ) => {
    setMessageCreator( creator );
    setMessageOpen( true );
  };

  if ( isLoading ) {
    return (
      <div className="flex justify-center items-center p-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if ( acceptedCreators.length === 0 ) {
    return (
      <div className="flex items-center justify-center p-12 bg-muted/10 border-2 border-dashed rounded-xl">
        <p className="text-muted-foreground">No creators have accepted this gig yet.</p>
      </div>
    );
  }

  return (
    <div className="@container">
      <div className="grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-3 gap-4">
        { acceptedCreators.map( ( entry ) => (
          <GigCreatorCard
            key={ entry.creator.id }
            entry={ entry }
            onViewDetails={ handleViewDetails }
            onMessage={ handleMessage }
          />
        ) ) }
      </div>

      <CreatorDetailsSheet
        creator={ selectedCreator }
        open={ detailsOpen }
        onOpenChange={ setDetailsOpen }
        revealAddress
      />

      <StartConversationDialog
        entityType={ UtilsEntityType.EntityTypeCreator }
        entityId={ messageCreator?.id }
        name={ messageCreator ? `${ messageCreator.first_name || '' } ${ messageCreator.last_name || '' }`.trim() || messageCreator.email || 'Creator' : '' }
        avatarUrl={ messageCreator?.profile_image?.asset ? imgpresets.avatar( messageCreator.profile_image.asset ) : undefined }
        open={ messageOpen }
        onOpenChange={ setMessageOpen }
      />
    </div>
  );
}
