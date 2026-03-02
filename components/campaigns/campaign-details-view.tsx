'use client';

import { Badge } from '@/components/dashboard-ui/badge';
import { Button } from '@/components/dashboard-ui/button';
import { ButtonGroup } from '@/components/dashboard-ui/button-group';
import { SubHeader, SubHeaderTabs } from '@/components/subheader';
import { useRole } from '@/contexts/role-context';
import {
  ModelsAdminCampaignApprovalRequestCampaignStatusEnum,
  ModelsCampaignStatusUpdateRequestCampaignStatusEnum,
} from '@/lib/api/generated/models';
import { useAdminCampaignApproval, useCampaignApplications, useCampaignInvitations, useCampaignSubmissions, useUpdateCampaignStatus } from '@/lib/api/hooks/campaigns';
import { useGigsByCampaign } from '@/lib/api/hooks/gigs';
import { ApiError } from '@/lib/api/hooks/types';
import { ChevronDown } from 'lucide-react';
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
import { CampaignGigsSection } from './sections/campaign-gigs-section';
import { CampaignInvitationsSection } from './sections/campaign-invitations-section';
import { CampaignOverviewSection } from './sections/campaign-overview-section';
import { CampaignSubmissionsSection } from './sections/campaign-submissions-section';
import { StatusBadge } from './status-badge';
import { ModelCampaign } from './types';

const VALID_TABS = [ 'overview', 'applications', 'submissions', 'invitations', 'gigs' ] as const;
type TabValue = typeof VALID_TABS[ number ];

function getTabFromHash(): TabValue {
  if ( typeof window === 'undefined' ) return 'overview';
  const hash = window.location.hash.replace( '#', '' );
  return ( VALID_TABS as readonly string[] ).includes( hash ) ? ( hash as TabValue ) : 'overview';
}

interface CampaignDetailsViewProps {
  campaign: ModelCampaign;
  basePath: string;
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
      <Icon className="size-3.5" />
      { item.label }
    </>
  );

  return (
    <Button variant={ variant } size="default" className="font-regular border-border" onClick={ item.onClick } disabled={ item.disabled }>
      { item.href
        ? <Link href={ item.href } className="flex items-center gap-1.5 text-current">{ inner }</Link>
        : inner }
    </Button>
  );
}

export function CampaignDetailsView( { campaign, basePath }: CampaignDetailsViewProps ) {
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

  const applicationCount = applicationsData?.data?.length ?? 0;
  const submissionCount = submissionsData?.data?.length ?? 0;
  const pendingSubmissionCount = submissionsData?.data?.filter( ( s: any ) => s.status === 'created' || s.status === 'pending_approval' ).length ?? 0;
  const approvedSubmissionCount = submissionsData?.data?.filter( ( s: any ) => s.status === 'approved' ).length ?? 0;
  const acceptedSubmissionCount = submissionsData?.data?.filter( ( s: any ) => s.status === 'accepted' ).length ?? 0;
  const openGigCount = gigsData?.data?.filter( ( g: any ) => g.gig_status === 'open' ).length ?? 0;
  const inProgressGigCount = gigsData?.data?.filter( ( g: any ) => g.gig_status === 'in_progress' ).length ?? 0;
  const invitationCount = Array.isArray( invitationsData?.data ) ? invitationsData.data.length : 0;

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
        onSuccess: () => { toast.success( 'Campaign completed successfully' ); setApproveDialogOpen( false ); },
        onError: () => toast.error( 'Failed to complete campaign' ),
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
        admin_comments: adminComment || ( isApprove ? 'Approved by admin' : 'Rejected by admin' ),
        number_of_gigs_validated: isApprove ? true : undefined,
      },
    }, {
      onSuccess: () => {
        toast.success( isApprove ? 'Campaign approved successfully' : 'Campaign rejected successfully' );
        setApproveDialogOpen( false );
        setAdminComment( '' );
      },
      onError: ( err ) => {
        const error = err as ApiError;
        toast.error( isApprove ? 'Failed to approve campaign' : 'Failed to reject campaign', {
          description: <SentenceCase>{ error?.response?.data?.error?.message || "Please try again later." }</SentenceCase>,
          richColors: true,
        } );
      },
    } );
  };

  // Build the action list and take the top 2 for the subheader
  const allActions = role === 'admin'
    ? buildAdminActions( status, basePath, campaignId, gigsValidated, pendingSubmissionCount, approvedSubmissionCount, openGigCount, openAdminDialog, changeTab )
    : buildBrandActions( status, basePath, campaignId, submissionCount, pendingSubmissionCount, approvedSubmissionCount, acceptedSubmissionCount, openGigCount, inProgressGigCount, openBrandAccept, openInviteCreators, changeTab );

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

  const tabItems = [
    { value: 'overview', label: 'Overview' },
    { value: 'applications', label: <TabLabel label="Applications" count={ applicationCount } /> },
    { value: 'submissions', label: <TabLabel label="Submissions" count={ submissionCount } /> },
    { value: 'invitations', label: <TabLabel label="Invitations" count={ invitationCount } /> },
    { value: 'gigs', label: 'Gigs' },
  ];

  return (
    <>
      <SubHeader
        title={ campaign.campaign_name! }
        description={ campaign.description! }
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
          <CampaignActionMenu
            campaign={ campaign }
            basePath={ basePath }
            hideViewDetails={ true }
            trigger={
              <Button variant={ dropdownVariant } className='px-2 font-regular' size='default'>
                <ChevronDown className='size-4' />
              </Button>
            }
          />
        </ButtonGroup>
      </SubHeader>

      <div className='p-6 space-y-6 bg-slate-50/70 h-full'>
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
