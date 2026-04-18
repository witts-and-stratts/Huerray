"use client";

import { Table } from '@tanstack/react-table';
import * as React from 'react';

import '@/app/styles/components/data-table.css';
import { type DateRange } from '@/components/dashboard-ui/superfield/date-picker-input';
import { ModelsGigResponse } from '@/lib/api/generated/models';
import { useTranslations } from 'next-intl';
import { DataTableDateDropdown } from '../dashboard-ui/data-table/data-table-date-dropdown';
import { DataTableFilterDropdown } from '../dashboard-ui/data-table/data-table-filter-dropdown';
import { DataTableSearch } from '../dashboard-ui/data-table/data-table-search';
import { DataTableViewToggle } from '../dashboard-ui/data-table/data-table-view-toggle';

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
  onSearchInputChange?: ( value: string ) => void;
  onSearchChange?: ( value: string ) => void;
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
  onSearchInputChange,
  onSearchChange,
}: GigsTableToolbarProps ) {
  const t = useTranslations( 'dashboard.admin' );

  return (
    <div className='dt-toolbar'>
      <DataTableSearch
        columnId='details'
        placeholder={ t( 'filters.searchGigs' ) }
        onInputChange={ onSearchInputChange }
        onValueChange={ onSearchChange }
        filterMode='none'
        debounceMs={ 250 }
      />

      <div className='flex items-center gap-2 w-full md:w-auto'>
        <DataTableDateDropdown
          dateFilterType={ dateFilterType }
          setDateFilterType={ setDateFilterType }
          dateRange={ dateRange }
          setDateRange={ setDateRange }
          dateFilterOptions={ [
            { value: 'posting_start_date', label: t( 'filters.startDate' ) },
            { value: 'posting_end_date', label: t( 'filters.deadline' ) },
          ] }
          filterByDateLabel={ t( 'filters.filterByDate' ) }
          dateRangeLabel={ t( 'filters.dateRange' ) }
          selectDateRangePlaceholder={ t( 'filters.selectDateRange' ) }
          clearDatesLabel={ t( 'filters.clearDates' ) }
        />
        <DataTableViewToggle
          view={ view }
          setView={ setView }
        />
        <DataTableFilterDropdown
          table={ table }
          columnId='gig_status'
          options={ statuses }
        />
        { actionButtons }
      </div>
    </div>
  );
}
