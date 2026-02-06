/**
 * Gigs Query & Mutation Hooks
 * 
 * Custom hooks for managing gigs using Tanstack Query.
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
import { GigsApi } from '../generated/api';
import { apiClient, apiConfiguration } from '../client';
import type { 
  ModelsStandardGenericResponse,
  ModelsPaginatedGigResponse, 
  ModelsCreateGigRequest,
  ModelsGigStatusUpdateRequest,
  ModelsUpdateGigRequest,
  ModelsGigResponse,
  ModelsStandardGigResponse,
  ModelsGigApplicationRequest,
  ModelsStandardGigApplicationResponse,
  ModelsGigInvitationRequest,
  ModelsStandardGigInvitationResponse
} from '../generated/models';


// Create API instance
const gigsApi = new GigsApi( apiConfiguration, undefined, apiClient );

/**
 * Query key factory for gigs endpoints
 */
export const gigsKeys = {
  all: [ 'gigs' ] as const,
  lists: () => [ ...gigsKeys.all, 'list' ] as const,
  list: ( params?: Record<string, unknown> ) => [ ...gigsKeys.lists(), params ] as const,
  details: () => [ ...gigsKeys.all, 'detail' ] as const,
  detail: ( id: string ) => [ ...gigsKeys.details(), id ] as const,
  byCampaign: ( campaignId: string ) => [ ...gigsKeys.all, 'campaign', campaignId ] as const,
};

/**
 * Hook to fetch all gigs
 */
export function useGigs(
  params?: Record<string, unknown>,
  options?: Omit<UseQueryOptions<ModelsPaginatedGigResponse, Error>, 'queryKey' | 'queryFn'>
): UseQueryResult<ModelsPaginatedGigResponse, Error> {
  return useQuery( {
    queryKey: gigsKeys.list( params ),
    queryFn: async () => {
      const response = await gigsApi.gigsSearchGet( params as any );
      return response.data;
    },
    ...options,
  } );
}

/**
 * Hook to fetch gigs for a specific campaign
 */
export function useGigsByCampaign(
  campaignId: string,
  role: 'brand' | 'admin',
  options?: Omit<UseQueryOptions<ModelsPaginatedGigResponse, Error>, 'queryKey' | 'queryFn'>
): UseQueryResult<ModelsPaginatedGigResponse, Error> {
  return useQuery( {
    queryKey: gigsKeys.byCampaign( campaignId ),
    queryFn: async () => {
      if ( role === 'admin' ) {
        const response = await gigsApi.gigsSearchGet( { campaignId } );
        return response.data;
      } else {
        const response = await gigsApi.gigsCampaignsCampaignIdGet( { campaignId } );
        // Normalize brand response to match paginated interface
        const data = response.data as any;
        return {
          data: data?.data?.gigs || [],
          meta: { total: data?.data?.total || data?.data?.gigs?.length || 0 }
        } as any;
      }
    },
    enabled: !!campaignId,
    ...options,
  } );
}

/**
 * Hook to create a new gig
 */
export function useCreateGig(
  options?: UseMutationOptions<ModelsStandardGenericResponse, Error, ModelsCreateGigRequest>
): UseMutationResult<ModelsStandardGenericResponse, Error, ModelsCreateGigRequest> {
  const queryClient = useQueryClient();

  return useMutation( {
    mutationFn: async ( gigData: ModelsCreateGigRequest ) => {
      const response = await gigsApi.gigsPost( { gig: gigData } );
      return response.data;
    },
    onSuccess: ( _, variables ) => {
      // Invalidate gigs lists and campaign-specific gigs
      queryClient.invalidateQueries( { queryKey: gigsKeys.lists() } );
      queryClient.invalidateQueries( { queryKey: gigsKeys.byCampaign( variables.campaign_id ) } );
    },
    ...options,
  } );
}

/**
 * Hook to update gig status
 */
export function useUpdateGigStatus(
  options?: UseMutationOptions<ModelsStandardGenericResponse, Error, { id: string; status: ModelsGigStatusUpdateRequest }>
): UseMutationResult<ModelsStandardGenericResponse, Error, { id: string; status: ModelsGigStatusUpdateRequest }> {
  const queryClient = useQueryClient();

  return useMutation( {
    mutationFn: async ( { id, status } ) => {
      const response = await gigsApi.gigsIdStatusPut( { id, status } );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries( { queryKey: gigsKeys.all } );
    },
    ...options,
  } );
}

/**
 * Hook to update a gig
 */
export function useUpdateGig(
  options?: UseMutationOptions<ModelsStandardGenericResponse, Error, { id: string; gig: ModelsUpdateGigRequest }>
): UseMutationResult<ModelsStandardGenericResponse, Error, { id: string; gig: ModelsUpdateGigRequest }> {
  const queryClient = useQueryClient();

  return useMutation( {
    mutationFn: async ( { id, gig } ) => {
      const response = await gigsApi.gigsIdPut( { id, gig } );
      return response.data;
    },
    onSuccess: ( _, variables ) => {
      queryClient.invalidateQueries( { queryKey: gigsKeys.all } );
    },
    ...options,
  } );
}

/**
 * Hook to delete a gig
 */
export function useDeleteGig(
  options?: UseMutationOptions<ModelsStandardGenericResponse, Error, string>
): UseMutationResult<ModelsStandardGenericResponse, Error, string> {
  const queryClient = useQueryClient();

  return useMutation( {
    mutationFn: async ( id: string ) => {
      const response = await gigsApi.gigsIdDelete( { id } );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries( { queryKey: gigsKeys.all } );
    },
    ...options,
  } );
}

/**
 * Hook to fetch a single gig
 */
export function useGig(
  id: string,
  options?: Omit<UseQueryOptions<ModelsStandardGigResponse, Error>, 'queryKey' | 'queryFn'>
): UseQueryResult<ModelsStandardGigResponse, Error> {
  return useQuery( {
    queryKey: gigsKeys.detail( id ),
    queryFn: async () => {
      const response = await gigsApi.gigsIdGet( { id } );
      return response.data;
    },
    enabled: !!id,
    ...options,
  } );
}
/**
 * Hook to apply to a gig
 */
export function useApplyToGig(
  options?: UseMutationOptions<ModelsStandardGigApplicationResponse, Error, { id: string; application: ModelsGigApplicationRequest }>
): UseMutationResult<ModelsStandardGigApplicationResponse, Error, { id: string; application: ModelsGigApplicationRequest }> {
  return useMutation( {
    mutationFn: async ( { id, application } ) => {
      const response = await gigsApi.gigsIdApplyPost( { id, application } );
      return response.data;
    },
    ...options,
  } );
}

/**
 * Hook to invite a creator to a gig
 */
export function useInviteCreatorToGig(
  options?: UseMutationOptions<ModelsStandardGigInvitationResponse, Error, { id: string; invitation: ModelsGigInvitationRequest }>
): UseMutationResult<ModelsStandardGigInvitationResponse, Error, { id: string; invitation: ModelsGigInvitationRequest }> {
  return useMutation( {
    mutationFn: async ( { id, invitation } ) => {
      const response = await gigsApi.gigsIdInvitePost( { id, invitation } );
      return response.data;
    },
    ...options,
  } );
}
