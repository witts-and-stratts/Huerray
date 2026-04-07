'use client';

import Link from 'next/link';

import { ModelsCampaignResponse, ModelsCreatorResponse, ModelsGigApplicationResponse, ModelsGigInvitationResponse, ModelsGigResponse, ModelsVideoSubmissionResponse } from '@/lib/api/generated/models';
import { useCampaignApplications, useCampaignInvitations, useCampaignSubmissions } from '@/lib/api/hooks/campaigns';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, ChevronDown } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import * as React from 'react';
import { GigDetailsSheet } from './gig-details-sheet';
import { SubmissionViewDialog } from './submission-view-dialog';


import { Button } from '@/components/dashboard-ui/button';
import { ButtonGroup } from '@/components/dashboard-ui/button-group';
import { Checkbox } from '@/components/dashboard-ui/checkbox';
import { Row } from '@tanstack/react-table';
import { AvatarCollage } from './avatar-collage';
import { StatusBadge } from './status-badge';


import { CampaignActionMenu } from './campaign-action-menu';
import { CampaignGigsButton } from './campaign-card';
import { stripTags } from '@/lib/utils';
import { RoleGuard } from '../auth/role-guard';
import { imgpresets } from '@/lib/utils/imgproxy';
import { cn } from '@/lib/dashboard-utils';
import { useBasePath } from '@/lib/providers/path-provider';
import { useLocale, useTranslations } from 'next-intl';
import { UtilsContentType } from '@/lib/api/generated/models/utils-content-type';
import { AiContentBadge } from '@/components/dashboard-ui/ai-content-badge';

