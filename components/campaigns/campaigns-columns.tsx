'use client';

import Link from 'next/link';

import * as React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, ChevronDown } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import { useCampaignApplications } from '@/lib/api/hooks/campaigns';
import { ModelsGigApplicationResponse } from '@/lib/api/generated/models';


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
import { Row } from '@tanstack/react-table';


import { CampaignActionMenu } from './campaign-action-menu';

const CampaignActionsCell = ( { row, basePath }: { row: Row<ModelCampaign>, basePath: string; } ) => {
  return (
    <div className='flex justify-end'>
      <ButtonGroup className='flex justify-end'>
        <Button variant='outline' size='sm' className='font-regular'>
          Edit
        </Button>
        <CampaignActionMenu
          campaign={ row.original }
          basePath={ basePath }
          trigger={
            <Button variant='outline' size='sm' className='font-regular'>
              <ChevronDown />
            </Button>
          }
        />
      </ButtonGroup>
    </div>
  );
};

const ApplicationsCell = ( { row }: { row: Row<ModelCampaign>; } ) => {
  const { id } = row.original;
  const { data: applicationsData } = useCampaignApplications( id || '' );
  const applications = ( applicationsData?.data || [] ) as ModelsGigApplicationResponse[];

  const applicationPeople = applications.map( app => ( {
    first_name: app.creator?.first_name || '',
    last_name: app.creator?.last_name || '',
    avatar: app.creator?.profile_image_url || '',
    creatorId: app.creator?.creator_id || ''
  } ) );

  return (
    <div className='flex'>
      <AnimatePresence>
        <AvatarCollage people={ applicationPeople } />
      </AnimatePresence>
    </div>
  );
};

export const getColumns = ( basePath: string = '/brand-admin' ): ColumnDef<ModelCampaign>[] => [
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
      if ( filterValue === undefined ) {
        return true;
      }
      if ( !Array.isArray( filterValue ) ) return true;
      if ( filterValue.length === 0 ) return false;
      // Check if the row's status is in the filter array
      const rowValue = row.getValue( id ) as string;
      return filterValue.includes( rowValue );
    },
  },
  {
    accessorKey: 'details',
    header: () => <span className='font-regular'>Details</span>,
    cell: ( { row } ) => {
      const { id, campaign_name, description, campaign_status, updated_at } =
        row.original;
      return (
        <div>
          <Link href={ `${ basePath }/campaigns/${ id }` } className='hover:underline'>
            <h4 className='capitalize text-[18px] font-medium! text-primary'>
              { campaign_name }
            </h4>
          </Link>
          <p className='font-regular text-slate-500 mt-1 text-sm'>
            <span className='text-slate-800'>{ description }</span>
            <br />
            <span>
              Last updated on{ ' ' }
              { Intl.DateTimeFormat( 'en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              } ).format( new Date( updated_at as string ) ) }
            </span>
          </p>
          <div className='mt-4'>
            <StatusBadge status={ campaign_status! } />
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
          className={ 'pl-0' }
        >
          <span className='font-regular'>Applications</span>
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ( { row } ) => <ApplicationsCell row={ row } />,
  },
  {
    id: 'actions',
    header: () => (
      <div className='flex justify-end'>
        <span className='font-regular text-right'>Actions</span>
      </div>
    ),
    enableHiding: false,
    cell: ( { row } ) => <CampaignActionsCell row={ row } basePath={ basePath } />,
  },
];
