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
import { DataTableSkeleton } from "@/components/dashboard-ui/data-table-skeleton";
import { TableErrorState } from "@/components/dashboard-ui/table-error-state";
import { useDelayedLoading } from "@/lib/hooks/use-delayed-loading";
import { useTranslations } from "next-intl";

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
  const t = useTranslations( 'dashboard.admin' );
  const tc = useTranslations( 'dashboard.common' );
  const [ sorting, setSorting ] = React.useState<SortingState>( [] );
  const [ columnFilters, setColumnFilters ] = React.useState<ColumnFiltersState>( [] );
  const [ columnVisibility, setColumnVisibility ] = React.useState<VisibilityState>( { user_type_filter: false } );
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
        t,
        tc,
      } ),
    [ t, tc ]
  );

  const table = useReactTable( {
    data: users,
    columns,
    initialState: {
      columnPinning: {
        left: [ 'select', 'user_type', 'name' ],
        right: [ 'actions' ]
      }
    },
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
      { showLoading && <DataTableSkeleton key="users-loading" /> }
      { error && <TableErrorState key="users-error" entity="users" message={ error.message } /> }
      { !isLoading && !error && (
        <motion.div
          key="users-table"
          initial={ { opacity: 0 } }
          animate={ { opacity: 1 } }
          exit={ { opacity: 0 } }
          transition={ { duration: 0.3 } }
          className="flex flex-col bg-slate-50/50 grow relative overflow-auto"
        >
          <div className="mb-4">
            <UsersTableToolbar
              table={ table }
              statuses={ statuses }
            />
          </div>
          <UsersView
            table={ table }
            onViewDetails={ ( user ) => {
              setSelectedUser( user );
              setIsSheetOpen( true );
            } }
          />
          <div className="px-3 mt-auto">
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
