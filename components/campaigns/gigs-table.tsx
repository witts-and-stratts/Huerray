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
import { AnimatePresence } from 'motion/react';
import { TableSkeleton } from '@/components/dashboard-ui/table-skeleton';

import { getColumns } from './gigs-columns';
import { GigsTableToolbar } from './gigs-table-toolbar';
import { CampaignsTablePagination } from './campaigns-table-pagination';
import { GigsView } from './gigs-view';
import { GigDetailsSheet } from './gig-details-sheet';
import { GigEditSheet } from '../gigs/gig-edit-sheet';
import { ModelsGigResponse } from '@/lib/api/generated';

export interface GigsTableProps {
  data: ModelsGigResponse[];
  isLoading?: boolean;
  basePath?: string;
  defaultView?: 'table' | 'cards';
  hideViewToggle?: boolean;
  onCreateSubmission?: ( gig: ModelsGigResponse ) => void;
  actionButtons?: React.ReactNode;
  hideToolbar?: boolean;
  hidePagination?: boolean;
}

export function GigsTable( { data, basePath, defaultView = 'table', hideViewToggle = false, isLoading = false, actionButtons, hideToolbar = false, hidePagination = false, onCreateSubmission }: GigsTableProps ) {
  const [ sorting, setSorting ] = React.useState<SortingState>( [] );
  const [ columnFilters, setColumnFilters ] = React.useState<ColumnFiltersState>(
    []
  );
  const [ columnVisibility, setColumnVisibility ] =
    React.useState<VisibilityState>( {} );
  const [ rowSelection, setRowSelection ] = React.useState( {} );
  const [ view, setView ] = React.useState<'table' | 'cards'>( defaultView );

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
    () => getColumns( ( gig ) => setSelectedGig( gig ), basePath, ( gig ) => setEditingGig( gig ) ),
    [ basePath ]
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
      { isLoading ? (
        <TableSkeleton />
      ) : (
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
