"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/dashboard-ui/card';
import { GigStatusBadge } from './gig-status-badge';
import { formatCurrency } from '@/lib/utils';
import { HugeiconsIcon } from '@hugeicons/react';
import { Video01Icon, Clock01Icon } from '@hugeicons/core-free-icons';
import { ModelsGigResponse } from '@/lib/api/generated/models';
import { GigActionMenu } from './gig-action-menu';
import { Button } from '@/components/dashboard-ui/button';

interface GigCardProps {
  gig: ModelsGigResponse;
  onViewGig: ( gig: ModelsGigResponse ) => void;
  onCreateSubmission?: ( gig: ModelsGigResponse ) => void;
}

export function GigCard( { gig, onViewGig, onCreateSubmission }: GigCardProps ) {
  const {
    title,
    gig_status,
    posting_start_date,
    posting_end_date,
    compensation,
    number_of_videos,
    video_duration_in_seconds,
    campaign_name,
  } = gig;

  return (
    <Card className="py-3 justify-between gap-1">
      <CardHeader className="flex items-start justify-between gap-4 mb-2 pr-1">
        <div className="flex flex-col flex-1 min-w-0">
          <CardTitle
            className="capitalize text-[18px] font-normal text-primary font-primary truncate cursor-pointer hover:underline"
            onClick={ () => onViewGig( gig ) }
          >
            { title }
          </CardTitle>
          { campaign_name && (
            <CardDescription className="text-muted-foreground/70 text-sm line-clamp-1">
              { campaign_name }
            </CardDescription>
          ) }
        </div>
        <div className="flex shrink-0 text-right gap-2 items-start">
          <GigActionMenu
            gig={ gig }
            onViewGig={ onViewGig }
            trigger="icon"
          />
        </div>
      </CardHeader>

      <CardContent className="space-y-3 pb-2">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <HugeiconsIcon icon={ Video01Icon } className="size-3.5" />
            <span className="text-xs">{ number_of_videos } video{ number_of_videos !== 1 ? 's' : '' }</span>
          </div>
          <div className="flex items-center gap-1">
            <HugeiconsIcon icon={ Clock01Icon } className="size-3.5" />
            <span className="text-xs">{ video_duration_in_seconds }s</span>
          </div>
          { compensation != null && (
            <span className="text-xs font-semibold text-primary">
              { formatCurrency( compensation ) }
            </span>
          ) }
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          { posting_start_date && (
            <span className="text-xs text-muted-foreground/60">
              Start{ ' ' }
              { Intl.DateTimeFormat( 'en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              } ).format( new Date( posting_start_date ) ) }
            </span>
          ) }
          { posting_start_date && posting_end_date && (
            <span className="text-muted-foreground/30">&middot;</span>
          ) }
          { posting_end_date && (
            <span className="text-xs text-muted-foreground/60">
              End{ ' ' }
              { Intl.DateTimeFormat( 'en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              } ).format( new Date( posting_end_date ) ) }
            </span>
          ) }
        </div>

        <div className="mt-2 flex items-center justify-between">
          <GigStatusBadge status={ gig_status } />
          { onCreateSubmission && (
            <Button
              variant="outline"
              size="sm"
              onClick={ () => onCreateSubmission( gig ) }
            >
              Create Submission
            </Button>
          ) }
        </div>
      </CardContent>
    </Card>
  );
}
