"use client";

import { CreatorDetailsSheet } from '@/components/admin/creators/creator-details-sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/dashboard-ui/avatar';
import { Badge } from '@/components/dashboard-ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/dashboard-ui/dialog';
import { Skeleton } from '@/components/dashboard-ui/skeleton';
import { ModelsVideoSubmissionResponse } from '@/lib/api/generated/models';
import { useGig } from '@/lib/api/hooks/gigs';
import { formatCurrency, formatDate } from '@/lib/utils/format';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';
import { TextCapitalize } from '../text-case';
import { imgpresets } from '@/lib/utils/imgproxy';

interface SubmissionViewDialogProps {
  open: boolean;
  onOpenChange: ( open: boolean ) => void;
  submission: ModelsVideoSubmissionResponse;
}

const statusVariant: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  approved: 'default',
  completed: 'default',
  pending_approval: 'secondary',
  submitted: 'secondary',
  open: 'outline',
  in_progress: 'outline',
  rejected: 'destructive',
  returned: 'destructive',
};

function SubmissionCardSkeleton() {
  return <>
    { Array.from( { length: 4 } ).map( ( _, i ) => (
      <div key={ `detail-skeleton-${ i }` }>
        <Skeleton className="mb-1 h-3 w-16" />
        <Skeleton className="h-4 w-24" />
      </div>
    ) ) }
  </>;
}

export function SubmissionViewDialog( { open, onOpenChange, submission }: SubmissionViewDialogProps ) {
  const locale = useLocale();
  const [ sheetOpen, setSheetOpen ] = useState( false );

  const creatorProfile = submission.creator;
  const creatorDisplayName = `${ creatorProfile?.first_name || '' } ${ creatorProfile?.last_name || '' }`.trim()
    || creatorProfile?.email
    || 'Unknown Creator';
  const creatorSecondary = [
    creatorProfile?.email || '',
    creatorProfile?.city || '',
    creatorProfile?.country || '',
  ].filter( Boolean ).join( ' • ' ) || 'No creator details available';
  const creatorAvatar = creatorProfile?.profile_image_url || '';

  const { data: gigResponse, isLoading: isGigLoading } = useGig(
    submission.gig_id || '',
    { enabled: !!submission.gig_id && open }
  );

  const gig = gigResponse?.data;
  const campaign = gig?.campaign;

  return (
    <>
      <Dialog open={ open } onOpenChange={ onOpenChange }>
        <DialogContent className="p-0 gap-0 overflow-hidden max-w-5xl! bg-burgundy-50/80">
          <div className="w-full md:min-h-[500px] bg-black transition-all duration-300 ease-in-out">
            <video
              src={ submission.video_url || '' }
              controls
              preload="metadata"
              className="w-full h-full object-contain min-h-50 transition-all duration-500"
            />
          </div>
          <div className="p-4 border-t bg-muted/20 space-y-4">
            <DialogHeader>
              <DialogTitle className="font-primary text-primary text-lg font-normal mb-0">
                <TextCapitalize>{ submission.title! }</TextCapitalize>
              </DialogTitle>
              { submission.description && (
                <DialogDescription>{ submission.description }</DialogDescription>
              ) }
            </DialogHeader>

            <button
              onClick={ () => setSheetOpen( true ) }
              className="flex items-center gap-3 min-w-0 text-left hover:bg-muted/50 p-2 -ml-2 rounded-lg transition-colors"
            >
              <Avatar className="size-10 shrink-0">
                <AvatarImage src={ imgpresets.avatar( creatorAvatar ) } alt={ creatorDisplayName } />
                <AvatarFallback>{ creatorDisplayName.slice( 0, 2 ).toUpperCase() }</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="text-base font-medium text-foreground truncate hover:underline  hover:text-primary cursor-pointer">
                  <TextCapitalize>{ creatorDisplayName }</TextCapitalize>
                </p>
                <p className="text-sm text-muted-foreground truncate">
                  { creatorSecondary }
                </p>
              </div>
            </button>

            <div className="flex gap-x-20 gap-y-5 rounded-lg border border-border/60 bg-background/70 p-3 text-sm">
              { isGigLoading ? (
                <SubmissionCardSkeleton />
              ) : (
                <div className='flex-1 w-full max-md:grid max-md:grid-cols-2 md:flex md:flex-wrap md:gap-16 gap-4 md:*:border-r md:*:pr-16 md:*:last:border-r-0 md:*:last:pr-0 max-md:*:border-b max-md:*:pb-4 max-md:*:last:border-b-0 max-md:*:last:pb-0'>
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">Campaign</p>
                    <p className="font-normal text-foreground truncate">
                      { ( campaign?.id || gig?.campaign_id ) ? (
                        <Link
                          href={ `/${ locale }/campaigns/${ campaign?.id || gig?.campaign_id }` }
                          className="hover:underline hover:text-primary transition-colors inline-block font-normal"
                        >
                          <TextCapitalize>{ campaign?.campaign_name || gig?.campaign_name || '—' }</TextCapitalize>
                        </Link>
                      ) : (
                        <TextCapitalize>{ campaign?.campaign_name || gig?.campaign_name || '—' }</TextCapitalize>
                      ) }
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">Gig</p>
                    <p className="font-normal text-foreground truncate">
                      <TextCapitalize>{ gig?.title || '—' }</TextCapitalize>
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">Status</p>
                    <Badge variant={ statusVariant[ submission.status || '' ] || 'secondary' } className="capitalize text-[11px]">
                      { ( submission.status || 'unknown' ).replace( /_/g, ' ' ) }
                    </Badge>
                  </div>
                  { gig?.compensation && <>
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">Compensation</p>
                      <p className="font-normal text-foreground">{ formatCurrency( gig?.compensation, 'EUR', locale ) }</p>
                    </div>
                  </> }
                  { gig?.gig_cost && <>
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">Gig Cost</p>
                      <p className="font-normal text-foreground">{ formatCurrency( gig?.gig_cost, 'EUR', locale ) }</p>
                    </div>
                  </> }
                </div>
              ) }
            </div>

            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>Submitted { formatDate( submission.created_at, locale ) }</span>
              { gig?.gig_status && (
                <span>Gig status: <span className="capitalize">{ gig.gig_status.replace( /_/g, ' ' ) }</span></span>
              ) }
            </div>
          </div>
        </DialogContent>
      </Dialog>

      { creatorProfile && (
        <CreatorDetailsSheet
          creator={ creatorProfile }
          open={ sheetOpen }
          onOpenChange={ setSheetOpen }
        />
      ) }
    </>
  );
}
