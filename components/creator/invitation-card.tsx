"use client";

import { Cancel01Icon, CheckmarkCircle01Icon, CircleIcon, Clock01Icon, Coins01Icon, User02Icon, Video01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import type { ComponentProps } from 'react';
import { useState } from 'react';

import { useRole } from '@/contexts/role-context';
import { ModelsCreatorResponse, ModelsGigInvitationResponse } from '@/lib/api/generated/models';
import { useRespondToInvitation } from '@/lib/api/hooks/gigs';
import { cn } from '@/lib/dashboard-utils';
import { useFormatCurrency } from '@/lib/hooks/format';
import { imgpresets } from '@/lib/utils/imgproxy';
import { ArrowRight, ChevronRight, VideoIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '../dashboard-ui/avatar';
import { Button } from '../dashboard-ui/button';
import { BrandAvatar } from '../campaigns/brand-avatar';
import { ConfirmDialog } from '../dashboard-ui/confirm-dialog';
import { Textarea } from '../dashboard-ui/textarea';
import { TextCapitalize } from '../text-case';
import { InvitationActionMenu } from './invitation-action-menu';
import { BrandHoverCard } from '../campaigns/brand-hover-card';
import { Separator } from '../dashboard-ui/separator';

type StatusIcon = ComponentProps<typeof HugeiconsIcon>[ 'icon' ];

const invitationStatusConfig: Record<string, { label: string; color: string; icon: StatusIcon; }> = {
  pending: {
    label: 'Pending',
    color: 'bg-amber-500/20 text-amber-300 border-amber-400/30',
    icon: Clock01Icon,
  },
  accepted: {
    label: 'Accepted',
    color: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30',
    icon: CheckmarkCircle01Icon,
  },
  declined: {
    label: 'Declined',
    color: 'bg-red-500/20 text-red-300 border-red-400/30',
    icon: Cancel01Icon,
  },
};

function InvitationStatusBadge( { status, className }: { status?: string; className?: string; } ) {
  const config = invitationStatusConfig[ status?.toLowerCase() || '' ] || {
    label: status || 'Unknown',
    color: 'bg-white/10 text-white/70 border-white/20',
    icon: CircleIcon,
  };

  return (
    <div className={ cn(
      "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border whitespace-nowrap backdrop-blur-sm",
      config.color,
      className
    ) }>
      <HugeiconsIcon icon={ config.icon } className="w-2.5 h-2.5" />
      <TextCapitalize>{ config.label }</TextCapitalize>
    </div>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface InvitationCardProps {
  invitation: ModelsGigInvitationResponse;
  onViewDetails: ( invitation: ModelsGigInvitationResponse ) => void;
  onViewCreatorDetails?: ( creator: ModelsCreatorResponse ) => void;
}

function getInvitationCreator( invitation: ModelsGigInvitationResponse ): ModelsCreatorResponse | null {
  if ( invitation.creator ) return invitation.creator as ModelsCreatorResponse;
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

// ─── Shared card shell ────────────────────────────────────────────────────────

function CardShell( {
  backgroundImage,
  fallbackGradient,
  onClick,
  children,
}: {
  backgroundImage?: string;
  fallbackGradient?: string;
  onClick: () => void;
  children: React.ReactNode;
} ) {
  return (
    <div
      className="relative rounded-2xl overflow-hidden aspect-[3/4] cursor-pointer group"
      onClick={ onClick }
    >
      { backgroundImage ? (
        <img
          src={ backgroundImage }
          alt=""
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className={ cn( "absolute inset-0 bg-gradient-to-br", fallbackGradient ?? "from-primary/60 via-primary/40 to-primary/20" ) } />
      ) }
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      { children }
    </div>
  );
}

// ─── Creator view — shows Gig details ─────────────────────────────────────────

function CreatorInvitationCard( { invitation, onViewDetails }: InvitationCardProps ) {
  const [ showAcceptDialog, setShowAcceptDialog ] = useState( false );
  const [ showRejectDialog, setShowRejectDialog ] = useState( false );
  const [ acceptComment, setAcceptComment ] = useState( '' );
  const [ rejectComment, setRejectComment ] = useState( '' );
  const { mutate: respondToInvitation, isPending: isResponding } = useRespondToInvitation();

  const gig = invitation.gig;
  const gigTitle = gig?.title || 'Untitled gig';
  const brandName = gig?.brand_name || gig?.brand?.company_name || '';
  const brand = gig?.brand;
  const isPending = ( invitation.status || '' ).toLowerCase() === 'pending';

  const coverImage = ( gig?.campaign?.product_image?.asset || gig?.campaign?.campaign_images?.[ 0 ]?.asset ) || undefined;
  const compensation = gig?.compensation?.value;
  const formattedCompensation = useFormatCurrency( compensation ?? 0, gig?.compensation?.currency || 'EUR' );
  const numberOfVideos = gig?.number_of_videos ?? invitation.number_of_videos;
  const durationSeconds = gig?.video_duration_in_seconds;

  const handleRespond = ( status: 'accepted' | 'declined' ) => {
    if ( !invitation.id ) return;
    respondToInvitation( {
      invitationId: invitation.id,
      response: { status },
    }, {
      onSuccess: () => {
        toast.success( `Invitation ${ status === 'accepted' ? 'accepted' : 'declined' } successfully` );
        setAcceptComment( '' );
        setRejectComment( '' );
        setShowAcceptDialog( false );
        setShowRejectDialog( false );
      },
      onError: () => toast.error( "Failed to update invitation status" ),
    } );
  };

  const handleAcceptDialogChange = ( open: boolean ) => { setShowAcceptDialog( open ); if ( !open ) setAcceptComment( '' ); };
  const handleRejectDialogChange = ( open: boolean ) => { setShowRejectDialog( open ); if ( !open ) setRejectComment( '' ); };

  return (
    <>
      <CardShell
        backgroundImage={ coverImage ? imgpresets.card( coverImage ) : undefined }
        onClick={ () => onViewDetails( invitation ) }
      >
        {/* Top row */ }
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between" onClick={ e => e.stopPropagation() }>
          <InvitationStatusBadge status={ invitation.status } />
          <InvitationActionMenu invitation={ invitation } onViewDetails={ onViewDetails } />
        </div>

        {/* Bottom content */ }
        <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col gap-1 bg-black/5 backdrop-blur m-2 rounded-2xl border border-white/10">

          {/* Title — gig name */ }
          <h3 className="text-white text-base font-primary font-normal leading-tight line-clamp-2">
            { gigTitle }
          </h3>

          {/* Meta row */ }
          <div className="flex items-center gap-2 text-white/60 text-sm">
            { numberOfVideos && (
              <span className="flex items-center gap-1">
                <VideoIcon className="size-5" strokeWidth={ 1 } />
                { numberOfVideos } { numberOfVideos !== 1 ? 'videos' : 'video' }
              </span>
            ) }
            { numberOfVideos && durationSeconds && <Separator orientation='vertical' className={ 'opacity-30' } /> }
            { durationSeconds && <span>{ durationSeconds }s</span> }
          </div>

          { compensation && (
            <p className="flex flex-col mt-1">
              <span className="text-white/60 text-[10px] uppercase tracking-widest -mb-1.5">Reward</span>
              <span className='text-burgundy-100'>{ formattedCompensation }</span>
            </p>
          ) }

          {/* Subtitle — brand */ }
          <div className="flex items-center gap-1.5 mt-0.5">
            { brand && (
              <BrandHoverCard brand={ brand }>
                <BrandAvatar brand={ brand } className="size-4 rounded-full border border-white/20 shrink-0" />
              </BrandHoverCard>
            ) }
            <p className="text-white/60 text-xs line-clamp-1">{ brandName }</p>
          </div>

          {/* CTA */ }
          <div className="mt-1" onClick={ e => e.stopPropagation() }>
            { isPending ? (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 font-normal border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm"
                  onClick={ () => setShowRejectDialog( true ) }
                  disabled={ isResponding }
                >
                  Decline
                </Button>
                <Button
                  size="sm"
                  className="flex-1"
                  onClick={ () => setShowAcceptDialog( true ) }
                  disabled={ isResponding }
                >
                  Accept <ArrowRight className="size-3.5 ml-1" />
                </Button>
              </div>
            ) : (
              <button
                className="flex items-center gap-1.5 text-white/80 text-xs font-medium hover:text-white transition-colors"
                onClick={ () => onViewDetails( invitation ) }
              >
                View Details <ArrowRight className="size-3.5" />
              </button>
            ) }
          </div>
        </div>
      </CardShell>

      <ConfirmDialog
        open={ showAcceptDialog }
        onOpenChange={ handleAcceptDialogChange }
        title="Accept Invitation"
        description="Are you sure you want to accept this invitation? This will notify the brand and you can start working on the gig."
        confirmLabel="Accept"
        confirmDisabled={ !acceptComment.trim() }
        onConfirm={ () => handleRespond( 'accepted' ) }
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
        title="Decline Invitation"
        description="Are you sure you want to decline this invitation? This action cannot be undone."
        confirmLabel="Decline"
        confirmDisabled={ !rejectComment.trim() }
        onConfirm={ () => handleRespond( 'declined' ) }
        isLoading={ isResponding }
        loadingText="Declining..."
        variant="destructive"
        className="max-w-sm"
      >
        <Textarea
          placeholder="Explain why you're declining"
          rows={ 3 }
          className="bg-muted/10"
          value={ rejectComment }
          onValueChange={ setRejectComment }
        />
      </ConfirmDialog>
    </>
  );
}

// ─── Admin / Brand view — shows Creator details ───────────────────────────────

function AdminBrandInvitationCard( { invitation, onViewDetails, onViewCreatorDetails }: InvitationCardProps ) {
  const creator = getInvitationCreator( invitation );
  const creatorName = `${ invitation.creator?.first_name || '' } ${ invitation.creator?.last_name || '' }`.trim() || invitation.creator?.email || 'Invited creator';
  const creatorInitials = creatorName.slice( 0, 2 ).toUpperCase();

  const profileImage = invitation.creator?.profile_image?.asset;
  const gigTitle = invitation.gig?.title || 'Untitled gig';

  const gig = invitation.gig;
  const numberOfVideos = gig?.number_of_videos ?? invitation.number_of_videos;
  const compensation = gig?.compensation?.value;
  const formattedCompensation = useFormatCurrency( compensation ?? 0, gig?.compensation?.currency || 'EUR' );
  const durationSeconds = gig?.video_duration_in_seconds;

  const handleCardClick = () => {
    if ( creator && onViewCreatorDetails ) {
      onViewCreatorDetails( creator );
    } else {
      onViewDetails( invitation );
    }
  };

  return (
    <CardShell
      backgroundImage={ profileImage ? imgpresets.card( profileImage ) : undefined }
      fallbackGradient="from-slate-700/80 via-slate-600/50 to-slate-500/30"
      onClick={ handleCardClick }
    >
      {/* Top row */ }
      <div className="absolute top-3 left-3 right-3 flex items-start justify-between" onClick={ e => e.stopPropagation() }>
        <InvitationStatusBadge status={ invitation.status } />
        <InvitationActionMenu invitation={ invitation } onViewDetails={ onViewDetails } />
      </div>

      {/* Center — creator avatar (only shown when no profile image) */ }
      { !profileImage && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Avatar className="size-20 border-2 border-white/20">
            <AvatarFallback className="text-2xl bg-white/10 text-white">
              <HugeiconsIcon icon={ User02Icon } className="size-8" strokeWidth={ 1 } />
            </AvatarFallback>
          </Avatar>
        </div>
      ) }

      {/* Bottom content */ }
      <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col gap-1 bg-black/5 backdrop-blur m-2 rounded-2xl border border-white/10">

        {/* Title — creator name */ }
        <h3 className="text-white text-base font-primary font-normal leading-tight line-clamp-2">
          { creatorName }
        </h3>

        {/* Subtitle — gig title */ }
        <div className="flex items-center gap-1.5 mt-0.5">
          <Avatar className="size-4 border border-white/20 shrink-0">
            { profileImage && (
              <AvatarImage src={ profileImage } alt={ creatorName } className="object-cover" />
            ) }
            <AvatarFallback className="text-[8px]">{ creatorInitials }</AvatarFallback>
          </Avatar>
          <p className="text-burgundy-100/80 text-sm line-clamp-1 font-regular">
            <span className='opacity-50'>Gig: </span>{ gigTitle }</p>
        </div>

        {/* Meta row */ }
        <div className="flex items-center gap-2 text-white/60 text-sm">
          { numberOfVideos && (
            <span className="flex items-center gap-1">
              <VideoIcon className="size-5" strokeWidth={ 1 } />
              { numberOfVideos } { numberOfVideos !== 1 ? 'videos' : 'video' }
            </span>
          ) }
          { numberOfVideos && durationSeconds && <Separator orientation='vertical' className={ 'opacity-30' } /> }
          { durationSeconds && <span>{ durationSeconds }s</span> }
        </div>
      </div>
    </CardShell>
  );
}

// ─── Main component — role-switched ──────────────────────────────────────────

export function InvitationCard( props: InvitationCardProps ) {
  const role = useRole();

  if ( role === 'creator' ) {
    return <CreatorInvitationCard { ...props } />;
  }

  return <AdminBrandInvitationCard { ...props } />;
}
