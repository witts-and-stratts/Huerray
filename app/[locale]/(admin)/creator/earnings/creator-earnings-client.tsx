"use client";

import * as React from 'react';
import { useCreatorEarnings } from '@/lib/api/hooks/payments';
import { PaymentsTable } from '@/components/payments/payments-table';
import { ModelsPaymentResponse } from '@/lib/api/generated/models';
import { usePersistedPagination } from '@/lib/hooks/use-persisted-pagination';

export function CreatorEarningsClient() {
  const { pagination, setPagination } = usePersistedPagination( 'creator-earnings' );
  const { data, isLoading, isFetching } = useCreatorEarnings( {
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
  } );

  const earnings = React.useMemo( (): ModelsPaymentResponse[] => {
    return data?.data || [];
  }, [ data ] );

  return (
    <PaymentsTable
      data={ earnings }
      isLoading={ isLoading }
      isFetching={ isFetching }
      pagination={ pagination }
      onPaginationChange={ setPagination }
      rowCount={ data?.pagination?.total }
    />
  );
}
