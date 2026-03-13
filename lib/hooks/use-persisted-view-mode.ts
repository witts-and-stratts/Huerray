import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { setViewMode, type ViewMode } from '@/lib/redux/features/ui/uiSlice';

export function usePersistedViewMode( pageKey: string, defaultView: ViewMode = 'table' ) {
  const dispatch = useAppDispatch();
  const persistedView = useAppSelector( ( state ) => state.ui.viewModes[ pageKey ] ) || defaultView;
  const [ view, setInternalView ] = useState<ViewMode>( persistedView );

  useEffect( () => {
    if ( persistedView && persistedView !== view ) {
      setInternalView( persistedView );
    }
  }, [ persistedView ] );

  const setView = ( newView: ViewMode ) => {
    setInternalView( newView );
    dispatch( setViewMode( { pageKey, viewMode: newView } ) );
  };

  return { view, setView };
}
