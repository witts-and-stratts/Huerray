import type { ComponentProps } from "react";
import { cn } from "@/lib/dashboard-utils";
import { Button } from "../dashboard-ui/button";
import { Column, Row, Table } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Badge } from "../dashboard-ui/badge";
import { Checkbox } from "../dashboard-ui/checkbox";
import { useMessage } from "@/lib/hooks/use-filter-label";

interface THeadProps<T> {
  column?: Column<T, unknown>;
  title: string;
  className?: string;
  shouldSort?: boolean;
}

export function THead<T>( { column, title, className, shouldSort = true }: THeadProps<T> ) {

  const handleSort = () => {
    if ( !shouldSort ) return;

    column?.toggleSorting( column.getIsSorted() === "asc" );
  };

  return (
    <Button
      variant="ghost"
      onClick={ handleSort }
      className={ cn( 'font-regular pl-0 font-normal! text-sm!', className ) }
    >
      { title }
      { shouldSort && <ArrowUpDown className="ml-2 size-3.5" strokeWidth={ 1 } /> }
    </Button>
  );
}

interface TBadgeProps {
  title: string;
  variant?: ComponentProps<typeof Badge>[ 'variant' ];
  className?: string;
}

export function TBadge( { title, variant, className }: TBadgeProps ) {
  return (
    <Badge variant={ variant } className={ cn( 'px-1.5 py-0 text-xs font-normal whitespace-nowrap', className ) }>
      { useMessage( title ) }
    </Badge>
  );
}


interface TCheckboxProps<T> {
  table: Table<T>;
  className?: string;
}

export function TCheckboxHead<T>( { table, className }: TCheckboxProps<T> ) {
  return (
    <Checkbox
      checked={ table.getIsAllPageRowsSelected() }
      onCheckedChange={ ( value ) => table.toggleAllPageRowsSelected( !!value ) }
      aria-label="Select all"
      className={ className }
    />
  );
}

export function TCheckboxCell<T>( { row, className }: { row: Row<T>; className?: string; } ) {
  return (
    <Checkbox
      checked={ row.getIsSelected() }
      onCheckedChange={ ( value ) => row.toggleSelected( !!value ) }
      aria-label="Select row"
      className={ cn( 'dt-table__checkbox', className ) }
    />
  );
}