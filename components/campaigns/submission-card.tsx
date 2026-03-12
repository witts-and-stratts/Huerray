"use client";

import { Avatar, AvatarFallback, AvatarImage } from '@/components/dashboard-ui/avatar';
import { Card, CardDescription, CardTitle } from '@/components/dashboard-ui/card';
import { ModelsVideoSubmissionResponse } from '@/lib/api/generated/models';
import { cn } from '@/lib/dashboard-utils';
import { formatDate } from '@/lib/utils/format';
import { ExpandIcon, PauseCircleFreeIcons, PlayCircle02FreeIcons } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { AnimatePresence, motion } from 'motion/react';
import { useRef, useState } from 'react';
import { TextCapitalize } from '../text-case';
import { SubmissionActionMenu } from './submission-action-menu';
import { SubmissionViewDialog } from './submission-view-dialog';
import { imgpresets } from '@/lib/utils/imgproxy';
import { useSubmissionComments } from '@/lib/api/hooks/comments';
import { MessageSquare } from 'lucide-react';


const submissionStatusClass: Record<string, string> = {
  submitted: 'bg-blue-500/10 text-blue-700 border-blue-500/20',
  pending: 'bg-amber-500/10 text-amber-700 border-amber-500/20',
  approved: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20',
  rejected: 'bg-red-500/10 text-red-700 border-red-500/20',
};

interface SubmissionCardProps {
  submission: ModelsVideoSubmissionResponse;
  showActions?: boolean;
  layout?: 'media-overlay' | 'mini';
  overlayDetailsMode?: 'hover' | 'always';
  onExpand?: () => void;
}

interface SubmissionStatusBadgeProps {
  status: string;
  compact?: boolean;
}

interface OverlayVideoPlayerProps {
  videoUrl?: string;
  showControl: boolean;
  compact?: boolean;
  onExpand?: () => void;
  commentCount?: number;
  onCommentClick?: () => void;
}

function getCreatorName( creator?: {
  first_name?: string;
  last_name?: string;
  email?: string;
} ) {
  return `${ creator?.first_name || '' } ${ creator?.last_name || '' }`.trim() || creator?.email || 'Unknown Creator';
}

function getCreatorLocationOrEmail( creator?: {
  city?: string;
  country?: string;
  email?: string;
} ) {
  const location = [ creator?.city, creator?.country ].filter( Boolean ).join( ', ' );
  return location || creator?.email || 'Unknown location';
}


function SubmissionStatusBadge( { status, compact = false }: SubmissionStatusBadgeProps ) {
  return (
    <span className={ cn(
      "inline-flex items-center gap-1.5 rounded-full font-medium border capitalize",
      compact ? "px-1 py-0 text-[9px]" : "px-2 py-0.5 text-[11px]",
      "invert",
      submissionStatusClass[ status ] || 'bg-gray-500/10 text-gray-700 border-gray-500/20'
    ) }>
      { status.replace( /_/g, ' ' ) }
    </span>
  );
}