const CampaignActionsCell = ( { row, className }: { row: Row<ModelsCampaignResponse>, className?: string; } ) => {
  const commonT = useTranslations( 'dashboard.common' );
  const actionsT = useTranslations( 'dashboard.brand.campaignsPage.actions' );
  const basePath = useBasePath();
  return (
    <div className={ `flex justify-end items-center gap-2 ${ className }` }>
      <RoleGuard allowedRoles={ [ 'admin' ] }>
        <CampaignGigsButton campaignId={ row.original.id! } basePath={ basePath } />
      </RoleGuard>
      <ButtonGroup className='flex justify-end'>
        <RoleGuard allowedRoles={ [ 'admin' ] }>
          <Button variant='outline' size='sm' className='font-regular' nativeButton={ false } render={
            <Link href={ `${ basePath }/campaigns/${ row.original.id }` }>
              { commonT( 'view' ) }
            </Link>
          }>
          </Button>
        </RoleGuard>
        <RoleGuard allowedRoles={ [ 'brand' ] }>
          {
            ( row.original.campaign_status === 'draft' || row.original.campaign_status === 'returned' ) ? (
              <Button variant='outline' size='sm' className='font-regular' nativeButton={ false } render={
                <Link href={ `${ basePath }/campaigns/${ row.original.id }` }>
                  { actionsT( 'edit' ) }
                </Link>
              }>
              </Button>
            ) : (
              <Button variant='outline' size='sm' className='font-regular' nativeButton={ false } render={
                <Link href={ `${ basePath }/campaigns/${ row.original.id }` }>
                  { commonT( 'view' ) }
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

const ApplicationsCell = ( {
  row,
  onViewCreator,
}: {
  row: Row<ModelsCampaignResponse>;
  onViewCreator?: ( creator: ModelsCreatorResponse ) => void;
} ) => {
  const t = useTranslations( 'dashboard.common.cards' );
  const { id } = row.original;
  const { data: applicationsData } = useCampaignApplications( id || '' );
  const applications = ( applicationsData?.data || [] ) as ModelsGigApplicationResponse[];

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
            onPersonClick={ ( i ) => {
              const creator = applications[ i ]?.creator;
              if ( creator ) onViewCreator?.( creator );
            } }
            title={ t( 'applications' ) }
          />
        </AnimatePresence>
      </div>
    </>
  );
};

const InvitationsCell = ( { row }: { row: Row<ModelsCampaignResponse>; } ) => {
  const t = useTranslations( 'dashboard.brand.campaignsPage' );
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
            title={ t( 'invitations' ) }
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

const SubmissionsCell = ( { row }: { row: Row<ModelsCampaignResponse>; } ) => {
  const t = useTranslations( 'dashboard.brand.campaignsPage' );
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
            title={ t( 'submissions' ) }
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

const DetailsCell = ( { row }: { row: Row<ModelsCampaignResponse>; } ) => {
  const t = useTranslations( 'dashboard.brand.campaignsPage' );
  const sheetsT = useTranslations( 'dashboard.common.sheets' );
  const locale = useLocale();
  const basePath = useBasePath();
  const { id, campaign_name, description, campaign_status, updated_at, content_type } = row.original;
  const rawImage = row.original.campaign_images?.[ 0 ]?.asset || row.original.product_image?.asset;
  const coverImage = typeof rawImage === 'string' && rawImage ? rawImage : undefined;
  const formattedUpdatedAt = updated_at
    ? Intl.DateTimeFormat( locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    } ).format( new Date( updated_at ) )
    : null;

  return (
    <div className='flex gap-4 pl-4 min-w-[300px]'>
      <div className={ cn( "size-10 shrink-0 overflow-hidden rounded-full" ) }>
        { coverImage && (
          <Link href={ `${ basePath }/campaigns/${ id }` } className='hover:underline'>
            <img
              src={ imgpresets.card( coverImage ) }
              alt={ campaign_name || t( 'campaignCover' ) }
              className="object-cover w-full h-full"
            />
          </Link>
        ) }
      </div>
      <div>
        <Link href={ `${ basePath }/campaigns/${ id }` } className='hover:underline'>
          <h4 className='card__title capitalize text-[18px] font-normal text-primary font-primary flex items-center gap-2'>
            <span className='font-normal'>{ campaign_name }</span>
            { content_type === UtilsContentType.ContentTypeAIGenerated && <AiContentBadge /> }
          </h4>
        </Link>
        <p className='card__description line-clamp-2'>
          <span className='text-slate-700' dangerouslySetInnerHTML={ { __html: stripTags( description! ) } }></span>
        </p>
        <div className='mt-4 flex flex-col gap-2'>
          <span className='text-xs text-muted-foreground/60'>
            { formattedUpdatedAt ? `${ sheetsT( 'updated' ) } ${ formattedUpdatedAt }` : '' }
          </span>
          <StatusBadge status={ campaign_status! } className='w-fit' />
        </div>
      </div>
    </div>
  );
};

export function useCampaignColumns( options?: { onViewCreator?: ( creator: ModelsCreatorResponse ) => void; } ): ColumnDef<ModelsCampaignResponse>[] {
  const t = useTranslations( 'dashboard.brand.campaignsPage' );
  const actionsT = useTranslations( 'dashboard.brand.campaignsPage.actions' );
  const onViewCreator = options?.onViewCreator;

  return React.useMemo( () => [
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
        const rowValue = row.getValue( id ) as string;
        return filterValue.includes( rowValue );
      },
    },
    {
      id: 'content_type',
      accessorKey: 'content_type',
      cell: () => <span data-hidden-column="true" />,
      enableSorting: false,
      enableHiding: false,
      header: () => <span data-hidden-column="true" />,
      size: 0,
      minSize: 0,
      maxSize: 0,
      filterFn: ( row, id, filterValue ) => {
        if ( filterValue === undefined ) return true;
        if ( !Array.isArray( filterValue ) ) return true;
        if ( filterValue.length === 0 ) return false;
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
      header: () => <span className='font-regular pl-4'>{ t( 'details' ) }</span>,
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
            <span className='font-regular'>{ t( 'applications' ) }</span>
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ( { row } ) => <ApplicationsCell row={ row } onViewCreator={ onViewCreator } />,
    },
    {
      accessorKey: 'invitations',
      header: () => <span className='font-regular'>{ t( 'invitations' ) }</span>,
      cell: ( { row } ) => <InvitationsCell row={ row } />,
    },
    {
      accessorKey: 'submissions',
      header: () => <span className='font-regular'>{ t( 'submissions' ) }</span>,
      cell: ( { row } ) => <SubmissionsCell row={ row } />,
    },
    {
      id: 'actions',
      header: () => (
        <div className='flex justify-end pr-2'>
          <span className='font-regular text-right'>{ actionsT( 'actions' ) }</span>
        </div>
      ),
      enableHiding: false,
      cell: ( { row } ) => <CampaignActionsCell row={ row } className='pr-2' />,
    },
  ], [ t, actionsT, onViewCreator ] );
}
