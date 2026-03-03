/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiClient, apiConfiguration, BASE_URL } from '@/lib/api/client';
import { UploadApiFactory } from '@/lib/api/generated/api/upload-api';
import { ModelsUploadsImagePost200Response } from '@/lib/api/models/models-uploads-image-post200-response';
import { File01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { memo, useEffect, useRef, useState, useMemo } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Loader2 } from 'lucide-react';
import { PdfFileIcon } from '../pdf-file-icon';
import { BaseFileCard } from './base-file-card';
import { FileCardProps } from './file-card-types';
import { useAnimateActivity } from '@/components/ui/animate-activity';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${ pdfjs.version }/build/pdf.worker.min.mjs`;

const pdfCoverCache = new Map<string, string>();

export const FileCardDocument = memo( ( props: FileCardProps ) => {
  const { item, onUploadSuccess, onUploadError, isOverlay } = props;
  const [ progress, setProgress ] = useState( 0 );

  useEffect( () => {
    if ( !isOverlay && item.status === 'uploading' && item.file && !item.url ) {
      queueMicrotask( () => setProgress( 0 ) );
      const uploadFile = async () => {
        try {
          const uploadApi = UploadApiFactory( apiConfiguration, undefined, apiClient );

          let localMaxProgress = 0;
          const onProgress = ( progressEvent: any ) => {
            const percentCompleted = Math.round( ( progressEvent.loaded * 100 ) / ( progressEvent.total || 100 ) );
            localMaxProgress = Math.max( localMaxProgress, percentCompleted );
            setProgress( localMaxProgress );
          };

          const response = await uploadApi.uploadsDocumentsPost( { documents: item.file! }, {
            headers: { 'Content-Type': undefined } as any,
            onUploadProgress: onProgress
          } ) as unknown as ModelsUploadsImagePost200Response;

          const uploadedFile = response.data.data[ 0 ] as any;
          if ( uploadedFile && uploadedFile.url ) {
            // Use the URL directly from the API response
            const fullUrl = uploadedFile.url.startsWith( 'http' )
              ? uploadedFile.url
              : `${ BASE_URL.replace( '/api/v1', '' ) }${ uploadedFile.url }`;
            onUploadSuccess( item.id, fullUrl );
          } else {
            onUploadError( item.id, new Error( 'No file url returned' ), item.name );
          }
        } catch ( error ) {
          onUploadError( item.id, error, item.name );
        }
      };
      uploadFile();
    }
  }, [ item.status, item.file, item.url, item.id, onUploadSuccess, onUploadError, isOverlay ] );

  const { phase } = useAnimateActivity();
  const isPdf = item.type.includes( 'pdf' ) || item.name.toLowerCase().endsWith( '.pdf' );

  // Caching mechanism for PDF page rendering
  const cacheKey = item.url || item.id;
  const [ cachedCover, setCachedCover ] = useState<string | null>( pdfCoverCache.get( cacheKey ) || null );
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
    <BaseFileCard { ...props } progress={ progress }>
      { isPdf && pdfFile ? (
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden w-full h-full p-2 pointer-events-none mb-10 pt-4">
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

