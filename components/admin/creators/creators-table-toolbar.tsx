'use client';

import { Table } from '@tanstack/react-table';

import {
  DataTableFilterDropdown,
} from '@/components/dashboard-ui/data-table/data-table-filter-dropdown';
import { DataTableSearch } from '@/components/dashboard-ui/data-table/data-table-search';
import { DataTableViewOptions } from '@/components/dashboard-ui/data-table/data-table-view-options';
import { DataTableViewToggle } from '@/components/dashboard-ui/data-table/data-table-view-toggle';
import '@/app/styles/components/data-table.css';

interface CreatorsTableToolbarProps<TData> {
  table: Table<TData>;
  statuses: string[];
  view: 'table' | 'cards';
  setView: ( view: 'table' | 'cards' ) => void;
}

export function CreatorsTableToolbar<TData>( {
  table,
  statuses,
  view,
  setView,
}: CreatorsTableToolbarProps<TData> ) {
  return (
    <div className='dt-toolbar'>
      <div className='flex flex-1 items-center space-x-2'>
        <DataTableSearch
          table={ table }
          columnId='name'
          placeholder='Filter creators...'
        />
      </div>
      <div className='flex items-center gap-2'>
        <DataTableViewToggle view={ view } setView={ setView } />
        <DataTableFilterDropdown
          table={ table }
          columnId='creator_status'
          options={ statuses }
        />
        <DataTableViewOptions
          table={ table }
          labels={ {
            creator_status: 'Status',
            created_at: 'Joined'
          } }
        />
      </div>
    </div>
  );
}
