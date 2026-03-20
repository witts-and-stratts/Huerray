"use client";

import { ColumnDef, Row } from '@tanstack/react-table';
import { AnimatePresence } from 'motion/react';
import * as React from 'react';
import { ChevronDown } from 'lucide-react';

import { Button } from '@/components/dashboard-ui/button';
import { ButtonGroup } from '@/components/dashboard-ui/button-group';
import { Checkbox } from '@/components/dashboard-ui/checkbox';
import { ModelsGigApplicationResponse, ModelsGigInvitationResponse, ModelsGigResponse, ModelsVideoSubmissionResponse } from '@/lib/api/generated/models';
import { useGigApplications, useGigInvitations } from '@/lib/api/hooks/gigs';
import { useVideoSubmissionsByGig } from '@/lib/api/hooks/video-submissions';
import { cn } from '@/lib/dashboard-utils';
import { formatCurrency, formatDate } from '@/lib/utils';
import { imgpresets } from '@/lib/utils/imgproxy';
import { Clock01Icon, InformationCircleIcon, Video01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useBasePath } from '@/lib/providers/path-provider';
import { AvatarCollage } from './avatar-collage';
import { ApplicationCard } from './application-card';
import { BrandAvatar } from './brand-avatar';
import { BrandHoverCard } from './brand-hover-card';
import { GigActionMenu } from './gig-action-menu';
import { GigDetailsSheet } from './gig-details-sheet';
import { GigStatusBadge } from './gig-status-badge';
import { SubmissionViewDialog } from './submission-view-dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/dashboard-ui/sheet';
import { Separator } from '../dashboard-ui/separator';
import { useFormatCurrency } from '@/lib/hooks/format';

// ─── Details Cell ─────────────────────────────────────────────────────────────

const DetailsCell = ( { row, onViewGig }: { row: Row<ModelsGigResponse>; onViewGig: ( gig: ModelsGigResponse, tab?: 'details' | 'guidelines' | 'submissions' ) => void; } ) => {
  const { title, gig_status, posting_start_date, posting_end_date } = row.original;
  const coverImage = row.original.campaign?.product_image?.asset ?? row.original.campaign?.campaign_images?.[ 0 ]?.asset;

  const brand = row.original.campaign?.brand;
  const campaign = row.original.campaign;

  return (
    <div className='flex gap-4 pl-4'>
      <div className="relative shrink-0 size-12 pb-1 pr-1">
        <div className={ cn( "size-10 overflow-hidden rounded-full" ) }>
          { coverImage && (
            <img
              src={ imgpresets.card( coverImage ) }
              alt={ title ?? 'Gig cover' }
              className="object-cover w-full h-full cursor-pointer"
              onClick={ () => onViewGig( row.original ) }
            />
          ) }
        </div>
        { brand && (
          <BrandHoverCard brand={ brand as any } brandName={ brand.company_name }>
            <BrandAvatar
              brand={ brand as any }
              className="absolute bottom-0 right-0 size-5 rounded-full border bg-white p-0.5 hover:ring-2 hover:ring-primary/30 transition-shadow cursor-pointer"
            />
          </BrandHoverCard>
        ) }
      </div>
      <div className='flex flex-col gap-2'>
        <h4
          className='card__title cursor-pointer hover:underline'
          onClick={ () => onViewGig( row.original ) }
        >
          { title }
        </h4>
        { ( campaign?.campaign_name || campaign?.campaign_name ) && (
          <p className='card__description line-clamp-2'>
            <span className='text-slate-700'>{ campaign?.campaign_name ?? campaign?.campaign_name }</span>
          </p>
        ) }
        {/* <div className='mt-4 flex flex-col gap-2'>
          { ( posting_start_date || posting_end_date ) && (
            <span className='text-xs text-muted-foreground/60'>
              { posting_start_date && <>{ formatDate( posting_start_date ) }</> }
              { posting_start_date && posting_end_date && <span className='mx-1'>→</span> }
              { posting_end_date && <>{ formatDate( posting_end_date ) }</> }
            </span>
          ) }
        </div> */}
        <TaskCell row={ row } />
        <GigStatusBadge status={ gig_status } className='w-fit' />
      </div>
    </div>
  );
};

// ─── Applications Cell ────────────────────────────────────────────────────────

