'use client';

import { Activity, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/dashboard-ui/tabs';
import { ApplicationsTabContent } from './workflow-block/applications-tab-content';
import { InvitationsTabContent } from './workflow-block/invitations-tab-content';
import { SubmissionsTabContent } from './workflow-block/submissions-tab-content';

interface CampaignWorkflowCardProps {
  campaignId: string;
  onViewAllInvitations?: () => void;
}

export function CampaignWorkflowCard( { campaignId, onViewAllInvitations }: CampaignWorkflowCardProps ) {
  const [ activeTab, setActiveTab ] = useState<'submissions' | 'applications' | 'invitations'>( 'submissions' );
  const t = useTranslations( 'dashboard.admin.campaignOverview.workflow' );

  return (
    <Card className="ad-summary-card">
      <CardHeader className="pb-2">
        <CardTitle className="ad-card-title">{ t( 'title' ) }</CardTitle>
        <CardDescription className="ad-card-description">{ t( 'description' ) }</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Tabs value={ activeTab } onValueChange={ ( value ) => setActiveTab( value as 'submissions' | 'applications' | 'invitations' ) }>
          <TabsList variant="default" className="w-full">
            <TabsTrigger value="submissions" className="text-xs font-normal">{ t( 'tabs.submissions' ) }</TabsTrigger>
            <TabsTrigger value="applications" className="text-xs font-normal">{ t( 'tabs.applications' ) }</TabsTrigger>
            <TabsTrigger value="invitations" className="text-xs font-normal">{ t( 'tabs.invitations' ) }</TabsTrigger>
          </TabsList>
        </Tabs>

        <Activity mode={ activeTab === 'submissions' ? 'visible' : 'hidden' }>
          <SubmissionsTabContent
            campaignId={ campaignId }
            isActive={ activeTab === 'submissions' }
          />
        </Activity>

        <Activity mode={ activeTab === 'applications' ? 'visible' : 'hidden' }>
          <ApplicationsTabContent
            campaignId={ campaignId }
            isActive={ activeTab === 'applications' }
          />
        </Activity>

        <Activity mode={ activeTab === 'invitations' ? 'visible' : 'hidden' }>
          <InvitationsTabContent
            campaignId={ campaignId }
            isActive={ activeTab === 'invitations' }
            onViewAllInvitations={ onViewAllInvitations }
          />
        </Activity>
      </CardContent>
    </Card>
  );
}
