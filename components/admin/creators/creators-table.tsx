"use client";

import * as React from "react";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { getColumns } from "./creators-columns";
import { CreatorDetailsSheet } from "./creator-details-sheet";
import { CreatorsTableToolbar } from "./creators-table-toolbar";
import { CreatorsView } from "./creators-view";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import { ModelsCreatorResponse } from "@/lib/api/generated/models";
import { Skeleton } from "@/components/ui/skeleton";
import { AnimatePresence, motion } from "motion/react";
import { TableSkeleton } from "@/components/dashboard-ui/table-skeleton";



interface CreatorsTableProps {
  creators?: ModelsCreatorResponse[];
  isLoading?: boolean;
  error?: Error | null;
}

export function CreatorsTable( {
  creators = [],
  isLoading = false,
  error = null,
}: CreatorsTableProps ) {
  const [ sorting, setSorting ] = React.useState<SortingState>( [] );
  const [ columnFilters, setColumnFilters ] = React.useState<ColumnFiltersState>(
    []
  );
  const [ columnVisibility, setColumnVisibility ] =
    React.useState<VisibilityState>( {} );
  const [ rowSelection, setRowSelection ] = React.useState( {} );
  const [ view, setView ] = React.useState<"table" | "cards">( "cards" );
  const [ selectedCreator, setSelectedCreator ] =
    React.useState<ModelsCreatorResponse | null>( null );
  const [ isSheetOpen, setIsSheetOpen ] = React.useState( false );

  const statuses = React.useMemo( () => {
    const uniqueStatuses = Array.from(
      new Set( creators.map( ( creator ) => creator.creator_status || "active" ) )
    );
    return uniqueStatuses as string[];
  }, [ creators ] );

  const columns = React.useMemo(
    () =>
      getColumns( {
        onViewDetails: ( creator ) => {
          setSelectedCreator( creator );
          setIsSheetOpen( true );
        },
      } ),
    []
  );

  const table = useReactTable( {
    data: creators,
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
      { isLoading && <TableSkeleton /> }
      { error && <motion.div
        initial={ { opacity: 0 } }
        animate={ { opacity: 1 } }
        exit={ { opacity: 0 } }
        transition={ { duration: 0.3 } }
        className="w-full p-8 text-center bg-red-50 rounded-xl border border-red-100">
        <h3 className="text-lg font-medium text-red-800">
          Failed to load creators
        </h3>
        <p className="text-sm text-red-600 mt-1">{ error.message }</p>
        <button
          onClick={ () => window.location.reload() }
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
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
          <CreatorsTableToolbar
            table={ table }
            statuses={ statuses }
            view={ view }
            setView={ setView }
          />
          <div className="px-5">
            <CreatorsView
              table={ table }
              view={ view }
              onViewDetails={ ( creator ) => {
                setSelectedCreator( creator );
                setIsSheetOpen( true );
              } }
            />
          </div>
          <div className="px-4">
            <DataTablePagination table={ table } />
          </div>
          <CreatorDetailsSheet
            creator={ selectedCreator }
            open={ isSheetOpen }
            onOpenChange={ setIsSheetOpen }
          />
        </motion.div>
      ) }
    </AnimatePresence>
  );
}
