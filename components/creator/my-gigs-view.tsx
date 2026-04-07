"use client";

import { useEffect, useMemo, useState } from 'react';
import { useCreatorApplications, useCreatorGigs, useMatchingGigs } from '@/lib/api/hooks/creators';
import { useCreatorInvitations } from '@/lib/api/hooks/gigs';
import { GigsTable } from '@/components/campaigns/gigs-table';
import { SubHeader, SubHeaderTabs } from '@/components/subheader';
import { ModelsGigCreatorResponse, ModelsGigInvitationResponse, ModelsGigResponse } from '@/lib/api/generated/models';
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
  const applicationsQuery = useCreatorApplications();
  const invitationsQuery = useCreatorInvitations();
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

  const activeGigs = useMemo( (): ModelsGigCreatorResponse[] => {
    const gigMap = new Map<string, ModelsGigCreatorResponse>();
    ( applicationsQuery.data?.data || [] )
      .filter( ( a ) => a.status === 'accepted' )
      .forEach( ( a ) => { if ( a.gig?.id ) gigMap.set( a.gig.id, a.gig ); } );
    ( ( invitationsQuery.data?.data || [] ) as ModelsGigInvitationResponse[] )
      .filter( ( i ) => i.status === 'accepted' )
      .forEach( ( i ) => { if ( i.gig?.id ) gigMap.set( i.gig.id, i.gig ); } );
    return Array.from( gigMap.values() );
  }, [ applicationsQuery.data, invitationsQuery.data ] );

  const gigs = (
    tab === 'available' ? matchingQuery.data?.data || []
      : tab === 'active' ? activeGigs
        : allGigsQuery.data?.data || []
  ) as unknown as ModelsGigResponse[];

  const isLoading =
    tab === 'available' ? matchingQuery.isLoading
      : tab === 'active' ? ( applicationsQuery.isLoading || invitationsQuery.isLoading )
        : allGigsQuery.isLoading;

  return (
    <div className="flex flex-col flex-1 min-h-0">
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
      <div className="ad-shell bg-slate-50/50 flex-1 px-0 mt-0 min-h-0">
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
