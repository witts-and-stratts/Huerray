'use client';

import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnFiltersState,
  type SortingState,
  type Table as TanstackTable,
  type VisibilityState
} from '@tanstack/react-table';
import * as React from 'react';

import { columns } from './campaigns-columns';
import { CampaignsTablePagination } from './campaigns-table-pagination';
import { CampaignsTableToolbar } from './campaigns-table-toolbar';
import { campaigns } from './data';
import { CampaignsView } from '@/components/campaigns/campaigns-view';

export function CampaignsTable() {
  const [ sorting, setSorting ] = React.useState<SortingState>( [] );
  const [ columnFilters, setColumnFilters ] = React.useState<ColumnFiltersState>(
    []
  );
  const [ view, setView ] = React.useState<'table' | 'cards'>( 'cards' );
  const [ columnVisibility, setColumnVisibility ] =
    React.useState<VisibilityState>( {} );
  const [ rowSelection, setRowSelection ] = React.useState( {} );

  const statuses = React.useMemo( () => {
    const statusSet = new Set<string>();
    campaigns.forEach( ( campaign ) => statusSet.add( campaign.campaign_status ) );
    return Array.from( statusSet );
  }, [] );

  const table = useReactTable( {
    data: campaigns,
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
      <CampaignsTableToolbar
        table={ table }
        statuses={ statuses }
        view={ view }
        setView={ setView }
      />
      <CampaignsView table={ table } view={ view } />
      <CampaignsTablePagination table={ table } />
    </div>
  );
}
