"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/dashboard-ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/dashboard-ui/avatar';
import { DollarSign, Video } from 'lucide-react';
import { cn } from '@/lib/dashboard-utils';
import {
  CheckmarkCircle01Icon,
  CircleIcon,
  Clock01Icon,
  Cancel01Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { TextCapitalize } from '@/components/text-case';
import { ModelsGigApplicationResponse } from '@/lib/api/generated/models';
import { ApplicationActionMenu } from './application-action-menu';

const applicationStatusConfig: Record<string, { label: string; color: string; icon: any; }> = {
  pending: {
    label: 'Pending',
    color: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
    icon: Clock01Icon,
  },
  approved: {
    label: 'Approved',
    color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
    icon: CheckmarkCircle01Icon,
  },
  accepted: {
    label: 'Accepted',
    color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
    icon: CheckmarkCircle01Icon,
  },
  rejected: {
    label: 'Rejected',
    color: 'bg-red-500/10 text-red-600 border-red-500/20',
    icon: Cancel01Icon,
  },
  declined: {
    label: 'Declined',
    color: 'bg-red-500/10 text-red-600 border-red-500/20',
    icon: Cancel01Icon,
  },
};

function ApplicationStatusBadge( { status, className }: { status?: string; className?: string; } ) {
  const config = applicationStatusConfig[ status?.toLowerCase() || '' ] || {
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

interface ApplicationCardProps {
  application: ModelsGigApplicationResponse;
}

export function ApplicationCard( { application }: ApplicationCardProps ) {
  const creator = application.creator;
  const gig = application.gig;
  const creatorName = `${ creator?.first_name || '' } ${ creator?.last_name || '' }`.trim() || creator?.email || 'Unknown';

  return (
    <Card className="py-3 justify-between gap-1">
      <CardHeader className="flex items-start justify-between gap-4 mb-2 pr-1">
        <div className="flex flex-col flex-1 min-w-0">
          <CardTitle className="capitalize text-[18px] font-normal text-primary font-primary truncate">
            { gig?.title || 'Untitled Gig' }
          </CardTitle>
          <CardDescription className="text-muted-foreground/70 text-sm line-clamp-1">
            { creatorName }
          </CardDescription>
        </div>
        <div className="flex shrink-0 text-right gap-2 items-start">
          <Avatar className="size-10 border bg-white rounded-full shrink-0">
            <AvatarImage src={ creator?.profile_image_url } alt={ creatorName } className="object-cover" />
            <AvatarFallback className="rounded-full text-xs">
              { creatorName.slice( 0, 2 ).toUpperCase() }
            </AvatarFallback>
          </Avatar>
          <ApplicationActionMenu application={ application } />
        </div>
      </CardHeader>

      <CardContent className="space-y-3 pb-2">
        { application.message && (
          <div className="text-sm text-muted-foreground/70 line-clamp-2 italic">
            &quot;{ application.message }&quot;
          </div>
        ) }

        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          { gig?.compensation != null && (
            <div className="flex items-center gap-1">
              <DollarSign className="size-3.5" />
              <span className="text-xs">{ gig.compensation ? `$${ gig.compensation }` : 'Unpaid' }</span>
            </div>
          ) }
          <div className="flex items-center gap-1">
            <Video className="size-3.5" />
            <span className="text-xs">{ gig?.number_of_videos || 1 } video{ ( gig?.number_of_videos || 1 ) > 1 ? 's' : '' }</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="text-xs text-muted-foreground/60">
            Applied{ ' ' }
            { application.applied_at
              ? Intl.DateTimeFormat( 'en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              } ).format( new Date( application.applied_at ) )
              : 'Unknown date' }
          </span>
        </div>

        <div className="mt-2">
          <ApplicationStatusBadge status={ application.status } />
        </div>
      </CardContent>
    </Card>
  );
}
