"use client";

import { cn } from '@/lib/dashboard-utils';
import { PauseCircleFreeIcons, PlayCircle02FreeIcons, SquareArrowExpandIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { MessageSquare } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

interface OverlayVideoPlayerProps {
  videoUrl?: string;
  showControl: boolean;
  compact?: boolean;
  onExpand?: () => void;
  commentCount?: number;
  onCommentClick?: () => void;
  poster?: string;
}

export function OverlayVideoPlayer( {
  videoUrl,
  showControl,
  compact = false,
  onExpand,
  commentCount,
  onCommentClick,
  poster,
}: OverlayVideoPlayerProps ) {
  const t = useTranslations( 'dashboard.brand.submissionsPage.actions' );
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
      <div className="submission-video-player__fallback">
        { t( 'noVideoAvailable' ) }
      </div>
    );
  }

  return (
    <div className="submission-video-player">
      <video
        ref={ videoRef }
        src={ videoUrl }
        preload="metadata"
        playsInline
        className="submission-video-player__media"
        onPlay={ () => setIsPlaying( true ) }
        onPause={ () => setIsPlaying( false ) }
        onClick={ togglePlayback }
        poster={ poster }
      />
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
            onClick={ onExpand }
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
