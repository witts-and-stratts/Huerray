'use client';

import { useMemo, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { ScrollArea } from '@/components/dashboard-ui/scroll-area';
import { Tabs, TabsList, TabsTab, TabsPanel, TabsPanels } from '@/components/animate-ui/components/base/tabs';
import { CampaignCard } from '@/components/campaigns/campaign-card';
import { StatsBarChart } from '@/components/dashboard/blocks/shared/stats-bar-chart';
import type { ModelsCampaignResponse } from '@/lib/api/generated/models';
import { useTranslations } from 'next-intl';

interface BrandRecentCampaignsBlockProps {
  campaigns: ModelsCampaignResponse[];
}

export function BrandRecentCampaignsBlock( { campaigns }: BrandRecentCampaignsBlockProps ) {
  const t = useTranslations( 'dashboard.brand.landing.recentCampaigns' );
  const [ activeTab, setActiveTab ] = useState<'recent' | 'stats'>( 'recent' );

  const recentCampaigns = useMemo( () => {
    return [ ...campaigns ]
      .sort( ( a, b ) => {
        const aTime = new Date( a.updated_at || a.created_at || 0 ).getTime();
        const bTime = new Date( b.updated_at || b.created_at || 0 ).getTime();
        return bTime - aTime;
      } )
      .slice( 0, 12 );
  }, [ campaigns ] );

  const stats = useMemo( () => {
    const total = campaigns.length;
    const active = campaigns.filter( ( campaign ) => {
      const status = String( campaign.campaign_status || '' ).toLowerCase();
      return [ 'active', 'in_progress', 'ongoing', 'open', 'running' ].includes( status );
    } ).length;
    const finished = campaigns.filter( ( campaign ) => {
      const status = String( campaign.campaign_status || '' ).toLowerCase();
      return [ 'completed', 'finished', 'closed' ].includes( status );
    } ).length;
    const draft = campaigns.filter( ( campaign ) => {
      const status = String( campaign.campaign_status || '' ).toLowerCase();
      return [ 'draft', 'pending', 'pending_approval' ].includes( status );
    } ).length;

    return [
      { label: t( 'stats.total' ), value: total },
      { label: t( 'stats.active' ), value: active },
      { label: t( 'stats.finished' ), value: finished },
      { label: t( 'stats.draft' ), value: draft },
    ];
  }, [ campaigns, t ] );

  return (
    <Card className="ad-summary-card flex flex-col bg-burgundy-50">
      <CardHeader className="pb-2">
        <CardTitle className="ad-card-title">{ t( 'title' ) }</CardTitle>
        <CardDescription className="ad-card-description">{ t( 'description' ) }</CardDescription>
      </CardHeader>
      <CardContent className="flex min-h-0 flex-1 flex-col">
        <Tabs value={ activeTab } onValueChange={ ( value ) => setActiveTab( value as 'recent' | 'stats' ) }>
          <TabsList variant="default" className="mb-2 w-full bg-primary/5">
            <TabsTab value="recent" className="text-xs font-normal">{ t( 'tabs.recent' ) }</TabsTab>
            <TabsTab value="stats" className="text-xs font-normal">{ t( 'tabs.stats' ) }</TabsTab>
          </TabsList>

          <TabsPanels>
            <TabsPanel value="recent" keepMounted>
              { recentCampaigns.length === 0 ? (
                <p className="py-8 text-center text-xs text-muted-foreground">{ t( 'emptyState' ) }</p>
              ) : (
                <ScrollArea
                  className="w-full p-1 pb-3"
                  scrollbar={ { orientation: 'horizontal', style: { height: '6px', opacity: 0.5 } } }
                >
                  <div className="flex gap-3">
                    { recentCampaigns.map( ( campaign ) => (
                      <div
                        key={ campaign.id || campaign.campaign_id || campaign.campaign_name }
                        className="w-80 shrink-0 m-px"
                      >
                        <CampaignCard campaign={ campaign } />
                      </div>
                    ) ) }
                  </div>
                </ScrollArea>
              ) }
            </TabsPanel>

            <TabsPanel value="stats" keepMounted>
              <StatsBarChart chartData={ stats } dataLabel={ t( 'title' ) } color="var(--chart-1)" />
            </TabsPanel>
          </TabsPanels>
        </Tabs>
      </CardContent>
    </Card>
  );
}
