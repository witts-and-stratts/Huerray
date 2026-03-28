"use client";

import { useEffect, useState } from 'react';
import { useActiveGigs, useCreatorGigs, useMatchingGigs } from '@/lib/api/hooks/creators';
import { GigsTable } from '@/components/campaigns/gigs-table';
import { SubHeader, SubHeaderTabs } from '@/components/subheader';
import { ModelsGigResponse } from '@/lib/api/generated/models';
import { useTranslations } from 'next-intl';
import { CreateSubmissionSheet } from '@/components/creator/create-submission-sheet';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type Tab = 'available' | 'active' | 'all';

const isTab = ( value: string | null ): value is Tab => value === 'all' || value === 'available' || value === 'active';
const getTabFromSearchParam = ( value: string | null ): Tab => isTab( value ) ? value : 'all';

export function MyGigsView() {
  const t = useTranslations( 'dashboard.creator.myGigs' );
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [ tab, setTab ] = useState<Tab>( getTabFromSearchParam( searchParams.get( 'tab' ) ) );
  const [ submissionGigId, setSubmissionGigId ] = useState<string | null>( null );

  const matchingQuery = useMatchingGigs();
  const activeQuery = useActiveGigs();
  const allGigsQuery = useCreatorGigs();

  useEffect( () => {
    setTab( getTabFromSearchParam( searchParams.get( 'tab' ) ) );
  }, [ searchParams ] );

  const handleTabChange = ( value: string ) => {
    if ( !isTab( value ) ) return;

    setTab( value );

    const params = new URLSearchParams( searchParams.toString() );
    if ( value === 'all' ) {
      params.delete( 'tab' );
    } else {
      params.set( 'tab', value );
    }

    const nextQuery = params.toString();
    router.replace( nextQuery ? `${ pathname }?${ nextQuery }` : pathname, { scroll: false } );
  };

  const gigs = (
    tab === 'available' ? matchingQuery.data?.data || []
      : tab === 'active' ? activeQuery.data?.data?.gigs || []
        : allGigsQuery.data?.data || []
  ) as unknown as ModelsGigResponse[];

  const isLoading =
    tab === 'available' ? matchingQuery.isLoading
      : tab === 'active' ? activeQuery.isLoading
        : allGigsQuery.isLoading;

  return (
    <div className="flex flex-col flex-1 h-full">
      <SubHeader
        title={ t( 'title' ) }
        description={ t( 'description' ) }
        tabs={
          <SubHeaderTabs
            value={ tab }
            onChange={ handleTabChange }
            tabItems={ [
              { value: 'all', label: t( 'tabs.all' ) },
              { value: 'available', label: t( 'tabs.available' ) },
              { value: 'active', label: t( 'tabs.active' ) },
            ] }
          />
        }
      />
      <div className="ad-shell bg-slate-50/50 flex-1 px-0 mt-0">
        <GigsTable
          data={ gigs }
          isLoading={ isLoading }
          defaultView="cards"
          hideViewToggle={ true }
          onCreateSubmission={ tab === 'active' ? ( gig ) => setSubmissionGigId( gig.id || null ) : undefined }
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
