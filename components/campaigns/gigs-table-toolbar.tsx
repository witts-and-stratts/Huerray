"use client";

import {
  FilterHorizontalIcon,
  SearchIcon,
  EyeIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Table } from '@tanstack/react-table';
import { CalendarDays, ChevronDown } from 'lucide-react';
import * as React from 'react';

import { Button, buttonVariants } from '@/components/dashboard-ui/button';
import { ButtonGroup } from '@/components/dashboard-ui/button-group';
import { ToggleGroup, ToggleGroupItem } from '@/components/dashboard-ui/toggle-group';
import { Grip, Table as TableIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/dashboard-ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/dashboard-ui/popover';
import { SuperField } from '@/components/dashboard-ui/super-field';
import { type DateRange } from '@/components/dashboard-ui/superfield/date-picker-input';
import { cn } from '@/lib/dashboard-utils';
import { ModelsGigResponse } from '@/lib/api/generated/models';
import '@/app/styles/components/data-table.css';

interface GigsTableToolbarProps {
  table: Table<ModelsGigResponse>;
  statuses: string[];
  view: 'table' | 'cards';
  setView: ( view: 'table' | 'cards' ) => void;
  hideViewToggle?: boolean;
  actionButtons?: React.ReactNode;
  dateFilterType?: 'created_at' | 'updated_at' | 'posting_start_date' | 'posting_end_date';
  setDateFilterType?: ( value: 'created_at' | 'updated_at' | 'posting_start_date' | 'posting_end_date' ) => void;
  dateRange?: DateRange | undefined;
  setDateRange?: ( value: DateRange | undefined ) => void;
}

export function GigsTableToolbar( {
  table,
  statuses,
  view,
  setView,
  hideViewToggle = false,
  actionButtons,
  dateFilterType,
  setDateFilterType,
  dateRange,
  setDateRange,
}: GigsTableToolbarProps ) {
  const [ searchValue, setSearchValue ] = React.useState( '' );

  // Debounce search input
  React.useEffect( () => {
    const timer = setTimeout( () => {
      table.setGlobalFilter( searchValue );
    }, 100 );

    return () => clearTimeout( timer );
  }, [ searchValue, table ] );

  return (
    <div className='dt-toolbar'>
      <SuperField
        type='search'
        placeholder='Search Gigs...'
        prefix={ <HugeiconsIcon icon={ SearchIcon } /> }
        fieldClassName='placeholder:text-gray-400 font-regular'
        value={ searchValue }
        onChange={ ( event ) => setSearchValue( event.target.value ) }
        className='w-full md:max-w-md bg-background'
        autoComplete='off'
      />
      <div className='flex items-center gap-2 w-full md:w-auto'>
        { dateFilterType && setDateFilterType && setDateRange && (
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
                onValueChange={ ( v ) => setDateFilterType( ( v ?? 'created_at' ) as 'created_at' | 'updated_at' | 'posting_start_date' | 'posting_end_date' ) }
                options={ [
                  { value: 'created_at', label: 'Created Date' },
                  { value: 'updated_at', label: 'Updated Date' },
                  { value: 'posting_start_date', label: 'Gig Start Date' },
                  { value: 'posting_end_date', label: 'Deadline' },
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
        ) }
        { !hideViewToggle && (
          <ToggleGroup
            variant={ 'outline' }
            size={ 'sm' }
            className={ 'rounded-md overflow-hidden border' }
            value={ [ view ] }
            onValueChange={ ( value ) => {
              if ( Array.isArray( value ) && value.length > 0 ) {
                setView( value[ 0 ] as 'table' | 'cards' );
              }
            } }
          >
            <ToggleGroupItem
              title='Table View'
              className={ 'border-0 data-[state=on]:bg-muted' }
              value='table'
            >
              <TableIcon className='h-4 w-4' strokeWidth={ 1 } />
            </ToggleGroupItem>
            <ToggleGroupItem
              title='Cards View'
              className={ 'border-0 border-l data-[state=on]:bg-muted' }
              value='cards'
            >
              <Grip className='h-4 w-4' strokeWidth={ 1 } />
            </ToggleGroupItem>
          </ToggleGroup>
        ) }
        <ButtonGroup>
          <ButtonGroup>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline' size={ 'sm' }>
                  <HugeiconsIcon
                    icon={ FilterHorizontalIcon }
                    className='text-sm'
                  />
                  <ChevronDown width={ 1 } />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end' className={ 'min-w-60' }>
                <div
                  className='focus:bg-accent focus:text-accent-foreground gap-2 rounded-sm px-2 py-1.5 relative flex cursor-default items-center outline-hidden select-none hover:bg-accent text-xs text-primary'
                  onClick={ ( e ) => {
                    e.stopPropagation();
                    const column = table.getColumn( 'details' ); // Filter on details/status? 
                    // Actually status is usually filtered on 'details' column or maybe we should have 'status' as accessor?
                    // The columns def has `status` inside `details` cell render, but it doesn't have its own column ID for filtering unless we add one or use `details`.
                    // Wait, `gig-status-badge` is in `details`.
                    // A better approach is to have a dedicated hidden column for status or filterFn on data.
                    // Let's just reset all filters for "Select All" conceptually or clear filters.
                    table.resetColumnFilters();
                  } }
                >
                  Clear Filters
                </div>
                <DropdownMenuSeparator />
                { statuses.map( ( status ) => {
                  const column = table.getColumn( 'gig_status' );
                  const filterValue = ( column?.getFilterValue() as string[] ) || [];
                  const isChecked = filterValue.includes( status );

                  return (
                    <DropdownMenuCheckboxItem
                      key={ status }
                      className={ cn( 'capitalize' ) }
                      checked={ isChecked }
                      onCheckedChange={ ( checked ) => {
                        if ( checked ) {
                          column?.setFilterValue( [ ...filterValue, status ] );
                        } else {
                          column?.setFilterValue(
                            filterValue.filter( ( value ) => value !== status )
                          );
                        }
                      } }
                    >
                      { status.replace( /_/g, ' ' ) }
                    </DropdownMenuCheckboxItem>
                  );
                } ) }
              </DropdownMenuContent>
            </DropdownMenu>
          </ButtonGroup>
          <ButtonGroup className='text-slate-600'>
            <Button variant='outline' size={ 'icon-sm' }>
              <HugeiconsIcon icon={ EyeIcon } className='text-sm' />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant='outline'
                  size='sm'
                  className='ml-auto font-regular text-sm'
                >
                  Columns <ChevronDown width={ 1 } />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end' className={ 'min-w-60' }>
                { table
                  .getAllColumns()
                  .filter( ( column ) => column.getCanHide() )
                  .map( ( column ) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={ column.id }
                        className={ cn( 'capitalize' ) }
                        checked={ column.getIsVisible() }
                        onCheckedChange={ ( value ) =>
                          column.toggleVisibility( !!value )
                        }
                      >
                        { column.id }
                      </DropdownMenuCheckboxItem>
                    );
                  } ) }
              </DropdownMenuContent>
            </DropdownMenu>
          </ButtonGroup>
        </ButtonGroup>
        { actionButtons }
      </div>
    </div>
  );
}
