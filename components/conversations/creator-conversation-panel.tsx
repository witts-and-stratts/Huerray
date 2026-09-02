'use client';

import { CommentsThread } from '@/components/dashboard-ui/comments-thread';
import { UtilsEntityType } from '@/lib/api/generated/models/utils-entity-type';

interface CreatorConversationPanelProps {
  /** The creator PROFILE id (ModelsCreatorResponse.id) this conversation belongs to. */
  creatorId: string;
  className?: string;
  size?: 'default' | 'sm';
  disableComment?: boolean;
  /** Shown above the thread when `disableComment` is true, explaining why. */
  disabledMessage?: string;
}

/**
 * The ongoing conversation with a specific creator — reusable wherever
 * that relationship is already being viewed (a brand/admin looking at the
 * creator's profile, or the creator looking at their own). Backed by the
 * same entity-scoped Conversations API as gig/campaign/submission
 * comments (see CommentsThread), just pointed at the `creator` entity
 * instead — one persistent thread per creator, not a one-shot message.
 */
export function CreatorConversationPanel( { creatorId, className, size, disableComment, disabledMessage }: CreatorConversationPanelProps ) {
  return (
    <div className="flex flex-col flex-1 min-h-0 gap-2">
      { disableComment && disabledMessage && (
        <p className="text-xs text-muted-foreground italic px-1">{ disabledMessage }</p>
      ) }
      <CommentsThread
        entities={ [ { entityType: UtilsEntityType.EntityTypeCreator, entityId: creatorId } ] }
        className={ className }
        size={ size }
        disableComment={ disableComment }
      />
    </div>
  );
}
