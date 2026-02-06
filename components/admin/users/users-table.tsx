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

import { getColumns } from "./users-columns";
import { UserDetailsSheet } from "./user-details-sheet";
import { UsersTableToolbar } from "./users-table-toolbar";
import { UsersView } from "./users-view";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import { ModelsUserResponse } from "@/lib/api/generated/models";
import { Skeleton } from "@/components/ui/skeleton";
import { AnimatePresence, motion } from "motion/react";
import { TableSkeleton } from "@/components/dashboard-ui/table-skeleton";



interface UsersTableProps {
  users?: ModelsUserResponse[];
  isLoading?: boolean;
  error?: Error | null;
}

export function UsersTable( {
  users = [],
  isLoading = false,
  error = null,
}: UsersTableProps ) {
  const [ sorting, setSorting ] = React.useState<SortingState>( [] );
  const [ columnFilters, setColumnFilters ] = React.useState<ColumnFiltersState>(
    []
  );
  const [ columnVisibility, setColumnVisibility ] =
    React.useState<VisibilityState>( {} );
  const [ rowSelection, setRowSelection ] = React.useState( {} );
  const [ view, setView ] = React.useState<"table" | "cards">( "cards" );
  const [ selectedUser, setSelectedUser ] =
    React.useState<ModelsUserResponse | null>( null );
  const [ isSheetOpen, setIsSheetOpen ] = React.useState( false );

  const statuses = React.useMemo( () => {
    const uniqueStatuses = Array.from(
      new Set( users.map( ( user ) => user.user_status || "active" ) )
    );
    return uniqueStatuses as string[];
  }, [ users ] );

  const columns = React.useMemo(
    () =>
      getColumns( {
        onViewDetails: ( user ) => {
          setSelectedUser( user );
          setIsSheetOpen( true );
        },
      } ),
    []
  );

  const table = useReactTable( {
    data: users,
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
          Failed to load users
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
          className="space-y-4"
        >
          <UsersTableToolbar
            table={ table }
            statuses={ statuses }
            view={ view }
            setView={ setView }
          />
          <div className="px-5">
            <UsersView
              table={ table }
              view={ view }
              onViewDetails={ ( user ) => {
                setSelectedUser( user );
                setIsSheetOpen( true );
              } }
            />
          </div>
          <DataTablePagination table={ table } />
          <UserDetailsSheet
            user={ selectedUser }
            open={ isSheetOpen }
            onOpenChange={ setIsSheetOpen }
          />
        </motion.div>
      ) }
    </AnimatePresence>
  );
}
