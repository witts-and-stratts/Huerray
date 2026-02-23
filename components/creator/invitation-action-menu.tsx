"use client";

import { ActionMenu, MenuAction } from '@/components/dashboard-ui/action-menu';
import { ModelsGigInvitationResponse } from '@/lib/api/generated/models';
import { Button } from '@/components/dashboard-ui/button';
import { CreateSubmissionSheet } from './create-submission-sheet';
import { Eye, MoreVertical, UploadCloud } from 'lucide-react';
import { useState } from 'react';
import { ConfirmDialog } from '@/components/dashboard-ui/confirm-dialog';
import { useRespondToInvitation } from '@/lib/api/hooks/gigs';
import { toast } from 'sonner';

interface InvitationActionMenuProps {
  invitation: ModelsGigInvitationResponse;
  onViewDetails: ( invitation: ModelsGigInvitationResponse ) => void;
}

export function InvitationActionMenu( { invitation, onViewDetails }: InvitationActionMenuProps ) {
  const [ showAcceptDialog, setShowAcceptDialog ] = useState( false );
  const [ showRejectDialog, setShowRejectDialog ] = useState( false );
  const [ showSubmissionSheet, setShowSubmissionSheet ] = useState( false );

  const { mutate: respondToInvitation, isPending: isResponding } = useRespondToInvitation();

  const handleRespond = ( status: 'accepted' | 'declined' ) => {
    if ( !invitation.id ) return;

    respondToInvitation( {
      invitationId: invitation.id,
      response: { status }
    }, {
      onSuccess: () => {
        toast.success( `Invitation ${ status === 'accepted' ? 'accepted' : 'declined' } successfully` );
        setShowAcceptDialog( false );
        setShowRejectDialog( false );
      },
      onError: ( error ) => {
        toast.error( "Failed to update invitation status" );
        console.error( error );
      }
    } );
  };

  const isPending = invitation.status === 'pending';
  const actions: MenuAction<ModelsGigInvitationResponse>[] = [
    {
      label: "Create Submission",
      icon: UploadCloud,
      condition: () => invitation.status === 'accepted',
      action: () => setShowSubmissionSheet( true ),
      allowedRoles: [ 'creator' ]
    },
    {
      label: "View Invitation",
      icon: Eye,
      action: () => onViewDetails( invitation ),
    },
    {
      label: "Accept Invitation",
      condition: () => isPending,
      separator: true,
      action: () => setShowAcceptDialog( true ),
      allowedRoles: [ 'creator' ]
    },
    {
      label: "Reject Invitation",
      condition: () => isPending,
      variant: "destructive",
      className: "text-destructive focus:text-destructive",
      action: () => setShowRejectDialog( true ),
      allowedRoles: [ 'creator' ]
    },
  ];

  return (
    <>
      <ActionMenu
        actions={ actions }
        data={ invitation }
        trigger={
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreVertical className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        }
      />

      <ConfirmDialog
        open={ showAcceptDialog }
        onOpenChange={ setShowAcceptDialog }
        title="Accept Invitation"
        description="Are you sure you want to accept this invitation? This will notify the brand and you can start working on the gig."
        confirmLabel="Accept"
        onConfirm={ () => handleRespond( 'accepted' ) }
        isLoading={ isResponding }
        loadingText="Accepting..."
        variant="default"
      />

      <ConfirmDialog
        open={ showRejectDialog }
        onOpenChange={ setShowRejectDialog }
        title="Reject Invitation"
        description="Are you sure you want to reject this invitation? This action cannot be undone."
        confirmLabel="Reject"
        onConfirm={ () => handleRespond( 'declined' ) }
        isLoading={ isResponding }
        loadingText="Rejecting..."
        variant="destructive"
      />

      <CreateSubmissionSheet
        open={ showSubmissionSheet }
        onOpenChange={ setShowSubmissionSheet }
        gigId={ invitation.gig_id || '' }
      />
    </>
  );
}
