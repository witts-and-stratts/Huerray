'use client';

import { Tabs, TabsList, TabsPanel, TabsPanels, TabsTab } from '@/components/animate-ui/components/base/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { useTranslations } from 'next-intl';
import { ApplicationsTabContent } from './workflow-block/applications-tab-content';
import { InvitationsTabContent } from './workflow-block/invitations-tab-content';
import { SubmissionsTabContent } from './workflow-block/submissions-tab-content';
import { useState } from 'react';

interface CampaignWorkflowCardProps {
  campaignId: string;
  onViewAllInvitations?: () => void;
}

export function CampaignWorkflowCard( { campaignId, onViewAllInvitations }: CampaignWorkflowCardProps ) {
  const t = useTranslations( 'dashboard.admin.campaignOverview.workflow' );
  const [ activeTab, setActiveTab ] = useState<string>( 'submissions' );

  return (
    <Card className="ad-summary-card">
      <CardHeader className="pb-2">
        <CardTitle className="ad-card-title">{ t( 'title' ) }</CardTitle>
        <CardDescription className="ad-card-description">{ t( 'description' ) }</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="submissions" onValueChange={ setActiveTab }>
          <TabsList className="w-full" variant="default">
            <TabsTab value="submissions" className="text-xs font-normal">{ t( 'tabs.submissions' ) }</TabsTab>
            <TabsTab value="applications" className="text-xs font-normal">{ t( 'tabs.applications' ) }</TabsTab>
            <TabsTab value="invitations" className="text-xs font-normal">{ t( 'tabs.invitations' ) }</TabsTab>
          </TabsList>
          <TabsPanels>
            <TabsPanel value="submissions" keepMounted>
              <SubmissionsTabContent campaignId={ campaignId } isActive={ true } />
            </TabsPanel>
            <TabsPanel value="applications" keepMounted>
              <ApplicationsTabContent campaignId={ campaignId } isActive={ true } />
            </TabsPanel>
            <TabsPanel value="invitations" keepMounted>
              <InvitationsTabContent
                campaignId={ campaignId }
                isActive={ true }
                onViewAllInvitations={ onViewAllInvitations }
              />
            </TabsPanel>
          </TabsPanels>
        </Tabs>
      </CardContent>
    </Card>
  );
}
