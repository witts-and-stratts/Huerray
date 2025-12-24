'use client';

import * as React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, ChevronDown } from 'lucide-react';
import { AnimatePresence } from 'motion/react';

import { Button } from '@/components/dashboard-ui/button';
import { Checkbox } from '@/components/dashboard-ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/dashboard-ui/dropdown-menu';
import { ButtonGroup } from '@/components/dashboard-ui/button-group';
import { ModelCampaign, Person } from './types';
import { AvatarCollage } from './avatar-collage';
import { StatusBadge } from './status-badge';

export const columns: ColumnDef<ModelCampaign>[] = [
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
    id: 'campaign_name',
    accessorKey: 'campaign_name',
    cell: () => <></>,
    enableSorting: true,
    enableHiding: true,
    header: () => <></>,
  },
  {
    id: 'campaign_status',
    accessorKey: 'campaign_status',
    cell: () => <></>,
    enableSorting: false,
    enableHiding: false,
    header: () => <></>,
    filterFn: ( row, id, filterValue ) => {
      // If no filter is set, show all rows
      if (
        !filterValue ||
        !Array.isArray( filterValue ) ||
        filterValue.length === 0
      ) {
        return true;
      }
      // Check if the row's status is in the filter array
      const rowValue = row.getValue( id ) as string;
      return filterValue.includes( rowValue );
    },
  },
  {
    accessorKey: 'details',
    header: () => <span className='font-regular'>Details</span>,
    cell: ( { row } ) => {
      const { campaign_name, description, campaign_status, updated_at } =
        row.original;
      return (
        <div>
          <h4 className='capitalize text-[18px] font-medium! text-primary'>
            { campaign_name }
          </h4>
          <p className='font-regular text-slate-500 mt-1 text-sm'>
            <span className='text-slate-800'>{ description }</span>
            <br />
            <span>
              Last updated on{ ' ' }
              { Intl.DateTimeFormat( 'en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              } ).format( new Date( updated_at ) ) }
            </span>
          </p>
          <div className='mt-4'>
            <StatusBadge status={ campaign_status } />
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'creators',
    header: () => <span className='font-regular'>Creators</span>,
    cell: ( { row } ) => {
      const creators = row.getValue( 'creators' ) as Person[];
      return (
        <div className='flex'>
          <AnimatePresence>
            <AvatarCollage people={ creators } />
          </AnimatePresence>
        </div>
      );
    },
  },
  {
    accessorKey: 'applications',
    header: ( { column } ) => {
      return (
        <Button
          variant='ghost'
          onClick={ () => column.toggleSorting( column.getIsSorted() === 'asc' ) }
        >
          <span className='font-regular'>Applications</span>
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ( { row } ) => {
      const applications = row.getValue( 'applications' ) as Person[];
      return (
        <div className='flex'>
          <AvatarCollage people={ applications } />
        </div>
      );
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
    cell: () => {
      return (
        <div className='flex justify-end'>
          <ButtonGroup className='flex justify-end'>
            <Button variant='outline' size='sm' className='font-regular'>
              Edit
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline' size='sm' className='font-regular'>
                  <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end' className={ 'min-w-60 text-sm' }>
                <DropdownMenuItem className='text-sm'>
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem className='text-sm'>Rename</DropdownMenuItem>
                <DropdownMenuItem className='text-sm'>
                  Replicate
                </DropdownMenuItem>
                <DropdownMenuItem className='text-sm'>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </ButtonGroup>
        </div>
      );
    },
  },
];
