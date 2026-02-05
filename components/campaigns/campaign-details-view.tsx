'use client';

import { SubHeader, SubHeaderTabs } from '@/components/subheader';
import React, { useState } from 'react';
import { ModelCampaign } from './types';
import { Button } from '@/components/dashboard-ui/button';
import { ButtonGroup } from '@/components/dashboard-ui/button-group';
import { CampaignActionMenu } from './campaign-action-menu';
import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/dashboard-ui/dropdown-menu';
import { CampaignCreatorsSection } from './sections/campaign-creators-section';
import { CampaignGigsSection } from './sections/campaign-gigs-section';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CampaignDecisionDialog } from './campaign-decision-dialog';
import { CampaignImagesView } from './sections/campaign-images-view';
import { CampaignDocumentsView } from './sections/campaign-documents-view';
import { useReplicateCampaign, useAdminCampaignApproval } from '@/lib/api/hooks/campaigns';
import { useGigsByCampaign } from '@/lib/api/hooks/gigs';
import { UtilsGigStatus } from '@/lib/api/generated/models/utils-gig-status';
import { ModelsAdminCampaignApprovalRequestCampaignStatusEnum, ModelsGigResponse } from '@/lib/api/generated/models';
import { toast } from 'sonner';
import { RoleGuard } from '@/components/auth/role-guard';
import { useRole } from '@/contexts/role-context';
import { Capitalize, SentenceCase } from '../text-case';

interface CampaignDetailsViewProps {
  campaign: ModelCampaign;
  basePath: string;
}

function Activity( { mode, children }: { mode: 'visible' | 'hidden'; children: React.ReactNode; } ) {
  return (
    <div className={ mode === 'hidden' ? 'hidden' : '' }>
      { children }
    </div>
  );
}

