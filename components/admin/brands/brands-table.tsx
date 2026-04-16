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
  type PaginationState,
  type Updater,
} from '@tanstack/react-table';
import * as React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { AdminNetworkErrorState } from '@/components/admin/empty-states/admin-network-error-state';
import { TableSkeleton } from '@/components/dashboard-ui/table-skeleton';
import { DataTableSkeleton } from '@/components/dashboard-ui/data-table-skeleton';
import { getColumns } from './brands-columns';
import { Brand } from './brands-data';
import { BrandsView } from './brands-view';
import { BrandsTableToolbar } from './brands-table-toolbar';
import { DataTablePagination } from '@/components/ui/data-table-pagination';
import { useDelayedLoading } from "@/lib/hooks/use-delayed-loading";
import { usePersistedViewMode } from "@/lib/hooks/use-persisted-view-mode";
import { usePersistedPagination } from "@/lib/hooks/use-persisted-pagination";
import { BrandDetailsSheet } from './brand-details-sheet';
import { useTranslations } from 'next-intl';
import { ScrollArea } from '@/components/dashboard-ui/scroll-area';

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
  isFetching?: boolean;
  error?: Error | null;
  pagination?: PaginationState;
  onPaginationChange?: ( updater: Updater<PaginationState> ) => void;
  rowCount?: number;
};

export function BrandsTable( {
  brandsData,
  isLoading = false,
  isFetching = false,
  error = null,
  pagination: externalPagination,
  onPaginationChange: externalOnPaginationChange,
  rowCount,
}: BrandsTableProps ) {
  const isInitialLoading = isLoading && ( brandsData?.length ?? 0 ) === 0;
  const isContentLoading = !isInitialLoading && isFetching;
  const showInitialLoading = useDelayedLoading( isInitialLoading, 250 );
  const showContentLoading = useDelayedLoading( isContentLoading, 250 );
  const { view, setView } = usePersistedViewMode( 'brands', 'cards' );
  const { pagination: internalPagination, setPagination: setInternalPagination } = usePersistedPagination( 'brands' );
  const isServerSide = externalPagination !== undefined && externalOnPaginationChange !== undefined;
  const pagination = isServerSide ? externalPagination : internalPagination;
  const setPagination = isServerSide ? externalOnPaginationChange : setInternalPagination;
  const [ sorting, setSorting ] = React.useState<SortingState>( [] );
  const [ columnFilters, setColumnFilters ] = React.useState<ColumnFiltersState>( [] );
  const [ columnVisibility, setColumnVisibility ] = React.useState<VisibilityState>( { country: false } );
  const [ rowSelection, setRowSelection ] = React.useState( {} );
  const [ globalFilter, setGlobalFilter ] = React.useState( '' );
  const [ selectedBrand, setSelectedBrand ] = React.useState<Brand | null>( null );
  const [ isSheetOpen, setIsSheetOpen ] = React.useState( false );

  const statuses = React.useMemo( () => {
    const statusSet = new Set<string>();
    brandsData?.forEach( ( brand ) => {
      if ( brand.brand_status ) statusSet.add( brand.brand_status );
    } );
    return Array.from( statusSet );
  }, [ brandsData ] );

  const countries = React.useMemo( () => {
    const set = new Set<string>();
    brandsData?.forEach( ( brand ) => {
      if ( brand.country ) set.add( brand.country );
    } );
    return Array.from( set ).sort();
  }, [ brandsData ] );

  const sizes = React.useMemo( () => {
    const set = new Set<string>();
    brandsData?.forEach( ( brand ) => {
      if ( brand.company_size ) set.add( brand.company_size );
    } );
    return Array.from( set );
  }, [ brandsData ] );

  const tAdmin = useTranslations( 'dashboard.admin' );
  const tCommon = useTranslations( 'dashboard.common' );

  const columns = React.useMemo(
    () =>
      getColumns( {
        onViewDetails: ( brand ) => {
          setSelectedBrand( brand );
          setIsSheetOpen( true );
        },
        tAdmin,
        tCommon,
      } ),
    [ tAdmin, tCommon ]
  );

  const table = useReactTable( {
    data: brandsData || [],
    columns,
    initialState: {
      columnPinning: { left: [ 'select', 'name' ] },
    },
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
      globalFilter,
      pagination,
    },
  } );

  return (
    <AnimatePresence>
      { showInitialLoading && ( view === 'table' ? <DataTableSkeleton /> : <TableSkeleton /> ) }
      { error && <AdminNetworkErrorState fill message={ error.message } className="flex-1 h-full" /> }
      { !isInitialLoading && !error && (
        <motion.div
          initial={ { opacity: 0 } }
          animate={ { opacity: 1 } }
          exit={ { opacity: 0 } }
          transition={ { duration: 0.3 } }
          className="flex flex-col bg-slate-50/50 grow relative min-h-0 overflow-hidden"
        >
          <ScrollArea className="flex-1 min-h-0">
            <BrandsTableToolbar table={ table } view={ view } setView={ setView } statuses={ statuses } countries={ countries } sizes={ sizes } />
            <BrandsView
              table={ table }
              view={ view }
              onViewDetails={ ( brand ) => { setSelectedBrand( brand ); setIsSheetOpen( true ); } }
              isLoading={ showContentLoading }
            />
          </ScrollArea>
          <div className="px-3 shrink-0 border-t bg-slate-50/50">
            <DataTablePagination table={ table } />
          </div>
          <BrandDetailsSheet
            brand={ selectedBrand! }
            open={ isSheetOpen }
            onOpenChange={ setIsSheetOpen }
          />
        </motion.div>
      ) }
    </AnimatePresence>
  );
}
