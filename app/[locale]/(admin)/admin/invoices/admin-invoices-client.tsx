"use client";

import * as React from 'react';
import { useInvoices } from '@/lib/api/hooks/invoices';
import { InvoicesTable } from '@/components/invoices/invoices-table';
import { ModelsInvoiceResponse } from '@/lib/api/generated/models';
import { usePersistedPagination } from '@/lib/hooks/use-persisted-pagination';

export function AdminInvoicesClient() {
  const { pagination, setPagination } = usePersistedPagination( 'admin-invoices' );
  const [ searchValue, setSearchValue ] = React.useState( '' );
  const deferredSearchValue = React.useDeferredValue( searchValue.trim() );
  const isSearchPending = searchValue.trim() !== deferredSearchValue;
  const hasMountedRef = React.useRef( false );

  React.useEffect( () => {
    if ( !hasMountedRef.current ) {
      hasMountedRef.current = true;
      return;
    }
    setPagination( ( current ) => ( current.pageIndex === 0 ? current : { ...current, pageIndex: 0 } ) );
  }, [ deferredSearchValue, setPagination ] );

  const { data, isLoading, isFetching, error, refetch } = useInvoices( {
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    search: deferredSearchValue || undefined,
  } );

  const invoices = React.useMemo( (): ModelsInvoiceResponse[] => {
    return data?.data || [];
  }, [ data ] );

  return (
    <div className='flex flex-col flex-1 min-h-0 overflow-hidden'>
      <InvoicesTable
        data={ invoices }
        isLoading={ isLoading }
        isFetching={ isFetching }
        isAdmin
        error={ error as Error | null }
        refetch={ refetch }
        pagination={ pagination }
        onPaginationChange={ setPagination }
        rowCount={ data?.pagination?.total }
        onSearchChange={ setSearchValue }
        isSearchPending={ isSearchPending }
      />
    </div>
  );
}
