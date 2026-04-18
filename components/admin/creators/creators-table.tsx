"use client";

import * as React from "react";
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
  Updater,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type FilterFn,
} from "@tanstack/react-table";
import { getColumns } from "./creators-columns";
import { CreatorDetailsSheet } from "./creator-details-sheet";
import { CreatorsTableToolbar } from "./creators-table-toolbar";
import { CreatorsView } from "./creators-view";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import { ModelsCreatorResponse } from "@/lib/api/generated/models";
import { AnimatePresence, motion } from "motion/react";
import { AdminNetworkErrorState } from "@/components/admin/empty-states/admin-network-error-state";
import { TableSkeleton } from "@/components/dashboard-ui/table-skeleton";
import { DataTableSkeleton } from "@/components/dashboard-ui/data-table-skeleton";
import { useUpdateCreatorProfileStatus } from "@/lib/api/hooks/creators";
import { ConfirmDialog } from "@/components/dashboard-ui/confirm-dialog";
import { toast } from "sonner";
import { SuperField } from "@/components/dashboard-ui/super-field";
import { useDelayedLoading } from "@/lib/hooks/use-delayed-loading";
import { usePersistedViewMode } from "@/lib/hooks/use-persisted-view-mode";
import { usePersistedPagination } from "@/lib/hooks/use-persisted-pagination";
import { useTranslations } from "next-intl";
import { ScrollArea } from "@/components/dashboard-ui/scroll-area";

const creatorGlobalFilter: FilterFn<ModelsCreatorResponse> = ( row, _columnId, filterValue: string ) => {
  const q = filterValue.toLowerCase().trim();
  if ( !q ) return true;
  const c = row.original;
  const searchable = [
    c.first_name,
    c.last_name,
    c.email,
    c.creator_status,
    c.bio,
    c.city,
    c.country,
    c.state,
    c.gender,
    c.instagram_handle,
    c.tiktok_handle,
    c.youtube_handle,
    c.twitter_handle,
    c.phone_number,
  ].filter( Boolean ).join( ' ' ).toLowerCase();
  return searchable.includes( q );
};



interface CreatorsTableProps {
  creators?: ModelsCreatorResponse[];
  isLoading?: boolean;
  isFetching?: boolean;
  error?: Error | null;
  pagination?: PaginationState;
  onPaginationChange?: ( updater: Updater<PaginationState> ) => void;
  rowCount?: number;
  defaultContentTypeFilter?: string[];
  onContentTypeFilterChange?: ( value?: string[] ) => void;
  showContentTypeFilter?: boolean;
  onSearchChange?: ( value: string ) => void;
}

