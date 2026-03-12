'use client';

import { CampaignActionMenu } from './campaign-action-menu';
import { AnimatePresence, motion } from 'motion/react';
import Link from 'next/link';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/dashboard-ui/card';
import { BrandAvatar } from './brand-avatar';
import { AvatarCollage } from './avatar-collage';
import { ModelCampaign } from './types';
import { StatusBadge } from './status-badge';
import { Skeleton } from '@/components/dashboard-ui/skeleton';

import { useCampaignApplications, useCampaignInvitations, useCampaignSubmissions } from '@/lib/api/hooks/campaigns';
import { ModelsGigApplicationResponse, ModelsGigInvitationResponse, ModelsGigResponse, ModelsVideoSubmissionResponse } from '@/lib/api/generated/models';
import { stripTags } from '@/lib/utils';
import { useState, useEffect, useMemo, memo, useCallback } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/dashboard-ui/sheet';
import { ApplicationCard } from './application-card';
import { GigDetailsSheet } from './gig-details-sheet';
import { SubmissionViewDialog } from './submission-view-dialog';
import { imgpresets } from '@/lib/utils/imgproxy';
import { cn } from '@/lib/dashboard-utils';
import { useBasePath } from '@/lib/providers/path-provider';

interface CampaignCardProps {
  campaign: ModelCampaign;
}

type SelectedItem =
  | { type: 'app'; data: ModelsGigApplicationResponse; }
  | { type: 'inv'; data: ModelsGigInvitationResponse; }
  | { type: 'sub'; data: ModelsVideoSubmissionResponse; };

const AvatarRowSkeleton = memo( ( { label }: { label: string; } ) => (
  <div className='flex flex-col gap-2'>
    <span className='text-xs font-medium text-muted-foreground'>{ label }</span>
    <div className='flex min-h-10 gap-2'>
      { Array.from( { length: 4 } ).map( ( _, i ) => (
        <Skeleton key={ i } className='h-8 w-8 rounded-full -m-l-4' />
      ) ) }
    </div>
  </div>
) );
AvatarRowSkeleton.displayName = 'AvatarRowSkeleton';

