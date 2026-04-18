"use client";

import "@/app/styles/components/data-table.css";
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
  type PaginationState,
  type Updater,
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
import { ScrollArea } from "@/components/dashboard-ui/scroll-area";
import { TableviewWrapper } from "@/components/table-view-wrapper";
import { isApiNotFoundError } from "@/lib/api/error-utils";

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
  isFetching?: boolean;
  error?: Error | null;
  pagination?: PaginationState;
  onPaginationChange?: ( updater: Updater<PaginationState> ) => void;
  rowCount?: number;
  onSearchChange?: ( value: string ) => void;
  isSearchPending?: boolean;
}

export function UsersTable( {
  users = [],
  isLoading = false,
  isFetching = false,
  error = null,
  pagination: externalPagination,
  onPaginationChange: externalOnPaginationChange,
  rowCount,
  onSearchChange,
  isSearchPending = false,
}: UsersTableProps ) {
  const isNotFoundError = isApiNotFoundError( error );
  const sourceUsers = React.useMemo(
    () => isNotFoundError ? [] : users,
    [ users, isNotFoundError ]
  );
  const isInitialLoading = isLoading && sourceUsers.length === 0;
  const isContentLoading = !isInitialLoading && isFetching;
  const showLoading = useDelayedLoading( isInitialLoading, 250 );
  const showContentLoading = useDelayedLoading( isContentLoading, 400 );
  const t = useTranslations( 'dashboard.admin' );
  const tc = useTranslations( 'dashboard.common' );
  const [ sorting, setSorting ] = React.useState<SortingState>( [] );
  const [ columnFilters, setColumnFilters ] = React.useState<ColumnFiltersState>( [] );
  const [ columnVisibility, setColumnVisibility ] = React.useState<VisibilityState>( { user_type_filter: false } );
  const [ rowSelection, setRowSelection ] = React.useState( {} );
  const [ internalGlobalFilter, setInternalGlobalFilter ] = React.useState( '' );
  const [ hasSearched, setHasSearched ] = React.useState( false );
  const [ committedSearchValue, setCommittedSearchValue ] = React.useState( '' );
  const { pagination: internalPagination, setPagination: setInternalPagination } = usePersistedPagination( 'admin-users' );
  const isServerSide = externalPagination !== undefined && externalOnPaginationChange !== undefined;
  const pagination = isServerSide ? externalPagination : internalPagination;
  const setPagination = isServerSide ? externalOnPaginationChange : setInternalPagination;
  const globalFilter = internalGlobalFilter;
  const hasActiveSearch = globalFilter.trim().length > 0;
  const hasCommittedSearch = committedSearchValue.trim().length > 0;
  const showTableControls = sourceUsers.length > 0 || hasActiveSearch || hasSearched || hasCommittedSearch || isSearchPending;
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
  const [ selectedUser, setSelectedUser ] =
    React.useState<ModelsUserResponse | null>( null );
  const [ isSheetOpen, setIsSheetOpen ] = React.useState( false );

  const statuses = React.useMemo( () => {
    const uniqueStatuses = Array.from(
      new Set( sourceUsers.map( ( user ) => user.user_status || "active" ) )
    );
    return uniqueStatuses as string[];
  }, [ sourceUsers ] );

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
    data: sourceUsers,
    columns,
    getRowId: ( row, index ) => row.id || row.username || row.email || `user-${ index }`,
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
    <AnimatePresence>
      { showLoading && <DataTableSkeleton key="users-loading" /> }
      { error && !isNotFoundError &&
        <TableviewWrapper>
          <AdminNetworkErrorState key="users-error" fill message={ error.message } className="flex-1 h-full" />
        </TableviewWrapper> }
      { !isInitialLoading && ( !error || isNotFoundError ) && (
        <motion.div
          key="users-table"
          initial={ { opacity: 0 } }
          animate={ { opacity: 1 } }
          exit={ { opacity: 0 } }
          transition={ { duration: 0.3 } }
          className="dt-table-shell"
        >
          { showTableControls && (
            <UsersTableToolbar
              table={ table }
              statuses={ statuses }
              onSearchInputChange={ setGlobalFilter }
              onSearchChange={ handleSearchChange }
            />
          ) }
          <ScrollArea className="dt-scroll-area">
            <UsersView
              table={ table }
              onViewDetails={ ( user ) => {
                setSelectedUser( user );
                setIsSheetOpen( true );
              } }
            />
            { showContentLoading && table.getRowModel().rows.length === 0 && (
              <DataTableSkeleton showToolbar={ false } className="dt-content-loading-overlay" />
            ) }
          </ScrollArea>
          { showTableControls && (
            <div className="dt-pagination-shell">
              <DataTablePagination table={ table } />
            </div>
          ) }
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
