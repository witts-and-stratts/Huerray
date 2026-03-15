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
  type FilterFn,
} from "@tanstack/react-table";
import { getColumns } from "./users-columns";
import { UserDetailsSheet } from "./user-details-sheet";
import { UsersTableToolbar } from "./users-table-toolbar";
import { UsersView } from "./users-view";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import { ModelsUserResponse } from "@/lib/api/generated/models";
import { AnimatePresence, motion } from "motion/react";
import { TableSkeleton } from "@/components/dashboard-ui/table-skeleton";
import { DataTableSkeleton } from "@/components/dashboard-ui/data-table-skeleton";
import { TableErrorState } from "@/components/dashboard-ui/table-error-state";
import { useDelayedLoading } from "@/lib/hooks/use-delayed-loading";
import { usePersistedViewMode } from "@/lib/hooks/use-persisted-view-mode";

const userGlobalFilter: FilterFn<ModelsUserResponse> = ( row, _columnId, filterValue: string ) => {
  const q = filterValue.toLowerCase().trim();
  if ( !q ) return true;
  const u = row.original;
  const searchable = [
    u.first_name,
    u.last_name,
    u.middle_name,
    u.email,
    u.username,
    u.user_status,
    u.user_type,
    u.phone_number,
  ].filter( Boolean ).join( ' ' ).toLowerCase();
  return searchable.includes( q );
};



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
  const showLoading = useDelayedLoading( isLoading, 250 );
  const { view, setView } = usePersistedViewMode( 'users', 'cards' );
  const [ sorting, setSorting ] = React.useState<SortingState>( [] );
  const [ columnFilters, setColumnFilters ] = React.useState<ColumnFiltersState>( [] );
  const [ columnVisibility, setColumnVisibility ] = React.useState<VisibilityState>( {} );
  const [ rowSelection, setRowSelection ] = React.useState( {} );
  const [ globalFilter, setGlobalFilter ] = React.useState( '' );
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
    globalFilterFn: userGlobalFilter,
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
    <AnimatePresence>
      { showLoading && ( view === 'table' ? <DataTableSkeleton /> : <TableSkeleton /> ) }
      { error && <TableErrorState entity="users" message={ error.message } /> }
      { !isLoading && !error && (
        <motion.div
          initial={ { opacity: 0 } }
          animate={ { opacity: 1 } }
          exit={ { opacity: 0 } }
          transition={ { duration: 0.3 } }
          className="space-y-4 bg-slate-50/50 grow relative overflow-auto"
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
            <DataTablePagination table={ table } />
          </div>
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
