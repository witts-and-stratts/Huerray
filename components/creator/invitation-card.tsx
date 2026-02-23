"use client";

import { Cancel01Icon, CheckmarkCircle01Icon, Clock01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

import { CreatorInfoBlock } from '@/components/admin/creators/creator-info-block';
import { Card, CardFooter } from '@/components/dashboard-ui/card';
import { cn } from '@/lib/dashboard-utils';
import { ModelsCreatorResponse, ModelsGigInvitationResponse } from '@/lib/api/generated/models';
import { CircleIcon } from 'lucide-react';
import { InvitationActionMenu } from './invitation-action-menu';
import { TextCapitalize } from '../text-case';

const invitationStatusConfig: Record<string, { label: string; color: string; icon: any; }> = {
  pending: {
    label: 'Pending',
    color: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
    icon: Clock01Icon,
  },
  accepted: {
    label: 'Accepted',
    color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
    icon: CheckmarkCircle01Icon,
  },
  declined: {
    label: 'Declined',
    color: 'bg-red-500/10 text-red-600 border-red-500/20',
    icon: Cancel01Icon,
  },
};

function InvitationStatusBadge( { status, className }: { status?: string; className?: string; } ) {
  const config = invitationStatusConfig[ status?.toLowerCase() || '' ] || {
    label: status || 'Unknown',
    color: 'bg-gray-500/10 text-gray-600 border-gray-500/20',
    icon: CircleIcon,
  };

  return (
    <div className={ cn(
      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border whitespace-nowrap",
      config.color,
      className
    ) }>
      <HugeiconsIcon icon={ config.icon } className="w-3 h-3" />
      <TextCapitalize>{ config.label }</TextCapitalize>
    </div>
  );
}

interface InvitationCardProps {
  invitation: ModelsGigInvitationResponse;
  onViewDetails: ( invitation: ModelsGigInvitationResponse ) => void;
}

function getInvitationCreator( invitation: ModelsGigInvitationResponse ): ModelsCreatorResponse {
  const creator = invitation.creator;
  if ( creator ) {
    return creator as ModelsCreatorResponse;
  }

  return {
    first_name: '',
    last_name: '',
    email: 'Unknown Creator',
    creator_id: invitation.creator_id,
  } as ModelsCreatorResponse;
}

export function InvitationCard( { invitation, onViewDetails }: InvitationCardProps ) {
  const creator = getInvitationCreator( invitation );

  return (
    <Card className='py-0 gap-1 min-h-[180px]'>
      <div className='flex flex-col gap-4 justify-between h-full'>
        <div className="flex items-start justify-between gap-4 p-4 pb-0">
          <CreatorInfoBlock
            creator={ creator }
            className="flex-1 min-w-0"
            onViewDetails={ () => onViewDetails( invitation ) }
            showActions={ false }
          />
          <div className="shrink-0 -mr-2 -mt-1">
            <InvitationActionMenu invitation={ invitation } onViewDetails={ onViewDetails } />
          </div>
        </div>

        <CardFooter className="py-4 pt-3! bg-muted/30 border-t gap-3">
          <InvitationStatusBadge status={ invitation.status } />
        </CardFooter>
      </div>
    </Card>
  );
}
