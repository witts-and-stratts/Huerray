import { closestCenter, DragEndEvent, DragStartEvent, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import { UploadedFile } from './types';

export function useCampaignDocuments( initialItems: UploadedFile[] = [] ) {
  const [ items, setItems ] = useState<UploadedFile[]>( initialItems );
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
      }

      return {
        id: Math.random().toString( 36 ).substring( 7 ), // Simple ID
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

  const handleUploadError = useCallback( ( id: string, error: any ) => {
    setItems( prev => prev.map( i => i.id === id ? { ...i, status: 'error' } : i ) );
    const item = items.find( i => i.id === id );
    toast.error( `Upload failed for ${ item?.name || 'file' }; ${ error?.message || 'Unknown error' }` );
  }, [ items ] ); // Depends on items to find the name, or iterate functional update? Better functional if possible, but finding name needs current items.

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

      const newItem: UploadedFile = {
        id: Math.random().toString( 36 ).substring( 7 ),
        file,
        url: '',
        status: 'uploading',
        name: name,
        type: file.type,
        preview: file.type.startsWith( 'image/' ) ? URL.createObjectURL( file ) : undefined
      };

      setItems( prev => [ ...prev, newItem ] );
    } catch ( error ) {
      console.error( "Import failed", error );
      toast.error( "Failed to import file. Please check the URL and CORS settings." );
    }
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
  };
}
