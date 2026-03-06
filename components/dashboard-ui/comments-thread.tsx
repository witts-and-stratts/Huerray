'use client';

import { Avatar, AvatarFallback } from '@/components/dashboard-ui/avatar';
import { Button } from '@/components/dashboard-ui/button';
import { ScrollArea } from '@/components/dashboard-ui/scroll-area';
import { useAuth } from '@/lib/auth/auth-context';
import type { ModelsCommentResponse, UtilsEntityType } from '@/lib/api/generated/models';
import { UtilsEntityType as EntityType } from '@/lib/api/generated/models/utils-entity-type';
import { useAddComment, useMultipleComments } from '@/lib/api/hooks/comments';
import { cn } from '@/lib/dashboard-utils';
import { Loader2, Send, ShieldCheck } from 'lucide-react';
import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { SuperField } from './super-field';
import { timeAgo } from '@/lib/utils';

export interface EntityRef {
  entityType: UtilsEntityType;
  entityId: string;
}

export interface CommentsThreadProps {
  entities: EntityRef[];
  /** Which entity receives new comments. Defaults to the first entry in `entities`. */
  postTo?: EntityRef;
  disableComment?: boolean;
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

export function CommentsThread( { entities, postTo, disableComment = false }: CommentsThreadProps ) {
  const { user } = useAuth();
  const results = useMultipleComments( entities );
  const addComment = useAddComment();
  const [ text, setText ] = useState( '' );
  const messagesEndRef = useRef<HTMLDivElement>( null );
  const textareaRef = useRef<HTMLTextAreaElement>( null );

  const isLoading = results.some( ( r ) => r.isLoading );
  const error = results.find( ( r ) => r.error )?.error ?? null;

  const comments: ModelsCommentResponse[] = results
    .flatMap( ( r ) => r.data?.data ?? [] )
    .sort( ( a, b ) => new Date( a.created_at ?? 0 ).getTime() - new Date( b.created_at ?? 0 ).getTime() );
  const groups = groupMessages( comments );

  const target = postTo ?? entities[ 0 ];

  useEffect( () => {
    messagesEndRef.current?.scrollIntoView( { behavior: 'smooth' } );
  }, [ comments.length ] );

  useEffect( () => {
    const el = textareaRef.current;
    if ( !el ) return;
    el.style.height = 'auto';
    el.style.height = `${ Math.min( el.scrollHeight, 120 ) }px`;
  }, [ text ] );

  const handleSend = () => {
    const trimmed = text.trim();
    if ( !trimmed || !target ) return;

    addComment.mutate(
      { comment: trimmed, entity_id: target.entityId, entity_type: target.entityType },
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

  if ( isLoading ) {
    return (
      <div className="flex justify-center items-center p-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if ( error ) {
    return (
      <div className="p-4 text-red-500 bg-red-50 rounded-md border border-red-200">
        Error loading comments: { error.message }
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-background/70 rounded-xl border overflow-hidden">
      {/* Messages */ }
      <ScrollArea className="flex-1 min-h-0" scrollbar={ { style: { width: '16px', padding: '6px' } } }>
        <div className="p-4 space-y-3">
          { groups.map( ( group, gi ) => {
            const isOwn = group.senderId === user?.id;
            const firstName = group.commenter?.first_name ?? '';
            const lastName = group.commenter?.last_name ?? '';
            const fullName = `${ firstName } ${ lastName }`.trim()
              || group.commenter?.username
              || group.commenter?.email
              || 'Unknown';

            const isAdminApproval = group.entityType === EntityType.EntityTypeAdminCampaignApproval;

            return (
              <div key={ gi } className={ cn( 'flex gap-2', isOwn ? 'flex-row-reverse' : 'flex-row' ) }>
                { !isOwn && (
                  <div className="shrink-0 self-end mb-5">
                    <Avatar size="sm">
                      <AvatarFallback>{ getInitials( firstName, lastName ) }</AvatarFallback>
                    </Avatar>
                  </div>
                ) }

                <div className={ cn( 'flex flex-col gap-1 max-w-[70%]', isOwn ? 'items-end' : 'items-start' ) }>
                  { !isOwn && (
                    <span className="text-xs font-medium text-muted-foreground px-1 mb-0.5">{ fullName }</span>
                  ) }
                  { isAdminApproval && (
                    <div className={ cn( 'flex items-center gap-1 px-1 mb-0.5 text-xs font-medium text-amber-600', isOwn ? 'flex-row-reverse' : 'flex-row' ) }>
                      <ShieldCheck className="size-4" strokeWidth={ 1.5 } />
                      <span>Admin Approval</span>
                    </div>
                  ) }

                  { group.messages.map( ( msg, mi ) => {
                    const isFirst = mi === 0;
                    const isLast = mi === group.messages.length - 1;

                    return (
                      <div
                        key={ msg.id ?? mi }
                        className={ cn(
                          'px-3.5 py-2 text-sm leading-relaxed wrap-break-word whitespace-pre-wrap',
                          isOwn
                            ? cn( 'bg-primary text-primary-foreground', 'rounded-2xl', isFirst && 'rounded-tr-lg', isLast ? 'rounded-br-sm' : 'rounded-br-lg' )
                            : cn( 'bg-slate-100 text-foreground', 'rounded-2xl', isFirst && 'rounded-tl-lg', isLast ? 'rounded-bl-sm' : 'rounded-bl-lg' ),
                          isAdminApproval && !isOwn && 'bg-primary/15 text-primary',
                          isAdminApproval && isOwn && 'bg-primary/15 text-primary',
                        ) }
                      >
                        { msg.comment }
                      </div>
                    );
                  } ) }

                  <span className="text-[10px] text-muted-foreground px-1 mt-0.5">
                    { timeAgo( group.messages[ group.messages.length - 1 ].created_at! ) }
                  </span>
                </div>
              </div>
            );
          } ) }

          <div ref={ messagesEndRef } />
        </div>
      </ScrollArea>

      {/* Input */ }
      { !disableComment && (
        <div className="border-t px-3 py-2.5 flex items-end gap-2 bg-slate-100 shrink-0">
          <SuperField
            type='textarea'
            ref={ textareaRef }
            value={ text }
            onChange={ ( e ) => setText( e.target.value ) }
            onKeyDown={ handleKeyDown }
            placeholder="Write a comment… (Enter to send, Shift+Enter for new line)"
            rows={ 1 }
            fieldClassName="flex-1 resize-none rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm leading-relaxed outline-none focus:border-primary focus:bg-white transition-colors placeholder:text-muted-foreground"
            style={ { minHeight: '40px', maxHeight: '120px' } }
          />
          <Button
            size="icon"
            onClick={ handleSend }
            disabled={ !text.trim() || addComment.isPending }
            className="shrink-0 mb-0.5"
          >
            { addComment.isPending
              ? <Loader2 className="h-4 w-4 animate-spin" />
              : <Send className="h-4 w-4" /> }
          </Button>
        </div>
      ) }
    </div>
  );
}
