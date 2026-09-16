"use client";

import { cn } from '@/lib/dashboard-utils';
import { PauseCircleFreeIcons, PlayCircle02FreeIcons, SquareArrowExpandIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { MessageSquare, RefreshCw } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { VideoWatermark } from '@/components/dashboard-ui/protected-video';

interface OverlayVideoPlayerProps {
  videoUrl?: string;
  showControl: boolean;
  compact?: boolean;
  onExpand?: () => void;
  commentCount?: number;
  onCommentClick?: () => void;
  poster?: string;
  fullHeight?: boolean;
  /** Harden the player + show the watermark. Disable once the brand has accepted. */
  isProtected?: boolean;
}

export function OverlayVideoPlayer( {
  videoUrl,
  showControl,
  compact = false,
  onExpand,
  commentCount,
  onCommentClick,
  poster,
  fullHeight = false,
  isProtected = true,
}: OverlayVideoPlayerProps ) {
  const t = useTranslations( 'dashboard.brand.submissionsPage.actions' );
  const videoRef = useRef<HTMLVideoElement>( null );
  const [ isPlaying, setIsPlaying ] = useState( false );
  const [ hasError, setHasError ] = useState( false );
  const togglePlayback = () => {
    const node = videoRef.current;
    if ( !node ) return;

    if ( node.paused ) {
      void node.play();
      return;
    }

    node.pause();
  };

  const handleExpand = () => {
    // Stop the tile's playback before handing off to the expanded view so
    // the two <video> elements never play simultaneously.
    videoRef.current?.pause();
    onExpand?.();
  };

  const handleRetry = () => {
    const node = videoRef.current;
    setHasError( false );
    // Reassigning src (rather than just calling load()) forces the browser
    // to re-issue the range request from scratch after a failed load.
    node?.load();
  };

  if ( !videoUrl ) {
    return (
      <div className={ cn( "submission-video-player__fallback", fullHeight && "h-full" ) }>
        { t( 'noVideoAvailable' ) }
      </div>
    );
  }

  return (
    <div className={ cn( "submission-video-player", fullHeight && "submission-video-player--full-height" ) }>
      <video
        ref={ videoRef }
        src={ videoUrl }
        preload="metadata"
        playsInline
        controlsList={ isProtected ? "nodownload noplaybackrate noremoteplayback" : undefined }
        disablePictureInPicture={ isProtected }
        draggable={ isProtected ? false : undefined }
        onContextMenu={ isProtected ? ( e ) => e.preventDefault() : undefined }
        className={ cn( "submission-video-player__media", fullHeight && "submission-video-player__media--full-height" ) }
        onPlay={ () => setIsPlaying( true ) }
        onPause={ () => setIsPlaying( false ) }
        onError={ () => setHasError( true ) }
        onClick={ togglePlayback }
        poster={ poster }
      />
      { isProtected && <VideoWatermark opacity={ compact ? 0.1 : 0.13 } /> }
      { hasError && (
        <div className="submission-video-player__error">
          <button type="button" onClick={ handleRetry } className="submission-video-player__retry" aria-label={ t( 'retryVideo' ) }>
            <RefreshCw className="size-5" />
          </button>
        </div>
      ) }
      <AnimatePresence>
        <motion.button
          key="playback"
          type="button"
          onClick={ togglePlayback }
          className={ cn(
            "submission-video-player__control",
            compact ? "submission-video-player__control--compact" : "submission-video-player__control--standard",
            showControl ? 'pointer-events-auto' : 'pointer-events-none'
          ) }
          aria-label={ isPlaying ? t( 'pauseVideo' ) : t( 'playVideo' ) }
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
            onClick={ handleExpand }
            className={ cn(
              "submission-video-player__expand",
              compact ? "submission-video-player__expand--compact" : "submission-video-player__expand--standard",
              showControl ? 'pointer-events-auto' : 'pointer-events-none'
            ) }
            aria-label={ t( 'expandVideo' ) }
            initial={ { opacity: 0, scale: 0.9 } }
            whileHover={ { scale: 1.1 } }
            whileFocus={ { scale: 1.1 } }
            animate={ showControl ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 } }
            transition={ { duration: 0.6, ease: 'easeOut', delay: 0.15 } }
          >
            <HugeiconsIcon icon={ SquareArrowExpandIcon } className={ compact ? "size-5" : "size-7" } strokeWidth={ 1 } />
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
              "submission-video-player__comments",
              compact ? "submission-video-player__comments--compact" : "submission-video-player__comments--standard",
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