const ApplicationsCell = ( { row }: { row: Row<ModelsGigResponse>; } ) => {
  const { id } = row.original;
  const { data: applicationsData } = useGigApplications( id ?? '' );
  const applications = ( applicationsData?.data ?? [] ) as ModelsGigApplicationResponse[];
  const [ selected, setSelected ] = React.useState<ModelsGigApplicationResponse | null>( null );

  const people = applications.map( app => ( {
    first_name: app.creator?.first_name ?? '',
    last_name: app.creator?.last_name ?? '',
    avatar: app.creator?.profile_image?.asset ?? '',
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

// ─── Invitations Cell ─────────────────────────────────────────────────────────

const InvitationsCell = ( { row }: { row: Row<ModelsGigResponse>; } ) => {
  const { id } = row.original;
  const { data: invitationsData } = useGigInvitations( id ?? '' );
  const invitations = ( invitationsData?.data ?? [] ) as ModelsGigInvitationResponse[];
  const [ selected, setSelected ] = React.useState<ModelsGigInvitationResponse | null>( null );

  const people = invitations.map( inv => ( {
    first_name: inv.creator?.first_name ?? '',
    last_name: inv.creator?.last_name ?? '',
    avatar: inv.creator?.profile_image?.asset ?? '',
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

// ─── Submissions Cell ─────────────────────────────────────────────────────────

const SubmissionsCell = ( { row }: { row: Row<ModelsGigResponse>; } ) => {
  const { id } = row.original;
  const { data: submissionsData } = useVideoSubmissionsByGig( id ?? '' );
  const submissions = ( submissionsData?.data ?? [] ) as ModelsVideoSubmissionResponse[];
  const [ selected, setSelected ] = React.useState<ModelsVideoSubmissionResponse | null>( null );

  const people = submissions.map( sub => ( {
    first_name: sub.creator?.first_name ?? '',
    last_name: sub.creator?.last_name ?? '',
    avatar: sub.creator?.profile_image?.asset ?? '',
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

// ─── Task Cell ────────────────────────────────────────────────────────────────

const TaskCell = ( { row }: { row: Row<ModelsGigResponse>; } ) => {
  const { number_of_videos, video_duration_in_seconds } = row.original;
  return (
    <div className="flex gap-3">
      { number_of_videos != null && (
        <>
          <div className="flex items-center gap-1.5">
            <HugeiconsIcon icon={ Video01Icon } className="size-3.5 text-muted-foreground shrink-0" strokeWidth={ 1.5 } />
            <span className="text-sm text-foreground">
              { number_of_videos } video{ number_of_videos !== 1 ? 's' : '' }
            </span>
          </div>
          <Separator orientation="vertical" /></>
      ) }
      { video_duration_in_seconds != null && (
        <div className="flex items-center gap-1.5">
          <HugeiconsIcon icon={ Clock01Icon } className="size-3.5 text-muted-foreground shrink-0" strokeWidth={ 1.5 } />
          <span className="text-sm text-foreground">{ video_duration_in_seconds }s duration</span>
        </div>
      ) }
    </div>
  );
};

// ─── Reward Cell ──────────────────────────────────────────────────────────────

const RewardCell = ( { row }: { row: Row<ModelsGigResponse>; } ) => {
  const amount = row.original.compensation?.value ?? row.original.gig_cost?.value;
  if ( amount == null ) return <span className="text-muted-foreground">—</span>;
  return (
    <span className="font-primary text-primary text-lg">{ useFormatCurrency( amount, "EUR" ) }</span>
  );
};

// ─── Deadline Cell ────────────────────────────────────────────────────────────

const DeadlineCell = ( { row }: { row: Row<ModelsGigResponse>; } ) => {
  const { posting_end_date } = row.original;
  if ( !posting_end_date ) return <span className="text-muted-foreground text-xs">—</span>;
  return (
    <div className="flex items-center gap-1.5 text-muted-foreground mt-1.5">
      <span className="">{ formatDate( posting_end_date ) }</span>
    </div>
  );
};

// ─── Actions Cell ─────────────────────────────────────────────────────────────

const GigActionsCell = ( { row, onViewGig, onEditGig, className }: {
  row: Row<ModelsGigResponse>;
  onViewGig: ( gig: ModelsGigResponse, tab?: 'details' | 'guidelines' | 'submissions' ) => void;
  onEditGig?: ( gig: ModelsGigResponse ) => void;
  className?: string;
} ) => {
  return (
    <div className={ `flex justify-end ${ className }` }>
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

// ─── Column definitions ───────────────────────────────────────────────────────

export const getColumns = (
  onViewGig: ( gig: ModelsGigResponse, tab?: 'details' | 'guidelines' | 'submissions' ) => void,
  onEditGig?: ( gig: ModelsGigResponse ) => void,
): ColumnDef<ModelsGigResponse>[] => [
    {
      id: 'select',
      header: ( { table } ) => (
        <Checkbox
          checked={ table.getIsAllPageRowsSelected() }
          onCheckedChange={ ( value ) => table.toggleAllPageRowsSelected( !!value ) }
          aria-label='Select all'
          className='bg-background'
        />
      ),
      cell: ( { row } ) => (
        <Checkbox
          checked={ row.getIsSelected() }
          onCheckedChange={ ( value ) => row.toggleSelected( !!value ) }
          aria-label='Select row'
          className='mt-1'
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: 'gig_status',
      accessorKey: 'gig_status',
      cell: () => <span data-hidden-column="true" />,
      enableSorting: false,
      enableHiding: false,
      header: () => <span data-hidden-column="true" />,
      filterFn: ( row, id, filterValue ) => {
        if ( filterValue === undefined ) return true;
        if ( !Array.isArray( filterValue ) ) return true;
        if ( filterValue.length === 0 ) return false;
        return filterValue.includes( row.getValue( id ) as string );
      },
    },
    {
      id: 'created_at',
      accessorKey: 'created_at',
      cell: () => <span data-hidden-column="true" />,
      enableSorting: false,
      enableHiding: false,
      header: () => <span data-hidden-column="true" />,
    },
    {
      id: 'updated_at',
      accessorKey: 'updated_at',
      cell: () => <span data-hidden-column="true" />,
      enableSorting: false,
      enableHiding: false,
      header: () => <span data-hidden-column="true" />,
    },
    {
      id: 'posting_start_date',
      accessorKey: 'posting_start_date',
      cell: () => <span data-hidden-column="true" />,
      enableSorting: false,
      enableHiding: false,
      header: () => <span data-hidden-column="true" />,
    },
    {
      id: 'posting_end_date',
      accessorKey: 'posting_end_date',
      cell: () => <span data-hidden-column="true" />,
      enableSorting: false,
      enableHiding: false,
      header: () => <span data-hidden-column="true" />,
    },
    {
      accessorKey: 'details',
      header: () => <span className='font-regular pl-4'>Details</span>,
      cell: ( { row } ) => <>
        <DetailsCell row={ row } onViewGig={ onViewGig } />
      </>,
    },
    {
      accessorKey: 'applications',
      header: () => <span className='font-regular'>Applications</span>,
      cell: ( { row } ) => <ApplicationsCell row={ row } />,
    },
    // {
    //   accessorKey: 'invitations',
    //   header: () => <span className='font-regular'>Invitations</span>,
    //   cell: ( { row } ) => <InvitationsCell row={ row } />,
    // },
    {
      accessorKey: 'submissions',
      header: () => <span className='font-regular'>Submissions</span>,
      cell: ( { row } ) => <SubmissionsCell row={ row } />,
    },
    {
      accessorKey: 'reward',
      header: () => <span className='font-regular'>Reward</span>,
      cell: ( { row } ) => <RewardCell row={ row } />,
    },
    {
      accessorKey: 'gig_cost',
      header: () => <span className='font-regular'>Gig Cost</span>,
      cell: ( { row } ) => {
        const amount = row.original.gig_cost?.value;
        if ( amount == null ) return <span className="text-muted-foreground text-base">—</span>;
        return <span className="text-base font-primary text-primary text-lg">{ useFormatCurrency( amount, "EUR" ) }</span>;
      },
    },
    {
      accessorKey: 'deadline',
      header: () => <span className='font-regular'>Deadline</span>,
      cell: ( { row } ) => <DeadlineCell row={ row } />,
    },
    {
      id: 'actions',
      header: () => (
        <div className='flex justify-end pr-2'>
          <span className='font-regular text-right'>Actions</span>
        </div>
      ),
      enableHiding: false,
      cell: ( { row } ) => (
        <GigActionsCell row={ row } onViewGig={ onViewGig } onEditGig={ onEditGig } className='pr-2' />
      ),
    },
  ];
