'use client';

import { useEffect, useMemo, useRef, useState, memo } from 'react';
import { Dialog, DialogContent } from '@/components/dashboard-ui/dialog';
import { Button } from '@/components/dashboard-ui/button';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { Document, Page, pdfjs } from 'react-pdf';
import { AnimatePresence, motion, type Variants, type Easing } from 'motion/react';
import PdfPreview from '@/components/campaigns/sections/documents/pdf-preview';
import { imgpresets } from '@/lib/utils/imgproxy';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${ pdfjs.version }/build/pdf.worker.min.mjs`;

const MIN_PREVIEW_HEIGHT = 200;

type AnimationPreset = 'fade' | 'slide' | 'scale' | 'zoom' | 'none';

interface AnimationConfig {
  preset?: AnimationPreset;
  duration?: number;
  ease?: string | [ number, number, number, number ];
}

interface ImagePreviewDialogProps {
  items: string[];
  initialIndex: number | null;
  type: 'images' | 'documents';
  onOpenChange: ( open: boolean ) => void;
  animation?: AnimationConfig;
}

const PdfThumbnail = memo( ( { src }: { src: string; } ) => (
  <Document file={ { url: src } } loading={ null } error={ null }>
    <Page
      pageNumber={ 1 }
      width={ 40 }
      renderTextLayer={ false }
      renderAnnotationLayer={ false }
    />
  </Document>
) );

function buildVariants(
  preset: AnimationPreset,
  duration: number,
  ease?: AnimationConfig[ 'ease' ],
): Variants {
  const t = ease ? { duration, ease: ease as Easing } : { duration };

  switch ( preset ) {
    case 'scale':
      return {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1, transition: t },
        exit: { opacity: 0, scale: 0.95, transition: t },
      };

    case 'zoom':
      return {
        initial: { opacity: 0, scale: 0.85 },
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

export function ImagePreviewDialog( {
  items,
  initialIndex,
  type,
  onOpenChange,
  animation,
}: ImagePreviewDialogProps ) {
  const open = initialIndex !== null;

  const [ index, setIndex ] = useState( initialIndex ?? 0 );
  const [ loadedSet, setLoadedSet ] = useState<Set<number>>( () => new Set() );
  const [ height, setHeight ] = useState<number | undefined>();

  const wrapperRef = useRef<HTMLDivElement>( null );
  const directionRef = useRef<1 | -1>( 1 );
  /** Natural dimensions for each loaded slide, keyed by slide index. */
  const sizesRef = useRef<Map<number, { w: number; h: number }>>( new Map() );

  const current = items[ index ];
  const isPdf = current?.toLowerCase().endsWith( '.pdf' );

  const duration = animation?.duration ?? 0.25;
  const ease = animation?.ease;

  const variants = useMemo(
    () => buildVariants( animation?.preset ?? 'fade', duration, ease ),
    [ animation?.preset, duration, ease ],
  );

  const heightTransition = {
    duration: duration * 1.4,
    ease: ( ease ?? [ 0.4, 0, 0.2, 1 ] ) as Easing,
  };

  useEffect( () => {
    if ( initialIndex !== null ) setIndex( initialIndex );
  }, [ initialIndex ] );

  /**
   * Compute height for the current slide whenever the index changes or a new
   * image finishes loading. Because this runs after React commits, `index` is
   * always the final, correct value — no race with onLoad from exiting slides.
   */
  useEffect( () => {
    if ( type !== 'images' || !wrapperRef.current ) return;

    const size = sizesRef.current.get( index );
    if ( !size ) return;

    const containerW = wrapperRef.current.clientWidth;
    const maxH = window.innerHeight * 0.75;
    const h = Math.min( ( size.h / size.w ) * containerW, maxH );

    setHeight( Math.round( h ) );
  }, [ index, loadedSet, type ] );

  /** Preload nearby images */
  useEffect( () => {
    if ( type !== 'images' ) return;

    const preload = ( src?: string ) => {
      if ( !src ) return;
      const img = new Image();
      img.src = imgpresets.large( src );
    };

    preload( items[ index ] );
    preload( items[ index + 1 ] );
    preload( items[ index - 1 ] );
  }, [ index, items, type ] );

  function prev() {
    directionRef.current = -1;
    setIndex( ( i ) => ( i - 1 + items.length ) % items.length );
  }

  function next() {
    directionRef.current = 1;
    setIndex( ( i ) => ( i + 1 ) % items.length );
  }

  function goTo( i: number ) {
    directionRef.current = i >= index ? 1 : -1;
    setIndex( i );
  }

  function handleKeyDown( e: React.KeyboardEvent ) {
    if ( e.key === 'ArrowLeft' ) prev();
    if ( e.key === 'ArrowRight' ) next();
  }

  if ( !current ) return null;

  return (
    <Dialog open={ open } onOpenChange={ onOpenChange }>
      <DialogContent
        className="max-w-4xl p-0 overflow-hidden gap-0 outline-none"
        showCloseButton
        onKeyDown={ handleKeyDown }
      >
        <motion.div
          ref={ wrapperRef }
          className="relative overflow-hidden bg-black/5"
          style={ { minHeight: MIN_PREVIEW_HEIGHT } }
          animate={ { height: type === 'documents' ? '75vh' : ( height ?? 'auto' ) } }
          transition={ heightTransition }
        >
          {/* layout container */ }
          <div className="relative flex items-center justify-center w-full h-full pointer-events-none">
            <AnimatePresence initial={ false } custom={ directionRef.current }>
              <motion.div
                key={ `${ current }-${ index }` }
                custom={ directionRef.current }
                variants={ variants }
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute inset-0 flex items-center justify-center"
              >
                { type === 'images' ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */ }
                    <img
                      src={ imgpresets.large( current ) }
                      alt={ `Asset ${ index + 1 }` }
                      className="max-h-[75vh] w-full object-contain"
                      onLoad={ ( ( slideIndex ) => ( e: React.SyntheticEvent<HTMLImageElement> ) => {
                        const img = e.currentTarget;
                        sizesRef.current.set( slideIndex, { w: img.naturalWidth, h: img.naturalHeight } );
                        setLoadedSet( ( prev ) => new Set( [ ...prev, slideIndex ] ) );
                      } )( index ) }
                    />

                    { !loadedSet.has( index ) && (
                      <div className="absolute inset-0 flex items-center justify-center bg-background/60">
                        <div className="size-7 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                      </div>
                    ) }
                  </>
                ) : isPdf ? (
                  <div className="w-full h-[75vh] pointer-events-auto">
                    { open && <PdfPreview src={ current } /> }
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3 py-20">
                    <p className="text-sm text-muted-foreground">
                      Preview not available
                    </p>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={ () =>
                        window.open( current, '_blank', 'noopener,noreferrer' )
                      }
                    >
                      <ExternalLink className="size-4 mr-1.5" />
                      Open file
                    </Button>
                  </div>
                ) }
              </motion.div>
            </AnimatePresence>
          </div>

          { items.length > 1 && (
            <>
              <motion.div
                whileTap={ { scale: 0.88 } }
                transition={ { duration: 0.1 } }
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10"
              >
                <Button
                  aria-label="Previous image"
                  variant="ghost"
                  size="icon-sm"
                  onClick={ prev }
                  className="bg-background/80 hover:bg-background active:translate-y-0"
                >
                  <ChevronLeft className="size-5" />
                </Button>
              </motion.div>

              <motion.div
                whileTap={ { scale: 0.88 } }
                transition={ { duration: 0.1 } }
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10"
              >
                <Button
                  aria-label="Next image"
                  variant="ghost"
                  size="icon-sm"
                  onClick={ next }
                  className="bg-background/80 hover:bg-background active:translate-y-0"
                >
                  <ChevronRight className="size-5" />
                </Button>
              </motion.div>
            </>
          ) }
        </motion.div>

        { items.length > 1 && (
          <div className="flex flex-col items-center gap-2 px-4 py-3 border-t bg-background">
            <p className="text-xs text-muted-foreground">
              { index + 1 } / { items.length }
            </p>

            <div className="flex gap-1.5 overflow-x-auto max-w-full pb-1">
              { items.map( ( item, i ) => (
                <button
                  key={ `${ item }-${ i }` }
                  type="button"
                  onClick={ () => goTo( i ) }
                  className={ `shrink-0 size-10 rounded border-2 overflow-hidden transition-all ${ i === index
                    ? 'border-primary'
                    : 'border-transparent opacity-50 hover:opacity-80'
                    }` }
                >
                  { type === 'images' ? (
                    <img
                      src={ imgpresets.thumbnail( item ) }
                      alt={ `Thumb ${ i + 1 }` }
                      className="size-full object-cover"
                    />
                  ) : (
                    <div className="size-full overflow-hidden flex items-center justify-center bg-muted/40">
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
