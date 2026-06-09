"use client";

import { usePersistor } from "@/lib/redux/store-provider";
import { useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useCallback } from "react";

const AUTH_COOKIES = [ "userData", "authToken", "refreshToken" ];

// App-level preferences that should survive the wipe. Everything else in
// web storage is treated as previous-session data and removed.
const PRESERVED_STORAGE_KEYS = [ "theme" ];

function clearWebStorage( storage: Storage ) {
  try {
    const preserved = new Map<string, string>();
    for ( const key of PRESERVED_STORAGE_KEYS ) {
      const value = storage.getItem( key );
      if ( value !== null ) preserved.set( key, value );
    }
    storage.clear();
    preserved.forEach( ( value, key ) => storage.setItem( key, value ) );
  } catch {
    // Storage may be unavailable (private mode, blocked cookies) — non-fatal.
  }
}

async function clearCacheStorage() {
  if ( typeof window === "undefined" || !( "caches" in window ) ) return;
  try {
    const keys = await caches.keys();
    await Promise.all( keys.map( ( key ) => caches.delete( key ) ) );
  } catch {
    // Cache Storage may be unavailable — non-fatal.
  }
}

/**
 * Wipes every artifact left over from any previous session. Call this BEFORE
 * persisting a freshly logged-in user so no stale data bleeds across accounts.
 */
export function useClearPersistedData() {
  const persistor = usePersistor();
  const queryClient = useQueryClient();

  return useCallback( async () => {
    // 1. Redux-persist: reset in-memory state and its backing storage.
    await persistor?.purge();

    // 2. React Query: drop all cached queries and mutations.
    queryClient.clear();

    // 3. Web storage: wipe everything except app-level preferences.
    if ( typeof window !== "undefined" ) {
      clearWebStorage( window.localStorage );
      clearWebStorage( window.sessionStorage );
    }

    // 4. Cache Storage (service worker / fetch caches), if any.
    await clearCacheStorage();

    // 5. Remove auth cookies from the previous session.
    AUTH_COOKIES.forEach( ( name ) => Cookies.remove( name, { path: "/" } ) );
  }, [ persistor, queryClient ] );
}
