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
import type {
  BrandApiBrandsGigsGetRequest,
  BrandApiBrandsSearchGetRequest,
  BrandApiBrandsSearchVideoSubmissionsGetRequest,
} from '../generated/api';
import { apiClient, apiConfiguration } from '../client';
import type { 
  ModelsStandardBrandResponse,
  ModelsPaginatedBrandResponses,
  ModelsBrandStatusUpdateRequest,
  ModelsPaginatedCreatorResponse,
  ModelsPaginatedGigBrandResponse,
  ModelsPaginatedVideoSubmissionResponse,
} from '../generated/models';
import type { ApiError } from './types';

export const brandApi = new BrandApi(apiConfiguration, undefined, apiClient);

export const brandsKeys = {
  all: ['brands'] as const,
  lists: () => [ ...brandsKeys.all, 'list' ] as const,
  list: ( params?: BrandApiBrandsSearchGetRequest ) => [ ...brandsKeys.lists(), params ] as const,
  details: () => [...brandsKeys.all, 'detail'] as const,
  detail: (id: string) => [...brandsKeys.details(), id] as const,
  profile: () => [...brandsKeys.all, 'profile'] as const,
  gigs: (params?: BrandApiBrandsGigsGetRequest) => [...brandsKeys.all, 'gigs', params] as const,
  videoSubmissions: (params?: BrandApiBrandsSearchVideoSubmissionsGetRequest) => [...brandsKeys.all, 'video-submissions', params] as const,
};

/**
 * Hook to fetch a single brand by ID
 */
export function useBrand(
  id: string,
  options?: Omit<UseQueryOptions<ModelsStandardBrandResponse, ApiError>, 'queryKey' | 'queryFn'>
): UseQueryResult<ModelsStandardBrandResponse, ApiError> {
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
 * Hook to fetch the authenticated brand profile (/brands)
 */
export function useBrandProfile(
  options?: Omit<UseQueryOptions<ModelsStandardBrandResponse, ApiError>, 'queryKey' | 'queryFn'>
): UseQueryResult<ModelsStandardBrandResponse, ApiError> {
  return useQuery({
    queryKey: brandsKeys.profile(),
    queryFn: async () => {
      const response = await brandApi.brandsGet();
      return response.data;
    },
    ...options,
  });
}

/**
 * Hook to fetch all brands
 */
export function useBrands(
  params?: BrandApiBrandsSearchGetRequest,
  options?: Omit<UseQueryOptions<ModelsPaginatedBrandResponses, ApiError>, 'queryKey' | 'queryFn'>
): UseQueryResult<ModelsPaginatedBrandResponses, ApiError> {
  return useQuery({
    queryKey: brandsKeys.list( params ),
    queryFn: async () => {
      const response = await brandApi.brandsSearchGet( params );
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
  options?: Omit<UseSuspenseQueryOptions<ModelsStandardBrandResponse, ApiError>, 'queryKey' | 'queryFn'>
): UseSuspenseQueryResult<ModelsStandardBrandResponse, ApiError> {
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
    preferredCategory?: string;
    // Gig requirement filters
    ageMin?: number;
    ageMax?: number;
    gender?: 'male' | 'female' | 'any';
    contentType?: 'human-generated' | 'ai-generated';
    city?: string;
    country?: string;
  },
  options?: Omit<UseQueryOptions<ModelsPaginatedCreatorResponse, ApiError>, 'queryKey' | 'queryFn'>
): UseQueryResult<ModelsPaginatedCreatorResponse, ApiError> {
  return useQuery({
    queryKey: [...brandsKeys.all, 'creators', params],
    queryFn: async () => {
      const response = await brandApi.brandsSearchCreatorsGet({
        limit: params?.limit,
        page: params?.page,
        preferredCategory: params?.preferredCategory,
        q: params?.q,
        ageMin: params?.ageMin,
        ageMax: params?.ageMax,
        gender: params?.gender as any,
        contentType: params?.contentType as any,
        city: params?.city,
        country: params?.country,
      });
      return response.data;
    },
    ...options,
  });
}

/**
 * Hook to search gigs for the authenticated brand (/brands/gigs)
 */
export function useBrandGigs(
  params?: BrandApiBrandsGigsGetRequest,
  options?: Omit<UseQueryOptions<ModelsPaginatedGigBrandResponse, ApiError>, 'queryKey' | 'queryFn'>
): UseQueryResult<ModelsPaginatedGigBrandResponse, ApiError> {
  return useQuery({
    queryKey: brandsKeys.gigs(params),
    queryFn: async () => {
      const response = await brandApi.brandsGigsGet(params);
      return response.data;
    },
    ...options,
  });
}

/**
 * Hook to search video submissions for the authenticated brand (/brands/search/video-submissions)
 */
export function useBrandVideoSubmissions(
  params?: BrandApiBrandsSearchVideoSubmissionsGetRequest,
  options?: Omit<UseQueryOptions<ModelsPaginatedVideoSubmissionResponse, ApiError>, 'queryKey' | 'queryFn'>
): UseQueryResult<ModelsPaginatedVideoSubmissionResponse, ApiError> {
  return useQuery({
    queryKey: brandsKeys.videoSubmissions(params),
    queryFn: async () => {
      const response = await brandApi.brandsSearchVideoSubmissionsGet(params);
      return response.data;
    },
    ...options,
  });
}
