'use client';

import { Table } from '@tanstack/react-table';

import {
  DataTableFilterDropdown,
} from '@/components/dashboard-ui/data-table/data-table-filter-dropdown';
import { DataTableSearch } from '@/components/dashboard-ui/data-table/data-table-search';
import { DataTableViewOptions } from '@/components/dashboard-ui/data-table/data-table-view-options';
import { DataTableViewToggle } from '@/components/dashboard-ui/data-table/data-table-view-toggle';
import '@/app/styles/components/data-table.css';

interface UsersTableToolbarProps<TData> {
  table: Table<TData>;
  statuses: string[];
  view: 'table' | 'cards';
  setView: ( view: 'table' | 'cards' ) => void;
}

export function UsersTableToolbar<TData>( {
  table,
  statuses,
  view,
  setView,
}: UsersTableToolbarProps<TData> ) {
  return (
    <div className='dt-toolbar'>
      <div className='flex flex-1 items-center space-x-2'>
        <DataTableSearch
          table={ table }
          columnId='username'
          placeholder='Filter users...'
        />
      </div>
      <div className='flex items-center gap-2'>
        <DataTableViewToggle view={ view } setView={ setView } />
        <DataTableFilterDropdown
          table={ table }
          columnId='user_type'
          options={ [ 'Brand_user', 'Creator', 'Admin_user' ] }
          title="User Type"
        />
        <DataTableFilterDropdown
          table={ table }
          columnId='user_status'
          options={ statuses }
          title="Status"
        />
        <DataTableViewOptions
          table={ table }
          labels={ {
            user_status: 'Status',
            created_at: 'Joined',
            user_type: 'User Type'
          } }
        />
      </div>
    </div>
  );
}
