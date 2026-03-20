"use client";

import { CreatorDetailsSheet } from '@/components/admin/creators/creator-details-sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/dashboard-ui/avatar';
import { Badge } from '@/components/dashboard-ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/dashboard-ui/dialog';
import { Skeleton } from '@/components/dashboard-ui/skeleton';
import { ModelsVideoSubmissionResponse } from '@/lib/api/generated/models';
import { useGig } from '@/lib/api/hooks/gigs';
import { formatCurrency, formatDate } from '@/lib/utils/format';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { memo, ReactNode, useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { TextCapitalize } from '../text-case';
import { RoleGuard } from '@/components/auth/role-guard';
import { Button } from '@/components/dashboard-ui/button';
import { useUpdateVideoSubmissionStatus, useVideoSubmissionDecision } from '@/lib/api/hooks/video-submissions';
import { UtilsVideoSubmissionStatus, ModelsBrandVideoDecisionRequestStatusEnum } from '@/lib/api/generated/models';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { ConfirmDialog } from '../dashboard-ui/confirm-dialog';
import { SuperField } from '../dashboard-ui/super-field';
import { ExpandableContent } from '../dashboard-ui/expandable-content';
import { useSubmissionComments } from '@/lib/api/hooks/comments';
import { UtilsEntityType } from '@/lib/api/generated/models/utils-entity-type';
import { MessageSquare, X } from 'lucide-react';
import { CommentsThread } from '../dashboard-ui/comments-thread';
import { imgpresets } from '@/lib/utils/imgproxy';
import { cn } from '@/lib/dashboard-utils';
import { motion } from 'motion/react';

interface SubmissionViewDialogProps {
  open: boolean;
  onOpenChange: ( open: boolean ) => void;
  submission: ModelsVideoSubmissionResponse;
  initialCommentsOpen?: boolean;
}

const statusVariant: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  approved: 'default',
  completed: 'default',
  pending_approval: 'secondary',
  submitted: 'secondary',
  open: 'outline',
  in_progress: 'outline',
  rejected: 'destructive',
  returned: 'destructive',
};

function SubmissionCardSkeleton() {
  return <>
    { Array.from( { length: 4 } ).map( ( _, i ) => (
      <div key={ `detail-skeleton-${ i }` }>
        <Skeleton className="mb-1 h-3 w-16" />
        <Skeleton className="h-4 w-24" />
      </div>
    ) ) }
  </>;
}

function Row( { label, value }: { label: string, value: ReactNode; } ) {
  return (
    <div className='w-full flex flex-col space-x-30'>
      <p className="text-xs text-muted-foreground/70 mb-0.5"><TextCapitalize>{ label }</TextCapitalize></p>
      <p className="font-normal text-foreground truncate text-sm">
        { value }
      </p>
    </div>
  );
}

interface SubmissionVideoProps {
  videoUrl: string;
  poster?: string;
}

const SubmissionVideo = memo( ( { videoUrl, poster }: SubmissionVideoProps ) => {
  const containerRef = useRef<HTMLDivElement>( null );
  const [ measuredHeight, setMeasuredHeight ] = useState<number | null>( null );

  const handleLoadedMetadata = useCallback( () => {
    if ( containerRef.current ) {
      // Temporarily make the container auto-height to measure
      const el = containerRef.current;
      el.style.height = 'auto';
      const rect = el.getBoundingClientRect();
      setMeasuredHeight( rect.height );
    }
  }, [] );

  const optimisedPoster = useMemo( () => {
    if ( !poster ) return undefined;
    return imgpresets.banner( poster );
  }, [ poster ] );

  return (
    <motion.div
      ref={ containerRef }
      className="w-full bg-black shrink-0 overflow-hidden"
      initial={ { opacity: 0, height: 0 } }
      animate={ { opacity: 1, height: measuredHeight ?? 'auto' } }
      exit={ { opacity: 0, height: 0 } }
      transition={ { duration: 0.5, ease: [ 0.25, 0.1, 0.25, 1 ] } }
    >
      <video
        src={ videoUrl }
        controls
        preload="metadata"
        className="w-full h-full md:min-h-[500px] max-h-[60vh] md:object-cover"
        onLoadedMetadata={ handleLoadedMetadata }
        poster={ optimisedPoster }
      />
    </motion.div>
  );
} );
SubmissionVideo.displayName = 'SubmissionVideo';

