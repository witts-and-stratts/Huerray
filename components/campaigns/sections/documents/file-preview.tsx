import { apiClient } from '@/lib/api/client';
import { Loader2 } from 'lucide-react';
import dynamic from 'next/dynamic';
import { memo, useEffect, useState } from 'react';
import { UploadedFile } from './types';

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
  const [ src, setSrc ] = useState<string | null>( null );
  const [ loading, setLoading ] = useState( false );
  const [ error, setError ] = useState<string | null>( null );

  useEffect( () => {
    let active = true;
    let objectUrl: string | null = null;

    const loadPreview = async () => {
      // 1. Local file preview (immediate)
      if ( item.file && !item.url ) {
        objectUrl = URL.createObjectURL( item.file );
        setSrc( objectUrl );
        return;
      }

      // 2. Existing local preview (for images usually)
      if ( item.preview && !item.url ) {
        setSrc( item.preview );
        return;
      }

      // 3. Remote URL - fetch with auth
      if ( item.url ) {
        setLoading( true );
        setError( null );
        try {
          const response = await apiClient.get( item.url, {
            responseType: 'blob'
          } );

          if ( active ) {
            objectUrl = URL.createObjectURL( response.data );
            setSrc( objectUrl );
          }
        } catch ( err: any ) {
          if ( active ) {
            console.error( "Preview fetch error", err );
            if ( err.response ) {
              if ( err.response.status === 401 ) {
                setError( "Session expired. Please refresh the page." );
              } else if ( err.response.status === 403 ) {
                setError( "You don't have permission to view this file." );
              } else if ( err.response.status === 404 ) {
                setError( "File not found." );
              } else {
                setError( `Failed to load preview (${ err.response.status }).` );
              }
            } else {
              setError( "Network error. Failed to load preview." );
            }
          }
        } finally {
          if ( active ) setLoading( false );
        }
      }
    };

    loadPreview();

    return () => {
      active = false;
      if ( objectUrl ) {
        URL.revokeObjectURL( objectUrl );
      }
    };
  }, [ item ] );

  const isPdf = item.type.includes( 'pdf' ) || item.name.toLowerCase().endsWith( '.pdf' );

  if ( loading && !src ) { // Only show full loader if we don't even have the src yet
    return (
      <div className="flex flex-col items-center justify-center h-full text-muted-foreground gap-2">
        <Loader2 className="animate-spin h-8 w-8" />
        <p>Loading preview...</p>
      </div>
    );
  }

  if ( error ) {
    return (
      <div className="flex items-center justify-center h-full text-destructive">
        <p>{ error }</p>
      </div>
    );
  }

  if ( !src ) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        <p>No preview available</p>
      </div>
    );
  }

  if ( item.type.startsWith( 'image/' ) ) {
    return (
      <img
        src={ src }
        alt={ item.name }
        className="max-w-full max-h-full object-contain shadow-sm rounded-sm"
      />
    );
  }

  if ( isPdf ) {
    return <PdfPreview src={ src } />;
  }

  return (
    <iframe
      src={ src }
      className="w-full h-full rounded-sm border bg-white -mt-4"
      title={ item.name }
    />
  );
} );
