/**
 * Conversations Query & Mutation Hooks
 *
 * Full coverage of the Conversations API: listing/reading conversations and
 * their messages, starting a conversation with an entity, sending/editing/
 * deleting messages, and managing participants.
 *
 * Entity-scoped comment threads (e.g. a campaign or gig's comments tab) are
 * a thin slice of this same API — see lib/api/hooks/comments.ts, which
 * wraps conversationsMessagesGet/Post for that read-a-flat-thread use case.
 * These hooks cover the rest: full conversation objects, participants, and
 * per-message edit/delete (admin only, per the API).
 */

import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseQueryResult,
  type UseMutationResult,
  type UseQueryOptions,
} from '@tanstack/react-query';
import { ConversationsApi } from '../generated/api';
import { apiClient, apiConfiguration } from '../client';
import type {
  ModelsAddParticipantsRequest,
  ModelsEditMessageRequest,
  ModelsPaginatedResponseArrayModelsConversationResponse,
  ModelsPostConversationMessageRequest,
  ModelsPostMessageRequest,
  ModelsStandardResponseAny,
  ModelsStandardResponseArrayModelsConversationMessageResponse,
  ModelsStandardResponseModelsConversationMessageResponse,
  ModelsStandardResponseModelsConversationResponse,
} from '../generated/models';
import type { ApiError } from './types';

const conversationsApi = new ConversationsApi( apiConfiguration, undefined, apiClient );

export const conversationsKeys = {
  all: [ 'conversations' ] as const,
  lists: () => [ ...conversationsKeys.all, 'list' ] as const,
  list: ( params?: Record<string, unknown> ) => [ ...conversationsKeys.lists(), params ] as const,
  details: () => [ ...conversationsKeys.all, 'detail' ] as const,
  detail: ( id: string ) => [ ...conversationsKeys.details(), id ] as const,
  byEntity: ( entityType: string, entityId: string ) => [ ...conversationsKeys.all, 'entity', entityType, entityId ] as const,
  messages: ( id: string ) => [ ...conversationsKeys.all, 'messages', id ] as const,
};

// ─── List / read ──────────────────────────────────────────────────────────────

/** List conversations the caller participates in. Admins see every conversation. */
export function useConversations(
  params?: { entityType?: string; entityId?: string; page?: number; limit?: number; },
  options?: Omit<UseQueryOptions<ModelsPaginatedResponseArrayModelsConversationResponse, ApiError>, 'queryKey' | 'queryFn'>
): UseQueryResult<ModelsPaginatedResponseArrayModelsConversationResponse, ApiError> {
  return useQuery( {
    queryKey: conversationsKeys.list( params ),
    queryFn: async () => {
      const response = await conversationsApi.conversationsGet( {
        entityType: params?.entityType,
        entityId: params?.entityId,
        page: params?.page,
        limit: params?.limit,
      } );
      return response.data;
    },
    ...options,
  } );
}

/** Fetch a single conversation by id (participants, last message, counts). */
export function useConversation(
  id: string,
  options?: Omit<UseQueryOptions<ModelsStandardResponseModelsConversationResponse, ApiError>, 'queryKey' | 'queryFn'>
): UseQueryResult<ModelsStandardResponseModelsConversationResponse, ApiError> {
  return useQuery( {
    queryKey: conversationsKeys.detail( id ),
    queryFn: async () => {
      const response = await conversationsApi.conversationsIdGet( { id } );
      return response.data;
    },
    enabled: !!id,
    ...options,
  } );
}

/** Resolve the conversation for an entity ref, if one already exists. */
export function useConversationByEntity(
  entityType: string,
  entityId: string,
  options?: Omit<UseQueryOptions<ModelsStandardResponseModelsConversationResponse, ApiError>, 'queryKey' | 'queryFn'>
): UseQueryResult<ModelsStandardResponseModelsConversationResponse, ApiError> {
  return useQuery( {
    queryKey: conversationsKeys.byEntity( entityType, entityId ),
    queryFn: async () => {
      const response = await conversationsApi.conversationsByEntityGet( { entityType, entityId } );
      return response.data;
    },
    enabled: !!entityType && !!entityId,
    ...options,
  } );
}

/** Fetch all messages in a conversation by its id, oldest first. */
export function useConversationMessages(
  id: string,
  options?: Omit<UseQueryOptions<ModelsStandardResponseArrayModelsConversationMessageResponse, ApiError>, 'queryKey' | 'queryFn'>
): UseQueryResult<ModelsStandardResponseArrayModelsConversationMessageResponse, ApiError> {
  return useQuery( {
    queryKey: conversationsKeys.messages( id ),
    queryFn: async () => {
      const response = await conversationsApi.conversationsIdMessagesGet( { id } );
      return response.data;
    },
    enabled: !!id,
    ...options,
  } );
}

