'use client';

import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnFiltersState,
  type FilterFn,
  type SortingState,
  type VisibilityState,
} from '@tanstack/react-table';
import * as React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { type DateRange } from '@/components/dashboard-ui/superfield/date-picker-input';

import { getColumns } from './invoices-columns';
import { InvoicesTableToolbar } from './invoices-table-toolbar';
import { InvoicesView } from './invoices-view';
import { DataTablePagination } from '@/components/ui/data-table-pagination';
import { DataTableSkeleton } from '@/components/dashboard-ui/data-table-skeleton';
import { useDelayedLoading } from '@/lib/hooks/use-delayed-loading';
import { usePersistedViewMode } from '@/lib/hooks/use-persisted-view-mode';
import { usePersistedPagination } from '@/lib/hooks/use-persisted-pagination';
import { ModelsInvoiceResponse } from '@/lib/api/generated/models';
import { useTranslations } from 'next-intl';

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
  isAdmin?: boolean;
}

export function InvoicesTable( { data, isLoading = false, isAdmin = false }: InvoicesTableProps ) {
  const t = useTranslations( 'dashboard.brand.invoicesPage' );
  const showLoading = useDelayedLoading( isLoading, 250 );
  const { view, setView } = usePersistedViewMode( 'invoices', 'table' );
  const { pagination, setPagination } = usePersistedPagination( 'invoices' );
  const [ sorting, setSorting ] = React.useState<SortingState>( [] );
  const [ columnFilters, setColumnFilters ] = React.useState<ColumnFiltersState>( [] );
  const [ columnVisibility, setColumnVisibility ] = React.useState<VisibilityState>( {} );
  const [ rowSelection, setRowSelection ] = React.useState( {} );
  const [ searchValue, setSearchValue ] = React.useState( '' );
  const [ dateFilterType, setDateFilterType ] = React.useState<'issued_date' | 'due_date'>( 'issued_date' );
  const [ dateRange, setDateRange ] = React.useState<DateRange | undefined>( undefined );

  const filteredData = React.useMemo( () => {
    if ( !dateRange?.from && !dateRange?.to ) return data;
    return ( data || [] ).filter( ( inv ) => {
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
  }, [ data, dateFilterType, dateRange ] );

  const statuses = React.useMemo( () => {
    const set = new Set<string>();
    filteredData.forEach( ( inv ) => { if ( inv.invoice_status ) set.add( inv.invoice_status ); } );
    return Array.from( set );
  }, [ filteredData ] );

  const columns = React.useMemo( () => getColumns( t, isAdmin ), [ t, isAdmin ] );

  const table = useReactTable( {
    data: filteredData,
    columns,
    globalFilterFn: invoiceGlobalFilter,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setSearchValue,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter: searchValue,
      pagination,
    },
  } );

  return (
    <AnimatePresence>
      { showLoading && <DataTableSkeleton /> }
      { !isLoading && (
        <motion.div
          initial={ { opacity: 0 } }
          animate={ { opacity: 1 } }
          exit={ { opacity: 0 } }
          transition={ { duration: 0.3 } }
          className='flex flex-col flex-1 bg-slate-50/50 grow relative min-h-0 overflow-hidden'
        >
          <div className="flex-1 min-h-0 overflow-auto">
            <InvoicesTableToolbar
              table={ table }
              searchValue={ searchValue }
              setSearchValue={ setSearchValue }
              dateFilterType={ dateFilterType }
              setDateFilterType={ setDateFilterType }
              dateRange={ dateRange }
              setDateRange={ setDateRange }
              statuses={ statuses }
              view={ view }
              setView={ setView }
            />
            <InvoicesView table={ table } view={ view } isAdmin={ isAdmin } />
          </div>
          <div className='px-3 shrink-0 border-t bg-slate-50/50'>
            <DataTablePagination table={ table } />
          </div>
        </motion.div>
      ) }
    </AnimatePresence>
  );
}
