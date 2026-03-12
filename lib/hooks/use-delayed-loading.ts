import { useState, useEffect } from 'react';

/**
 * Hook to delay showing a loading indicator (like a skeleton) for a brief period.
 * This prevents the loading skeleton from flashing briefly on fast networks or cached data.
 * 
 * @param isLoading The raw loading state from the data query
 * @param delayMs  The amount of milliseconds to wait before switching internal state to true
 * @returns boolean representing whether the UI should show the loading skeleton
 */
export function useDelayedLoading( isLoading: boolean, delayMs = 250 ) {
  const [ showLoading, setShowLoading ] = useState( false );

  useEffect( () => {
    let timeoutId: NodeJS.Timeout;

    if ( isLoading ) {
      // If loading starts, wait for `delayMs` before actually showing the skeleton
      timeoutId = setTimeout( () => {
        setShowLoading( true );
      }, delayMs );
    } else {
      // If no longer loading, immediately hide the skeleton
      setShowLoading( false );
    }

    return () => {
      // Cleanup timeout on unmount or if isLoading flips to false before the timeout fires
      clearTimeout( timeoutId );
    };
  }, [ isLoading, delayMs ] );

  return showLoading;
}
