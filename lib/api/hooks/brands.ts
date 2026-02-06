import { 
  useQuery, 
  useSuspenseQuery,
  useMutation,
  useQueryClient,
  type UseQueryResult, 
  type UseSuspenseQueryResult,
  type UseQueryOptions,
  type UseSuspenseQueryOptions
} from '@tanstack/react-query';
import { BrandApi } from '../generated';
import { apiClient, apiConfiguration } from '../client';
import type { 
  ModelsStandardBrandResponse,
  ModelsPaginatedBrandResponses,
  ModelsBrandStatusUpdateRequest,
  ModelsPaginatedCreatorResponse
} from '../generated/models';

export const brandApi = new BrandApi(apiConfiguration, undefined, apiClient);

export const brandsKeys = {
  all: ['brands'] as const,
  details: () => [...brandsKeys.all, 'detail'] as const,
  detail: (id: string) => [...brandsKeys.details(), id] as const,
};

/**
 * Hook to fetch a single brand by ID
 */
export function useBrand(
  id: string,
  options?: Omit<UseQueryOptions<ModelsStandardBrandResponse, Error>, 'queryKey' | 'queryFn'>
): UseQueryResult<ModelsStandardBrandResponse, Error> {
  return useQuery({
    queryKey: brandsKeys.detail(id),
    queryFn: async () => {
      const response = await brandApi.brandsIdGet({ id });
      return response.data;
    },
    enabled: !!id,
    ...options,
  });
}

/**
 * Hook to fetch all brands
 */
export function useBrands(
  options?: Omit<UseQueryOptions<ModelsPaginatedBrandResponses, Error>, 'queryKey' | 'queryFn'>
): UseQueryResult<ModelsPaginatedBrandResponses, Error> {
  return useQuery({
    queryKey: brandsKeys.all,
    queryFn: async () => {
      const response = await brandApi.brandsSearchGet();
      return response.data;
    },
    ...options,
  });
}

/**
 * Suspense Hook to fetch a single brand by ID
 */
export function useSuspenseBrand(
  id: string,
  options?: Omit<UseSuspenseQueryOptions<ModelsStandardBrandResponse, Error>, 'queryKey' | 'queryFn'>
): UseSuspenseQueryResult<ModelsStandardBrandResponse, Error> {
  return useSuspenseQuery({
    queryKey: brandsKeys.detail(id),
    queryFn: async () => {
      const response = await brandApi.brandsIdGet({ id });
      return response.data;
    },
    ...options,
  });
}

/**
 * Hook to update brand profile status
 */
export function useUpdateBrandStatus(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (request: ModelsBrandStatusUpdateRequest) => {
      const response = await brandApi.brandsIdStatusPut({ id, request });
      return response.data;
    },
    onSuccess: () => {
      // Invalidate brands lists and specific brand details
      queryClient.invalidateQueries({ queryKey: brandsKeys.all });
      queryClient.invalidateQueries({ queryKey: brandsKeys.detail(id) });
    },
  });
}
/**
 * Hook to delete a brand
 */
export function useDeleteBrand() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await brandApi.brandsIdDelete({ id });
      return response.data;
    },
    onSuccess: () => {
      // Invalidate brands lists
      queryClient.invalidateQueries({ queryKey: brandsKeys.all });
    },
  });
}

/**
 * Hook to search creators (Brand view)
 */
export function useBrandCreators(
  params?: {
    q?: string;
    page?: number;
    limit?: number;
    // Add other filters as needed to match BrandsSearchCreatorsGetRequest
    preferredCategory?: string;
  },
  options?: Omit<UseQueryOptions<ModelsPaginatedCreatorResponse, Error>, 'queryKey' | 'queryFn'>
): UseQueryResult<ModelsPaginatedCreatorResponse, Error> {
  return useQuery({
    queryKey: [...brandsKeys.all, 'creators', params],
    queryFn: async () => {
      const response = await brandApi.brandsSearchCreatorsGet({
        limit: params?.limit,
        page: params?.page,
        preferredCategory: params?.preferredCategory,
        q: params?.q
      });
      return response.data;
    },
    ...options,
  });
}
