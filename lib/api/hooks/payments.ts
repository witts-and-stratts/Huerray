/**
 * Payment Query & Mutation Hooks
 */

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationOptions,
  type UseQueryOptions,
  type UseQueryResult,
} from '@tanstack/react-query';
import { PaymentApi, PaymentItemsApi, CreatorApi } from '../generated/api';
import { apiClient, apiConfiguration } from '../client';
import type {
  ModelsPaginatedPaymentResponse,
  ModelsStandardPaymentResponse,
  ModelsStandardPaymentItemResponse,
  ModelsStandardGenericResponse,
  ModelsCreatePaymentRequest,
  ModelsCreatePaymentItemRequest,
  ModelsUpdatePaymentRequest,
  ModelsUpdatePaymentStatusRequest,
  ModelsPaginatedPaymentItemResponse,
} from '../generated/models';
import type { ApiError } from './types';

const paymentApi = new PaymentApi( apiConfiguration, undefined, apiClient );
const paymentItemsApi = new PaymentItemsApi( apiConfiguration, undefined, apiClient );
const creatorApi = new CreatorApi( apiConfiguration, undefined, apiClient );

export const paymentsKeys = {
  all: [ 'payments' ] as const,
  lists: () => [ ...paymentsKeys.all, 'list' ] as const,
  list: ( params?: object ) => [ ...paymentsKeys.lists(), params ] as const,
  detail: ( id: string ) => [ ...paymentsKeys.all, 'detail', id ] as const,
  items: ( params?: object ) => [ ...paymentsKeys.all, 'items', params ] as const,
};

export interface UsePaymentsParams {
  createdAfter?: string;
  createdBefore?: string;
  creatorId?: string;
  limit?: number;
  page?: number;
  paymentStatus?: string;
  search?: string;
}

export function usePayments(
  params?: UsePaymentsParams,
  options?: Omit<UseQueryOptions<ModelsPaginatedPaymentResponse, ApiError>, 'queryKey' | 'queryFn'>
): UseQueryResult<ModelsPaginatedPaymentResponse, ApiError> {
  return useQuery( {
    queryKey: paymentsKeys.list( params ),
    queryFn: async () => {
      const response = await paymentApi.paymentsSearchGet( {
        createdAfter: params?.createdAfter,
        createdBefore: params?.createdBefore,
        creatorId: params?.creatorId,
        limit: params?.limit,
        page: params?.page,
        paymentStatus: params?.paymentStatus as never,
        search: params?.search,
      } );
      return response.data;
    },
    placeholderData: keepPreviousData,
    ...options,
  } );
}

export function usePayment(
  id: string,
  options?: Omit<UseQueryOptions<ModelsStandardPaymentResponse, ApiError>, 'queryKey' | 'queryFn'>
): UseQueryResult<ModelsStandardPaymentResponse, ApiError> {
  return useQuery( {
    queryKey: paymentsKeys.detail( id ),
    queryFn: async () => {
      const response = await paymentApi.paymentsIdGet( { id } );
      return response.data;
    },
    enabled: !!id,
    ...options,
  } );
}

export function useUpdatePaymentStatus(
  options?: UseMutationOptions<ModelsStandardPaymentResponse, ApiError, { id: string; request: ModelsUpdatePaymentStatusRequest }>
) {
  const queryClient = useQueryClient();
  const { onSuccess, onError, onSettled, ...restOptions } = options ?? {};

  return useMutation( {
    mutationFn: async ( { id, request } ) => {
      const response = await paymentApi.paymentsIdStatusPut( { id, request } );
      return response.data;
    },
    onSuccess: async ( data, variables, onMutateResult, context ) => {
      queryClient.invalidateQueries( { queryKey: paymentsKeys.lists() } );
      queryClient.invalidateQueries( { queryKey: paymentsKeys.detail( variables.id ) } );
      await onSuccess?.( data, variables, onMutateResult, context );
    },
    onError: async ( error, variables, onMutateResult, context ) => {
      await onError?.( error, variables, onMutateResult, context );
    },
    onSettled: async ( data, error, variables, onMutateResult, context ) => {
      await onSettled?.( data, error, variables, onMutateResult, context );
    },
    ...restOptions,
  } );
}

export function useUpdatePayment(
  options?: UseMutationOptions<ModelsStandardPaymentResponse, ApiError, { id: string; request: ModelsUpdatePaymentRequest }>
) {
  const queryClient = useQueryClient();
  const { onSuccess, onError, onSettled, ...restOptions } = options ?? {};

  return useMutation( {
    mutationFn: async ( { id, request } ) => {
      const response = await paymentApi.paymentsIdPut( { id, request } );
      return response.data;
    },
    onSuccess: async ( data, variables, onMutateResult, context ) => {
      queryClient.invalidateQueries( { queryKey: paymentsKeys.lists() } );
      queryClient.invalidateQueries( { queryKey: paymentsKeys.detail( variables.id ) } );
      await onSuccess?.( data, variables, onMutateResult, context );
    },
    onError: async ( error, variables, onMutateResult, context ) => {
      await onError?.( error, variables, onMutateResult, context );
    },
    onSettled: async ( data, error, variables, onMutateResult, context ) => {
      await onSettled?.( data, error, variables, onMutateResult, context );
    },
    ...restOptions,
  } );
}

