
'use client';

import { AdminNetworkErrorState } from '@/components/admin/empty-states/admin-network-error-state';
import { CampaignsView } from '@/components/campaigns/campaigns-view';
import { CreatorDetailsSheet } from '@/components/admin/creators/creator-details-sheet';
import { CardGridSkeleton } from '@/components/dashboard-ui/card-grid-skeleton';
import { CampaignsTableSkeleton } from './campaigns-table-skeleton';
import { type DateRange } from '@/components/dashboard-ui/superfield/date-picker-input';
import { DataTablePagination } from '@/components/ui/data-table-pagination';
import { useDelayedLoading } from "@/lib/hooks/use-delayed-loading";
import { usePersistedViewMode } from "@/lib/hooks/use-persisted-view-mode";
import { usePersistedPagination } from "@/lib/hooks/use-persisted-pagination";
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
import { AnimatePresence, motion } from 'motion/react';
import * as React from 'react';
import { useCampaignColumns } from './campaigns-columns';
import { CampaignsTableToolbar } from './campaigns-table-toolbar';
import { ModelsCampaignResponse } from '@/lib/api/generated';
import { ModelsCreatorResponse } from '@/lib/api/generated/models';
import { DEFAULT_PAGE_SIZE } from '@/lib/constants';
import { ScrollArea } from '../dashboard-ui/scroll-area';

const campaignGlobalFilter: FilterFn<ModelsCampaignResponse> = ( row, _columnId, filterValue: string ) => {
  const q = filterValue.toLowerCase().trim();
  if ( !q ) return true;
  const c = row.original;
  const searchable = [
    c.campaign_name,
    c.campaign_status,
    c.description,
    c.category,
    c.brand_name,
    c.keywords,
    c.tone_of_voice,
    c.brand?.company_name,
    c.brand?.category,
    c.brand?.country,
  ].filter( Boolean ).join( ' ' ).toLowerCase();
  return searchable.includes( q );
};

type CampaignsTableProps = {
  campaigns?: ModelsCampaignResponse[];
  isLoading?: boolean;
  isFetching?: boolean;
  error?: Error | null;
  emptyTitle?: string;
  simpleEmptyState?: boolean;
  // Server-side pagination — when provided, enables manual pagination mode
  pagination?: PaginationState;
  onPaginationChange?: ( updater: Updater<PaginationState> ) => void;
  rowCount?: number;
  onSearchChange?: ( value: string ) => void;
  isSearchPending?: boolean;
};