const SubmissionHeader = memo( ( {
  title,
  description,
  commentCount,
  isCommentsOpen,
  onToggleComments
}: {
  title: string,
  description?: string,
  commentCount: number,
  isCommentsOpen: boolean,
  onToggleComments: () => void;
} ) => (
  <DialogHeader className='gap-0 flex-row justify-between items-start'>
    <div>
      <DialogTitle className="font-primary text-primary text-lg font-normal mb-0 flex items-center gap-2">
        <TextCapitalize>{ title }</TextCapitalize>
      </DialogTitle>
      { description && (
        <DialogDescription>
          <ExpandableContent>
            { description }
          </ExpandableContent>
        </DialogDescription>
      ) }
    </div>

    <div className="flex items-center gap-2">
      <button
        onClick={ onToggleComments }
        className={ cn(
          "flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full mt-1.5 shrink-0 transition-colors cursor-pointer hover:bg-primary/20",
          commentCount > 0 ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground",
          isCommentsOpen && "bg-primary text-primary-foreground hover:bg-primary/90"
        ) }
      >
        <MessageSquare className="w-3.5 h-3.5" />
        <span>{ commentCount > 0 ? commentCount : 'Comments' }</span>
      </button>
    </div>
  </DialogHeader>
) );
SubmissionHeader.displayName = 'SubmissionHeader';

const CreatorTrigger = memo( ( { creatorProfile }: { creatorProfile: ModelsVideoSubmissionResponse[ 'creator' ]; } ) => {
  const [ sheetOpen, setSheetOpen ] = useState( false );

  const creatorDisplayName = `${ creatorProfile?.first_name || '' } ${ creatorProfile?.last_name || '' }`.trim()
    || creatorProfile?.email
    || 'Unknown Creator';
  const creatorSecondary = [
    creatorProfile?.email || '',
    creatorProfile?.city || '',
    creatorProfile?.country || '',
  ].filter( Boolean ).join( ' • ' ) || 'No creator details available';
  const creatorAvatar = creatorProfile?.profile_image?.asset || '';

  return (
    <>
      <button
        onClick={ () => setSheetOpen( true ) }
        className="flex items-center gap-3 min-w-0 text-left hover:bg-muted/50 p-2 -ml-2 rounded-lg transition-colors cursor-pointer"
      >
        <Avatar className="size-10 shrink-0">
          <AvatarImage src={ imgpresets.avatar( creatorAvatar ) } alt={ creatorDisplayName } />
          <AvatarFallback>{ creatorDisplayName.slice( 0, 2 ).toUpperCase() }</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="text-base font-medium text-foreground truncate hover:underline hover:text-primary cursor-pointer">
            <TextCapitalize>{ creatorDisplayName }</TextCapitalize>
          </p>
          <p className="text-sm text-muted-foreground truncate">
            { creatorSecondary }
          </p>
        </div>
      </button>

      { creatorProfile && (
        <CreatorDetailsSheet
          creator={ creatorProfile as any }
          open={ sheetOpen }
          onOpenChange={ setSheetOpen }
        />
      ) }
    </>
  );
} );
CreatorTrigger.displayName = 'CreatorTrigger';

