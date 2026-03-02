"use client";

import * as React from 'react';
import { useInvoices } from '@/lib/api/hooks/invoices';
import { InvoicesTable } from '@/components/invoices/invoices-table';
import { ModelsInvoiceResponse } from '@/lib/api/generated/models';

export function AdminInvoicesClient() {
  const { data, isLoading } = useInvoices();

  const invoices = React.useMemo( (): ModelsInvoiceResponse[] => {
    return data?.data || [];
  }, [ data ] );

  return <InvoicesTable data={ invoices } isLoading={ isLoading } isAdmin />;
}
