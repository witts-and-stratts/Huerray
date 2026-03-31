import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { apiClient } from '../client';
import { ModelsNewsletterSignupRequest, ModelsNewsletterSubscriptionResponse } from '../generated';

export type NewsletterEntry = ModelsNewsletterSubscriptionResponse & {
  source?: string | null;
};

interface NewsletterListResult {
  items: NewsletterEntry[];
  total: number;
}

function asRecord( value: unknown ): Record<string, unknown> | null {
  return typeof value === 'object' && value !== null ? value as Record<string, unknown> : null;
}

function getString( ...values: unknown[] ): string | undefined {
  for ( const value of values ) {
    if ( typeof value === 'string' && value.trim() ) {
      return value;
    }
  }

  return undefined;
}

function getListPayload( payload: unknown ): unknown[] {
  if ( Array.isArray( payload ) ) return payload;

  const record = asRecord( payload );
  if ( !record ) return [];

  const nested = [
    record.data,
    record.items,
    record.entries,
    record.results,
    asRecord( record.data )?.items,
    asRecord( record.data )?.entries,
    asRecord( record.data )?.results,
  ];

  for ( const candidate of nested ) {
    if ( Array.isArray( candidate ) ) return candidate;
  }

  return [];
}

function getTotalCount( payload: unknown, fallback: number ): number {
  const record = asRecord( payload );
  const dataRecord = asRecord( record?.data );
  const total = record?.total ?? dataRecord?.total ?? record?.count ?? dataRecord?.count ?? record?.total_count ?? dataRecord?.total_count;

  return typeof total === 'number' ? total : fallback;
}

function normalizeEntry( rawEntry: unknown, index: number ): NewsletterEntry {
  const entry = asRecord( rawEntry ) ?? {};
  const id = getString( entry.id, entry._id, entry.uuid, entry.newsletter_id ) ?? `${getString( entry.email ) ?? 'newsletter'}-${index}`;

  return {
    id,
    email: getString( entry.email ) ?? '',
    first_name: getString( entry.first_name, entry.firstName ) ?? undefined,
    last_name: getString( entry.last_name, entry.lastName ) ?? undefined,
    status: getString( entry.status, entry.subscription_status ) ?? undefined,
    source: getString( entry.source, entry.signup_source, entry.origin ) ?? undefined,
    subscribed_at: getString( entry.subscribed_at, entry.subscribedAt, entry.created_at ) ?? undefined,
    unsubscribed_at: getString( entry.unsubscribed_at, entry.unsubscribedAt ) ?? undefined,
    created_at: getString( entry.created_at, entry.createdAt, entry.subscribed_at ) ?? undefined,
    updated_at: getString( entry.updated_at, entry.updatedAt ) ?? undefined,
  };
}

export function useNewsletterEntries( search: string ) {
  return useQuery<NewsletterListResult>({
    queryKey: [ 'newsletter', 'search', search ],
    placeholderData: ( previousData ) => previousData,
    queryFn: async () => {
      const response = await apiClient.get<unknown>( '/newsletter/search', {
        params: {
          q: search || undefined,
        },
      } );

      const items = getListPayload( response.data )
        .map( normalizeEntry )
        .filter( ( entry ) => entry.email );

      return {
        items,
        total: getTotalCount( response.data, items.length ),
      };
    },
  });
}

export function useUnsubscribeNewsletterEntry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ( email: string ) => {
      const response = await apiClient.get( '/newsletter/unsubscribe', {
        params: { email },
      } );

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries( { queryKey: [ 'newsletter' ] } );
    },
  });
}

export function useResubscribeNewsletterEntry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ( request: ModelsNewsletterSignupRequest ) => {
      const response = await apiClient.post( '/newsletter/signup', request );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries( { queryKey: [ 'newsletter' ] } );
    },
  });
}
