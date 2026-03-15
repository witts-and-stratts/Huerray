'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/dashboard-ui/avatar';
import { Button } from '@/components/dashboard-ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/dashboard-ui/dialog";
import { ScrollArea } from '@/components/dashboard-ui/scroll-area';
import { Skeleton } from '@/components/dashboard-ui/skeleton';
import { useBrandCreators } from '@/lib/api/hooks/brands';
import { campaignsKeys } from '@/lib/api/hooks/campaigns';
import { useGigInvitations, useInviteCreatorToGig, useGig } from '@/lib/api/hooks/gigs';
import { cn } from '@/lib/dashboard-utils';
import {
  Cancel01Icon,
  CheckmarkCircle01Icon,
  Clock01Icon,
  SentIcon,
  UserMultiple02Icon,
  SearchListIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useQueryClient } from '@tanstack/react-query';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { CreatorDetailsSheet } from '@/components/admin/creators/creator-details-sheet';
import { useAuth } from '@/lib/auth/auth-context';
import { imgpresets } from '@/lib/utils/imgproxy';
import { motion, variantProps, Variants } from 'motion/react';
import { SuperField } from '../dashboard-ui/super-field';
import { Badge } from '../dashboard-ui/badge';

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
    <Badge className={ cn(
      'text-[11px] font-normal',
      config.color,
    ) }>
      <HugeiconsIcon icon={ config.icon } className="w-3 h-3" />
      { config.label }
    </Badge>
  );
}

function EmptyState( { hasSearchQuery, hasFilters }: { hasSearchQuery: boolean; hasFilters: boolean; } ) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="size-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
        <HugeiconsIcon
          icon={ hasSearchQuery ? SearchListIcon : UserMultiple02Icon }
          className="w-8 h-8 text-muted-foreground/50"
        />
      </div>
      <h3 className="text-base font-medium text-foreground mb-1">
        { hasSearchQuery ? 'No creators found' : 'No matching creators' }
      </h3>
      <p className="text-sm text-muted-foreground text-center max-w-[280px]">
        { hasSearchQuery ? (
          <>Try adjusting your search terms or check the spelling.</>
        ) : hasFilters ? (
          <>No creators match the gig requirements. Consider adjusting the age range or gender requirement in your gig settings.</>
        ) : (
          <>No creators available at the moment. Try again later.</>
        ) }
      </p>
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

  // Fetch gig details to get requirements for filtering creators
  const { data: gigData } = useGig( gigId, { enabled: !!gigId && open } );
  const gig = gigData?.data;

  const { data: brandCreatorsData, isLoading } = useBrandCreators(
    {
      q: searchQuery || undefined,
      limit: 100,
      // Filter creators based on gig requirements
      ageMin: gig?.age_min,
      ageMax: gig?.age_max,
      gender: gig?.gender_requirement as 'male' | 'female' | 'any' | undefined,
    },
    { enabled: !isAdmin && open }
  );
  const creators = brandCreatorsData?.data;

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
      toast.error( "Invalid gig selected", { richColors: true } );
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
        toast.success( `Invitation sent to ${ creatorName }`, { richColors: true } );
        setLocalInvitedCreators( prev => new Set( prev ).add( creatorId ) );
        queryClient.invalidateQueries( { queryKey: campaignsKeys.invitations( campaignId ) } );
        queryClient.invalidateQueries( { queryKey: campaignsKeys.detail( campaignId ) } );
      },
      onError: ( error ) => {
        toast.error( "Failed to send invitation", { richColors: true } );
        console.error( error );
      }
    } );
  };

  return (
    <>
      <Dialog open={ open } onOpenChange={ onOpenChange }>
        <DialogContent className="max-w-[400px] sm:max-w-[540px] flex flex-col p-0 gap-0 bg-background/30 overflow-hidden">
          <DialogHeader className="p-6 pb-2 bg-background/80">
            <DialogTitle className={ 'dialog__title' }>Invite Creators</DialogTitle>
            <DialogDescription className={ 'font-regular' }>
              Search for creators and invite them to apply to your gig.
              { ( gig?.age_min || gig?.age_max || gig?.gender_requirement ) && (
                <span className="block mt-2 text-xs text-muted-foreground">
                  Showing creators matching gig requirements:
                  { gig.age_min && gig.age_max && ` Age ${ gig.age_min }-${ gig.age_max }` }
                  { gig.age_min && !gig.age_max && ` Age ${ gig.age_min }+` }
                  { !gig.age_min && gig.age_max && ` Age up to ${ gig.age_max }` }
                  { gig.gender_requirement && gig.gender_requirement !== 'any' && `, ${ gig.gender_requirement.charAt( 0 ).toUpperCase() + gig.gender_requirement.slice( 1 ) }` }
                </span>
              ) }
            </DialogDescription>
          </DialogHeader>

          <div className="p-6 pt-2 space-y-4 border-b bg-background/80">
            <div className="relative">
              <SuperField
                type='search'
                prefix={ <Search /> }
                placeholder='Search by name or username'
                value={ searchQuery }
                onValueChange={ setSearchQuery }
                fieldClassName='placeholder:text-foreground/50'
              />
            </div>
          </div>

          <ScrollArea className="h-[400px] flex-1">
            <div className="p-6 space-y-1 bg-background m-2 rounded-lg border">
              { isLoading ? (
                <div className="space-y-4">
                  { Array.from( { length: 5 } ).map( ( _, i ) => (
                    <div key={ `skeleton-${ i }` } className="flex items-center justify-between p-2">
                      <div className="flex items-center gap-3">
                        <Skeleton className="size-10 rounded-full shrink-0" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-[120px]" />
                          <Skeleton className="h-3 w-[80px]" />
                        </div>
                      </div>
                    </div>
                  ) ) }
                </div>
              ) : creators?.length === 0 ? (
                <EmptyState
                  hasSearchQuery={ !!searchQuery }
                  hasFilters={ !!( gig?.age_min || gig?.age_max || ( gig?.gender_requirement && gig.gender_requirement !== 'any' ) ) }
                />
              ) : (
                creators?.map( ( creator, index ) => {
                  const invitationStatus = getCreatorInvitationStatus( creator.id! );
                  return (
                    <motion.div
                      key={ creator.id }
                      className="flex items-center justify-between group p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                      onClick={ () => setSelectedCreator( creator ) }
                      initial={ { opacity: 0, y: 20 } }
                      animate={ { opacity: 1, y: 0 } }
                      exit={ { opacity: 0, y: 20 } }
                      transition={ { ease: 'easeOut', duration: 0.3, delay: index * 0.03 } }
                    >
                      <div className="flex items-center gap-3">
                        <Avatar>
                          { creator.profile_image?.asset && <AvatarImage src={ imgpresets.avatar( creator.profile_image.asset ) } /> }
                          <AvatarFallback>{ creator.first_name?.[ 0 ] }{ creator.last_name?.[ 0 ] }</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-normal text-sm">{ creator.first_name } { creator.last_name }</p>
                        </div>
                      </div>
                      { invitationStatus ? (
                        <InvitationStatusIndicator status={ invitationStatus } />
                      ) : (
                        <div onClick={ ( e ) => e.stopPropagation() }>
                          { creator.id && <Button
                            size="sm"
                            variant="secondary"
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={ () => handleInvite( creator.id!, creator.first_name! ) }
                            disabled={ inviteMutation.isPending }
                          >
                            Invite
                          </Button> }
                        </div>
                      ) }
                    </motion.div>
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
