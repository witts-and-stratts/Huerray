import { closestCenter, DragEndEvent, DragStartEvent, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { ALL_FORMATS, BlobSource, CanvasSink, Input } from 'mediabunny';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import { UploadedFile } from './types';

// Generate a unique ID for file items
function generateUniqueId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
}

function getMimeTypeFromUrl( url: string ): string {
  const extension = url.split( '.' ).pop()?.toLowerCase();
  switch ( extension ) {
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'gif':
      return 'image/gif';
    case 'webp':
      return 'image/webp';
    case 'svg':
      return 'image/svg+xml';
    case 'mp4':
      return 'video/mp4';
    case 'mov':
      return 'video/quicktime';
    case 'webm':
      return 'video/webm';
    case 'pdf':
      return 'application/pdf';
    default:
      return '';
  }
}

export function useCampaignFiles( initialItems: UploadedFile[] | string[] = [] ) {
  const [ items, setItems ] = useState<UploadedFile[]>( () => {
    if ( initialItems.length > 0 && typeof initialItems[ 0 ] === 'string' ) {
      return ( initialItems as string[] ).map( url => ( {
        id: generateUniqueId(),
        url,
        status: 'success' as const,
        name: url.split( '/' ).pop() || 'File',
        type: getMimeTypeFromUrl( url ),
        preview: url
      } ) );
    }
    return initialItems as UploadedFile[];
  } );
  const [ activeId, setActiveId ] = useState<string | null>( null );

  const sensors = useSensors(
    useSensor( PointerSensor, {
      activationConstraint: {
        distance: 5 // drag after 5px travel
      }
    } ),
    useSensor( KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    } )
  );

  const handleDragStart = useCallback( ( event: DragStartEvent ) => {
    setActiveId( event.active.id as string );
  }, [] );

  const handleDragEnd = useCallback( ( event: DragEndEvent ) => {
    const { active, over } = event;

    if ( active.id !== over?.id ) {
      setItems( ( items ) => {
        const oldIndex = items.findIndex( ( item ) => item.id === active.id );
        const newIndex = items.findIndex( ( item ) => item.id === over?.id );

        return arrayMove( items, oldIndex, newIndex );
      } );
    }

    setActiveId( null );
  }, [] );

  const handleDrop = useCallback( async ( files: File[] ) => {
    const newItems: UploadedFile[] = await Promise.all( files.map( async ( file ) => {
      let preview: string | undefined = undefined;
      if ( file.type.startsWith( 'image/' ) ) {
        preview = await new Promise<string>( ( resolve ) => {
          const reader = new FileReader();
          reader.onload = ( e ) => resolve( e.target?.result as string );
          reader.readAsDataURL( file );
        } );
      } else if ( file.type.startsWith( 'video/' ) ) {
        try {
          const source = new BlobSource( file );
          const input = new Input( {
            source,
            formats: ALL_FORMATS,
          } );
          const videoTrack = await input.getPrimaryVideoTrack();
          if ( videoTrack && await videoTrack.canDecode() ) {
            const width = 320;
            const sink = new CanvasSink( videoTrack, { width } );
            const result = await sink.getCanvas( 0 ); // Get first frame
            if ( result ) {
              preview = (result.canvas as HTMLCanvasElement).toDataURL();
            }
          }
        } catch ( e ) {
          console.error( "Failed to generate video thumbnail", e );
        }
      }

      return {
        id: generateUniqueId(),
        file,
        url: '',
        status: 'uploading' as const,
        preview,
        name: file.name,
        type: file.type
      };
    } ) );

    setItems( prev => [ ...prev, ...newItems ] );
  }, [] );

  const handleRemove = useCallback( ( id: string ) => {
    setItems( prev => prev.filter( i => i.id !== id ) );
  }, [] );

  const handleDropError = useCallback( ( error: Error ) => {
    console.error( error );
    toast.error( error.message );
  }, [] );

  const handleUploadSuccess = useCallback( ( id: string, url: string ) => {
    setItems( prev => prev.map( i => i.id === id ? { ...i, status: 'success', url } : i ) );
  }, [] );

  const handleUploadError = useCallback( ( id: string, error: any, name?: string ) => {
    setItems( prev => prev.map( i => i.id === id ? { ...i, status: 'error' } : i ) );
    toast.error( `Upload failed for ${ name || 'file' }; ${ error?.message || 'Unknown error' }` );
  }, [] );

  const handleRetry = useCallback( ( id: string ) => {
    setItems( prev => prev.map( i => i.id === id ? { ...i, status: 'uploading' } : i ) );
  }, [] );

  const addImportedItem = useCallback( async ( url: string ) => {
    try {
      const response = await fetch( url );
      const blob = await response.blob();
      const urlObj = new URL( url );
      const name = urlObj.pathname.split( '/' ).pop() || 'Imported File';
      const file = new File( [ blob ], name, { type: blob.type } );
      
      let preview: string | undefined = undefined;
      if (file.type.startsWith('image/')) {
          preview = URL.createObjectURL(file);
      } else if (file.type.startsWith('video/')) {
          try {
            const source = new BlobSource( file );
            const input = new Input( {
              source,
              formats: ALL_FORMATS,
            } );
            const videoTrack = await input.getPrimaryVideoTrack();
            if ( videoTrack && await videoTrack.canDecode() ) {
              const width = 320;
              const sink = new CanvasSink( videoTrack, { width } );
              const result = await sink.getCanvas( 0 ); // Get first frame
              if ( result ) {
                preview = (result.canvas as HTMLCanvasElement).toDataURL();
              }
            }
          } catch ( e ) {
            console.error( "Failed to generate video thumbnail for imported file", e );
          }
      }

      const newItem: UploadedFile = {
        id: generateUniqueId(),
        file,
        url: '',
        status: 'uploading',
        name: name,
        type: file.type,
        preview
      };

      setItems( prev => [ ...prev, newItem ] );
    } catch ( error ) {
      console.error( "Import failed", error );
      toast.error( "Failed to import file. Please check the URL and CORS settings." );
    }
  }, [] );



  const setItemsFromUrls = useCallback( ( urls: string[] ) => {
    setItems( prev => {
      // Create a map of existing items by URL for efficient lookup
      const existingMap = new Map( prev.filter( i => i.url ).map( i => [ i.url, i ] ) );
      
      const newItems: UploadedFile[] = urls.map( url => {
        // If we already have this file by URL, keep it (to preserve local state like 'file' object or preview)
        if ( existingMap.has( url ) ) {
          return existingMap.get( url )!;
        }
        
        // Otherwise create a new stub for the restored URL
        const name = url.split( '/' ).pop() || 'Restored File';
        const type = getMimeTypeFromUrl( url );
        return {
          id: generateUniqueId(),
          url,
          status: 'success' as const,
          name,
          type,
          preview: url // Best effort
        };
      } );
      
      return newItems;
    } );
  }, [] );

  return {
    items,
    activeId,
    sensors,
    handleDragStart,
    handleDragEnd,
    handleDrop,
    handleRemove,
    handleDropError,
    handleUploadSuccess,
    handleUploadError,
    handleRetry,
    addImportedItem,
    setItemsFromUrls,
  };
}