const SubmissionDetailsSection = memo( ( { submission, locale, open }: { submission: ModelsVideoSubmissionResponse, locale: string, open: boolean; } ) => {
  const { data: gigResponse, isLoading: isGigLoading } = useGig(
    submission.gig_id || '',
    { enabled: !!submission.gig_id && open }
  );

  const gig = gigResponse?.data;
  const campaign = gig?.campaign;

  return (
    <>
      <div className="flex gap-x-20 gap-y-5 rounded-lg border border-border/60 bg-background/70 p-3 text-sm">
        { isGigLoading ? (
          <SubmissionCardSkeleton />
        ) : (
          <div className='grid md:flex md:flex-row space-y-3 space-x-3 w-full *:border-r *:last-of-type:border-r-0 *:md:max-w-1/3 overflow-x-auto'>
            <Row label="Campaign" value={
              <>{ ( campaign?.id || gig?.campaign_id ) ? (
                <Link
                  href={ `/${ locale }/campaigns/${ campaign?.id || gig?.campaign_id }` }
                  className="hover:underline hover:text-primary transition-colors inline-block font-normal text-sm"
                >
                  <TextCapitalize>{ campaign?.campaign_name || gig?.campaign_name || '—' }</TextCapitalize>
                </Link>
              ) : (
                <TextCapitalize>{ campaign?.campaign_name || gig?.campaign_name || '—' }</TextCapitalize>
              ) }</>
            } />
            <Row label='Gig' value={ <TextCapitalize>{ gig?.title || '—' }</TextCapitalize> } />
            <Row label="Status" value={ <Badge variant={ statusVariant[ submission.status || '' ] || 'secondary' } className="capitalize text-[11px]">
              { ( submission.status || 'unknown' ).replace( /_/g, ' ' ) }
            </Badge> } />

            { gig?.compensation?.value &&
              <Row label='Compensation' value={ <>{ formatCurrency( gig?.compensation?.value, 'EUR', locale ) }</> } />
            }
            { gig?.gig_cost?.value &&
              <Row label="Gig Cost" value={ <>{ formatCurrency( gig?.gig_cost?.value, 'EUR', locale ) }</> } />
            }
          </div>
        ) }
      </div>

      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <span>Submitted { formatDate( submission.created_at, locale ) }</span>
        { gig?.gig_status && (
          <span>Gig status: <span className="capitalize">{ gig.gig_status.replace( /_/g, ' ' ) }</span></span>
        ) }
      </div>
    </>
  );
} );
SubmissionDetailsSection.displayName = 'SubmissionDetailsSection';

