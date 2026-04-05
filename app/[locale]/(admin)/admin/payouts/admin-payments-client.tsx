"use client";

import * as React from 'react';
import { usePayments } from '@/lib/api/hooks/payments';
import { PaymentsTable } from '@/components/payments/payments-table';
import { ModelsPaymentResponse } from '@/lib/api/generated/models';

export function AdminPaymentsClient() {
  const { data, isLoading, error, refetch } = usePayments();

  const payments = React.useMemo( (): ModelsPaymentResponse[] => {
    return data?.data || [];
  }, [ data ] );

  return (
    <div className='flex flex-col flex-1 min-h-0 overflow-hidden'>
      <PaymentsTable data={ payments } isLoading={ isLoading } isAdmin error={ error as Error | null } refetch={ refetch } />
    </div>
  );
}
