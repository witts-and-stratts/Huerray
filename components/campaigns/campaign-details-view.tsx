'use client';

import { Badge } from '@/components/dashboard-ui/badge';
import { Button } from '@/components/dashboard-ui/button';
import { ButtonGroup } from '@/components/dashboard-ui/button-group';
import { SubHeader, SubHeaderTabs } from '@/components/subheader';
import { useRole } from '@/contexts/role-context';
import {
  ModelsAdminCampaignApprovalRequestCampaignStatusEnum,
  ModelsCampaignResponse,
  ModelsCampaignStatusUpdateRequestCampaignStatusEnum,
} from '@/lib/api/generated/models';
import { UtilsContentType } from '@/lib/api/generated/models/utils-content-type';
import { useAdminCampaignApproval, useCampaignApplications, useCampaignInvitations, useCampaignSubmissions, useSubmitCampaign, useUpdateCampaignStatus } from '@/lib/api/hooks/campaigns';
import { useMultipleComments } from '@/lib/api/hooks/comments';
import { useGigsByCampaign } from '@/lib/api/hooks/gigs';
import { UtilsEntityType } from '@/lib/api/generated/models/utils-entity-type';
import { ApiError } from '@/lib/api/hooks/types';
import { Brain, ChevronDown, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Activity, useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { SentenceCase } from '../text-case';
import { CampaignActionMenu } from './campaign-action-menu';
import {
  type ActionItem,
  type AdminDecision,
  buildAdminActions,
  buildBrandActions,
  CampaignActionDialogs,
} from './campaign-quick-actions';
import { GigSelectionDialog } from './gig-selection-dialog';
import { InviteCreatorsDialog } from './invite-creators-dialog';
import { CampaignApplicationsSection } from './sections/campaign-applications-section';
import { CampaignCommentsSection } from './sections/campaign-comments-section';
import { CampaignGigsSection } from './sections/campaign-gigs-section';
import { CampaignInvitationsSection } from './sections/campaign-invitations-section';
import { CampaignOverviewSection } from './sections/campaign-overview-section';
import { CampaignSubmissionsSection } from './sections/campaign-submissions-section';
import { StatusBadge } from './status-badge';
import { cn } from '@/lib/dashboard-utils';
import { useTranslations } from 'next-intl';

const VALID_TABS = [ 'overview', 'applications', 'submissions', 'invitations', 'gigs', 'comments' ] as const;
type TabValue = typeof VALID_TABS[ number ];

function getTabFromHash(): TabValue {
  if ( typeof window === 'undefined' ) return 'overview';
  const hash = window.location.hash.replace( '#', '' );
  return ( VALID_TABS as readonly string[] ).includes( hash ) ? ( hash as TabValue ) : 'overview';
}

interface CampaignDetailsViewProps {
  campaign: ModelsCampaignResponse;
}

function SubheaderActionButton( { item }: { item: ActionItem; } ) {
  const variantMap = {
    primary: 'default',
    outline: 'outline',
    destructive: 'destructive',
  } as const;

  const Icon = item.icon;
  const variant = variantMap[ item.variant ?? 'outline' ];

  const inner = (
    <>
      { Icon && <Icon className="size-3.5" /> }
      { item.label }
    </>
  );

  return (
    <Button variant={ variant } size="default" className="font-regular border-border disabled:opacity-60" onClick={ item.onClick } disabled={ item.disabled }>
      { item.href
        ? <Link href={ item.href } className="flex items-center gap-1.5 text-current">{ inner }</Link>
        : inner }
    </Button>
  );
}

import { ConfirmDialog } from '@/components/dashboard-ui/confirm-dialog';
import { useBasePath } from '@/lib/providers/path-provider';

export function CampaignDetailsView( { campaign }: CampaignDetailsViewProps ) {
  const t = useTranslations( 'dashboard.brand.campaignsPage.actions' );
  const newCampaignT = useTranslations( 'dashboard.brand.newCampaignPage' );
  const basePath = useBasePath();
  const [ activeTab, setActiveTab ] = useState<TabValue>( getTabFromHash );

  // Sync: tab → URL hash
  const changeTab = useCallback( ( tab: string ) => {
    const validated = ( VALID_TABS as readonly string[] ).includes( tab ) ? ( tab as TabValue ) : 'overview';
    setActiveTab( validated );
    window.history.replaceState( null, '', `#${ validated }` );
  }, [] );

  // Sync: URL hash → tab (browser back/forward, external hash changes)
  useEffect( () => {
    const onHashChange = () => setActiveTab( getTabFromHash() );
    window.addEventListener( 'hashchange', onHashChange );
    return () => window.removeEventListener( 'hashchange', onHashChange );
  }, [] );
  const role = useRole();

  // Tab badge counts
  const { data: applicationsData } = useCampaignApplications( campaign.id || '' );
  const { data: submissionsData } = useCampaignSubmissions( campaign.id || '' );
  const { data: invitationsData } = useCampaignInvitations( campaign.id || '' );
  const { data: gigsData } = useGigsByCampaign( campaign.id || '', role === 'admin' ? 'admin' : 'brand' );
  const commentsResults = useMultipleComments( [
    { entityType: UtilsEntityType.EntityTypeCampaign, entityId: campaign.id || '' },
    { entityType: UtilsEntityType.EntityTypeAdminCampaignApproval, entityId: campaign.id || '' },
    { entityType: UtilsEntityType.EntityTypeBrandCampaignDecision, entityId: campaign.id || '' },
  ] );

  const applicationCount = applicationsData?.data?.length ?? 0;
  const submissionCount = submissionsData?.data?.length ?? 0;
  const pendingSubmissionCount = submissionsData?.data?.filter( ( s: any ) => s.status === 'created' || s.status === 'pending_approval' ).length ?? 0;
  const approvedSubmissionCount = submissionsData?.data?.filter( ( s: any ) => s.status === 'approved' ).length ?? 0;
  const acceptedSubmissionCount = submissionsData?.data?.filter( ( s: any ) => s.status === 'accepted' ).length ?? 0;
  const openGigCount = gigsData?.data?.filter( ( g: any ) => g.gig_status === 'open' ).length ?? 0;
  const inProgressGigCount = gigsData?.data?.filter( ( g: any ) => g.gig_status === 'in_progress' ).length ?? 0;
  const invitationCount = Array.isArray( invitationsData?.data ) ? invitationsData.data.length : 0;
  const commentCount = commentsResults.reduce( ( sum, r ) => sum + ( r.data?.data?.length ?? 0 ), 0 );

  // Quick action dialog state
  const [ approveDialogOpen, setApproveDialogOpen ] = useState( false );
  const [ adminComment, setAdminComment ] = useState( '' );
  const [ adminDecision, setAdminDecision ] = useState<AdminDecision>( 'approve' );
  const [ acceptDialogOpen, setAcceptDialogOpen ] = useState( false );
  const [ rejectDialogOpen, setRejectDialogOpen ] = useState( false );
  const [ gigSelectionOpen, setGigSelectionOpen ] = useState( false );
  const [ selectedGigId, setSelectedGigId ] = useState( '' );
  const [ inviteCreatorsOpen, setInviteCreatorsOpen ] = useState( false );

  const approveCampaign = useAdminCampaignApproval();
  const updateCampaignStatus = useUpdateCampaignStatus();
  const submitCampaign = useSubmitCampaign();

  const [ publishDialogOpen, setPublishDialogOpen ] = useState( false );

  const handlePublishCampaign = async () => {
    try {
      await submitCampaign.mutateAsync( campaignId );
      toast.success( t( 'campaignPublished' ) );
      setPublishDialogOpen( false );
    } catch {
      toast.error( t( 'publishCampaignFailed' ) );
    }
  };

  const status = campaign.campaign_status ?? '';
  const campaignId = campaign.id ?? '';
  const gigsValidated = campaign.number_of_gigs_validated ?? false;

  const openAdminDialog = ( decision: AdminDecision ) => {
    setAdminDecision( decision );
    setApproveDialogOpen( true );
  };

  const openBrandAccept = () => setAcceptDialogOpen( true );
  const openInviteCreators = () => setGigSelectionOpen( true );

  const handleAdminAction = () => {
    if ( !campaignId ) return;

    if ( adminDecision === 'complete' ) {
      updateCampaignStatus.mutate( {
        id: campaignId,
        request: { campaign_status: ModelsCampaignStatusUpdateRequestCampaignStatusEnum.Completed },
      }, {
        onSuccess: () => { toast.success( t( 'campaignCompleted' ) ); setApproveDialogOpen( false ); },
        onError: () => toast.error( t( 'completeCampaignFailed' ) ),
      } );
      return;
    }

    const isApprove = adminDecision === 'approve';
    approveCampaign.mutate( {
      id: campaignId,
      request: {
        campaign_status: isApprove
          ? ModelsAdminCampaignApprovalRequestCampaignStatusEnum.GigsApproved
          : ModelsAdminCampaignApprovalRequestCampaignStatusEnum.Returned,
        admin_comments: adminComment || ( isApprove ? t( 'approvedByAdmin' ) : t( 'rejectedByAdmin' ) ),
        number_of_gigs_validated: isApprove ? true : undefined,
      },
    }, {
      onSuccess: () => {
        toast.success( isApprove ? t( 'campaignApproved' ) : t( 'campaignRejected' ) );
        setApproveDialogOpen( false );
        setAdminComment( '' );
      },
      onError: ( err ) => {
        const error = err as ApiError;
        toast.error( isApprove ? 'Failed to approve campaign' : 'Failed to reject campaign', {
          description: <SentenceCase>{ error?.response?.data?.error?.message || t( 'tryAgainLater' ) }</SentenceCase>,
          richColors: true,
        } );
      },
    } );
  };

  // Build the action list and take the top 2 for the subheader
  const allActions = role === 'admin'
    ? buildAdminActions( t, status, basePath, campaignId, gigsValidated, pendingSubmissionCount, approvedSubmissionCount, openGigCount, openAdminDialog, changeTab )
    : buildBrandActions( t, status, basePath, campaignId, submissionCount, pendingSubmissionCount, approvedSubmissionCount, acceptedSubmissionCount, openGigCount, inProgressGigCount, openBrandAccept, openInviteCreators, changeTab );

  const subheaderActions = allActions.slice( 0, 1 );
  const dropdownVariant = subheaderActions[ 0 ]?.disabled ? 'outline' : 'default';

  function TabLabel( { label, count }: { label: string; count: number; } ) {
    return (
      <span className="flex items-center gap-1.5">
        { label }
        { count > 0 && <Badge variant="secondary" className="h-4 px-1.5 text-[10px] font-normal">{ count }</Badge> }
      </span>
    );
  }

  const commentsLoaded = commentsResults.every( ( r ) => !r.isLoading );

  // If the comments tab is active but there are no comments, fall back to overview
  useEffect( () => {
    if ( activeTab === 'comments' && commentCount === 0 && commentsLoaded ) {
      changeTab( 'overview' );
    }
  }, [ activeTab, commentCount, commentsLoaded, changeTab ] );

  const tabItems = [
    { value: 'overview', label: 'Overview' },
    { value: 'applications', label: <TabLabel label={ t( 'applications' ) } count={ applicationCount } /> },
    { value: 'submissions', label: <TabLabel label={ t( 'submissions' ) } count={ submissionCount } /> },
    { value: 'invitations', label: <TabLabel label={ t( 'invitations' ) } count={ invitationCount } /> },
    { value: 'gigs', label: 'Gigs' },
    ...( commentCount > 0 ? [ { value: 'comments', label: <TabLabel label={ t( 'comments' ) } count={ commentCount } /> } ] : [] ),
  ];

  return (
    <>
      <SubHeader
        title={
          <span className="flex items-center gap-2">
            <span className='font-normal'>{ campaign.campaign_name! }</span>
            { campaign.content_type === UtilsContentType.ContentTypeAIGenerated && (
              <Badge variant="outline" className="gap-1.5 border-maroon-400 bg-maroon-50 text-maroon-500 mt-2">
                <Brain className="size-4" />
                { newCampaignT( 'aiBadge' ) }
              </Badge>
            ) }
          </span>
        }
        // description={ campaign.description! }
        status={ <StatusBadge status={ campaign.campaign_status! } /> }
        pre={ <span className='font-medium text-muted-foreground'>Campaign</span> }
        breadcrumbs={ [
          { label: 'Campaigns', href: `${ basePath }/campaigns` },
          { label: campaign.campaign_name!, href: `${ basePath }/campaigns/${ campaign.id }` },
        ] }
        tabs={
          <SubHeaderTabs
            value={ activeTab }
            onChange={ changeTab }
            tabItems={ tabItems }
          />
        }
      >
        <ButtonGroup className='items-center'>
          { subheaderActions.map( item => (
            <SubheaderActionButton key={ item.key } item={ item } />
          ) ) }
          {/* { status === 'draft' && role === 'brand' && (
            <Button
              variant="default"
              size="default"
              disabled={ submitCampaign.isPending }
              onClick={ () => setPublishDialogOpen( true ) }
            >
              { submitCampaign.isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Publishing...
                </>
              ) : 'Publish' }
            </Button>
          ) } */}
          <CampaignActionMenu
            campaign={ campaign }
            hideViewDetails={ true }
            trigger={
              <Button variant={ dropdownVariant } className={ cn( 'px-2 font-regular', dropdownVariant === 'outline' && 'border-border/60' ) } size='default'>
                <ChevronDown className='size-4' />
              </Button>
            }
          />
        </ButtonGroup>
      </SubHeader>

      <div className='p-2 md:p-6 space-y-6 bg-slate-50/80 flex flex-col flex-1 min-h-0 overflow-y-auto'>
        <Activity mode={ activeTab === 'overview' ? 'visible' : 'hidden' }>
          <CampaignOverviewSection
            campaign={ campaign }
            basePath={ basePath }
            onViewAllInvitations={ () => changeTab( 'invitations' ) }
          />
        </Activity>

        <Activity mode={ activeTab === 'applications' ? 'visible' : 'hidden' }>
          <CampaignApplicationsSection campaignId={ campaign.id || '' } />
        </Activity>

        <Activity mode={ activeTab === 'submissions' ? 'visible' : 'hidden' }>
          <CampaignSubmissionsSection campaignId={ campaign.id || '' } />
        </Activity>

        <Activity mode={ activeTab === 'invitations' ? 'visible' : 'hidden' }>
          <CampaignInvitationsSection campaignId={ campaign.id || '' } campaignStatus={ campaign.campaign_status } />
        </Activity>

        <Activity mode={ activeTab === 'gigs' ? 'visible' : 'hidden' }>
          <CampaignGigsSection
            campaignId={ campaign.id || '' }
            role={ role === 'admin' ? 'admin' : 'brand' }
            basePath={ basePath }
          />
        </Activity>

        <Activity mode={ activeTab === 'comments' ? 'visible' : 'hidden' }>
          <div className='flex flex-col flex-1 min-h-0'>
            <CampaignCommentsSection campaignId={ campaign.id || '' } />
          </div>
        </Activity>
      </div>

      { /* Dialogs — rendered outside the subheader so they portal correctly */ }
      <CampaignActionDialogs
        campaignId={ campaignId }
        adminDecision={ adminDecision }
        approveDialogOpen={ approveDialogOpen }
        onApproveDialogChange={ setApproveDialogOpen }
        adminComment={ adminComment }
        onAdminCommentChange={ setAdminComment }
        onAdminConfirm={ handleAdminAction }
        isAdminLoading={ approveCampaign.isPending || updateCampaignStatus.isPending }
        acceptDialogOpen={ acceptDialogOpen }
        onAcceptDialogChange={ setAcceptDialogOpen }
        rejectDialogOpen={ rejectDialogOpen }
        onRejectDialogChange={ setRejectDialogOpen }
      />

      <ConfirmDialog
        open={ publishDialogOpen }
        onOpenChange={ setPublishDialogOpen }
        title={ t( 'publishCampaignTitle' ) }
        description={ t( 'publishCampaignDescription' ) }
        confirmLabel={ t( 'publishCampaign' ) }
        cancelLabel={ t( 'cancel' ) }
        onConfirm={ handlePublishCampaign }
        isLoading={ submitCampaign.isPending }
        loadingText={ t( 'publishing' ) }
        variant="default"
      />

      <GigSelectionDialog
        campaignId={ campaignId }
        open={ gigSelectionOpen }
        onOpenChange={ setGigSelectionOpen }
        onSelect={ ( gigId ) => { setSelectedGigId( gigId ); setGigSelectionOpen( false ); setInviteCreatorsOpen( true ); } }
      />
      <InviteCreatorsDialog
        campaignId={ campaignId }
        gigId={ selectedGigId }
        open={ inviteCreatorsOpen }
        onOpenChange={ setInviteCreatorsOpen }
      />
    </>
  );
}
