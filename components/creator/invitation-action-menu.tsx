"use client";

import { ModelsGigInvitationResponse } from '@/lib/api/generated/models';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/dashboard-ui/dropdown-menu';
import { Button } from '@/components/dashboard-ui/button';
import { UtilsGigStatus } from '@/lib/api/generated/models/utils-gig-status';
import { CreateSubmissionSheet } from './create-submission-sheet';
import { Check, Eye, MoreVertical, X, UploadCloud } from 'lucide-react';
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

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreVertical className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-40">
          <DropdownMenuItem
            onClick={ () => setShowSubmissionSheet( true ) }
            disabled={ invitation.status !== 'accepted' }
          >
            <UploadCloud className="mr-2 h-4 w-4" />
            Create Submission
          </DropdownMenuItem>
          <DropdownMenuItem onClick={ () => onViewDetails( invitation ) }>
            <Eye className="mr-2 h-4 w-4" />
            View Invitation
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={ () => setShowAcceptDialog( true ) }
            disabled={ !isPending }
          >
            Accept Invitation
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={ () => setShowRejectDialog( true ) }
            disabled={ !isPending }
            className="text-destructive focus:text-destructive"
          >
            Reject Invitation
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

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
        invitation={ invitation }
      />
    </>
  );
}
