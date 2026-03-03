'use client';

import { CommentsThread } from '@/components/dashboard-ui/comments-thread';
import { UtilsEntityType } from '@/lib/api/generated/models/utils-entity-type';

interface CampaignCommentsSectionProps {
  campaignId: string;
  disableComment?: boolean;
}

export function CampaignCommentsSection( { campaignId, disableComment }: CampaignCommentsSectionProps ) {
  return (
    <CommentsThread
      entityType={ UtilsEntityType.EntityTypeCampaign }
      entityId={ campaignId }
      disableComment={ disableComment }
    />
  );
}