export function CreatorsTable( {
  creators = [],
  isLoading = false,
  isFetching = false,
  error = null,
  pagination: externalPagination,
  onPaginationChange: externalOnPaginationChange,
  rowCount,
  defaultContentTypeFilter,
  onContentTypeFilterChange,
  showContentTypeFilter = true,
  onSearchChange,
}: CreatorsTableProps ) {
  const isInitialLoading = isLoading && creators.length === 0;
  const isContentLoading = !isInitialLoading && isFetching;
  const showLoading = useDelayedLoading( isInitialLoading, 250 );
  const showContentLoading = useDelayedLoading( isContentLoading, 400 );
  const t = useTranslations( 'dashboard.admin' );
  const tc = useTranslations( 'dashboard.common' );
  const { view, setView } = usePersistedViewMode( 'creators', 'cards' );
  const { pagination: internalPagination, setPagination: setInternalPagination } = usePersistedPagination( 'creators' );
  const isServerSide = externalPagination !== undefined && externalOnPaginationChange !== undefined;
  const pagination = isServerSide ? externalPagination : internalPagination;
  const setPagination = isServerSide ? externalOnPaginationChange : setInternalPagination;
  const [ sorting, setSorting ] = React.useState<SortingState>( [] );
  const [ columnFilters, setColumnFilters ] = React.useState<ColumnFiltersState>(
    defaultContentTypeFilter?.length
      ? [ { id: 'content_type', value: defaultContentTypeFilter } ]
      : []
  );
  const [ columnVisibility, setColumnVisibility ] = React.useState<VisibilityState>( { country: false } );
  const [ rowSelection, setRowSelection ] = React.useState( {} );
  const [ internalGlobalFilter, setInternalGlobalFilter ] = React.useState( '' );
  const [ selectedCreator, setSelectedCreator ] =
    React.useState<ModelsCreatorResponse | null>( null );
  const [ isSheetOpen, setIsSheetOpen ] = React.useState( false );
  const [ pendingAction, setPendingAction ] = React.useState<{
    creator: ModelsCreatorResponse;
    type: "approve" | "reject";
    comments: string;
  } | null>( null );
  const [ hasSearched, setHasSearched ] = React.useState( false );
  const globalFilter = internalGlobalFilter;
  const hasActiveSearch = globalFilter.trim().length > 0;
  const showTableControls = creators.length > 0 || hasActiveSearch || hasSearched;
  const globalFilterRef = React.useRef( globalFilter );

  React.useEffect( () => {
    globalFilterRef.current = globalFilter;
  }, [ globalFilter ] );

  const commitGlobalFilter = React.useCallback( ( nextValue: string ) => {
    setHasSearched( true );
    setInternalGlobalFilter( nextValue );
  }, [] );

  const setGlobalFilter = React.useCallback( ( updater: Updater<string> ) => {
    const currentValue = globalFilterRef.current;
    const nextValue = typeof updater === 'function' ? updater( currentValue ) : updater;
    commitGlobalFilter( nextValue );
  }, [ commitGlobalFilter ] );

  const updateStatus = useUpdateCreatorProfileStatus();

  const handleOnApproveProfile = ( creator: ModelsCreatorResponse ) => {
    setPendingAction( { creator, type: "approve", comments: "" } );
  };

  const handleOnRejectProfile = ( creator: ModelsCreatorResponse ) => {
    setPendingAction( { creator, type: "reject", comments: "" } );
  };

  const handleConfirm = () => {
    if ( !pendingAction?.creator.id ) return;
    const { creator, type } = pendingAction;
    updateStatus.mutate(
      { id: creator.id!, creator_status: type === "approve" ? "approved" : "rejected", comments: pendingAction.comments },
      {
        onSuccess: () => {
          setPendingAction( null );
          type === "approve"
            ? toast.success( t( 'creatorStatus.approvedToast', { name: creator.first_name || tc( 'cards.creatorFallback' ) } ) )
            : toast.success( t( 'creatorStatus.rejectedToast', { name: creator.first_name || tc( 'cards.creatorFallback' ) } ) );
        },
        onError: () => {
          setPendingAction( null );
          toast.error( t( 'creatorStatus.errorToast' ) );
        },
      }
    );
  };

  const columns = React.useMemo(
    () =>
      getColumns( {
        onViewDetails: ( creator ) => {
          setSelectedCreator( creator );
          setIsSheetOpen( true );
        },
        t,
      } ),
    [ t ]
  );

  const table = useReactTable( {
    data: creators,
    columns,
    getRowId: ( row, index ) => row.id || row.creator_id || row.user_id || `creator-${ index }`,
    globalFilterFn: creatorGlobalFilter,
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

  React.useEffect( () => {
    if ( !onContentTypeFilterChange ) return;
    const contentTypeFilter = columnFilters.find( ( filter ) => filter.id === 'content_type' );
    if ( Array.isArray( contentTypeFilter?.value ) ) {
      onContentTypeFilterChange( contentTypeFilter.value as string[] );
      return;
    }
    onContentTypeFilterChange( undefined );
  }, [ columnFilters, onContentTypeFilterChange ] );

  return (
    <>
      <div className="grow relative flex flex-col min-h-0 bg-slate-50/50">
        <AnimatePresence>
          { showLoading && (
            <motion.div
              key="skeleton"
              className="absolute inset-0 z-30 bg-slate-50/50"
              exit={ { opacity: 0 } }
              transition={ { duration: 0.3 } }
            >
              { view === 'table' ? <DataTableSkeleton /> : <TableSkeleton /> }
            </motion.div>
          ) }
        </AnimatePresence>
        { error && <AdminNetworkErrorState key="error" fill message={ error.message } className="flex-1 h-full" /> }
        { !isInitialLoading && !error && (
          <motion.div
            key="content"
            initial={ { opacity: 0 } }
            animate={ { opacity: 1 } }
            transition={ { duration: 0.3 } }
            className="flex flex-col grow relative min-h-0"
          >
            { showTableControls && (
              <CreatorsTableToolbar
                table={ table }
                view={ view }
                setView={ setView }
                showContentTypeFilter={ showContentTypeFilter }
                onSearchInputChange={ setGlobalFilter }
                onSearchChange={ onSearchChange }
              />
            ) }
            <ScrollArea className="flex-1 min-h-0">
              <CreatorsView
                table={ table }
                view={ view }
                onViewDetails={ ( creator ) => {
                  setSelectedCreator( creator );
                  setIsSheetOpen( true );
                } }
                onApproveProfile={ handleOnApproveProfile }
                onRejectProfile={ handleOnRejectProfile }
              />
              { showContentLoading && table.getRowModel().rows.length === 0 && (
                <DataTableSkeleton showToolbar={ false } className="absolute inset-x-0 top-12 z-20 bg-slate-50/50" />
              ) }
            </ScrollArea>
            { showTableControls && (
              <div className="px-3 shrink-0 border-t bg-slate-50/50">
                <DataTablePagination table={ table } />
              </div>
            ) }
            <CreatorDetailsSheet
              creator={ selectedCreator }
              open={ isSheetOpen }
              onOpenChange={ setIsSheetOpen }
              onApproveProfile={ handleOnApproveProfile }
              onRejectProfile={ handleOnRejectProfile }
            />
          </motion.div>
        ) }
      </div>

      <ConfirmDialog
        open={ !!pendingAction }
        onOpenChange={ ( open ) => { if ( !open ) setPendingAction( null ); } }
        title={ pendingAction?.type === "approve" ? t( 'creatorStatus.confirmApproveTitle' ) : t( 'creatorStatus.confirmRejectTitle' ) }
        description={
          pendingAction?.type === "approve"
            ? t( 'creatorStatus.confirmApproveDesc', { name: pendingAction.creator.first_name || t( 'creatorStatus.thisCreator' ) } )
            : t( 'creatorStatus.confirmRejectDesc', { name: pendingAction?.creator.first_name || t( 'creatorStatus.thisCreator' ) } )
        }
        confirmLabel={ pendingAction?.type === "approve" ? t( 'creatorStatus.approve' ) : t( 'creatorStatus.reject' ) }
        variant={ pendingAction?.type === "approve" ? "default" : "destructive" }
        onConfirm={ handleConfirm }
        isLoading={ updateStatus.isPending }
        loadingText={ pendingAction?.type === "approve" ? t( 'creatorStatus.approving' ) : t( 'creatorStatus.rejecting' ) }
        className="w-[560px]"
      >
        <SuperField
          type="textarea"
          label={ t( 'creatorStatus.commentLabel' ) }
          placeholder={ t( 'creatorStatus.commentPlaceholder' ) }
          value={ pendingAction?.comments }
          onChange={ ( e ) => {
            setPendingAction( {
              ...pendingAction!,
              comments: e.target.value,
            } );
          } }
          fieldClassName="min-h-40"
        />
      </ConfirmDialog>
    </>
  );
}
