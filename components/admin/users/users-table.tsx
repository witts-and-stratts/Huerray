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
import { AdminNetworkErrorState } from "@/components/admin/empty-states/admin-network-error-state";
import { DataTableSkeleton } from "@/components/dashboard-ui/data-table-skeleton";
import { useDelayedLoading } from "@/lib/hooks/use-delayed-loading";
import { usePersistedPagination } from "@/lib/hooks/use-persisted-pagination";
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
  const { pagination, setPagination } = usePersistedPagination( 'admin-users' );
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
    <AnimatePresence>
      { showLoading && <DataTableSkeleton key="users-loading" /> }
      { error && <AdminNetworkErrorState key="users-error" fill message={ error.message } className="flex-1 h-full" /> }
      { !isLoading && !error && (
        <motion.div
          key="users-table"
          initial={ { opacity: 0 } }
          animate={ { opacity: 1 } }
          exit={ { opacity: 0 } }
          transition={ { duration: 0.3 } }
          className="flex flex-col bg-slate-50/50 grow relative min-h-0"
        >
          <div className="flex-1 min-h-0 overflow-auto">
            <UsersTableToolbar
              table={ table }
              statuses={ statuses }
            />
            <UsersView
              table={ table }
              onViewDetails={ ( user ) => {
                setSelectedUser( user );
                setIsSheetOpen( true );
              } }
            />
          </div>
          <div className="px-3 shrink-0 border-t bg-slate-50/50">
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
