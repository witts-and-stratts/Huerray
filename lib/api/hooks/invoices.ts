/**
 * Invoice Query & Mutation Hooks
 */

import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from '@tanstack/react-query';
import { InvoiceApi } from '../generated/api';
import { apiClient, apiConfiguration } from '../client';
import type {
  ModelsCreateInvoiceRequest,
  ModelsStandardInvoiceResponse,
} from '../generated/models';

const invoiceApi = new InvoiceApi( apiConfiguration, undefined, apiClient );

export const invoicesKeys = {
  all: [ 'invoices' ] as const,
  lists: () => [ ...invoicesKeys.all, 'list' ] as const,
  detail: ( id: string ) => [ ...invoicesKeys.all, 'detail', id ] as const,
};

export function useCreateInvoice(
  options?: UseMutationOptions<ModelsStandardInvoiceResponse, Error, ModelsCreateInvoiceRequest>
) {
  const queryClient = useQueryClient();

  return useMutation( {
    mutationFn: async ( request: ModelsCreateInvoiceRequest ) => {
      const response = await invoiceApi.invoicesPost( { request } );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries( { queryKey: invoicesKeys.lists() } );
    },
    ...options,
  } );
}
