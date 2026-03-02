import { cn } from '@/lib/dashboard-utils';
import { File01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { memo, useMemo, useRef, useState } from 'react';
import { PdfFileIcon } from '../pdf-file-icon';
import { Document, Page, pdfjs } from 'react-pdf';
import { Loader2 } from 'lucide-react';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${ pdfjs.version }/build/pdf.worker.min.mjs`;

interface ReadOnlyDocumentCardProps {
  url: string;
  name: string;
  onPreview?: () => void;
}

const pdfCoverCache = new Map<string, string>();

export const ReadOnlyDocumentCard = memo( ( { url, name, onPreview }: ReadOnlyDocumentCardProps ) => {
  const isPdf = url.toLowerCase().endsWith( '.pdf' ) || name.toLowerCase().endsWith( '.pdf' );

  const pdfFile = useMemo( () => ( { url, withCredentials: true } ), [ url ] );

  const [ cachedCover, setCachedCover ] = useState<string | null>( pdfCoverCache.get( url ) || null );
  const canvasRef = useRef<HTMLCanvasElement>( null );

  const onRenderSuccess = () => {
    if ( canvasRef.current && !pdfCoverCache.has( url ) ) {
      try {
        const dataUrl = canvasRef.current.toDataURL( 'image/jpeg', 0.7 );
        pdfCoverCache.set( url, dataUrl );
        setCachedCover( dataUrl );
      } catch ( e ) {
        // Tainted canvas due to cross-origin policies, ignore caching
        console.warn( 'Failed to cache PDF cover', e );
      }
    }
  };

  return (
    <div
      className={ cn(
        "group bg-primary/2 border rounded-sm flex flex-col items-center gap-1 select-none transition-colors p-4 aspect-3/4 relative justify-center cursor-pointer hover:border-primary/30 hover:bg-primary/5"
      ) }
      onDoubleClick={ ( e ) => {
        e.stopPropagation();
        onPreview?.();
      } }
      title={ name }
    >
      <div className="flex-1 bg-muted/30 rounded-lg flex flex-col items-center justify-center overflow-hidden w-full relative h-full min-h-0">
        { isPdf ? (
          <>
            { cachedCover ? (
              <img
                src={ cachedCover }
                alt={ name }
                className="w-full h-full object-contain pointer-events-none opacity-95 group-hover:opacity-100 transition-opacity drop-shadow-sm"
              />
            ) : (
              <Document
                file={ pdfFile }
                loading={ <Loader2 className="size-8 animate-spin text-muted-foreground" /> }
                error={ <PdfFileIcon className="text-muted-foreground w-10! h-10!" /> }
                className="flex items-center justify-center w-full h-full pointer-events-none"
              >
                <Page
                  pageNumber={ 1 }
                  width={ 140 }
                  renderTextLayer={ false }
                  renderAnnotationLayer={ false }
                  className="opacity-95 group-hover:opacity-100 transition-opacity"
                  canvasRef={ canvasRef }
                  onRenderSuccess={ onRenderSuccess }
                  loading={ <Loader2 className="size-8 animate-spin text-muted-foreground" /> }
                />
              </Document>
            ) }
            <div className="absolute bottom-1 right-1 bg-background/80 backdrop-blur-md rounded-full p-1 border shadow-xs">
              <PdfFileIcon className="text-primary size-4" />
            </div>
          </>
        ) : (
          <HugeiconsIcon icon={ File01Icon } className="text-muted-foreground size-8" />
        ) }
      </div>
    </div>
  );
} );

ReadOnlyDocumentCard.displayName = 'ReadOnlyDocumentCard';
