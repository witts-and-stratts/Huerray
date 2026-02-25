'use client';

import { SubHeader, SubHeaderTabs } from '@/components/subheader';
import React, { useState } from 'react';
import { ModelCampaign } from './types';
import { Button } from '@/components/dashboard-ui/button';
import { ButtonGroup } from '@/components/dashboard-ui/button-group';
import { CampaignActionMenu } from './campaign-action-menu';
import { ChevronDown } from 'lucide-react';
import { CampaignSubmissionsSection } from './sections/campaign-submissions-section';
import { CampaignInvitationsSection } from './sections/campaign-invitations-section';
import { CampaignGigsSection } from './sections/campaign-gigs-section';
import { CampaignImagesView } from './sections/campaign-images-view';
import { CampaignDocumentsView } from './sections/campaign-documents-view';
import { CampaignApplicationsSection } from './sections/campaign-applications-section';
import { useRole } from '@/contexts/role-context';
import { StatusBadge } from './status-badge';
import { CampaignOverviewSection } from './sections/campaign-overview-section';

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
  const role = useRole();

  const tabItems = [
    { value: 'overview', label: 'Overview' },
    { value: 'images', label: 'Images' },
    { value: 'documents', label: 'Documents' },
    { value: 'applications', label: 'Applications' },
    { value: 'submissions', label: 'Submissions' },
    { value: 'invitations', label: 'Invitations' },
    { value: 'gigs', label: 'Gigs' },
  ];

  return (
    <>
      <SubHeader
        title={ campaign.campaign_name! }
        description={ campaign.description! }
        status={
          <StatusBadge status={ campaign.campaign_status! } />
        }
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
          <CampaignActionMenu
            campaign={ campaign }
            basePath={ basePath }
            hideViewDetails={ true }
            trigger={
              <Button variant='outline' className='px-2 font-regular' size='sm'>
                <ChevronDown className='size-4' />
              </Button>
            }
          />
        </ButtonGroup>
      </SubHeader>
      <div className='p-6 space-y-6 bg-slate-50/30 h-full'>
        <Activity mode={ activeTab === 'overview' ? 'visible' : 'hidden' }>
          <CampaignOverviewSection
            campaign={ campaign }
            onViewAllInvitations={ () => setActiveTab( 'invitations' ) }
          />
        </Activity>

        <Activity mode={ activeTab === 'images' ? 'visible' : 'hidden' }>
          <CampaignImagesView images={ campaign.campaign_images || [] } />
        </Activity>

        <Activity mode={ activeTab === 'documents' ? 'visible' : 'hidden' }>
          <CampaignDocumentsView documents={ campaign.campaign_documents || [] } />
        </Activity>

        <Activity mode={ activeTab === 'applications' ? 'visible' : 'hidden' }>
          <CampaignApplicationsSection campaignId={ campaign.id || '' } />
        </Activity>

        <Activity mode={ activeTab === 'submissions' ? 'visible' : 'hidden' }>
          <CampaignSubmissionsSection campaignId={ campaign.id || '' } />
        </Activity>

        <Activity mode={ activeTab === 'invitations' ? 'visible' : 'hidden' }>
          <CampaignInvitationsSection campaignId={ campaign.id || '' } />
        </Activity>

        <Activity mode={ activeTab === 'gigs' ? 'visible' : 'hidden' }>
          <CampaignGigsSection
            campaignId={ campaign.id || '' }
            role={ role === 'admin' ? 'admin' : 'brand' }
          />
        </Activity>
      </div>


    </>
  );
}
