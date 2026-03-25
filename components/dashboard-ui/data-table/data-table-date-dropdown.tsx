'use client';

import * as React from 'react';
import { CalendarDays, ChevronDown } from 'lucide-react';

import { Button } from '@/components/dashboard-ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/dashboard-ui/popover';
import { SuperField } from '@/components/dashboard-ui/super-field';
import { type DateRange } from '@/components/dashboard-ui/superfield/date-picker-input';

export interface DataTableDateDropdownProps<T extends string = string> {
  dateFilterType?: T;
  setDateFilterType?: ( value: T ) => void;
  dateRange?: DateRange;
  setDateRange?: ( value: DateRange | undefined ) => void;
  dateFilterOptions: { value: T; label: string }[];
  filterByDateLabel?: string;
  dateRangeLabel?: string;
  selectDateRangePlaceholder?: string;
  clearDatesLabel?: string;
}

export function DataTableDateDropdown<T extends string>( {
  dateFilterType,
  setDateFilterType,
  dateRange,
  setDateRange,
  dateFilterOptions,
  filterByDateLabel = 'Filter by date',
  dateRangeLabel = 'Date range',
  selectDateRangePlaceholder = 'Select date range',
  clearDatesLabel = 'Clear dates',
}: DataTableDateDropdownProps<T> ) {
  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button variant='outline' size='sm' className={ `h-8 relative${ dateRange?.from ? ' border-primary text-primary' : '' }` }>
            <CalendarDays className='size-4' strokeWidth={ 1.5 } />
            <ChevronDown className='size-4' strokeWidth={ 1 } />
            { dateRange?.from && (
              <span className='absolute -top-1 -right-1 h-2 w-2 rounded-full bg-primary' />
            ) }
          </Button>
        }
      />
      <PopoverContent align='end' className='w-72 p-4 flex flex-col gap-3'>
        <SuperField
          type='select'
          label={ filterByDateLabel }
          value={ dateFilterType }
          onValueChange={ ( v ) => setDateFilterType?.( ( v as T ) ?? dateFilterOptions[0]?.value ) }
          options={ dateFilterOptions }
        />
        <SuperField
          type='datepicker'
          label={ dateRangeLabel }
          mode='range'
          value={ dateRange }
          onChange={ ( v ) => setDateRange?.( v as DateRange | undefined ) }
          placeholder={ selectDateRangePlaceholder }
        />
        { dateRange?.from && (
          <Button
            variant='ghost'
            size='sm'
            className='text-muted-foreground w-full'
            onClick={ () => setDateRange?.( undefined ) }
          >
            { clearDatesLabel }
          </Button>
        ) }
      </PopoverContent>
    </Popover>
  );
}
