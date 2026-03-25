'use client';

import { Table } from '@tanstack/react-table';
import { CalendarDays, ChevronDown } from 'lucide-react';

import '@/app/styles/components/data-table.css';
import { Button } from '@/components/dashboard-ui/button';
import {
  DataTableFilterDropdown,
} from '@/components/dashboard-ui/data-table/data-table-filter-dropdown';
import { DataTableSearch } from '@/components/dashboard-ui/data-table/data-table-search';
import { DataTableViewOptions } from '@/components/dashboard-ui/data-table/data-table-view-options';
import { DataTableViewToggle } from '@/components/dashboard-ui/data-table/data-table-view-toggle';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/dashboard-ui/popover';
import { SuperField } from '@/components/dashboard-ui/super-field';
import { type DateRange } from '@/components/dashboard-ui/superfield/date-picker-input';
import { ModelsCampaignResponse } from '@/lib/api/generated';
import { useTranslations } from 'next-intl';
import { useFilterLabel } from '@/lib/hooks/use-filter-label';

interface CampaignsTableToolbarProps {
  table: Table<ModelsCampaignResponse>;
  statuses: string[];
  view: 'table' | 'cards';
  setView: ( view: 'table' | 'cards' ) => void;
  dateFilterType: 'created_at' | 'updated_at';
  setDateFilterType: ( value: 'created_at' | 'updated_at' ) => void;
  dateRange: DateRange | undefined;
  setDateRange: ( value: DateRange | undefined ) => void;
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
}: CampaignsTableToolbarProps ) {
  const t = useTranslations( 'dashboard.admin' );
  const getFilterLabel = useFilterLabel();
  return (
    <div className='dt-toolbar'>
      <DataTableSearch
        table={ table }
        columnId='campaign_name'
        placeholder={ t( 'campaignsPage.toolbar.search' ) }
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
        <DataTableViewOptions table={ table } />
      </div>
    </div>
  );
}
