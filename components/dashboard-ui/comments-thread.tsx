'use client';

import { Avatar, AvatarFallback } from '@/components/dashboard-ui/avatar';
import { Button } from '@/components/dashboard-ui/button';
import { ScrollArea } from '@/components/dashboard-ui/scroll-area';
import { useAuth } from '@/lib/auth/auth-context';
import type { ModelsCommentResponse, UtilsEntityType } from '@/lib/api/generated/models';
import { UtilsEntityType as EntityType } from '@/lib/api/generated/models/utils-entity-type';
import { useAddComment, useMultipleComments } from '@/lib/api/hooks/comments';
import { cn } from '@/lib/dashboard-utils';
import { Loader2, RefreshCw, Send, ShieldCheck } from 'lucide-react';
import { KeyboardEvent, memo, useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'sonner';
import { SuperField } from './super-field';
import { timeAgo } from '@/lib/utils';
import { AnimatePresence, motion } from 'motion/react';

export interface EntityRef {
  entityType: UtilsEntityType;
  entityId: string;
}

export interface CommentsThreadProps {
  entities: EntityRef[];
  /** Which entity receives new comments. Defaults to the first entry in `entities`. */
  postTo?: EntityRef;
  disableComment?: boolean;
  size?: 'default' | 'sm';
}

function getInitials( firstName?: string, lastName?: string ) {
  return `${ firstName?.[ 0 ] ?? '' }${ lastName?.[ 0 ] ?? '' }`.toUpperCase() || '?';
}


type MessageGroup = {
  senderId: string;
  entityType: string;
  commenter: ModelsCommentResponse[ 'commenter' ];
  messages: ModelsCommentResponse[];
};

function groupMessages( messages: ModelsCommentResponse[] ): MessageGroup[] {
  const groups: MessageGroup[] = [];

  for ( const msg of messages ) {
    const last = groups[ groups.length - 1 ];
    if ( last && last.senderId === msg.commenter_id && last.entityType === msg.entity_type ) {
      last.messages.push( msg );
    } else {
      groups.push( { senderId: msg.commenter_id ?? '', entityType: msg.entity_type ?? '', commenter: msg.commenter, messages: [ msg ] } );
    }
  }

  return groups;
}

const MessageGroupItem = memo( ( {
  group,
  gi,
  user,
  size
}: {
  group: MessageGroup,
  gi: number,
  user: any,
  size: 'default' | 'sm';
} ) => {
  const isOwn = group.senderId === user?.id;
  const firstName = group.commenter?.first_name ?? '';
  const lastName = group.commenter?.last_name ?? '';
  const fullName = `${ firstName } ${ lastName }`.trim()
    || group.commenter?.username
    || group.commenter?.email
    || 'Unknown';

  const isAdminApproval = group.entityType === EntityType.EntityTypeAdminCampaignApproval;

  return (
    <AnimatePresence>
      <motion.div
        className={ cn( 'flex gap-2', isOwn ? 'flex-row-reverse' : 'flex-row' ) }
        initial={ { opacity: 0, y: 10 } }
        animate={ { opacity: 1, y: 0 } }
        transition={ { duration: 0.3, ease: 'easeOut', delay: gi * 0.01 } }
        exit={ { opacity: 0, y: 10 } }
      >
        { !isOwn && (
          <motion.div
            className="shrink-0 self-end mb-5"
            initial={ { opacity: 0, y: 10 } }
            animate={ { opacity: 1, y: 0 } }
            transition={ { duration: 0.3, ease: 'easeOut', delay: gi * 0.01 + 0.1 } }
            exit={ { opacity: 0, y: 10 } }
          >
            <Avatar size="sm">
              <AvatarFallback>{ getInitials( firstName, lastName ) }</AvatarFallback>
            </Avatar>
          </motion.div>
        ) }
        <motion.div
          className={ cn( 'flex flex-col gap-1 max-w-[70%]', isOwn ? 'items-end' : 'items-start' ) }
          initial={ { opacity: 0, y: 10 } }
          animate={ { opacity: 1, y: 0 } }
          transition={ { duration: 0.3, ease: 'easeOut', delay: gi * 0.01 + 0.1 } }
          exit={ { opacity: 0, y: 10 } }
        >
          { !isOwn && (
            <span className={ cn( "font-medium text-muted-foreground px-1 mb-0.5", size === 'sm' ? "text-[11px]" : "text-xs" ) }>{ fullName }</span>
          ) }
          { isAdminApproval && (
            <div className={ cn( 'flex items-center gap-1 px-1 mb-0.5 font-medium text-amber-600', isOwn ? 'flex-row-reverse' : 'flex-row', size === 'sm' ? "text-[11px]" : "text-xs" ) }>
              <ShieldCheck className={ size === 'sm' ? "size-3.5" : "size-4" } strokeWidth={ 1.5 } />
              <span>Admin Approval</span>
            </div>
          ) }
          { group.messages.map( ( msg, mi ) => {
            const isFirst = mi === 0;
            const isLast = mi === group.messages.length - 1;
            return (
              <motion.div
                key={ msg.id ?? mi }
                className={ cn(
                  'leading-relaxed wrap-break-word whitespace-pre-wrap',
                  size === 'sm' ? 'px-2.5 py-1.5 text-xs' : 'px-3.5 py-2 text-sm',
                  isOwn
                    ? cn( 'bg-primary text-primary-foreground', 'rounded-2xl', isFirst && 'rounded-tr-lg', isLast ? 'rounded-br-sm' : 'rounded-br-lg' )
                    : cn( 'bg-slate-100 text-foreground', 'rounded-2xl', isFirst && 'rounded-tl-lg', isLast ? 'rounded-bl-sm' : 'rounded-bl-lg' ),
                  isAdminApproval && !isOwn && 'bg-primary/15 text-primary',
                  isAdminApproval && isOwn && 'bg-primary/15 text-primary',
                ) }
                initial={ { opacity: 0, y: 10 } }
                animate={ { opacity: 1, y: 0 } }
                transition={ { duration: 0.3, ease: 'easeOut', delay: mi * 0.01 } }
                exit={ { opacity: 0, y: 10 } }
              >
                { msg.comment }
              </motion.div>
            );
          } ) }
          <motion.span
            className={ cn( "text-muted-foreground px-1 mt-0.5", size === 'sm' ? "text-[9px]" : "text-[10px]" ) }
            initial={ { opacity: 0, y: 10 } }
            animate={ { opacity: 1, y: 0 } }
            transition={ { duration: 0.3, ease: 'easeOut', delay: group.messages.length * 0.01 } }
            exit={ { opacity: 0, y: 10 } }
          >
            { timeAgo( group.messages[ group.messages.length - 1 ].created_at! ) }
          </motion.span>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
} );
MessageGroupItem.displayName = 'MessageGroupItem';

const CommentInput = memo( ( {
  targetId,
  targetType,
  size,
  disableComment
}: {
  targetId: string | undefined,
  targetType: UtilsEntityType | undefined,
  size: 'default' | 'sm',
  disableComment: boolean;
} ) => {
  const addComment = useAddComment();
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
    if ( !trimmed || !targetId || !targetType ) return;

    addComment.mutate(
      { comment: trimmed, entity_id: targetId, entity_type: targetType },
      {
        onSuccess: () => setText( '' ),
        onError: () => toast.error( 'Failed to send comment' ),
      },
    );
  };

  const handleKeyDown = ( e: KeyboardEvent<HTMLTextAreaElement> ) => {
    if ( e.key === 'Enter' && !e.shiftKey ) {
      e.preventDefault();
      handleSend();
    }
  };

  if ( disableComment ) {
    return null;
  }

  return (
    <div className="border-t px-3 py-2.5 flex items-end gap-2 bg-slate-100 shrink-0">
      <SuperField
        type='textarea'
        ref={ textareaRef }
        value={ text }
        onValueChange={ setText }
        onKeyDown={ handleKeyDown }
        placeholder="Write a comment… (Enter to send, Shift+Enter for new line)"
        rows={ 1 }
        fieldClassName={ cn(
          "flex-1 resize-none rounded-xl border border-border bg-background outline-none focus:border-primary focus:bg-white transition-colors placeholder:text-muted-foreground leading-relaxed",
          size === 'sm' ? 'px-2.5 py-1.5 text-xs placeholder:text-xs' : 'px-3.5 py-2.5 text-sm'
        ) }
        style={ { minHeight: size === 'sm' ? '32px' : '40px', maxHeight: size === 'sm' ? '80px' : '120px' } }
      />
      <Button
        size="icon"
        onClick={ handleSend }
        disabled={ !text.trim() || addComment.isPending }
        className={ cn( "shrink-0 mb-0.5", size === 'sm' && "h-8 w-8" ) }
      >
        { addComment.isPending
          ? <Loader2 className={ cn( "animate-spin", size === 'sm' ? "h-3.5 w-3.5" : "h-4 w-4" ) } />
          : <Send className={ size === 'sm' ? "h-3.5 w-3.5" : "h-4 w-4" } /> }
      </Button>
    </div>
  );
} );
CommentInput.displayName = 'CommentInput';

const MessageGroup = memo( ( { group, user, size }: { group: MessageGroup[]; user: any; size: 'default' | 'sm'; } ) => {
  return (
    <>
      { group.map( ( group, gi ) => (
        <MessageGroupItem
          key={ group.senderId + group.entityType + gi }
          group={ group }
          gi={ gi }
          user={ user }
          size={ size }
        />
      ) ) }
    </>
  );
} );
MessageGroup.displayName = 'MessageGroup';

export function CommentsThread( { entities, postTo, disableComment = false, size = 'default' }: CommentsThreadProps ) {
  const { user } = useAuth();
  const results = useMultipleComments( entities );
  const messagesEndRef = useRef<HTMLDivElement>( null );
  const isLoading = results.some( ( r ) => r.isLoading );
  const isFetching = results.some( ( r ) => r.isFetching );
  const error = results.find( ( r ) => r.error )?.error ?? null;

  const handleRefresh = () => {
    results.forEach( ( r ) => r.refetch() );
  };

  const comments: ModelsCommentResponse[] = useMemo( () => {
    return results
      .flatMap( ( r ) => r.data?.data ?? [] )
      .sort( ( a, b ) => new Date( a.created_at ?? 0 ).getTime() - new Date( b.created_at ?? 0 ).getTime() );
  }, [ results ] );

  const groups = useMemo( () => groupMessages( comments ), [ comments ] );
  const target = useMemo( () => postTo ?? entities[ 0 ], [ postTo, entities ] );

  useEffect( () => {
    messagesEndRef.current?.scrollIntoView( { behavior: 'smooth' } );
  }, [ comments.length ] );

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
        <div>Error loading comments: { error.message }</div>
        <Button variant="outline" size="sm" onClick={ handleRefresh }>
          <RefreshCw className="size-3 mr-2" strokeWidth={ 1.5 } />
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 min-h-0 h-full bg-background/70 rounded-xl border overflow-hidden relative">
      <Button
        variant="outline"
        size="icon"
        className="absolute top-2 right-2 z-10 h-7 w-7 rounded-full bg-background/80 shadow-sm backdrop-blur"
        onClick={ handleRefresh }
        disabled={ isFetching }
        title="Refresh comments"
      >
        <RefreshCw className={ cn( "size-3 text-muted-foreground", isFetching && "animate-spin" ) } strokeWidth={ 1.5 } />
      </Button>

      <ScrollArea className="flex-1 min-h-0" scrollbar={ { style: { width: '16px', padding: '6px' } } }>
        <div className="p-4 space-y-3">
          <MessageGroup group={ groups } user={ user } size={ size } />

          <div ref={ messagesEndRef } />
        </div>
      </ScrollArea>

      <CommentInput
        targetId={ target?.entityId }
        targetType={ target?.entityType }
        size={ size }
        disableComment={ disableComment }
      />
    </div>
  );
}