// ─── Messages ─────────────────────────────────────────────────────────────────

/** Post a message into a known conversation by id. */
export function useSendMessage(): UseMutationResult<
  ModelsStandardResponseModelsConversationMessageResponse,
  ApiError,
  { conversationId: string; request: ModelsPostConversationMessageRequest }
> {
  const queryClient = useQueryClient();

  return useMutation( {
    mutationFn: async ( { conversationId, request } ) => {
      const response = await conversationsApi.conversationsIdMessagesPost( { id: conversationId, request } );
      return response.data;
    },
    onSuccess: ( _, variables ) => {
      queryClient.invalidateQueries( { queryKey: conversationsKeys.messages( variables.conversationId ) } );
      queryClient.invalidateQueries( { queryKey: conversationsKeys.detail( variables.conversationId ) } );
      queryClient.invalidateQueries( { queryKey: conversationsKeys.lists() } );
    },
  } );
}

/**
 * Resolves (or creates) the conversation for an entity ref and posts a
 * message to it in one call — e.g. starting a conversation with a creator
 * by posting to their `creator` entity ref.
 */
export function useStartConversation(): UseMutationResult<
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
      queryClient.invalidateQueries( { queryKey: conversationsKeys.byEntity( variables.entity_type, variables.entity_id ) } );
      queryClient.invalidateQueries( { queryKey: conversationsKeys.lists() } );
    },
  } );
}

/** Edit a message (admin only, per the API). */
export function useEditMessage(): UseMutationResult<
  ModelsStandardResponseModelsConversationMessageResponse,
  ApiError,
  { messageId: string; conversationId: string; request: ModelsEditMessageRequest }
> {
  const queryClient = useQueryClient();

  return useMutation( {
    mutationFn: async ( { messageId, request } ) => {
      const response = await conversationsApi.conversationsMessagesMessageIdPut( { messageId, request } );
      return response.data;
    },
    onSuccess: ( _, variables ) => {
      queryClient.invalidateQueries( { queryKey: conversationsKeys.messages( variables.conversationId ) } );
    },
  } );
}

/** Delete a message (admin only, per the API). */
export function useDeleteMessage(): UseMutationResult<
  ModelsStandardResponseAny,
  ApiError,
  { messageId: string; conversationId: string }
> {
  const queryClient = useQueryClient();

  return useMutation( {
    mutationFn: async ( { messageId } ) => {
      const response = await conversationsApi.conversationsMessagesMessageIdDelete( { messageId } );
      return response.data;
    },
    onSuccess: ( _, variables ) => {
      queryClient.invalidateQueries( { queryKey: conversationsKeys.messages( variables.conversationId ) } );
    },
  } );
}

// ─── Participants ─────────────────────────────────────────────────────────────

/** Add participants to a conversation. Any existing participant (or an admin) can do this. */
export function useAddParticipants(): UseMutationResult<
  ModelsStandardResponseModelsConversationResponse,
  ApiError,
  { conversationId: string; request: ModelsAddParticipantsRequest }
> {
  const queryClient = useQueryClient();

  return useMutation( {
    mutationFn: async ( { conversationId, request } ) => {
      const response = await conversationsApi.conversationsIdParticipantsPost( { id: conversationId, request } );
      return response.data;
    },
    onSuccess: ( _, variables ) => {
      queryClient.invalidateQueries( { queryKey: conversationsKeys.detail( variables.conversationId ) } );
      queryClient.invalidateQueries( { queryKey: conversationsKeys.lists() } );
    },
  } );
}

/** Remove a participant. Admins may remove anyone; other users may only remove themselves. */
export function useRemoveParticipant(): UseMutationResult<
  ModelsStandardResponseAny,
  ApiError,
  { conversationId: string; userId: string }
> {
  const queryClient = useQueryClient();

  return useMutation( {
    mutationFn: async ( { conversationId, userId } ) => {
      const response = await conversationsApi.conversationsIdParticipantsUserIdDelete( { id: conversationId, userId } );
      return response.data;
    },
    onSuccess: ( _, variables ) => {
      queryClient.invalidateQueries( { queryKey: conversationsKeys.detail( variables.conversationId ) } );
      queryClient.invalidateQueries( { queryKey: conversationsKeys.lists() } );
    },
  } );
}
