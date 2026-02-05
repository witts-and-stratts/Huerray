/**
 * Creators Query & Mutation Hooks
 * 
 * Custom hooks for managing creator-related data using Tanstack Query.
 */

import { 
  useQuery, 
  useMutation, 
  useQueryClient,
  type UseQueryResult, 
  type UseMutationResult,
  type UseQueryOptions,
  type UseMutationOptions
} from '@tanstack/react-query';
import { CreatorApi } from '../generated/api';
import { apiClient, apiConfiguration } from '../client';
import type { 
  ModelsPaginatedGigCreatorResponse,
  ModelsGigResponse,
  ModelsCreatorResponse,
  ModelsStandardCreatorResponse,
  ModelsCreatorStatusUpdateRequest
} from '@/lib/api/generated/models';

// Create API instance
const creatorsApi = new CreatorApi( apiConfiguration, undefined, apiClient );

/**
 * Query key factory for creators endpoints
 */
export const creatorsKeys = {
  all: [ 'creators' ] as const,
  matchingGigs: ( params?: Record<string, unknown> ) => [ ...creatorsKeys.all, 'matching-gigs', params ] as const,
};

/**
 * Hook to fetch matching gigs for the current creator
 */
export function useMatchingGigs(
  params?: {
    brandId?: string;
    enforceSingleCreatorSubmission?: boolean;
    enforceUniqueCreatorSubmission?: boolean;
    gender?: string;
    limit?: number;
    page?: number;
  },
  options?: Omit<UseQueryOptions<ModelsPaginatedGigCreatorResponse, Error>, 'queryKey' | 'queryFn'>
): UseQueryResult<ModelsPaginatedGigCreatorResponse, Error> {
  return useQuery( {
    queryKey: creatorsKeys.matchingGigs( params ),
    queryFn: async () => {
      const response = await creatorsApi.creatorsMatchingGigsGet(params || {});
      return response.data;
    },
    ...options,
  } );
}
/**
 * Hook to fetch a single creator by ID
 */
export function useCreator(
  id: string,
  options?: Omit<UseQueryOptions<ModelsCreatorResponse | undefined, Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: [...creatorsKeys.all, 'detail', id],
    queryFn: async () => {
      // Use the correct endpoint for fetching full creator profile
      const response = await apiClient.get<ModelsStandardCreatorResponse>(`/creators/${id}`);
      return response.data?.data;
    },
    enabled: !!id,
    ...options,
  });
}
/**
 * Hook to update creator profile status
 */
export function useUpdateCreatorStatus(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ creator_status, comments }: ModelsCreatorStatusUpdateRequest) => {
      // Cast the status string to the enum type required by the API
      // @ts-ignore - The generated enum type might be tricky to satisfy directly with string, usually safe if value is valid
      const response = await creatorsApi.creatorsIdProfileStatusPut({ id, request: { creator_status, comments } });
      return response.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: creatorsKeys.all });
      // Also invalidate the specific detail query
      queryClient.invalidateQueries({ queryKey: [...creatorsKeys.all, 'detail', id] });
    },
  });
}
export function useCreators(
  {
    q,
    status,
    page = 1,
    limit = 10,
    ...filters
  }: {
    q?: string;
    status?: any; // strict typing if possible, else any or string
    page?: number;
    limit?: number;
    [key: string]: any;
  } = {}
) {
  return useQuery({
    queryKey: [...creatorsKeys.all, 'list', { q, status, page, limit, ...filters }],
    queryFn: async () => {
      // @ts-ignore
      const response = await creatorsApi.creatorsSearchGet({
        q,
        status,
        page,
        limit,
        ...filters
      });
      return response.data;
    },
  });
}
