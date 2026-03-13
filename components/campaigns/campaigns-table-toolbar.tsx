'use client';

import { Table } from '@tanstack/react-table';

import {
  DataTableFilterDropdown,
} from '@/components/dashboard-ui/data-table/data-table-filter-dropdown';
import { DataTableSearch } from '@/components/dashboard-ui/data-table/data-table-search';
import { DataTableViewOptions } from '@/components/dashboard-ui/data-table/data-table-view-options';
import { DataTableViewToggle } from '@/components/dashboard-ui/data-table/data-table-view-toggle';
import { ModelCampaign } from './types';
import '@/app/styles/components/data-table.css';

interface CampaignsTableToolbarProps {
  table: Table<ModelCampaign>;
  statuses: string[];
  view: 'table' | 'cards';
  setView: ( view: 'table' | 'cards' ) => void;
}

export function CampaignsTableToolbar( {
  table,
  statuses,
  view,
  setView,
}: CampaignsTableToolbarProps ) {
  return (
    <div className='dt-toolbar'>
      <DataTableSearch
        table={ table }
        columnId='campaign_name'
        placeholder='Search Campaign...'
      />
      <div className='flex items-center gap-2'>
        <DataTableViewToggle view={ view } setView={ setView } />
        <DataTableFilterDropdown
          table={ table }
          columnId='campaign_status'
          options={ statuses }
        />
        <DataTableViewOptions table={ table } />
      </div>
    </div>
  );
}
