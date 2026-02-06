'use client';

import { FilterHorizontalIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Table } from '@tanstack/react-table';
import { ChevronDown } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/dashboard-ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/dashboard-ui/dropdown-menu';
import { cn } from '@/lib/dashboard-utils';

interface DataTableFilterDropdownProps<TData> {
  table: Table<TData>;
  columnId: string;
  options: string[];
  title?: string;
}

export function DataTableFilterDropdown<TData>( {
  table,
  columnId,
  options,
  title,
}: DataTableFilterDropdownProps<TData> ) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className={ 'h-8' }>
        <Button variant='outline' size={ 'sm' } className={ 'h-8' }>
          <HugeiconsIcon icon={ FilterHorizontalIcon } className='text-sm' />
          <span className='font-regular'>{ title }</span>
          <ChevronDown width={ 1 } />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className={ 'min-w-60' }>
        <div
          className='focus:bg-accent focus:text-accent-foreground gap-2 rounded-sm px-2 py-1.5 relative flex cursor-default items-center outline-hidden select-none hover:bg-accent text-xs text-primary'
          onClick={ ( e ) => {
            e.stopPropagation();
            const column = table.getColumn( columnId );
            if ( !column ) return;
            column.setFilterValue( options );
          } }
        >
          Select All
        </div>
        <DropdownMenuSeparator />
        { options.map( ( option ) => {
          const filterValue = table
            .getColumn( columnId )
            ?.getFilterValue() as string[] | undefined;

          return (
            <DropdownMenuCheckboxItem
              key={ option }
              className={ cn( 'capitalize' ) }
              checked={
                Array.isArray( filterValue ) && filterValue.includes( option )
              }
              onCheckedChange={ ( value ) => {
                const column = table.getColumn( columnId );
                if ( !column ) return;

                let currentFilters =
                  ( column.getFilterValue() as string[] ) ?? [];

                if ( value ) {
                  currentFilters = [ ...currentFilters, option ];
                } else {
                  currentFilters = currentFilters.filter( ( s ) => s !== option );
                }

                column.setFilterValue(
                  currentFilters.length > 0 ? currentFilters : undefined
                );
              } }
            >
              { option.replace( /_/g, ' ' ) }
            </DropdownMenuCheckboxItem>
          );
        } ) }
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
