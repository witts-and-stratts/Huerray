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

import { usePaymentColumns } from './payments-columns';
import { PaymentsTableToolbar } from './payments-table-toolbar';
import { PaymentsTableView } from './payments-table-view';
import { DataTablePagination } from '@/components/ui/data-table-pagination';
import { AdminNetworkErrorState } from '@/components/admin/empty-states/admin-network-error-state';
import { DataTableSkeleton } from '@/components/dashboard-ui/data-table-skeleton';
import { useDelayedLoading } from '@/lib/hooks/use-delayed-loading';
import { usePersistedPagination } from '@/lib/hooks/use-persisted-pagination';
import { ModelsPaymentResponse } from '@/lib/api/generated/models';
import { ScrollArea } from '../dashboard-ui/scroll-area';

const paymentGlobalFilter: FilterFn<ModelsPaymentResponse> = ( row, _columnId, filterValue: string ) => {
  const q = filterValue.toLowerCase().trim();
  if ( !q ) return true;
  const p = row.original;
  const searchable = [
    p.payment_id,
    p.payment_status,
    p.payment_method,
    p.creator_name,
    p.total?.currency,
    p.reference,
    p.notes,
  ].filter( Boolean ).join( ' ' ).toLowerCase();
  return searchable.includes( q );
};

export interface PaymentsTableProps {
  data: ModelsPaymentResponse[];
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

export function PaymentsTable( {
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
}: PaymentsTableProps ) {
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
  const [ sorting, setSorting ] = React.useState<SortingState>( [] );
  const [ columnFilters, setColumnFilters ] = React.useState<ColumnFiltersState>( [] );
  const [ columnVisibility, setColumnVisibility ] = React.useState<VisibilityState>( {} );
  const [ rowSelection, setRowSelection ] = React.useState( {} );
  const [ internalSearchValue, setInternalSearchValue ] = React.useState( '' );
  const [ committedSearchValue, setCommittedSearchValue ] = React.useState( '' );
  const [ dateRange, setDateRange ] = React.useState<DateRange | undefined>( undefined );
  const { pagination: internalPagination, setPagination: setInternalPagination } = usePersistedPagination( 'payments' );
  const isServerSide = externalPagination !== undefined && externalOnPaginationChange !== undefined;
  const pagination = isServerSide ? externalPagination : internalPagination;
  const setPagination = isServerSide ? externalOnPaginationChange : setInternalPagination;
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
    return ( sourceData || [] ).filter( ( p ) => {
      if ( !p.payment_date ) return false;
      const date = new Date( p.payment_date );
      if ( dateRange.from && date < dateRange.from ) return false;
      if ( dateRange.to ) {
        const end = new Date( dateRange.to );
        end.setHours( 23, 59, 59, 999 );
        if ( date > end ) return false;
      }
      return true;
    } );
  }, [ sourceData, dateRange ] );

  const statuses = React.useMemo( () => {
    const set = new Set<string>();
    filteredData.forEach( ( p ) => { if ( p.payment_status ) set.add( p.payment_status ); } );
    return Array.from( set );
  }, [ filteredData ] );

  const columns = usePaymentColumns( isAdmin );

  const table = useReactTable( {
    data: filteredData,
    columns,
    getRowId: ( row, index ) => row.id || row.payment_id || row.reference || `payment-${ index }`,
    globalFilterFn: paymentGlobalFilter,
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
      { showInitialLoading && <DataTableSkeleton /> }
      { error && !isNotFoundError && <AdminNetworkErrorState fill message={ error.message } className="flex-1 h-full" onRetry={ refetch } /> }
      { !isInitialLoading && ( !error || isNotFoundError ) && (
        <motion.div
          initial={ { opacity: 0 } }
          animate={ { opacity: 1 } }
          exit={ { opacity: 0 } }
          transition={ { duration: 0.3 } }
          className='flex flex-col bg-slate-50/50 grow relative min-h-0 flex-1 h-full'
        >
          <PaymentsTableToolbar
            table={ table }
            setSearchValue={ setSearchValue }
            setLocalSearchValue={ setInternalSearchValue }
            dateRange={ dateRange }
            setDateRange={ setDateRange }
            statuses={ statuses }
          />
          <ScrollArea className="flex-1 min-h-0">
            <div className='p-2 md:p-4'>
              { showContentLoading && table.getRowModel().rows.length === 0 && !isSearchPending ? (
                <DataTableSkeleton
                  showToolbar={ false }
                  rowCount={ Math.min( pagination.pageSize, 10 ) }
                  className="px-0 pt-0"
                />
              ) : (
                <PaymentsTableView
                  table={ table }
                  showPaymentEmptyState={ sourceData.length === 0 && !hasActiveSearch && !hasCommittedSearch && !isFetching && !isSearchPending }
                />
              ) }
            </div>
          </ScrollArea>
          <div className='px-3 shrink-0 border-t bg-slate-50/50'>
            <DataTablePagination table={ table } />
          </div>
        </motion.div>
      ) }
    </AnimatePresence>
  );
}
