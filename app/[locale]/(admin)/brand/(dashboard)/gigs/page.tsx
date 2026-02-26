'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { SubHeader } from '@/components/subheader';
import { useTranslations } from 'next-intl';
import { GigsTable } from '@/components/campaigns/gigs-table';
import { Button } from '@/components/dashboard-ui/button';
import Link from 'next/link';
import { useGigs } from '@/lib/api/hooks/gigs';
import { ModelsGigResponse } from '@/lib/api/generated/models';
import * as React from 'react';

export default function GigsPage() {
  const t = useTranslations( 'dashboard.brand.gigsPage' );

  // Access the API response safely with type casting if needed
  const { data: response, isLoading } = useGigs();
  const gigsData = ( response as any )?.gigs || ( response as any )?.data || [];

  const gigs: ModelsGigResponse[] = React.useMemo( () => {
    if ( !gigsData || !Array.isArray( gigsData ) ) {
      return [];
    }

    return gigsData.map( ( gig: any ) => ( {
      gig_id: gig.gig_id || gig.id || '',
      campaign_id: gig.campaign_id || '',
      campaign_name: gig.campaign_name || '',
      creator_name: gig.creator_name || 'Unknown Creator',
      creator_avatar_url: gig.creator_avatar || gig.creator_avatar_url || '',
      gig_status: gig.status || gig.gig_status,
      compensation: gig.reward || gig.compensation || 0,
      posting_end_date: gig.deadline || gig.posting_end_date || '',
      submission_url: gig.submission_url,
    } as ModelsGigResponse ) );
  }, [ gigsData ] );

  return (
    <>
      <SubHeader
        title={ t( 'title' ) }
        description={ t( 'description' ) }
      >
        {/* <Link href='/brand/gigs/new'>
          <Button className='gap-2 rounded-md'>Create Gig</Button>
        </Link> */}
      </SubHeader>
      <div className="px-5">
        <GigsTable data={ gigs } isLoading={ isLoading } />
      </div>
    </>
  );
}
