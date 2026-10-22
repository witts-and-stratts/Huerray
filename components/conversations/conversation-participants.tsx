'use client';

import { useState } from 'react';
import { Loader2, Search, UserPlus, X } from 'lucide-react';
import { toast } from 'sonner';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/dashboard-ui/avatar';
import { Button } from '@/components/dashboard-ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/dashboard-ui/dialog';
import { ScrollArea } from '@/components/dashboard-ui/scroll-area';
import { Skeleton } from '@/components/dashboard-ui/skeleton';
import { SuperField } from '@/components/dashboard-ui/super-field';
import { useAuth } from '@/lib/auth/auth-context';
import type { ModelsConversationParticipantResponse } from '@/lib/api/generated/models';
import { useAddParticipants, useRemoveParticipant } from '@/lib/api/hooks/conversations';
import { useCreators } from '@/lib/api/hooks/creators';
import { imgpresets } from '@/lib/utils/imgproxy';

function participantName( participant: ModelsConversationParticipantResponse ): string {
  const user = participant.user;
  return `${ user?.first_name || '' } ${ user?.last_name || '' }`.trim() || user?.email || 'Unknown';
}

interface ParticipantAvatarsProps {
  participants: ModelsConversationParticipantResponse[];
  max?: number;
  size?: 'sm' | 'default';
}

/** Compact stacked-avatar summary of a conversation's participants. */
export function ParticipantAvatars( { participants, max = 4, size = 'sm' }: ParticipantAvatarsProps ) {
  const visible = participants.slice( 0, max );
  const overflow = participants.length - visible.length;
  const avatarClass = size === 'sm' ? 'size-6' : 'size-8';

  return (
    <div className="flex items-center -space-x-2">
      { visible.map( ( participant ) => (
        <Avatar key={ participant.user_id } className={ `${ avatarClass } border-2 border-background` }>
          <AvatarFallback className="text-[10px]">{ participantName( participant ).slice( 0, 2 ).toUpperCase() }</AvatarFallback>
        </Avatar>
      ) ) }
      { overflow > 0 && (
        <div className={ `${ avatarClass } rounded-full border-2 border-background bg-muted flex items-center justify-center text-[10px] font-medium text-muted-foreground` }>
          +{ overflow }
        </div>
      ) }
    </div>
  );
}

interface ManageParticipantsDialogProps {
  conversationId: string;
  participants: ModelsConversationParticipantResponse[];
  open: boolean;
  onOpenChange: ( open: boolean ) => void;
}

/** Dialog to view, add, and remove a conversation's participants. */
export function ManageParticipantsDialog( { conversationId, participants, open, onOpenChange }: ManageParticipantsDialogProps ) {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const [ searchQuery, setSearchQuery ] = useState( '' );
  const addParticipants = useAddParticipants();
  const removeParticipant = useRemoveParticipant();

  const existingIds = new Set( participants.map( ( p ) => p.user_id ) );

  const { data: creatorsData, isLoading: isSearching } = useCreators(
    { q: searchQuery || undefined, limit: 10 },
    { enabled: open && searchQuery.trim().length > 0 }
  );
  const searchResults = ( creatorsData?.data ?? [] ).filter( ( c ) => c.id && !existingIds.has( c.id ) );

  const handleAdd = ( userId: string, name: string ) => {
    addParticipants.mutate(
      { conversationId, request: { user_ids: [ userId ] } },
      {
        onSuccess: () => toast.success( `${ name } added to conversation` ),
        onError: () => toast.error( 'Failed to add participant' ),
      }
    );
  };

  const handleRemove = ( userId: string, name: string ) => {
    removeParticipant.mutate(
      { conversationId, userId },
      {
        onSuccess: () => toast.success( `${ name } removed from conversation` ),
        onError: () => toast.error( 'Failed to remove participant' ),
      }
    );
  };

  const canRemove = ( participant: ModelsConversationParticipantResponse ) =>
    isAdmin || participant.user_id === user?.id;

  return (
    <Dialog open={ open } onOpenChange={ onOpenChange }>
      <DialogContent className="max-w-[440px] flex flex-col gap-4">
        <DialogHeader>
          <DialogTitle className="dialog__title">Participants</DialogTitle>
          <DialogDescription className="font-regular">Manage who's in this conversation</DialogDescription>
        </DialogHeader>

        <div className="space-y-1">
          { participants.map( ( participant ) => (
            <div key={ participant.user_id } className="flex items-center justify-between gap-2 py-1.5">
              <div className="flex items-center gap-2 min-w-0">
                <Avatar className="size-8">
                  <AvatarFallback className="text-xs">{ participantName( participant ).slice( 0, 2 ).toUpperCase() }</AvatarFallback>
                </Avatar>
                <span className="text-sm truncate">{ participantName( participant ) }</span>
              </div>
              { canRemove( participant ) && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-7 text-muted-foreground hover:text-destructive"
                  onClick={ () => handleRemove( participant.user_id!, participantName( participant ) ) }
                  disabled={ removeParticipant.isPending }
                >
                  <X className="size-3.5" />
                </Button>
              ) }
            </div>
          ) ) }
        </div>

        <div className="space-y-2 border-t pt-3">
          <SuperField
            type="search"
            prefix={ <Search /> }
            placeholder="Search creators to add…"
            value={ searchQuery }
            onValueChange={ setSearchQuery }
          />
          { searchQuery.trim().length > 0 && (
            <ScrollArea className="max-h-[220px]">
              <div className="space-y-1">
                { isSearching ? (
                  Array.from( { length: 3 } ).map( ( _, i ) => (
                    <div key={ i } className="flex items-center gap-2 py-1.5">
                      <Skeleton className="size-8 rounded-full shrink-0" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  ) )
                ) : searchResults.length === 0 ? (
                  <p className="text-xs text-muted-foreground py-2">No matching creators found</p>
                ) : (
                  searchResults.map( ( creator ) => {
                    const name = `${ creator.first_name || '' } ${ creator.last_name || '' }`.trim() || creator.email || 'Unknown';
                    const profileImage = creator.profile_image?.asset;
                    return (
                      <div key={ creator.id } className="flex items-center justify-between gap-2 py-1.5 group">
                        <div className="flex items-center gap-2 min-w-0">
                          <Avatar className="size-8">
                            { profileImage && <AvatarImage src={ imgpresets.avatar( profileImage ) } /> }
                            <AvatarFallback className="text-xs">{ name.slice( 0, 2 ).toUpperCase() }</AvatarFallback>
                          </Avatar>
                          <span className="text-sm truncate">{ name }</span>
                        </div>
                        <Button
                          size="sm"
                          variant="secondary"
                          className="opacity-0 group-hover:opacity-100 transition-opacity font-regular"
                          onClick={ () => handleAdd( creator.id!, name ) }
                          disabled={ addParticipants.isPending }
                        >
                          { addParticipants.isPending
                            ? <Loader2 className="size-3.5 animate-spin" />
                            : <UserPlus className="size-3.5" /> }
                        </Button>
                      </div>
                    );
                  } )
                ) }
              </div>
            </ScrollArea>
          ) }
        </div>
      </DialogContent>
    </Dialog>
  );
}
