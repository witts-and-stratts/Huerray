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
import { DataTableSkeleton } from "@/components/dashboard-ui/data-table-skeleton";
import { useUpdateCreatorProfileStatus } from "@/lib/api/hooks/creators";
import { ConfirmDialog } from "@/components/dashboard-ui/confirm-dialog";
import { toast } from "sonner";
import { SuperField } from "@/components/dashboard-ui/super-field";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { setViewMode } from "@/lib/redux/features/ui/uiSlice";
import { useDelayedLoading } from "@/lib/hooks/use-delayed-loading";



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
  const [ sorting, setSorting ] = React.useState<SortingState>( [] );
  const [ columnFilters, setColumnFilters ] = React.useState<ColumnFiltersState>(
    []
  );
  const [ columnVisibility, setColumnVisibility ] =
    React.useState<VisibilityState>( {} );
  const [ rowSelection, setRowSelection ] = React.useState( {} );
  const dispatch = useAppDispatch();
  const persistedView = useAppSelector( ( state ) => state.ui.viewModes[ 'creators' ] ) || 'cards';
  const [ view, setInternalView ] = React.useState<"table" | "cards">( persistedView );

  React.useEffect( () => {
    if ( persistedView && persistedView !== view ) {
      setInternalView( persistedView );
    }
  }, [ persistedView ] );

  const setView = ( newView: "table" | "cards" ) => {
    setInternalView( newView );
    dispatch( setViewMode( { pageKey: 'creators', viewMode: newView } ) );
  };
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
      { showLoading && ( view === 'table' ? <DataTableSkeleton /> : <TableSkeleton /> ) }
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
              onApproveProfile={ handleOnApproveProfile }
              onRejectProfile={ handleOnRejectProfile }
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
