"use client";

import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnFiltersState,
  type FilterFn,
  type SortingState,
  type VisibilityState
} from '@tanstack/react-table';
const gigGlobalFilter: FilterFn<ModelsGigResponse> = ( row, _columnId, filterValue: string ) => {
  const q = filterValue.toLowerCase().trim();
  if ( !q ) return true;
  const gig = row.original;
  const searchable = [
    gig.title,
    gig.campaign_name,
    gig.gig_status,
    gig.requirements,
    gig.content_guidelines,
    gig.ambience,
    gig.gender_requirement,
    gig.campaign?.campaign_name,
    gig.campaign?.brand?.company_name,
    gig.campaign?.brand?.category,
    gig.campaign?.brand?.country,
  ].filter( Boolean ).join( ' ' ).toLowerCase();
  return searchable.includes( q );
};
import * as React from 'react';
import { AnimatePresence } from 'motion/react';

import { getColumns } from './gigs-columns';
import { GigsTableToolbar } from './gigs-table-toolbar';
import { DataTablePagination } from '@/components/ui/data-table-pagination';
import { GigsView } from './gigs-view';
import { GigDetailsSheet } from './gig-details-sheet';
import { GigEditSheet } from '../gigs/gig-edit-sheet';
import { ModelsGigResponse } from '@/lib/api/generated';
import { useDelayedLoading } from "@/lib/hooks/use-delayed-loading";
import { usePersistedViewMode } from "@/lib/hooks/use-persisted-view-mode";
import { usePersistedPagination } from "@/lib/hooks/use-persisted-pagination";
import { DataTableSkeleton } from '@/components/dashboard-ui/data-table-skeleton';
import { CardGridSkeleton } from '@/components/dashboard-ui/card-grid-skeleton';
import { TableErrorState } from '@/components/dashboard-ui/table-error-state';
import { type DateRange } from '@/components/dashboard-ui/superfield/date-picker-input';
import { useTranslations } from 'next-intl';

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
  const t = useTranslations( 'dashboard.brand.campaignsPage.actions' );
  const showLoading = useDelayedLoading( isLoading, 50 );
  const { view, setView } = usePersistedViewMode( 'gigs', defaultView );
  const { pagination, setPagination } = usePersistedPagination( 'gigs' );
  const [ sorting, setSorting ] = React.useState<SortingState>( [] );
  const [ columnFilters, setColumnFilters ] = React.useState<ColumnFiltersState>( [] );
  const [ columnVisibility, setColumnVisibility ] = React.useState<VisibilityState>( {} );
  const [ rowSelection, setRowSelection ] = React.useState( {} );
  const [ globalFilter, setGlobalFilter ] = React.useState( '' );
  const [ dateFilterType, setDateFilterType ] = React.useState<'created_at' | 'updated_at' | 'posting_start_date' | 'posting_end_date'>( 'created_at' );
  const [ dateRange, setDateRange ] = React.useState<DateRange | undefined>( undefined );

  const [ selectedGig, setSelectedGig ] = React.useState<ModelsGigResponse | null>( null );
  const [ selectedTab, setSelectedTab ] = React.useState<'details' | 'guidelines' | 'submissions'>( 'details' );
  const [ editingGig, setEditingGig ] = React.useState<ModelsGigResponse | null>( null );

  const filteredData = React.useMemo( () => {
    if ( !dateRange?.from && !dateRange?.to ) return data;
    return ( data || [] ).filter( ( gig ) => {
      let dateStr: string | undefined;
      if ( dateFilterType === 'created_at' ) dateStr = gig.created_at;
      else if ( dateFilterType === 'updated_at' ) dateStr = gig.updated_at;
      else if ( dateFilterType === 'posting_start_date' ) dateStr = gig.posting_start_date;
      else if ( dateFilterType === 'posting_end_date' ) dateStr = gig.posting_end_date;

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
    const statusSet = new Set<string>();
    filteredData?.forEach( ( gig ) => {
      if ( gig.gig_status ) statusSet.add( gig.gig_status );
    } );
    return Array.from( statusSet );
  }, [ filteredData ] );

  const columns = React.useMemo(
    () => getColumns( t, ( gig, tab ) => { setSelectedGig( gig ); setSelectedTab( tab ?? 'details' ); }, ( gig ) => setEditingGig( gig ) ),
    []
  );

  const table = useReactTable( {
    data: filteredData || [],
    columns,
    globalFilterFn: gigGlobalFilter,
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
    <>
      <AnimatePresence>
        { showLoading && (
          view === 'table'
            ? <DataTableSkeleton key="skeleton-table" />
            : <CardGridSkeleton key="skeleton-cards" count={ 8 } cardHeight="h-[250px]" columns="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" />
        ) }
        { error && <TableErrorState key="error" entity="gigs" message={ error.message } /> }
        { !isLoading && !error && (
          <div
            className="bg-slate-50/50 grow relative flex flex-1 flex-col min-h-0 h-full"
          >
            <div className='flex-1 min-h-0 overflow-auto'>
              { !hideToolbar && ( data?.length ?? 0 ) > 0 && (
                <GigsTableToolbar
                  table={ table }
                  statuses={ statuses }
                  view={ view }
                  setView={ setView }
                  hideViewToggle={ hideViewToggle }
                  dateFilterType={ dateFilterType }
                  setDateFilterType={ setDateFilterType }
                  dateRange={ dateRange }
                  setDateRange={ setDateRange }
                />
              ) }
              <GigsView
                table={ table }
                view={ view }
                onViewGig={ ( gig, tab ) => { setSelectedGig( gig ); setSelectedTab( tab ?? 'details' ); } }
                onCreateSubmission={ onCreateSubmission }
                actionButtons={ actionButtons }
              />
            </div>
            { !hidePagination && ( data?.length ?? 0 ) > 0 && (
              <div className='px-2 md:px-5 shrink-0 border-t bg-slate-50/50'>
                <DataTablePagination
                  table={ table }
                  pageSizeOptions={ [ 10, 20, 30, 40, 50, 100, 200, 300, 500, 1000 ] }
                />
              </div>
            ) }
          </div>
        ) }
      </AnimatePresence>
      <GigDetailsSheet
        gig={ selectedGig }
        open={ !!selectedGig }
        onOpenChange={ ( open ) => !open && setSelectedGig( null ) }
        initialTab={ selectedTab }
      />
      <GigEditSheet
        gig={ editingGig }
        open={ !!editingGig }
        onOpenChange={ ( open ) => !open && setEditingGig( null ) }
      />
    </>
  );
}
