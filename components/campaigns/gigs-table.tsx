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
}

export function GigsTable( { data, basePath }: GigsTableProps ) {
  const [ sorting, setSorting ] = React.useState<SortingState>( [] );
  const [ columnFilters, setColumnFilters ] = React.useState<ColumnFiltersState>(
    []
  );
  const [ columnVisibility, setColumnVisibility ] =
    React.useState<VisibilityState>( {} );
  const [ rowSelection, setRowSelection ] = React.useState( {} );
  const [ view, setView ] = React.useState<'table' | 'cards'>( 'table' );
  type NewType = ModelsGigResponse;

  const [ selectedGig, setSelectedGig ] = React.useState<NewType | null>( null );
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
    <div className='w-full'>
      <GigsTableToolbar
        table={ table }
        statuses={ statuses }
        view={ view }
        setView={ setView }
      />
      <GigsView
        table={ table }
        view={ view }
        onViewGig={ ( gig ) => setSelectedGig( gig ) }
      />
      <CampaignsTablePagination table={ table } />
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
  );
}
