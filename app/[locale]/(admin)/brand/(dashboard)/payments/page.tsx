'use client';

import * as React from 'react';
import { SubHeader } from '@/components/subheader';
import { PaymentsTable } from '@/components/payments/payments-table';
import { usePayments } from '@/lib/api/hooks/payments';
import { ModelsPaymentResponse } from '@/lib/api/generated/models';

export default function BrandPaymentsPage() {
  const { data, isLoading } = usePayments();

  const payments = React.useMemo( (): ModelsPaymentResponse[] => {
    return data?.data || [];
  }, [ data ] );

  return (
    <>
      <SubHeader
        title="Payments"
        description="View your payment history."
      />
      <PaymentsTable data={ payments } isLoading={ isLoading } />
    </>
  );
}
