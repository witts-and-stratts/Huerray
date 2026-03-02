'use client';

import Link from 'next/link';

import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/dashboard-ui/sheet';
import { ModelsGigApplicationResponse, ModelsGigInvitationResponse, ModelsGigResponse, ModelsVideoSubmissionResponse } from '@/lib/api/generated/models';
import { useCampaignApplications, useCampaignInvitations, useCampaignSubmissions } from '@/lib/api/hooks/campaigns';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, ChevronDown } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import * as React from 'react';
import { ApplicationCard } from './application-card';
import { GigDetailsSheet } from './gig-details-sheet';
import { SubmissionViewDialog } from './submission-view-dialog';


import { Button } from '@/components/dashboard-ui/button';
import { ButtonGroup } from '@/components/dashboard-ui/button-group';
import { Checkbox } from '@/components/dashboard-ui/checkbox';
import { Row } from '@tanstack/react-table';
import { AvatarCollage } from './avatar-collage';
import { StatusBadge } from './status-badge';
import { ModelCampaign } from './types';


import { CampaignActionMenu } from './campaign-action-menu';
import { stripTags } from '@/lib/utils';
import { RoleGuard } from '../auth/role-guard';

const CampaignActionsCell = ( { row, basePath }: { row: Row<ModelCampaign>, basePath: string; } ) => {
  return (
    <div className='flex justify-end'>
      <ButtonGroup className='flex justify-end'>
        <RoleGuard allowedRoles={ [ 'admin' ] }>
          <Button variant='outline' size='sm' className='font-regular' render={
            <Link href={ `${ basePath }/campaigns/${ row.original.id }` }>
              View
            </Link>
          }>
          </Button>
        </RoleGuard>
        <RoleGuard allowedRoles={ [ 'brand' ] }>
          {
            ( row.original.campaign_status === 'created' || row.original.campaign_status === 'returned' ) ? (
              <Button variant='outline' size='sm' className='font-regular' render={
                <Link href={ `${ basePath }/campaigns/${ row.original.id }` }>
                  Edit
                </Link>
              }>
              </Button>
            ) : (
              <Button variant='outline' size='sm' className='font-regular' render={
                <Link href={ `${ basePath }/campaigns/${ row.original.id }` }>
                  View
                </Link>
              }>
              </Button>
            )
          }
        </RoleGuard>
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
  const [ selected, setSelected ] = React.useState<ModelsGigApplicationResponse | null>( null );

  const people = applications.map( app => ( {
    first_name: app.creator?.first_name || '',
    last_name: app.creator?.last_name || '',
    avatar: app.creator?.profile_image_url || '',
  } ) );

  return (
    <>
      <div className='flex'>
        <AnimatePresence>
          <AvatarCollage
            people={ people }
            onPersonClick={ ( i ) => setSelected( applications[ i ] ) }
          />
        </AnimatePresence>
      </div>
      <Sheet open={ !!selected } onOpenChange={ ( open ) => !open && setSelected( null ) }>
        <SheetContent className='w-[90%]! max-w-[420px]! overflow-y-auto'>
          <SheetHeader className='mb-4'>
            <SheetTitle className='font-normal text-primary font-primary'>Application</SheetTitle>
          </SheetHeader>
          { selected && <ApplicationCard application={ selected } /> }
        </SheetContent>
      </Sheet>
    </>
  );
};

const InvitationsCell = ( { row }: { row: Row<ModelCampaign>; } ) => {
  const { id } = row.original;
  const { data: invitationsData } = useCampaignInvitations( id || '' );
  const invitations = ( invitationsData?.data || [] ) as ModelsGigInvitationResponse[];
  const [ selected, setSelected ] = React.useState<ModelsGigInvitationResponse | null>( null );

  const people = invitations.map( inv => ( {
    first_name: inv.creator?.first_name || '',
    last_name: inv.creator?.last_name || '',
    avatar: inv.creator?.profile_image_url || '',
  } ) );

  return (
    <>
      <div className='flex'>
        <AnimatePresence>
          <AvatarCollage
            people={ people }
            onPersonClick={ ( i ) => setSelected( invitations[ i ] ) }
          />
        </AnimatePresence>
      </div>
      <GigDetailsSheet
        gig={ ( selected?.gig as unknown as ModelsGigResponse ) || null }
        open={ !!selected }
        onOpenChange={ ( open ) => !open && setSelected( null ) }
        invitationId={ selected?.id }
        invitationStatus={ selected?.status }
      />
    </>
  );
};

const SubmissionsCell = ( { row }: { row: Row<ModelCampaign>; } ) => {
  const { id } = row.original;
  const { data: submissionsData } = useCampaignSubmissions( id || '' );
  const submissions = ( submissionsData?.data || [] ) as ModelsVideoSubmissionResponse[];
  const [ selected, setSelected ] = React.useState<ModelsVideoSubmissionResponse | null>( null );

  const people = submissions.map( sub => ( {
    first_name: sub.creator?.first_name || '',
    last_name: sub.creator?.last_name || '',
    avatar: sub.creator?.profile_image_url || '',
  } ) );

  return (
    <>
      <div className='flex'>
        <AnimatePresence>
          <AvatarCollage
            people={ people }
            onPersonClick={ ( i ) => setSelected( submissions[ i ] ) }
          />
        </AnimatePresence>
      </div>
      { selected && (
        <SubmissionViewDialog
          open={ !!selected }
          onOpenChange={ ( open ) => !open && setSelected( null ) }
          submission={ selected }
        />
      ) }
    </>
  );
};

export const getColumns = ( basePath: string = '/brand' ): ColumnDef<ModelCampaign>[] => [
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
            <span className='text-slate-700' dangerouslySetInnerHTML={ { __html: stripTags( description! ) } }></span>
            <br />
            <span>
              <span>Updated on{ ' ' }</span>
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
    accessorKey: 'invitations',
    header: () => <span className='font-regular'>Invitations</span>,
    cell: ( { row } ) => <InvitationsCell row={ row } />,
  },
  {
    accessorKey: 'submissions',
    header: () => <span className='font-regular'>Submissions</span>,
    cell: ( { row } ) => <SubmissionsCell row={ row } />,
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
