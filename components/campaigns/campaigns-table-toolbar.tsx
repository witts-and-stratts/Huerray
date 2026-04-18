'use client';

import { Table } from '@tanstack/react-table';
import { Brain, CalendarDays, ChevronDown } from 'lucide-react';

import '@/app/styles/components/data-table.css';
import { Button } from '@/components/dashboard-ui/button';
import {
  DataTableFilterDropdown,
} from '@/components/dashboard-ui/data-table/data-table-filter-dropdown';
import { DataTableSearch } from '@/components/dashboard-ui/data-table/data-table-search';
import { DataTableViewOptions } from '@/components/dashboard-ui/data-table/data-table-view-options';
import { DataTableViewToggle } from '@/components/dashboard-ui/data-table/data-table-view-toggle';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/dashboard-ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/dashboard-ui/popover';
import { SuperField } from '@/components/dashboard-ui/super-field';
import { type DateRange } from '@/components/dashboard-ui/superfield/date-picker-input';
import { ModelsCampaignResponse } from '@/lib/api/generated';
import { useTranslations } from 'next-intl';
import { useFilterLabel } from '@/lib/hooks/use-filter-label';

const CONTENT_TYPE_OPTIONS = ['human-generated', 'ai-generated'];

function ContentTypeFilter( { table }: { table: Table<ModelsCampaignResponse>; } ) {
  const column = table.getColumn( 'content_type' );
  const filterValue = column?.getFilterValue() as string[] | undefined;
  const isActive = Array.isArray( filterValue ) && filterValue.length > 0;
  const getFilterLabel = useFilterLabel();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className='h-8'>
        <Button variant='outline' size='sm' className={ `h-8${ isActive ? ' border-primary text-primary' : '' }` }>
          <Brain className='size-4' strokeWidth={ 1 } />
          { isActive && <span className='font-regular text-xs'>{ filterValue!.length }</span> }
          <ChevronDown className='size-4' strokeWidth={ 1 } />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='min-w-48'>
        { CONTENT_TYPE_OPTIONS.map( ( option ) => (
          <DropdownMenuCheckboxItem
            key={ option }
            checked={ Array.isArray( filterValue ) && filterValue.includes( option ) }
            onCheckedChange={ ( value ) => {
              const current = ( column?.getFilterValue() as string[] ) ?? [];
              const next = new Set( current );
              value ? next.add( option ) : next.delete( option );
              column?.setFilterValue( next.size > 0 ? Array.from( next ) : undefined );
            } }
          >
            { getFilterLabel( option ) }
          </DropdownMenuCheckboxItem>
        ) ) }
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

interface CampaignsTableToolbarProps {
  table: Table<ModelsCampaignResponse>;
  statuses: string[];
  view: 'table' | 'cards';
  setView: ( view: 'table' | 'cards' ) => void;
  dateFilterType: 'created_at' | 'updated_at';
  setDateFilterType: ( value: 'created_at' | 'updated_at' ) => void;
  dateRange: DateRange | undefined;
  setDateRange: ( value: DateRange | undefined ) => void;
  onSearchInputChange?: ( value: string ) => void;
  onSearchChange?: ( value: string ) => void;
}

export function CampaignsTableToolbar( {
  table,
  statuses,
  view,
  setView,
  dateFilterType,
  setDateFilterType,
  dateRange,
  setDateRange,
  onSearchInputChange,
  onSearchChange,
}: CampaignsTableToolbarProps ) {
  const t = useTranslations( 'dashboard.admin' );
  const getFilterLabel = useFilterLabel();
  return (
    <div className='dt-toolbar'>
      <DataTableSearch
        columnId='campaign_name'
        placeholder={ t( 'campaignsPage.toolbar.search' ) }
        onInputChange={ onSearchInputChange }
        onValueChange={ onSearchChange }
        filterMode='none'
        debounceMs={ 250 }
      />
      <div className='flex items-center gap-2'>
        <Popover>
          <PopoverTrigger
            render={
              <Button variant="outline" size="sm" className="relative">
                <CalendarDays className="size-4" strokeWidth={ 1 } />
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
              label={ t( 'campaignsPage.toolbar.filterByDate' ) }
              value={ dateFilterType }
              onValueChange={ ( v ) => setDateFilterType( ( v ?? 'created_at' ) as 'created_at' | 'updated_at' ) }
              options={ [
                { value: 'created_at', label: t( 'campaignsPage.toolbar.createdDate' ) },
                { value: 'updated_at', label: t( 'campaignsPage.toolbar.updatedDate' ) },
              ] }
            />
            <SuperField
              type="datepicker"
              label={ t( 'campaignsPage.toolbar.dateRange' ) }
              mode="range"
              value={ dateRange }
              onChange={ ( v ) => setDateRange( v as DateRange | undefined ) }
              placeholder={ t( 'campaignsPage.toolbar.selectDateRange' ) }
            />
            { dateRange?.from && (
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground w-full"
                onClick={ () => setDateRange( undefined ) }
              >
                { t( 'campaignsPage.toolbar.clearDates' ) }
              </Button>
            ) }
          </PopoverContent>
        </Popover>
        <DataTableViewToggle view={ view } setView={ setView } />
        <DataTableFilterDropdown
          table={ table }
          columnId='campaign_status'
          options={ statuses }
          labelFn={ getFilterLabel }
        />
        <ContentTypeFilter table={ table } />
        <DataTableViewOptions table={ table } />
      </div>
    </div>
  );
}
