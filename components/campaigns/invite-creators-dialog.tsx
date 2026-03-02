'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/dashboard-ui/dialog";
import { useBrandCreators } from '@/lib/api/hooks/brands';
import { useCreators } from '@/lib/api/hooks/creators';
import { Input } from '@/components/dashboard-ui/input';
import { Search } from 'lucide-react';
import { ScrollArea } from '@/components/dashboard-ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/dashboard-ui/avatar';
import { Button } from '@/components/dashboard-ui/button';
import { useInviteCreatorToGig, useGigInvitations } from '@/lib/api/hooks/gigs';
import { campaignsKeys } from '@/lib/api/hooks/campaigns';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { cn } from '@/lib/dashboard-utils';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  CheckmarkCircle01Icon,
  Clock01Icon,
  Cancel01Icon,
  SentIcon,
} from '@hugeicons/core-free-icons';

import { CreatorDetailsSheet } from '@/components/admin/creators/creator-details-sheet';
import { useAuth } from '@/lib/auth/auth-context';

const statusConfig: Record<string, { label: string; color: string; icon: any; }> = {
  pending: {
    label: 'Pending',
    color: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
    icon: Clock01Icon,
  },
  accepted: {
    label: 'Accepted',
    color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
    icon: CheckmarkCircle01Icon,
  },
  declined: {
    label: 'Declined',
    color: 'bg-red-500/10 text-red-600 border-red-500/20',
    icon: Cancel01Icon,
  },
  sent: {
    label: 'Invited',
    color: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
    icon: SentIcon,
  },
};

function InvitationStatusIndicator( { status }: { status: string; } ) {
  const config = statusConfig[ status.toLowerCase() ] || statusConfig.pending;

  return (
    <div className={ cn(
      "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border whitespace-nowrap",
      config.color,
    ) }>
      <HugeiconsIcon icon={ config.icon } className="w-3 h-3" />
      { config.label }
    </div>
  );
}

interface InviteCreatorsDialogProps {
  campaignId: string;
  gigId: string;
  open: boolean;
  onOpenChange: ( open: boolean ) => void;
}

export function InviteCreatorsDialog( { campaignId, gigId, open, onOpenChange }: InviteCreatorsDialogProps ) {
  const [ searchQuery, setSearchQuery ] = useState( '' );
  const [ selectedCreator, setSelectedCreator ] = useState<any>( null );
  const [ localInvitedCreators, setLocalInvitedCreators ] = useState<Set<string>>( new Set() );
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  // Creator search
  const { data: adminCreatorsData, isLoading: isLoadingAdminCreators } = useCreators(
    {
      q: searchQuery || undefined,
      limit: 100,
    },
    { enabled: isAdmin && open }
  );
  const { data: brandCreatorsData, isLoading: isLoadingBrandCreators } = useBrandCreators(
    {
      q: searchQuery || undefined,
      limit: 100,
    },
    { enabled: !isAdmin && open }
  );
  const creators = ( isAdmin ? adminCreatorsData : brandCreatorsData )?.data || [];
  const isLoadingCreators = isAdmin ? isLoadingAdminCreators : isLoadingBrandCreators;

  // Fetch existing invitations for this gig
  const { data: invitationsData } = useGigInvitations( gigId, { enabled: !!gigId && open } );
  const invitationsRaw = invitationsData?.data;
  const existingInvitations = Array.isArray( invitationsRaw ) ? invitationsRaw : invitationsRaw ? [ invitationsRaw ] : [];

  // Map creator IDs to their invitation status
  const creatorInvitationMap = new Map<string, string>(
    existingInvitations.map( ( inv: any ) => [ inv.creator_id, inv.status || 'pending' ] )
  );

  const getCreatorInvitationStatus = ( creatorId: string ): string | null => {
    if ( localInvitedCreators.has( creatorId ) ) return 'pending';
    return creatorInvitationMap.get( creatorId ) || null;
  };

  // Invite mutation
  const queryClient = useQueryClient();
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
        setLocalInvitedCreators( prev => new Set( prev ).add( creatorId ) );
        queryClient.invalidateQueries( { queryKey: campaignsKeys.invitations( campaignId ) } );
        queryClient.invalidateQueries( { queryKey: campaignsKeys.detail( campaignId ) } );
      },
      onError: ( error ) => {
        toast.error( "Failed to send invitation" );
        console.error( error );
      }
    } );
  };

  return (
    <>
      <Dialog open={ open } onOpenChange={ onOpenChange }>
        <DialogContent className="max-w-[400px] sm:max-w-[540px] flex flex-col p-0 gap-0">
          <DialogHeader className="p-6 pb-2">
            <DialogTitle>Invite Creators</DialogTitle>
            <DialogDescription>
              Search for creators and invite them to apply to your gig.
            </DialogDescription>
          </DialogHeader>

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

          <ScrollArea className="h-[400px] flex-1">
            <div className="p-6 space-y-4">
              { isLoadingCreators ? (
                <div className="text-center p-4 text-muted-foreground">Loading creators...</div>
              ) : creators.length === 0 ? (
                <div className="text-center p-4 text-muted-foreground">No creators found</div>
              ) : (
                creators.map( ( creator: any ) => {
                  const invitationStatus = getCreatorInvitationStatus( creator.id );

                  return (
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
                      { invitationStatus ? (
                        <InvitationStatusIndicator status={ invitationStatus } />
                      ) : (
                        <div onClick={ ( e ) => e.stopPropagation() }>
                          <Button
                            size="sm"
                            variant="secondary"
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={ () => handleInvite( creator.id, creator.first_name ) }
                            disabled={ inviteMutation.isPending }
                          >
                            Invite
                          </Button>
                        </div>
                      ) }
                    </div>
                  );
                } )
              ) }
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <CreatorDetailsSheet
        creator={ selectedCreator }
        open={ !!selectedCreator }
        onOpenChange={ ( open ) => !open && setSelectedCreator( null ) }
      />
    </>
  );
}
