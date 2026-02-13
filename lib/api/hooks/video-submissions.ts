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
import { apiClient, apiConfiguration } from '../client';
import type { 
  ModelsStandardGenericResponse,
  ModelsCreateVideoSubmissionRequest,
  ModelsStandardVideoSubmissionResponse,
  ModelsPaginatedVideoSubmissionResponse,
  ModelsUpdateVideoSubmissionRequest
} from '../generated/models';


// Create API instance
const videoSubmissionsApi = new VideoSubmissionsApi( apiConfiguration, undefined, apiClient );

/**
 * Query key factory for video submissions endpoints
 */
export const videoSubmissionsKeys = {
  all: [ 'video-submissions' ] as const,
  lists: () => [ ...videoSubmissionsKeys.all, 'list' ] as const,
  mySubmissions: ( params?: Record<string, unknown> ) => [ ...videoSubmissionsKeys.lists(), 'my', params ] as const,
  details: () => [ ...videoSubmissionsKeys.all, 'detail' ] as const,
  detail: ( id: string ) => [ ...videoSubmissionsKeys.details(), id ] as const,
};

/**
 * Hook to create a new video submission
 */
export function useCreateVideoSubmission(
  options?: UseMutationOptions<ModelsStandardVideoSubmissionResponse, Error, ModelsCreateVideoSubmissionRequest>
): UseMutationResult<ModelsStandardVideoSubmissionResponse, Error, ModelsCreateVideoSubmissionRequest> {
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
  params?: { page?: number; limit?: number },
  options?: Omit<UseQueryOptions<ModelsPaginatedVideoSubmissionResponse, Error>, 'queryKey' | 'queryFn'>
): UseQueryResult<ModelsPaginatedVideoSubmissionResponse, Error> {
  return useQuery( {
    queryKey: videoSubmissionsKeys.mySubmissions( params ),
    queryFn: async () => {
      const response = await videoSubmissionsApi.videosMySubmissionsGet( params );
      return response.data;
    },
    ...options,
  } );
}
