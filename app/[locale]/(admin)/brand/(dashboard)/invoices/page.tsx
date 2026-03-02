'use client';

import * as React from 'react';
import { SubHeader } from '@/components/subheader';
import { InvoicesTable } from '@/components/invoices/invoices-table';
import { useInvoices } from '@/lib/api/hooks/invoices';
import { ModelsInvoiceResponse } from '@/lib/api/generated/models';

export default function InvoicesPage() {
  const { data, isLoading } = useInvoices();

  const invoices = React.useMemo( (): ModelsInvoiceResponse[] => {
    return data?.data || [];
  }, [ data ] );

  return (
    <>
      <SubHeader
        title="Invoices"
        description="View and download your invoices."
      />
      <InvoicesTable data={ invoices } isLoading={ isLoading } />
    </>
  );
}
