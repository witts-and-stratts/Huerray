'use client';

import * as React from 'react';
import { SubHeader } from '@/components/subheader';
import { PaymentsTable } from '@/components/payments/payments-table';
import { usePayments } from '@/lib/api/hooks/payments';
import { ModelsPaymentResponse } from '@/lib/api/generated/models';
import { useTranslations } from 'next-intl';

export default function BrandPaymentsPage() {
  const t = useTranslations('dashboard.brand.paymentsPage');
  const { data, isLoading } = usePayments();

  const payments = React.useMemo( (): ModelsPaymentResponse[] => {
    return data?.data || [];
  }, [ data ] );

  return (
    <>
      <SubHeader
        title={t('title')}
        description={t('description')}
      />
      <PaymentsTable data={ payments } isLoading={ isLoading } />
    </>
  );
}
