"use client";

import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/dashboard-ui/card';
import { GigStatusBadge } from './gig-status-badge';
import { formatDate, formatCurrency } from '@/lib/utils';
import { HugeiconsIcon } from '@hugeicons/react';
import { Video01Icon, Clock01Icon } from '@hugeicons/core-free-icons';
import { ModelsGigResponse } from '@/lib/api/generated/models';
import { GigActionsDropdown } from './gig-actions-dropdown';

interface GigCardProps {
  gig: ModelsGigResponse;
  onViewGig: ( gig: ModelsGigResponse ) => void;
}

export function GigCard( { gig, onViewGig }: GigCardProps ) {
  const {
    title,
    gig_status,
    posting_start_date,
    posting_end_date,
    compensation,
    number_of_videos,
    video_duration_in_seconds,
  } = gig;

  return (
    <Card className='p-0 py-3 pb-0 justify-between h-full'>
      <CardHeader className='px-4'>
        <div className="flex justify-between items-start w-full">
          <CardTitle
            className='capitalize text-[18px] font-medium! text-primary line-clamp-1 cursor-pointer hover:underline'
            onClick={ () => onViewGig( gig ) }
          >
            { title }
          </CardTitle>
          <CardAction className='-mr-2'>
            <GigActionsDropdown
              gig={ gig }
              onViewGig={ onViewGig }
              trigger="icon"
            />
          </CardAction>
        </div>
      </CardHeader>
      <CardContent className='space-y-4 pt-2 px-4'>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/20 p-2 rounded-md">
            <HugeiconsIcon icon={ Video01Icon } className="size-4" />
            <span>{ number_of_videos } Video{ number_of_videos !== 1 ? 's' : '' }</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/20 p-2 rounded-md">
            <HugeiconsIcon icon={ Clock01Icon } className="size-4" />
            <span>{ video_duration_in_seconds }s</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className='flex-col gap-2 bg-muted/30 py-3 px-4 rounded-b-xl border-t'>
        <div className="flex justify-between items-center w-full">
          <GigStatusBadge status={ gig_status } />
          <span className='text-sm font-semibold text-primary'>
            { formatCurrency( compensation! ) }
          </span>
        </div>
        <div className="border-t border-border/50 w-full"></div>
        <div className="flex justify-between w-full text-xs text-muted-foreground">
          <span>Start: { formatDate( posting_start_date! ) }</span>
          <span>End: { formatDate( posting_end_date! ) }</span>
        </div>
      </CardFooter>
    </Card>
  );
}
