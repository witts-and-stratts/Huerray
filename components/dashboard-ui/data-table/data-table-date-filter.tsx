'use client';

import * as React from 'react';
import { Calendar03Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Table } from '@tanstack/react-table';
import { format } from 'date-fns';

import { Button } from '@/components/dashboard-ui/button';
import { Calendar } from '@/components/dashboard-ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/dashboard-ui/popover';
import { cn } from '@/lib/dashboard-utils';

interface DateRangeFilterProps<TData> {
  table: Table<TData>;
  columnId: string;
  placeholder?: string;
}

export function DataTableDateFilter<TData>( {
  table,
  columnId,
  placeholder = 'Filter by date',
}: DateRangeFilterProps<TData> ) {
  const column = table.getColumn( columnId );
  const [ dateRange, setDateRange ] = React.useState<{
    from?: Date;
    to?: Date;
  }>( {} );

  React.useEffect( () => {
    if ( dateRange?.from || dateRange?.to ) {
      column?.setFilterValue( dateRange );
    } else {
      column?.setFilterValue( undefined );
    }
  }, [ dateRange, column ] );

  const resetFilter = () => {
    setDateRange( {} );
  };

  const hasFilter = !!( dateRange?.from || dateRange?.to );

  return (
    <Popover>
      <PopoverTrigger>
        <Button
          variant="outline"
          size="sm"
          className={ cn(
            'justify-start text-left font-regular',
            hasFilter && 'border-primary'
          ) }
        >
          <HugeiconsIcon icon={ Calendar03Icon } className="mr-2 h-4 w-4" />
          { dateRange?.from ? (
            dateRange.to ? (
              <>
                { format( dateRange.from, 'MMM dd, yyyy' ) } -{ ' ' }
                { format( dateRange.to, 'MMM dd, yyyy' ) }
              </>
            ) : (
              format( dateRange.from, 'MMM dd, yyyy' )
            )
          ) : (
            <span>{ placeholder }</span>
          ) }
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          selected={ dateRange as { from: Date; to?: Date } }
          onSelect={ ( range ) => setDateRange( range || {} ) }
          numberOfMonths={ 2 }
          initialFocus
        />
        { hasFilter && (
          <div className="p-3 border-t">
            <Button
              variant="outline"
              size="sm"
              onClick={ resetFilter }
              className="w-full"
            >
              Clear filter
            </Button>
          </div>
        ) }
      </PopoverContent>
    </Popover>
  );
}