const AvatarGroup = memo( ( { title, people, onSelectItems, items, type }: {
  title: string;
  people: any[];
  items: any[];
  onSelectItems: ( item: any, type: any ) => void;
  type: string;
} ) => {
  if ( people.length === 0 ) return null;

  return (
    <motion.div className='flex flex-col gap-2'>
      <span className='text-xs font-medium text-muted-foreground'>{ title }</span>
      <motion.div className='flex min-h-10'>
        <AnimatePresence>
          <AvatarCollage
            people={ people }
            onPersonClick={ ( i ) => onSelectItems( items[ i ], type ) }
            title={ title }
          />
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
} );
AvatarGroup.displayName = 'AvatarGroup';

const CampaignAvatars = memo( ( { campaignId, onSelectMatch }: {
  campaignId: string;
  onSelectMatch: ( type: 'app' | 'inv' | 'sub', item: any ) => void;
} ) => {
  const { data: applicationsData, isLoading: loadingApps } = useCampaignApplications( campaignId );
  const { data: invitationsData, isLoading: loadingInvitations } = useCampaignInvitations( campaignId );
  const { data: submissionsData, isLoading: loadingSubmissions } = useCampaignSubmissions( campaignId );

  const isLoadingAny = loadingApps || loadingInvitations || loadingSubmissions;
  const [ showSkeleton, setShowSkeleton ] = useState( false );

  useEffect( () => {
    let timer: NodeJS.Timeout;
    if ( isLoadingAny ) {
      timer = setTimeout( () => setShowSkeleton( true ), 2000 );
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShowSkeleton( prev => prev ? false : prev );
    }
    return () => clearTimeout( timer );
  }, [ isLoadingAny ] );

  const applications = useMemo( () => ( applicationsData?.data || [] ) as ModelsGigApplicationResponse[], [ applicationsData ] );
  const invitations = useMemo( () => ( invitationsData?.data || [] ) as ModelsGigInvitationResponse[], [ invitationsData ] );
  const submissions = useMemo( () => ( submissionsData?.data || [] ) as ModelsVideoSubmissionResponse[], [ submissionsData ] );

  const applicationPeople = useMemo( () => applications.map( app => ( {
    first_name: app.creator?.first_name || '',
    last_name: app.creator?.last_name || '',
    avatar: app.creator?.profile_image_url || '',
  } ) ), [ applications ] );

  const invitationPeople = useMemo( () => invitations.map( inv => ( {
    first_name: inv.creator?.first_name || '',
    last_name: inv.creator?.last_name || '',
    avatar: inv.creator?.profile_image_url || '',
  } ) ), [ invitations ] );

  const submissionPeople = useMemo( () => submissions.map( sub => ( {
    first_name: sub.creator?.first_name || '',
    last_name: sub.creator?.last_name || '',
    avatar: sub.creator?.profile_image_url || '',
  } ) ), [ submissions ] );

  const handleSelect = useCallback( ( item: any, type: any ) => {
    onSelectMatch( type, item );
  }, [ onSelectMatch ] );

  return (
    <AnimatePresence>
      { isLoadingAny ? (
        showSkeleton ? <AvatarRowSkeleton label='&nbsp;' /> : null
      ) : submissionPeople.length > 0 ? (
        <AvatarGroup title='Submissions' people={ submissionPeople } items={ submissions } type="sub" onSelectItems={ handleSelect } />
      ) : applicationPeople.length > 0 ? (
        <AvatarGroup title='Applications' people={ applicationPeople } items={ applications } type="app" onSelectItems={ handleSelect } />
      ) : invitationPeople.length > 0 ? (
        <AvatarGroup title='Invitations' people={ invitationPeople } items={ invitations } type="inv" onSelectItems={ handleSelect } />
      ) : null }
    </AnimatePresence>
  );
} );
CampaignAvatars.displayName = 'CampaignAvatars';

const CampaignModals = memo( ( { selectedItem, onSelectMatch }: {
  selectedItem: SelectedItem | null;
  onSelectMatch: ( item: SelectedItem | null ) => void;
} ) => {
  const closeModals = useCallback( ( open: boolean ) => {
    if ( !open ) onSelectMatch( null );
  }, [ onSelectMatch ] );

  const selectedApp = selectedItem?.type === 'app' ? selectedItem.data : null;
  const selectedInvitation = selectedItem?.type === 'inv' ? selectedItem.data : null;
  const selectedSubmission = selectedItem?.type === 'sub' ? selectedItem.data : null;

  return (
    <>
      <Sheet open={ !!selectedApp } onOpenChange={ closeModals }>
        <SheetContent className='w-[90%]! max-w-[420px]! overflow-y-auto'>
          <SheetHeader className='mb-4'>
            <SheetTitle className='font-normal text-primary font-primary'>Application</SheetTitle>
          </SheetHeader>
          { selectedApp && <ApplicationCard application={ selectedApp } /> }
        </SheetContent>
      </Sheet>

      <GigDetailsSheet
        gig={ ( selectedInvitation?.gig as unknown as ModelsGigResponse ) || null }
        open={ !!selectedInvitation }
        onOpenChange={ closeModals }
        invitationId={ selectedInvitation?.id }
        invitationStatus={ selectedInvitation?.status }
      />

      { selectedSubmission && (
        <SubmissionViewDialog
          open={ !!selectedSubmission }
          onOpenChange={ closeModals }
          submission={ selectedSubmission }
        />
      ) }
    </>
  );
} );
CampaignModals.displayName = 'CampaignModals';

export function CampaignCard( { campaign }: CampaignCardProps ) {
  const basePath = useBasePath();
  const { id, campaign_name, description, campaign_status, updated_at, brand_id } = campaign;
  const [ selectedItem, setSelectedItem ] = useState<SelectedItem | null>( null );

  const handleSelectMatch = useCallback( ( type: 'app' | 'inv' | 'sub', data: any ) => {
    setSelectedItem( { type, data } );
  }, [] );

  const formattedDate = useMemo( () => {
    if ( !updated_at ) return '';
    return Intl.DateTimeFormat( 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    } ).format( new Date( updated_at ) );
  }, [ updated_at ] );

  const cleanDescription = useMemo( () => stripTags( description || '' ), [ description ] );

  const coverImage = campaign.product_image_url || campaign.campaign_images?.[ 0 ];

  return (
    <>
      <Card className='flex flex-col h-full overflow-hidden relative'>
        <CardHeader className="flex items-start justify-between gap-4 mb-2 pr-1">
          <div className="flex flex-col flex-1 min-w-0">
            <Link href={ `${ basePath }/campaigns/${ id }` } className='hover:underline'>
              <CardTitle className='truncate'>
                { campaign_name }
              </CardTitle>
            </Link>
            <CardDescription
              dangerouslySetInnerHTML={ { __html: cleanDescription } }
              className="line-clamp-2 mt-1"
            />
          </div>
          <div className={ cn( "flex text-right gap-2 items-start relative -mr-4", {
            "size-12": coverImage
          } ) }>
            { coverImage && (
              <Link href={ `${ basePath }/campaigns/${ id }` } className='hover:underline'>
                <div className="size-12 bg-muted shrink-0 overflow-hidden rounded-full">
                  <img
                    src={ imgpresets.card( coverImage ) }
                    alt={ campaign_name || 'Campaign cover' }
                    className="object-cover w-full h-full"
                  />
                </div>
              </Link>
            ) }
            { brand_id && (
              <BrandAvatar brandId={ brand_id } className={ cn( "size-10 border bg-white rounded-full shrink-0", {
                "absolute -right-2 -bottom-1 size-6 p-0.5": coverImage
              } ) } />
            ) }
          </div>
          <CampaignActionMenu campaign={ campaign } />
        </CardHeader>

        <CardContent className='space-y-3 pb-2'>
          <div className='min-h-[64px]'>
            <CampaignAvatars
              campaignId={ id! }
              onSelectMatch={ handleSelectMatch }
            />
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className='text-xs text-muted-foreground/60'>
              Updated{ ' ' }
              { formattedDate }
            </span>
          </div>

          <div className="mt-2">
            <StatusBadge status={ campaign_status! } />
          </div>
        </CardContent>
      </Card>

      <CampaignModals selectedItem={ selectedItem } onSelectMatch={ setSelectedItem } />
    </>
  );
}
