'use client';

import { type Table } from '@tanstack/react-table';
import { CalendarDays, ChevronDown } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/dashboard-ui/popover';
import { type DateRange } from '@/components/dashboard-ui/superfield/date-picker-input';
import { SuperField } from '@/components/dashboard-ui/super-field';
import { Button } from '@/components/dashboard-ui/button';
import { DataTableSearch } from '@/components/dashboard-ui/data-table/data-table-search';
import { DataTableFilterDropdown } from '@/components/dashboard-ui/data-table/data-table-filter-dropdown';
import { DataTableViewOptions } from '@/components/dashboard-ui/data-table/data-table-view-options';
import { ModelsPaymentResponse } from '@/lib/api/generated/models';
import { useTranslations } from 'next-intl';
import '@/app/styles/components/data-table.css';

interface PaymentsTableToolbarProps {
  table: Table<ModelsPaymentResponse>;
  setSearchValue: ( value: string ) => void;
  setLocalSearchValue?: ( value: string ) => void;
  dateRange: DateRange | undefined;
  setDateRange: ( value: DateRange | undefined ) => void;
  statuses: string[];
}

export function PaymentsTableToolbar( {
  table,
  setSearchValue,
  setLocalSearchValue,
  dateRange,
  setDateRange,
  statuses,
}: PaymentsTableToolbarProps ) {
  const t = useTranslations( 'dashboard.common' );

  return (
    <div className='dt-toolbar'>
      <div className='flex flex-1 items-center space-x-2'>
        <DataTableSearch
          columnId='payment_id'
          placeholder={ t( 'payments.filters.searchPlaceholder' ) }
          className='w-full md:max-w-md bg-background h-8'
          onInputChange={ setLocalSearchValue }
          onValueChange={ setSearchValue }
          filterMode='none'
          debounceMs={ 250 }
        />
      </div>
      <div className='flex items-center gap-2 max-w-full overflow-x-auto'>
        <DataTableFilterDropdown
          table={ table }
          columnId='payment_status'
          options={ statuses }
          title={ t( 'status' ) }
          labelFn={ (status) => t( `payments.status.${ status }` ) }
        />
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
          <PopoverContent align='end' className='w-64 p-4 flex flex-col gap-3'>
            <SuperField
              type='datepicker'
              label={ t( 'payments.filters.dateRange' ) }
              mode='range'
              value={ dateRange }
              onChange={ ( v ) => setDateRange( v as DateRange | undefined ) }
              placeholder={ t( 'payments.filters.selectDateRange' ) }
            />
            { dateRange?.from && (
              <Button
                variant='ghost'
                size='sm'
                className='text-muted-foreground w-full'
                onClick={ () => setDateRange( undefined ) }
              >
                { t( 'payments.filters.clearDates' ) }
              </Button>
            ) }
          </PopoverContent>
        </Popover>
        <DataTableViewOptions table={ table } />
      </div>
    </div>
  );
}
