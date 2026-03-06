"use client";

import { Cancel01Icon, CheckmarkCircle01Icon, Clock01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import type { ComponentProps, FocusEvent } from 'react';
import { useState } from 'react';
import { motion } from 'motion/react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/dashboard-ui/card';
import { cn } from '@/lib/dashboard-utils';
import { ModelsCreatorResponse, ModelsGigInvitationResponse } from '@/lib/api/generated/models';
import { CalendarClock, CircleIcon, Video } from 'lucide-react';
import { InvitationActionMenu } from './invitation-action-menu';
import { TextCapitalize } from '../text-case';
import { RoleGuard } from '../auth/role-guard';
import { BrandAvatar } from '../campaigns/brand-avatar';
import { Button } from '../dashboard-ui/button';
import { ConfirmDialog } from '../dashboard-ui/confirm-dialog';
import { Textarea } from '../dashboard-ui/textarea';
import { useRespondToInvitation } from '@/lib/api/hooks/gigs';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '../dashboard-ui/avatar';
import { useRole } from '@/contexts/role-context';
import { formatDate } from '@/lib/utils/format';

type StatusIcon = ComponentProps<typeof HugeiconsIcon>[ 'icon' ];

const invitationStatusConfig: Record<string, { label: string; color: string; icon: StatusIcon; }> = {
  pending: {
    label: 'Pending',
    color: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
    icon: Clock01Icon,
  },
  accepted: {
    label: 'Accepted',
    color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
    icon: CheckmarkCircle01Icon,
  },
  declined: {
    label: 'Declined',
    color: 'bg-red-500/10 text-red-600 border-red-500/20',
    icon: Cancel01Icon,
  },
};

function InvitationStatusBadge( { status, className }: { status?: string; className?: string; } ) {
  const config = invitationStatusConfig[ status?.toLowerCase() || '' ] || {
    label: status || 'Unknown',
    color: 'bg-gray-500/10 text-gray-600 border-gray-500/20',
    icon: CircleIcon,
  };

  return (
    <div className={ cn(
      "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border scale-90 origin-left whitespace-nowrap",
      config.color,
      className
    ) }>
      <HugeiconsIcon icon={ config.icon } className="w-3 h-3" />
      <TextCapitalize>{ config.label }</TextCapitalize>
    </div>
  );
}


interface InvitationCardProps {
  invitation: ModelsGigInvitationResponse;
  onViewDetails: ( invitation: ModelsGigInvitationResponse ) => void;
  onViewCreatorDetails?: ( creator: ModelsCreatorResponse ) => void;
}

function getInvitationCreator( invitation: ModelsGigInvitationResponse ): ModelsCreatorResponse | null {
  if ( invitation.creator ) {
    return invitation.creator as ModelsCreatorResponse;
  }

  if ( invitation.creator_id ) {
    return {
      creator_id: invitation.creator_id,
      email: 'Unknown creator',
      first_name: '',
      last_name: '',
    } as ModelsCreatorResponse;
  }

  return null;
}

export function InvitationCard( { invitation, onViewDetails, onViewCreatorDetails }: InvitationCardProps ) {
  const [ showAcceptDialog, setShowAcceptDialog ] = useState( false );
  const [ showRejectDialog, setShowRejectDialog ] = useState( false );
  const [ acceptComment, setAcceptComment ] = useState( '' );
  const [ rejectComment, setRejectComment ] = useState( '' );
  const [ showQuickActions, setShowQuickActions ] = useState( false );
  const { mutate: respondToInvitation, isPending: isResponding } = useRespondToInvitation();
  const role = useRole();

  const gigTitle = invitation.gig?.title || 'Untitled gig';
  const numberOfVideos = invitation.number_of_videos;
  const invitedAt = formatDate( invitation.invited_at );
  const invitationMessage = invitation.message?.trim();
  const creatorName = `${ invitation.creator?.first_name || '' } ${ invitation.creator?.last_name || '' }`.trim() || invitation.creator?.email || 'Invited creator';
  const brandId = invitation.brand_id || invitation.gig?.brand?.brand_id || invitation.gig?.brand?.id || '';
  const isPending = ( invitation.status || '' ).toLowerCase() === 'pending';
  const creator = getInvitationCreator( invitation );
  const cardBorderClass = invitation.status?.toLowerCase() === 'accepted'
    ? 'border-emerald-500/60 shadow-[0_12px_30px_-26px_rgba(16,185,129,0.65)]'
    : 'border-border/70';

  const handleRespond = ( status: 'accepted' | 'declined', comment?: string ) => {
    if ( !invitation.id ) return;

    respondToInvitation( {
      invitationId: invitation.id,
      response: {
        status,
      }
    }, {
      onSuccess: () => {
        toast.success( `Invitation ${ status === 'accepted' ? 'accepted' : 'declined' } successfully` );
        setAcceptComment( '' );
        setRejectComment( '' );
        setShowAcceptDialog( false );
        setShowRejectDialog( false );
      },
      onError: () => {
        toast.error( "Failed to update invitation status" );
      }
    } );
  };

  const handleAcceptDialogChange = ( open: boolean ) => {
    setShowAcceptDialog( open );
    if ( !open ) setAcceptComment( '' );
  };

  const handleRejectDialogChange = ( open: boolean ) => {
    setShowRejectDialog( open );
    if ( !open ) setRejectComment( '' );
  };

  const handleCardBlur = ( event: FocusEvent<HTMLDivElement> ) => {
    requestAnimationFrame( () => {
      if ( !event.currentTarget.contains( document.activeElement ) ) {
        setShowQuickActions( false );
      }
    } );
  };

  const handleTitleClick = () => {
    if ( role === 'creator' ) {
      onViewDetails( invitation );
      return;
    }

    if ( creator && onViewCreatorDetails ) {
      onViewCreatorDetails( creator );
      return;
    }

    onViewDetails( invitation );
  };

  return (
    <>
      <Card
        className={ cn(
          'relative py-3 justify-between gap-1 border-px',
          cardBorderClass,
          role === 'creator' && 'min-h-[220px]'
        ) }
        onMouseEnter={ () => setShowQuickActions( true ) }
        onMouseLeave={ () => setShowQuickActions( false ) }
        onFocusCapture={ () => setShowQuickActions( true ) }
        onBlurCapture={ handleCardBlur }
      >
        <CardHeader className="flex items-start justify-between gap-4 mb-2 pr-1">
          <div className="flex flex-col flex-1 min-w-0">
            <CardTitle
              className="capitalize text-[18px] font-normal text-primary font-primary truncate cursor-pointer hover:underline"
              onClick={ handleTitleClick }
            >
              { role === 'creator' ? gigTitle : creatorName }
            </CardTitle>
            <CardDescription className="text-muted-foreground/80 text-sm line-clamp-2 italic">
              <RoleGuard allowedRoles={ [ 'creator' ] }>
                { invitationMessage || 'Review this invitation to see full requirements.' }
              </RoleGuard>
              <RoleGuard excludedRoles={ [ 'creator' ] }>
                { gigTitle }
              </RoleGuard>
            </CardDescription>
          </div>
          <div className="flex shrink-0 text-right gap-2 items-start">
            <RoleGuard allowedRoles={ [ 'brand', 'admin' ] }>
              <Avatar className="size-10 border bg-white rounded-full shrink-0">
                <AvatarImage src={ invitation.creator?.profile_image_url } alt={ creatorName } className="object-cover" />
                <AvatarFallback className="rounded-full text-xs">
                  { creatorName.slice( 0, 2 ).toUpperCase() }
                </AvatarFallback>
              </Avatar>
            </RoleGuard>
            <RoleGuard allowedRoles={ [ 'creator' ] }>
              { brandId && (
                <BrandAvatar brandId={ brandId } className="size-10 border bg-white rounded-full shrink-0" />
              ) }
            </RoleGuard>
            <InvitationActionMenu invitation={ invitation } onViewDetails={ onViewDetails } />
          </div>
        </CardHeader>

        <CardContent className="space-y-3 pb-2">
          <div className="flex flex-col items-start gap-2 text-sm text-muted-foreground">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-muted/30 px-2.5 py-1">
              <CalendarClock className="size-3.5" />
              <span className="text-xs">Invited { invitedAt }</span>
            </div>
            { typeof numberOfVideos === 'number' && numberOfVideos > 0 && (
              <div className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-muted/30 px-2.5 py-1">
                <Video className="size-3.5" />
                <span className="text-xs">{ numberOfVideos } video{ numberOfVideos === 1 ? '' : 's' }</span>
              </div>
            ) }
          </div>

          { invitation.message && (
            <RoleGuard excludedRoles={ [ 'creator' ] }>
              <div className="text-sm text-muted-foreground/70 line-clamp-2 italic">
                &quot;{ invitation.message }&quot;
              </div>
            </RoleGuard>
          ) }

          <RoleGuard allowedRoles={ [ 'creator' ] }>
            { isPending && (
              <motion.div
                initial={ false }
                animate={ showQuickActions ? 'open' : 'closed' }
                variants={ {
                  open: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.18,
                      ease: 'easeOut',
                      staggerChildren: 0.08,
                      delayChildren: 0.03,
                    },
                  },
                  closed: {
                    opacity: 0,
                    y: 12,
                    transition: {
                      duration: 0.14,
                      ease: 'easeIn',
                      staggerChildren: 0.05,
                      staggerDirection: -1,
                    },
                  },
                } }
                className={ cn(
                  "absolute inset-x-0 bottom-0 z-10",
                  showQuickActions ? "pointer-events-auto" : "pointer-events-none"
                ) }
              >
                <div className="bg-linear-to-t from-white via-white/95 to-transparent px-3 pb-0 pt-20">
                  <div className="grid gap-1">
                    <motion.div
                      variants={ {
                        open: { opacity: 1, y: 0 },
                        closed: { opacity: 0, y: 8 },
                      } }
                      className='w-full'
                    >
                      <Button
                        size="sm"
                        className="w-full"
                        onClick={ () => setShowAcceptDialog( true ) }
                        disabled={ isResponding }
                      >
                        Accept
                      </Button>
                    </motion.div>
                    <motion.div
                      variants={ {
                        open: { opacity: 1, y: 0 },
                        closed: { opacity: 0, y: 8 },
                      } }
                      className='w-full'
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full font-normal"
                        onClick={ () => setShowRejectDialog( true ) }
                        disabled={ isResponding }
                      >
                        Reject
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ) }
          </RoleGuard>


          <div className="mt-2 flex items-center justify-between">
            <InvitationStatusBadge status={ invitation.status } />
            { invitation.response_at && (
              <span className="text-xs text-muted-foreground/60">
                Responded { formatDate( invitation.response_at ) }
              </span>
            ) }
            { !invitation.response_at && (
              <span className="text-xs text-muted-foreground/60">
                Awaiting response
              </span>
            ) }
          </div>
        </CardContent>
      </Card>

      <ConfirmDialog
        open={ showAcceptDialog }
        onOpenChange={ handleAcceptDialogChange }
        title="Accept Invitation"
        description="Are you sure you want to accept this invitation? This will notify the brand and you can start working on the gig."
        confirmLabel="Accept"
        confirmDisabled={ !acceptComment.trim() }
        onConfirm={ () => handleRespond( 'accepted', acceptComment ) }
        isLoading={ isResponding }
        loadingText="Accepting..."
        variant="default"
        className="max-w-sm"
      >
        <Textarea
          placeholder="Add a comment for this approval"
          rows={ 3 }
          className="bg-muted/10"
          value={ acceptComment }
          onValueChange={ setAcceptComment }
        />
      </ConfirmDialog>

      <ConfirmDialog
        open={ showRejectDialog }
        onOpenChange={ handleRejectDialogChange }
        title="Reject Invitation"
        description="Are you sure you want to reject this invitation? This action cannot be undone."
        confirmLabel="Reject"
        confirmDisabled={ !rejectComment.trim() }
        onConfirm={ () => handleRespond( 'declined', rejectComment ) }
        isLoading={ isResponding }
        loadingText="Rejecting..."
        variant="destructive"
        className="max-w-sm"
      >
        <Textarea
          placeholder="Explain why you're rejecting"
          rows={ 3 }
          className="bg-muted/10"
          value={ rejectComment }
          onValueChange={ setRejectComment }
        />
      </ConfirmDialog>
    </>
  );
}
