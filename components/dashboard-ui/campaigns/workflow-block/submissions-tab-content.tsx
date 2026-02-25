'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/dashboard-ui/button';
import { ScrollArea } from '@/components/dashboard-ui/scroll-area';
import { SubmissionCard } from '@/components/campaigns/submission-card';
import { useCampaignSubmissions } from '@/lib/api/hooks/campaigns';
import type { ModelsVideoSubmissionResponse } from '@/lib/api/generated/models';
import { WorkflowSubmissionsSkeleton } from './skeletons';

interface SubmissionsTabContentProps {
  campaignId: string;
  isActive: boolean;
}

export function SubmissionsTabContent( { campaignId, isActive }: SubmissionsTabContentProps ) {
  const t = useTranslations( 'dashboard.admin.campaignOverview.workflow' );
  const {
    data: submissionsData,
    isLoading,
    isError,
    refetch,
  } = useCampaignSubmissions( campaignId, { enabled: isActive && !!campaignId } );

  const recentSubmissions = useMemo<ModelsVideoSubmissionResponse[]>( () => {
    const submissions = submissionsData?.data || [];
    return [ ...submissions ]
      .sort( ( a, b ) => {
        const aTime = a.created_at ? new Date( a.created_at ).getTime() : 0;
        const bTime = b.created_at ? new Date( b.created_at ).getTime() : 0;
        return bTime - aTime;
      } )
      .slice( 0, 3 );
  }, [ submissionsData?.data ] );

  if ( isLoading ) return <WorkflowSubmissionsSkeleton />;

  if ( isError ) {
    return (
      <div className="space-y-2">
        <p className="text-sm text-destructive">{ t( 'states.submissionsError' ) }</p>
        <Button size="sm" variant="outline" className="font-normal" onClick={ () => refetch() }>
          { t( 'actions.retry' ) }
        </Button>
      </div>
    );
  }

  if ( recentSubmissions.length === 0 ) {
    return <p className="text-sm text-muted-foreground">{ t( 'states.noSubmissions' ) }</p>;
  }

  return (
    <ScrollArea className="w-full overflow-hidden pb-2" scrollbar={ { orientation: 'horizontal', style: { height: '6px', opacity: 0.5 } } }>
      <div className="flex w-max gap-2 p-0.5">
        { recentSubmissions.map( ( submission ) => (
          <div
            key={ submission.id || `${ submission.title || 'submission' }-${ submission.created_at }` }
            className="w-[180px] shrink-0"
          >
            <SubmissionCard submission={ submission } layout="mini" showActions={ false } />
          </div>
        ) ) }
      </div>
    </ScrollArea>
  );
}
