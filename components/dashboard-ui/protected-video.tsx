'use client';

import { cn } from '@/lib/dashboard-utils';
import { forwardRef, useCallback, type CSSProperties, type MouseEvent, type VideoHTMLAttributes } from 'react';

/**
 * ProtectedVideo / VideoWatermark
 *
 * Client-side deterrents for video previews shown to brands before a submission
 * has been accepted:
 *
 *  - blocks the right-click context menu ("Save video as…")
 *  - removes the download button, playback-rate menu and remote-playback from
 *    the native controls (`controlsList`)
 *  - disables Picture-in-Picture and dragging the frame out
 *  - overlays a tiled, semi-transparent HUERRAY watermark so leaked screen
 *    recordings are visibly marked
 *
 * Pass `protected={false}` once the brand has accepted the submission — the
 * video then renders unhardened and without a watermark, and the caller should
 * also surface an explicit download button.
 *
 * NOTE: none of this is real access control. The underlying file URL is still
 * reachable by anyone technical. The authoritative fix is server-side: only
 * hand a playable/signed video URL to brands that have accepted the submission.
 */

const WATERMARK_TILE = ( text: string ) =>
  `data:image/svg+xml,${ encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="150">` +
    `<text x="0" y="90" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="700" letter-spacing="8" fill="#ffffff">${ text }</text>` +
    `</svg>`
  ) }`;

interface VideoWatermarkProps {
  /** Watermark label. Defaults to "HUERRAY". */
  text?: string;
  /** Overlay opacity (0-1). Defaults to 0.13. */
  opacity?: number;
  className?: string;
}

/**
 * Standalone tiled watermark overlay. Drop it inside a `position: relative`
 * container that also holds a `<video>` — used by players that render their own
 * `<video>` element (e.g. custom controls).
 */
export function VideoWatermark( { text = 'HUERRAY', opacity = 0.13, className }: VideoWatermarkProps ) {
  return (
    <div
      aria-hidden="true"
      className={ cn(
        'pointer-events-none absolute inset-0 z-[5] select-none overflow-hidden',
        className
      ) }
    >
      <div
        className="absolute -inset-1/2"
        style={ {
          backgroundImage: `url("${ WATERMARK_TILE( text ) }")`,
          backgroundRepeat: 'repeat',
          transform: 'rotate(-24deg)',
          opacity,
        } }
      />
    </div>
  );
}

export interface ProtectedVideoProps extends VideoHTMLAttributes<HTMLVideoElement> {
  /** className for the wrapping element (sizing / positioning lives here). */
  containerClassName?: string;
  /**
   * Apply the download deterrents + watermark. Defaults to true.
   * Set to false once the brand has accepted the submission.
   */
  protected?: boolean;
  /** Render the tiled watermark overlay. Defaults to `protected`. */
  watermark?: boolean;
  /** Watermark label. Defaults to "HUERRAY". */
  watermarkText?: string;
  /** Watermark opacity (0-1). Defaults to 0.13. */
  watermarkOpacity?: number;
  containerStyle?: CSSProperties;
}

const HARDENED_CONTROLS_LIST = 'nodownload noplaybackrate noremoteplayback';

/**
 * Drop-in replacement for `<video>` that applies the download deterrents and
 * (by default) a tiled watermark. Move sizing classes to `containerClassName`
 * and keep object-fit classes on `className`.
 */
export const ProtectedVideo = forwardRef<HTMLVideoElement, ProtectedVideoProps>( function ProtectedVideo(
  {
    containerClassName,
    containerStyle,
    protected: isProtected = true,
    watermark,
    watermarkText,
    watermarkOpacity,
    className,
    controlsList,
    onContextMenu,
    onDragStart,
    ...videoProps
  },
  ref
) {
  const handleContextMenu = useCallback(
    ( event: MouseEvent<HTMLVideoElement> ) => {
      if ( isProtected ) event.preventDefault();
      onContextMenu?.( event );
    },
    [ isProtected, onContextMenu ]
  );

  const handleDragStart = useCallback(
    ( event: React.DragEvent<HTMLVideoElement> ) => {
      if ( isProtected ) event.preventDefault();
      onDragStart?.( event );
    },
    [ isProtected, onDragStart ]
  );

  const showWatermark = watermark ?? isProtected;

  const mergedControlsList = isProtected
    ? ( controlsList ? `${ HARDENED_CONTROLS_LIST } ${ controlsList }` : HARDENED_CONTROLS_LIST )
    : controlsList;

  return (
    <div className={ cn( 'relative overflow-hidden', containerClassName ) } style={ containerStyle }>
      <video
        ref={ ref }
        { ...videoProps }
        className={ className }
        controlsList={ mergedControlsList }
        disablePictureInPicture={ isProtected }
        draggable={ isProtected ? false : undefined }
        onContextMenu={ handleContextMenu }
        onDragStart={ handleDragStart }
      />
      { showWatermark && <VideoWatermark text={ watermarkText } opacity={ watermarkOpacity } /> }
    </div>
  );
} );
