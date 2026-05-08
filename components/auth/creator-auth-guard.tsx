'use client';

import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { fetchCreatorProfile, selectShouldFetchCreatorProfile } from '@/lib/redux/features/creator/creatorSlice';
import { usePathname, useRouter, useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { config } from '@/lib/config';

export function CreatorAuthGuard( { children }: { children: React.ReactNode; } ) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const locale = params?.locale || 'en';
  const dispatch = useAppDispatch();

  // Track if we've done an initial fetch THIS session (not from persisted cache)
  const [ hasFetchedThisSession, setHasFetchedThisSession ] = useState( false );

  const { isLoading, hasProfile, profile, lastFetchedAt } = useAppSelector( ( state ) => state.creator );
  const shouldFetch = useAppSelector( selectShouldFetchCreatorProfile );
  const backgroundRefreshRef = useRef<NodeJS.Timeout | null>( null );
  const isFetchingRef = useRef( false );

  // Initial fetch on mount - always fetch fresh on page load to verify profile status
  useEffect( () => {
    // Don't check if we are already on the complete-profile page
    if ( pathname?.includes( '/complete-profile' ) ) {
      // Use queueMicrotask to avoid synchronous setState in effect warning
      queueMicrotask( () => setHasFetchedThisSession( true ) );
      return;
    }

    // Always do a fresh fetch on initial mount to verify profile
    // This ensures we don't rely on potentially stale persisted cache
    if ( !isFetchingRef.current && !hasFetchedThisSession ) {
      isFetchingRef.current = true;
      dispatch( fetchCreatorProfile() ).finally( () => {
        isFetchingRef.current = false;
        setHasFetchedThisSession( true );
      } );
    }
  }, [ pathname, dispatch, hasFetchedThisSession ] );

  // Handle redirect when profile state is determined
  useEffect( () => {
    if ( pathname?.includes( '/complete-profile' ) ) {
      return;
    }

    // Only redirect if we've fetched this session, not loading, and no profile exists
    if ( hasFetchedThisSession && hasProfile === false && !isLoading ) {
      router.replace( `/${ locale }/creator/complete-profile` );
    }
  }, [ hasProfile, isLoading, router, locale, pathname, hasFetchedThisSession ] );

  // Background refresh every 30 minutes
  useEffect( () => {
    // Set up background refresh
    backgroundRefreshRef.current = setInterval( () => {
      dispatch( fetchCreatorProfile() );
    }, config.polling.profileRefreshInterval );

    return () => {
      if ( backgroundRefreshRef.current ) {
        clearInterval( backgroundRefreshRef.current );
      }
    };
  }, [ dispatch ] );

  const isOnCompleteProfile = pathname?.includes( '/complete-profile' );
  // Keep the loader visible while a redirect to complete-profile is pending,
  // so the dashboard doesn't briefly render between fetch resolution and router.replace.
  const redirectPending = hasFetchedThisSession && hasProfile === false && !isOnCompleteProfile;

  // Show loading until we've verified profile status this session
  if ( !hasFetchedThisSession || isLoading || redirectPending ) {
    if ( isOnCompleteProfile ) {
      return <>{ children }</>;
    }

    return (
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <span className="loader"></span>
      </div>
    );
  }

  return <>{ children }</>;
}
