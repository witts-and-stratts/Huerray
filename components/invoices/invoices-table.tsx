'use client';

import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnFiltersState,
  type FilterFn,
  type PaginationState,
  type SortingState,
  type Updater,
  type VisibilityState,
} from '@tanstack/react-table';
import * as React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { type DateRange } from '@/components/dashboard-ui/superfield/date-picker-input';

import { getColumns } from './invoices-columns';
import { InvoicesTableToolbar } from './invoices-table-toolbar';
import { InvoicesView } from './invoices-view';
import { DataTablePagination } from '@/components/ui/data-table-pagination';
import { AdminNetworkErrorState } from '@/components/admin/empty-states/admin-network-error-state';
import { DataTableSkeleton } from '@/components/dashboard-ui/data-table-skeleton';
import { useDelayedLoading } from '@/lib/hooks/use-delayed-loading';
import { usePersistedViewMode } from '@/lib/hooks/use-persisted-view-mode';
import { usePersistedPagination } from '@/lib/hooks/use-persisted-pagination';
import { ModelsInvoiceResponse } from '@/lib/api/generated/models';
import { useTranslations } from 'next-intl';
import { ScrollArea } from '../dashboard-ui/scroll-area';

const invoiceGlobalFilter: FilterFn<ModelsInvoiceResponse> = ( row, _columnId, filterValue: string ) => {
  const q = filterValue.toLowerCase().trim();
  if ( !q ) return true;
  const inv = row.original;
  const searchable = [
    inv.invoice_number,
    inv.invoice_status,
    inv.brand_name,
    inv.campaign_name,
    inv.total?.currency,
    inv.notes,
  ].filter( Boolean ).join( ' ' ).toLowerCase();
  return searchable.includes( q );
};

export interface InvoicesTableProps {
  data: ModelsInvoiceResponse[];
  isLoading?: boolean;
  isFetching?: boolean;
  isAdmin?: boolean;
  error?: Error | null;
  refetch?: () => void;
  pagination?: PaginationState;
  onPaginationChange?: ( updater: Updater<PaginationState> ) => void;
  rowCount?: number;
  onSearchChange?: ( value: string ) => void;
  isSearchPending?: boolean;
}

