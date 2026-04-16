"use client";

import { useGigs } from '@/lib/api/hooks/gigs';
import { GigsTable } from '@/components/campaigns/gigs-table';
import { ModelsGigResponse } from '@/lib/api/generated';
import { usePersistedPagination } from '@/lib/hooks/use-persisted-pagination';

export function AdminGigsClient() {
  const { pagination, setPagination } = usePersistedPagination( 'admin-gigs' );
  const { data: gigsData, isLoading, isFetching, error, refetch } = useGigs( {
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
  } );

  // The API returns ModelsPaginatedGigResponse which has a 'data' property containing the array of gigs
  // We need to ensure we're passing the array of gigs to the table
  const gigs = ( gigsData?.data || [] ) as ModelsGigResponse[];

  return (
    <GigsTable
      data={ gigs }
      isLoading={ isLoading }
      isFetching={ isFetching }
      error={ error as Error | null }
      refetch={ refetch }
      pagination={ pagination }
      onPaginationChange={ setPagination }
      rowCount={ gigsData?.pagination?.total }
    />
  );
}
