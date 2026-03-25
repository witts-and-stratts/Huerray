"use client";

import { useMatchingGigs } from '@/lib/api/hooks/creators';
import { GigsTable } from '@/components/campaigns/gigs-table';
import { SubHeader } from '@/components/subheader';
import { useRouter } from 'next/navigation';
import { ModelsGigResponse } from '@/lib/api/generated/models';
import { useTranslations } from 'next-intl';

export function AvailableGigsView() {
  const t = useTranslations( 'dashboard.creator.availableGigs' );
  const { data, isLoading, error } = useMatchingGigs();

  const gigs = ( data?.data || [] ) as unknown as ModelsGigResponse[];

  return (
    <div className="flex flex-col flex-1 h-full">
      <SubHeader
        title={ t( 'title' ) }
        description={ t( 'description' ) }
      />
      <div className="ad-shell bg-slate-50/50 flex-1 h-full">
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
