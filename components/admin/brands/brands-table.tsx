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
} from '@tanstack/react-table';
import * as React from 'react';

import { Skeleton } from '@/components/ui/skeleton';
import { AnimatePresence, motion } from 'motion/react';
import { columns } from './brands-columns';
import { Brand } from './brands-data';
import { BrandsView } from './brands-view';
import { BrandsTableToolbar } from './brands-table-toolbar';
import { BrandsTablePagination } from './brands-table-pagination';

const BrandSkeleton = () => {
  return (
    <motion.div
      initial={ { opacity: 0 } }
      animate={ { opacity: 1 } }
      exit={ { opacity: 0 } }
      transition={ { duration: 0.5 } }
      className='w-full space-y-4 px-5'>
      <div className='flex items-center justify-between'>
        <Skeleton className='h-10 w-[250px]' />
        <Skeleton className='h-10 w-[100px]' />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        { Array.from( { length: 8 } ).map( ( _, i ) => (
          <Skeleton key={ i } className='h-[250px] w-full rounded-xl' />
        ) ) }
      </div>
    </motion.div>
  );
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
  const [ sorting, setSorting ] = React.useState<SortingState>( [] );
  const [ columnFilters, setColumnFilters ] = React.useState<ColumnFiltersState>(
    []
  );
  const [ columnVisibility, setColumnVisibility ] =
    React.useState<VisibilityState>( {} );
  const [ rowSelection, setRowSelection ] = React.useState( {} );
  const [ view, setView ] = React.useState<'table' | 'cards'>( 'cards' );

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
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
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
    },
  } );

  return (
    <AnimatePresence>
      { isLoading && <BrandSkeleton /> }
      { error && <motion.div
        initial={ { opacity: 0 } }
        animate={ { opacity: 1 } }
        exit={ { opacity: 0 } }
        transition={ { duration: 0.3 } }
        className='w-full p-8 text-center bg-red-50 rounded-xl border border-red-100'>
        <h3 className='text-lg font-medium text-red-800'>Failed to load brands</h3>
        <p className='text-sm text-red-600 mt-1'>{ error.message }</p>
        <button
          onClick={ () => window.location.reload() }
          className='mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors'
        >
          Try again
        </button>
      </motion.div> }
      { !isLoading && !error && <motion.div
        initial={ { opacity: 0, y: 20 } }
        animate={ { opacity: 1, y: 0 } }
        exit={ { opacity: 0, y: -20 } }
        transition={ { duration: 0.5 } }
      >
        <BrandsTableToolbar table={ table } view={ view } setView={ setView } statuses={ statuses } />
        <BrandsView table={ table } view={ view } />
        <BrandsTablePagination table={ table } />
      </motion.div> }
    </AnimatePresence>
  );
}
