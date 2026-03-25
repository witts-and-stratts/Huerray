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
}

export function UsersTableToolbar<TData>( {
  table,
  statuses,
}: UsersTableToolbarProps<TData> ) {
  const t = useTranslations( 'dashboard.admin' );
  const getFilterLabel = useFilterLabel();
  return (
    <div className='dt-toolbar'>
      <div className='flex flex-1 items-center space-x-2'>
        <DataTableSearch
          table={ table }
          columnId='username'
          placeholder={ t( 'filters.searchUsers' ) }
        />
      </div>
      <div className='flex items-center gap-2'>
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
