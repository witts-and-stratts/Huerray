'use client';

import { useEffect, useMemo, useRef, useState, memo } from 'react';
import dynamic from 'next/dynamic';
import { Loader2, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/dashboard-ui/dialog';
import { Button } from '@/components/dashboard-ui/button';
import { Document, Page, pdfjs } from 'react-pdf';
import { AnimatePresence, motion, type Variants, type Easing } from 'motion/react';
import { imgpresets } from '@/lib/utils/imgproxy';
import { cn } from '@/lib/utils';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${ pdfjs.version }/build/pdf.worker.min.mjs`;

const MIN_PREVIEW_HEIGHT = 200;

type AnimationPreset = 'fade' | 'slide' | 'scale' | 'zoom' | 'none';

export interface AnimationConfig {
  preset?: AnimationPreset;
  duration?: number;
  ease?: string | [ number, number, number, number ];
}

export interface MediaItem {
  url: string;
  thumbnail?: string;
  name?: string;
  type?: string; // MIME type hint e.g. 'image/jpeg', 'video/mp4', 'application/pdf'
}

const PdfPreview = dynamic( () => import( './sections/documents/pdf-preview' ), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full text-muted-foreground gap-2">
      <Loader2 className="animate-spin h-8 w-8" />
      <p>Loading PDF viewer...</p>
    </div>
  ),
} );

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
PdfThumbnail.displayName = 'PdfThumbnail';

function getMediaKind( item: MediaItem ): 'image' | 'video' | 'pdf' | 'unknown' {
  if ( item.type ) {
    if ( item.type.startsWith( 'image/' ) ) return 'image';
    if ( item.type.startsWith( 'video/' ) ) return 'video';
    if ( item.type.includes( 'pdf' ) ) return 'pdf';
  }
  const url = item.url.toLowerCase().split( '?' )[ 0 ];
  if ( url.endsWith( '.pdf' ) ) return 'pdf';
  if ( /\.(mp4|webm|ogg|mov)$/.test( url ) ) return 'video';
  if ( /\.(jpe?g|png|gif|webp|svg|avif)$/.test( url ) ) return 'image';
  return 'unknown';
}

function resolveImageUrl( url: string ): string {
  if ( url.startsWith( 'blob:' ) || url.startsWith( 'data:' ) ) return url;
  return imgpresets.large( url );
}

function resolveThumbnailUrl( url: string ): string {
  if ( url.startsWith( 'blob:' ) || url.startsWith( 'data:' ) ) return url;
  return imgpresets.thumbnail( url );
}

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

interface MediaPreviewProps {
  items: MediaItem[];
  initialIndex?: number | null;
  onOpenChange: ( open: boolean ) => void;
  animation?: AnimationConfig;
}

export function MediaPreview( { items, initialIndex, onOpenChange, animation }: MediaPreviewProps ) {
  const open = initialIndex != null;
  const single = items.length <= 1;

  const [ index, setIndex ] = useState( initialIndex ?? 0 );
  const [ loadedSet, setLoadedSet ] = useState<Set<number>>( () => new Set() );
  const [ height, setHeight ] = useState<number | undefined>();

  const wrapperRef = useRef<HTMLDivElement>( null );
  const directionRef = useRef<1 | -1>( 1 );
  const sizesRef = useRef<Map<number, { w: number; h: number; }>>( new Map() );

  const current = items[ index ];
  const kind = current ? getMediaKind( current ) : 'unknown';

  const duration = animation?.duration ?? 0.25;
  const ease = animation?.ease;

  // For videos, use 'none' preset to avoid scale animations
  const effectivePreset = kind === 'video' ? 'none' : ( animation?.preset ?? 'fade' );

  const variants = useMemo(
    () => buildVariants( effectivePreset, duration, ease ),
    [ effectivePreset, duration, ease ],
  );

  const heightTransition = {
    duration: duration * 1.4,
    ease: ( ease ?? [ 0.4, 0, 0.2, 1 ] ) as Easing,
  };

  useEffect( () => {
    if ( initialIndex != null ) setIndex( initialIndex );
  }, [ initialIndex ] );

  // Auto-height for images in multi-item mode
  useEffect( () => {
    if ( single || kind !== 'image' || !wrapperRef.current ) return;
    const size = sizesRef.current.get( index );
    if ( !size ) return;
    const containerW = wrapperRef.current.clientWidth;
    const maxH = window.innerHeight * 0.75;
    setHeight( Math.round( Math.min( ( size.h / size.w ) * containerW, maxH ) ) );
  }, [ index, loadedSet, kind, single ] );

  // Preload nearby images in multi-item mode
  useEffect( () => {
    if ( single || kind !== 'image' ) return;
    const preload = ( url?: string ) => {
      if ( !url ) return;
      const img = new Image();
      img.src = resolveImageUrl( url );
    };
    preload( items[ index ]?.url );
    preload( items[ index + 1 ]?.url );
    preload( items[ index - 1 ]?.url );
  }, [ index, items, kind, single ] );

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

  // Single-item mode — matches PreviewDialog UX
  if ( single ) {
    return (
      <Dialog open={ open } onOpenChange={ onOpenChange } modal>
        <DialogContent className="w-full md:w-[1000px] md:max-w-none h-[80vh] p-0 overflow-hidden flex flex-col bg-background/95 backdrop-blur-sm gap-0">
          { current.name && (
            <DialogHeader className="p-4 border-b shrink-0 flex flex-row items-center justify-between">
              <DialogTitle className="truncate pr-8 text-h6! font-primary font-normal text-muted-foreground/78">
                { current.name }
              </DialogTitle>
            </DialogHeader>
          ) }
          <div className="flex-1 overflow-hidden relative bg-muted/20 flex items-center justify-center p-4">
            { kind === 'image' && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={ resolveImageUrl( current.url ) }
                alt={ current.name ?? '' }
                className="max-w-full max-h-full object-contain shadow-sm rounded-sm"
              />
            ) }
            { kind === 'video' && (
              <video
                src={ current.url }
                preload='metadata'
                className="max-w-full max-h-full object-contain shadow-sm rounded-sm"
                controls
                autoPlay
                playsInline
              />
            ) }
            { kind === 'pdf' && open && <PdfPreview src={ current.url } /> }
            { kind === 'unknown' && (
              <iframe
                src={ current.url }
                className="w-full h-full rounded-sm border bg-white -mt-4"
                title={ current.name }
              />
            ) }
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Multi-item mode — matches ImagePreviewDialog UX
  const isDocOrVideo = kind === 'pdf' || kind === 'video' || kind === 'unknown';

  return (
    <Dialog open={ open } onOpenChange={ onOpenChange }>
      <DialogContent
        className="max-w-4xl p-0 overflow-hidden gap-0 outline-none"
        showCloseButton
        onKeyDown={ handleKeyDown }
      >
        <motion.div
          ref={ wrapperRef }
          className={ cn(
            'relative overflow-hidden bg-black/5',
            isDocOrVideo ? 'h-[75vh]' : ''
          ) }
          style={ !isDocOrVideo ? { minHeight: MIN_PREVIEW_HEIGHT } : undefined }
          animate={ isDocOrVideo ? {} : { height: height ?? 'auto' } }
          transition={ heightTransition }
        >
          <div className="relative flex items-center justify-center w-full h-full pointer-events-none">
            <AnimatePresence initial={ false } custom={ directionRef.current }>
              <motion.div
                key={ `${ current.url }-${ index }` }
                custom={ directionRef.current }
                variants={ variants }
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute inset-0 flex items-center justify-center"
              >
                { kind === 'video' ? (
                  <div className="w-full h-full flex items-center justify-center pointer-events-auto">
                    <video
                      // ref={ videoRef }
                      key={ current.url }
                      src={ current.url }
                      className="w-full h-full object-contain"
                      controls
                      autoPlay
                      playsInline
                    />
                  </div>
                ) : kind === 'image' ? (
                  <>
                    { /* eslint-disable-next-line @next/next/no-img-element */ }
                    <img
                      src={ resolveImageUrl( current.url ) }
                      alt={ current.name ?? `Asset ${ index + 1 }` }
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
                ) : kind === 'pdf' ? (
                  <div className="w-full h-[75vh] pointer-events-auto">
                    { open && <PdfPreview src={ current.url } /> }
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3 py-20">
                    <p className="text-sm text-muted-foreground">Preview not available</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={ () => window.open( current.url, '_blank', 'noopener,noreferrer' ) }
                    >
                      <ExternalLink className="size-4 mr-1.5" />
                      Open file
                    </Button>
                  </div>
                ) }
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.div
            whileTap={ { scale: 0.88 } }
            transition={ { duration: 0.1 } }
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10"
          >
            <Button
              aria-label="Previous"
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
              aria-label="Next"
              variant="ghost"
              size="icon-sm"
              onClick={ next }
              className="bg-background/80 hover:bg-background active:translate-y-0"
            >
              <ChevronRight className="size-5" />
            </Button>
          </motion.div>
        </motion.div>

        <div className="flex flex-col items-center gap-2 px-4 py-3 border-t bg-background">
          <p className="text-xs text-muted-foreground">{ index + 1 } / { items.length }</p>
          <div className="flex gap-1.5 overflow-x-auto max-w-full pb-1">
            { items.map( ( item, i ) => {
              const itemKind = getMediaKind( item );
              return (
                <button
                  key={ `${ item.url }-${ i }` }
                  type="button"
                  onClick={ () => goTo( i ) }
                  className={ `shrink-0 size-10 rounded border-2 overflow-hidden transition-all ${ i === index
                    ? 'border-primary'
                    : 'border-transparent opacity-50 hover:opacity-80'
                    }` }
                >
                  { itemKind === 'image' ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={ resolveThumbnailUrl( item.thumbnail ?? item.url ) }
                      alt={ `Thumb ${ i + 1 }` }
                      className="size-full object-cover"
                    />
                  ) : itemKind === 'video' ? (
                    <div className="size-full overflow-hidden flex items-center justify-center bg-black/60 relative">
                      { item.thumbnail ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={ resolveThumbnailUrl( item.thumbnail ) } alt="" className="size-full object-cover" />
                      ) : (
                        <video src={ item.url } className="size-full object-cover" muted preload="metadata" />
                      ) }
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="size-4 rounded-full bg-white/80 flex items-center justify-center">
                          <div className="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[6px] border-l-black/70 ml-0.5" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="size-full overflow-hidden flex items-center justify-center bg-muted/40">
                      <PdfThumbnail src={ item.url } />
                    </div>
                  ) }
                </button>
              );
            } ) }
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
