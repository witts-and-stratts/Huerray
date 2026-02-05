'use client';

import { SearchIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Table } from '@tanstack/react-table';
import * as React from 'react';

import { SuperField } from '@/components/dashboard-ui/super-field';
import { cn } from '@/lib/dashboard-utils';

interface DataTableSearchProps<TData> {
  table: Table<TData>;
  columnId: string;
  placeholder?: string;
  className?: string;
}

export function DataTableSearch<TData>( {
  table,
  columnId,
  placeholder = 'Search...',
  className = 'max-w-sm bg-background',
}: DataTableSearchProps<TData> ) {
  const [ searchValue, setSearchValue ] = React.useState(
    ( table.getColumn( columnId )?.getFilterValue() as string ) ?? ''
  );

  // Debounce search input
  React.useEffect( () => {
    const timer = setTimeout( () => {
      table.getColumn( columnId )?.setFilterValue( searchValue );
    }, 100 );

    return () => clearTimeout( timer );
  }, [ searchValue, table, columnId ] );

  return (
    <SuperField
      type='search'
      placeholder={ placeholder }
      prefix={ <HugeiconsIcon icon={ SearchIcon } /> }
      fieldClassName='placeholder:text-gray-400 font-regular'
      value={ searchValue }
      onChange={ ( event ) => setSearchValue( event.target.value ) }
      className={ cn( className, 'h-8' ) }
      autoComplete='off'
    />
  );
}
