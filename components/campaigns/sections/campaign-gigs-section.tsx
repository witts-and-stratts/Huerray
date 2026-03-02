'use client';

import { ModelsGigResponse } from '@/lib/api/generated/models';
import { useGigsByCampaign } from '@/lib/api/hooks/gigs';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { GigCard } from '../gig-card';
import { GigDetailsSheet } from '../gig-details-sheet';
import { GigEditSheet } from '@/components/gigs/gig-edit-sheet';
import { Button } from '@/components/dashboard-ui/button';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/dashboard-ui/avatar';
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyContent,
} from '@/components/dashboard-ui/empty';

interface CampaignGigsSectionProps {
  campaignId: string;
  role?: 'brand' | 'admin';
  basePath?: string;
}

export function CampaignGigsSection( { campaignId, role = 'admin', basePath }: CampaignGigsSectionProps ) {
  const { data: gigsResponse, isLoading } = useGigsByCampaign( campaignId, role );
  const gigs = ( gigsResponse?.data || [] ) as ModelsGigResponse[];

  const [ selectedGig, setSelectedGig ] = useState<ModelsGigResponse | null>( null );
  const [ editingGig, setEditingGig ] = useState<ModelsGigResponse | null>( null );

  if ( isLoading ) {
    return (
      <div className='flex items-center justify-center min-h-[200px]'>
        <Loader2 className='size-8 animate-spin text-muted-foreground' />
      </div>
    );
  }

  const createGigButton = role === 'admin' ? (
    <Button className="min-w-[200px]" size="sm">
      <Link href={ `${ basePath }/campaigns/${ campaignId }/gigs/new` }>
        Create Gig
      </Link>
    </Button>
  ) : undefined;

  return (
    <>
      { gigs.length === 0 ? (
        <Empty className='border py-20 my-6 flex-1 bg-white'>
          <EmptyHeader>
            <EmptyMedia>
              <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:size-12 *:data-[slot=avatar]:ring-2">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarImage src="https://github.com/maxleiter.png" alt="@maxleiter" />
                  <AvatarFallback>LR</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarImage src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
                  <AvatarFallback>ER</AvatarFallback>
                </Avatar>
              </div>
            </EmptyMedia>
            <EmptyTitle className='font-normal font-primary text-primary'>No gigs yet</EmptyTitle>
            <EmptyDescription>
              { role === 'brand'
                ? 'There are no gigs yet for this campaign. Gigs will appear here when your campaign has been approved.'
                : 'There are no gigs yet for this campaign.'
              }
            </EmptyDescription>
          </EmptyHeader>
          { createGigButton && (
            <EmptyContent>
              { createGigButton }
            </EmptyContent>
          ) }
        </Empty>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-4'>
          { gigs.map( ( gig ) => (
            <GigCard
              key={ gig.id }
              gig={ gig }
              onViewGig={ setSelectedGig }
            />
          ) ) }
        </div>
      ) }

      <GigDetailsSheet
        gig={ selectedGig }
        open={ !!selectedGig }
        onOpenChange={ ( open ) => !open && setSelectedGig( null ) }
      />
      <GigEditSheet
        gig={ editingGig }
        open={ !!editingGig }
        onOpenChange={ ( open ) => !open && setEditingGig( null ) }
      />
    </>
  );
}
