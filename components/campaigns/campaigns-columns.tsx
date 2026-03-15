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
import { CampaignGigsButton } from './campaign-card';
import { stripTags } from '@/lib/utils';
import { RoleGuard } from '../auth/role-guard';
import { imgpresets } from '@/lib/utils/imgproxy';
import { cn } from '@/lib/dashboard-utils';
import { useBasePath } from '@/lib/providers/path-provider';

const CampaignActionsCell = ( { row, className }: { row: Row<ModelCampaign>, className?: string; } ) => {
  const basePath = useBasePath();
  return (
    <div className={ `flex justify-end items-center gap-2 ${ className }` }>
      <RoleGuard allowedRoles={ [ 'admin' ] }>
        <CampaignGigsButton campaignId={ row.original.id! } basePath={ basePath } />
      </RoleGuard>
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
            ( row.original.campaign_status === 'draft' || row.original.campaign_status === 'returned' ) ? (
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
    avatar: app.creator?.profile_image?.asset || '',
  } ) );

  return (
    <>
      <div className='flex'>
        <AnimatePresence>
          <AvatarCollage
            people={ people }
            onPersonClick={ ( i ) => setSelected( applications[ i ] ) }
            title="Applications"
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
    avatar: inv.creator?.profile_image?.asset || '',
  } ) );

  return (
    <>
      <div className='flex'>
        <AnimatePresence>
          <AvatarCollage
            people={ people }
            onPersonClick={ ( i ) => setSelected( invitations[ i ] ) }
            title="Invitations"
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
    avatar: sub.creator?.profile_image?.asset || '',
  } ) );

  return (
    <>
      <div className='flex'>
        <AnimatePresence>
          <AvatarCollage
            people={ people }
            onPersonClick={ ( i ) => setSelected( submissions[ i ] ) }
            title="Submissions"
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

const DetailsCell = ( { row }: { row: Row<ModelCampaign>; } ) => {
  const basePath = useBasePath();
  const { id, campaign_name, description, campaign_status, updated_at } = row.original;
  const rawImage = row.original.campaign_images?.[ 0 ]?.asset || row.original.product_image?.asset;
  const coverImage = typeof rawImage === 'string' && rawImage ? rawImage : undefined;

  return (
    <div className='flex gap-4 pl-4'>
      <div className={ cn( "size-10 shrink-0 overflow-hidden rounded-full" ) }>
        { coverImage && (
          <Link href={ `${ basePath }/campaigns/${ id }` } className='hover:underline'>
            <img
              src={ imgpresets.card( coverImage ) }
              alt={ campaign_name || 'Campaign cover' }
              className="object-cover w-full h-full"
            />
          </Link>
        ) }
      </div>
      <div>
        <Link href={ `${ basePath }/campaigns/${ id }` } className='hover:underline'>
          <h4 className='card__title'>
            { campaign_name }
          </h4>
        </Link>
        <p className='card__description line-clamp-2'>
          <span className='text-slate-700' dangerouslySetInnerHTML={ { __html: stripTags( description! ) } }></span>
        </p>
        <div className='mt-4 flex flex-col gap-2'>
          <span className='text-xs text-muted-foreground/60'>
            <span>Updated on{ ' ' }</span>
            { Intl.DateTimeFormat( 'en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            } ).format( new Date( updated_at as string ) ) }
          </span>
          <StatusBadge status={ campaign_status! } className='w-fit' />
        </div>
      </div>
    </div>
  );
};

export const getColumns = (): ColumnDef<ModelCampaign>[] => [
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
    cell: () => <span data-hidden-column="true" />,
    enableSorting: true,
    enableHiding: true,
    header: () => <span data-hidden-column="true" />,
    size: 0,
    minSize: 0,
    maxSize: 0,
  },
  {
    id: 'campaign_status',
    accessorKey: 'campaign_status',
    cell: () => <span data-hidden-column="true" />,
    enableSorting: false,
    enableHiding: false,
    header: () => <span data-hidden-column="true" />,
    size: 0,
    minSize: 0,
    maxSize: 0,
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
    id: 'created_at',
    accessorKey: 'created_at',
    cell: () => <span data-hidden-column="true" />,
    enableSorting: false,
    enableHiding: false,
    header: () => <span data-hidden-column="true" />,
    size: 0,
    minSize: 0,
    maxSize: 0,
  },
  {
    id: 'updated_at',
    accessorKey: 'updated_at',
    cell: () => <span data-hidden-column="true" />,
    enableSorting: false,
    enableHiding: false,
    header: () => <span data-hidden-column="true" />,
    size: 0,
    minSize: 0,
    maxSize: 0,
  },
  {
    accessorKey: 'details',
    header: () => <span className='font-regular pl-4'>Details</span>,
    cell: ( { row } ) => <DetailsCell row={ row } />,
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
      <div className='flex justify-end pr-2'>
        <span className='font-regular text-right'>Actions</span>
      </div>
    ),
    enableHiding: false,
    cell: ( { row } ) => <CampaignActionsCell row={ row } className='pr-2' />,
  },
];