export function CampaignDetailsView( { campaign, basePath }: CampaignDetailsViewProps ) {
  const [ activeTab, setActiveTab ] = useState( 'overview' );
  const [ decisionDialogOpen, setDecisionDialogOpen ] = useState( false );
  const [ initialDecision, setInitialDecision ] = useState<'yes' | 'no'>( 'yes' );
  const router = useRouter();
  const replicateCampaign = useReplicateCampaign();
  const role = useRole();

  const tabItems = [
    { value: 'overview', label: 'Overview' },
    { value: 'images', label: 'Images' },
    { value: 'documents', label: 'Documents' },
    { value: 'applications', label: 'Applications' },
    { value: 'creators', label: 'Creators' },
    { value: 'gigs', label: 'Gigs' },
  ];

  const { data: gigsData } = useGigsByCampaign( campaign.id || '', 'admin' );
  const allGigsValidated = React.useMemo( () => {
    const gigs = gigsData?.data as ModelsGigResponse[];
    if ( !gigs || gigs.length === 0 ) return false;
    // Check if ALL gigs are validated
    return gigs.every( gig => gig.gig_status === UtilsGigStatus.GigStatusValidated );
  }, [ gigsData ] );

  const handleDecision = ( decision: 'yes' | 'no' ) => {
    setInitialDecision( decision );
    setDecisionDialogOpen( true );
  };

  const { mutate: approveCampaign } = useAdminCampaignApproval();

  const handleAdminApprove = () => {
    if ( !campaign.id ) return;

    approveCampaign( {
      id: campaign.id,
      request: {
        campaign_status: ModelsAdminCampaignApprovalRequestCampaignStatusEnum.GigsApproved,
        admin_comments: "Approved by admin",
        number_of_gigs_validated: true,
      }
    }, {
      onSuccess: () => {
        toast.success( "Campaign approved successfully", {
          richColors: true,
        } );
        router.refresh();
      },
      onError: ( error ) => {
        toast.error( "Failed to approve campaign", {
          description: <SentenceCase>{ ( error as any ).response?.data?.error?.message }</SentenceCase>,
          richColors: true,
        } );
      }
    } );
  };

  return (
    <>
      <SubHeader
        title={ campaign.campaign_name! }
        description={ campaign.description! }
        pre={ <span className='font-medium text-muted-foreground'>Campaign</span> }
        breadcrumbs={ [
          { label: 'Campaigns', href: `${ basePath }/campaigns` },
          { label: campaign.campaign_name!, href: `${ basePath }/campaigns/${ campaign.id }` },
        ] }
        tabs={
          <SubHeaderTabs
            value={ activeTab }
            onChange={ setActiveTab }
            tabItems={ tabItems }
          />
        }
      >
        <ButtonGroup className='items-center'>
          <Button
            variant='outline'
            className='font-regular'
            size='sm'
            onClick={ () => router.push( `${ basePath }/campaigns/${ campaign.id }/edit` ) }
          >
            Edit
          </Button>
          <CampaignActionMenu
            campaign={ campaign }
            basePath={ basePath }
            hideViewDetails={ true }
            trigger={
              <Button variant='outline' className='px-2 font-regular' size='sm'>
                <ChevronDown className='size-4' />
              </Button>
            }
            extraActions={ [
              {
                label: (
                  <Link href={ `${ basePath }/campaigns/${ campaign.id }/gigs/new` } className='w-full'>
                    Create Gig
                  </Link>
                ),
                allowedRoles: [ 'admin' ],
              },
              {
                separator: true,
                label: '',
                allowedRoles: [ 'admin' ],
              },
              {
                label: 'Approve Campaign',
                action: handleAdminApprove,
                allowedRoles: [ 'admin' ],
                condition: () => !!allGigsValidated,
              },
              {
                label: 'Approve Campaign',
                action: () => handleDecision( 'yes' ),
                allowedRoles: [ 'brand' ],
              },
              {
                label: 'Reject Campaign',
                action: () => handleDecision( 'no' ),
                allowedRoles: [ 'brand' ],
              },
              {
                separator: true,
                label: '',
                allowedRoles: [ 'brand' ],
              },
            ] }
          />
        </ButtonGroup>
      </SubHeader>
      <div className='p-6 space-y-6 bg-slate-50/30 h-full -mt-4'>
        <Activity mode={ activeTab === 'overview' ? 'visible' : 'hidden' }>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card rounded-xl border p-6 space-y-4">
              <h3 className="font-semibold text-lg">Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Status</span>
                  <p className="font-medium capitalize">{ campaign.campaign_status?.replace( '_', ' ' ) || '-' }</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Category</span>
                  <p className="font-medium capitalize">{ campaign.category || '-' }</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Format</span>
                  <p className="font-medium uppercase">{ campaign.video_format || '-' }</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl border p-6 space-y-4">
              <h3 className="font-semibold text-lg">Stats</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Creators Wanted</span>
                  <p className="font-medium">{ campaign.number_of_creators_wanted }</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Videos Wanted</span>
                  <p className="font-medium">{ campaign.number_of_videos_wanted }</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Duration</span>
                  <p className="font-medium">{ campaign.video_duration_in_seconds }s</p>
                </div>
              </div>
            </div>
          </div>
        </Activity>

        <Activity mode={ activeTab === 'images' ? 'visible' : 'hidden' }>
          <CampaignImagesView images={ campaign.campaign_images || [] } />
        </Activity>

        <Activity mode={ activeTab === 'documents' ? 'visible' : 'hidden' }>
          <CampaignDocumentsView documents={ campaign.campaign_documents || [] } />
        </Activity>

        <Activity mode={ activeTab === 'applications' ? 'visible' : 'hidden' }>
          <div className='flex items-center justify-center p-12 bg-muted/10 border-2 border-dashed rounded-xl'>
            <p className='text-muted-foreground'>Applications content coming soon</p>
          </div>
        </Activity>

        <Activity mode={ activeTab === 'creators' ? 'visible' : 'hidden' }>
          <CampaignCreatorsSection creators={ campaign.creators || [] } />
        </Activity>

        <Activity mode={ activeTab === 'gigs' ? 'visible' : 'hidden' }>
          <CampaignGigsSection
            campaignId={ campaign.id || '' }
            role={ role === 'admin' ? 'admin' : 'brand' }
          />
        </Activity>
      </div>

      <CampaignDecisionDialog
        open={ decisionDialogOpen }
        onOpenChange={ setDecisionDialogOpen }
        campaignId={ campaign.id || '' }
        initialDecision={ initialDecision }
        onSuccess={ () => router.refresh() }
      />
    </>
  );
}
