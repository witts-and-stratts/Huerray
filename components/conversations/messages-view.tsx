'use client';

import { useMemo, useState } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, Loader2, MessageSquarePlus, Search, Users } from 'lucide-react';

import { Button } from '@/components/dashboard-ui/button';
import { ScrollArea } from '@/components/dashboard-ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/dashboard-ui/select';
import { SuperField } from '@/components/dashboard-ui/super-field';
import { ConversationRow } from '@/components/conversations/conversation-row';
import { ConversationThread } from '@/components/conversations/conversation-thread';
import { ManageParticipantsDialog, ParticipantAvatars } from '@/components/conversations/conversation-participants';
import { NewConversationDialog } from '@/components/conversations/new-conversation-dialog';
import { useAuth } from '@/lib/auth/auth-context';
import { useConversation, useConversations } from '@/lib/api/hooks/conversations';
import { keepPreviousData } from '@tanstack/react-query';
import { cn } from '@/lib/dashboard-utils';

export function MessagesView() {
  const { user } = useAuth();
  const [ page, setPage ] = useState( 1 );
  const [ perPage, setPerPage ] = useState( 20 );
  const [ searchTerm, setSearchTerm ] = useState( '' );
  const [ selectedId, setSelectedId ] = useState<string | null>( null );
  const [ newConversationOpen, setNewConversationOpen ] = useState( false );
  const [ manageParticipantsOpen, setManageParticipantsOpen ] = useState( false );

  const { data, isLoading, isPlaceholderData } = useConversations(
    { page, limit: perPage },
    { placeholderData: keepPreviousData }
  );

  const conversations = useMemo( () => data?.data ?? [], [ data ] );
  const totalCount = data?.pagination?.total ?? conversations.length;
  const totalPages = Math.max( Math.ceil( totalCount / perPage ), 1 );

  const filtered = useMemo( () => {
    const query = searchTerm.trim().toLowerCase();
    if ( !query ) return conversations;
    return conversations.filter( ( c ) => {
      const names = ( c.participants ?? [] ).map( ( p ) => `${ p.user?.first_name || '' } ${ p.user?.last_name || '' } ${ p.user?.email || '' }`.toLowerCase() ).join( ' ' );
      const preview = c.last_message?.message?.toLowerCase() ?? '';
      return names.includes( query ) || preview.includes( query );
    } );
  }, [ conversations, searchTerm ] );

  const { data: selectedConversationData } = useConversation( selectedId ?? '', { enabled: !!selectedId } );
  const selectedConversation = selectedConversationData?.data;

  const handleStarted = ( conversationId: string | undefined ) => {
    if ( conversationId ) setSelectedId( conversationId );
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
      <div className="flex flex-1 overflow-hidden min-h-0">

        {/* Left panel — conversation list */ }
        <div className={ cn(
          'flex-col w-full md:w-80 xl:w-96 shrink-0 border-r border-border/60 overflow-hidden',
          selectedId ? 'hidden md:flex' : 'flex'
        ) }>
          <div className="flex items-center justify-between gap-2 px-3 pt-3 pb-2 shrink-0">
            <h2 className="text-sm font-medium">Messages</h2>
            <Button size="sm" className="font-regular" onClick={ () => setNewConversationOpen( true ) }>
              <MessageSquarePlus className="size-3.5" />
              New
            </Button>
          </div>

          <div className="pb-2 shrink-0 px-3">
            <SuperField
              name="search"
              type="search"
              placeholder="Search conversations…"
              prefix={ <Search className="size-4" /> }
              value={ searchTerm }
              onChange={ ( e ) => setSearchTerm( e.target.value ) }
            />
          </div>

          <div className="flex-1 relative overflow-hidden">
            { isPlaceholderData && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/60 backdrop-blur-[1px]">
                <Loader2 className="size-5 animate-spin text-muted-foreground" />
              </div>
            ) }
            { isLoading ? (
              <div className="flex justify-center items-center p-12">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <ScrollArea className="h-full" scrollbar={ { className: 'w-3 p-1' } }>
                { filtered.length === 0 ? (
                  <div className="px-6 py-8 text-center text-sm text-muted-foreground">
                    { searchTerm.trim() ? 'No matching conversations' : 'No conversations yet' }
                  </div>
                ) : (
                  filtered.map( ( conversation ) => (
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

          <div className="flex items-center justify-between gap-2 px-3 py-2 border-t border-border/60 shrink-0 bg-muted/20">
            <span className="text-[10px] sm:text-xs text-muted-foreground whitespace-nowrap">
              { totalCount } conversation{ totalCount === 1 ? '' : 's' }
            </span>
            <div className="flex items-center gap-1 sm:gap-1.5">
              <Select value={ String( perPage ) } onValueChange={ ( v ) => { setPerPage( Number( v ) ); setPage( 1 ); } }>
                <SelectTrigger className="h-7 w-12 sm:w-16 text-[10px] sm:text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent side="top">
                  { [ 10, 20, 30, 50 ].map( size => (
                    <SelectItem key={ size } value={ String( size ) } className="text-xs">{ size }</SelectItem>
                  ) ) }
                </SelectContent>
              </Select>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="sm" className="h-7 w-7 p-0" disabled={ page <= 1 } onClick={ () => setPage( p => Math.max( p - 1, 1 ) ) }>
                  <ChevronLeft className="size-3.5" />
                </Button>
                <Button variant="outline" size="sm" className="h-7 w-7 p-0" disabled={ page >= totalPages } onClick={ () => setPage( p => Math.min( p + 1, totalPages ) ) }>
                  <ChevronRight className="size-3.5" />
                </Button>
              </div>
            </div>
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
              <div className="flex items-center justify-between gap-2 shrink-0">
                <div className="flex items-center gap-2 min-w-0">
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
                <Button variant="outline" size="sm" className="font-regular" onClick={ () => setManageParticipantsOpen( true ) }>
                  <Users className="size-3.5" />
                  Participants
                </Button>
              </div>
              <ConversationThread conversationId={ selectedConversation.id ?? '' } className="flex-1" />
            </div>
          ) }
        </div>
      </div>

      <NewConversationDialog
        open={ newConversationOpen }
        onOpenChange={ setNewConversationOpen }
        onStarted={ handleStarted }
      />

      { selectedConversation?.id && (
        <ManageParticipantsDialog
          conversationId={ selectedConversation.id }
          participants={ selectedConversation.participants ?? [] }
          open={ manageParticipantsOpen }
          onOpenChange={ setManageParticipantsOpen }
        />
      ) }
    </div>
  );
}
