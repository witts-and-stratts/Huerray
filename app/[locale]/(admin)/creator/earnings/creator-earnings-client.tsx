"use client";

import * as React from 'react';
import { useCreatorEarnings } from '@/lib/api/hooks/payments';
import { PaymentsTable } from '@/components/payments/payments-table';
import { ModelsPaymentResponse } from '@/lib/api/generated/models';

export function CreatorEarningsClient() {
  const { data, isLoading } = useCreatorEarnings();

  const earnings = React.useMemo( (): ModelsPaymentResponse[] => {
    return data?.data || [];
  }, [ data ] );

  return <PaymentsTable data={ earnings } isLoading={ isLoading } />;
}
