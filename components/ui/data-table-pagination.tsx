"use client";

import { Table } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { Button } from "@/components/dashboard-ui/button";
import { cn } from "@/lib/utils";
import { SuperField } from "@/components/dashboard-ui/super-field";
import '@/app/styles/components/data-table-pagination.css';


interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  pageSizeOptions?: number[];
  showSelectionCount?: boolean;
  className?: string;
}

interface NavButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
  disabled: boolean;
  variant?: 'outline' | 'ghost';
  size?: Parameters<typeof Button>[ 0 ][ 'size' ];
  title: string;
  className?: string;
}

function NavButton( {
  icon,
  onClick,
  disabled,
  variant = 'outline',
  size = 'icon',
  title,
  className
}: NavButtonProps ) {
  return (
    <Button
      variant={ variant }
      size={ size }
      onClick={ onClick }
      disabled={ disabled }
      className={ cn( "pagination-nav-button", className ) }
    >
      { icon }
      <span className="sr-only">{ title }</span>
    </Button>
  );
}

function PaginationSelectionCount<TData>( { table }: { table: Table<TData>; } ) {
  return (
    <div className="pagination-selection-count max-md:hidden">
      { table.getFilteredSelectedRowModel().rows.length } of{ " " }
      { table.getFilteredRowModel().rows.length } row(s) selected.
    </div>
  );
}

function PaginationRowsPerPage<TData>( {
  table,
  pageSizeOptions
}: {
  table: Table<TData>;
  pageSizeOptions: number[];
} ) {
  return (
    <div className="pagination-rows-per-page">
      <p className="pagination-rows-label">Rows per page</p>
      <SuperField
        type="select"
        value={ `${ table.getState().pagination.pageSize }` }
        options={ pageSizeOptions }
        onValueChange={ ( value ) => {
          table.setPageSize( Number( value ) );
        } }
        className="pagination-field"
      />
    </div>
  );
}

function PaginationPageStatus<TData>( { table }: { table: Table<TData>; } ) {
  return (
    <div className="pagination-page-status">
      Page { table.getState().pagination.pageIndex + 1 } of{ " " }
      { table.getPageCount() }
    </div>
  );
}

function PaginationNavigation<TData>( { table }: { table: Table<TData>; } ) {
  return (
    <div className="pagination-navigation">
      <NavButton
        icon={ <ChevronsLeft className="h-4 w-4" /> }
        className="hidden lg:flex"
        onClick={ () => table.setPageIndex( 0 ) }
        disabled={ !table.getCanPreviousPage() }
        title="Go to first page"
      />

      <NavButton
        icon={ <ChevronLeft className="h-4 w-4" /> }
        onClick={ () => table.previousPage() }
        disabled={ !table.getCanPreviousPage() }
        title="Go to previous page"
      />

      <NavButton
        icon={ <ChevronRight className="h-4 w-4" /> }
        onClick={ () => table.nextPage() }
        disabled={ !table.getCanNextPage() }
        title="Go to next page"
      />

      <NavButton
        icon={ <ChevronsRight className="h-4 w-4" /> }
        className="hidden lg:flex"
        onClick={ () => table.setPageIndex( table.getPageCount() - 1 ) }
        disabled={ !table.getCanNextPage() }
        title="Go to last page"
      />
    </div>
  );
}

/**
 * DataTablePagination Component
 * 
 * A reusable pagination component for @tanstack/react-table.
 * Supports selection count, customizable page size options, and responsive navigation.
 */
export function DataTablePagination<TData>( {
  table,
  pageSizeOptions = [ 10, 20, 30, 40, 50, 100, 200 ],
  showSelectionCount = true,
  className,
}: DataTablePaginationProps<TData> ) {
  return (
    <div className={ cn( "pagination-container", className ) }>
      { showSelectionCount ? (
        <PaginationSelectionCount table={ table } />
      ) : (
        <div className="pagination-selection-placeholder" />
      ) }

      <div className="pagination-controls">
        <PaginationRowsPerPage
          table={ table }
          pageSizeOptions={ pageSizeOptions }
        />

        <div className="pagination-status-container">
          <PaginationPageStatus table={ table } />
          <PaginationNavigation table={ table } />
        </div>
      </div>
    </div>
  );
}
