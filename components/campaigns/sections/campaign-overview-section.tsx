'use client';

import { Clock3, Sparkles, Users, Video } from 'lucide-react';
import type { ModelCampaign } from '@/components/campaigns/types';
import { InviteCreatorsCard } from '@/components/campaigns/invite-creators-card';
import { StatusBadge } from '@/components/campaigns/status-badge';
import {
  CampaignAssetsCard,
  CampaignBriefCard,
  CampaignMetadataCard,
  CampaignWorkflowCard,
  KpiMetricCard,
} from '@/components/dashboard-ui/campaigns/campaign-overview-cards';

interface CampaignOverviewSectionProps {
  campaign: ModelCampaign;
  onViewAllInvitations?: () => void;
}

function formatDuration( seconds?: number ) {
  if ( !seconds ) return 'N/A';
  if ( seconds < 60 ) return `${ seconds }s`;
  const minutes = Math.floor( seconds / 60 );
  const rem = seconds % 60;
  return rem > 0 ? `${ minutes }m ${ rem }s` : `${ minutes }m`;
}

function parseKeywords( value?: string ) {
  if ( !value ) return [];
  return value
    .split( ',' )
    .map( ( item ) => item.trim() )
    .filter( Boolean );
}

export function CampaignOverviewSection( { campaign, onViewAllInvitations }: CampaignOverviewSectionProps ) {
  const keywordList = parseKeywords( campaign.keywords );
  const imageItems = campaign.campaign_images || [];
  const documentItems = campaign.campaign_documents || [];

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
      <div className="space-y-4 lg:col-span-8 flex flex-col">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <KpiMetricCard label="Status" value="-" icon={ Sparkles }>
            <div className="rounded-md border border-border/60 bg-muted/30 px-2 py-1.5">
              <StatusBadge status={ campaign.campaign_status || 'unknown' } className="scale-100" />
            </div>
          </KpiMetricCard>
          <KpiMetricCard
            label="Creators Wanted"
            value={ campaign.number_of_creators_wanted || 0 }
            icon={ Users }
            progress={ ( campaign.number_of_creators_wanted || 0 ) * 10 }
          />
          <KpiMetricCard
            label="Videos Wanted"
            value={ campaign.number_of_videos_wanted || 0 }
            icon={ Video }
            progress={ ( campaign.number_of_videos_wanted || 0 ) * 10 }
          />
          <KpiMetricCard
            label="Video Duration"
            value={ formatDuration( campaign.video_duration_in_seconds ) }
            icon={ Clock3 }
            progress={ Math.max( 8, Math.round( ( campaign.video_duration_in_seconds || 0 ) / 3 ) ) }
          />
        </div>

        <CampaignBriefCard campaign={ campaign } keywordList={ keywordList } />
      </div>

      <div className="space-y-4 lg:col-span-4">
        <CampaignMetadataCard campaign={ campaign } />
        <CampaignAssetsCard imageItems={ imageItems } documentItems={ documentItems } />
        <CampaignWorkflowCard
          campaignId={ campaign.id || '' }
          onViewAllInvitations={ onViewAllInvitations }
        />
        <InviteCreatorsCard campaignId={ campaign.id || '' } />
      </div>
    </div>
  );
}
