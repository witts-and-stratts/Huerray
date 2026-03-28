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
import { getColumns } from "./creators-columns";
import { CreatorDetailsSheet } from "./creator-details-sheet";
import { CreatorsTableToolbar } from "./creators-table-toolbar";
import { CreatorsView } from "./creators-view";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import { ModelsCreatorResponse } from "@/lib/api/generated/models";
import { AnimatePresence, motion } from "motion/react";
import { TableSkeleton } from "@/components/dashboard-ui/table-skeleton";
import { DataTableSkeleton } from "@/components/dashboard-ui/data-table-skeleton";
import { TableErrorState } from "@/components/dashboard-ui/table-error-state";
import { useUpdateCreatorProfileStatus } from "@/lib/api/hooks/creators";
import { ConfirmDialog } from "@/components/dashboard-ui/confirm-dialog";
import { toast } from "sonner";
import { SuperField } from "@/components/dashboard-ui/super-field";
import { useDelayedLoading } from "@/lib/hooks/use-delayed-loading";
import { usePersistedViewMode } from "@/lib/hooks/use-persisted-view-mode";
import { usePersistedPagination } from "@/lib/hooks/use-persisted-pagination";
import { useTranslations } from "next-intl";

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
  error?: Error | null;
}

export function CreatorsTable( {
  creators = [],
  isLoading = false,
  error = null,
}: CreatorsTableProps ) {
  const showLoading = useDelayedLoading( isLoading, 250 );
  const t = useTranslations( 'dashboard.admin' );
  const tc = useTranslations( 'dashboard.common' );
  const { view, setView } = usePersistedViewMode( 'creators', 'cards' );
  const { pagination, setPagination } = usePersistedPagination( 'creators' );
  const [ sorting, setSorting ] = React.useState<SortingState>( [] );
  const [ columnFilters, setColumnFilters ] = React.useState<ColumnFiltersState>( [] );
  const [ columnVisibility, setColumnVisibility ] = React.useState<VisibilityState>( { country: false } );
  const [ rowSelection, setRowSelection ] = React.useState( {} );
  const [ globalFilter, setGlobalFilter ] = React.useState( '' );
  const [ selectedCreator, setSelectedCreator ] =
    React.useState<ModelsCreatorResponse | null>( null );
  const [ isSheetOpen, setIsSheetOpen ] = React.useState( false );
  const [ pendingAction, setPendingAction ] = React.useState<{
    creator: ModelsCreatorResponse;
    type: "approve" | "reject";
    comments: string;
  } | null>( null );

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

  const statuses = React.useMemo( () => {
    const uniqueStatuses = Array.from(
      new Set( creators.map( ( creator ) => creator.creator_status || "active" ) )
    );
    return uniqueStatuses as string[];
  }, [ creators ] );

  const countries = React.useMemo( () =>
    Array.from( new Set( creators.map( c => c.country ).filter( Boolean ) ) ).sort() as string[],
    [ creators ]
  );

  const genders = React.useMemo( () =>
    Array.from( new Set( creators.map( c => c.gender ).filter( Boolean ) ) ).sort() as string[],
    [ creators ]
  );


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
      { showLoading && ( view === 'table' ? <DataTableSkeleton key="skeleton-table" /> : <TableSkeleton key="skeleton-cards" /> ) }
      { error && <TableErrorState key="error" entity="creators" message={ error.message } /> }
      { !isLoading && !error && (
        <motion.div
          key="content"
          initial={ { opacity: 0 } }
          animate={ { opacity: 1 } }
          exit={ { opacity: 0 } }
          transition={ { duration: 0.3 } }
          className="flex flex-col bg-slate-50/50 grow relative min-h-0"
        >
          <div className="flex-1 min-h-0 overflow-auto">
            <CreatorsTableToolbar
              table={ table }
              statuses={ statuses }
              countries={ countries }
              genders={ genders }
              view={ view }
              setView={ setView }
            />
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
          </div>
          <div className="px-3 shrink-0 border-t bg-slate-50/50">
            <DataTablePagination table={ table } />
          </div>
          <CreatorDetailsSheet
            creator={ selectedCreator }
            open={ isSheetOpen }
            onOpenChange={ setIsSheetOpen }
            onApproveProfile={ handleOnApproveProfile }
            onRejectProfile={ handleOnRejectProfile }
          />
        </motion.div>
      ) }

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
    </AnimatePresence>
  );
}
