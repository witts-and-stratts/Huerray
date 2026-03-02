/**
 * Video Submissions Query & Mutation Hooks
 * 
 * Custom hooks for managing video submissions using Tanstack Query.
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
import { VideoSubmissionsApi } from '../generated/api';
import type { VideoSubmissionsApiVideosMySubmissionsGetRequest } from '../generated/api/video-submissions-api';
import { apiClient, apiConfiguration } from '../client';
import type { 
  ModelsStandardGenericResponse,
  ModelsBrandVideoDecisionRequest,
  ModelsCreateVideoSubmissionRequest,
  ModelsStandardVideoSubmissionResponse,
  ModelsStandardVideoSubmissionResponses,
  ModelsPaginatedVideoSubmissionResponse,
  ModelsUpdateVideoSubmissionRequest,
  ModelsVideoSubmissionStatusUpdateRequest,
} from '../generated/models';
import type { ApiError } from './types';


// Create API instance
const videoSubmissionsApi = new VideoSubmissionsApi( apiConfiguration, undefined, apiClient );

/**
 * Query key factory for video submissions endpoints
 */
export const videoSubmissionsKeys = {
  all: [ 'video-submissions' ] as const,
  lists: () => [ ...videoSubmissionsKeys.all, 'list' ] as const,
  search: ( params?: Record<string, unknown> ) => [ ...videoSubmissionsKeys.lists(), 'search', params ] as const,
  mySubmissions: ( params?: Record<string, unknown> ) => [ ...videoSubmissionsKeys.lists(), 'my', params ] as const,
  byGig: ( gigId: string ) => [ ...videoSubmissionsKeys.lists(), 'gig', gigId ] as const,
  details: () => [ ...videoSubmissionsKeys.all, 'detail' ] as const,
  detail: ( id: string ) => [ ...videoSubmissionsKeys.details(), id ] as const,
};

/**
 * Hook to create a new video submission
 */
export function useCreateVideoSubmission(
  options?: UseMutationOptions<ModelsStandardVideoSubmissionResponse, ApiError, ModelsCreateVideoSubmissionRequest>
): UseMutationResult<ModelsStandardVideoSubmissionResponse, ApiError, ModelsCreateVideoSubmissionRequest> {
  const queryClient = useQueryClient();

  return useMutation( {
    mutationFn: async ( submission: ModelsCreateVideoSubmissionRequest ) => {
      const response = await videoSubmissionsApi.videosPost( { submission } );
      return response.data;
    },
    onSuccess: () => {
      // Invalidate submissions lists
      queryClient.invalidateQueries( { queryKey: videoSubmissionsKeys.lists() } );
    },
    ...options,
  } );
}

/**
 * Hook to fetch creator's video submissions
 */
export function useMyVideoSubmissions(
  params?: VideoSubmissionsApiVideosMySubmissionsGetRequest,
  options?: Omit<UseQueryOptions<ModelsPaginatedVideoSubmissionResponse, ApiError>, 'queryKey' | 'queryFn'>
): UseQueryResult<ModelsPaginatedVideoSubmissionResponse, ApiError> {
  return useQuery( {
    queryKey: videoSubmissionsKeys.mySubmissions( params as Record<string, unknown> | undefined ),
    queryFn: async () => {
      const response = await videoSubmissionsApi.videosMySubmissionsGet( params );
      return response.data;
    },
    ...options,
  } );
}

/**
 * Hook to search video submissions (Admin)
 */
export function useVideoSubmissionsSearch(
  params?: { page?: number; limit?: number; status?: string; q?: string; campaignId?: string; gigId?: string; creatorId?: string; createdAfter?: string; createdBefore?: string; },
  options?: Omit<UseQueryOptions<ModelsPaginatedVideoSubmissionResponse, ApiError>, 'queryKey' | 'queryFn'>
): UseQueryResult<ModelsPaginatedVideoSubmissionResponse, ApiError> {
  return useQuery( {
    queryKey: videoSubmissionsKeys.search( params ),
    queryFn: async () => {
      const response = await videoSubmissionsApi.videosSearchGet( params as any );
      return response.data;
    },
    ...options,
  } );
}

/**
 * Hook to fetch video submissions by gig
 */
