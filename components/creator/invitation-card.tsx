"use client";

import { Cancel01Icon, CheckmarkCircle01Icon, CircleIcon, Clock01Icon, Coins01Icon, InformationCircleIcon, User02Icon, Video01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import type { ComponentProps } from 'react';
import { useState } from 'react';

import { useRole } from '@/contexts/role-context';
import { ModelsCreatorResponse, ModelsGigInvitationResponse, ModelsGigResponse } from '@/lib/api/generated/models';
import { useRespondToInvitation } from '@/lib/api/hooks/gigs';
import { cn } from '@/lib/dashboard-utils';
import { useFormatCurrency } from '@/lib/hooks/format';
import { imgpresets } from '@/lib/utils/imgproxy';
import { ArrowRight, Calendar, VideoIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '../dashboard-ui/avatar';
import { Button } from '../dashboard-ui/button';
import { BrandAvatar } from '../campaigns/brand-avatar';
import { ConfirmDialog } from '../dashboard-ui/confirm-dialog';
import { Textarea } from '../dashboard-ui/textarea';
import { TextCapitalize } from '../text-case';
import { InvitationActionMenu } from './invitation-action-menu';
import { BrandHoverCard } from '../campaigns/brand-hover-card';
import { GigDetailsSheet } from '../campaigns/gig-details-sheet';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../dashboard-ui/hover-card';
import { Separator } from '../dashboard-ui/separator';
import { Card } from '../dashboard-ui/card';
import { WrappedCard } from '../dashboard-ui/wrapped-card';

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
        <div className="absolute bottom-0 left-0 right-0 px-4 py-2 flex flex-col gap-1 bg-black/5 backdrop-blur m-2 rounded-2xl border border-white/10">

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
          { isPending && (
            <div className="mt-1 flex gap-2" onClick={ e => e.stopPropagation() }>
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
          ) }
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

// ─── Gig info hover card ──────────────────────────────────────────────────────

function GigInfoHoverCard( { invitation }: { invitation: ModelsGigInvitationResponse; } ) {
  const gig = invitation.gig;
  const numberOfVideos = gig?.number_of_videos ?? invitation.number_of_videos;
  const durationSeconds = gig?.video_duration_in_seconds;
  const compensation = gig?.compensation?.value;
  const formattedCompensation = useFormatCurrency( compensation ?? 0, gig?.compensation?.currency || 'EUR' );

  const campaign = gig?.campaign;
  const coverImage = campaign?.product_image?.asset || campaign?.campaign_images?.[ 0 ]?.asset;
  const brandLogoUrl = gig?.brand?.profile_photo?.asset || gig?.brand_logo_url;
  const brandName = gig?.brand_name || gig?.brand?.company_name || '';
  const brandInitials = brandName.slice( 0, 2 ).toUpperCase();

  // Collect all product/campaign images (deduplicated)
  const productImages: string[] = [];
  if ( campaign?.product_image?.asset ) productImages.push( campaign.product_image.asset );
  campaign?.campaign_images?.forEach( ( img: { asset?: string; } ) => {
    if ( img.asset && !productImages.includes( img.asset ) ) productImages.push( img.asset );
  } );

  const requirements = gig?.requirements;
  const guidelines = gig?.content_guidelines;
  const startDate = gig?.posting_start_date;
  const endDate = gig?.posting_end_date;
  const gender = gig?.gender_requirement;
  const ageMin = gig?.age_min;
  const ageMax = gig?.age_max;

  const formatShortDate = ( iso?: string ) => {
    if ( !iso ) return '';
    return new Date( iso ).toLocaleDateString( undefined, { day: 'numeric', month: 'short', year: 'numeric' } );
  };

  const hasRequirements = gender || ageMin || ageMax || requirements;

  return (
    <HoverCard>
      <HoverCardTrigger
        render={ <button type="button" className="shrink-0" onClick={ e => e.stopPropagation() } /> }
        nativeButton={ false }
      >
        <HugeiconsIcon icon={ InformationCircleIcon } className="size-3.5 text-white/50 hover:text-white/90 transition-colors" strokeWidth={ 1.5 } />
      </HoverCardTrigger>
      <HoverCardContent side="top" align="start" sideOffset={ 8 } className="w-80 p-0 shadow-2xl overflow-hidden rounded-xl">
        <Card className="p-0 gap-0 overflow-hidden border-0">
          <div className={ cn( "p-3 flex flex-col gap-3" ) }>

            {/* Brand row */ }
            { brandName && (
              <div className="flex items-center gap-2">
                <Avatar className="size-6 shrink-0 ring-1 ring-border">
                  { brandLogoUrl && <AvatarImage src={ imgpresets.avatar( brandLogoUrl ) } alt={ brandName } /> }
                  <AvatarFallback className="text-[8px] font-medium">{ brandInitials }</AvatarFallback>
                </Avatar>
                <span className="text-xs text-muted-foreground truncate">{ brandName }</span>
              </div>
            ) }

            <div className='flex gap-4'>
              <div>
                {/* Gig title */ }
                <p className="card__title leading-snug">{ gig?.title || 'Untitled gig' }</p>
                {/* Meta pills */ }
                <div className="flex flex-wrap gap-2">
                  { numberOfVideos && (
                    <span className="inline-flex items-center gap-1 py-1">
                      <VideoIcon strokeWidth={ 1 } className='size-5' />
                      { numberOfVideos } { numberOfVideos !== 1 ? 'videos' : 'video' }
                    </span>
                  ) }
                  { durationSeconds && (
                    <>
                      <Separator orientation='vertical' className='h-8' />
                      <span className="inline-flex items-center gap-1 text-sm py-1">
                        <HugeiconsIcon icon={ Clock01Icon } className="size-4 text-muted-foreground" strokeWidth={ 1 } />
                        { durationSeconds }s
                      </span></>
                  ) }
                </div>
                {/* Posting dates */ }
                { ( startDate || endDate ) && (
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Calendar className="size-3.5 shrink-0" strokeWidth={ 1.5 } />
                    <span>Deadline / { formatShortDate( endDate ) }</span>
                  </div>
                ) }
              </div>

              {/* Campaign banner image */ }
              { coverImage && (
                <div className="relative aspect-video w-24 overflow-hidden rounded-sm">
                  <img src={ imgpresets.card( coverImage ) } alt="" className="absolute inset-0 w-full h-full object-cover object-[50%_20%]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
              ) }

            </div>

            {/* Creator Requirements — mirrors GigDetailsTab design */ }
            { hasRequirements && (
              <WrappedCard title="Creator Requirements" className="border-0 shadow-none bg-transparent" contentClass="bg-muted/30">
                <div className="flex items-start gap-3">
                  {/* Gender avatars */ }
                  <div className="flex flex-col gap-1 flex-1">
                    <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">Gender</span>
                    <div className="flex items-end gap-2">
                      <div className={ `flex flex-col items-center gap-0.5 transition-opacity ${ gender === 'female' ? 'opacity-20' : '' }` }>
                        <img src="/svg/avatar-male.svg" alt="Male" className="size-10" />
                        <span className="text-[10px] text-muted-foreground">Male</span>
                      </div>
                      <div className={ `flex flex-col items-center gap-0.5 transition-opacity ${ gender === 'male' ? 'opacity-20' : '' }` }>
                        <img src="/svg/avatar-female.svg" alt="Female" className="size-10" />
                        <span className="text-[10px] text-muted-foreground">Female</span>
                      </div>
                    </div>
                  </div>

                  <Separator orientation="vertical" className="self-stretch" />

                  {/* Age range */ }
                  <div className="flex flex-col gap-1 flex-1 items-end">
                    <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">Age range</span>
                    { ( ageMin || ageMax ) ? (
                      <div className="relative flex items-center mt-1">
                        <span className="relative z-10 text-base font-light bg-background px-2 py-0.5 rounded-md pr-4 border border-border shadow-sm z-40">{ ageMin ?? '—' }</span>
                        <ArrowRight strokeWidth={ 1 } className="relative z-50 size-6 text-muted-foreground bg-background rounded-full -ml-2 shadow-sm p-1" />
                        <span className="relative z-10 text-base -ml-6 pl-8 font-light bg-background px-2 py-0.5 rounded-md border border-border shadow-sm">{ ageMax ?? '—' }</span>
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground mt-1">Any</span>
                    ) }
                  </div>
                </div>

                { requirements && (
                  <>
                    <Separator className="opacity-60" />
                    <p className="text-xs text-muted-foreground line-clamp-3">{ requirements }</p>
                  </>
                ) }
              </WrappedCard>
            ) }

            { compensation && (
              <div className="flex items-center gap-2 justify-between">
                <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">Compensation</span>
                <span className="inline-flex items-center gap-1 text-lg text-foreground/80 rounded-full px-2.5 py-1 font-primary text-primary">
                  { formattedCompensation }
                </span>
              </div>
            ) }

            {/* Content guidelines (if no requirements block already covered it) */ }
            { guidelines && !hasRequirements && (
              <WrappedCard title="Content Guidelines" className="border-0 shadow-none bg-transparent" contentClass="bg-muted/30">
                <p className="text-xs text-muted-foreground line-clamp-3">{ guidelines }</p>
              </WrappedCard>
            ) }

          </div>
        </Card>
      </HoverCardContent>
    </HoverCard>
  );
}

// ─── Admin / Brand view — shows Creator details ───────────────────────────────

function AdminBrandInvitationCard( { invitation, onViewDetails, onViewCreatorDetails }: InvitationCardProps ) {
  const [ gigSheetOpen, setGigSheetOpen ] = useState( false );
  const creator = getInvitationCreator( invitation );
  const creatorName = `${ invitation.creator?.first_name || '' } ${ invitation.creator?.last_name || '' }`.trim() || invitation.creator?.email || 'Invited creator';

  const profileImage = invitation.creator?.profile_image?.asset;
  const gigTitle = invitation.gig?.title || 'Untitled gig';

  const handleCardClick = () => {
    if ( creator && onViewCreatorDetails ) {
      onViewCreatorDetails( creator );
    } else {
      onViewDetails( invitation );
    }
  };

  return (
    <>
      <CardShell
        backgroundImage={ profileImage ? imgpresets.card( profileImage ) : undefined }
        fallbackGradient="from-slate-700/80 via-slate-600/50 to-slate-500/30"
        onClick={ handleCardClick }
      >
        {/* Top row */ }
        <div className="absolute top-3 left-3 right-1 flex items-start justify-between" onClick={ e => e.stopPropagation() }>
          <InvitationStatusBadge status={ invitation.status } />
          <InvitationActionMenu invitation={ invitation } onViewDetails={ onViewDetails } />
        </div>

        {/* Center — creator avatar (only shown when no profile image) */ }
        {/* { !profileImage && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Avatar className="size-20 border-2 border-white/20">
              <AvatarFallback className="text-2xl bg-white/10 text-white">
                <HugeiconsIcon icon={ User02Icon } className="size-8" strokeWidth={ 1 } />
              </AvatarFallback>
            </Avatar>
          </div>
        ) } */}

        {/* Bottom content */ }
        <div className="absolute bottom-0 left-0 right-0 py-2 px-4 flex flex-col gap-1 bg-black/5 backdrop-blur m-2 rounded-2xl border border-white/10">

          {/* Title — creator name */ }
          <h3 className="text-white text-base font-primary font-normal leading-tight line-clamp-2">
            { creatorName }
          </h3>

          {/* Subtitle — gig title with info icon */ }
          <div className="flex items-center gap-1.5" onClick={ e => e.stopPropagation() }>
            <button
              className="text-burgundy-100/80 text-sm line-clamp-1 font-regular flex-1 min-w-0 text-left hover:text-burgundy-100 transition-colors"
              onClick={ () => setGigSheetOpen( true ) }
            >
              { gigTitle }
            </button>
            <GigInfoHoverCard invitation={ invitation } />
          </div>
        </div>
      </CardShell>

      <GigDetailsSheet
        gig={ invitation.gig as ModelsGigResponse ?? null }
        open={ gigSheetOpen }
        onOpenChange={ setGigSheetOpen }
        invitationId={ invitation.id }
        invitationStatus={ invitation.status }
      />
    </>
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
