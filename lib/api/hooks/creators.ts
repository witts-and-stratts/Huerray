/**
 * Creators Query & Mutation Hooks
 * 
 * Custom hooks for managing creator-related data using Tanstack Query.
 */

import { 
  useQuery, 
  useMutation, 
  useQueryClient,
  keepPreviousData,
  type UseQueryResult, 
  type UseMutationResult,
  type UseQueryOptions,
  type UseMutationOptions
} from '@tanstack/react-query';
import { CreatorApi } from '../generated/api';
import type { CreatorApiCreatorsSearchGigsGetRequest } from '../generated/api/creator-api';
import { apiClient, apiConfiguration } from '../client';
import type {
  ModelsPaginatedGigCreatorResponse,
  ModelsPaginatedCreatorResponse,
  ModelsStandardGigCreatorListResponse,
  ModelsGigResponse,
  ModelsCreatorResponse,
  ModelsStandardCreatorResponse,
  ModelsCreatorStatusUpdateRequest,
  ModelsCreatorBankTaxDetailsResponse,
  ModelsUpdateCreatorBankDetailsRequest,
  ModelsStandardGigApplicationResponses,
} from '@/lib/api/generated/models';
import type { ApiError } from './types';

// Create API instance
const creatorsApi = new CreatorApi( apiConfiguration, undefined, apiClient );

/**
 * Query key factory for creators endpoints
 */
export const creatorsKeys = {
  all: [ 'creators' ] as const,
  matchingGigs: ( params?: Record<string, unknown> ) => [ ...creatorsKeys.all, 'matching-gigs', params ] as const,
  activeGigs: () => [ ...creatorsKeys.all, 'active-gigs' ] as const,
  gigs: ( params?: CreatorApiCreatorsSearchGigsGetRequest ) => [ ...creatorsKeys.all, 'gigs', params ] as const,
  applications: () => [ ...creatorsKeys.all, 'applications' ] as const,
  profile: () => [ ...creatorsKeys.all, 'profile' ] as const,
  bank: () => [ ...creatorsKeys.all, 'bank' ] as const,
};

/**
 * Hook to fetch the profile of the current authenticated creator
 */
export function useCreatorProfile(
  options?: Omit<UseQueryOptions<ModelsCreatorResponse | undefined, ApiError>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: creatorsKeys.profile(),
    queryFn: async () => {
      const response = await creatorsApi.creatorsProfileGet();
      return response.data?.data;
    },
    ...options,
  });
}

/**
 * Hook to fetch the bank details of the current authenticated creator
 */
export function useOwnBankDetails(
  options?: Omit<UseQueryOptions<ModelsCreatorBankTaxDetailsResponse | undefined, ApiError>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: creatorsKeys.bank(),
    queryFn: async () => {
      const response = await creatorsApi.creatorsBankDetailsGet();
      return response.data?.data;
    },
    ...options,
  });
}

/**
 * Hook to update the authenticated creator's bank details
 */
export function useUpdateOwnBankDetails() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (request: ModelsUpdateCreatorBankDetailsRequest) => {
      const response = await creatorsApi.creatorsBankDetailsPut({ request });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: creatorsKeys.bank() });
    },
  });
}

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
  options?: Omit<UseQueryOptions<ModelsPaginatedGigCreatorResponse, ApiError>, 'queryKey' | 'queryFn'>
): UseQueryResult<ModelsPaginatedGigCreatorResponse, ApiError> {
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
 * Hook to fetch active gigs for the current creator
 */
export function useActiveGigs(
  options?: Omit<UseQueryOptions<ModelsStandardGigCreatorListResponse, ApiError>, 'queryKey' | 'queryFn'>
): UseQueryResult<ModelsStandardGigCreatorListResponse, ApiError> {
  return useQuery( {
    queryKey: creatorsKeys.activeGigs(),
    queryFn: async () => {
      const response = await creatorsApi.creatorsActiveGigsGet();
      return response.data;
    },
    ...options,
  } );
}

/**
 * Hook to fetch gigs where the current creator has participated
 */
export function useCreatorGigs(
  params?: CreatorApiCreatorsSearchGigsGetRequest,
  options?: Omit<UseQueryOptions<ModelsPaginatedGigCreatorResponse, ApiError>, 'queryKey' | 'queryFn'>
): UseQueryResult<ModelsPaginatedGigCreatorResponse, ApiError> {
  return useQuery( {
    queryKey: creatorsKeys.gigs( params ),
    queryFn: async () => {
      const response = await creatorsApi.creatorsSearchGigsGet( params || {} );
      return response.data;
    },
    ...options,
  } );
}

/**
 * Hook to fetch all gig applications submitted by the current creator
 */
export function useCreatorApplications(
  options?: Omit<UseQueryOptions<ModelsStandardGigApplicationResponses, ApiError>, 'queryKey' | 'queryFn'>
): UseQueryResult<ModelsStandardGigApplicationResponses, ApiError> {
  return useQuery( {
    queryKey: creatorsKeys.applications(),
    queryFn: async () => {
      const response = await creatorsApi.creatorsApplicationsGet();
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
  options?: Omit<UseQueryOptions<ModelsCreatorResponse | undefined, ApiError>, 'queryKey' | 'queryFn'>
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
 * Hook to fetch a single creator's bank details by ID
 */
export function useCreatorBankDetails(
  id: string,
  options?: Omit<UseQueryOptions<ModelsCreatorBankTaxDetailsResponse | undefined, ApiError>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: [...creatorsKeys.all, 'bank-details', id],
    queryFn: async () => {
      const response = await creatorsApi.creatorsIdBankDetailsGet({id});
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

/**
 * Hook to update any creator's profile status (id passed as mutation variable)
 */
export function useUpdateCreatorProfileStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, creator_status, comments }: { id: string } & ModelsCreatorStatusUpdateRequest) => {
      const response = await creatorsApi.creatorsIdProfileStatusPut({ id, request: { creator_status, comments } });
      return response.data;
    },
    onSuccess: ( _, variables ) => {
      queryClient.invalidateQueries({ queryKey: creatorsKeys.all });
      queryClient.invalidateQueries({ queryKey: [ ...creatorsKeys.all, 'detail', variables.id ] });
    },
  });
}

/**
 * Hook to update a creator's content type via PUT /creators/profile
 */
export function useUpdateCreatorContentType() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, content_type }: { id: string; content_type: string }) => {
      const response = await apiClient.put(`/creators/${id}/profile`, { content_type });
      return response.data;
    },
    onSuccess: ( _, variables ) => {
      queryClient.invalidateQueries({ queryKey: creatorsKeys.all });
      queryClient.invalidateQueries({ queryKey: [ ...creatorsKeys.all, 'detail', variables.id ] });
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
  } = {},
  options?: Omit<UseQueryOptions<ModelsPaginatedCreatorResponse, ApiError>, 'queryKey' | 'queryFn'>
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
    placeholderData: keepPreviousData,
    ...options,
  });
}
