'use client';

import { Button } from '@/components/dashboard-ui/button';
import { ChevronLeft, ChevronRight, Download, Loader2 } from 'lucide-react';
import { useState, useEffect, useEffectEvent, useCallback, useMemo, useTransition } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import useMeasure from 'react-use-measure';

// Configure worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${ pdfjs.version }/build/pdf.worker.min.mjs`;

interface PdfPreviewProps {
  src: string;
  thumbnail?: string;
}

export default function PdfPreview( { src, thumbnail }: PdfPreviewProps ) {
  const [ numPages, setNumPages ] = useState<number>( 0 );
  const [ pageNumber, setPageNumber ] = useState<number>( 1 );
  const [ isPending, startTransition ] = useTransition();

  const handleDownload = () => {
    startTransition( async () => {
      try {
        const response = await fetch( src, { credentials: 'include' } );
        const blob = await response.blob();
        const url = URL.createObjectURL( blob );
        const a = document.createElement( 'a' );
        a.href = url;
        a.download = src.split( '/' ).pop()?.split( '?' )[ 0 ] || 'document.pdf';
        document.body.appendChild( a );
        a.click();
        document.body.removeChild( a );
        URL.revokeObjectURL( url );
      } catch {
        window.open( src, '_blank', 'noopener,noreferrer' );
      }
    } );
  };
  const [ pageDimensions, setPageDimensions ] = useState<{ width: number; height: number; } | null>( null );
  const [ ref, bounds ] = useMeasure();

  const onDocumentLoadSuccess = ( { numPages }: { numPages: number; } ) => {
    setNumPages( numPages );
  };

  const pdfFile = useMemo( () => ( { url: src, withCredentials: true } ), [ src ] );

  const goToPrevPage = useCallback( () => {
    setPageNumber( p => Math.max( 1, p - 1 ) );
  }, [] );

  const goToNextPage = useCallback( () => {
    setPageNumber( p => Math.min( numPages, p + 1 ) );
  }, [ numPages ] );
  const handleKeyDown = useEffectEvent( ( e: KeyboardEvent ) => {
    if (
      document.activeElement?.tagName === 'INPUT' ||
      document.activeElement?.tagName === 'TEXTAREA' ||
      ( document.activeElement as HTMLElement )?.isContentEditable
    ) {
      return;
    }

    if ( e.altKey || e.ctrlKey || e.metaKey || e.shiftKey ) {
      return;
    }

    if ( e.key === 'ArrowLeft' ) {
      if ( pageNumber > 1 ) {
        e.preventDefault();
        e.stopPropagation();
        goToPrevPage();
      }
    } else if ( e.key === 'ArrowRight' ) {
      if ( pageNumber < numPages ) {
        e.preventDefault();
        e.stopPropagation();
        goToNextPage();
      }
    }
  } );

  useEffect( () => {
    window.addEventListener( 'keydown', handleKeyDown, { capture: true } );
    return () => window.removeEventListener( 'keydown', handleKeyDown, { capture: true } );
  }, [] );

  const isLoading = numPages === 0;
  // pageReady becomes true once the first page canvas has been painted
  const [ pageReady, setPageReady ] = useState( false );

  return (
    <div className='flex flex-col items-center h-full w-full overflow-hidden'>
      <div ref={ ref } className='flex-1 overflow-auto w-full h-full flex justify-center p-4 bg-gray-100 rounded-md relative'>

        { /* Blurred thumbnail — fades out once the PDF page has rendered */ }
        { thumbnail && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={ thumbnail }
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none rounded-md"
            style={ {
              filter: 'blur(6px)',
              opacity: pageReady ? 0 : 0.3,
              transition: 'opacity 0.5s ease',
            } }
          />
        ) }

        { /* Spinner shown while document is parsing */ }
        { isLoading && (
          <div className="flex items-center gap-2 text-muted-foreground absolute inset-0 m-auto h-fit w-fit z-10">
            <Loader2 className="animate-spin h-4 w-4" /> Loading PDF...
          </div>
        ) }

        { /* PDF content fades in once first page renders */ }
        <div
          className='flex items-center justify-center w-full h-full'
          style={ {
            opacity: pageReady ? 1 : 0,
            transition: 'opacity 0.45s ease',
          } }
        >
          <Document
            file={ pdfFile }
            onLoadSuccess={ onDocumentLoadSuccess }
            loading={ null }
            error={
              <div className="text-destructive absolute inset-0 m-auto h-fit w-fit">Failed to load PDF.</div>
            }
            className='flex items-center justify-center'
          >
            { bounds.height > 0 && bounds.width > 0 && (
              <Page
                pageNumber={ pageNumber }
                renderTextLayer={ false }
                renderAnnotationLayer={ false }
                className="shadow-md"
                onLoadSuccess={ ( page ) => {
                  setPageDimensions( { width: page.originalWidth, height: page.originalHeight } );
                } }
                onRenderSuccess={ () => setPageReady( true ) }
                { ...( () => {
                  if ( !pageDimensions ) return { height: bounds.height - 32 };

                  const containerRatio = ( bounds.width - 32 ) / ( bounds.height - 32 );
                  const pageRatio = pageDimensions.width / pageDimensions.height;

                  if ( pageRatio > containerRatio ) {
                    // Page is wider relative to container -> fit by width
                    return { width: bounds.width - 32 };
                  } else {
                    // Page is taller relative to container -> fit by height
                    return { height: bounds.height - 32 };
                  }
                } )() }
              />
            ) }
          </Document>
        </div>
      </div>
      { numPages > 0 && (
        <div className="flex items-center gap-2 py-1 my-3 bg-background/95 backdrop-blur rounded-full px-1 shadow-sm border">
          { numPages > 1 && (
            <>
              <Button
                variant="outline"
                size="icon"
                disabled={ pageNumber <= 1 }
                onClick={ () => setPageNumber( p => p - 1 ) }
                className="rounded-full"
              >
                <ChevronLeft className='h-3 w-3' />
              </Button>
              <span className="text-xs font-medium px-2">
                Page { pageNumber } of { numPages }
              </span>
              <Button
                variant="outline"
                size="icon"
                disabled={ pageNumber >= numPages }
                onClick={ () => setPageNumber( p => p + 1 ) }
                className="rounded-full"
              >
                <ChevronRight className='h-3 w-3' />
              </Button>
              <div className="w-px h-4 bg-border mx-1" />
            </>
          ) }
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={ handleDownload }
            disabled={ isPending }
          >
            { isPending ? <Loader2 className="h-3 w-3 animate-spin" /> : <Download className="h-3 w-3" /> }
            <span className="sr-only">Download PDF</span>
          </Button>
        </div>
      ) }
    </div>
  );
}
