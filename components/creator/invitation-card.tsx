"use client";

import { ModelsGigInvitationResponse } from '@/lib/api/generated/models';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { BrandAvatar } from '@/components/campaigns/brand-avatar';
import { Badge } from '@/components/dashboard-ui/badge';
import { Button } from '@/components/dashboard-ui/button';
import { formatDate } from 'date-fns';
import { Video, Calendar, Eye } from 'lucide-react';
import { InvitationActionMenu } from './invitation-action-menu';

interface InvitationCardProps {
  invitation: ModelsGigInvitationResponse;
  onViewDetails: ( invitation: ModelsGigInvitationResponse ) => void;
}

export function InvitationCard( { invitation, onViewDetails }: InvitationCardProps ) {
  const {
    id,
    gig,
    brand_id,
    invited_at,
    status,
    message,
  } = invitation;

  return (
    <Card className='py-3 justify-between gap-1 h-full flex flex-col'>
      <CardHeader className="flex items-start justify-between gap-4 mb-2 pr-1">
        <div className="flex flex-col flex-1 min-w-0">
          <div className='flex items-center gap-2 mb-1'>
            <Badge variant={
              status === 'pending' ? 'outline' :
                status === 'accepted' ? 'secondary' :
                  'destructive'
            } className="capitalize">
              { status }
            </Badge>
          </div>
          <button
            onClick={ () => onViewDetails( invitation ) }
            className='text-left hover:underline focus:outline-none'
          >
            <CardTitle className='capitalize text-[18px] font-normal text-primary font-primary truncate'>
              { gig?.title || 'Untitled Gig' }
            </CardTitle>
          </button>
          <CardDescription className="text-muted-foreground/70 text-sm line-clamp-1">
            { gig?.campaign_name || 'Unknown Campaign' }
          </CardDescription>
        </div>
        <div className="flex shrink-0 text-right gap-2 items-start">
          { brand_id && (
            <BrandAvatar brandId={ brand_id } className="size-10 border bg-white rounded-full shrink-0" />
          ) }
          <InvitationActionMenu invitation={ invitation } onViewDetails={ onViewDetails } />
        </div>
      </CardHeader>

      <CardContent className='space-y-3 pb-2 flex-1 flex flex-col'>
        { message && (
          <div className="p-3 bg-muted/30 rounded-lg text-sm text-muted-foreground italic line-clamp-3">
            &quot;{ message }&quot;
          </div>
        ) }

        <div className="mt-auto pt-2 space-y-2">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Video className="size-3.5" />
              <span className="text-xs">{ invitation.number_of_videos } video{ invitation.number_of_videos !== 1 ? 's' : '' }</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="size-3.5" />
              <span className="text-xs">Invited { invited_at ? formatDate( new Date( invited_at ), 'MMM d, yyyy' ) : '-' }</span>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="w-full mt-2"
            onClick={ () => onViewDetails( invitation ) }
          >
            <Eye className="size-3.5 mr-2" />
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
