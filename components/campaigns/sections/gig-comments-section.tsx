'use client';

import { CommentsThread } from '@/components/dashboard-ui/comments-thread';
import { UtilsEntityType } from '@/lib/api/generated/models/utils-entity-type';

interface GigCommentsSectionProps {
  gigId: string;
  disableComment?: boolean;
  /** Shown above the thread when `disableComment` is true, explaining why. */
  disabledMessage?: string;
}

export function GigCommentsSection( { gigId, disableComment, disabledMessage }: GigCommentsSectionProps ) {
  return (
    <div className="flex flex-col flex-1 min-h-0 gap-2">
      { disableComment && disabledMessage && (
        <p className="text-xs text-muted-foreground italic px-1">{ disabledMessage }</p>
      ) }
      <CommentsThread
        entities={ [ {
          entityType: UtilsEntityType.EntityTypeGig,
          entityId: gigId,
        } ] }
        disableComment={ disableComment }
        className="flex-1"
      />
    </div>
  );
}
