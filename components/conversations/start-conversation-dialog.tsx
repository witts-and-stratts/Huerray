'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/dashboard-ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/dashboard-ui/dialog';
import { CommentsThread } from '@/components/dashboard-ui/comments-thread';
import type { UtilsEntityType } from '@/lib/api/generated/models/utils-entity-type';

export interface StartConversationDialogProps {
  entityType: UtilsEntityType;
  entityId: string | undefined;
  /** Display name of the person/entity being messaged. */
  name: string;
  /** Optional avatar image URL (already resolved, e.g. via imgpresets). */
  avatarUrl?: string;
  open: boolean;
  onOpenChange: ( open: boolean ) => void;
  onSent?: ( conversationId: string | undefined ) => void;
}

/**
 * The conversation with any entity ref (creator, brand, ...) — shows the
 * full history so far and lets you continue it, backed by the same
 * entity-scoped Conversations API as gig/campaign/submission comments
 * (see CommentsThread). The first message sent here resolves-or-creates
 * the conversation, so this same component naturally covers both
 * "starting" a new conversation and "continuing" an existing one — reopen
 * it later and the prior messages are right there.
 */
export function StartConversationDialog( {
  entityType,
  entityId,
  name,
  avatarUrl,
  open,
  onOpenChange,
  onSent,
}: StartConversationDialogProps ) {
  return (
    <Dialog open={ open } onOpenChange={ onOpenChange }>
      <DialogContent className="max-w-[440px] h-[540px] flex flex-col gap-0 p-0 overflow-hidden">
        <DialogHeader className="p-4 pb-3 border-b shrink-0">
          <div className="flex items-center gap-3">
            <Avatar className="size-10">
              { avatarUrl && <AvatarImage src={ avatarUrl } alt={ name } /> }
              <AvatarFallback>{ name.slice( 0, 2 ).toUpperCase() }</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <DialogTitle className="dialog__title truncate">{ name }</DialogTitle>
              <DialogDescription className="font-regular">Conversation</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 min-h-0 p-3">
          { entityId && (
            <CommentsThread
              entities={ [ { entityType, entityId } ] }
              size="sm"
              className="border-0 bg-transparent"
              onSent={ ( message ) => onSent?.( message.conversation_id ) }
            />
          ) }
        </div>
      </DialogContent>
    </Dialog>
  );
}
