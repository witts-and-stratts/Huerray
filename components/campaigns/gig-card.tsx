"use client";

import { Button, buttonVariants } from '@/components/dashboard-ui/button';
import { Card, CardContent } from '@/components/dashboard-ui/card';
import { Separator } from '@/components/dashboard-ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/dashboard-ui/dialog';
import { Skeleton } from '@/components/dashboard-ui/skeleton';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/dashboard-ui/tooltip';
import { ModelsBrandResponse, ModelsGigResponse, ModelsVideoSubmissionResponse } from '@/lib/api/generated/models';
import { useMyVideoSubmissions, useVideoSubmissionsByGig } from '@/lib/api/hooks/video-submissions';
import { cn } from '@/lib/dashboard-utils';
import { useDelayedLoading } from '@/lib/hooks/use-delayed-loading';
import { useFormatCurrency } from '@/lib/hooks/format';
import { formatDate } from '@/lib/utils';
import { imgpresets } from '@/lib/utils/imgproxy';
import { Clock01Icon, InformationCircleIcon, PlayIcon, Video01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { ComponentProps, memo, useCallback, useMemo, useState } from 'react';
import { RoleGuard } from '../auth/role-guard';
import { BrandAvatar } from './brand-avatar';
import { BrandHoverCard } from './brand-hover-card';
import { GigActionMenu } from './gig-action-menu';
import { GigStatusBadge } from './gig-status-badge';
import { SubmissionCard } from './submission-card';
import { SubmissionViewDialog } from './submission-view-dialog';
import { Badge } from '../dashboard-ui/badge';
import { useTranslations } from 'next-intl';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface GigCardProps {
  gig: ModelsGigResponse;
  onViewGig: ComponentProps<typeof GigActionMenu>[ 'onViewGig' ];
  onCreateSubmission?: ( gig: ModelsGigResponse ) => void;
}

// ─── Submissions button (brand/admin only) ────────────────────────────────────

interface GigSubmissionsButtonProps {
  gig: ModelsGigResponse;
  onSelectSubmission: ( sub: ModelsVideoSubmissionResponse ) => void;
}

const GigSubmissionsButton = memo( ( { gig, onSelectSubmission }: GigSubmissionsButtonProps ) => {
  const tInv = useTranslations( 'dashboard.creator.invitations.actions' );
  const tCampaigns = useTranslations( 'dashboard.brand.campaignsPage' );
  const { data: submissionsData, isLoading } = useVideoSubmissionsByGig( gig.id! );
  const showLoading = useDelayedLoading( isLoading );
  const submissions = useMemo( () => submissionsData?.data ?? [], [ submissionsData ] );
  const count = submissions.length;

  if ( showLoading ) {
    return <Skeleton className="size-7 rounded-full" />;
  }

  if ( count === 0 ) return null;

  return (
    <Dialog>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger
            render={
              <button
                type="button"
                className={ cn(
                  buttonVariants( { variant: 'outline', size: 'icon-sm' } ),
                  'rounded-full relative'
                ) }
              >
                <HugeiconsIcon icon={ PlayIcon } className="size-3.5" strokeWidth={ 1.5 } />
                <Badge
                  className={ cn(
                    "absolute -top-1.5 -right-1.5 min-w-4 h-4 px-1",
                    "flex items-center justify-center",
                    "rounded-full bg-primary text-primary-foreground",
                    "text-[9px] font-semibold leading-none"
                  ) }>
                  { count }
                </Badge>
              </button>
            }
          />
        </TooltipTrigger>
        <TooltipContent side="top">{ tInv( 'viewSubmissions' ) }</TooltipContent>
      </Tooltip>

      <DialogContent className="max-w-sm! max-h-[80vh] flex flex-col gap-0 p-0">
        <DialogHeader className="border-b border-border/50 px-2 md:px-5 py-2 md:py-4">
          <h5>{ tCampaigns( 'actions.submissions' ) }</h5>
          <DialogTitle className={ 'dialog__title' }>{ gig.title } Gig</DialogTitle>
          <p className="text-xs text-muted-foreground">{ tCampaigns( 'submissionCount', { count } ) }</p>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-1 gap-3">
            { submissions.map( ( sub ) => (
              <SubmissionCard
                key={ sub.id }
                submission={ sub }
                showActions={ false }
                onExpand={ () => onSelectSubmission( sub ) }
              />
            ) ) }
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} );
GigSubmissionsButton.displayName = 'GigSubmissionsButton';

// ─── Header ───────────────────────────────────────────────────────────────────

interface GigCardHeaderProps {
  gig: ModelsGigResponse;
  coverImage: string | undefined;
  onViewGig: ComponentProps<typeof GigActionMenu>[ 'onViewGig' ];
  onSelectSubmission: ( sub: ModelsVideoSubmissionResponse ) => void;
}

const GigCardHeader = memo( ( { gig, coverImage, onViewGig, onSelectSubmission }: GigCardHeaderProps ) => (
  <div className="flex items-start px-4 pt-4 pb-0 gap-3">
    {/* Title + description */ }
    <div className="flex flex-col flex-1 min-w-0">
      <h3
        className="card__title cursor-pointer hover:underline truncate"
        onClick={ () => onViewGig( gig ) }
      >
        { gig.title }
      </h3>
      <p className="card__description line-clamp-2 text-muted-foreground/70">
        { gig.campaign_name ?? gig.title }
      </p>
    </div>

    {/* Cover image + brand avatar overlay */ }
    <div className={ cn( "flex items-start relative shrink-0", { "size-12": coverImage } ) }>
      { coverImage && (
        <div className="size-12 bg-muted overflow-hidden rounded-full shrink-0">
          <img
            src={ imgpresets.card( coverImage ) }
            alt={ gig.title }
            className="object-cover w-full h-full"
          />
        </div>
      ) }
      { gig.campaign?.brand && (
        <BrandHoverCard brand={ gig.campaign.brand as any } brandName={ gig.campaign.brand.company_name }>
          <BrandAvatar
            brand={ gig.campaign.brand as ModelsBrandResponse }
            className={ cn( "rounded-full border bg-white hover:ring-2 hover:ring-primary/30 transition-shadow cursor-pointer shrink-0", {
              "absolute -right-2 -bottom-1 size-6 p-0.5": coverImage,
              "size-8": !coverImage,
            } ) }
          />
        </BrandHoverCard>
      ) }
    </div>

    {/* Submissions button + action menu */ }
    <div className="flex items-center gap-1 -mr-2">
      <RoleGuard allowedRoles={ [ 'brand', 'admin' ] }>
        { gig.id && (
          <GigSubmissionsButton gig={ gig } onSelectSubmission={ onSelectSubmission } />
        ) }
      </RoleGuard>
      <GigActionMenu gig={ gig } onViewGig={ onViewGig } trigger="icon" />
    </div>
  </div>
) );
GigCardHeader.displayName = 'GigCardHeader';

// ─── Task block ───────────────────────────────────────────────────────────────

interface GigTaskBlockProps {
  numberOfVideos: number | undefined;
  videoDuration: number | undefined;
}

const GigTaskBlock = memo( function GigTaskBlock( { numberOfVideos, videoDuration }: GigTaskBlockProps ) {
  const t = useTranslations( 'dashboard.brand.campaignsPage' );
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[10px] font-medium tracking-widest text-muted-foreground uppercase">{ t( 'task' ) }</span>
      <div className="flex items-center gap-1.5">
        <HugeiconsIcon icon={ Video01Icon } className="size-3.5 text-muted-foreground shrink-0" strokeWidth={ 1.5 } />
        <span className="text-xs text-foreground">
          { t( 'recordVideos', { count: numberOfVideos ?? 0 } ) }
        </span>
      </div>
      <div className="flex items-center gap-1.5">
        <HugeiconsIcon icon={ Clock01Icon } className="size-3.5 text-muted-foreground shrink-0" strokeWidth={ 1.5 } />
        <span className="text-xs text-foreground">
          { t( 'durationSeconds', { count: videoDuration ?? 0 } ) }
        </span>
      </div>
    </div>
  );
} );
GigTaskBlock.displayName = 'GigTaskBlock';

// ─── Reward block ─────────────────────────────────────────────────────────────

interface GigRewardBlockProps {
  formattedReward: string;
}

const GigRewardBlock = memo( function GigRewardBlock( { formattedReward }: GigRewardBlockProps ) {
  const t = useTranslations( 'dashboard.brand.campaignsPage' );
  return (
    <div className="flex flex-col gap-1.5 text-right">
      <RoleGuard allowedRoles={ [ 'brand' ] }>
        <span className="text-[10px] font-medium tracking-widest text-muted-foreground uppercase">{ t( 'gigCost' ) }</span>
      </RoleGuard>
      <RoleGuard excludedRoles={ [ 'brand' ] }>
        <span className="text-[10px] font-medium tracking-widest text-muted-foreground uppercase">{ t( 'reward' ) }</span>
      </RoleGuard>
      <span className="text-xl font-primary text-primary leading-none">
        { formattedReward }
      </span>
    </div>
  );
} );
GigRewardBlock.displayName = 'GigRewardBlock';

// ─── Deadline row ─────────────────────────────────────────────────────────────

interface GigDeadlineRowProps {
  postingEndDate: string | undefined;
  gigStatus: string | undefined;
}

const GigDeadlineRow = memo( function GigDeadlineRow( { postingEndDate, gigStatus }: GigDeadlineRowProps ) {
  const t = useTranslations( 'dashboard.brand.campaignsPage' );
  return (
    <div className="flex items-center justify-between border-t border-border/50 mt-auto pt-2">
      <div className="flex items-center gap-1.5 text-muted-foreground">
        <HugeiconsIcon icon={ InformationCircleIcon } className="size-3.5" strokeWidth={ 1.5 } />
        <span className="uppercase tracking-widest text-[10px] font-medium">{ t( 'deadline' ) }</span>
        { postingEndDate && (
          <span className="text-xs text-muted-foreground/60">{ formatDate( postingEndDate ) }</span>
        ) }
      </div>
      <GigStatusBadge status={ gigStatus } className="origin-right" />
    </div>
  );
} );
GigDeadlineRow.displayName = 'GigDeadlineRow';

// ─── Creator submission button ────────────────────────────────────────────────

interface CreatorSubmissionButtonProps {
  gig: ModelsGigResponse;
  onCreateSubmission: ( gig: ModelsGigResponse ) => void;
  onViewGig: ComponentProps<typeof GigActionMenu>[ 'onViewGig' ];
}

const CreatorSubmissionButton = memo( function CreatorSubmissionButton( { gig, onCreateSubmission, onViewGig }: CreatorSubmissionButtonProps ) {
  const tInv = useTranslations( 'dashboard.creator.invitations.actions' );
  const { data, isLoading } = useMyVideoSubmissions( { gigId: gig.id! }, { enabled: !!gig.id } );
  const showLoading = useDelayedLoading( isLoading );

  if ( showLoading ) {
    return <Skeleton className="h-8 w-full rounded-md" />;
  }

  const count = data?.data?.length ?? 0;

  if ( count > 0 ) {
    const label = count === 1 ? tInv( 'viewSubmission' ) : tInv( 'viewSubmissions' );
    return (
      <Button variant="outline" size="sm" className="flex-1 font-normal" onClick={ () => onViewGig( gig, 'submissions' ) }>
        { label }
      </Button>
    );
  }

  return (
    <Button variant="outline" size="sm" className="flex-1 font-normal" onClick={ () => onCreateSubmission( gig ) }>
      { tInv( 'createSubmission' ) }
    </Button>
  );
} );
CreatorSubmissionButton.displayName = 'CreatorSubmissionButton';

// ─── Main component ───────────────────────────────────────────────────────────

export const GigCard = memo( function GigCard( { gig, onViewGig, onCreateSubmission }: GigCardProps ) {
  const [ selectedSubmission, setSelectedSubmission ] = useState<ModelsVideoSubmissionResponse | null>( null );

  const formatCurrency = useFormatCurrency();
  const formattedCompensation = formatCurrency( gig.compensation?.value ?? 0, gig.compensation?.currency || 'EUR' );
  const formattedGigCost = formatCurrency( gig.gig_cost?.value ?? 0, gig.gig_cost?.currency || 'EUR' );

  const coverImage = useMemo(
    () => gig.campaign?.product_image?.asset ?? gig.campaign?.campaign_images?.[ 0 ]?.asset,
    [ gig.campaign ]
  );

  const rewardAmount = gig.compensation?.value ?? gig.gig_cost?.value;
  const formattedReward = gig.compensation?.value ? formattedCompensation : formattedGigCost;

  const handleSelectSubmission = useCallback( ( sub: ModelsVideoSubmissionResponse ) => setSelectedSubmission( sub ), [] );
  const handleCloseSubmission = useCallback( ( open: boolean ) => { if ( !open ) setSelectedSubmission( null ); }, [] );

  return (
    <>
      <Card className='flex flex-col overflow-hidden relative gap-0 p-0 group h-full'>

        <GigCardHeader
          gig={ gig }
          coverImage={ coverImage }
          onViewGig={ onViewGig }
          onSelectSubmission={ handleSelectSubmission }
        />

        <CardContent className="px-4 pt-4 pb-4 flex flex-col gap-3 flex-1">
          {/* ── Task / Reward two-column block ── */ }
          <div className="grid grid-cols-2 gap-3">
            <GigTaskBlock
              numberOfVideos={ gig.number_of_videos }
              videoDuration={ gig.video_duration_in_seconds }
            />
            { rewardAmount ? (
              <GigRewardBlock formattedReward={ formattedReward } />
            ) : null }
          </div>

          <GigDeadlineRow
            postingEndDate={ gig.posting_end_date }
            gigStatus={ gig.gig_status }
          />

          { onCreateSubmission && (
            <div className='flex w-full gap-2 mt-auto pt-4'>
              <CreatorSubmissionButton gig={ gig } onCreateSubmission={ onCreateSubmission } onViewGig={ onViewGig } />
            </div>
          ) }
        </CardContent>
      </Card>

      { selectedSubmission && (
        <SubmissionViewDialog
          open
          onOpenChange={ handleCloseSubmission }
          submission={ selectedSubmission }
        />
      ) }
    </>
  );
} );
GigCard.displayName = 'GigCard';
