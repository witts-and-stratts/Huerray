"use client";

import { Cancel01Icon, CheckmarkCircle01Icon, Clock01Icon, Coins01Icon, Video01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import type { ComponentProps, FocusEvent } from 'react';
import { useState } from 'react';

import { Card, CardContent } from '@/components/dashboard-ui/card';
import { cn } from '@/lib/dashboard-utils';
import { ModelsCreatorResponse, ModelsGigInvitationResponse } from '@/lib/api/generated/models';
import { InvitationActionMenu } from './invitation-action-menu';
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
import { useFormatCurrency } from '@/lib/hooks/format';
import { imgpresets } from '@/lib/utils/imgproxy';
import { CircleIcon } from '@hugeicons/core-free-icons';
import { TextCapitalize } from '../text-case';
import { WrappedCard } from '../dashboard-ui/wrapped-card';
import { Badge } from '../dashboard-ui/badge';

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
      "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border scale-90 origin-right whitespace-nowrap",
      config.color,
      className
    ) }>
      <HugeiconsIcon icon={ config.icon } className="w-3 h-3" />
      <TextCapitalize>{ config.label }</TextCapitalize>
    </div>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface InvitationCardProps {
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

// ─── Main component ───────────────────────────────────────────────────────────

export function InvitationCard( { invitation, onViewDetails, onViewCreatorDetails }: InvitationCardProps ) {
  const [ showAcceptDialog, setShowAcceptDialog ] = useState( false );
  const [ showRejectDialog, setShowRejectDialog ] = useState( false );
  const [ acceptComment, setAcceptComment ] = useState( '' );
  const [ rejectComment, setRejectComment ] = useState( '' );
  const { mutate: respondToInvitation, isPending: isResponding } = useRespondToInvitation();
  const role = useRole();

  const gig = invitation.gig;
  const gigTitle = gig?.title || 'Untitled gig';
  const brandName = gig?.brand_name || gig?.brand?.company_name || '';
  const brand = gig?.brand;
  const isPending = ( invitation.status || '' ).toLowerCase() === 'pending';
  const creator = getInvitationCreator( invitation );
  const creatorName = `${ invitation.creator?.first_name || '' } ${ invitation.creator?.last_name || '' }`.trim() || invitation.creator?.email || 'Invited creator';

  const coverImage = gig?.campaign?.product_image?.asset ?? gig?.campaign?.campaign_images?.[ 0 ]?.asset;
  const compensation = gig?.compensation?.value;
  const formattedCompensation = useFormatCurrency( compensation ?? 0, gig?.compensation?.currency || 'EUR' );
  const numberOfVideos = gig?.number_of_videos ?? invitation.number_of_videos;
  const durationSeconds = gig?.video_duration_in_seconds;
  const enforceSingle = gig?.enforce_single_creator_submission;
  const enforceUnique = gig?.enforce_unique_creator_submission;

  const handleRespond = ( status: 'accepted' | 'declined', comment?: string ) => {
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

  const handleTitleClick = () => {
    if ( role === 'creator' ) { onViewDetails( invitation ); return; }
    if ( creator && onViewCreatorDetails ) { onViewCreatorDetails( creator ); return; }
    onViewDetails( invitation );
  };

  const cardBorderClass = invitation.status?.toLowerCase() === 'accepted'
    ? 'border-emerald-500/60 shadow-[0_12px_30px_-26px_rgba(16,185,129,0.65)]'
    : 'border-border/70';

  return (
    <>
      <Card className={ cn( 'flex flex-col overflow-hidden relative gap-0 p-0 group min-h-[200px]', cardBorderClass ) }>

        {/* ── Cover image + brand/creator avatar + action menu ── */ }
        <div className="flex items-start p-0 gap-3 absolute w-full h-full">
          { coverImage && (
            <div className="w-full h-full overflow-hidden shrink-0 bg-muted absolute top-0 left-0">
              <img
                src={ imgpresets.card( coverImage ) }
                alt={ gigTitle }
                className="object-cover w-full h-full"
              />
              {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-card" /> */ }
            </div>
          ) }
        </div>

        {/* ── Title block ── */ }
        <WrappedCard
          title='Invitation'
          className={ cn( 'm-1 relative bg-white/60 backdrop-blur-2xl transition-all duration-300', { "translate-y-20": !coverImage, "group-hover:translate-y-0": !coverImage } ) }
          contentClass='pb-0 bg-background/50'
        >
          <div className='flex justify-between gap-2'>
            <div>
              <h3
                className="card__title cursor-pointer hover:underline truncate leading-tight mt-0"
                onClick={ handleTitleClick }
              >
                { role === 'creator' ? gigTitle : creatorName }
              </h3>
              <p className="card__description line-clamp-1 text-muted-foreground/70">
                { role === 'creator' ? ( brandName ? `by ${ brandName }` : '' ) : gigTitle }
              </p>
            </div>

            {/* Avatar + menu — absolutely positioned top-right */ }
            <div className="flex items-start gap-1">
              <RoleGuard allowedRoles={ [ 'creator' ] }>
                { brand && (
                  <BrandAvatar brand={ brand } className="size-8 rounded-full border-2 border-white bg-white shadow-sm" />
                ) }
              </RoleGuard>
              <RoleGuard allowedRoles={ [ 'brand', 'admin' ] }>
                <Avatar className="size-12">
                  { invitation.creator?.profile_image?.asset && <AvatarImage src={ invitation.creator.profile_image.asset } alt={ creatorName } className="object-cover" /> }
                  <AvatarFallback className="text-xs">{ creatorName.slice( 0, 2 ).toUpperCase() }</AvatarFallback>
                </Avatar>
              </RoleGuard>
              <div className="-mr-2">
                <InvitationActionMenu invitation={ invitation } onViewDetails={ onViewDetails } />
              </div>
            </div>
          </div>

          <CardContent className="px-0 pt-3 pb-4 flex flex-col gap-3 flex-1">
            {/* ── Earn pill (creator only) ── */ }
            { compensation ? (
              <RoleGuard allowedRoles={ [ 'creator' ] }>
                <div className="flex flex-col gap-1.5 self-start  py-1 rounded-full border border-amber-500/2">
                  <div className='inline-flex gap-1.5'><HugeiconsIcon icon={ Coins01Icon } className="size-3.5" strokeWidth={ 1.5 } />Earn </div>
                  <div className="text-sm font-medium flex flex-col"><span className='text-2xl font-primary text-primary leading-none font-normal'>{ formattedCompensation }</span></div>
                </div>
              </RoleGuard>
            ) : null }

            {/* ── Task details ── */ }
            <div className="flex flex-col gap-1.5">
              { ( numberOfVideos || durationSeconds ) && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  { numberOfVideos && (
                    <span className="flex items-center gap-1">
                      <HugeiconsIcon icon={ Video01Icon } className="size-3.5 shrink-0" strokeWidth={ 1.5 } />
                      { numberOfVideos } video{ numberOfVideos !== 1 ? 's' : '' }
                    </span>
                  ) }
                  { numberOfVideos && durationSeconds && <span className="text-muted-foreground/30">•</span> }
                  { durationSeconds && (
                    <span className="flex items-center gap-1">
                      <HugeiconsIcon icon={ Clock01Icon } className="size-3.5 shrink-0" strokeWidth={ 1.5 } />
                      { durationSeconds } seconds
                    </span>
                  ) }
                </div>
              ) }
              { enforceSingle && (
                <Badge variant={ 'outline' } className="text-xs text-muted-foreground bg-background">Single submission</Badge>
              ) }
              { enforceUnique && (
                <Badge variant={ 'outline' } className="text-xs text-muted-foreground bg-background">Unique submission</Badge>
              ) }
            </div>

            {/* ── Date range ── */ }
            { ( gig?.posting_start_date || gig?.posting_end_date ) && (
              <p className="text-xs text-muted-foreground/70">
                { gig.posting_start_date ? formatDate( gig.posting_start_date ) : '' }
                { gig.posting_start_date && gig.posting_end_date ? ' – ' : '' }
                { gig.posting_end_date ? formatDate( gig.posting_end_date ) : '' }
              </p>
            ) }

            {/* ── Status row (brand/admin) or spacer ── */ }
            <RoleGuard excludedRoles={ [ 'creator' ] }>
              <div className="flex items-center justify-between border-t border-border/50 mt-auto pt-2">
                <InvitationStatusBadge status={ invitation.status } />
                { invitation.response_at ? (
                  <span className="text-xs text-muted-foreground/60">{ formatDate( invitation.response_at ) }</span>
                ) : (
                  <span className="text-xs text-muted-foreground/60">Awaiting response</span>
                ) }
              </div>
            </RoleGuard>

            {/* ── Accept / Decline buttons (creator, pending only) ── */ }
            <RoleGuard allowedRoles={ [ 'creator' ] }>
              { isPending ? (
                <div className="flex w-full gap-2 mt-auto pt-2 border-t border-border/50">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 font-normal"
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
                    Accept Invite
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-between border-t border-border/50 mt-auto pt-2">
                  <InvitationStatusBadge status={ invitation.status } />
                  { invitation.response_at ? (
                    <span className="text-xs text-muted-foreground/60">{ formatDate( invitation.response_at ) }</span>
                  ) : (
                    <span className="text-xs text-muted-foreground/60">Awaiting response</span>
                  ) }
                </div>
              ) }
            </RoleGuard>

          </CardContent>
        </WrappedCard>
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
        title="Decline Invitation"
        description="Are you sure you want to decline this invitation? This action cannot be undone."
        confirmLabel="Decline"
        confirmDisabled={ !rejectComment.trim() }
        onConfirm={ () => handleRespond( 'declined', rejectComment ) }
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