const SubmissionActions = memo( ( { submission, onOpenChange }: { submission: ModelsVideoSubmissionResponse, onOpenChange: ( open: boolean ) => void; } ) => {
  const updateStatus = useUpdateVideoSubmissionStatus();
  const decisionMutation = useVideoSubmissionDecision();

  const [ comments, setComments ] = useState( "" );
  const [ returnDialogOpen, setReturnDialogOpen ] = useState( false );
  const [ rejectDialogOpen, setRejectDialogOpen ] = useState( false );

  const handleStatusUpdate = ( status: UtilsVideoSubmissionStatus, commentsToSubmit: string = "" ) => {
    updateStatus.mutate(
      {
        id: submission.id!,
        request: { status, comments: commentsToSubmit }
      },
      {
        onSuccess: () => {
          toast.success( `Submission ${ status.replace( 'STATUS_', '' ).toLowerCase() } successfully` );
          onOpenChange( false );
        },
        onError: ( err: any ) => {
          toast.error( "Failed to update submission status", {
            description: err.response?.data?.message || "Please try again later.",
            richColors: true,
          } );
        }
      }
    );
  };

  const handleDecisionUpdate = ( status: ModelsBrandVideoDecisionRequestStatusEnum, commentsToSubmit: string = "" ) => {
    decisionMutation.mutate(
      {
        id: submission.id!,
        data: { status, comments: commentsToSubmit }
      },
      {
        onSuccess: () => {
          toast.success( `Submission ${ status.toLowerCase() } successfully` );
          onOpenChange( false );
        },
        onError: ( err: any ) => {
          toast.error( "Failed to submit decision", {
            description: err.response?.data?.message || "Please try again later.",
            richColors: true,
          } );
        }
      }
    );
  };

  if ( submission.status !== 'pending_approval' && submission.status !== 'approved' ) {
    return null;
  }

  return (
    <>
      { submission.status === 'pending_approval' && (
        <RoleGuard allowedRoles={ [ 'admin' ] }>
          <div className="flex items-center gap-2 pt-2 border-t mt-4">
            <Button
              variant="default"
              disabled={ updateStatus.isPending }
              onClick={ () => handleStatusUpdate( UtilsVideoSubmissionStatus.VideoSubmissionStatusApproved ) }
            >
              { updateStatus.isPending && updateStatus.variables?.request.status === UtilsVideoSubmissionStatus.VideoSubmissionStatusApproved && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) }
              Approve Submission
            </Button>
            <Button
              variant="destructive"
              disabled={ updateStatus.isPending }
              onClick={ () => setReturnDialogOpen( true ) }
            >
              { updateStatus.isPending && updateStatus.variables?.request.status === UtilsVideoSubmissionStatus.VideoSubmissionStatusReturned && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) }
              Return Submission
            </Button>
          </div>
        </RoleGuard>
      ) }

      { submission.status === 'approved' && (
        <RoleGuard allowedRoles={ [ 'brand' ] }>
          <div className="flex items-center gap-2 pt-2 border-t mt-4">
            <Button
              variant="default"
              disabled={ decisionMutation.isPending }
              onClick={ () => handleDecisionUpdate( ModelsBrandVideoDecisionRequestStatusEnum.Accepted ) }
            >
              { decisionMutation.isPending && decisionMutation.variables?.data.status === ModelsBrandVideoDecisionRequestStatusEnum.Accepted && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) }
              Accept Submission
            </Button>
            <Button
              variant="destructive"
              disabled={ decisionMutation.isPending }
              onClick={ () => setRejectDialogOpen( true ) }
            >
              { decisionMutation.isPending && decisionMutation.variables?.data.status === ModelsBrandVideoDecisionRequestStatusEnum.Rejected && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) }
              Reject Submission
            </Button>
          </div>
        </RoleGuard>
      ) }

      <ConfirmDialog
        open={ returnDialogOpen }
        title="Return Submission to Creator"
        description="Are you sure you want to return this submission to the creator?"
        confirmLabel='Yes'
        cancelLabel='Cancel'
        onCancel={ () => { setReturnDialogOpen( false ); setComments( "" ); } }
        onOpenChange={ setReturnDialogOpen }
        onConfirm={ () => {
          handleStatusUpdate( UtilsVideoSubmissionStatus.VideoSubmissionStatusReturned, comments );
        } }
      >
        <SuperField
          type='textarea'
          label='Comments'
          value={ comments }
          onValueChange={ setComments }
        />
      </ConfirmDialog>

      <ConfirmDialog
        open={ rejectDialogOpen }
        title="Reject Submission"
        description="Are you sure you want to reject this submission?"
        confirmLabel='Reject'
        cancelLabel='Cancel'
        onCancel={ () => { setRejectDialogOpen( false ); setComments( "" ); } }
        onOpenChange={ setRejectDialogOpen }
        onConfirm={ () => {
          handleDecisionUpdate( ModelsBrandVideoDecisionRequestStatusEnum.Rejected, comments );
        } }
      >
        <SuperField
          type='textarea'
          label='Comments'
          value={ comments }
          onValueChange={ setComments }
        />
      </ConfirmDialog>
    </>
  );
} );
SubmissionActions.displayName = 'SubmissionActions';

