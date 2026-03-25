"use client";

import { useState } from 'react';
import { useActiveGigs } from '@/lib/api/hooks/creators';
import { GigsTable } from '@/components/campaigns/gigs-table';
import { SubHeader } from '@/components/subheader';
import { ModelsGigResponse } from '@/lib/api/generated/models';
import { CreateSubmissionSheet } from '@/components/creator/create-submission-sheet';
import { useTranslations } from 'next-intl';

export function ActiveGigsView() {
  const t = useTranslations( 'dashboard.creator.activeGigs' );
  const { data, isLoading, error } = useActiveGigs();
  const [ submissionGigId, setSubmissionGigId ] = useState<string | null>( null );

  const gigs = ( data?.data?.gigs || [] ) as unknown as ModelsGigResponse[];

  return (
    <div className="flex flex-col flex-1 h-full">
      <SubHeader
        title={ t( 'title' ) }
        description={ t( 'description' ) }
      />
      <div className="ad-shell bg-slate-50/50 flex-1 h-full px-0">
        <GigsTable
          data={ gigs }
          isLoading={ isLoading }
          defaultView="cards"
          hideViewToggle={ true }
          onCreateSubmission={ ( gig ) => setSubmissionGigId( gig.id || null ) }
        />
      </div>
      <CreateSubmissionSheet
        open={ !!submissionGigId }
        onOpenChange={ ( open ) => { if ( !open ) setSubmissionGigId( null ); } }
        gigId={ submissionGigId || '' }
      />
    </div>
  );
}
