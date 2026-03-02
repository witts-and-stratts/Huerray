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
import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/dashboard-ui/sheet';
import { ApplicationCard } from './application-card';
import { GigDetailsSheet } from './gig-details-sheet';
import { SubmissionViewDialog } from './submission-view-dialog';

interface CampaignCardProps {
  campaign: ModelCampaign;
  basePath: string;
}

const AvatarRowSkeleton = ( { label }: { label: string; } ) => (
  <div className='flex flex-col gap-2'>
    <span className='text-xs font-medium text-muted-foreground'>{ label }</span>
    <div className='flex min-h-10 gap-2'>
      { Array.from( { length: 4 } ).map( ( _, i ) => (
        <Skeleton key={ i } className='h-8 w-8 rounded-full -m-l-4' />
      ) ) }
    </div>
  </div>
);

export function CampaignCard( { campaign, basePath }: CampaignCardProps ) {
  const { id, campaign_name, description, campaign_status, updated_at, brand_id } = campaign;

  const { data: applicationsData, isLoading: loadingApps } = useCampaignApplications( id || '' );
  const { data: invitationsData, isLoading: loadingInvitations } = useCampaignInvitations( id || '' );
  const { data: submissionsData, isLoading: loadingSubmissions } = useCampaignSubmissions( id || '' );

  const applications = ( applicationsData?.data || [] ) as ModelsGigApplicationResponse[];
  const invitations = ( invitationsData?.data || [] ) as ModelsGigInvitationResponse[];
  const submissions = ( submissionsData?.data || [] ) as ModelsVideoSubmissionResponse[];

  const [ selectedApp, setSelectedApp ] = useState<ModelsGigApplicationResponse | null>( null );
  const [ selectedInvitation, setSelectedInvitation ] = useState<ModelsGigInvitationResponse | null>( null );
  const [ selectedSubmission, setSelectedSubmission ] = useState<ModelsVideoSubmissionResponse | null>( null );

  const applicationPeople = applications.map( app => ( {
    first_name: app.creator?.first_name || '',
    last_name: app.creator?.last_name || '',
    avatar: app.creator?.profile_image_url || '',
  } ) );

  const invitationPeople = invitations.map( inv => ( {
    first_name: inv.creator?.first_name || '',
    last_name: inv.creator?.last_name || '',
    avatar: inv.creator?.profile_image_url || '',
  } ) );

  const submissionPeople = submissions.map( sub => ( {
    first_name: sub.creator?.first_name || '',
    last_name: sub.creator?.last_name || '',
    avatar: sub.creator?.profile_image_url || '',
  } ) );

  return (
    <>
      <Card className='py-3 justify-between gap-1 h-full'>
        <CardHeader className="flex items-start justify-between gap-4 mb-2 pr-1">
          <div className="flex flex-col flex-1 min-w-0">
            <Link href={ `${ basePath }/campaigns/${ id }` } className='hover:underline'>
              <CardTitle className='capitalize text-[18px] font-normal text-primary font-primary truncate'>
                { campaign_name }
              </CardTitle>
            </Link>
            <CardDescription
              dangerouslySetInnerHTML={ { __html: stripTags( description! ) } }
              className="font-regular text-muted-foreground mt-1 text-sm line-clamp-2"
            />
          </div>
          <div className="flex shrink-0 text-right gap-2 items-start">
            { brand_id && (
              <BrandAvatar brandId={ brand_id } className="size-10 border bg-white rounded-full shrink-0" />
            ) }
            <CampaignActionMenu campaign={ campaign } basePath={ basePath } />
          </div>
        </CardHeader>

        <CardContent className='space-y-3 pb-2'>
          <div className='min-h-[64px]'>
            <AnimatePresence>
              { ( loadingApps || loadingInvitations || loadingSubmissions ) ? (
                <AvatarRowSkeleton label='&nbsp;' />
              ) : submissionPeople.length > 0 ? (
                <motion.div className='flex flex-col gap-2'>
                  <span className='text-xs font-medium text-muted-foreground'>Submissions</span>
                  <motion.div className='flex min-h-10'>
                    <AnimatePresence>
                      <AvatarCollage
                        people={ submissionPeople }
                        onPersonClick={ ( i ) => setSelectedSubmission( submissions[ i ] ) }
                      />
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              ) : applicationPeople.length > 0 ? (
                <motion.div className='flex flex-col gap-2'>
                  <span className='text-xs font-medium text-muted-foreground'>Applications</span>
                  <motion.div className='flex min-h-10'>
                    <AnimatePresence>
                      <AvatarCollage
                        people={ applicationPeople }
                        onPersonClick={ ( i ) => setSelectedApp( applications[ i ] ) }
                      />
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              ) : invitationPeople.length > 0 ? (
                <motion.div className='flex flex-col gap-2'>
                  <span className='text-xs font-medium text-muted-foreground'>Invitations</span>
                  <motion.div className='flex min-h-10'>
                    <AnimatePresence>
                      <AvatarCollage
                        people={ invitationPeople }
                        onPersonClick={ ( i ) => setSelectedInvitation( invitations[ i ] ) }
                      />
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              ) : null }
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className='text-xs text-muted-foreground/60'>
              Updated{ ' ' }
              { Intl.DateTimeFormat( 'en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              } ).format( new Date( updated_at! ) ) }
            </span>
          </div>

          <div className="mt-2">
            <StatusBadge status={ campaign_status! } />
          </div>
        </CardContent>
      </Card>

      <Sheet open={ !!selectedApp } onOpenChange={ ( open ) => !open && setSelectedApp( null ) }>
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
        onOpenChange={ ( open ) => !open && setSelectedInvitation( null ) }
        invitationId={ selectedInvitation?.id }
        invitationStatus={ selectedInvitation?.status }
      />

      { selectedSubmission && (
        <SubmissionViewDialog
          open={ !!selectedSubmission }
          onOpenChange={ ( open ) => !open && setSelectedSubmission( null ) }
          submission={ selectedSubmission }
        />
      ) }
    </>
  );
}
