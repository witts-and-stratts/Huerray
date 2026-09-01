'use client';

import { Activity, useCallback, useEffect, useEffectEvent, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Badge } from '@/components/dashboard-ui/badge';
import { SubHeader, SubHeaderTabs } from '@/components/subheader';
import { GigActionMenu } from '@/components/campaigns/gig-action-menu';
import { GigCreatorActions } from '@/components/campaigns/gig-creator-actions';
import { GigStatusBadge } from '@/components/campaigns/gig-status-badge';
import { GigApplicationsInvitationsSection } from '@/components/campaigns/sections/gig-applications-invitations-section';
import { GigCampaignSection } from '@/components/campaigns/sections/gig-campaign-section';
import { GigCommentsSection } from '@/components/campaigns/sections/gig-comments-section';
import { GigCreatorsSection } from '@/components/campaigns/sections/gig-creators-section';
import { GigDetailsSection } from '@/components/campaigns/sections/gig-details-section';
import { GigSubmissionsSection } from '@/components/campaigns/sections/gig-submissions-section';
import { Button } from '@/components/dashboard-ui/button';
import { useRole } from '@/contexts/role-context';
import type { ModelsGigResponse } from '@/lib/api/generated/models';
import { UtilsEntityType } from '@/lib/api/generated/models/utils-entity-type';
import { useComments } from '@/lib/api/hooks/comments';
import { useCreatorGigStatus, useGigApplications, useGigInvitations } from '@/lib/api/hooks/gigs';
import { useVideoSubmissionsByGig } from '@/lib/api/hooks/video-submissions';
import { useBasePath } from '@/lib/providers/path-provider';
import { cn } from '@/lib/dashboard-utils';

const ALL_TABS = [ 'details', 'creators', 'invitations', 'campaign', 'submissions', 'comments' ] as const;
type TabValue = typeof ALL_TABS[ number ];

function getTabFromHash(): TabValue {
  if ( typeof window === 'undefined' ) return 'details';
  const hash = window.location.hash.replace( '#', '' );
  return ( ALL_TABS as readonly string[] ).includes( hash ) ? ( hash as TabValue ) : 'details';
}

interface GigDetailsPageViewProps {
  gig: ModelsGigResponse;
}

function TabLabel( { label, count }: { label: string; count: number; } ) {
  return (
    <span className="flex items-center gap-1.5">
      { label }
      { count > 0 && <Badge variant="secondary" className="h-4 px-1.5 text-[10px] font-normal">{ count }</Badge> }
    </span>
  );
}