const SubmissionCommentsPanel = memo( ( { isCommentsOpen, setIsCommentsOpen, commentEntities }: {
  isCommentsOpen: boolean;
  setIsCommentsOpen: ( v: boolean ) => void;
  commentEntities: any[];
} ) => (
  <div
    className={ cn(
      "bg-background flex-col transition-all duration-300 ease-in-out overflow-hidden flex absolute right-2 top-2 bottom-2 rounded-xl shadow-xl z-20 border",
      isCommentsOpen ? "w-[400px] max-w-[calc(100vw-32px)] opacity-100 translate-x-0" : "w-[400px] max-w-[calc(100vw-32px)] opacity-0 translate-x-8 pointer-events-none"
    ) }
  >
    <div className="p-4 border-b flex items-center justify-between shrink-0">
      <h3 className="font-primary text-lg text-primary font-normal">Comments</h3>
      <Button variant="ghost" size="icon" onClick={ () => setIsCommentsOpen( false ) } className="h-8 w-8 cursor-pointer">
        <X className="h-4 w-4" />
      </Button>
    </div>
    <div className="flex-1 min-h-0 relative bg-muted/10 p-4">
      { isCommentsOpen && (
        <div className="absolute inset-4">
          <CommentsThread
            entities={ commentEntities }
            postTo={ commentEntities[ 0 ] }
            size="sm"
          />
        </div>
      ) }
    </div>
  </div>
) );
SubmissionCommentsPanel.displayName = 'SubmissionCommentsPanel';

export const SubmissionViewDialog = memo( ( { open, onOpenChange, submission, initialCommentsOpen = false }: SubmissionViewDialogProps ) => {
  const locale = useLocale();
  const [ isCommentsOpen, setIsCommentsOpen ] = useState( initialCommentsOpen );

  useEffect( () => {
    if ( open ) {
      setIsCommentsOpen( initialCommentsOpen );
    }
  }, [ open, initialCommentsOpen ] );

  const commentsResults = useSubmissionComments( open ? submission.id : undefined );
  const commentCount = commentsResults.reduce( ( sum, r ) => sum + ( r.data?.data?.length ?? 0 ), 0 );

  const commentEntities = useMemo( () => open && submission.id ? [
    { entityType: UtilsEntityType.EntityTypeVideoSubmissionStatusUpdate, entityId: submission.id },
    { entityType: UtilsEntityType.EntityTypeBrandVideoDecision, entityId: submission.id },
  ] : [], [ open, submission.id ] );

  const handleToggleComments = useCallback( () => {
    setIsCommentsOpen( prev => !prev );
  }, [] );

  return (
    <Dialog open={ open } onOpenChange={ onOpenChange }>
      <DialogContent className="p-0 gap-0 overflow-hidden max-w-6xl! min-w-[300px] w-[95vw] bg-burgundy-50/80 max-h-[90vh] flex flex-row">
        <div className={ cn( "flex flex-col transition-all duration-300 ease-in-out overflow-y-auto w-full", isCommentsOpen && "md:pr-[416px]" ) }>
          <SubmissionVideo videoUrl={ submission.video?.asset || '' } poster={ submission.video?.thumbnail || '' } />

          <div className="p-4 border-t bg-muted/20 space-y-4 flex-1">
            <SubmissionHeader
              title={ submission.title || submission.video_filename || "Untitled Submission" }
              description={ submission.description }
              commentCount={ commentCount }
              isCommentsOpen={ isCommentsOpen }
              onToggleComments={ handleToggleComments }
            />

            <CreatorTrigger creatorProfile={ submission.creator } />

            <SubmissionDetailsSection submission={ submission } locale={ locale } open={ open } />

            <SubmissionActions submission={ submission } onOpenChange={ onOpenChange } />
          </div>
        </div>

        <SubmissionCommentsPanel
          isCommentsOpen={ isCommentsOpen }
          setIsCommentsOpen={ setIsCommentsOpen }
          commentEntities={ commentEntities }
        />
      </DialogContent>
    </Dialog>
  );
} );
