import { memo, useEffect, useState } from 'react';
import { UploadedFile } from './types';
import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';
import { Media } from './media';

const PdfPreview = dynamic( () => import( './pdf-preview' ), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full text-muted-foreground gap-2">
      <Loader2 className="animate-spin h-8 w-8" />
      <p>Loading PDF viewer...</p>
    </div>
  ),
} );

export const FilePreview = memo( ( { item }: { item: UploadedFile; } ) => {
  const [ objectUrl, setObjectUrl ] = useState<string | null>( null );

  const isPdf = item.type.includes( 'pdf' ) || item.name.toLowerCase().endsWith( '.pdf' );

  useEffect( () => {
    let active = true;
    let currentUrl: string | null = null;

    const prepareUrl = async () => {
      // 1. Local file objects - create blob URL
      if ( item.file ) {
        currentUrl = URL.createObjectURL( item.file );
        setObjectUrl( currentUrl );
        return;
      }

      // 2. Remote URLs - use directly (backend handles auth via cookies)
      if ( item.url ) {
        setObjectUrl( item.url );
        return;
      }

      // 3. Fallback to preview if available
      if ( item.preview ) {
        setObjectUrl( item.preview );
      }
    };

    prepareUrl();

    return () => {
      active = false;
      if ( currentUrl && currentUrl.startsWith( 'blob:' ) ) {
        URL.revokeObjectURL( currentUrl );
      }
    };
  }, [ item, isPdf ] );

  if ( !objectUrl ) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        <p>No preview available</p>
      </div>
    );
  }

  if ( item.type.startsWith( 'image/' ) ) {
    return (
      <Media
        url={ objectUrl }
        alt={ item.name }
        className="max-w-full max-h-full object-contain shadow-sm rounded-sm"
        type="image"
      />
    );
  }

  if ( item.type.startsWith( 'video/' ) ) {
    return (
      <Media
        url={ objectUrl }
        alt={ item.name }
        className="max-w-full max-h-full object-contain shadow-sm rounded-sm"
        type="video"
      />
    );
  }

  if ( isPdf ) {
    return <PdfPreview src={ objectUrl } />;
  }

  return (
    <iframe
      src={ objectUrl }
      className="w-full h-full rounded-sm border bg-white -mt-4"
      title={ item.name }
    />
  );
} );
