'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/dashboard-ui/avatar';
import { Button } from '@/components/dashboard-ui/button';
import { useCampaignApplications } from '@/lib/api/hooks/campaigns';
import type { ModelsGigApplicationResponse } from '@/lib/api/generated/models';
import { getCountryDisplay } from '../campaign-overview-utils';
import { ApplicationStatusBadge } from './status-badges';
import { WorkflowListSkeleton } from './skeletons';

interface ApplicationsTabContentProps {
  campaignId: string;
  isActive: boolean;
}

export function ApplicationsTabContent( { campaignId, isActive }: ApplicationsTabContentProps ) {
  const t = useTranslations( 'dashboard.admin.campaignOverview.workflow' );
  const {
    data: applicationsData,
    isLoading,
    isError,
    refetch,
  } = useCampaignApplications( campaignId, { enabled: isActive && !!campaignId } );

  const recentApplications = useMemo<ModelsGigApplicationResponse[]>( () => {
    const applications = ( applicationsData?.data || [] ) as ModelsGigApplicationResponse[];
    return [ ...applications ]
      .sort( ( a, b ) => {
        const aTime = a.applied_at ? new Date( a.applied_at ).getTime() : 0;
        const bTime = b.applied_at ? new Date( b.applied_at ).getTime() : 0;
        return bTime - aTime;
      } )
      .slice( 0, 3 );
  }, [ applicationsData?.data ] );

  if ( isLoading ) return <WorkflowListSkeleton />;

  if ( isError ) {
    return (
      <div className="space-y-2">
        <p className="text-sm text-destructive">{ t( 'states.applicationsError' ) }</p>
        <Button size="sm" variant="outline" className="font-normal" onClick={ () => refetch() }>
          { t( 'actions.retry' ) }
        </Button>
      </div>
    );
  }

  if ( recentApplications.length === 0 ) {
    return <p className="text-sm text-muted-foreground">{ t( 'states.noApplications' ) }</p>;
  }

  return (
    <div className="space-y-1.5">
      { recentApplications.map( ( application, index ) => (
        <div
          key={ application.id || `${ application.creator_id || 'application' }-${ index }` }
          className="rounded-md border border-border/60 bg-white p-2"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex min-w-0 items-center gap-2">
              <Avatar className="size-8 shrink-0">
                <AvatarImage src={ application.creator?.profile_image_url || '' } alt={ application.creator?.first_name || 'Applicant' } />
                <AvatarFallback>
                  { ( application.creator?.first_name?.[ 0 ] || 'A' ).toUpperCase() }
                  { ( application.creator?.last_name?.[ 0 ] || '' ).toUpperCase() }
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="truncate text-xs font-medium text-foreground/90">
                  { `${ application.creator?.first_name || '' } ${ application.creator?.last_name || '' }`.trim()
                    || application.creator?.email
                    || t( 'labels.unknownApplicant' ) }
                </p>
                <p className="truncate text-[11px] text-muted-foreground">
                  { application.gig?.title || t( 'labels.campaignApplication' ) }
                </p>
              </div>
            </div>
            <ApplicationStatusBadge status={ application.status } />
          </div>

          <div className="mt-2 flex items-center gap-2 text-[11px] text-muted-foreground">
            <span className="rounded-sm border border-border/60 bg-muted/30 px-1.5 py-0.5">
              { getCountryDisplay( application.creator?.country ) }
            </span>
            <span className="rounded-sm border border-border/60 bg-muted/30 px-1.5 py-0.5 capitalize">
              { application.creator?.gender || t( 'labels.na' ) }
            </span>
          </div>
        </div>
      ) ) }
    </div>
  );
}