export function useDeletePayment(
  options?: UseMutationOptions<ModelsStandardGenericResponse, ApiError, string>
) {
  const queryClient = useQueryClient();
  const { onSuccess, onError, onSettled, ...restOptions } = options ?? {};

  return useMutation( {
    mutationFn: async ( id: string ) => {
      const response = await paymentApi.paymentsIdDelete( { id } );
      return response.data;
    },
    onSuccess: async ( data, id, onMutateResult, context ) => {
      queryClient.invalidateQueries( { queryKey: paymentsKeys.lists() } );
      queryClient.removeQueries( { queryKey: paymentsKeys.detail( id ) } );
      await onSuccess?.( data, id, onMutateResult, context );
    },
    onError: async ( error, variables, onMutateResult, context ) => {
      await onError?.( error, variables, onMutateResult, context );
    },
    onSettled: async ( data, error, variables, onMutateResult, context ) => {
      await onSettled?.( data, error, variables, onMutateResult, context );
    },
    ...restOptions,
  } );
}

export function useCreatePayment(
  options?: UseMutationOptions<ModelsStandardPaymentResponse, ApiError, ModelsCreatePaymentRequest>
) {
  const queryClient = useQueryClient();
  const { onSuccess, onError, onSettled, ...restOptions } = options ?? {};

  return useMutation( {
    mutationFn: async ( request: ModelsCreatePaymentRequest ) => {
      const response = await paymentApi.paymentsPost( { request } );
      return response.data;
    },
    onSuccess: async ( data, variables, onMutateResult, context ) => {
      queryClient.invalidateQueries( { queryKey: paymentsKeys.lists() } );
      await onSuccess?.( data, variables, onMutateResult, context );
    },
    onError: async ( error, variables, onMutateResult, context ) => {
      await onError?.( error, variables, onMutateResult, context );
    },
    onSettled: async ( data, error, variables, onMutateResult, context ) => {
      await onSettled?.( data, error, variables, onMutateResult, context );
    },
    ...restOptions,
  } );
}

export function useCreatePaymentItem(
  options?: UseMutationOptions<ModelsStandardPaymentItemResponse, ApiError, ModelsCreatePaymentItemRequest>
) {
  const queryClient = useQueryClient();
  const { onSuccess, onError, onSettled, ...restOptions } = options ?? {};

  return useMutation( {
    mutationFn: async ( request: ModelsCreatePaymentItemRequest ) => {
      const response = await paymentItemsApi.paymentItemsPost( { request } );
      return response.data;
    },
    onSuccess: async ( data, variables, onMutateResult, context ) => {
      queryClient.invalidateQueries( { queryKey: paymentsKeys.all } );
      await onSuccess?.( data, variables, onMutateResult, context );
    },
    onError: async ( error, variables, onMutateResult, context ) => {
      await onError?.( error, variables, onMutateResult, context );
    },
    onSettled: async ( data, error, variables, onMutateResult, context ) => {
      await onSettled?.( data, error, variables, onMutateResult, context );
    },
    ...restOptions,
  } );
}

export interface UsePaymentItemsParams {
  createdAfter?: string;
  createdBefore?: string;
  creatorId?: string;
  itemStatus?: string;
  limit?: number;
  page?: number;
  paymentId?: string;
  search?: string;
}

export function usePaymentItems(
  params?: UsePaymentItemsParams,
  options?: Omit<UseQueryOptions<ModelsPaginatedPaymentItemResponse, ApiError>, 'queryKey' | 'queryFn'>
): UseQueryResult<ModelsPaginatedPaymentItemResponse, ApiError> {
  return useQuery( {
    queryKey: paymentsKeys.items( params ),
    queryFn: async () => {
      const response = await paymentItemsApi.paymentItemsSearchGet( {
        createdAfter: params?.createdAfter,
        createdBefore: params?.createdBefore,
        creatorId: params?.creatorId,
        itemStatus: params?.itemStatus as never,
        limit: params?.limit,
        page: params?.page,
        paymentId: params?.paymentId,
        search: params?.search,
      } );
      return response.data;
    },
    ...options,
  } );
}

export const earningsKeys = {
  all: [ 'earnings' ] as const,
  list: ( params?: object ) => [ ...earningsKeys.all, 'list', params ] as const,
  detail: ( id: string ) => [ ...earningsKeys.all, 'detail', id ] as const,
};

export interface UseCreatorEarningsParams {
  createdAfter?: string;
  createdBefore?: string;
  limit?: number;
  page?: number;
  paymentStatus?: string;
  search?: string;
}

export function useCreatorEarnings(
  params?: UseCreatorEarningsParams,
  options?: Omit<UseQueryOptions<ModelsPaginatedPaymentResponse, ApiError>, 'queryKey' | 'queryFn'>
): UseQueryResult<ModelsPaginatedPaymentResponse, ApiError> {
  return useQuery( {
    queryKey: earningsKeys.list( params ),
    queryFn: async () => {
      const response = await creatorApi.creatorsPaymentsSearchGet( {
        createdAfter: params?.createdAfter,
        createdBefore: params?.createdBefore,
        limit: params?.limit,
        page: params?.page,
        paymentStatus: params?.paymentStatus as never,
        search: params?.search,
      } );
      return response.data;
    },
    placeholderData: keepPreviousData,
    ...options,
  } );
}

export function useCreatorPayment(
  id: string,
  options?: Omit<UseQueryOptions<ModelsStandardPaymentResponse, ApiError>, 'queryKey' | 'queryFn'>
): UseQueryResult<ModelsStandardPaymentResponse, ApiError> {
  return useQuery( {
    queryKey: earningsKeys.detail( id ),
    queryFn: async () => {
      const response = await creatorApi.creatorsPaymentsIdGet( { id } );
      return response.data;
    },
    enabled: !!id,
    ...options,
  } );
}