export function useVideoSubmissionsByGig(
  gigId: string,
  options?: Omit<UseQueryOptions<ModelsStandardVideoSubmissionResponses, ApiError>, 'queryKey' | 'queryFn'>
): UseQueryResult<ModelsStandardVideoSubmissionResponses, ApiError> {
  return useQuery( {
    queryKey: videoSubmissionsKeys.byGig( gigId ),
    queryFn: async () => {
      const response = await videoSubmissionsApi.videosGigGigIdGet( { gigId } );
      return response.data;
    },
    enabled: !!gigId,
    ...options,
  } );
}

/**
 * Hook for brand decision on a video submission (accept/reject)
 */
export function useVideoSubmissionDecision(
  options?: UseMutationOptions<ModelsStandardVideoSubmissionResponse, ApiError, { id: string; data: ModelsBrandVideoDecisionRequest }>
): UseMutationResult<ModelsStandardVideoSubmissionResponse, ApiError, { id: string; data: ModelsBrandVideoDecisionRequest }> {
  const queryClient = useQueryClient();

  return useMutation( {
    mutationFn: async ( { id, data } ) => {
      const response = await videoSubmissionsApi.videosIdDecisionPut( { id, data } );
      return response.data;
    },
    onSuccess: ( _response, variables ) => {
      queryClient.invalidateQueries( { queryKey: videoSubmissionsKeys.lists() } );
      queryClient.invalidateQueries( { queryKey: videoSubmissionsKeys.detail( variables.id ) } );
      queryClient.invalidateQueries( { queryKey: [ 'campaigns' ] } );
    },
    ...options,
  } );
}

/**
 * Hook to update a video submission
 */
export function useUpdateVideoSubmission(
  options?: UseMutationOptions<ModelsStandardVideoSubmissionResponse, ApiError, { id: string; submission: ModelsUpdateVideoSubmissionRequest }>
): UseMutationResult<ModelsStandardVideoSubmissionResponse, ApiError, { id: string; submission: ModelsUpdateVideoSubmissionRequest }> {
  const queryClient = useQueryClient();

  return useMutation( {
    mutationFn: async ( { id, submission } ) => {
      const response = await videoSubmissionsApi.videosIdPut( { id, submission } );
      return response.data;
    },
    onSuccess: ( _response, variables ) => {
      queryClient.invalidateQueries( { queryKey: videoSubmissionsKeys.lists() } );
      queryClient.invalidateQueries( { queryKey: videoSubmissionsKeys.detail( variables.id ) } );
      queryClient.invalidateQueries( { queryKey: [ 'campaigns' ] } );
    },
    ...options,
  } );
}

/**
 * Hook for creator to submit a video submission for approval
 */
export function useSubmitVideoSubmission(
  options?: UseMutationOptions<ModelsStandardVideoSubmissionResponse, ApiError, { id: string }>
): UseMutationResult<ModelsStandardVideoSubmissionResponse, ApiError, { id: string }> {
  const queryClient = useQueryClient();

  return useMutation( {
    mutationFn: async ( { id } ) => {
      const response = await videoSubmissionsApi.videosIdSubmitPut( { id } );
      return response.data;
    },
    onSuccess: ( _response, variables ) => {
      queryClient.invalidateQueries( { queryKey: videoSubmissionsKeys.lists() } );
      queryClient.invalidateQueries( { queryKey: videoSubmissionsKeys.detail( variables.id ) } );
      queryClient.invalidateQueries( { queryKey: [ 'campaigns' ] } );
    },
    ...options,
  } );
}

/**
 * Hook for admin update of video submission status
 */
export function useUpdateVideoSubmissionStatus(
  options?: UseMutationOptions<ModelsStandardGenericResponse, ApiError, { id: string; request: ModelsVideoSubmissionStatusUpdateRequest }>
): UseMutationResult<ModelsStandardGenericResponse, ApiError, { id: string; request: ModelsVideoSubmissionStatusUpdateRequest }> {
  const queryClient = useQueryClient();

  return useMutation( {
    mutationFn: async ( { id, request } ) => {
      const response = await videoSubmissionsApi.videosIdStatusPut( { id, request } );
      return response.data;
    },
    onSuccess: ( _response, variables ) => {
      queryClient.invalidateQueries( { queryKey: videoSubmissionsKeys.lists() } );
      queryClient.invalidateQueries( { queryKey: videoSubmissionsKeys.detail( variables.id ) } );
      queryClient.invalidateQueries( { queryKey: [ 'campaigns' ] } );
    },
    ...options,
  } );
}
