"use client";

import { Button } from "@/components/dashboard-ui/button";
import { ChevronDown, Settings2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/dashboard-ui/dropdown-menu";
import { Table } from "@tanstack/react-table";
import { HugeiconsIcon } from "@hugeicons/react";
import { EyeIcon } from "@hugeicons/core-free-icons";
import { ButtonGroup } from "@/components/dashboard-ui/button-group";
import { useTranslations } from "next-intl";
import { useFilterLabel } from "@/lib/hooks/use-filter-label";
interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
  labels?: Record<string, string>;
}

export function DataTableViewOptions<TData>( {
  table,
  labels,
}: DataTableViewOptionsProps<TData> ) {
  const tc = useTranslations( 'dashboard.common' );
  const getFilterLabel = useFilterLabel();
  return (
    <ButtonGroup className="ml-auto h-8 lg:flex font-normal">
      <Button variant='outline' size={ 'icon-sm' }>
        <HugeiconsIcon icon={ EyeIcon } className='text-sm' />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className={ 'h-8' }>
          <Button variant='outline' size={ 'sm' } className={ 'font-regular' }>
            { tc( 'columns' ) }
            <ChevronDown width={ 1 } />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[240px]">
          <DropdownMenuGroup>
            <DropdownMenuLabel>{ tc( 'toggleColumns' ) }</DropdownMenuLabel>
            <DropdownMenuSeparator />
            { table
              .getAllColumns()
              .filter(
                ( column ) =>
                  typeof column.accessorFn !== "undefined" && column.getCanHide()
              )
              .map( ( column ) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={ column.id }
                    className="capitalize"
                    checked={ column.getIsVisible() }
                    onCheckedChange={ ( value ) => column.toggleVisibility( !!value ) }
                  >
                    { labels?.[ column.id ] || getFilterLabel( column.id ) }
                  </DropdownMenuCheckboxItem>
                );
              } ) }
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  );
}
