"use client";

import * as React from 'react';
import { usePayments } from '@/lib/api/hooks/payments';
import { PaymentsTable } from '@/components/payments/payments-table';
import { ModelsPaymentResponse } from '@/lib/api/generated/models';

export function AdminPaymentsClient() {
  const { data, isLoading } = usePayments();

  const payments = React.useMemo( (): ModelsPaymentResponse[] => {
    return data?.data || [];
  }, [ data ] );

  return <PaymentsTable data={ payments } isLoading={ isLoading } isAdmin />;
}
