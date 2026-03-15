"use client";

import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  flexRender,
  type ColumnFiltersState,
  type FilterFn,
  type SortingState,
  type VisibilityState,
} from '@tanstack/react-table';
import * as React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { type DateRange } from '@/components/dashboard-ui/superfield/date-picker-input';
import { FileX } from 'lucide-react';

import { getColumns } from './invoices-columns';
import { InvoicesTableToolbar } from './invoices-table-toolbar';
import { DataTablePagination } from '@/components/ui/data-table-pagination';
import { TableSkeleton } from '@/components/dashboard-ui/table-skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/dashboard-ui/table';
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from '@/components/dashboard-ui/empty';
import { ModelsInvoiceResponse } from '@/lib/api/generated/models';

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

  const columns = React.useMemo(
    () => getColumns( isAdmin ),
    [ isAdmin ]
  );

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
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter: searchValue,
    },
  } );

  return (
    <AnimatePresence>
      { isLoading ? (
        <TableSkeleton cardCount={ 6 } cardHeight="h-[60px]" />
      ) : (
        <motion.div
          initial={ { opacity: 0, y: 10 } }
          animate={ { opacity: 1, y: 0 } }
          exit={ { opacity: 0 } }
          transition={ { duration: 0.3 } }
          className="flex flex-col grow overflow-auto"
        >
          <InvoicesTableToolbar
            table={ table }
            searchValue={ searchValue }
            setSearchValue={ setSearchValue }
            dateFilterType={ dateFilterType }
            setDateFilterType={ setDateFilterType }
            dateRange={ dateRange }
            setDateRange={ setDateRange }
            statuses={ statuses }
          />

          <div className="px-5">
            { table.getRowModel().rows.length === 0 ? (
              <Empty className="border my-4">
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <FileX className="size-5" />
                  </EmptyMedia>
                  <EmptyTitle>No invoices found</EmptyTitle>
                  <EmptyDescription>
                    { searchValue || columnFilters.length > 0 || dateRange?.from
                      ? 'No invoices match your current filters.'
                      : 'You have no invoices yet.' }
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            ) : (
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    { table.getHeaderGroups().map( ( headerGroup ) => (
                      <TableRow key={ headerGroup.id }>
                        { headerGroup.headers.map( ( header ) => (
                          <TableHead key={ header.id } className="bg-muted/30">
                            { header.isPlaceholder
                              ? null
                              : flexRender( header.column.columnDef.header, header.getContext() ) }
                          </TableHead>
                        ) ) }
                      </TableRow>
                    ) ) }
                  </TableHeader>
                  <TableBody>
                    { table.getRowModel().rows.map( ( row ) => (
                      <TableRow
                        key={ row.id }
                        data-state={ row.getIsSelected() && 'selected' }
                        className="hover:bg-muted/30 transition-colors"
                      >
                        { row.getVisibleCells().map( ( cell ) => (
                          <TableCell key={ cell.id } className="align-top">
                            { flexRender( cell.column.columnDef.cell, cell.getContext() ) }
                          </TableCell>
                        ) ) }
                      </TableRow>
                    ) ) }
                  </TableBody>
                </Table>
              </div>
            ) }
          </div>

          { data.length > 0 && (
            <div className="px-4 mt-4">
              <DataTablePagination table={ table } />
            </div>
          ) }
        </motion.div>
      ) }
    </AnimatePresence>
  );
}
