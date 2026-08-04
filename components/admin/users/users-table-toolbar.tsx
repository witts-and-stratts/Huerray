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
  onUserTypeChange?: ( value: string | undefined ) => void;
  withoutProfile?: boolean;
  onWithoutProfileChange?: ( value: boolean ) => void;
}

export function UsersTableToolbar<TData>( {
  table,
  statuses,
  onSearchInputChange,
  onSearchChange,
  onUserTypeChange,
  withoutProfile = false,
  onWithoutProfileChange,
}: UsersTableToolbarProps<TData> ) {
  const t = useTranslations( 'dashboard.admin' );
  const getFilterLabel = useFilterLabel();
  const selectedUserType = ( table.getColumn( 'user_type_filter' )?.getFilterValue() as string[] | undefined )?.[ 0 ];
  const isWithoutProfileApplicable = selectedUserType === 'brand_user' || selectedUserType === 'creator';
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
          options={ [ 'brand_user', 'creator', 'admin_user' ] }
          title={ t( 'filters.userType' ) }
          labelFn={ getFilterLabel }
          selectionMode='single'
          onValueChange={ ( value ) => onUserTypeChange?.( value?.[ 0 ] ) }
          extraOptions={ [ {
            id: 'without_profile',
            label: t( 'filters.withoutProfile' ),
            checked: isWithoutProfileApplicable && withoutProfile,
            disabled: !isWithoutProfileApplicable,
            onCheckedChange: ( checked ) => onWithoutProfileChange?.( checked ),
          } ] }
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
