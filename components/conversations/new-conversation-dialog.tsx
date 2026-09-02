'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/dashboard-ui/avatar';
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
import { StartConversationDialog } from '@/components/conversations/start-conversation-dialog';
import type { ModelsCreatorResponse } from '@/lib/api/generated/models';
import { UtilsEntityType } from '@/lib/api/generated/models/utils-entity-type';
import { useCreators } from '@/lib/api/hooks/creators';
import { imgpresets } from '@/lib/utils/imgproxy';

export interface NewConversationDialogProps {
  open: boolean;
  onOpenChange: ( open: boolean ) => void;
  onStarted?: ( conversationId: string | undefined ) => void;
}

/** Picks a creator, then hands off to StartConversationDialog to compose the first message. */
export function NewConversationDialog( { open, onOpenChange, onStarted }: NewConversationDialogProps ) {
  const [ searchQuery, setSearchQuery ] = useState( '' );
  const [ selectedCreator, setSelectedCreator ] = useState<ModelsCreatorResponse | null>( null );

  const { data: creatorsData, isLoading } = useCreators(
    { q: searchQuery || undefined, limit: 20 },
    { enabled: open }
  );
  const creators = creatorsData?.data ?? [];

  const handleOpenChange = ( next: boolean ) => {
    if ( !next ) setSearchQuery( '' );
    onOpenChange( next );
  };

  const handleSelect = ( creator: ModelsCreatorResponse ) => {
    setSelectedCreator( creator );
    handleOpenChange( false );
  };

  const selectedName = selectedCreator
    ? `${ selectedCreator.first_name || '' } ${ selectedCreator.last_name || '' }`.trim() || selectedCreator.email || 'Creator'
    : '';

  return (
    <>
      <Dialog open={ open } onOpenChange={ handleOpenChange }>
        <DialogContent className="max-w-[440px] flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle className="dialog__title">New Conversation</DialogTitle>
            <DialogDescription className="font-regular">Pick a creator to message</DialogDescription>
          </DialogHeader>

          <SuperField
            type="search"
            prefix={ <Search /> }
            placeholder="Search creators…"
            value={ searchQuery }
            onValueChange={ setSearchQuery }
          />

          <ScrollArea className="max-h-[320px]">
            <div className="space-y-1">
              { isLoading ? (
                Array.from( { length: 5 } ).map( ( _, i ) => (
                  <div key={ i } className="flex items-center gap-3 p-2">
                    <Skeleton className="size-10 rounded-full shrink-0" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                ) )
              ) : creators.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">No creators found</p>
              ) : (
                creators.map( ( creator ) => {
                  const name = `${ creator.first_name || '' } ${ creator.last_name || '' }`.trim() || creator.email || 'Unknown';
                  const profileImage = creator.profile_image?.asset;
                  return (
                    <button
                      key={ creator.id }
                      type="button"
                      className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors text-left"
                      onClick={ () => handleSelect( creator ) }
                    >
                      <Avatar>
                        { profileImage && <AvatarImage src={ imgpresets.avatar( profileImage ) } /> }
                        <AvatarFallback>{ name.slice( 0, 2 ).toUpperCase() }</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{ name }</p>
                        { creator.email && <p className="text-xs text-muted-foreground truncate">{ creator.email }</p> }
                      </div>
                    </button>
                  );
                } )
              ) }
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <StartConversationDialog
        entityType={ UtilsEntityType.EntityTypeCreator }
        entityId={ selectedCreator?.id }
        name={ selectedName }
        avatarUrl={ selectedCreator?.profile_image?.asset ? imgpresets.avatar( selectedCreator.profile_image.asset ) : undefined }
        open={ !!selectedCreator }
        onOpenChange={ ( next ) => { if ( !next ) setSelectedCreator( null ); } }
        onSent={ ( conversationId ) => { setSelectedCreator( null ); onStarted?.( conversationId ); } }
      />
    </>
  );
}
