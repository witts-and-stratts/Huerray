'use client';

import { SearchIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Table } from '@tanstack/react-table';
import * as React from 'react';

import { SuperField } from '@/components/dashboard-ui/super-field';
import { cn } from '@/lib/dashboard-utils';

interface DataTableSearchProps<TData> {
  table?: Table<TData>;
  columnId: string;
  placeholder?: string;
  className?: string;
  value?: string;
  onInputChange?: ( value: string ) => void;
  onValueChange?: ( value: string ) => void;
  filterMode?: 'column' | 'global' | 'none';
  debounceMs?: number;
}

function DataTableSearchComponent<TData>( {
  table,
  columnId,
  placeholder = 'Search...',
  className = 'max-w-sm bg-background',
  value,
  onInputChange,
  onValueChange,
  filterMode = 'column',
  debounceMs = 100,
}: DataTableSearchProps<TData> ) {
  const isControlled = value !== undefined;
  const [ searchValue, setSearchValue ] = React.useState(
    value ?? ( table?.getColumn( columnId )?.getFilterValue() as string ) ?? ''
  );
  const tableRef = React.useRef<Table<TData> | undefined>( table );
  const onInputChangeRef = React.useRef( onInputChange );
  const onValueChangeRef = React.useRef( onValueChange );
  const lastCommittedValueRef = React.useRef( searchValue );

  React.useEffect( () => {
    tableRef.current = table;
  }, [ table ] );

  React.useEffect( () => {
    onInputChangeRef.current = onInputChange;
  }, [ onInputChange ] );

  React.useEffect( () => {
    onValueChangeRef.current = onValueChange;
  }, [ onValueChange ] );

  React.useEffect( () => {
    if ( isControlled ) setSearchValue( value ?? '' );
  }, [ isControlled, value ] );

  // Debounce search input
  React.useEffect( () => {
    const timer = setTimeout( () => {
      if ( lastCommittedValueRef.current === searchValue ) return;

      lastCommittedValueRef.current = searchValue;
      onValueChangeRef.current?.( searchValue );

      if ( filterMode === 'global' ) {
        tableRef.current?.setGlobalFilter( searchValue );
      } else if ( filterMode === 'column' ) {
        tableRef.current?.getColumn( columnId )?.setFilterValue( searchValue );
      }
    }, debounceMs );

    return () => clearTimeout( timer );
  }, [ searchValue, columnId, filterMode, debounceMs ] );

  const handleChange = ( event: React.ChangeEvent<HTMLInputElement> ) => {
    const nextValue = event.target.value;
    setSearchValue( nextValue );
    onInputChangeRef.current?.( nextValue );
  };

  return (
    <SuperField
      type='search'
      placeholder={ placeholder }
      prefix={ <HugeiconsIcon icon={ SearchIcon } /> }
      fieldClassName='placeholder:text-gray-400 font-regular'
      value={ searchValue }
      onChange={ handleChange }
      className={ cn( className, 'h-8' ) }
      autoComplete='off'
    />
  );
}

export const DataTableSearch = React.memo( DataTableSearchComponent ) as typeof DataTableSearchComponent;
