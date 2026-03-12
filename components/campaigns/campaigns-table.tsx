
'use client';

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

import { getColumns } from './campaigns-columns';
import { CampaignsTablePagination } from './campaigns-table-pagination';
import { CampaignsTableToolbar } from './campaigns-table-toolbar';
import { useUpdateCampaignStatus } from "@/lib/api/hooks/campaigns";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { setViewMode } from "@/lib/redux/features/ui/uiSlice";
import { useDelayedLoading } from "@/lib/hooks/use-delayed-loading";
import { CampaignsView } from '@/components/campaigns/campaigns-view';
import { ModelCampaign } from './types';
import { Skeleton } from '@/components/ui/skeleton';
import { AnimatePresence, motion } from 'motion/react';
import { DataTableSkeleton } from '@/components/dashboard-ui/data-table-skeleton';

const CampaignSkeleton = () => {
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
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        { Array.from( { length: 6 } ).map( ( _, i ) => (
          <Skeleton key={ i } className='h-[300px] w-full rounded-xl' />
        ) ) }
      </div>
    </motion.div>
  );
};

type CampaignsTableProps = {
  campaigns?: ModelCampaign[];
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
  const [ sorting, setSorting ] = React.useState<SortingState>( [] );
  const [ columnFilters, setColumnFilters ] = React.useState<ColumnFiltersState>(
    []
  );
  const dispatch = useAppDispatch();
  const persistedView = useAppSelector( ( state ) => state.ui.viewModes[ 'campaigns' ] ) || 'table';
  const [ view, setInternalView ] = React.useState<"table" | "cards">( persistedView );

  React.useEffect( () => {
    if ( persistedView && persistedView !== view ) {
      setInternalView( persistedView );
    }
  }, [ persistedView ] );

  const setView = ( newView: "table" | "cards" ) => {
    setInternalView( newView );
    dispatch( setViewMode( { pageKey: 'campaigns', viewMode: newView } ) );
  };
  const [ columnVisibility, setColumnVisibility ] =
    React.useState<VisibilityState>( {} );
  const [ rowSelection, setRowSelection ] = React.useState( {} );

  const statuses = React.useMemo( () => {
    const statusSet = new Set<string>();
    campaigns.forEach( ( campaign ) => {
      if ( campaign.campaign_status ) {
        statusSet.add( campaign.campaign_status );
      }
    } );
    return Array.from( statusSet );
  }, [ campaigns ] );

  const columns = React.useMemo( () => getColumns(), [] );

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
    <AnimatePresence>
      { showLoading && ( view === 'table' ? <DataTableSkeleton /> : <CampaignSkeleton /> ) }
      { error && <motion.div
        initial={ { opacity: 0 } }
        animate={ { opacity: 1 } }
        exit={ { opacity: 0 } }
        transition={ { duration: 0.3 } }
        className='w-full p-8 text-center bg-red-50 rounded-xl border border-red-100'>
        <h3 className='text-lg font-medium text-red-800'>Failed to load campaigns</h3>
        <p className='text-sm text-red-600 mt-1'>{ error.message }</p>
        <button
          onClick={ () => window.location.reload() }
          className='mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors'
        >
          Try again
        </button>
      </motion.div> }
      { !isLoading && !error && (
        <motion.div
          initial={ { opacity: 0, y: 20 } }
          animate={ { opacity: 1, y: 0 } }
          exit={ { opacity: 0, y: -20 } }
          transition={ { duration: 0.5 } }
          className="space-y-4 bg-slate-50/50 grow relative overflow-auto"
        >
          { campaigns.length === 0 ? (
            <CampaignsView
              table={ table }
              view={ view }
            />
          ) : (
            <div className='flex flex-col w-full flex-1 h-full'>
              <CampaignsTableToolbar
                table={ table }
                statuses={ statuses }
                view={ view }
                setView={ setView }
              />
              <div className='flex-1'>
                <CampaignsView table={ table } view={ view } />
              </div>
              <div className='px-5'>
                <CampaignsTablePagination table={ table } />
              </div>
            </div>
          ) }
        </motion.div>
      ) }
    </AnimatePresence>
  );
}