export function CampaignsTable( {
  campaigns = [],
  isLoading = false,
  isFetching = false,
  error = null,
  emptyTitle = 'Ready to launch?',
  simpleEmptyState = false,
  pagination: externalPagination,
  onPaginationChange: externalOnPaginationChange,
  rowCount,
  onSearchChange,
  isSearchPending = false,
}: CampaignsTableProps ) {
  const errorStatus = ( error as { response?: { status?: number; }; status?: number; } | null )?.response?.status
    ?? ( error as { status?: number; } | null )?.status;
  const isNotFoundError = errorStatus === 404;
  const isInitialLoading = isLoading && campaigns.length === 0;
  const isContentLoading = !isInitialLoading && isFetching;
  const showInitialLoading = useDelayedLoading( isInitialLoading, 50 );
  const showContentLoading = useDelayedLoading( isContentLoading, 400 );
  const { view, setView } = usePersistedViewMode( 'campaigns', 'table' );
  const { pagination: internalPagination, setPagination: setInternalPagination } = usePersistedPagination( 'campaigns-table' );

  const isServerSide = externalPagination !== undefined && externalOnPaginationChange !== undefined;
  const pagination = isServerSide ? externalPagination : internalPagination;
  const setPagination = isServerSide ? externalOnPaginationChange : setInternalPagination;
  const [ sorting, setSorting ] = React.useState<SortingState>( [] );
  const [ columnFilters, setColumnFilters ] = React.useState<ColumnFiltersState>( [] );
  const [ columnVisibility, setColumnVisibility ] = React.useState<VisibilityState>( {} );
  const [ rowSelection, setRowSelection ] = React.useState( {} );
  const [ internalGlobalFilter, setInternalGlobalFilter ] = React.useState( '' );
  const [ dateFilterType, setDateFilterType ] = React.useState<'created_at' | 'updated_at'>( 'created_at' );
  const [ dateRange, setDateRange ] = React.useState<DateRange | undefined>( undefined );
  const [ selectedCreator, setSelectedCreator ] = React.useState<ModelsCreatorResponse | null>( null );
  const [ hasSearched, setHasSearched ] = React.useState( false );
  const [ committedSearchValue, setCommittedSearchValue ] = React.useState( '' );
  const globalFilter = internalGlobalFilter;
  const hasActiveSearch = globalFilter.trim().length > 0;
  const hasCommittedSearch = committedSearchValue.trim().length > 0;
  const sourceCampaigns = React.useMemo(
    () => isNotFoundError ? [] : campaigns,
    [ campaigns, isNotFoundError ]
  );
  const showTableControls = sourceCampaigns.length > 0 || hasActiveSearch || hasSearched;
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
    if ( !dateRange?.from && !dateRange?.to ) return sourceCampaigns;
    return ( sourceCampaigns || [] ).filter( ( campaign ) => {
      const dateStr = dateFilterType === 'created_at' ? campaign.created_at : campaign.updated_at;
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
  }, [ sourceCampaigns, dateFilterType, dateRange ] );

  const statuses = React.useMemo( () => {
    const statusSet = new Set<string>();
    filteredData.forEach( ( campaign ) => {
      if ( campaign.campaign_status ) {
        statusSet.add( campaign.campaign_status );
      }
    } );
    return Array.from( statusSet );
  }, [ filteredData ] );

  const columns = useCampaignColumns( { onViewCreator: setSelectedCreator } );

  const table = useReactTable( {
    data: filteredData,
    columns,
    getRowId: ( row, index ) => row.id || row.campaign_id || `campaign-${ index }`,
    globalFilterFn: campaignGlobalFilter,
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
    <div className="grow relative flex flex-col min-h-[420px] bg-slate-50/50 overflow-hidden">
      <AnimatePresence>
        { showInitialLoading && (
          <motion.div
            key="skeleton"
            className="absolute inset-0 z-30 bg-slate-50/50"
            exit={ { opacity: 0 } }
            transition={ { duration: 0.3 } }
          >
            { view === 'table' ? <CampaignsTableSkeleton /> : <CardGridSkeleton count={ 6 } cardHeight="h-[300px]" /> }
          </motion.div>
        ) }
      </AnimatePresence>
      { error && !isNotFoundError && <AdminNetworkErrorState fill message={ error.message } className="flex-1 h-full" /> }
      { !isInitialLoading && ( !error || isNotFoundError ) && (
        <>
          { showTableControls && (
            <CampaignsTableToolbar
              table={ table }
              statuses={ statuses }
              view={ view }
              setView={ setView }
              dateFilterType={ dateFilterType }
              setDateFilterType={ setDateFilterType }
              dateRange={ dateRange }
              setDateRange={ setDateRange }
              onSearchInputChange={ setGlobalFilter }
              onSearchChange={ handleSearchChange }
            />
          ) }
          <ScrollArea className="flex-1">
            <CampaignsView
              table={ table }
              view={ view }
              onViewCreator={ setSelectedCreator }
              isLoading={ showContentLoading && table.getRowModel().rows.length === 0 }
              showCampaignEmptyState={ sourceCampaigns.length === 0 && !hasActiveSearch && !hasCommittedSearch && !isFetching && !isSearchPending }
            />
          </ScrollArea>
          { showTableControls && (
            <div className="px-2 md:px-4 shrink-0 border-t bg-slate-50/50">
              <DataTablePagination
                table={ table }
                pageSizeOptions={ DEFAULT_PAGE_SIZE }
              />
            </div>
          ) }
        </>
      ) }
      <CreatorDetailsSheet
        creator={ selectedCreator }
        open={ !!selectedCreator }
        onOpenChange={ ( open ) => !open && setSelectedCreator( null ) }
      />
    </div>
  );
}
