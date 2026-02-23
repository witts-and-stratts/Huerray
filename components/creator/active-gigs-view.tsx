"use client";

import { useState } from 'react';
import { useActiveGigs } from '@/lib/api/hooks/creators';
import { GigsTable } from '@/components/campaigns/gigs-table';
import { SubHeader } from '@/components/subheader';
import { ModelsGigResponse } from '@/lib/api/generated/models';
import { CreateSubmissionSheet } from '@/components/creator/create-submission-sheet';

export function ActiveGigsView() {
  const { data, isLoading, error } = useActiveGigs();
  const [ submissionGigId, setSubmissionGigId ] = useState<string | null>( null );

  const gigs = ( data?.data?.gigs || [] ) as unknown as ModelsGigResponse[];

  return (
    <>
      <SubHeader
        title="Active Gigs"
        description="Gigs you're currently working on from accepted invitations and applications."
      />
      <div className="">
        <GigsTable
          data={ gigs }
          isLoading={ isLoading }
          basePath="/creator-admin"
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
    </>
  );
}
