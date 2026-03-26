"use client";

import { ActionMenu, MenuAction } from '@/components/dashboard-ui/action-menu';
import { ModelsGigInvitationResponse } from '@/lib/api/generated/models';
import { Button } from '@/components/dashboard-ui/button';
import { CreateSubmissionSheet } from './create-submission-sheet';
import { Eye, MoreVertical, UploadCloud } from 'lucide-react';
import { ReactNode, useState } from 'react';
import { ConfirmDialog } from '@/components/dashboard-ui/confirm-dialog';
import { useRespondToInvitation } from '@/lib/api/hooks/gigs';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

interface InvitationActionMenuProps {
  invitation: ModelsGigInvitationResponse;
  onViewDetails?: ( invitation: ModelsGigInvitationResponse ) => void;
  trigger?: ReactNode;
}

export function InvitationActionMenu( { invitation, onViewDetails, trigger }: InvitationActionMenuProps ) {
  const t = useTranslations( 'dashboard.creator.invitations.actions' );
  const tDialogs = useTranslations( 'dashboard.creator.invitations.dialogs' );
  const tToasts = useTranslations( 'dashboard.creator.invitations.toasts' );
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
        toast.success( status === 'accepted' ? tToasts( 'accepted' ) : tToasts( 'declined' ) );
        setShowAcceptDialog( false );
        setShowRejectDialog( false );
      },
      onError: ( error ) => {
        toast.error( tToasts( 'error' ) );
        console.error( error );
      }
    } );
  };

  const isPending = invitation.status === 'pending';
  const actions: MenuAction<ModelsGigInvitationResponse>[] = [
    {
      label: t( 'createSubmission' ),
      icon: UploadCloud,
      condition: () => invitation.status === 'accepted',
      action: () => setShowSubmissionSheet( true ),
      allowedRoles: [ 'creator' ]
    },
    ...( onViewDetails ? [ {
      label: t( 'view' ),
      icon: Eye,
      action: () => onViewDetails( invitation ),
    } ] : [] ),
    {
      label: t( 'accept' ),
      condition: () => isPending,
      separator: true,
      action: () => setShowAcceptDialog( true ),
      allowedRoles: [ 'creator' ]
    },
    {
      label: t( 'reject' ),
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
          trigger || <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreVertical className="h-4 w-4" />
            <span className="sr-only">{ t( 'openMenu' ) }</span>
          </Button>
        }
      />

      <ConfirmDialog
        open={ showAcceptDialog }
        onOpenChange={ setShowAcceptDialog }
        title={ tDialogs( 'acceptTitle' ) }
        description={ tDialogs( 'acceptDesc' ) }
        confirmLabel={ t( 'accept' ) }
        onConfirm={ () => handleRespond( 'accepted' ) }
        isLoading={ isResponding }
        loadingText={ tDialogs( 'accepting' ) }
        variant="default"
      />

      <ConfirmDialog
        open={ showRejectDialog }
        onOpenChange={ setShowRejectDialog }
        title={ tDialogs( 'rejectTitle' ) }
        description={ tDialogs( 'rejectDesc' ) }
        confirmLabel={ t( 'reject' ) }
        onConfirm={ () => handleRespond( 'declined' ) }
        isLoading={ isResponding }
        loadingText={ tDialogs( 'declining' ) }
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
