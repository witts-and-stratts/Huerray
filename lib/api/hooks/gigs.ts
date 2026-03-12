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
import { campaignsKeys } from './campaigns';
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
  ModelsStandardGigInvitationResponse,
  ModelsGigInvitationResponseRequest,
  ModelsUpdateGigApplicationRequest,
} from '../generated/models';
import type { ApiError } from './types';


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
  byCampaign: ( campaignId: string, role?: string ) => [ ...gigsKeys.all, 'campaign', campaignId, role ] as const,
  invitations: ( gigId: string ) => [ ...gigsKeys.all, 'invitations', gigId ] as const,
};

/**
 * Hook to fetch all gigs
 */
export function useGigs(
  params?: Record<string, unknown>,
  options?: Omit<UseQueryOptions<ModelsPaginatedGigResponse, ApiError>, 'queryKey' | 'queryFn'>
): UseQueryResult<ModelsPaginatedGigResponse, ApiError> {
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
  options?: Omit<UseQueryOptions<ModelsPaginatedGigResponse, ApiError>, 'queryKey' | 'queryFn'>
): UseQueryResult<ModelsPaginatedGigResponse, ApiError> {
  return useQuery( {
    queryKey: gigsKeys.byCampaign( campaignId, role ),
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
  options?: UseMutationOptions<ModelsStandardGigResponse, ApiError, ModelsCreateGigRequest>
): UseMutationResult<ModelsStandardGigResponse, ApiError, ModelsCreateGigRequest> {
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
  options?: UseMutationOptions<ModelsStandardGenericResponse, ApiError, { id: string; status: ModelsGigStatusUpdateRequest }>
): UseMutationResult<ModelsStandardGenericResponse, ApiError, { id: string; status: ModelsGigStatusUpdateRequest }> {
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
  options?: UseMutationOptions<ModelsStandardGigResponse, ApiError, { id: string; gig: ModelsUpdateGigRequest }>
): UseMutationResult<ModelsStandardGigResponse, ApiError, { id: string; gig: ModelsUpdateGigRequest }> {
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
  options?: UseMutationOptions<ModelsStandardGenericResponse, ApiError, string>
): UseMutationResult<ModelsStandardGenericResponse, ApiError, string> {
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
  options?: Omit<UseQueryOptions<ModelsStandardGigResponse, ApiError>, 'queryKey' | 'queryFn'>
): UseQueryResult<ModelsStandardGigResponse, ApiError> {
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
  options?: UseMutationOptions<ModelsStandardGigApplicationResponse, ApiError, { id: string; application: ModelsGigApplicationRequest }>
): UseMutationResult<ModelsStandardGigApplicationResponse, ApiError, { id: string; application: ModelsGigApplicationRequest }> {
  const queryClient = useQueryClient();
  const { onSuccess, ...restOptions } = options ?? {};

  return useMutation( {
    mutationFn: async ( { id, application } ) => {
      const response = await gigsApi.gigsIdApplyPost( { id, application } );
      return response.data;
    },
    onSuccess: async ( data, variables, onMutateResult, context ) => {
      await Promise.all( [
        queryClient.invalidateQueries( { queryKey: gigsKeys.all } ),
        queryClient.invalidateQueries( { queryKey: [ 'creators' ] } ),
        queryClient.invalidateQueries( { queryKey: [ 'campaigns' ] } ),
      ] );

      await onSuccess?.( data, variables, onMutateResult, context );
    },
    ...restOptions,
  } );
}

/**
 * Hook to fetch invitations for a specific gig
 */
export function useGigInvitations(
  gigId: string,
  options?: Omit<UseQueryOptions<ModelsStandardGigInvitationResponse, ApiError>, 'queryKey' | 'queryFn'>
) {
  return useQuery( {
    queryKey: gigsKeys.invitations( gigId ),
    queryFn: async () => {
      const response = await gigsApi.gigsIdInvitationsGet( { id: gigId } );
      return response.data;
    },
    enabled: !!gigId,
    ...options,
  } );
}

/**
 * Hook to invite a creator to a gig
 */
export function useInviteCreatorToGig(
  options?: UseMutationOptions<ModelsStandardGigInvitationResponse, ApiError, { id: string; invitation: ModelsGigInvitationRequest }>
): UseMutationResult<ModelsStandardGigInvitationResponse, ApiError, { id: string; invitation: ModelsGigInvitationRequest }> {
  const queryClient = useQueryClient();

  return useMutation( {
    mutationFn: async ( { id, invitation } ) => {
      const response = await gigsApi.gigsIdInvitePost( { id, invitation } );
      return response.data;
    },
    onSuccess: ( _, variables ) => {
      queryClient.invalidateQueries( { queryKey: gigsKeys.invitations( variables.id ) } );
    },
    ...options,
  } );
}

/**
 * Hook to respond to an invitation
 */
export function useRespondToInvitation(
  options?: UseMutationOptions<ModelsStandardGenericResponse, ApiError, { invitationId: string; response: ModelsGigInvitationResponseRequest }>
): UseMutationResult<ModelsStandardGenericResponse, ApiError, { invitationId: string; response: ModelsGigInvitationResponseRequest }> {
  const queryClient = useQueryClient();

  return useMutation( {
    mutationFn: async ( { invitationId, response } ) => {
      const result = await gigsApi.gigsInvitationsInvitationIdRespondPut( { invitationId, request: response } );
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries( { queryKey: gigsKeys.all } );
    },
    ...options,
  } );
}

/**
 * Hook to update a gig application status (accept/decline)
 */
export function useUpdateApplicationStatus(
  options?: UseMutationOptions<ModelsStandardGigApplicationResponse, ApiError, { applicationId: string; request: ModelsUpdateGigApplicationRequest }>
): UseMutationResult<ModelsStandardGigApplicationResponse, ApiError, { applicationId: string; request: ModelsUpdateGigApplicationRequest }> {
  const queryClient = useQueryClient();

  return useMutation( {
    mutationFn: async ( { applicationId, request } ) => {
      const response = await gigsApi.gigsApplicationsApplicationIdStatusPut( { applicationId, request } );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries( { queryKey: gigsKeys.all } );
      queryClient.invalidateQueries( { queryKey: campaignsKeys.details() } );
    },
    ...options,
  } );
}

/**
 * Hook to fetch all invitations for the authenticated creator
 */
export function useCreatorInvitations(
  options?: Omit<UseQueryOptions<ModelsStandardGigInvitationResponse, ApiError>, 'queryKey' | 'queryFn'>
) {
  return useQuery( {
    queryKey: [ ...gigsKeys.all, 'invitations' ],
    queryFn: async () => {
      const response = await gigsApi.gigsInvitationsGet();
      return response.data;
    },
    ...options,
  } );
}
