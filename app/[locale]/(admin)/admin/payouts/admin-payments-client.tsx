"use client";

import * as React from 'react';
import { usePayments } from '@/lib/api/hooks/payments';
import { PaymentsTable } from '@/components/payments/payments-table';
import { ModelsPaymentResponse } from '@/lib/api/generated/models';
import { usePersistedPagination } from '@/lib/hooks/use-persisted-pagination';

export function AdminPaymentsClient() {
  const { pagination, setPagination } = usePersistedPagination( 'admin-payments' );
  const { data, isLoading, isFetching, error, refetch } = usePayments( {
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
  } );

  const payments = React.useMemo( (): ModelsPaymentResponse[] => {
    return data?.data || [];
  }, [ data ] );

  return (
    <div className='flex flex-col flex-1 min-h-0 overflow-hidden'>
      <PaymentsTable
        data={ payments }
        isLoading={ isLoading }
        isFetching={ isFetching }
        isAdmin
        error={ error as Error | null }
        refetch={ refetch }
        pagination={ pagination }
        onPaginationChange={ setPagination }
        rowCount={ data?.pagination?.total }
      />
    </div>
  );
}
