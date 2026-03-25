
'use client';

import { CampaignsView } from '@/components/campaigns/campaigns-view';
import { CardGridSkeleton } from '@/components/dashboard-ui/card-grid-skeleton';
import { CampaignsTableSkeleton } from './campaigns-table-skeleton';
import { type DateRange } from '@/components/dashboard-ui/superfield/date-picker-input';
import { TableErrorState } from '@/components/dashboard-ui/table-error-state';
import { DataTablePagination } from '@/components/ui/data-table-pagination';
import { useDelayedLoading } from "@/lib/hooks/use-delayed-loading";
import { usePersistedViewMode } from "@/lib/hooks/use-persisted-view-mode";
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
import { AnimatePresence, motion } from 'motion/react';
import * as React from 'react';
import { useCampaignColumns } from './campaigns-columns';
import { CampaignsTableToolbar } from './campaigns-table-toolbar';
import { ModelsCampaignResponse } from '@/lib/api/generated';
import { DEFAULT_PAGE } from '@/lib/constants';

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
  error?: Error | null;
  emptyTitle?: string;
  simpleEmptyState?: boolean;
};

export function CampaignsTable( {
  campaigns = [],
  isLoading = false,
  error = null,
  emptyTitle = 'Ready to launch?',
  simpleEmptyState = false,
}: CampaignsTableProps ) {
  const showLoading = useDelayedLoading( isLoading, 50 );
  const { view, setView } = usePersistedViewMode( 'campaigns', 'table' );
  const [ sorting, setSorting ] = React.useState<SortingState>( [] );
  const [ columnFilters, setColumnFilters ] = React.useState<ColumnFiltersState>( [] );
  const [ columnVisibility, setColumnVisibility ] = React.useState<VisibilityState>( {} );
  const [ rowSelection, setRowSelection ] = React.useState( {} );
  const [ globalFilter, setGlobalFilter ] = React.useState( '' );
  const [ dateFilterType, setDateFilterType ] = React.useState<'created_at' | 'updated_at'>( 'created_at' );
  const [ dateRange, setDateRange ] = React.useState<DateRange | undefined>( undefined );

  const filteredData = React.useMemo( () => {
    if ( !dateRange?.from && !dateRange?.to ) return campaigns;
    return ( campaigns || [] ).filter( ( campaign ) => {
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
  }, [ campaigns, dateFilterType, dateRange ] );

  const statuses = React.useMemo( () => {
    const statusSet = new Set<string>();
    filteredData.forEach( ( campaign ) => {
      if ( campaign.campaign_status ) {
        statusSet.add( campaign.campaign_status );
      }
    } );
    return Array.from( statusSet );
  }, [ filteredData ] );

  const columns = useCampaignColumns();

  const table = useReactTable( {
    data: filteredData,
    columns,
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
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
  } );

  return (
    <div className="grow relative overflow-auto bg-slate-50/50">
      <AnimatePresence>
        { ( showLoading || isLoading ) && (
          <motion.div
            key="skeleton"
            className="absolute inset-0 z-10 bg-slate-50/50"
            exit={ { opacity: 0 } }
            transition={ { duration: 0.3 } }
          >
            { view === 'table' ? <CampaignsTableSkeleton /> : <CardGridSkeleton count={ 6 } cardHeight="h-[300px]" /> }
          </motion.div>
        ) }
      </AnimatePresence>
      { error && <TableErrorState entity="campaigns" message={ error.message } /> }
      { !isLoading && !error && (
        <div className="space-y-4">
          { campaigns.length > 0 && (
            <CampaignsTableToolbar
              table={ table }
              statuses={ statuses }
              view={ view }
              setView={ setView }
              dateFilterType={ dateFilterType }
              setDateFilterType={ setDateFilterType }
              dateRange={ dateRange }
              setDateRange={ setDateRange }
            />
          ) }
          <CampaignsView table={ table } view={ view } />
          { campaigns.length > 0 && (
            <div className="px-4">
              <DataTablePagination
                table={ table }
                pageSizeOptions={ DEFAULT_PAGE }
              />
            </div>
          ) }
        </div>
      ) }
    </div>
  );
}
