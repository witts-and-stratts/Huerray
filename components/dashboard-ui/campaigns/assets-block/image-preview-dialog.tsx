'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Dialog, DialogContent } from '@/components/dashboard-ui/dialog';
import { Button } from '@/components/dashboard-ui/button';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import PdfPreview from '@/components/campaigns/sections/documents/pdf-preview';
import { Document, Page, pdfjs } from 'react-pdf';
import { AnimatePresence, motion, type Variants, type Easing } from 'motion/react';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${ pdfjs.version }/build/pdf.worker.min.mjs`;

function PdfThumbnail( { src }: { src: string; } ) {
  return (
    <Document file={ { url: src } } loading={ null } error={ null }>
      <Page
        pageNumber={ 1 }
        width={ 40 }
        renderTextLayer={ false }
        renderAnnotationLayer={ false }
      />
    </Document>
  );
}

// ---------------------------------------------------------------------------
// Animation types
// ---------------------------------------------------------------------------

export type AnimationPreset = 'fade' | 'slide' | 'scale' | 'zoom' | 'none';

export interface AnimationConfig {
  /** Named animation style. Defaults to 'fade'. */
  preset?: AnimationPreset;
  /** Transition duration in seconds. Defaults to 0.25. */
  duration?: number;
  /** Framer Motion easing. Accepts a named easing string or a cubic-bezier array. */
  ease?: string | [ number, number, number, number ];
}

const SLIDE_DISTANCE = 50;

function buildVariants(
  preset: AnimationPreset,
  duration: number,
  ease: AnimationConfig[ 'ease' ],
): Variants {
  const t = ease ? { duration, ease: ease as Easing } : { duration };

  switch ( preset ) {
    case 'slide':
      return {
        // direction is passed as `custom` — positive = next, negative = prev
        initial: ( dir: 1 | -1 ) => ( { opacity: 0, x: dir * SLIDE_DISTANCE } ),
        animate: { opacity: 1, x: 0, transition: t },
        exit: ( dir: 1 | -1 ) => ( { opacity: 0, x: dir * -SLIDE_DISTANCE, transition: t } ),
      };
    case 'scale':
      return {
        initial: { opacity: 0, scale: 0.92 },
        animate: { opacity: 1, scale: 1, transition: t },
        exit: { opacity: 0, scale: 0.92, transition: t },
      };
    case 'zoom':
      return {
        initial: { opacity: 0, scale: 0.75 },
        animate: { opacity: 1, scale: 1, transition: t },
        exit: { opacity: 0, scale: 1.1, transition: t },
      };
    case 'none':
      return { initial: {}, animate: {}, exit: {} };
    case 'fade':
    default:
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: t },
        exit: { opacity: 0, transition: t },
      };
  }
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface ImagePreviewDialogProps {
  items: string[];
  initialIndex: number | null;
  type: 'images' | 'documents';
  onOpenChange: ( open: boolean ) => void;
  /** Animation preset and/or parameter overrides. */
  animation?: AnimationConfig;
}

export function ImagePreviewDialog( {
  items,
  initialIndex,
  type,
  onOpenChange,
  animation,
}: ImagePreviewDialogProps ) {
  const open = initialIndex !== null;
  const [ index, setIndex ] = useState( initialIndex ?? 0 );
  const [ contentHeight, setContentHeight ] = useState<number | undefined>( undefined );
  const contentRef = useRef<HTMLDivElement | null>( null );
  const directionRef = useRef<1 | -1>( 1 );
  const preloadedRef = useRef<Set<string>>( new Set() );
  const [ imgReady, setImgReady ] = useState( false );
  const [ showSpinner, setShowSpinner ] = useState( false );

  useEffect( () => {
    if ( initialIndex !== null ) setIndex( initialIndex );
  }, [ initialIndex ] );

  // Preload all images into browser cache when the dialog opens
  useEffect( () => {
    if ( !open || type !== 'images' ) return;
    items.forEach( ( src ) => {
      if ( preloadedRef.current.has( src ) ) return;
      preloadedRef.current.add( src );
      const img = new Image();
      img.src = src;
    } );
  }, [ open, items, type ] );

  // Reset ready state when the displayed image changes
  useEffect( () => {
    if ( type !== 'images' ) return;
    setImgReady( false );
  }, [ index, type ] );

  // Only show a spinner after 150 ms — avoids flashing for cached images
  useEffect( () => {
    if ( imgReady ) { setShowSpinner( false ); return; }
    const timer = setTimeout( () => setShowSpinner( true ), 150 );
    return () => clearTimeout( timer );
  }, [ imgReady ] );

  const current = items[ index ];
  const isPdf = current?.toLowerCase().endsWith( '.pdf' );

  const preset = animation?.preset ?? 'fade';
  const duration = animation?.duration ?? 0.25;
  const ease = animation?.ease;
  const variants = buildVariants( preset, duration, ease );
  const heightTransition = {
    duration: ( animation?.duration ?? 0.35 ) * 1.4,
    ease: ( ease ?? [ 0.4, 0, 0.2, 1 ] ) as Easing,
  };

  // Measure content height whenever content changes or loads
  const measureHeight = useCallback( () => {
    if ( contentRef.current ) {
      setContentHeight( contentRef.current.scrollHeight );
    }
  }, [] );

  const prev = () => {
    directionRef.current = -1;
    setIndex( ( i ) => ( i - 1 + items.length ) % items.length );
  };
  const next = () => {
    directionRef.current = 1;
    setIndex( ( i ) => ( i + 1 ) % items.length );
  };
  const goTo = ( i: number ) => {
    directionRef.current = i >= index ? 1 : -1;
    setIndex( i );
  };

  function handleKeyDown( e: React.KeyboardEvent ) {
    // When a PDF is open, PdfPreview owns ArrowLeft/ArrowRight for page navigation
    if ( type === 'documents' && isPdf ) return;
    if ( e.key === 'ArrowLeft' ) prev();
    else if ( e.key === 'ArrowRight' ) next();
  }

  return (
    <Dialog open={ open } onOpenChange={ onOpenChange }>
      <DialogContent
        className="max-w-4xl p-0 overflow-hidden gap-0 outline-none"
        showCloseButton
        onKeyDown={ handleKeyDown }
      >
        {/* Height-animating wrapper */ }
        <motion.div
          className="relative overflow-hidden bg-black/5"
          animate={ { height: contentHeight ?? 'auto' } }
          transition={ heightTransition }
        >
          <AnimatePresence mode="popLayout" initial={ false } custom={ directionRef.current }>
            <motion.div
              ref={ contentRef }
              key={ current }
              custom={ directionRef.current }
              variants={ variants }
              initial="initial"
              animate="animate"
              exit="exit"
              className="relative flex items-center justify-center"
              onAnimationComplete={ type !== 'images' ? measureHeight : undefined }
            >
              { type === 'images' ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */ }
                  <img
                    src={ current }
                    alt={ `Asset ${ index + 1 }` }
                    className="max-h-[75vh] w-full object-contain"
                    onLoad={ () => { setImgReady( true ); measureHeight(); } }
                  />
                  { showSpinner && !imgReady && (
                    <div className="absolute inset-0 flex items-center justify-center bg-background/60">
                      <div className="size-7 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                    </div>
                  ) }
                </>
              ) : isPdf ? (
                <div className="w-full h-[75vh]">
                  { open && <PdfPreview src={ current } /> }
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3 py-20">
                  <p className="text-sm text-muted-foreground">Preview not available</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={ () => window.open( current, '_blank', 'noopener,noreferrer' ) }
                  >
                    <ExternalLink className="size-4 mr-1.5" /> Open file
                  </Button>
                </div>
              ) }
            </motion.div>
          </AnimatePresence>

          {/* Nav buttons live outside AnimatePresence so they don't flicker */ }
          { items.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={ prev }
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background"
              >
                <ChevronLeft className="size-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={ next }
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background"
              >
                <ChevronRight className="size-5" />
              </Button>
            </>
          ) }
        </motion.div>


        {/* Thumbnail strip + counter */ }
        { items.length > 1 && (
          <div className="flex flex-col items-center gap-2 px-4 py-3 border-t bg-background">
            <p className="text-xs text-muted-foreground">{ index + 1 } / { items.length }</p>
            <div className="flex gap-1.5 overflow-x-auto max-w-full pb-1">
              { items.map( ( item, i ) => (
                <button
                  key={ i }
                  type="button"
                  onClick={ () => goTo( i ) }
                  className={ `shrink-0 size-10 rounded border-2 overflow-hidden transition-all ${ i === index ? 'border-primary' : 'border-transparent opacity-50 hover:opacity-80' }` }
                >
                  { type === 'images' ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={ item } alt={ `Thumb ${ i + 1 }` } className="size-full object-cover" />
                  ) : (
                    <div className="size-full overflow-hidden flex items-center justify-center bg-muted/40 [&_.react-pdf\_\_Page\_\_canvas]:!w-full [&_.react-pdf\_\_Page\_\_canvas]:!h-auto">
                      <PdfThumbnail src={ item } />
                    </div>
                  ) }
                </button>
              ) ) }
            </div>
          </div>
        ) }
      </DialogContent>
    </Dialog>
  );
}
