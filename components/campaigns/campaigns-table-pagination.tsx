'use client';

import * as React from 'react';
import { Table } from '@tanstack/react-table';
import { Button } from '@/components/dashboard-ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ModelCampaign } from './types';
import { SuperField } from '../dashboard-ui/super-field';

interface CampaignsTablePaginationProps<TData> {
  table: Table<TData>;
}

export function CampaignsTablePagination<TData>( {
  table,
}: CampaignsTablePaginationProps<TData> ) {
  return (
    <div className='flex items-center justify-between py-4'>
      <div className='text-muted-foreground flex-1 text-sm'>
        { table.getFilteredSelectedRowModel().rows.length } of{ ' ' }
        { table.getFilteredRowModel().rows.length } row(s) selected.
      </div>
      <div className='flex items-center space-x-6'>
        <div className='flex items-center space-x-2'>
          <p className='text-sm font-medium'>Rows per page</p>
          <SuperField
            type='select'
            defaultValue={ String( table.getState().pagination.pageSize ) }
            options={ [ 10, 20, 30, 40, 50, 100, 200, 300, 500, 1000 ] }
            onValueChange={ ( value ) => {
              table.setPageSize( Number( value ) );
            } }
            className='w-20'
          />
        </div>
        <div className='flex w-25 items-center justify-center text-sm font-medium'>
          Page { table.getState().pagination.pageIndex + 1 } of{ ' ' }
          { table.getPageCount() }
        </div>
        <div className='flex items-center space-x-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={ () => table.previousPage() }
            disabled={ !table.getCanPreviousPage() }
          >
            Previous
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={ () => table.nextPage() }
            disabled={ !table.getCanNextPage() }
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
