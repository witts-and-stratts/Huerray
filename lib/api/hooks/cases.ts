/**
 * Cases Query & Mutation Hooks
 */

import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationOptions,
  type UseQueryOptions,
  type UseQueryResult,
} from '@tanstack/react-query';
import { CasesApi } from '../generated/api';
import { apiClient, apiConfiguration } from '../client';
import type {
  ModelsPaginatedCaseResponse,
  ModelsStandardCaseResponse,
  ModelsStandardCaseMessageListResponse,
  ModelsStandardCaseMessageResponse,
  ModelsCreateCaseRequest,
  ModelsUpdateCaseStatusRequest,
  ModelsAssignCaseRequest,
  ModelsCreateCaseMessageRequest,
} from '../generated/models';
import type { ApiError } from './types';

const casesApi = new CasesApi( apiConfiguration, undefined, apiClient );

export const casesKeys = {
  all: [ 'cases' ] as const,
  lists: () => [ ...casesKeys.all, 'list' ] as const,
  list: ( params?: object ) => [ ...casesKeys.lists(), params ] as const,
  detail: ( id: string ) => [ ...casesKeys.all, 'detail', id ] as const,
  messages: ( id: string ) => [ ...casesKeys.all, 'messages', id ] as const,
};

export interface UseCasesParams {
  q?: string;
  status?: string;
  priority?: string;
  relatedEntityType?: string;
  page?: number;
  limit?: number;
}

export function useCases(
  params?: UseCasesParams,
  options?: Omit<UseQueryOptions<ModelsPaginatedCaseResponse, ApiError>, 'queryKey' | 'queryFn'>
): UseQueryResult<ModelsPaginatedCaseResponse, ApiError> {
  return useQuery( {
    queryKey: casesKeys.list( params ),
    queryFn: async () => {
      const response = await casesApi.casesGet( {
        q: params?.q,
        status: params?.status,
        priority: params?.priority,
        relatedEntityType: params?.relatedEntityType,
        page: params?.page,
        limit: params?.limit,
      } );
      return response.data;
    },
    ...options,
  } );
}

export function useCase(
  id: string,
  options?: Omit<UseQueryOptions<ModelsStandardCaseResponse, ApiError>, 'queryKey' | 'queryFn'>
): UseQueryResult<ModelsStandardCaseResponse, ApiError> {
  return useQuery( {
    queryKey: casesKeys.detail( id ),
    queryFn: async () => {
      const response = await casesApi.casesIdGet( { id } );
      return response.data;
    },
    enabled: !!id,
    ...options,
  } );
}

export function useCaseMessages(
  id: string,
  options?: Omit<UseQueryOptions<ModelsStandardCaseMessageListResponse, ApiError>, 'queryKey' | 'queryFn'>
): UseQueryResult<ModelsStandardCaseMessageListResponse, ApiError> {
  return useQuery( {
    queryKey: casesKeys.messages( id ),
    queryFn: async () => {
      const response = await casesApi.casesIdMessagesGet( { id } );
      return response.data;
    },
    enabled: !!id,
    ...options,
  } );
}

export function useCreateCase(
  options?: UseMutationOptions<ModelsStandardCaseResponse, ApiError, ModelsCreateCaseRequest>
) {
  const queryClient = useQueryClient();

  return useMutation( {
    mutationFn: async ( request: ModelsCreateCaseRequest ) => {
      const response = await casesApi.casesPost( { request } );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries( { queryKey: casesKeys.lists() } );
    },
    ...options,
  } );
}

export function useUpdateCaseStatus(
  options?: UseMutationOptions<ModelsStandardCaseResponse, ApiError, { id: string; request: ModelsUpdateCaseStatusRequest }>
) {
  const queryClient = useQueryClient();

  return useMutation( {
    mutationFn: async ( { id, request } ) => {
      const response = await casesApi.casesIdStatusPut( { id, request } );
      return response.data;
    },
    onSuccess: ( _, variables ) => {
      queryClient.invalidateQueries( { queryKey: casesKeys.lists() } );
      queryClient.invalidateQueries( { queryKey: casesKeys.detail( variables.id ) } );
    },
    ...options,
  } );
}

export function useAssignCase(
  options?: UseMutationOptions<ModelsStandardCaseResponse, ApiError, { id: string; request: ModelsAssignCaseRequest }>
) {
  const queryClient = useQueryClient();

  return useMutation( {
    mutationFn: async ( { id, request } ) => {
      const response = await casesApi.casesIdAssignPut( { id, request } );
      return response.data;
    },
    onSuccess: ( _, variables ) => {
      queryClient.invalidateQueries( { queryKey: casesKeys.lists() } );
      queryClient.invalidateQueries( { queryKey: casesKeys.detail( variables.id ) } );
    },
    ...options,
  } );
}

export function useAddCaseMessage(
  options?: UseMutationOptions<ModelsStandardCaseMessageResponse, ApiError, { id: string; request: ModelsCreateCaseMessageRequest }>
) {
  const queryClient = useQueryClient();

  return useMutation( {
    mutationFn: async ( { id, request } ) => {
      const response = await casesApi.casesIdMessagesPost( { id, request } );
      return response.data;
    },
    onSuccess: ( _, variables ) => {
      queryClient.invalidateQueries( { queryKey: casesKeys.messages( variables.id ) } );
    },
    ...options,
  } );
}
