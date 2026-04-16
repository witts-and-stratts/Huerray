'use client';

import * as React from 'react';
import { SubHeader } from '@/components/subheader';
import { InvoicesTable } from '@/components/invoices/invoices-table';
import { useInvoices } from '@/lib/api/hooks/invoices';
import { ModelsInvoiceResponse } from '@/lib/api/generated/models';
import { useTranslations } from 'next-intl';
import { usePersistedPagination } from '@/lib/hooks/use-persisted-pagination';

export default function InvoicesPage() {
  const t = useTranslations( 'dashboard.brand.invoicesPage' );
  const { pagination, setPagination } = usePersistedPagination( 'brand-invoices' );
  const { data, isLoading, isFetching } = useInvoices( {
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
  } );

  const invoices = React.useMemo( (): ModelsInvoiceResponse[] => {
    return data?.data || [];
  }, [ data ] );

  return (
    <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
      <SubHeader
        title={ t( 'title' ) }
        description={ t( 'description' ) }
      />
      <InvoicesTable
        data={ invoices }
        isLoading={ isLoading }
        isFetching={ isFetching }
        pagination={ pagination }
        onPaginationChange={ setPagination }
        rowCount={ data?.pagination?.total }
      />
    </div>
  );
}