export function GigDetailsPageView( { gig }: GigDetailsPageViewProps ) {
  const t = useTranslations( 'dashboard.brand.campaignsPage.actions' );
  const commonT = useTranslations( 'dashboard.common' );
  const basePath = useBasePath();
  const role = useRole();
  const isCreator = role === 'creator';
  const gigId = gig.id ?? '';
  const campaignId = gig.campaign_id ?? gig.campaign?.id ?? '';

  const [ activeTab, setActiveTab ] = useState<TabValue>( getTabFromHash );
  const onHashChange = useEffectEvent( () => {
    setActiveTab( getTabFromHash() );
  } );

  const changeTab = useCallback( ( tab: string ) => {
    const validated = ( ALL_TABS as readonly string[] ).includes( tab ) ? ( tab as TabValue ) : 'details';
    setActiveTab( validated );
    window.history.replaceState( null, '', `#${ validated }` );
  }, [] );

  useEffect( () => {
    setActiveTab( getTabFromHash() );
    window.addEventListener( 'hashchange', onHashChange );
    return () => window.removeEventListener( 'hashchange', onHashChange );
  }, [] );

  // Creators (Accepted Creators) and Invitations & Applications tabs expose
  // who else applied/was invited — not something a creator should see about
  // their peers. Bounce away if a stale link/hash lands a creator there.
  useEffect( () => {
    if ( isCreator && ( activeTab === 'creators' || activeTab === 'invitations' ) ) {
      changeTab( 'details' );
    }
  }, [ isCreator, activeTab, changeTab ] );

  const { data: applicationsData } = useGigApplications( gigId, { enabled: !isCreator } );
  const { data: invitationsData } = useGigInvitations( gigId, { enabled: !isCreator } );
  const { data: submissionsData } = useVideoSubmissionsByGig( gigId );
  const { isParticipating: creatorIsParticipating, isLoading: creatorStatusLoading } = useCreatorGigStatus( gigId, { enabled: isCreator } );
  const { data: commentsData } = useComments( UtilsEntityType.EntityTypeGig, gigId, { enabled: !isCreator || creatorIsParticipating } );

  const applications = applicationsData?.data ?? [];
  const invitationsRaw = invitationsData?.data;
  const invitations = Array.isArray( invitationsRaw ) ? invitationsRaw : invitationsRaw ? [ invitationsRaw ] : [];

  const acceptedCreatorCount = new Set( [
    ...applications.filter( ( a ) => a.status === 'accepted' ).map( ( a ) => a.creator_id ),
    ...invitations.filter( ( i ) => i.status === 'accepted' ).map( ( i ) => i.creator_id ),
  ].filter( Boolean ) ).size;

  const invitationApplicationCount = applications.length + invitations.length;
  const submissionCount = submissionsData?.data?.length ?? 0;
  const commentCount = commentsData?.data?.length ?? 0;

  const tabItems = [
    { value: 'details', label: 'Details' },
    ...( !isCreator ? [ { value: 'creators', label: <TabLabel label="Creators" count={ acceptedCreatorCount } /> } ] : [] ),
    ...( !isCreator ? [ { value: 'invitations', label: <TabLabel label="Invitations & Applications" count={ invitationApplicationCount } /> } ] : [] ),
    ...( gig.campaign ? [ { value: 'campaign', label: 'Campaign' } ] : [] ),
    { value: 'submissions', label: <TabLabel label={ isCreator ? 'My Submissions' : t( 'submissions' ) } count={ submissionCount } /> },
    { value: 'comments', label: <TabLabel label="Comments" count={ commentCount } /> },
  ];

  const campaignName = gig.campaign?.campaign_name ?? gig.campaign_name ?? 'Campaign';
  const breadcrumbs = isCreator
    ? [
      { label: 'Gigs', href: `${ basePath }/gigs` },
      { label: gig.title ?? 'Gig' },
    ]
    : [
      { label: 'Campaigns', href: `${ basePath }/campaigns` },
      ...( campaignId ? [ { label: campaignName, href: `${ basePath }/campaigns/${ campaignId }` } ] : [] ),
      { label: gig.title ?? 'Gig' },
    ];

  return (
    <>
      <SubHeader
        title={ <span className="font-normal">{ gig.title }</span> }
        status={ <GigStatusBadge status={ gig.gig_status } /> }
        pre={ <span className="font-medium text-muted-foreground">Gig</span> }
        breadcrumbs={ breadcrumbs }
        tabs={
          <SubHeaderTabs
            value={ activeTab }
            onChange={ changeTab }
            tabItems={ tabItems }
          />
        }
      >
        { role === 'admin' && (
          <GigActionMenu
            gig={ gig }
            onViewGig={ () => { } }
            trigger={
              <Button variant="outline" className={ cn( 'px-2 font-regular border-border/60' ) } size="default">
                { commonT( 'actions' ) }
                <ChevronDown className="size-4" />
              </Button>
            }
          />
        ) }
        { isCreator && !creatorStatusLoading && (
          <GigCreatorActions gig={ gig } onSubmissionCreated={ () => changeTab( 'submissions' ) } />
        ) }
      </SubHeader>

      <div className="p-2 md:p-6 space-y-6 bg-slate-50/80 flex flex-col flex-1 min-h-0 overflow-y-auto">
        <Activity mode={ activeTab === 'details' ? 'visible' : 'hidden' }>
          <GigDetailsSection gig={ gig } />
        </Activity>

        { !isCreator && (
          <Activity mode={ activeTab === 'creators' ? 'visible' : 'hidden' }>
            <GigCreatorsSection gigId={ gigId } />
          </Activity>
        ) }

        { !isCreator && (
          <Activity mode={ activeTab === 'invitations' ? 'visible' : 'hidden' }>
            <GigApplicationsInvitationsSection gigId={ gigId } campaignId={ campaignId } />
          </Activity>
        ) }

        { gig.campaign && (
          <Activity mode={ activeTab === 'campaign' ? 'visible' : 'hidden' }>
            <GigCampaignSection campaign={ gig.campaign } showCampaignLink={ !isCreator } />
          </Activity>
        ) }

        <Activity mode={ activeTab === 'submissions' ? 'visible' : 'hidden' }>
          <GigSubmissionsSection gigId={ gigId } />
        </Activity>

        <Activity mode={ activeTab === 'comments' ? 'visible' : 'hidden' }>
          <div className="flex flex-col flex-1 min-h-0">
            <GigCommentsSection
              gigId={ gigId }
              disableComment={ isCreator && !creatorIsParticipating }
              disabledMessage={ isCreator ? "You'll be able to message the brand here once your application or invitation for this gig is accepted." : undefined }
            />
          </div>
        </Activity>
      </div>
    </>
  );
}