export function InvoicesTable( {
  data,
  isLoading = false,
  isFetching = false,
  isAdmin = false,
  error = null,
  refetch,
  pagination: externalPagination,
  onPaginationChange: externalOnPaginationChange,
  rowCount,
  onSearchChange,
  isSearchPending = false,
}: InvoicesTableProps ) {
  const t = useTranslations( 'dashboard.brand.invoicesPage' );
  const errorStatus = ( error as { response?: { status?: number; }; status?: number; } | null )?.response?.status
    ?? ( error as { status?: number; } | null )?.status;
  const isNotFoundError = errorStatus === 404;
  const sourceData = React.useMemo(
    () => isNotFoundError ? [] : data,
    [ data, isNotFoundError ]
  );
  const isInitialLoading = isLoading && sourceData.length === 0;
  const isContentLoading = !isInitialLoading && isFetching;
  const showInitialLoading = useDelayedLoading( isInitialLoading, 250 );
  const showContentLoading = useDelayedLoading( isContentLoading, 400 );
  const { view: persistedView, setView } = usePersistedViewMode( 'invoices', 'table' );
  const view = isAdmin ? 'table' : persistedView;
  const { pagination: internalPagination, setPagination: setInternalPagination } = usePersistedPagination( 'invoices' );
  const isServerSide = externalPagination !== undefined && externalOnPaginationChange !== undefined;
  const pagination = isServerSide ? externalPagination : internalPagination;
  const setPagination = isServerSide ? externalOnPaginationChange : setInternalPagination;
  const [ sorting, setSorting ] = React.useState<SortingState>( [] );
  const [ columnFilters, setColumnFilters ] = React.useState<ColumnFiltersState>( [] );
  const [ columnVisibility, setColumnVisibility ] = React.useState<VisibilityState>( {} );
  const [ rowSelection, setRowSelection ] = React.useState( {} );
  const [ internalSearchValue, setInternalSearchValue ] = React.useState( '' );
  const [ committedSearchValue, setCommittedSearchValue ] = React.useState( '' );
  const [ dateFilterType, setDateFilterType ] = React.useState<'issued_date' | 'due_date'>( 'issued_date' );
  const [ dateRange, setDateRange ] = React.useState<DateRange | undefined>( undefined );
  const hasActiveSearch = internalSearchValue.trim().length > 0;
  const hasCommittedSearch = committedSearchValue.trim().length > 0;
  const setSearchValue = React.useCallback( ( nextValue: string ) => {
    setCommittedSearchValue( nextValue );
    if ( onSearchChange ) {
      onSearchChange( nextValue );
    } else {
      setInternalSearchValue( nextValue );
    }
  }, [ onSearchChange ] );

  const filteredData = React.useMemo( () => {
    if ( !dateRange?.from && !dateRange?.to ) return sourceData;
    return ( sourceData || [] ).filter( ( inv ) => {
      const dateStr = dateFilterType === 'issued_date' ? inv.issued_date : inv.due_date;
      if ( !dateStr ) return false;
      const date = new Date( dateStr );
      if ( dateRange.from && date < dateRange.from ) return false;
      if ( dateRange.to ) {
        const end = new Date( dateRange.to );
        end.setHours( 23, 59, 59, 999 );
        if ( date > end ) return false;
      }
      return true;
    } );
  }, [ sourceData, dateFilterType, dateRange ] );

  const statuses = React.useMemo( () => {
    const set = new Set<string>();
    filteredData.forEach( ( inv ) => { if ( inv.invoice_status ) set.add( inv.invoice_status ); } );
    return Array.from( set );
  }, [ filteredData ] );

  const columns = React.useMemo( () => getColumns( t, isAdmin ), [ t, isAdmin ] );

  const table = useReactTable( {
    data: filteredData,
    columns,
    getRowId: ( row, index ) => row.id || row.invoice_id || row.invoice_number || `invoice-${ index }`,
    globalFilterFn: invoiceGlobalFilter,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setInternalSearchValue,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    ...( isServerSide && {
      manualPagination: true,
      rowCount: rowCount ?? 0,
    } ),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter: internalSearchValue,
      pagination,
    },
  } );

  return (
    <AnimatePresence>
      { showInitialLoading && <DataTableSkeleton key="invoices-loading" /> }
      { error && !isNotFoundError && <AdminNetworkErrorState key="invoices-error" fill message={ error.message } className="flex-1 h-full" onRetry={ refetch } /> }
      { !isInitialLoading && ( !error || isNotFoundError ) && (
        <motion.div
          key="invoices-content"
          initial={ { opacity: 0 } }
          animate={ { opacity: 1 } }
          exit={ { opacity: 0 } }
          transition={ { duration: 0.3 } }
          className='flex flex-col flex-1 bg-slate-50/50 grow relative min-h-0 overflow-hidden'
        >
          <InvoicesTableToolbar
            table={ table }
            setSearchValue={ setSearchValue }
            setLocalSearchValue={ setInternalSearchValue }
            dateFilterType={ dateFilterType }
            setDateFilterType={ setDateFilterType }
            dateRange={ dateRange }
            setDateRange={ setDateRange }
            statuses={ statuses }
            view={ view }
            setView={ setView }
            isAdmin={ isAdmin }
          />
          <ScrollArea className="flex-1 min-h-0">
            <InvoicesView
              table={ table }
              view={ view }
              isAdmin={ isAdmin }
              isLoading={ showContentLoading && table.getRowModel().rows.length === 0 }
              showInvoiceEmptyState={ sourceData.length === 0 && !hasActiveSearch && !hasCommittedSearch && !isFetching && !isSearchPending }
            />
          </ScrollArea>
          <div className='px-3 shrink-0 border-t bg-slate-50/50'>
            <DataTablePagination table={ table } />
          </div>
        </motion.div>
      ) }
    </AnimatePresence>
  );
}
