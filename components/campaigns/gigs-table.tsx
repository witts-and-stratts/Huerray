"use client";

import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState
} from '@tanstack/react-table';
import * as React from 'react';
import { AnimatePresence, motion } from 'motion/react';

import { getColumns } from './gigs-columns';
import { GigsTableToolbar } from './gigs-table-toolbar';
import { DataTablePagination } from '@/components/ui/data-table-pagination';
import { GigsView } from './gigs-view';
import { GigDetailsSheet } from './gig-details-sheet';
import { GigEditSheet } from '../gigs/gig-edit-sheet';
import { ModelsGigResponse } from '@/lib/api/generated';
import { useDelayedLoading } from "@/lib/hooks/use-delayed-loading";
import { usePersistedViewMode } from "@/lib/hooks/use-persisted-view-mode";
import { DataTableSkeleton } from '@/components/dashboard-ui/data-table-skeleton';
import { CardGridSkeleton } from '@/components/dashboard-ui/card-grid-skeleton';
import { TableErrorState } from '@/components/dashboard-ui/table-error-state';

export interface GigsTableProps {
  data: ModelsGigResponse[];
  isLoading?: boolean;
  error?: Error | null;
  defaultView?: 'table' | 'cards';
  hideViewToggle?: boolean;
  onCreateSubmission?: ( gig: ModelsGigResponse ) => void;
  actionButtons?: React.ReactNode;
  hideToolbar?: boolean;
  hidePagination?: boolean;
}

export function GigsTable( {
  data,
  defaultView = 'table',
  hideViewToggle = false,
  isLoading = false,
  error = null,
  actionButtons,
  hideToolbar = false,
  hidePagination = false,
  onCreateSubmission,
}: GigsTableProps ) {
  const showLoading = useDelayedLoading( isLoading, 50 );
  const { view, setView } = usePersistedViewMode( 'gigs', defaultView );
  const [ sorting, setSorting ] = React.useState<SortingState>( [] );
  const [ columnFilters, setColumnFilters ] = React.useState<ColumnFiltersState>( [] );
  const [ columnVisibility, setColumnVisibility ] = React.useState<VisibilityState>( {} );
  const [ rowSelection, setRowSelection ] = React.useState( {} );

  const [ selectedGig, setSelectedGig ] = React.useState<ModelsGigResponse | null>( null );
  const [ editingGig, setEditingGig ] = React.useState<ModelsGigResponse | null>( null );

  const statuses = React.useMemo( () => {
    const statusSet = new Set<string>();
    data?.forEach( ( gig ) => {
      if ( gig.gig_status ) statusSet.add( gig.gig_status );
    } );
    return Array.from( statusSet );
  }, [ data ] );

  const columns = React.useMemo(
    () => getColumns( ( gig ) => setSelectedGig( gig ), ( gig ) => setEditingGig( gig ) ),
    []
  );

  const table = useReactTable( {
    data: data || [],
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
      { showLoading && (
        view === 'table'
          ? <DataTableSkeleton />
          : <CardGridSkeleton count={ 8 } cardHeight="h-[250px]" columns="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" />
      ) }
      { error && <TableErrorState entity="gigs" message={ error.message } /> }
      { !isLoading && !error && (
        <motion.div
          initial={ { opacity: 0 } }
          animate={ { opacity: 1 } }
          exit={ { opacity: 0 } }
          transition={ { duration: 0.3 } }
          className="space-y-4 bg-slate-50/50 grow relative overflow-auto"
        >
          { ( data?.length ?? 0 ) === 0 ? (
            <GigsView
              table={ table }
              view={ view }
              onViewGig={ ( gig ) => setSelectedGig( gig ) }
              onCreateSubmission={ onCreateSubmission }
              actionButtons={ actionButtons }
            />
          ) : (
            <div className='flex flex-col w-full flex-1 h-full'>
              { !hideToolbar && (
                <GigsTableToolbar
                  table={ table }
                  statuses={ statuses }
                  view={ view }
                  setView={ setView }
                  hideViewToggle={ hideViewToggle }
                />
              ) }
              <div className='flex-1'>
                <GigsView
                  table={ table }
                  view={ view }
                  onViewGig={ ( gig ) => setSelectedGig( gig ) }
                  onCreateSubmission={ onCreateSubmission }
                  actionButtons={ actionButtons }
                />
              </div>
              { !hidePagination && (
                <div className='px-5'>
                  <DataTablePagination
                    table={ table }
                    pageSizeOptions={ [ 10, 20, 30, 40, 50, 100, 200, 300, 500, 1000 ] }
                  />
                </div>
              ) }
            </div>
          ) }
        </motion.div>
      ) }
      <GigDetailsSheet
        gig={ selectedGig }
        open={ !!selectedGig }
        onOpenChange={ ( open ) => !open && setSelectedGig( null ) }
      />
      <GigEditSheet
        gig={ editingGig }
        open={ !!editingGig }
        onOpenChange={ ( open ) => !open && setEditingGig( null ) }
      />
    </AnimatePresence>
  );
}
