'use client';

import { Clock3, Users, Video } from 'lucide-react';
import type { ModelCampaign } from '@/components/campaigns/types';
import { InviteCreatorsCard } from '@/components/campaigns/invite-creators-card';
import {
  CampaignAssetsCard,
  CampaignBriefCard,
  CampaignMetadataCard,
  CampaignWorkflowCard,
  KpiMetricCard,
} from '@/components/dashboard-ui/campaigns/campaign-overview-cards';
import { useCampaignApplications, useCampaignSubmissions } from '@/lib/api/hooks/campaigns';
import { cn } from '@/lib/utils';
import { Card } from '@/components/dashboard-ui/card';
import { RoleGuard } from '@/components/auth/role-guard';

interface CampaignOverviewSectionProps {
  campaign: ModelCampaign;
  basePath: string;
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

// ── Campaign Progress Bar ──────────────────────────────────────────────────────

interface PipelineStep {
  key: string;
  label: string;
  reached: boolean;
}

// Brand gradient: orange → fuchsia → burgundy → maroon
const STAGE_COLORS = [
  { bg: 'bg-orange-400', chevron: 'text-orange-400' },
  { bg: 'bg-fuchsia-400', chevron: 'text-fuchsia-400' },
  { bg: 'bg-fuchsia-600', chevron: 'text-fuchsia-600' },
  { bg: 'bg-burgundy-700', chevron: 'text-burgundy-700' },
  { bg: 'bg-maroon-700', chevron: 'text-maroon-700' },
] as const;

function CampaignProgressBar( { steps }: { steps: PipelineStep[]; } ) {
  return (
    <Card className="flex w-full overflow-hidden flex-row p-0 gap-0 rounded-md select-none">
      { steps.map( ( step, i ) => {
        const isReached = step.reached;
        const isFirst = i === 0;
        const isLast = i === steps.length - 1;
        const colors = STAGE_COLORS[ i ] ?? STAGE_COLORS[ STAGE_COLORS.length - 1 ];

        return (
          <div
            key={ step.key }
            className={ cn(
              'relative flex flex-1 items-center justify-center px-3 py-2 text-center transition-colors',
              isReached ? colors.bg : 'bg-muted',
              !isFirst && 'border-l border-border/20',
            ) }
          >
            { /* Chevron divider — right edge of each non-last segment */ }
            { !isLast && (
              <svg
                className={ cn(
                  'pointer-events-none absolute -right-[10px] top-0 z-10 h-full w-[10px]',
                  isReached ? colors.chevron : 'text-muted/40',
                ) }
                viewBox="0 0 10 40"
                preserveAspectRatio="none"
                aria-hidden
              >
                <polygon points="0,0 10,20 0,40" fill="currentColor" />
              </svg>
            ) }

            <span className={ cn( 'text-xs hidden sm:inline', isReached ? 'text-white/90' : 'text-muted-foreground' ) }>
              { step.label }
            </span>
          </div>
        );
      } ) }
    </Card>
  );
}

export function CampaignOverviewSection( { campaign, basePath, onViewAllInvitations }: CampaignOverviewSectionProps ) {
  const keywordList = parseKeywords( campaign.keywords );
  const imageItems = campaign.campaign_images || [];
  const documentItems = campaign.campaign_documents || [];

  const { data: applicationsData } = useCampaignApplications( campaign.id || '' );
  const { data: submissionsData } = useCampaignSubmissions( campaign.id || '' );

  const applicationCount = applicationsData?.data?.length ?? 0;
  const submissionCount = submissionsData?.data?.length ?? 0;
  const creatorsWanted = campaign.number_of_creators_wanted || 0;
  const videosWanted = campaign.number_of_videos_wanted || 0;

  // Stage reached logic based on campaign status lifecycle
  const status = campaign.campaign_status ?? '';
  const isApproved = [ 'gigs_approved', 'running', 'completed' ].includes( status );
  const isConfirmed = [ 'running', 'completed' ].includes( status );
  const isSubmitted = submissionCount > 0 || status === 'completed';
  const isCompleted = status === 'completed';

  const pipelineSteps: PipelineStep[] = [
    { key: 'created', label: 'Created', reached: true },
    { key: 'approved', label: 'Approved', reached: isApproved },
    { key: 'confirmed', label: 'Confirmed', reached: isConfirmed },
    { key: 'submitted', label: 'Submitted', reached: isSubmitted },
    { key: 'completed', label: 'Completed', reached: isCompleted },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
      <div className="space-y-4 lg:col-span-8 flex flex-col">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <KpiMetricCard
            label="Creators Wanted"
            value={ `${ applicationCount }/${ creatorsWanted }` }
            icon={ Users }
            progress={ creatorsWanted > 0 ? ( applicationCount / creatorsWanted ) * 100 : 0 }
          />
          <KpiMetricCard
            label="Videos Wanted"
            value={ `${ submissionCount }/${ videosWanted }` }
            icon={ Video }
            progress={ videosWanted > 0 ? ( submissionCount / videosWanted ) * 100 : 0 }
          />
          <KpiMetricCard
            label="Video Duration"
            value={ formatDuration( campaign.video_duration_in_seconds ) }
            icon={ Clock3 }
            progress={ Math.max( 8, Math.round( ( campaign.video_duration_in_seconds || 0 ) / 3 ) ) }
          />
        </div>

        <CampaignProgressBar steps={ pipelineSteps } />

        <CampaignBriefCard campaign={ campaign } keywordList={ keywordList } />
      </div>

      <div className="space-y-4 lg:col-span-4">
        <CampaignMetadataCard campaign={ campaign } />
        <CampaignAssetsCard imageItems={ imageItems } documentItems={ documentItems } />
        <CampaignWorkflowCard
          campaignId={ campaign.id || '' }
          onViewAllInvitations={ onViewAllInvitations }
        />
        <RoleGuard allowedRoles={ [ "brand" ] }>
          { campaign?.number_of_gigs_validated && (
            <InviteCreatorsCard campaignId={ campaign.id || '' } />
          ) }
        </RoleGuard>
      </div>
    </div>
  );
}
