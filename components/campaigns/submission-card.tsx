"use client";

import { Avatar, AvatarFallback, AvatarImage } from '@/components/dashboard-ui/avatar';
import { Card, CardDescription, CardTitle } from '@/components/dashboard-ui/card';
import { ModelsVideoSubmissionResponse } from '@/lib/api/generated/models';
import { useSubmissionComments } from '@/lib/api/hooks/comments';
import { cn } from '@/lib/dashboard-utils';
import { formatDate } from '@/lib/utils/format';
import { imgpresets } from '@/lib/utils/imgproxy';
import { MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { TextCapitalize } from '../text-case';
import { SubmissionActionMenu } from './submission-action-menu';
import { SubmissionViewDialog } from './submission-view-dialog';
import { OverlayVideoPlayer } from './submission/overlay-video-player';
import { SubmissionStatusBadge } from './submission/submission-status-badge';
import { getCreatorLocationOrEmail, getCreatorName } from './submission/utils';

interface SubmissionCardProps {
  submission: ModelsVideoSubmissionResponse;
  showActions?: boolean;
  layout?: 'media-overlay' | 'mini';
  overlayDetailsMode?: 'hover' | 'always';
  onExpand?: () => void;
}

export function SubmissionCard( {
  submission,
  showActions = true,
  layout = 'media-overlay',
  overlayDetailsMode = 'hover',
  onExpand,
}: SubmissionCardProps ) {
  const t = useTranslations( 'dashboard.common' );
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
  const videoPoster = submission.video?.thumbnail ? imgpresets.banner( submission.video.thumbnail ) : undefined;
  return (
    <>
      <Card
        className={ cn(
          "submission-card",
          isMiniLayout && 'submission-card--mini'
        ) }
        onMouseEnter={ () => setIsHovering( true ) }
        onMouseLeave={ () => setIsHovering( false ) }
        onFocusCapture={ () => setIsHovering( true ) }
        onBlurCapture={ () => setIsHovering( false ) }
      >
        <OverlayVideoPlayer
          videoUrl={ submission.video?.asset }
          showControl={ showControl }
          compact={ isMiniLayout }
          onExpand={ handleExpand }
          commentCount={ commentCount }
          onCommentClick={ handleCommentClick }
          poster={ videoPoster }
        />

        <div className="submission-card__overlay" />

        { isMiniLayout && (
          <motion.div
            className="submission-card__status-overlay"
            initial={ false }
            animate={ showControl ? { opacity: 1, y: 0 } : { opacity: 0, y: -4 } }
            transition={ { duration: 0.2, ease: 'easeOut' } }
          >
            <SubmissionStatusBadge status={ status } compact />
          </motion.div>
        ) }

        <div className={ cn( "submission-card__content", isMiniLayout ? 'submission-card__content--mini' : 'submission-card__content--standard' ) }>
          <div className={ cn( "submission-card__footer", isMiniLayout ? 'gap-2' : 'gap-3', showControl ? 'items-start' : 'items-end' ) }>
            <motion.div
              layout
              initial={ false }
              transition={ { duration: 0.22, ease: 'easeOut' } }
              className="shrink-0"
            >
              <Avatar className={ isMiniLayout ? "size-6" : "size-8" }>
                <AvatarImage src={ imgpresets.avatar( submission.creator?.profile_image?.asset || '' ) } alt={ submission.creator?.first_name || '' } />
                <AvatarFallback>{ submission.creator?.first_name?.slice( 0, 2 ).toUpperCase() }</AvatarFallback>
              </Avatar>
            </motion.div>

            <div className="submission-card__creator-info">
              <div className={ cn( "submission-card__creator-header", isMiniLayout ? "mb-1" : "mb-2" ) }>
                <motion.div
                  className={ cn(
                    "min-w-0",
                    ( showControl || !isMiniLayout ) ? 'pointer-events-auto' : 'pointer-events-none'
                  ) }
                  initial={ false }
                  animate={ ( showControl || !isMiniLayout ) ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 } }
                  transition={ { duration: 0.2, ease: 'easeOut', delay: showControl ? 0.14 : 0.04 } }
                >
                  <p className={ cn( "submission-card__creator-name", isMiniLayout ? "text-[10px]" : "text-xs" ) }>
                    { creatorName }
                  </p>
                  { isMiniLayout ? (
                    <p className="submission-card__creator-meta">
                      { creatorLocationOrEmail } • { submittedDate }
                    </p>
                  ) : (
                    <div className="submission-card__creator-meta--standard">
                      <span className="truncate">{ creatorLocationOrEmail }</span>
                      <span className="shrink-0">•</span>
                      <span className="shrink-0 whitespace-nowrap">{ submittedDate }</span>
                    </div>
                  ) }
                </motion.div>
              </div>

              { !isMiniLayout && (
                <motion.div
                  className="submission-card__details"
                  initial={ false }
                  animate={ showControl
                    ? { opacity: 1, y: 0, height: 'auto' }
                    : { opacity: 0, y: 8, height: 0 } }
                  transition={ { duration: 0.2, ease: 'easeOut', delay: showControl ? 0.22 : 0.02 } }
                >
                  <div className="submission-card__details-footer">
                    <div className="min-w-0">
                      <CardTitle className="submission-card__title">
                        <TextCapitalize>{ submission.title || submission.video_filename || t( 'cards.untitledSubmission' ) }</TextCapitalize>
                      </CardTitle>
                      <CardDescription className="submission-card__description">
                        { submission.description || t( 'cards.noDescription' ) }
                      </CardDescription>
                    </div>
                    <div className="submission-card__actions">
                      {/* { commentCount > 0 && (
                        <div
                          role="button"
                          onClick={ ( e ) => {
                            e.stopPropagation();
                            handleCommentClick();
                          } }
                          className="submission-card__comments-badge"
                        >
                          <MessageSquare className="w-3 h-3" />
                          <span>{ commentCount }</span>
                        </div>
                      ) } */}
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
