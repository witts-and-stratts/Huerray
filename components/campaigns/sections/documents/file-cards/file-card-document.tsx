/* eslint-disable @typescript-eslint/no-explicit-any */
import { UploadApiFactory } from '@/lib/api/generated/api/upload-api';
import { File01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { memo, useCallback, useRef, useState, useMemo } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Loader2 } from 'lucide-react';
import { PdfFileIcon } from '../pdf-file-icon';
import { BaseFileCard } from './base-file-card';
import { FileCardProps } from './file-card-types';
import { useFileUpload } from './use-file-upload';
import { useAnimateActivity } from '@/components/ui/animate-activity';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${ pdfjs.version }/build/pdf.worker.min.mjs`;

export const pdfCoverCache = new Map<string, string>();

export const FileCardDocument = memo( ( props: FileCardProps ) => {
  const { item, onUploadSuccess, onUploadError, isOverlay, showTitle } = props;

  const uploadFn = useCallback( ( api: ReturnType<typeof UploadApiFactory>, file: File, onProgress: ( e: any ) => void, signal: AbortSignal ) =>
    api.uploadsDocumentsPost( { documents: file }, { headers: { 'Content-Type': undefined } as any, onUploadProgress: onProgress, signal } ),
    [] );

  const progress = useFileUpload( item, isOverlay, onUploadSuccess, onUploadError, uploadFn );

  const { phase } = useAnimateActivity();
  const isPdf = item.type.includes( 'pdf' ) || item.name.toLowerCase().endsWith( '.pdf' );

  const cacheKey = item.url || item.id;
  const [ cachedCover, setCachedCover ] = useState<string | null>( pdfCoverCache.get( cacheKey ) || item.preview || item.thumbnail || null );
  const canvasRef = useRef<HTMLCanvasElement>( null );

  const pdfFile = useMemo( () => {
    if ( item.url ) return { url: item.url, withCredentials: true };
    if ( item.file ) return item.file;
    return null;
  }, [ item.url, item.file ] );

  const onRenderSuccess = () => {
    if ( canvasRef.current && !pdfCoverCache.has( cacheKey ) ) {
      try {
        const dataUrl = canvasRef.current.toDataURL( 'image/jpeg', 0.7 );
        pdfCoverCache.set( cacheKey, dataUrl );
        setCachedCover( dataUrl );
      } catch ( e ) {
        console.warn( 'Failed to cache PDF cover', e );
      }
    }
  };

  return (
    <BaseFileCard { ...props } progress={ progress } showTitle={ showTitle } onSelect={ ( id ) => props.onSelect?.( id, false ) }>
      { isPdf && pdfFile ? (
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden w-full h-full p-2 pointer-events-none">
          { cachedCover ? (
            <img
              src={ cachedCover }
              alt={ item.name }
              className="w-full h-full object-contain opacity-95 group-hover:opacity-100 transition-opacity drop-shadow-sm"
            />
          ) : phase !== 'hidden' ? (
            <Document
              file={ pdfFile }
              loading={ <Loader2 className="size-8 animate-spin text-muted-foreground" /> }
              error={ <PdfFileIcon className="text-muted-foreground w-10! h-10!" /> }
              className="flex items-center justify-center w-full h-full"
            >
              <Page
                pageNumber={ 1 }
                width={ 140 }
                renderTextLayer={ false }
                renderAnnotationLayer={ false }
                className="opacity-95 group-hover:opacity-100 transition-opacity"
                canvasRef={ canvasRef }
                onRenderSuccess={ onRenderSuccess }
                onRenderError={ () => { } }
                loading={ <Loader2 className="size-8 animate-spin text-muted-foreground" /> }
              />
            </Document>
          ) : null }
          <div className="absolute bottom-1 right-2 bg-background/80 backdrop-blur-md rounded-sm p-1 border shadow-xs">
            <PdfFileIcon className="text-primary size-4" />
          </div>
        </div>
      ) : (
        <HugeiconsIcon icon={ File01Icon } className="text-muted-foreground" />
      ) }
    </BaseFileCard>
  );
} );

FileCardDocument.displayName = 'FileCardDocument';
