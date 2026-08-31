'use client';

import { useState } from 'react';
import { Loader2, Send } from 'lucide-react';
import { toast } from 'sonner';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/dashboard-ui/avatar';
import { Button } from '@/components/dashboard-ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/dashboard-ui/dialog';
import { SuperField } from '@/components/dashboard-ui/super-field';
import type { UtilsEntityType } from '@/lib/api/generated/models/utils-entity-type';
import { useStartConversation } from '@/lib/api/hooks/conversations';

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
 * Generic "start a conversation" composer for any entity ref (creator,
 * brand, ...). Resolves-or-creates the conversation and posts the first
 * message in one call.
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
  const [ message, setMessage ] = useState( '' );
  const startConversation = useStartConversation();

  const handleOpenChange = ( next: boolean ) => {
    if ( !next ) setMessage( '' );
    onOpenChange( next );
  };

  const handleSend = () => {
    const trimmed = message.trim();
    if ( !trimmed || !entityId ) return;

    startConversation.mutate(
      { entity_type: entityType, entity_id: entityId, message: trimmed },
      {
        onSuccess: ( response ) => {
          toast.success( `Message sent to ${ name }` );
          handleOpenChange( false );
          onSent?.( response.data?.conversation_id );
        },
        onError: () => toast.error( 'Failed to send message' ),
      }
    );
  };

  return (
    <Dialog open={ open } onOpenChange={ handleOpenChange }>
      <DialogContent className="max-w-[440px]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <Avatar className="size-10">
              { avatarUrl && <AvatarImage src={ avatarUrl } alt={ name } /> }
              <AvatarFallback>{ name.slice( 0, 2 ).toUpperCase() }</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <DialogTitle className="dialog__title truncate">Message { name }</DialogTitle>
              <DialogDescription className="font-regular">Start a conversation</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <SuperField
          type="textarea"
          value={ message }
          onValueChange={ setMessage }
          placeholder="Write your message…"
          rows={ 4 }
        />

        <DialogFooter>
          <Button variant="outline" onClick={ () => handleOpenChange( false ) }>Cancel</Button>
          <Button onClick={ handleSend } disabled={ !message.trim() || !entityId || startConversation.isPending }>
            { startConversation.isPending ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Sending…
              </>
            ) : (
              <>
                <Send className="mr-2 size-4" />
                Send Message
              </>
            ) }
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
