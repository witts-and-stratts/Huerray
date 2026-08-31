'use client';

import { KeyboardEvent, memo, useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'sonner';
import { AnimatePresence, motion } from 'motion/react';
import { Check, Loader2, MoreVertical, RefreshCw, Send, Trash2, X } from 'lucide-react';

import { Avatar, AvatarFallback } from '@/components/dashboard-ui/avatar';
import { Button } from '@/components/dashboard-ui/button';
import { ConfirmDialog } from '@/components/dashboard-ui/confirm-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/dashboard-ui/dropdown-menu';
import { ScrollArea } from '@/components/dashboard-ui/scroll-area';
import { SuperField } from '@/components/dashboard-ui/super-field';
import { useAuth } from '@/lib/auth/auth-context';
import type { ModelsConversationMessageResponse } from '@/lib/api/generated/models';
import { useConversationMessages, useDeleteMessage, useEditMessage, useSendMessage } from '@/lib/api/hooks/conversations';
import { useTimeAgo } from '@/lib/hooks/format';
import { cn } from '@/lib/dashboard-utils';

export interface ConversationThreadProps {
  conversationId: string;
  size?: 'default' | 'sm';
  className?: string;
}

function getInitials( firstName?: string, lastName?: string ) {
  return `${ firstName?.[ 0 ] ?? '' }${ lastName?.[ 0 ] ?? '' }`.toUpperCase() || '?';
}

type MessageGroup = {
  senderId: string;
  sender: ModelsConversationMessageResponse[ 'sender' ];
  messages: ModelsConversationMessageResponse[];
};

function groupMessages( messages: ModelsConversationMessageResponse[] ): MessageGroup[] {
  const groups: MessageGroup[] = [];
  for ( const msg of messages ) {
    const last = groups[ groups.length - 1 ];
    if ( last && last.senderId === msg.sender_id ) {
      last.messages.push( msg );
    } else {
      groups.push( { senderId: msg.sender_id ?? '', sender: msg.sender, messages: [ msg ] } );
    }
  }
  return groups;
}

const MessageBubble = memo( ( {
  message,
  isOwn,
  size,
  canModerate,
  conversationId,
}: {
  message: ModelsConversationMessageResponse;
  isOwn: boolean;
  size: 'default' | 'sm';
  canModerate: boolean;
  conversationId: string;
} ) => {
  const [ isEditing, setIsEditing ] = useState( false );
  const [ draft, setDraft ] = useState( message.message ?? '' );
  const [ deleteOpen, setDeleteOpen ] = useState( false );
  const editMessage = useEditMessage();
  const deleteMessage = useDeleteMessage();

  const handleSaveEdit = () => {
    const trimmed = draft.trim();
    if ( !trimmed || !message.id ) return;
    editMessage.mutate(
      { messageId: message.id, conversationId, request: { message: trimmed } },
      {
        onSuccess: () => setIsEditing( false ),
        onError: () => toast.error( 'Failed to edit message' ),
      }
    );
  };

  const handleDelete = () => {
    if ( !message.id ) return;
    deleteMessage.mutate(
      { messageId: message.id, conversationId },
      {
        onSuccess: () => setDeleteOpen( false ),
        onError: () => toast.error( 'Failed to delete message' ),
      }
    );
  };

  if ( isEditing ) {
    return (
      <div className={ cn( 'flex flex-col gap-1.5 w-full max-w-[80%]', isOwn ? 'items-end' : 'items-start' ) }>
        <SuperField
          type="textarea"
          value={ draft }
          onValueChange={ setDraft }
          rows={ 2 }
          fieldClassName={ size === 'sm' ? 'text-xs' : 'text-sm' }
        />
        <div className="flex items-center gap-1.5">
          <Button size="icon" variant="ghost" className="size-6" onClick={ () => { setIsEditing( false ); setDraft( message.message ?? '' ); } }>
            <X className="size-3.5" />
          </Button>
          <Button size="icon" className="size-6" onClick={ handleSaveEdit } disabled={ !draft.trim() || editMessage.isPending }>
            { editMessage.isPending ? <Loader2 className="size-3.5 animate-spin" /> : <Check className="size-3.5" /> }
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative flex items-center gap-1">
      { isOwn && canModerate && (
        <MessageMenu onEdit={ () => setIsEditing( true ) } onDelete={ () => setDeleteOpen( true ) } className="order-first" />
      ) }
      <div
        className={ cn(
          'leading-relaxed wrap-break-word whitespace-pre-wrap',
          size === 'sm' ? 'px-2.5 py-1.5 text-xs' : 'px-3.5 py-2 text-sm',
          isOwn ? 'bg-primary text-primary-foreground rounded-2xl rounded-br-sm' : 'bg-slate-100 text-foreground rounded-2xl rounded-bl-sm'
        ) }
      >
        { message.message }
      </div>
      { !isOwn && canModerate && (
        <MessageMenu onEdit={ () => setIsEditing( true ) } onDelete={ () => setDeleteOpen( true ) } />
      ) }

      <ConfirmDialog
        open={ deleteOpen }
        onOpenChange={ setDeleteOpen }
        title="Delete message"
        description="This message will be permanently removed from the conversation."
        confirmLabel="Delete"
        onConfirm={ handleDelete }
        isLoading={ deleteMessage.isPending }
        variant="destructive"
      />
    </div>
  );
} );
MessageBubble.displayName = 'MessageBubble';

function MessageMenu( { onEdit, onDelete, className }: { onEdit: () => void; onDelete: () => void; className?: string; } ) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" size="icon" className={ cn( 'size-6 opacity-0 group-hover:opacity-100 transition-opacity', className ) }>
            <MoreVertical className="size-3.5" />
          </Button>
        }
      />
      <DropdownMenuContent align="start">
        <DropdownMenuItem onClick={ onEdit }>Edit</DropdownMenuItem>
        <DropdownMenuItem variant="destructive" onClick={ onDelete }>
          <Trash2 className="size-3.5" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const MessageGroupItem = memo( ( {
  group,
  gi,
  currentUserId,
  canModerate,
  conversationId,
  size,
}: {
  group: MessageGroup;
  gi: number;
  currentUserId?: string;
  canModerate: boolean;
  conversationId: string;
  size: 'default' | 'sm';
} ) => {
  const formatTimeAgo = useTimeAgo();
  const isOwn = group.senderId === currentUserId;
  const firstName = group.sender?.first_name ?? '';
  const lastName = group.sender?.last_name ?? '';
  const fullName = `${ firstName } ${ lastName }`.trim() || group.sender?.username || group.sender?.email || 'Unknown';

  return (
    <div className={ cn( 'flex gap-2', isOwn ? 'flex-row-reverse' : 'flex-row' ) }>
      { !isOwn && (
        <Avatar size="sm" className="shrink-0 self-end mb-5">
          <AvatarFallback>{ getInitials( firstName, lastName ) }</AvatarFallback>
        </Avatar>
      ) }
      <div className={ cn( 'flex flex-col gap-1 max-w-[70%]', isOwn ? 'items-end' : 'items-start' ) }>
        { !isOwn && (
          <span className={ cn( 'font-medium text-muted-foreground px-1 mb-0.5', size === 'sm' ? 'text-[11px]' : 'text-xs' ) }>{ fullName }</span>
        ) }
        { group.messages.map( ( msg ) => (
          <MessageBubble
            key={ msg.id }
            message={ msg }
            isOwn={ isOwn }
            size={ size }
            canModerate={ canModerate }
            conversationId={ conversationId }
          />
        ) ) }
        <span className={ cn( 'text-muted-foreground px-1 mt-0.5', size === 'sm' ? 'text-[9px]' : 'text-[10px]' ) }>
          { formatTimeAgo( group.messages[ group.messages.length - 1 ].created_at! ) }
        </span>
      </div>
    </div>
  );
} );
MessageGroupItem.displayName = 'MessageGroupItem';

const MessageInput = memo( ( { conversationId, size }: { conversationId: string; size: 'default' | 'sm'; } ) => {
  const sendMessage = useSendMessage();
  const [ text, setText ] = useState( '' );
  const textareaRef = useRef<HTMLTextAreaElement>( null );

  useEffect( () => {
    const el = textareaRef.current;
    if ( !el ) return;
    el.style.height = 'auto';
    el.style.height = `${ Math.min( el.scrollHeight, size === 'sm' ? 80 : 120 ) }px`;
  }, [ text, size ] );

  const handleSend = () => {
    const trimmed = text.trim();
    if ( !trimmed ) return;
    sendMessage.mutate(
      { conversationId, request: { message: trimmed } },
      {
        onSuccess: () => setText( '' ),
        onError: () => toast.error( 'Failed to send message' ),
      }
    );
  };

  const handleKeyDown = ( e: KeyboardEvent<HTMLTextAreaElement> ) => {
    if ( e.key === 'Enter' && !e.shiftKey ) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t px-3 py-2.5 flex items-end gap-2 bg-slate-100 shrink-0">
      <SuperField
        type="textarea"
        ref={ textareaRef }
        value={ text }
        onValueChange={ setText }
        onKeyDown={ handleKeyDown }
        placeholder="Write a message… (Enter to send, Shift+Enter for new line)"
        rows={ 1 }
        fieldClassName={ cn(
          'flex-1 resize-none rounded-xl border border-border bg-background outline-none focus:border-primary focus:bg-white transition-colors placeholder:text-muted-foreground leading-relaxed',
          size === 'sm' ? 'px-2.5 py-1.5 text-xs placeholder:text-xs' : 'px-3.5 py-2.5 text-sm'
        ) }
        style={ { minHeight: size === 'sm' ? '32px' : '40px', maxHeight: size === 'sm' ? '80px' : '120px' } }
      />
      <Button
        size="icon"
        onClick={ handleSend }
        disabled={ !text.trim() || sendMessage.isPending }
        className={ cn( 'shrink-0 mb-0.5', size === 'sm' && 'h-8 w-8' ) }
      >
        { sendMessage.isPending
          ? <Loader2 className={ cn( 'animate-spin', size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4' ) } />
          : <Send className={ size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4' } /> }
      </Button>
    </div>
  );
} );
MessageInput.displayName = 'MessageInput';

/**
 * Full conversation thread by conversation id — message history, sending,
 * and (admin only, per the API) editing/deleting any message in place.
 */
export function ConversationThread( { conversationId, size = 'default', className }: ConversationThreadProps ) {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const { data, isLoading, isFetching, error, refetch } = useConversationMessages( conversationId );
  const messagesEndRef = useRef<HTMLDivElement>( null );

  const messages: ModelsConversationMessageResponse[] = useMemo(
    () => [ ...( data?.data ?? [] ) ].sort( ( a, b ) => new Date( a.created_at ?? 0 ).getTime() - new Date( b.created_at ?? 0 ).getTime() ),
    [ data ]
  );
  const groups = useMemo( () => groupMessages( messages ), [ messages ] );

  useEffect( () => {
    messagesEndRef.current?.scrollIntoView( { behavior: 'smooth' } );
  }, [ messages.length ] );

  if ( isLoading ) {
    return (
      <div className="flex justify-center items-center p-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if ( error ) {
    return (
      <div className="p-4 flex flex-col items-start gap-2 text-red-500 bg-red-50 rounded-md border border-red-200">
        <div>Error loading conversation: { error.message }</div>
        <Button variant="outline" size="sm" onClick={ () => refetch() }>
          <RefreshCw className="size-3 mr-2" strokeWidth={ 1.5 } />
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className={ cn( 'flex flex-col flex-1 min-h-0 h-full bg-background/70 rounded-xl border overflow-hidden relative', className ) }>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-2 right-2 z-10 h-7 w-7 rounded-full bg-background/80 shadow-sm backdrop-blur"
        onClick={ () => refetch() }
        disabled={ isFetching }
        title="Refresh"
      >
        <RefreshCw className={ cn( 'size-3 text-muted-foreground', isFetching && 'animate-spin' ) } strokeWidth={ 1.5 } />
      </Button>

      <ScrollArea className="flex-1 min-h-0" scrollbar={ { style: { width: '16px', padding: '6px' } } }>
        <div className="p-4 space-y-3">
          <AnimatePresence>
            { groups.map( ( group, gi ) => (
              <motion.div
                key={ group.senderId + gi }
                initial={ { opacity: 0, y: 10 } }
                animate={ { opacity: 1, y: 0 } }
                transition={ { duration: 0.2, ease: 'easeOut' } }
              >
                <MessageGroupItem
                  group={ group }
                  gi={ gi }
                  currentUserId={ user?.id }
                  canModerate={ isAdmin }
                  conversationId={ conversationId }
                  size={ size }
                />
              </motion.div>
            ) ) }
          </AnimatePresence>
          <div ref={ messagesEndRef } />
        </div>
      </ScrollArea>

      <MessageInput conversationId={ conversationId } size={ size } />
    </div>
  );
}
