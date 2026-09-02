'use client';

import { Avatar, AvatarFallback } from '@/components/dashboard-ui/avatar';
import { Badge } from '@/components/dashboard-ui/badge';
import type { ModelsConversationResponse } from '@/lib/api/generated/models';
import { useTimeAgo } from '@/lib/hooks/format';
import { cn } from '@/lib/dashboard-utils';

interface ConversationRowProps {
  conversation: ModelsConversationResponse;
  isSelected: boolean;
  currentUserId?: string;
  onClick: () => void;
}

export function ConversationRow( { conversation, isSelected, currentUserId, onClick }: ConversationRowProps ) {
  const formatTimeAgo = useTimeAgo();
  const others = ( conversation.participants ?? [] ).filter( ( p ) => p.user_id !== currentUserId );
  const displayParticipants = others.length > 0 ? others : ( conversation.participants ?? [] );

  const title = displayParticipants
    .map( ( p ) => `${ p.user?.first_name || '' } ${ p.user?.last_name || '' }`.trim() || p.user?.email || p.user?.username || 'Unknown' )
    .join( ', ' ) || 'Conversation';

  const initials = title.slice( 0, 2 ).toUpperCase();
  const preview = conversation.last_message?.message;

  return (
    <button
      type="button"
      onClick={ onClick }
      className={ cn(
        'w-full flex items-start gap-3 px-3 py-2.5 text-left border-b border-border/40 transition-colors hover:bg-muted/40',
        isSelected && 'bg-muted/60'
      ) }
    >
      <Avatar className="size-9 shrink-0">
        <AvatarFallback className="text-xs">{ initials }</AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-medium truncate">{ title }</p>
          { conversation.updated_at && (
            <span className="text-[10px] text-muted-foreground shrink-0">{ formatTimeAgo( conversation.updated_at ) }</span>
          ) }
        </div>
        <div className="flex items-center justify-between gap-2 mt-0.5">
          <p className="text-xs text-muted-foreground truncate">{ preview || 'No messages yet' }</p>
          { conversation.entity_type && (
            <Badge variant="outline" className="h-4 px-1.5 text-[9px] font-normal capitalize shrink-0">
              { conversation.entity_type.replace( /_/g, ' ' ) }
            </Badge>
          ) }
        </div>
      </div>
    </button>
  );
}
