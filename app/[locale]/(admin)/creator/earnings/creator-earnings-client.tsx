"use client";

import * as React from 'react';
import { useCreatorEarnings } from '@/lib/api/hooks/payments';
import { EarningsTable } from '@/components/payments/earnings-table';
import { ModelsPaymentResponse } from '@/lib/api/generated/models';

export function CreatorEarningsClient() {
  const { data, isLoading } = useCreatorEarnings();

  const earnings = React.useMemo( (): ModelsPaymentResponse[] => {
    return data?.data || [];
  }, [ data ] );

  return <EarningsTable data={ earnings } isLoading={ isLoading } />;
}
