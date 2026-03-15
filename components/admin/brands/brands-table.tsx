'use client';

import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type FilterFn,
} from '@tanstack/react-table';
import * as React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { TableSkeleton } from '@/components/dashboard-ui/table-skeleton';
import { DataTableSkeleton } from '@/components/dashboard-ui/data-table-skeleton';
import { TableErrorState } from '@/components/dashboard-ui/table-error-state';
import { columns } from './brands-columns';
import { Brand } from './brands-data';
import { BrandsView } from './brands-view';
import { BrandsTableToolbar } from './brands-table-toolbar';
import { DataTablePagination } from '@/components/ui/data-table-pagination';
import { useDelayedLoading } from "@/lib/hooks/use-delayed-loading";
import { usePersistedViewMode } from "@/lib/hooks/use-persisted-view-mode";

const brandGlobalFilter: FilterFn<Brand> = ( row, _columnId, filterValue: string ) => {
  const q = filterValue.toLowerCase().trim();
  if ( !q ) return true;
  const b = row.original;
  const searchable = [
    b.name,
    b.brand_status,
    b.contact_email,
    b.website,
    b.category,
    b.company_size,
    b.city,
    b.country,
  ].filter( Boolean ).join( ' ' ).toLowerCase();
  return searchable.includes( q );
};



type BrandsTableProps = {
  brandsData?: Brand[];
  isLoading?: boolean;
  error?: Error | null;
};

export function BrandsTable( {
  brandsData,
  isLoading = false,
  error = null,
}: BrandsTableProps ) {
  const showLoading = useDelayedLoading( isLoading, 250 );
  const { view, setView } = usePersistedViewMode( 'brands', 'cards' );
  const [ sorting, setSorting ] = React.useState<SortingState>( [] );
  const [ columnFilters, setColumnFilters ] = React.useState<ColumnFiltersState>( [] );
  const [ columnVisibility, setColumnVisibility ] = React.useState<VisibilityState>( {} );
  const [ rowSelection, setRowSelection ] = React.useState( {} );
  const [ globalFilter, setGlobalFilter ] = React.useState( '' );

  const statuses = React.useMemo( () => {
    const statusSet = new Set<string>();
    brandsData?.forEach( ( brand ) => {
      if ( brand.brand_status ) {
        statusSet.add( brand.brand_status );
      }
    } );
    return Array.from( statusSet );
  }, [ brandsData ] );

  const table = useReactTable( {
    data: brandsData || [],
    columns,
    globalFilterFn: brandGlobalFilter,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
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
      globalFilter,
    },
  } );

  return (
    <AnimatePresence>
      { showLoading && ( view === 'table' ? <DataTableSkeleton /> : <TableSkeleton cardHeight="h-[250px]" /> ) }
      { error && <TableErrorState entity="brands" message={ error.message } /> }
      { !isLoading && !error && <motion.div
        initial={ { opacity: 0 } }
        animate={ { opacity: 1 } }
        exit={ { opacity: 0 } }
        transition={ { duration: 0.3 } }
        className="space-y-4 bg-slate-50/50 grow relative overflow-auto"
      >
        <BrandsTableToolbar table={ table } view={ view } setView={ setView } statuses={ statuses } />
        <BrandsView table={ table } view={ view } />
        <DataTablePagination table={ table } className="px-5" />
      </motion.div> }
    </AnimatePresence>
  );
}
