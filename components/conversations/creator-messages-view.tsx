'use client';

import { useMemo, useState } from 'react';
import { ArrowLeft, Loader2 } from 'lucide-react';

import { Button } from '@/components/dashboard-ui/button';
import { ScrollArea } from '@/components/dashboard-ui/scroll-area';
import { ConversationRow } from '@/components/conversations/conversation-row';
import { ConversationThread } from '@/components/conversations/conversation-thread';
import { ParticipantAvatars } from '@/components/conversations/conversation-participants';
import { useAuth } from '@/lib/auth/auth-context';
import { useConversation, useConversations } from '@/lib/api/hooks/conversations';
import { UtilsEntityType } from '@/lib/api/generated/models/utils-entity-type';
import { cn } from '@/lib/dashboard-utils';

interface CreatorMessagesViewProps {
  /** The creator PROFILE id (ModelsCreatorResponse.id), not the user id. */
  creatorId: string;
}

/**
 * The creator's message threads — one per brand that has messaged them
 * (plus a shared/admin thread), since a creator can hear from more than
 * one brand at once. Unlike the single-thread panel used on the brand's
 * side (a brand only ever has one thread with a given creator), the
 * creator needs a real list-then-thread view.
 */
export function CreatorMessagesView( { creatorId }: CreatorMessagesViewProps ) {
  const { user } = useAuth();
  const [ selectedId, setSelectedId ] = useState<string | null>( null );

  const { data, isLoading } = useConversations( {
    entityType: UtilsEntityType.EntityTypeCreator,
    entityId: creatorId,
    limit: 50,
  } );

  const conversations = useMemo( () => data?.data ?? [], [ data ] );

  const { data: selectedConversationData } = useConversation( selectedId ?? '', { enabled: !!selectedId } );
  const selectedConversation = selectedConversationData?.data;

  return (
    <div className="flex flex-1 min-h-0 overflow-hidden border rounded-xl bg-background/70">
      {/* Left panel — thread list */ }
      <div className={ cn(
        'flex-col w-full md:w-80 shrink-0 border-r border-border/60 overflow-hidden',
        selectedId ? 'hidden md:flex' : 'flex'
      ) }>
        <div className="px-3 pt-3 pb-2 shrink-0">
          <h2 className="text-sm font-medium">Messages</h2>
        </div>

        <div className="flex-1 relative overflow-hidden">
          { isLoading ? (
            <div className="flex justify-center items-center p-12">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <ScrollArea className="h-full" scrollbar={ { className: 'w-3 p-1' } }>
              { conversations.length === 0 ? (
                <div className="px-6 py-8 text-center text-sm text-muted-foreground">No conversations yet</div>
              ) : (
                conversations.map( ( conversation ) => (
                  <ConversationRow
                    key={ conversation.id }
                    conversation={ conversation }
                    isSelected={ selectedId === conversation.id }
                    currentUserId={ user?.id }
                    onClick={ () => setSelectedId( conversation.id ?? null ) }
                  />
                ) )
              ) }
            </ScrollArea>
          ) }
        </div>
      </div>

      {/* Right panel — thread */ }
      <div className={ cn(
        'flex-col flex-1 overflow-hidden bg-background w-full',
        selectedId ? 'flex' : 'hidden md:flex'
      ) }>
        { !selectedConversation ? (
          <div className="flex-1 flex items-center justify-center text-sm text-muted-foreground">
            Select a conversation to view messages
          </div>
        ) : (
          <div className="flex flex-col flex-1 min-h-0 p-4 gap-3">
            <div className="flex items-center gap-2 shrink-0">
              <Button
                variant="ghost"
                size="icon-sm"
                className="md:hidden shrink-0"
                onClick={ () => setSelectedId( null ) }
                aria-label="Back to conversations"
              >
                <ArrowLeft className="size-4" />
              </Button>
              <ParticipantAvatars participants={ selectedConversation.participants ?? [] } size="default" />
            </div>
            <ConversationThread conversationId={ selectedConversation.id ?? '' } className="flex-1" />
          </div>
        ) }
      </div>
    </div>
  );
}
