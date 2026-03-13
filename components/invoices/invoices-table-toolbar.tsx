"use client";

import { type Table } from '@tanstack/react-table';
import {
  FilterHorizontalIcon,
  SearchIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { CalendarDays, ChevronDown } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/dashboard-ui/popover';
import { type DateRange } from '@/components/dashboard-ui/superfield/date-picker-input';
import { SuperField } from '@/components/dashboard-ui/super-field';
import { Button } from '@/components/dashboard-ui/button';
import { ButtonGroup } from '@/components/dashboard-ui/button-group';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/dashboard-ui/dropdown-menu';
import { ModelsInvoiceResponse } from '@/lib/api/generated/models';
import '@/app/styles/components/data-table.css';

interface InvoicesTableToolbarProps {
  table: Table<ModelsInvoiceResponse>;
  searchValue: string;
  setSearchValue: ( value: string ) => void;
  dateFilterType: 'issued_date' | 'due_date';
  setDateFilterType: ( value: 'issued_date' | 'due_date' ) => void;
  dateRange: DateRange | undefined;
  setDateRange: ( value: DateRange | undefined ) => void;
  statuses: string[];
}

export function InvoicesTableToolbar( {
  table,
  searchValue,
  setSearchValue,
  dateFilterType,
  setDateFilterType,
  dateRange,
  setDateRange,
  statuses,
}: InvoicesTableToolbarProps ) {
  return (
    <div className="dt-toolbar">
      <SuperField
        type="search"
        placeholder="Search invoices..."
        prefix={ <HugeiconsIcon icon={ SearchIcon } /> }
        fieldClassName="placeholder:text-gray-400 font-regular"
        value={ searchValue }
        onChange={ ( e ) => setSearchValue( e.target.value ) }
        className="w-full md:max-w-md bg-background"
        autoComplete="off"
      />
      <ButtonGroup>
        <Popover>
          <PopoverTrigger
            render={
              <Button variant="outline" size="sm" className="relative">
                <CalendarDays className="size-4" strokeWidth={ 1.5 } />
                <ChevronDown className="size-4" strokeWidth={ 1 } />
                { dateRange?.from && (
                  <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-primary" />
                ) }
              </Button>
            }
          />
          <PopoverContent align="end" className="w-72 p-4 flex flex-col gap-3">
            <SuperField
              type="select"
              label="Filter by date"
              value={ dateFilterType }
              onValueChange={ ( v ) => setDateFilterType( ( v ?? 'issued_date' ) as 'issued_date' | 'due_date' ) }
              options={ [
                { value: 'issued_date', label: 'Issue Date' },
                { value: 'due_date', label: 'Due Date' },
              ] }
            />
            <SuperField
              type="datepicker"
              label="Date range"
              mode="range"
              value={ dateRange }
              onChange={ ( v ) => setDateRange( v as DateRange | undefined ) }
              placeholder="Select date range"
            />
            { dateRange?.from && (
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground w-full"
                onClick={ () => setDateRange( undefined ) }
              >
                Clear dates
              </Button>
            ) }
          </PopoverContent>
        </Popover>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <HugeiconsIcon icon={ FilterHorizontalIcon } className="text-sm" />
              <ChevronDown className="size-4" strokeWidth={ 1 } />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-48">
            <div
              className="focus:bg-accent gap-2 rounded-sm px-2 py-1.5 relative flex cursor-default items-center text-xs text-primary hover:bg-accent"
              onClick={ () => { table.resetColumnFilters(); setDateRange( undefined ); } }
            >
              Clear Filters
            </div>
            <DropdownMenuSeparator />
            { statuses.map( ( status ) => {
              const column = table.getColumn( 'invoice_status' );
              const filterValue = ( column?.getFilterValue() as string[] ) || [];
              return (
                <DropdownMenuCheckboxItem
                  key={ status }
                  className="capitalize"
                  checked={ filterValue.includes( status ) }
                  onCheckedChange={ ( checked ) => {
                    column?.setFilterValue(
                      checked
                        ? [ ...filterValue, status ]
                        : filterValue.filter( ( v ) => v !== status )
                    );
                  } }
                >
                  { status.replace( /_/g, ' ' ) }
                </DropdownMenuCheckboxItem>
              );
            } ) }
          </DropdownMenuContent>
        </DropdownMenu>
      </ButtonGroup>
    </div>
  );
}
