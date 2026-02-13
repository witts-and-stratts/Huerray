/**
 * Uploads Mutation Hooks
 * 
 * Custom hooks for managing file uploads using Tanstack Query.
 */

import { 
  useMutation, 
  type UseMutationResult,
  type UseMutationOptions
} from '@tanstack/react-query';
import { UploadApi } from '../generated/api';
import { apiClient, apiConfiguration } from '../client';
import type { 
  ModelsStandardVideoSubmissionUploadResponse
} from '../generated/models';

// Create API instance
const uploadApi = new UploadApi( apiConfiguration, undefined, apiClient );

/**
 * Hook to upload a video submission file
 */
export function useUploadVideoSubmission(
  options?: UseMutationOptions<ModelsStandardVideoSubmissionUploadResponse, Error, { gigId: string; video: File }>
): UseMutationResult<ModelsStandardVideoSubmissionUploadResponse, Error, { gigId: string; video: File }> {
  return useMutation( {
    mutationFn: async ( { gigId, video } ) => {
      const response = await uploadApi.uploadsVideoSubmissionPost( { gigId, video } );
      return response.data;
    },
    ...options,
  } );
}
