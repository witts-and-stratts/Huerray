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
import { EmptyGigs } from '@/components/admin/empty-states/empty-gigs';
import { useTranslations } from 'next-intl';

interface CampaignGigsSectionProps {
  campaignId: string;
  role?: 'brand' | 'admin';
  basePath?: string;
}

export function CampaignGigsSection( { campaignId, role = 'admin', basePath }: CampaignGigsSectionProps ) {
  const t = useTranslations( 'dashboard.admin.gigForm' );
  const { data: gigsResponse, isLoading } = useGigsByCampaign( campaignId, role );
  const gigs = ( gigsResponse?.data || [] ) as ModelsGigResponse[];

  const [ selectedGig, setSelectedGig ] = useState<ModelsGigResponse | null>( null );
  const [ selectedTab, setSelectedTab ] = useState<'details' | 'guidelines' | 'submissions'>( 'details' );
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
        { t( 'createGig' ) }
      </Link>
    </Button>
  ) : undefined;

  return (
    <>
      { gigs.length === 0 ? (
        <EmptyGigs
          fill
          description={ role === 'brand'
            ? 'There are no gigs yet for this campaign. Gigs will appear here when your campaign has been approved.'
            : 'There are no gigs yet for this campaign.'
          }
        >
          { createGigButton && (
            <EmptyContent>
              { createGigButton }
            </EmptyContent>
          ) }
        </EmptyGigs>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4'>
          { gigs.map( ( gig ) => (
            <GigCard
              key={ gig.id }
              gig={ gig }
              onViewGig={ ( gig, tab ) => { setSelectedGig( gig ); setSelectedTab( tab ?? 'details' ); } }
            />
          ) ) }
        </div>
      ) }

      <GigDetailsSheet
        gig={ selectedGig }
        open={ !!selectedGig }
        onOpenChange={ ( open ) => !open && setSelectedGig( null ) }
        initialTab={ selectedTab }
      />
      <GigEditSheet
        gig={ editingGig }
        open={ !!editingGig }
        onOpenChange={ ( open ) => !open && setEditingGig( null ) }
      />
    </>
  );
}
