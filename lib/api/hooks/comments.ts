/**
 * Comments Query & Mutation Hooks
 *
 * Custom hooks for managing entity-scoped comment threads, backed by the
 * Conversations API (the backend's former dedicated /comments endpoint was
 * retired in favor of /conversations/messages, which resolves-or-creates a
 * conversation per entity ref under the hood).
 */

import {
  useQuery,
  useQueries,
  useMutation,
  useQueryClient,
  type UseQueryResult,
  type UseMutationResult,
} from '@tanstack/react-query';
import { ConversationsApi } from '../generated/api';
import { apiClient, apiConfiguration } from '../client';
import type {
  ModelsPostMessageRequest,
  ModelsStandardResponseArrayModelsConversationMessageResponse,
  ModelsStandardResponseModelsConversationMessageResponse,
  ModelsStandardResponseAny,
} from '../generated/models';
import type { ApiError } from './types';

const conversationsApi = new ConversationsApi( apiConfiguration, undefined, apiClient );

export const commentsKeys = {
  all: [ 'comments' ] as const,
  entity: ( entityType: string, entityId: string ) =>
    [ ...commentsKeys.all, entityType, entityId ] as const,
};

export function useComments(
  entityType: string,
  entityId: string,
  options?: { enabled?: boolean; },
): UseQueryResult<ModelsStandardResponseArrayModelsConversationMessageResponse, ApiError> {
  return useQuery( {
    queryKey: commentsKeys.entity( entityType, entityId ),
    queryFn: async () => {
      const response = await conversationsApi.conversationsMessagesGet( { entityType, entityId } );
      return response.data;
    },
    enabled: !!entityId && ( options?.enabled ?? true ),
  } );
}

export function useMultipleComments( entities: Array<{ entityType: string; entityId: string }> ) {
  return useQueries( {
    queries: entities.map( ( { entityType, entityId } ) => ( {
      queryKey: commentsKeys.entity( entityType, entityId ),
      queryFn: async () => {
        const response = await conversationsApi.conversationsMessagesGet( { entityType, entityId } );
        return response.data;
      },
      enabled: !!entityId,
    } ) ),
  } );
}

import { UtilsEntityType } from '../generated/models/utils-entity-type';

/**
 * Merges messages from several entity queries, dropping duplicates (the same
 * message can be returned by more than one entity endpoint). When duplicates
 * differ in entity type, the more specific (non-campaign) one is kept so
 * labels such as "Admin Approval" survive.
 */
export function dedupeMessages<T extends { id?: string; entity_type?: string }>( messages: T[] ): T[] {
  const byId = new Map<string, T>();
  const result: T[] = [];
  for ( const msg of messages ) {
    if ( !msg.id ) { result.push( msg ); continue; }
    const existing = byId.get( msg.id );
    if ( !existing ) {
      byId.set( msg.id, msg );
      result.push( msg );
    } else if ( existing.entity_type === UtilsEntityType.EntityTypeCampaign && msg.entity_type !== existing.entity_type ) {
      result[ result.indexOf( existing ) ] = msg;
      byId.set( msg.id, msg );
    }
  }
  return result;
}

export function useSubmissionComments( submissionId?: string ) {
  const entities = submissionId ? [
    { entityType: UtilsEntityType.EntityTypeVideoSubmissionStatusUpdate, entityId: submissionId },
    { entityType: UtilsEntityType.EntityTypeBrandVideoDecision, entityId: submissionId },
  ] : [];

  return useMultipleComments( entities );
}

export function useAddComment(): UseMutationResult<
  ModelsStandardResponseModelsConversationMessageResponse,
  ApiError,
  ModelsPostMessageRequest
> {
  const queryClient = useQueryClient();

  return useMutation( {
    mutationFn: async ( request ) => {
      const response = await conversationsApi.conversationsMessagesPost( { request } );
      return response.data;
    },
    onSuccess: ( _, variables ) => {
      queryClient.invalidateQueries( {
        queryKey: commentsKeys.entity( variables.entity_type, variables.entity_id ),
      } );
    },
  } );
}

export function useDeleteComment(): UseMutationResult<
  ModelsStandardResponseAny,
  ApiError,
  { id: string; entityType: string; entityId: string }
> {
  const queryClient = useQueryClient();

  return useMutation( {
    mutationFn: async ( { id } ) => {
      const response = await conversationsApi.conversationsMessagesMessageIdDelete( { messageId: id } );
      return response.data;
    },
    onSuccess: ( _, variables ) => {
      queryClient.invalidateQueries( {
        queryKey: commentsKeys.entity( variables.entityType, variables.entityId ),
      } );
    },
  } );
}
