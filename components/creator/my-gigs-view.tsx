"use client";

import { useState } from 'react';
import { useActiveGigs, useMatchingGigs } from '@/lib/api/hooks/creators';
import { GigsTable } from '@/components/campaigns/gigs-table';
import { SubHeader, SubHeaderTabs } from '@/components/subheader';
import { ModelsGigResponse } from '@/lib/api/generated/models';

export function MyGigsView() {
  const [ tab, setTab ] = useState<'available' | 'active'>( 'available' );

  const matchingQuery = useMatchingGigs( undefined, { enabled: tab === 'available' } );
  const activeQuery = useActiveGigs( { enabled: tab === 'active' } );

  const gigs = ( tab === 'available'
    ? matchingQuery.data?.data || []
    : activeQuery.data?.data?.gigs || [] ) as unknown as ModelsGigResponse[];

  const isLoading = tab === 'available' ? matchingQuery.isLoading : activeQuery.isLoading;

  return (
    <>
      <SubHeader
        title="My Gigs"
        description="All gigs you have participated in."
        tabs={
          <SubHeaderTabs
            value={ tab }
            onChange={ ( value ) => setTab( value as 'available' | 'active' ) }
            tabItems={ [
              { value: 'available', label: 'Available Gigs' },
              { value: 'active', label: 'Active Gigs' },
            ] }
          />
        }
      />
      <div>
        <GigsTable
          data={ gigs }
          isLoading={ isLoading }
          defaultView="cards"
          hideViewToggle={ true }
        />
      </div>
    </>
  );
}
