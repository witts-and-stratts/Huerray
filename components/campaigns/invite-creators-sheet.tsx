'use client';

import React, { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/dashboard-ui/sheet";
import { useBrandCreators } from '@/lib/api/hooks/brands';
import { Input } from '@/components/dashboard-ui/input';
import { Search } from 'lucide-react';
import { ScrollArea } from '@/components/dashboard-ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/dashboard-ui/avatar';
import { Button } from '@/components/dashboard-ui/button';
import { useInviteCreatorToGig } from '@/lib/api/hooks/gigs';
import { toast } from 'sonner';

import { CreatorDetailsSheet } from '@/components/admin/creators/creator-details-sheet';

interface InviteCreatorsSheetProps {
  campaignId: string;
  gigId: string;
  open: boolean;
  onOpenChange: ( open: boolean ) => void;
}

export function InviteCreatorsSheet( { campaignId, gigId, open, onOpenChange }: InviteCreatorsSheetProps ) {
  const [ searchQuery, setSearchQuery ] = useState( '' );
  const [ selectedCreator, setSelectedCreator ] = useState<any>( null );
  const [ invitedCreators, setInvitedCreators ] = useState<Set<string>>( new Set() );

  // Creator search
  const { data: creatorsData, isLoading: isLoadingCreators } = useBrandCreators();
  const creators = creatorsData?.data || [];

  // Invite mutation
  const inviteMutation = useInviteCreatorToGig();

  const handleInvite = ( creatorId: string, creatorName: string ) => {
    if ( !gigId ) {
      toast.error( "Invalid gig selected" );
      return;
    }

    inviteMutation.mutate( {
      id: gigId,
      invitation: {
        creator_id: creatorId,
        message: "We'd love for you to apply to our gig!",
        number_of_videos: 1
      }
    }, {
      onSuccess: () => {
        toast.success( `Invitation sent to ${ creatorName }` );
        setInvitedCreators( prev => new Set( prev ).add( creatorId ) );
      },
      onError: ( error ) => {
        toast.error( "Failed to send invitation" );
        console.error( error );
      }
    } );
  };

  return (
    <Sheet open={ open } onOpenChange={ onOpenChange }>
      <SheetContent className="w-[400px] sm:w-[540px] flex flex-col p-0 gap-0">
        <SheetHeader className="p-6 pb-2">
          <SheetTitle>Invite Creators</SheetTitle>
          <SheetDescription>
            Search for creators and invite them to apply to your gig.
          </SheetDescription>
        </SheetHeader>

        <div className="p-6 pt-2 space-y-4 border-b">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by name or username..."
              className="pl-9"
              value={ searchQuery }
              onChange={ ( e ) => setSearchQuery( e.target.value ) }
            />
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-6 space-y-4">
            { isLoadingCreators ? (
              <div className="text-center p-4 text-muted-foreground">Loading creators...</div>
            ) : creators.length === 0 ? (
              <div className="text-center p-4 text-muted-foreground">No creators found</div>
            ) : (
              creators.map( ( creator: any ) => (
                <div
                  key={ creator.id }
                  className="flex items-center justify-between group p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={ () => setSelectedCreator( creator ) }
                >
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={ creator.profile_image_url } />
                      <AvatarFallback>{ creator.first_name?.[ 0 ] }{ creator.last_name?.[ 0 ] }</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{ creator.first_name } { creator.last_name }</p>
                      <p className="text-xs text-muted-foreground">@{ creator.username }</p>
                    </div>
                  </div>
                  { invitedCreators.has( creator.id ) ? (
                    <span className="text-sm font-medium text-green-600 px-3 py-1">Invited</span>
                  ) : (
                    <Button
                      size="sm"
                      variant="secondary"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={ ( e ) => {
                        e.stopPropagation();
                        handleInvite( creator.id, creator.first_name );
                      } }
                      disabled={ inviteMutation.isPending }
                    >
                      Invite
                    </Button>
                  ) }
                </div>
              ) )
            ) }
          </div>
        </ScrollArea>
      </SheetContent>

      <CreatorDetailsSheet
        creator={ selectedCreator }
        open={ !!selectedCreator }
        onOpenChange={ ( open ) => !open && setSelectedCreator( null ) }
      />
    </Sheet>
  );
}
