'use client';

import { Button } from '@/components/dashboard-ui/button';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import useMeasure from 'react-use-measure';

// Configure worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${ pdfjs.version }/build/pdf.worker.min.mjs`;

interface PdfPreviewProps {
  src: string;
}

export default function PdfPreview( { src }: PdfPreviewProps ) {
  const [ numPages, setNumPages ] = useState<number>( 0 );
  const [ pageNumber, setPageNumber ] = useState<number>( 1 );
  const [ pageDimensions, setPageDimensions ] = useState<{ width: number; height: number; } | null>( null );
  const [ ref, bounds ] = useMeasure();

  const onDocumentLoadSuccess = ( { numPages }: { numPages: number; } ) => {
    setNumPages( numPages );
  };

  return (
    <div className='flex flex-col items-center h-full w-full overflow-hidden'>
      <div ref={ ref } className='flex-1 overflow-auto w-full h-full flex justify-center p-4 bg-gray-100 rounded-md relative'>
        <Document
          file={ src }
          onLoadSuccess={ onDocumentLoadSuccess }
          loading={
            <div className="flex items-center gap-2 text-muted-foreground absolute inset-0 m-auto h-fit w-fit">
              <Loader2 className="animate-spin h-4 w-4" /> Loading PDF...
            </div>
          }
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
      { numPages > 1 && (
        <div className="flex items-center gap-4 py-1 mt-2 bg-background/95 backdrop-blur rounded-full px-1 shadow-sm border">
          <Button
            variant="outline"
            size="icon"
            disabled={ pageNumber <= 1 }
            onClick={ () => setPageNumber( p => p - 1 ) }
            className={ 'rounded-full' }
          >
            <ChevronLeft className='h-3 w-3' />
          </Button>
          <span className="text-xs font-medium">
            Page { pageNumber } of { numPages }
          </span>
          <Button
            variant="outline"
            size="icon"
            disabled={ pageNumber >= numPages }
            onClick={ () => setPageNumber( p => p + 1 ) }
            className={ 'rounded-full' }
          >
            <ChevronRight className='h-3 w-3' />
          </Button>
        </div>
      ) }
    </div>
  );
}
