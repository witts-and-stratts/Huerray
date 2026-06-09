'use client';

import { ModelsUserResponse } from '@/lib/api/generated';
import { useUserProfile, usersKeys } from '@/lib/api/hooks/users';
import { useQueryClient } from '@tanstack/react-query';
import {
  createContext,
  useContext,
  useEffect,
  type ReactNode,
} from 'react';

/**
 * Cross-tab channel used to announce that the user's email was verified.
 * When the verification link is opened in another tab of the SAME browser,
 * that tab broadcasts here so the dashboard tab can refresh instantly instead
 * of waiting for the next poll.
 */
const VERIFY_CHANNEL = 'huerray-email-verified';

/** Poll the profile this often (ms) while the email is still unverified. */
const VERIFY_POLL_INTERVAL = 15_000;

interface EmailVerificationContextValue {
  /** The current profile, or null while loading / unauthenticated. */
  user: ModelsUserResponse | null;
  /** True once we know the email is verified. */
  isVerified: boolean;
  /** True while the first profile fetch is in flight. */
  isLoading: boolean;
  /** True when the page should be locked (loaded + unverified). */
  isLocked: boolean;
}

const EmailVerificationContext = createContext<
  EmailVerificationContextValue | undefined
>( undefined );

/** Broadcast (best-effort) that the email was just verified in this tab. */
export function broadcastEmailVerified() {
  if ( typeof window === 'undefined' || !( 'BroadcastChannel' in window ) ) {
    return;
  }
  try {
    const bc = new BroadcastChannel( VERIFY_CHANNEL );
    bc.postMessage( 'verified' );
    bc.close();
  } catch {
    // BroadcastChannel may be unavailable in some contexts; polling still covers us.
  }
}

export function EmailVerificationProvider( {
  children,
}: {
  children: ReactNode;
} ) {
  const queryClient = useQueryClient();

  const { data, isLoading } = useUserProfile( {
    // Stop polling the moment the email is verified; keep polling otherwise.
    refetchInterval: ( query ) =>
      ( query.state.data as ModelsUserResponse | undefined )?.email_verified
        ? false
        : VERIFY_POLL_INTERVAL,
    // Catch verifications done on another device when the user refocuses this tab.
    refetchOnWindowFocus: true,
  } );

  const isVerified = !!data?.email_verified;

  // Same-browser, different-tab: refresh immediately when the other tab verifies.
  useEffect( () => {
    if ( typeof window === 'undefined' || !( 'BroadcastChannel' in window ) ) {
      return;
    }
    const bc = new BroadcastChannel( VERIFY_CHANNEL );
    bc.onmessage = ( event ) => {
      if ( event.data === 'verified' ) {
        queryClient.invalidateQueries( {
          queryKey: [ ...usersKeys.all, 'profile' ],
        } );
      }
    };
    return () => bc.close();
  }, [ queryClient ] );

  const value: EmailVerificationContextValue = {
    user: data ?? null,
    isVerified,
    isLoading,
    isLocked: !isLoading && !!data && !isVerified,
  };

  return (
    <EmailVerificationContext.Provider value={ value }>
      { children }
    </EmailVerificationContext.Provider>
  );
}

export function useEmailVerification() {
  const context = useContext( EmailVerificationContext );
  if ( context === undefined ) {
    throw new Error(
      'useEmailVerification must be used within an EmailVerificationProvider'
    );
  }
  return context;
}
