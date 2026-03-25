"use client";

import { useState } from 'react';
import { useActiveGigs, useCreatorGigs, useMatchingGigs } from '@/lib/api/hooks/creators';
import { GigsTable } from '@/components/campaigns/gigs-table';
import { SubHeader, SubHeaderTabs } from '@/components/subheader';
import { ModelsGigResponse } from '@/lib/api/generated/models';
import { useTranslations } from 'next-intl';

type Tab = 'available' | 'active' | 'all';

export function MyGigsView() {
  const t = useTranslations( 'dashboard.creator.myGigs' );
  const [ tab, setTab ] = useState<Tab>( 'all' );

  const matchingQuery = useMatchingGigs();
  const activeQuery = useActiveGigs();
  const allGigsQuery = useCreatorGigs();

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
            onChange={ ( value ) => setTab( value as Tab ) }
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
        />
      </div>
    </div>
  );
}
