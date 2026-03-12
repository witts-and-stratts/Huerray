"use client";

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

import { Button } from '@/components/dashboard-ui/button';
import { ButtonGroup } from '@/components/dashboard-ui/button-group';
import { Checkbox } from '@/components/dashboard-ui/checkbox';
import { formatCurrency, formatDate } from '@/lib/utils';
import { GigStatusBadge } from './gig-status-badge';
import { ModelsGigResponse } from '@/lib/api/generated/models';
import { GigActionMenu } from './gig-action-menu';

export const getColumns = ( onViewGig: ( gig: ModelsGigResponse ) => void, onEditGig?: ( gig: ModelsGigResponse ) => void ): ColumnDef<ModelsGigResponse>[] => [
  {
    id: 'select',
    header: ( { table } ) => (
      <Checkbox
        checked={ table.getIsAllPageRowsSelected() }
        onCheckedChange={ ( value ) => table.toggleAllPageRowsSelected( !!value ) }
        aria-label='Select all'
        className={ 'bg-background' }
      />
    ),
    cell: ( { row } ) => (
      <Checkbox
        checked={ row.getIsSelected() }
        onCheckedChange={ ( value ) => row.toggleSelected( !!value ) }
        aria-label='Select row'
        className={ 'mt-1' }
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'gig_status',
    accessorKey: 'gig_status',
    cell: () => <></>,
    enableSorting: false,
    enableHiding: true,
    header: () => <></>,
    filterFn: ( row, id, filterValue ) => {
      if ( filterValue === undefined ) {
        return true;
      }
      if ( !Array.isArray( filterValue ) ) return true;
      if ( filterValue.length === 0 ) return false;
      const rowValue = row.getValue( id ) as string;
      return filterValue.includes( rowValue );
    },
  },
  {
    accessorKey: 'details',
    header: () => <span className='font-regular'>Details</span>,
    cell: ( { row } ) => {
      const { title, gig_status } = row.original;
      return (
        <div>
          <h4
            className='capitalize text-[16px] font-medium! text-primary cursor-pointer hover:underline'
            onClick={ () => onViewGig( row.original ) }
          >
            { title }
          </h4>
          <div className='mt-2'>
            <GigStatusBadge status={ gig_status } />
          </div>
        </div>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: 'posting_start_date',
    header: ( { column } ) => (
      <Button
        variant='ghost'
        onClick={ () => column.toggleSorting( column.getIsSorted() === 'asc' ) }
      >
        <span className='font-regular'>Start Date</span>
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ( { row } ) => {
      return (
        <div className='text-sm pl-2'>
          { formatDate( row.getValue( 'posting_start_date' ) ) }
        </div>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: 'posting_end_date',
    header: ( { column } ) => (
      <Button
        variant='ghost'
        onClick={ () => column.toggleSorting( column.getIsSorted() === 'asc' ) }
      >
        <span className='font-regular'>End Date</span>
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ( { row } ) => {
      return (
        <div className='text-sm pl-2'>
          { formatDate( row.getValue( 'posting_end_date' ) ) }
        </div>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: 'gig_cost',
    header: ( { column } ) => {
      return (
        <Button
          variant='ghost'
          onClick={ () => column.toggleSorting( column.getIsSorted() === 'asc' ) }
        >
          <span className='font-regular'>Gig Cost</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ( { row } ) => {
      const val = row.getValue( 'gig_cost' );
      const amount = typeof val === 'number' ? val : parseFloat( val as string );

      if ( isNaN( amount ) ) {
        return <div className="pl-4 text-muted-foreground">-</div>;
      }

      const formatted = formatCurrency( amount );
      return <div className="pl-4">{ formatted }</div>;
    },
  },

  {
    id: 'actions',
    header: () => (
      <div className='flex justify-end'>
        <span className='font-regular text-right'>Actions</span>
      </div>
    ),
    enableHiding: false,
    cell: ( { row } ) => {
      return (
        <div className='flex justify-end'>
          <ButtonGroup className='flex justify-end'>
            <Button
              variant='outline'
              size='sm'
              className='font-regular'
              onClick={ () => onViewGig( row.original ) }
            >
              View
            </Button>
            <GigActionMenu
              gig={ row.original }
              onViewGig={ onViewGig }
              onEditGig={ onEditGig }
            />
          </ButtonGroup>
        </div>
      );
    },
  },
];
