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
import { DataTableViewToggle } from '@/components/dashboard-ui/data-table/data-table-view-toggle';
import { ModelsInvoiceResponse } from '@/lib/api/generated/models';
import '@/app/styles/components/data-table.css';
import { useTranslations } from 'next-intl';

interface InvoicesTableToolbarProps {
  table: Table<ModelsInvoiceResponse>;
  setSearchValue: ( value: string ) => void;
  setLocalSearchValue?: ( value: string ) => void;
  dateFilterType: 'issued_date' | 'due_date';
  setDateFilterType: ( value: 'issued_date' | 'due_date' ) => void;
  dateRange: DateRange | undefined;
  setDateRange: ( value: DateRange | undefined ) => void;
  statuses: string[];
  view: 'table' | 'cards';
  setView: ( view: 'table' | 'cards' ) => void;
  isAdmin?: boolean;
}

export function InvoicesTableToolbar( {
  table,
  setSearchValue,
  setLocalSearchValue,
  dateFilterType,
  setDateFilterType,
  dateRange,
  setDateRange,
  statuses,
  view,
  setView,
  isAdmin,
}: InvoicesTableToolbarProps ) {
  const t = useTranslations( 'dashboard.brand.invoicesPage' );
  return (
    <div className='dt-toolbar'>
      <div className='flex flex-1 items-center space-x-2'>
        <DataTableSearch
          columnId='invoice_number'
          placeholder={ t( 'toolbar.searchPlaceholder' ) }
          className='w-full md:max-w-md bg-background h-8'
          onInputChange={ setLocalSearchValue }
          onValueChange={ setSearchValue }
          filterMode='none'
          debounceMs={ 250 }
        />
      </div>
      <div className='flex items-center gap-2 max-w-full overflow-x-auto'>
        { !isAdmin && <DataTableViewToggle view={ view } setView={ setView } /> }
        <DataTableFilterDropdown
          table={ table }
          columnId='invoice_status'
          options={ statuses }
          title={ t( 'toolbar.status' ) }
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
          <PopoverContent align='end' className='w-72 p-4 flex flex-col gap-3'>
            <SuperField
              type='select'
              label={ t( 'toolbar.filterByDate' ) }
              value={ dateFilterType }
              onValueChange={ ( v ) => setDateFilterType( ( v ?? 'issued_date' ) as 'issued_date' | 'due_date' ) }
              options={ [
                { value: 'issued_date', label: t( 'toolbar.issueDate' ) },
                { value: 'due_date', label: t( 'toolbar.dueDate' ) },
              ] }
            />
            <SuperField
              type='datepicker'
              label={ t( 'toolbar.dateRange' ) }
              mode='range'
              value={ dateRange }
              onChange={ ( v ) => setDateRange( v as DateRange | undefined ) }
              placeholder={ t( 'toolbar.selectDateRange' ) }
            />
            { dateRange?.from && (
              <Button
                variant='ghost'
                size='sm'
                className='text-muted-foreground w-full'
                onClick={ () => setDateRange( undefined ) }
              >
                { t( 'toolbar.clearDates' ) }
              </Button>
            ) }
          </PopoverContent>
        </Popover>
        <DataTableViewOptions table={ table } />
      </div>
    </div>
  );
}
