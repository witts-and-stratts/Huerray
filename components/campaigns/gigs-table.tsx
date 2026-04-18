"use client";

import '@/app/styles/components/data-table.css';
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnFiltersState,
  type FilterFn,
  type PaginationState,
  type SortingState,
  type Updater,
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
import { AdminNetworkErrorState } from '@/components/admin/empty-states/admin-network-error-state';
import { DataTableSkeleton } from '@/components/dashboard-ui/data-table-skeleton';
import { CardGridSkeleton } from '@/components/dashboard-ui/card-grid-skeleton';
import { type DateRange } from '@/components/dashboard-ui/superfield/date-picker-input';
import { useTranslations } from 'next-intl';
import { ScrollArea } from '../dashboard-ui/scroll-area';
import { isApiNotFoundError } from '@/lib/api/error-utils';

export interface GigsTableProps {
  data: ModelsGigResponse[];
  isLoading?: boolean;
  isFetching?: boolean;
  error?: Error | null;
  refetch?: () => void;
  defaultView?: 'table' | 'cards';
  hideViewToggle?: boolean;
  onCreateSubmission?: ( gig: ModelsGigResponse ) => void;
  actionButtons?: React.ReactNode;
  hideToolbar?: boolean;
  hidePagination?: boolean;
  pagination?: PaginationState;
  onPaginationChange?: ( updater: Updater<PaginationState> ) => void;
  rowCount?: number;
  onSearchChange?: ( value: string ) => void;
  isSearchPending?: boolean;
}

export function GigsTable( {
  data,
  defaultView = 'table',
  hideViewToggle = false,
  isLoading = false,
  isFetching = false,
  error = null,
  refetch,
  actionButtons,
  hideToolbar = false,
  hidePagination = false,
  onCreateSubmission,
  pagination: externalPagination,
  onPaginationChange: externalOnPaginationChange,
  rowCount,
  onSearchChange,
  isSearchPending = false,
}: GigsTableProps ) {
  const isNotFoundError = isApiNotFoundError( error );
  const sourceData = React.useMemo(
    () => isNotFoundError ? [] : data,
    [ data, isNotFoundError ]
  );
  const t = useTranslations( 'dashboard.brand.campaignsPage.actions' );
  const isInitialLoading = isLoading && sourceData.length === 0;
  const isContentLoading = !isInitialLoading && isFetching;
  const showInitialLoading = useDelayedLoading( isInitialLoading, 50 );
  const showContentLoading = useDelayedLoading( isContentLoading, 400 );
  const { view, setView } = usePersistedViewMode( 'gigs', defaultView );
  const { pagination: internalPagination, setPagination: setInternalPagination } = usePersistedPagination( 'gigs' );
  const isServerSide = externalPagination !== undefined && externalOnPaginationChange !== undefined;
  const pagination = isServerSide ? externalPagination : internalPagination;
  const setPagination = isServerSide ? externalOnPaginationChange : setInternalPagination;
  const [ sorting, setSorting ] = React.useState<SortingState>( [] );
  const [ columnFilters, setColumnFilters ] = React.useState<ColumnFiltersState>( [] );
  const [ columnVisibility, setColumnVisibility ] = React.useState<VisibilityState>( {} );
  const [ rowSelection, setRowSelection ] = React.useState( {} );
  const [ internalGlobalFilter, setInternalGlobalFilter ] = React.useState( '' );
  const [ dateFilterType, setDateFilterType ] = React.useState<'created_at' | 'updated_at' | 'posting_start_date' | 'posting_end_date'>( 'created_at' );
  const [ dateRange, setDateRange ] = React.useState<DateRange | undefined>( undefined );

  const [ selectedGig, setSelectedGig ] = React.useState<ModelsGigResponse | null>( null );
  const [ selectedTab, setSelectedTab ] = React.useState<'details' | 'guidelines' | 'submissions'>( 'details' );
  const [ editingGig, setEditingGig ] = React.useState<ModelsGigResponse | null>( null );
  const [ hasSearched, setHasSearched ] = React.useState( false );
  const [ committedSearchValue, setCommittedSearchValue ] = React.useState( '' );
  const globalFilter = internalGlobalFilter;
  const hasActiveSearch = globalFilter.trim().length > 0;
  const hasCommittedSearch = committedSearchValue.trim().length > 0;
  const showTableControls = sourceData.length > 0 || hasActiveSearch || hasSearched || hasCommittedSearch || isSearchPending;
  const setGlobalFilter = React.useCallback( ( updater: Updater<string> ) => {
    setHasSearched( true );
    setInternalGlobalFilter( ( currentValue ) =>
      typeof updater === 'function' ? updater( currentValue ) : updater
    );
  }, [] );
  const handleSearchChange = React.useCallback( ( value: string ) => {
    setCommittedSearchValue( value );
    onSearchChange?.( value );
  }, [ onSearchChange ] );

  const filteredData = React.useMemo( () => {
    if ( !dateRange?.from && !dateRange?.to ) return sourceData;
    return ( sourceData || [] ).filter( ( gig ) => {
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
  }, [ sourceData, dateFilterType, dateRange ] );

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
    getRowId: ( row, index ) => row.id || `gig-${ index }`,
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
    <>
      <AnimatePresence>
        { showInitialLoading && (
          view === 'table'
            ? <DataTableSkeleton key="skeleton-table" />
            : <CardGridSkeleton key="skeleton-cards" count={ 8 } cardHeight="h-[250px]" columns="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" />
        ) }
        { error && !isNotFoundError && <AdminNetworkErrorState key="error" fill message={ error.message } className="flex-1 h-full" onRetry={ refetch } /> }
        { !isInitialLoading && ( !error || isNotFoundError ) && (
          <div
            className="dt-table-shell-full"
          >
            { !hideToolbar && showTableControls && (
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
                onSearchInputChange={ setGlobalFilter }
                onSearchChange={ handleSearchChange }
              />
            ) }
            <ScrollArea>
              <GigsView
                table={ table }
                view={ view }
                onViewGig={ ( gig, tab ) => { setSelectedGig( gig ); setSelectedTab( tab ?? 'details' ); } }
                onCreateSubmission={ onCreateSubmission }
                actionButtons={ actionButtons }
                isLoading={ showContentLoading && table.getRowModel().rows.length === 0 }
                showGigsEmptyState={ sourceData.length === 0 && !hasActiveSearch && !hasCommittedSearch && !isFetching && !isSearchPending }
              />
            </ScrollArea>
            { !hidePagination && showTableControls && (
              <div className='dt-pagination-shell-wide'>
                <DataTablePagination
                  table={ table }
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
