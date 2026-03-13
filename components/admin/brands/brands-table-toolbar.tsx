'use client';

import { EyeIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Table } from '@tanstack/react-table';
import * as React from 'react';

import { Brand } from './brands-data';
import { Button } from '@/components/dashboard-ui/button';
import { ButtonGroup } from '@/components/dashboard-ui/button-group';
import {
  DataTableFilterDropdown,
} from '@/components/dashboard-ui/data-table/data-table-filter-dropdown';
import { DataTableSearch } from '@/components/dashboard-ui/data-table/data-table-search';
import { DataTableViewOptions } from '@/components/dashboard-ui/data-table/data-table-view-options';
import { DataTableViewToggle } from '@/components/dashboard-ui/data-table/data-table-view-toggle';

interface BrandsTableToolbarProps {
  table: Table<Brand>;
  statuses: string[];
  view: 'table' | 'cards';
  setView: ( view: 'table' | 'cards' ) => void;
}

export function BrandsTableToolbar( {
  table,
  statuses,
  view,
  setView,
}: BrandsTableToolbarProps ) {
  return (
    <div className='dt-toolbar'>
      <DataTableSearch
        table={ table }
        columnId='name'
        placeholder='Search Brand...'
      />
      <div className='flex items-center gap-2'>
        <DataTableViewToggle view={ view } setView={ setView } />
        <DataTableFilterDropdown
          table={ table }
          columnId='brand_status'
          options={ statuses }
        />
        <DataTableViewOptions table={ table } />
      </div>
    </div>
  );
}
