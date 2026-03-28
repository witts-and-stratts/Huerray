/**
 * Invoice Query & Mutation Hooks
 */

import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationOptions,
  type UseQueryOptions,
  type UseQueryResult,
} from '@tanstack/react-query';
import {
  InvoiceApi,
  type InvoiceApiInvoicesSearchGetRequest,
} from '../generated/api';
import { apiClient, apiConfiguration } from '../client';
import type {
  ModelsCreateInvoiceRequest,
  ModelsPaginatedInvoiceResponse,
  ModelsStandardInvoiceResponse,
  ModelsStandardInvoicePDFGeneratedResponse,
  ModelsUpdateInvoiceRequest,
} from '../generated/models';
import type { ApiError } from './types';

const invoiceApi = new InvoiceApi( apiConfiguration, undefined, apiClient );

export const invoicesKeys = {
  all: [ 'invoices' ] as const,
  lists: () => [ ...invoicesKeys.all, 'list' ] as const,
  list: ( params?: InvoiceApiInvoicesSearchGetRequest ) => [ ...invoicesKeys.lists(), params ] as const,
  detail: ( id: string ) => [ ...invoicesKeys.all, 'detail', id ] as const,
};

export function useInvoices(
  params?: InvoiceApiInvoicesSearchGetRequest,
  options?: Omit<UseQueryOptions<ModelsPaginatedInvoiceResponse, ApiError>, 'queryKey' | 'queryFn'>
): UseQueryResult<ModelsPaginatedInvoiceResponse, ApiError> {
  return useQuery( {
    queryKey: invoicesKeys.list( params ),
    queryFn: async () => {
      const response = await invoiceApi.invoicesSearchGet( params || {} );
      return response.data;
    },
    ...options,
  } );
}

export function useInvoice(
  id: string,
  options?: Omit<UseQueryOptions<ModelsStandardInvoiceResponse, ApiError>, 'queryKey' | 'queryFn'>
): UseQueryResult<ModelsStandardInvoiceResponse, ApiError> {
  return useQuery( {
    queryKey: invoicesKeys.detail( id ),
    queryFn: async () => {
      const response = await invoiceApi.invoicesIdGet( { id } );
      return response.data;
    },
    enabled: !!id,
    ...options,
  } );
}

export function useUpdateInvoiceStatus(
  options?: UseMutationOptions<ModelsStandardInvoiceResponse, ApiError, { id: string; request: ModelsUpdateInvoiceRequest }>
) {
  const queryClient = useQueryClient();

  return useMutation( {
    ...options,
    mutationFn: async ( { id, request } ) => {
      const response = await invoiceApi.invoicesIdStatusPut( { id, request } );
      return response.data;
    },
    onSuccess: ( data, variables, context ) => {
      queryClient.invalidateQueries( { queryKey: invoicesKeys.lists() } );
      queryClient.invalidateQueries( { queryKey: invoicesKeys.detail( variables.id ) } );
      if (options?.onSuccess) {
        options.onSuccess( data, variables, context, context as any );
      }
    },
    onError: ( error, variables, context ) => {
      if (options?.onError) {
        options.onError( error, variables, context, context as any );
      }
    },
  } );
}

export function useDownloadInvoicePdf(
  options?: UseMutationOptions<Blob, ApiError, string>
) {
  return useMutation( {
    mutationFn: async ( id: string ) => {
      const response = await apiClient.get<Blob>( `/invoices/${ id }/pdf`, {
        responseType: 'blob',
        headers: {
          Accept: 'application/pdf',
        },
      } );

      return response.data;
    },
    ...options,
  } );
}

export function useResendInvoicePdf(
  options?: UseMutationOptions<ModelsStandardInvoicePDFGeneratedResponse, ApiError, string>
) {
  return useMutation( {
    mutationFn: async ( id: string ) => {
      const response = await invoiceApi.invoicesIdResendPdfPost( { id } );
      return response.data;
    },
    ...options,
  } );
}

export function useCreateInvoice(
  options?: UseMutationOptions<ModelsStandardInvoiceResponse, ApiError, ModelsCreateInvoiceRequest>
) {
  const queryClient = useQueryClient();

  return useMutation( {
    ...options,
    mutationFn: async ( request: ModelsCreateInvoiceRequest ) => {
      const response = await invoiceApi.invoicesPost( { request } );
      return response.data;
    },
    onSuccess: ( data, variables, context ) => {
      queryClient.invalidateQueries( { queryKey: invoicesKeys.lists() } );
      if (options?.onSuccess) {
        options.onSuccess( data, variables, context, context as any );
      }
    },
    onError: ( error, variables, context ) => {
      if (options?.onError) {
        options.onError( error, variables, context, context as any );
      }
    },
  } );
}
