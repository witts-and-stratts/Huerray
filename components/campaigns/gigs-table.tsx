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
import { DataTableSkeleton } from '@/components/dashboard-ui/data-table-skeleton';
import { Skeleton } from '@/components/ui/skeleton';

const GigSkeleton = () => {
  return (
    <motion.div
      initial={ { opacity: 0 } }
      animate={ { opacity: 1 } }
      exit={ { opacity: 0 } }
      transition={ { duration: 0.5 } }
      className='w-full space-y-4 px-5 py-5'>
      <div className='flex items-center justify-between'>
        <Skeleton className='h-10 w-[600px] max-w-full' />
        <Skeleton className='h-10 w-[100px]' />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        { Array.from( { length: 8 } ).map( ( _, i ) => (
          <Skeleton key={ i } className='h-[250px] w-full rounded-xl' />
        ) ) }
      </div>
    </motion.div>
  );
};

import { getColumns } from './gigs-columns';
import { GigsTableToolbar } from './gigs-table-toolbar';
import { CampaignsTablePagination } from './campaigns-table-pagination';
import { GigsView } from './gigs-view';
import { GigDetailsSheet } from './gig-details-sheet';
import { GigEditSheet } from '../gigs/gig-edit-sheet';
import { ModelsGigResponse } from '@/lib/api/generated';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { setViewMode } from '@/lib/redux/features/ui/uiSlice';
import { useDelayedLoading } from "@/lib/hooks/use-delayed-loading";

export interface GigsTableProps {
  data: ModelsGigResponse[];
  isLoading?: boolean;
  defaultView?: 'table' | 'cards';
  hideViewToggle?: boolean;
  onCreateSubmission?: ( gig: ModelsGigResponse ) => void;
  actionButtons?: React.ReactNode;
  hideToolbar?: boolean;
  hidePagination?: boolean;
}

export function GigsTable( { data, defaultView = 'table', hideViewToggle = false, isLoading = false, actionButtons, hideToolbar = false, hidePagination = false, onCreateSubmission }: GigsTableProps ) {
  const showLoading = useDelayedLoading( isLoading, 250 );
  const [ sorting, setSorting ] = React.useState<SortingState>( [] );
  const [ columnFilters, setColumnFilters ] = React.useState<ColumnFiltersState>(
    []
  );
  const [ columnVisibility, setColumnVisibility ] =
    React.useState<VisibilityState>( {} );
  const [ rowSelection, setRowSelection ] = React.useState( {} );
  const dispatch = useAppDispatch();
  const persistedView = useAppSelector( ( state ) => state.ui.viewModes[ 'gigs' ] ) || defaultView;
  const [ view, setInternalView ] = React.useState<'table' | 'cards'>( persistedView );

  React.useEffect( () => {
    if ( persistedView && persistedView !== view ) {
      setInternalView( persistedView );
    }
  }, [ persistedView ] );

  const setView = ( newView: "table" | "cards" ) => {
    setInternalView( newView );
    dispatch( setViewMode( { pageKey: 'gigs', viewMode: newView } ) );
  };

  const [ selectedGig, setSelectedGig ] = React.useState<ModelsGigResponse | null>( null );
  const [ editingGig, setEditingGig ] = React.useState<ModelsGigResponse | null>( null );

  const statuses = React.useMemo( () => {
    const statusSet = new Set<string>();
    data?.forEach( ( gig ) => {
      if ( gig.gig_status ) {
        statusSet.add( gig.gig_status );
      }
    } );
    return Array.from( statusSet );
  }, [ data ] );


  const columns = React.useMemo(
    () => getColumns( ( gig: ModelsGigResponse ) => setSelectedGig( gig ), ( gig: ModelsGigResponse ) => setEditingGig( gig ) ),
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
        view === 'table' ? <DataTableSkeleton /> : <GigSkeleton />
      ) }
      { !isLoading && (
        <div className="space-y-4 bg-background grow relative overflow-auto">
          { data && data.length > 0 && !hideToolbar && (
            <GigsTableToolbar
              table={ table }
              statuses={ statuses }
              view={ view }
              setView={ setView }
              hideViewToggle={ hideViewToggle }
            />
          ) }
          <div className='px-5'>
            <GigsView
              table={ table }
              view={ view }
              onViewGig={ ( gig ) => setSelectedGig( gig ) }
              onCreateSubmission={ onCreateSubmission }
              actionButtons={ actionButtons }
            />
          </div>
          { data && data.length > 0 && !hidePagination && (
            <div className="px-4">
              <CampaignsTablePagination table={ table } />
            </div>
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
        </div>
      ) }
    </AnimatePresence>
  );
}
