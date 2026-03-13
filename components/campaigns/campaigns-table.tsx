
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
import { DataTablePagination } from '@/components/ui/data-table-pagination';
import { CampaignsTableToolbar } from './campaigns-table-toolbar';
import { useUpdateCampaignStatus } from "@/lib/api/hooks/campaigns";
import { useDelayedLoading } from "@/lib/hooks/use-delayed-loading";
import { usePersistedViewMode } from "@/lib/hooks/use-persisted-view-mode";
import { CampaignsView } from '@/components/campaigns/campaigns-view';
import { ModelCampaign } from './types';
import { AnimatePresence, motion } from 'motion/react';
import { DataTableSkeleton } from '@/components/dashboard-ui/data-table-skeleton';
import { CardGridSkeleton } from '@/components/dashboard-ui/card-grid-skeleton';
import { TableErrorState } from '@/components/dashboard-ui/table-error-state';

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
  const { view, setView } = usePersistedViewMode( 'campaigns', 'table' );
  const [ sorting, setSorting ] = React.useState<SortingState>( [] );
  const [ columnFilters, setColumnFilters ] = React.useState<ColumnFiltersState>( [] );
  const [ columnVisibility, setColumnVisibility ] = React.useState<VisibilityState>( {} );
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
      { showLoading && ( view === 'table' ? <DataTableSkeleton /> : <CardGridSkeleton count={ 6 } cardHeight="h-[300px]" /> ) }
      { error && <TableErrorState entity="campaigns" message={ error.message } /> }
      { !isLoading && !error && (
        <motion.div
          initial={ { opacity: 0 } }
          animate={ { opacity: 1 } }
          exit={ { opacity: 0 } }
          transition={ { duration: 0.3 } }
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
                <DataTablePagination
                  table={ table }
                  pageSizeOptions={ [ 10, 20, 30, 40, 50, 100, 200, 300, 500, 1000 ] }
                />
              </div>
            </div>
          ) }
        </motion.div>
      ) }
    </AnimatePresence>
  );
}