function OverlayVideoPlayer( { videoUrl, showControl, compact = false, onExpand, commentCount, onCommentClick }: OverlayVideoPlayerProps ) {
  const videoRef = useRef<HTMLVideoElement>( null );
  const [ isPlaying, setIsPlaying ] = useState( false );

  const togglePlayback = () => {
    const node = videoRef.current;
    if ( !node ) return;

    if ( node.paused ) {
      void node.play();
      return;
    }

    node.pause();
  };

  if ( !videoUrl ) {
    return (
      <div className="flex h-56 w-full items-center justify-center bg-muted/20 text-xs text-muted-foreground">
        No video available
      </div>
    );
  }

  return (
    <div className="group relative aspect-video w-full">
      <video
        ref={ videoRef }
        src={ videoUrl }
        preload="metadata"
        playsInline
        className="w-full object-cover aspect-video"
        onPlay={ () => setIsPlaying( true ) }
        onPause={ () => setIsPlaying( false ) }
        onClick={ togglePlayback }
      />
      <AnimatePresence>
        <motion.button
          key="playback"
          type="button"
          onClick={ togglePlayback }
          className={ cn(
            "absolute z-10 inline-flex items-center justify-center rounded-full text-white",
            compact ? "right-2 top-2 size-6" : "right-3 top-3 size-8",
            showControl ? 'pointer-events-auto' : 'pointer-events-none'
          ) }
          aria-label={ isPlaying ? 'Pause video' : 'Play video' }
          initial={ { opacity: 0, scale: 0.9 } }
          whileHover={ { scale: 1.1 } }
          whileFocus={ { scale: 1.1 } }
          animate={ showControl ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 } }
          transition={ { duration: 0.6, ease: 'easeOut', delay: 0.1 } }
        >
          { isPlaying
            ? <HugeiconsIcon icon={ PauseCircleFreeIcons } className={ compact ? "size-6" : "size-8" } />
            : <HugeiconsIcon icon={ PlayCircle02FreeIcons } className={ compact ? "size-6" : "size-8" } /> }
        </motion.button>
        { onExpand && (
          <motion.button
            key="expand"
            type="button"
            onClick={ onExpand }
            className={ cn(
              "absolute z-10 inline-flex items-center justify-center rounded-full text-white",
              compact ? "right-2 top-8 size-7" : "right-3 top-13 size-8",
              showControl ? 'pointer-events-auto' : 'pointer-events-none'
            ) }
            aria-label="Expand"
            initial={ { opacity: 0, scale: 0.9 } }
            whileHover={ { scale: 1.1 } }
            whileFocus={ { scale: 1.1 } }
            animate={ showControl ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 } }
            transition={ { duration: 0.6, ease: 'easeOut', delay: 0.15 } }
          >
            <HugeiconsIcon icon={ ExpandIcon } className={ compact ? "size-5" : "size-7" } strokeWidth={ 1 } />
          </motion.button>
        ) }
        { !!commentCount && commentCount > 0 && (
          <motion.div
            key="comments"
            onClick={ ( e ) => {
              e.stopPropagation();
              onCommentClick?.();
            } }
            role="button"
            className={ cn(
              "absolute z-10 flex flex-col items-center justify-center rounded-full text-white bg-black/30 backdrop-blur-md border border-white/5 cursor-pointer hover:bg-black/50 transition-colors",
              compact ? "right-2 top-[64px] min-w-7 py-1 px-1" : "right-3 top-[92px] min-w-8 py-1 px-1",
              showControl ? 'pointer-events-auto' : 'pointer-events-none'
            ) }
            initial={ { opacity: 0, scale: 0.9 } }
            whileHover={ { scale: 1.05 } }
            animate={ showControl ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 } }
            transition={ { duration: 0.6, ease: 'easeOut', delay: 0.2 } }
          >
            <MessageSquare className={ compact ? "size-3" : "size-3.5" } />
            <span className={ cn( "font-medium mt-0.5 leading-none", compact ? "text-[8px]" : "text-[10px]" ) }>{ commentCount }</span>
          </motion.div>
        ) }
      </AnimatePresence>
    </div>
  );
}

