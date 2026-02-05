'use client';

import { EyeIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Table } from '@tanstack/react-table';
import * as React from 'react';

import { Button } from '@/components/dashboard-ui/button';
import { ButtonGroup } from '@/components/dashboard-ui/button-group';
import {
  DataTableFilterDropdown,
} from '@/components/dashboard-ui/data-table/data-table-filter-dropdown';
import { DataTableSearch } from '@/components/dashboard-ui/data-table/data-table-search';
import { DataTableViewOptions } from '@/components/dashboard-ui/data-table/data-table-view-options';
import { DataTableViewToggle } from '@/components/dashboard-ui/data-table/data-table-view-toggle';

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
    <div className='flex items-center justify-between py-4 sticky top-[104px] bg-background z-20 px-5 transition-all duration-500 mb-3 border-b gap-2'>
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
          columnId='user_status'
          options={ statuses }
        />
        <DataTableViewOptions
          table={ table }
          labels={ {
            user_status: 'Status',
            created_at: 'Joined'
          } }
        />
      </div>
    </div>
  );
}
