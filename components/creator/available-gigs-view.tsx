"use client";

import { useMatchingGigs } from '@/lib/api/hooks/creators';
import { GigsTable } from '@/components/campaigns/gigs-table';
import { SubHeader } from '@/components/subheader';
import { useRouter } from 'next/navigation';
import { ModelsGigResponse } from '@/lib/api/generated/models';

export function AvailableGigsView() {
  const { data, isLoading, error } = useMatchingGigs();

  const gigs = ( data?.data || [] ) as unknown as ModelsGigResponse[];

  return (
    <>
      <SubHeader
        title="Available Gigs"
        description="Explore and apply to new opportunities matched to your profile."
      />
      <div className="px-5">
        <GigsTable
          data={ gigs }
          isLoading={ isLoading }
          basePath="/creator-admin"
        />
      </div>
    </>
  );
}