export function SubmissionCard( {
  submission,
  showActions = true,
  layout = 'media-overlay',
  overlayDetailsMode = 'hover',
  onExpand,
}: SubmissionCardProps ) {
  const status = submission.status?.toLowerCase() || 'unknown';
  const creatorName = getCreatorName( submission.creator );
  const creatorLocationOrEmail = getCreatorLocationOrEmail( submission.creator );
  const submittedDate = formatDate( submission.created_at );
  const [ isHovering, setIsHovering ] = useState( false );
  const [ expandOpen, setExpandOpen ] = useState( false );
  const [ expandCommentsOpen, setExpandCommentsOpen ] = useState( false );
  const showControl = overlayDetailsMode === 'always' || isHovering;
  const isMiniLayout = layout === 'mini';
  const handleExpand = onExpand ?? ( () => setExpandOpen( true ) );

  const handleCommentClick = () => {
    if ( onExpand ) {
      // If controlled externally, we fall back to just expand
      onExpand();
    } else {
      setExpandCommentsOpen( true );
      setExpandOpen( true );
    }
  };

  const handleOpenChange = ( open: boolean ) => {
    setExpandOpen( open );
    if ( !open ) {
      // reset comments open state when closing
      setTimeout( () => setExpandCommentsOpen( false ), 300 );
    }
  };

  const commentsResults = useSubmissionComments( submission.id );
  const commentCount = commentsResults.reduce( ( sum, r ) => sum + ( r.data?.data?.length ?? 0 ), 0 );

  return (
    <>
      <Card
        className={ cn(
          "relative overflow-hidden border-border/60 bg-black p-0",
          isMiniLayout && 'max-w-[240px]'
        ) }
        onMouseEnter={ () => setIsHovering( true ) }
        onMouseLeave={ () => setIsHovering( false ) }
        onFocusCapture={ () => setIsHovering( true ) }
        onBlurCapture={ () => setIsHovering( false ) }
      >
        <OverlayVideoPlayer
          videoUrl={ submission.video_url }
          showControl={ showControl }
          compact={ isMiniLayout }
          onExpand={ handleExpand }
          commentCount={ commentCount }
          onCommentClick={ handleCommentClick }
        />

        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/90 via-black/45 to-transparent" />
        { isMiniLayout && (
          <motion.div
            className="absolute left-2 top-2 z-20 flex flex-col gap-1 items-start"
            initial={ false }
            animate={ showControl ? { opacity: 1, y: 0 } : { opacity: 0, y: -4 } }
            transition={ { duration: 0.2, ease: 'easeOut' } }
          >
            <SubmissionStatusBadge status={ status } compact />
          </motion.div>
        ) }

        <div className={ cn( "absolute inset-x-0 bottom-0 text-white", isMiniLayout ? 'p-2' : 'p-3' ) }>
          <div className={ cn( "flex justify-between", isMiniLayout ? 'gap-2' : 'gap-3', showControl ? 'items-start' : 'items-end' ) }>
            <motion.div
              layout
              initial={ false }
              transition={ { duration: 0.22, ease: 'easeOut' } }
              className="shrink-0"
            >
              <Avatar className={ isMiniLayout ? "size-6" : "size-8" }>
                <AvatarImage src={ imgpresets.avatar( submission.creator?.profile_image_url || '' ) } alt={ submission.creator?.first_name || '' } />
                <AvatarFallback>{ submission.creator?.first_name?.slice( 0, 2 ).toUpperCase() }</AvatarFallback>
              </Avatar>
            </motion.div>

            <div className="min-w-0 flex-1">
              <div className={ cn( "flex items-end justify-between gap-2", isMiniLayout ? "mb-1" : "mb-2" ) }>
                <motion.div
                  className={ cn(
                    "min-w-0",
                    ( showControl || !isMiniLayout ) ? 'pointer-events-auto' : 'pointer-events-none'
                  ) }
                  initial={ false }
                  animate={ ( showControl || !isMiniLayout ) ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 } }
                  transition={ { duration: 0.2, ease: 'easeOut', delay: showControl ? 0.14 : 0.04 } }
                >
                  <p className={ cn( "truncate text-burgundy-300", isMiniLayout ? "text-[10px]" : "text-xs" ) }>
                    { creatorName }
                  </p>
                  { isMiniLayout ? (
                    <p className="truncate text-[10px] text-white/65">
                      { creatorLocationOrEmail } • { submittedDate }
                    </p>
                  ) : (
                    <div className="mt-0.5 flex items-center gap-1 text-xs text-white/65">
                      <span className="truncate">{ creatorLocationOrEmail }</span>
                      <span className="shrink-0">•</span>
                      <span className="shrink-0 whitespace-nowrap">{ submittedDate }</span>
                    </div>
                  ) }
                </motion.div>
              </div>

              { !isMiniLayout && (
                <motion.div
                  className={ cn(
                    "min-w-0 overflow-hidden",
                    showControl ? 'pointer-events-auto' : 'pointer-events-none'
                  ) }
                  initial={ false }
                  animate={ showControl
                    ? { opacity: 1, y: 0, height: 'auto' }
                    : { opacity: 0, y: 8, height: 0 } }
                  transition={ { duration: 0.2, ease: 'easeOut', delay: showControl ? 0.22 : 0.02 } }
                >
                  <div className="flex items-end justify-between gap-2">
                    <div className="min-w-0">
                      <CardTitle className="truncate font-medium text-sm text-white">
                        <TextCapitalize>{ submission.title || submission.video_filename || 'Untitled Submission' }</TextCapitalize>
                      </CardTitle>
                      <CardDescription className="mt-0.5 line-clamp-1 text-xs text-white/75">
                        { submission.description || 'No description provided' }
                      </CardDescription>
                    </div>
                    <div className="flex shrink-0 items-end self-end gap-2">
                      { commentCount > 0 && (
                        <div
                          role="button"
                          onClick={ ( e ) => {
                            e.stopPropagation();
                            handleCommentClick();
                          } }
                          className="flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-medium bg-black/60 text-white rounded-full border border-white/10 backdrop-blur-md cursor-pointer hover:bg-black/80 transition-colors pointer-events-auto"
                        >
                          <MessageSquare className="w-3 h-3" />
                          <span>{ commentCount }</span>
                        </div>
                      ) }
                      <SubmissionStatusBadge status={ status } />
                      { showActions ? <SubmissionActionMenu submission={ submission } /> : null }
                    </div>
                  </div>
                </motion.div>
              ) }
            </div>
          </div>
        </div>
      </Card>

      <SubmissionViewDialog
        open={ expandOpen }
        onOpenChange={ handleOpenChange }
        submission={ submission }
        initialCommentsOpen={ expandCommentsOpen }
      />
    </>
  );
}
