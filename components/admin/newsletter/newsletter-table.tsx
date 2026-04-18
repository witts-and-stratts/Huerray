"use client";

import * as React from "react";
import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";
import { useTranslations } from "next-intl";

import { ErrorNewsletter } from "@/components/admin/empty-states/error-newsletter";
import { DataTableSkeleton } from "@/components/dashboard-ui/data-table-skeleton";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import { useDelayedLoading } from "@/lib/hooks/use-delayed-loading";
import { usePersistedPagination } from "@/lib/hooks/use-persisted-pagination";

import { getNewsletterColumns } from "./newsletter-columns";
import { NewsletterTableToolbar } from "./newsletter-table-toolbar";
import { NewsletterTableView } from "./newsletter-table-view";
import { ModelsNewsletterSubscriptionResponse } from "@/lib/api/generated";
import { ScrollArea } from "@/components/dashboard-ui/scroll-area";

interface NewsletterTableProps {
  entries?: ModelsNewsletterSubscriptionResponse[];
  total?: number;
  currentSearch: string;
  onSearchCommit: ( value: string ) => void;
  isLoading?: boolean;
  isSearchPending?: boolean;
  error?: Error | null;
  refetch: () => void;
}

export function NewsletterTable( {
  entries = [],
  total = 0,
  currentSearch,
  onSearchCommit,
  isLoading = false,
  isSearchPending = false,
  error = null,
  refetch,
}: NewsletterTableProps ) {
  const errorStatus = ( error as { response?: { status?: number; }; status?: number; } | null )?.response?.status
    ?? ( error as { status?: number; } | null )?.status;
  const isNotFoundError = errorStatus === 404;
  const sourceEntries = React.useMemo(
    () => isNotFoundError ? [] : entries,
    [ entries, isNotFoundError ]
  );
  const t = useTranslations( "dashboard.admin" );
  const tc = useTranslations( "dashboard.common" );
  const showLoading = useDelayedLoading( isLoading, 250 );
  const { pagination, setPagination } = usePersistedPagination( "admin-newsletter" );
  const [ sorting, setSorting ] = React.useState<SortingState>( [] );
  const [ rowSelection, setRowSelection ] = React.useState( {} );
  const [ columnVisibility, setColumnVisibility ] = React.useState<VisibilityState>( {} );

  const columns = React.useMemo(
    () => getNewsletterColumns( { t, tc } ),
    [ t, tc ]
  );

  const table = useReactTable( {
    data: sourceEntries,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    state: {
      sorting,
      rowSelection,
      columnVisibility,
      pagination,
    },
  } );

  const selectedEntries = table.getSelectedRowModel().rows.map( ( row ) => row.original );
  const hasActiveSearch = currentSearch.trim().length > 0;
  const showTableControls = sourceEntries.length > 0 || hasActiveSearch || isSearchPending;
  const showNewsletterEmptyState = sourceEntries.length === 0 && !hasActiveSearch && !isLoading && !isSearchPending;

  return (
    <>
      { showLoading && sourceEntries.length === 0 && <DataTableSkeleton /> }
      { error && !isNotFoundError && <ErrorNewsletter fill message={ error.message } className="flex-1 h-full" onRetry={ refetch } /> }

      { !isLoading && ( !error || isNotFoundError ) && (
        <div className="flex flex-col h-full overflow-hidden bg-slate-50/50">
          <NewsletterTableToolbar
            entries={ sourceEntries }
            selectedEntries={ selectedEntries }
            currentSearch={ currentSearch }
            onSearchCommit={ onSearchCommit }
            t={ t }
            table={ table }
          />

          <ScrollArea className="h-full">
            <div className="p-2 md:p-4">
              <NewsletterTableView table={ table } showNewsletterEmptyState={ showNewsletterEmptyState } />
            </div>
          </ScrollArea>

          { showTableControls && (
            <div className="px-2 md:px-4 shrink-0 border-t bg-slate-50/50">
              <DataTablePagination table={ table } />
            </div>
          ) }
        </div>
      ) }
    </>
  );
}
