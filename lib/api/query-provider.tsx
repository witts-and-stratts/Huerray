/**
 * React Query Provider
 * 
 * This component wraps your app with QueryClientProvider to enable
 * Tanstack Query functionality throughout your application.
 */

'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState, type ReactNode } from 'react';

interface QueryProviderProps {
  children: ReactNode;
}

/**
 * Create a custom QueryProvider component that initializes the QueryClient
 * This ensures the QueryClient is created per-request in Next.js App Router
 */
export function QueryProvider( { children }: QueryProviderProps ) {
  // Create QueryClient instance with useState to ensure it's created only once per component mount
  const [ queryClient ] = useState(
    () =>
      new QueryClient( {
        defaultOptions: {
          queries: {
            // Configure default options for all queries
            staleTime: 60 * 1000, // Data is fresh for 60 seconds
            gcTime: 5 * 60 * 1000, // Cache data for 5 minutes (formerly cacheTime)
            retry: 1, // Retry failed requests once
            refetchOnWindowFocus: false, // Don't refetch on window focus
            refetchOnReconnect: true, // Refetch when reconnecting
          },
          mutations: {
            // Configure default options for all mutations
            retry: false, // Don't retry failed mutations
          },
        },
      } )
  );

  return (
    <QueryClientProvider client={ queryClient }>
      { children }
      {/* Only show React Query DevTools in development */ }
      { process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={ false } />
      ) }
    </QueryClientProvider>
  );
}
