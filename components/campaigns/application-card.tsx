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
import { ModelsGigApplicationResponse } from '@/lib/api/generated/models';
import { ApplicationActionMenu } from './application-action-menu';
import { ApplicationStatusBadge } from '@/components/dashboard-ui/status-badge';

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
