/**
 * Comments Query & Mutation Hooks
 *
 * Custom hooks for managing comments using Tanstack Query.
 */

import {
  useQuery,
  useQueries,
  useMutation,
  useQueryClient,
  type UseQueryResult,
  type UseMutationResult,
} from '@tanstack/react-query';
import { CommentsApi } from '../generated/api';
import { apiClient, apiConfiguration } from '../client';
import type {
  ModelsCommentRequest,
  ModelsStandardResponseArrayModelsCommentResponse,
  ModelsStandardResponseModelsCommentResponse,
  ModelsStandardResponseAny,
} from '../generated/models';
import type { ApiError } from './types';

const commentsApi = new CommentsApi( apiConfiguration, undefined, apiClient );

export const commentsKeys = {
  all: [ 'comments' ] as const,
  entity: ( entityType: string, entityId: string ) =>
    [ ...commentsKeys.all, entityType, entityId ] as const,
};

export function useComments(
  entityType: string,
  entityId: string,
): UseQueryResult<ModelsStandardResponseArrayModelsCommentResponse, ApiError> {
  return useQuery( {
    queryKey: commentsKeys.entity( entityType, entityId ),
    queryFn: async () => {
      const response = await commentsApi.commentsGet( { entityType, entityId } );
      return response.data;
    },
    enabled: !!entityId,
  } );
}

export function useMultipleComments( entities: Array<{ entityType: string; entityId: string }> ) {
  return useQueries( {
    queries: entities.map( ( { entityType, entityId } ) => ( {
      queryKey: commentsKeys.entity( entityType, entityId ),
      queryFn: async () => {
        const response = await commentsApi.commentsGet( { entityType, entityId } );
        return response.data;
      },
      enabled: !!entityId,
    } ) ),
  } );
}

import { UtilsEntityType } from '../generated/models/utils-entity-type';

export function useSubmissionComments( submissionId?: string ) {
  const entities = submissionId ? [
    { entityType: UtilsEntityType.EntityTypeVideoSubmissionStatusUpdate, entityId: submissionId },
    { entityType: UtilsEntityType.EntityTypeBrandVideoDecision, entityId: submissionId },
  ] : [];

  return useMultipleComments( entities );
}

export function useAddComment(): UseMutationResult<
  ModelsStandardResponseModelsCommentResponse,
  ApiError,
  ModelsCommentRequest
> {
  const queryClient = useQueryClient();

  return useMutation( {
    mutationFn: async ( request ) => {
      const response = await commentsApi.commentsPost( { request } );
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
      const response = await commentsApi.commentsIdDelete( { id } );
      return response.data;
    },
    onSuccess: ( _, variables ) => {
      queryClient.invalidateQueries( {
        queryKey: commentsKeys.entity( variables.entityType, variables.entityId ),
      } );
    },
  } );
}
