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
  const { view, setView } = usePersistedViewMode( 'creators', 'cards' );
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
            ? toast.success( `${ creator.first_name || "Creator" } approved successfully` )
            : toast.success( `${ creator.first_name || "Creator" } rejected` );
        },
        onError: () => {
          setPendingAction( null );
          toast.error( `Failed to ${ type } creator` );
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
      } ),
    []
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
      { error && <TableErrorState entity="creators" message={ error.message } /> }
      { !isLoading && !error && (
        <motion.div
          initial={ { opacity: 0 } }
          animate={ { opacity: 1 } }
          exit={ { opacity: 0 } }
          transition={ { duration: 0.3 } }
          className="flex flex-col bg-slate-50/50 grow relative overflow-auto"
        >
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
          <div className="px-3 mt-auto">
            <DataTablePagination table={ table } />
          </div>
          <CreatorDetailsSheet
            creator={ selectedCreator }
            open={ isSheetOpen }
            onOpenChange={ setIsSheetOpen }
          />
        </motion.div>
      ) }

      <ConfirmDialog
        open={ !!pendingAction }
        onOpenChange={ ( open ) => { if ( !open ) setPendingAction( null ); } }
        title={ pendingAction?.type === "approve" ? "Approve creator profile?" : "Reject creator profile?" }
        description={
          pendingAction?.type === "approve"
            ? `${ pendingAction.creator.first_name || "This creator" }'s profile will be approved and they will be notified.`
            : `${ pendingAction?.creator.first_name || "This creator" }'s profile will be rejected and they will be notified.`
        }
        confirmLabel={ pendingAction?.type === "approve" ? "Approve" : "Reject" }
        variant={ pendingAction?.type === "approve" ? "default" : "destructive" }
        onConfirm={ handleConfirm }
        isLoading={ updateStatus.isPending }
        loadingText={ pendingAction?.type === "approve" ? "Approving..." : "Rejecting..." }
        className="w-[560px]"
      >
        <SuperField
          type="textarea"
          label="Comment"
          placeholder="Add a comment"
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
