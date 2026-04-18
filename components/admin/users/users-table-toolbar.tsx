'use client';

import { Table } from '@tanstack/react-table';

import {
  DataTableFilterDropdown,
} from '@/components/dashboard-ui/data-table/data-table-filter-dropdown';
import { DataTableSearch } from '@/components/dashboard-ui/data-table/data-table-search';
import { DataTableViewOptions } from '@/components/dashboard-ui/data-table/data-table-view-options';
import '@/app/styles/components/data-table.css';
import { useTranslations } from 'next-intl';
import { useFilterLabel } from '@/lib/hooks/use-filter-label';

interface UsersTableToolbarProps<TData> {
  table: Table<TData>;
  statuses: string[];
  onSearchInputChange?: ( value: string ) => void;
  onSearchChange?: ( value: string ) => void;
}

export function UsersTableToolbar<TData>( {
  table,
  statuses,
  onSearchInputChange,
  onSearchChange,
}: UsersTableToolbarProps<TData> ) {
  const t = useTranslations( 'dashboard.admin' );
  const getFilterLabel = useFilterLabel();
  return (
    <div className='dt-toolbar'>
      <div className='flex flex-1 items-center space-x-2'>
        <DataTableSearch
          columnId='username'
          placeholder={ t( 'filters.searchUsers' ) }
          onInputChange={ onSearchInputChange }
          onValueChange={ onSearchChange }
          filterMode='none'
          debounceMs={ 250 }
        />
      </div>
      <div className='flex items-center gap-2 overflow-x-auto'>
        <DataTableFilterDropdown
          table={ table }
          columnId='user_type_filter'
          options={ [ 'Brand_user', 'Creator', 'Admin_user' ] }
          title={ t( 'filters.userType' ) }
          labelFn={ getFilterLabel }
        />
        <DataTableFilterDropdown
          table={ table }
          columnId='user_status'
          options={ statuses }
          title={ t( 'filters.status' ) }
          labelFn={ getFilterLabel }
        />
        <DataTableViewOptions
          table={ table }
          labels={ {
            user_status: t( 'filters.status' ),
            created_at: t( 'filters.joined' ),
          } }
        />
      </div>
    </div>
  );
}
