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
import { useTranslations } from 'next-intl';

interface DataTableFilterExtraOption {
  id: string;
  label: string;
  checked: boolean;
  disabled?: boolean;
  onCheckedChange: ( checked: boolean ) => void;
}

interface DataTableFilterDropdownProps<TData> {
  table: Table<TData>;
  columnId: string;
  options: string[];
  title?: string;
  labelFn?: ( value: string ) => string;
  onValueChange?: ( value: string[] | undefined ) => void;
  selectionMode?: 'multiple' | 'single';
  /** Extra checkboxes rendered below the option list, controlled independently of the column filter. */
  extraOptions?: DataTableFilterExtraOption[];
}

export function DataTableFilterDropdown<TData>( {
  table,
  columnId,
  options,
  title,
  labelFn,
  onValueChange,
  selectionMode = 'multiple',
  extraOptions = [],
}: DataTableFilterDropdownProps<TData> ) {
  const column = table.getColumn( columnId );
  const filterValue = column?.getFilterValue() as string[] | undefined;
  const t = useTranslations( 'dashboard.common' );

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
            if ( !column ) return;
            column.setFilterValue( undefined );
            onValueChange?.( undefined );
          } }
        >
          { t( 'search.select_all' ) }
        </div>
        <DropdownMenuSeparator />
        { options.map( ( option ) => {
          return (
            <DropdownMenuCheckboxItem
              key={ option }
              className={ cn( 'capitalize' ) }
              closeOnClick={ false }
              checked={
                Array.isArray( filterValue ) && filterValue.includes( option )
              }
              onCheckedChange={ ( value ) => {
                if ( !column ) return;

                const currentFilters = ( column.getFilterValue() as string[] ) ?? [];
                if ( selectionMode === 'single' ) {
                  const nextValue = value ? [ option ] : undefined;
                  column.setFilterValue( nextValue );
                  onValueChange?.( nextValue );
                  return;
                }

                const nextFilters = new Set( currentFilters );

                if ( value ) {
                  nextFilters.add( option );
                } else {
                  nextFilters.delete( option );
                }

                const nextValue = nextFilters.size > 0 ? Array.from( nextFilters ) : undefined;
                column.setFilterValue( nextValue );
                onValueChange?.( nextValue );
              } }
            >
              { labelFn ? labelFn( option ) : option.replace( /_/g, ' ' ) }
            </DropdownMenuCheckboxItem>
          );
        } ) }
        { extraOptions.length > 0 && (
          <>
            <DropdownMenuSeparator />
            { extraOptions.map( ( extraOption ) => (
              <DropdownMenuCheckboxItem
                key={ extraOption.id }
                closeOnClick={ false }
                disabled={ extraOption.disabled }
                checked={ extraOption.checked }
                onCheckedChange={ extraOption.onCheckedChange }
              >
                { extraOption.label }
              </DropdownMenuCheckboxItem>
            ) ) }
          </>
        ) }
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
