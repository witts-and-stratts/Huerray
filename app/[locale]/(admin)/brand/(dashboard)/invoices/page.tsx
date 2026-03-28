'use client';

import * as React from 'react';
import { SubHeader } from '@/components/subheader';
import { InvoicesTable } from '@/components/invoices/invoices-table';
import { useInvoices } from '@/lib/api/hooks/invoices';
import { ModelsInvoiceResponse } from '@/lib/api/generated/models';
import { useTranslations } from 'next-intl';

export default function InvoicesPage() {
  const t = useTranslations( 'dashboard.brand.invoicesPage' );
  const { data, isLoading } = useInvoices();

  const invoices = React.useMemo( (): ModelsInvoiceResponse[] => {
    return data?.data || [];
  }, [ data ] );

  return (
    <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
      <SubHeader
        title={ t( 'title' ) }
        description={ t( 'description' ) }
      />
      <InvoicesTable data={ invoices } isLoading={ isLoading } />
    </div>
  );
}
