'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { Button } from '@/components/dashboard-ui/button';
import { CreateSubmissionSheet } from '@/components/creator/create-submission-sheet';
import { SentenceCase } from '@/components/text-case';
import type { ModelsGigResponse } from '@/lib/api/generated/models';
import { useApplyToGig, useCreatorGigStatus, useRespondToInvitation } from '@/lib/api/hooks/gigs';
import { useVideoSubmissionsByGig } from '@/lib/api/hooks/video-submissions';

interface GigCreatorActionsProps {
  gig: ModelsGigResponse;
  onSubmissionCreated?: () => void;
}

/**
 * Role-aware Apply / Accept / Decline / Create Submission actions for a
 * creator viewing a gig's details page — ported from the quick-view
 * sheet's footer (components/campaigns/gig-details-sheet.tsx) so the full
 * page can fully replace the sheet for creators without losing the
 * ability to act on a gig.
 */
export function GigCreatorActions( { gig, onSubmissionCreated }: GigCreatorActionsProps ) {
  const commonT = useTranslations( 'dashboard.creator.common' );
  const invitationActionsT = useTranslations( 'dashboard.creator.invitations.actions' );
  const invitationDialogsT = useTranslations( 'dashboard.creator.invitations.dialogs' );
  const invitationToastsT = useTranslations( 'dashboard.creator.invitations.toasts' );
  const [ submissionSheetOpen, setSubmissionSheetOpen ] = useState( false );

  const gigId = gig.id ?? '';
  const { invitationId, invitationStatus, hasAppliedPending, isParticipating, isLoading } = useCreatorGigStatus( gigId );
  const { mutate: applyToGig, isPending: isApplying } = useApplyToGig();
  const { mutate: respondToInvitation, isPending: isResponding } = useRespondToInvitation();
  const { data: submissionsResponse } = useVideoSubmissionsByGig( gigId, { enabled: isParticipating } );

  const submissions = submissionsResponse?.data ?? [];
  const creatorSubmissionCap = gig.enforce_unique_creator_submission === true
    ? 1
    : ( gig.enforce_single_creator_submission === true && typeof gig.number_of_videos === 'number' ? gig.number_of_videos : undefined );
  const canCreateMoreSubmissions = typeof creatorSubmissionCap === 'number' ? submissions.length < creatorSubmissionCap : true;

  const handleApply = () => {
    if ( !gig.id ) return;
    applyToGig( {
      id: gig.id,
      application: { message: 'I am interested in this gig!', number_of_videos: gig.enforce_unique_creator_submission ? 1 : ( gig.number_of_videos || 1 ) },
    }, {
      onSuccess: () => toast.success( commonT( 'toasts.appliedSuccess' ) ),
      onError: ( error: any ) => {
        toast.error( commonT( 'toasts.appliedError' ), {
          richColors: true,
          description: <SentenceCase>{ error?.response?.data?.error?.message ?? commonT( 'toasts.appliedError' ) }</SentenceCase>,
        } );
      },
    } );
  };

  const handleRespond = ( status: 'accepted' | 'declined' ) => {
    if ( !invitationId ) return;
    respondToInvitation( { invitationId, response: { status } }, {
      onSuccess: () => toast.success( status === 'accepted' ? invitationToastsT( 'accepted' ) : invitationToastsT( 'declined' ) ),
      onError: () => toast.error( invitationToastsT( 'error' ) ),
    } );
  };

  if ( isLoading ) return null;

  if ( invitationId && invitationStatus === 'pending' ) {
    return (
      <div className="flex gap-2">
        <Button variant="outline" onClick={ () => handleRespond( 'declined' ) } disabled={ isResponding }>
          { invitationActionsT( 'decline' ) }
        </Button>
        <Button onClick={ () => handleRespond( 'accepted' ) } disabled={ isResponding }>
          { isResponding ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{ invitationDialogsT( 'accepting' ) }</> : invitationActionsT( 'accept' ) }
        </Button>
      </div>
    );
  }

  if ( isParticipating ) {
    if ( !canCreateMoreSubmissions ) return null;
    return (
      <>
        <Button onClick={ () => setSubmissionSheetOpen( true ) }>
          { invitationActionsT( 'createSubmission' ) }
        </Button>
        { gig.id && (
          <CreateSubmissionSheet
            open={ submissionSheetOpen }
            onOpenChange={ setSubmissionSheetOpen }
            gigId={ gig.id }
            onSuccess={ onSubmissionCreated }
          />
        ) }
      </>
    );
  }

  if ( hasAppliedPending ) {
    return <Button disabled>{ commonT( 'applicationPending' ) }</Button>;
  }

  return (
    <Button onClick={ handleApply } disabled={ isApplying || gig.gig_status !== 'open' }>
      { isApplying ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{ commonT( 'applying' ) }</> : commonT( 'applyForGig' ) }
    </Button>
  );
}
