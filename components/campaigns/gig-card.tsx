"use client";

import { Button } from '@/components/dashboard-ui/button';
import { Card, CardContent } from '@/components/dashboard-ui/card';
import { Separator } from '@/components/dashboard-ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/dashboard-ui/dialog';
import { Skeleton } from '@/components/dashboard-ui/skeleton';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/dashboard-ui/tooltip';
import { ModelsBrandResponse, ModelsGigResponse, ModelsVideoSubmissionResponse } from '@/lib/api/generated/models';
import { useVideoSubmissionsByGig } from '@/lib/api/hooks/video-submissions';
import { cn } from '@/lib/dashboard-utils';
import { useDelayedLoading } from '@/lib/hooks/use-delayed-loading';
import { useFormatCurrency } from '@/lib/hooks/format';
import { formatDate } from '@/lib/utils';
import { imgpresets } from '@/lib/utils/imgproxy';
import { Clock01Icon, InformationCircleIcon, PlayIcon, Video01Icon, VideoIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { memo, useCallback, useMemo, useState } from 'react';
import { RoleGuard } from '../auth/role-guard';
import { BrandAvatar } from './brand-avatar';
import { GigActionMenu } from './gig-action-menu';
import { GigStatusBadge } from './gig-status-badge';
import { SubmissionCard } from './submission-card';
import { SubmissionViewDialog } from './submission-view-dialog';
import { Badge } from '../dashboard-ui/badge';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface GigCardProps {
  gig: ModelsGigResponse;
  onViewGig: ( gig: ModelsGigResponse ) => void;
  onCreateSubmission?: ( gig: ModelsGigResponse ) => void;
}

// ─── Submissions button (brand/admin only) ────────────────────────────────────

interface GigSubmissionsButtonProps {
  gig: ModelsGigResponse;
  onSelectSubmission: ( sub: ModelsVideoSubmissionResponse ) => void;
}

const GigSubmissionsButton = memo( ( { gig, onSelectSubmission }: GigSubmissionsButtonProps ) => {
  const { data: submissionsData, isLoading } = useVideoSubmissionsByGig( gig.id! );
  const showLoading = useDelayedLoading( isLoading );
  const submissions = useMemo( () => submissionsData?.data ?? [], [ submissionsData ] );
  const count = submissions.length;

  if ( showLoading ) {
    return <Skeleton className="size-7 rounded-full" />;
  }

  if ( count === 0 ) return null;

  return (
    <>
      <Dialog>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger>
              <Button
                variant={ 'outline' }
                size={ 'icon-sm' }
                className={ 'rounded-full relative' }
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
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent side="top">View submissions</TooltipContent>
        </Tooltip>

        <DialogContent className="max-w-sm! max-h-[80vh] flex flex-col gap-0 p-0">
          <DialogHeader className="border-b border-border/50 px-5 py-4">
            <h5>Submissions</h5>
            <DialogTitle className={ 'dialog__title' }>{ gig.title } Gig</DialogTitle>
            <p className="text-xs text-muted-foreground">{ count } submission{ count !== 1 ? 's' : '' }</p>
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
    </>
  );
} );
GigSubmissionsButton.displayName = 'GigSubmissionsButton';

// ─── Main component ───────────────────────────────────────────────────────────

export function GigCard( { gig, onViewGig, onCreateSubmission }: GigCardProps ) {
  const [ selectedSubmission, setSelectedSubmission ] = useState<ModelsVideoSubmissionResponse | null>( null );

  const formattedCompensation = useFormatCurrency( gig.compensation ?? 0, 'EUR' );
  const formattedGigCost = useFormatCurrency( gig.gig_cost ?? 0, 'EUR' );

  const coverImage = useMemo(
    () => gig.campaign?.product_image_url ?? gig.campaign?.campaign_images?.[ 0 ],
    [ gig.campaign ]
  );

  const handleViewGig = useCallback( () => onViewGig( gig ), [ gig, onViewGig ] );
  const handleCreateSubmission = useCallback( () => onCreateSubmission?.( gig ), [ gig, onCreateSubmission ] );
  const handleSelectSubmission = useCallback( ( sub: ModelsVideoSubmissionResponse ) => setSelectedSubmission( sub ), [] );
  const handleCloseSubmission = useCallback( ( open: boolean ) => { if ( !open ) setSelectedSubmission( null ); }, [] );

  const rewardAmount = gig.compensation ?? gig.gig_cost;
  const formattedReward = gig.compensation ? formattedCompensation : formattedGigCost;

  return (
    <>
      <Card className='flex flex-col overflow-hidden relative gap-0 p-0 group'>

        {/* ── Header row: image + brand logo + action menu ── */ }
        <div className="flex items-start p-5 pb-0 gap-3 relative">
          { ( coverImage || gig.campaign?.brand ) &&
            <div className='flex gap-3 items-end'>
              { coverImage && (
                <div className="size-24 overflow-hidden shrink-0 bg-muted relative rounded-lg">
                  <img
                    src={ imgpresets.card( coverImage ) }
                    alt={ gig.title }
                    className="object-cover w-full h-full"
                  />
                </div>
              ) }
              { gig.campaign?.brand && (
                <BrandAvatar
                  brand={ gig.campaign.brand as ModelsBrandResponse }
                  className="size-8 rounded-full border bg-white"
                />
              ) }
            </div>
          }

          {/* Submissions button + action menu */ }
          <div className={ cn( 'flex items-center gap-1 ml-auto -mr-2', { "absolute right-4 top-4": !coverImage } ) }>
            <RoleGuard allowedRoles={ [ 'brand', 'admin' ] }>
              { gig.id && (
                <GigSubmissionsButton gig={ gig } onSelectSubmission={ handleSelectSubmission } />
              ) }
            </RoleGuard>
            <GigActionMenu gig={ gig } onViewGig={ onViewGig } trigger="icon" />
          </div>
        </div>

        {/* ── Title + description ── */ }
        <div className={ cn( "px-4 pb-0", { "pt-3": coverImage } ) }>
          <h3
            className="card__title cursor-pointer hover:underline truncate"
            onClick={ handleViewGig }
          >
            { gig.title }
          </h3>
          <p className="card__description line-clamp-2 text-muted-foreground/70">
            { gig.campaign_name ?? gig.title }
          </p>
        </div>

        <CardContent className="px-4 pt-3 pb-4 flex flex-col gap-3 flex-1">
          {/* ── Task / Reward two-column block ── */ }
          <div className="grid grid-cols-2 gap-3">

            {/* TASK column */ }
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-medium tracking-widest text-muted-foreground uppercase">Task</span>
              <div className="flex items-center gap-1.5">
                <HugeiconsIcon icon={ Video01Icon } className="size-3.5 text-muted-foreground shrink-0" strokeWidth={ 1.5 } />
                <span className="text-xs text-foreground">
                  Record { gig.number_of_videos } video{ ( gig.number_of_videos ?? 1 ) !== 1 ? 's' : '' }
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <HugeiconsIcon icon={ Clock01Icon } className="size-3.5 text-muted-foreground shrink-0" strokeWidth={ 1.5 } />
                <span className="text-xs text-foreground">
                  Duration: { gig.video_duration_in_seconds } seconds
                </span>
              </div>
            </div>

            {/* REWARD column */ }
            { rewardAmount ? (
              <div className="flex flex-col gap-1.5 text-right">
                <RoleGuard allowedRoles={ [ 'brand' ] }>
                  <span className="text-[10px] font-medium tracking-widest text-muted-foreground uppercase">Gig Cost</span>
                </RoleGuard>
                <RoleGuard excludedRoles={ [ 'brand' ] }>
                  <span className="text-[10px] font-medium tracking-widest text-muted-foreground uppercase">Reward</span>
                </RoleGuard>
                <span className="text-2xl font-primary text-primary leading-none">
                  { formattedReward }
                </span>
              </div>
            ) : null }
          </div>

          {/* ── Deadline / Status row ── */ }
          <div className="flex items-center justify-between border-t border-border/50 mt-auto pt-2">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <HugeiconsIcon icon={ InformationCircleIcon } className="size-3.5" strokeWidth={ 1.5 } />
              <span className="uppercase tracking-widest text-[10px] font-medium">Deadline</span>
              { gig.posting_end_date && (
                <span className="text-xs text-muted-foreground/60">{ formatDate( gig.posting_end_date ) }</span>
              ) }
            </div>
            <GigStatusBadge status={ gig.gig_status } className="origin-right" />
          </div>

          { onCreateSubmission && (
            <div className='flex w-full gap-2 mt-auto pt-4'>
              <Button variant="outline" size="sm" className="flex-1 font-normal" onClick={ handleViewGig }>
                View Gig
              </Button>
              <Button variant="outline" size="sm" className="flex-1 font-normal" onClick={ handleCreateSubmission }>
                Create Submission
              </Button>
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
}
