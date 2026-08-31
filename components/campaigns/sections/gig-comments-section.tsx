'use client';

import { CommentsThread } from '@/components/dashboard-ui/comments-thread';
import { UtilsEntityType } from '@/lib/api/generated/models/utils-entity-type';

interface GigCommentsSectionProps {
  gigId: string;
  disableComment?: boolean;
}

export function GigCommentsSection( { gigId, disableComment }: GigCommentsSectionProps ) {
  return (
    <CommentsThread
      entities={ [ {
        entityType: UtilsEntityType.EntityTypeGig,
        entityId: gigId,
      } ] }
      disableComment={ disableComment }
    />
  );
}
