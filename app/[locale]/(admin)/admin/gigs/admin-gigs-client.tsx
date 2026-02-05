"use client";

import { useGigs } from '@/lib/api/hooks/gigs';
import { GigsTable } from '@/components/campaigns/gigs-table';
import { ModelsGigResponse } from '@/lib/api/generated';

export function AdminGigsClient() {
  const { data: gigsData, isLoading } = useGigs();

  // The API returns ModelsPaginatedGigResponse which has a 'data' property containing the array of gigs
  // We need to ensure we're passing the array of gigs to the table
  const gigs = ( gigsData?.data || [] ) as ModelsGigResponse[];

  return (
    <GigsTable
      data={ gigs }
      isLoading={ isLoading }
    />
  );
}
