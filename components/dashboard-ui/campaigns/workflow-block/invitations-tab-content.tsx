'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/dashboard-ui/avatar';
import { Button } from '@/components/dashboard-ui/button';
import { ScrollArea } from '@/components/dashboard-ui/scroll-area';
import { useCampaignInvitations } from '@/lib/api/hooks/campaigns';
import type { ModelsGigInvitationResponse } from '@/lib/api/generated/models';
import { getCountryDisplay } from '../campaign-overview-utils';
import { InvitationStatusBadge } from './status-badges';
import { WorkflowListSkeleton } from './skeletons';

interface InvitationsTabContentProps {
  campaignId: string;
  isActive: boolean;
  onViewAllInvitations?: () => void;
}

export function InvitationsTabContent( { campaignId, isActive, onViewAllInvitations }: InvitationsTabContentProps ) {
  const t = useTranslations( 'dashboard.admin.campaignOverview.workflow' );
  const {
    data: invitationsData,
    isLoading,
    isError,
    refetch,
  } = useCampaignInvitations( campaignId, { enabled: isActive && !!campaignId } );

  const recentInvitations = useMemo<ModelsGigInvitationResponse[]>( () => {
    const invitations = ( invitationsData?.data || [] ) as ModelsGigInvitationResponse[];
    return [ ...invitations ]
      .sort( ( a, b ) => {
        const aTime = a.invited_at ? new Date( a.invited_at ).getTime() : 0;
        const bTime = b.invited_at ? new Date( b.invited_at ).getTime() : 0;
        return bTime - aTime;
      } )
      .slice( 0, 3 );
  }, [ invitationsData?.data ] );

  if ( isLoading ) return <WorkflowListSkeleton />;

  if ( isError ) {
    return (
      <div className="space-y-2">
        <p className="text-sm text-destructive">{ t( 'states.invitationsError' ) }</p>
        <Button size="sm" variant="outline" className="font-normal" onClick={ () => refetch() }>
          { t( 'actions.retry' ) }
        </Button>
      </div>
    );
  }

  if ( recentInvitations.length === 0 ) {
    return <p className="text-sm text-muted-foreground">{ t( 'states.noInvitations' ) }</p>;
  }

  return (
    <>
      <ScrollArea className="h-[220px] pr-2" scrollbar={ { style: { width: '6px', opacity: 0.5 } } }>
        <div className="space-y-1.5">
          { recentInvitations.map( ( invitation, index ) => (
            <div
              key={ invitation.id || `${ invitation.creator_id || 'invitation' }-${ index }` }
              className="rounded-md border border-border/60 bg-white p-2"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex min-w-0 items-center gap-2">
                  <Avatar className="size-8 shrink-0">
                    <AvatarImage src={ invitation.creator?.profile_image_url || '' } alt={ invitation.creator?.first_name || 'Creator' } />
                    <AvatarFallback>
                      { ( invitation.creator?.first_name?.[ 0 ] || 'C' ).toUpperCase() }
                      { ( invitation.creator?.last_name?.[ 0 ] || '' ).toUpperCase() }
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-medium text-foreground/90">
                      { `${ invitation.creator?.first_name || '' } ${ invitation.creator?.last_name || '' }`.trim() || invitation.creator?.email || t( 'labels.creator' ) }
                    </p>
                    <p className="truncate text-[11px] text-muted-foreground">
                      { invitation.gig?.title || t( 'labels.campaignInvitation' ) }
                    </p>
                  </div>
                </div>
                <InvitationStatusBadge status={ invitation.status } />
              </div>

              <div className="mt-2 flex items-center gap-2 text-[11px] text-muted-foreground">
                <span className="rounded-sm border border-border/60 bg-muted/30 px-1.5 py-0.5">
                  { getCountryDisplay( invitation.creator?.country ) }
                </span>
                <span className="rounded-sm border border-border/60 bg-muted/30 px-1.5 py-0.5 capitalize">
                  { invitation.creator?.gender || t( 'labels.na' ) }
                </span>
              </div>
            </div>
          ) ) }
        </div>
      </ScrollArea>
      <Button
        size="sm"
        variant="outline"
        className="w-full font-normal"
        onClick={ onViewAllInvitations }
      >
        { t( 'actions.viewAllInvitations' ) }
      </Button>
    </>
  );
}
