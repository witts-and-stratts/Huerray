/**
 * Campaigns Query & Mutation Hooks
 * 
 * Custom hooks for managing campaigns using Tanstack Query.
 * Includes both queries (fetching) and mutations (creating/updating/deleting).
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
import { CampaignsApi } from '../generated/api';
import { apiClient, apiConfiguration } from '../client';
import type { ModelsStandardResponse } from '../generated/models';

// Create campaigns API instance
const campaignsApi = new CampaignsApi(apiConfiguration, undefined, apiClient);

/**
 * Query key factory for campaigns endpoints
 */
export const campaignsKeys = {
  all: ['campaigns'] as const,
  lists: () => [...campaignsKeys.all, 'list'] as const,
  list: (filters?: Record<string, any>) => [...campaignsKeys.lists(), filters] as const,
  details: () => [...campaignsKeys.all, 'detail'] as const,
  detail: (id: string) => [...campaignsKeys.details(), id] as const,
};

/**
 * Hook to fetch all campaigns
 * 
 * @example
 * ```tsx
 * function CampaignsList() {
 *   const { data, isLoading } = useCampaigns();
 *   
 *   if (isLoading) return <div>Loading campaigns...</div>;
 *   
 *   return (
 *     <ul>
 *       {data?.data?.campaigns?.map(campaign => (
 *         <li key={campaign.id}>{campaign.title}</li>
 *       ))}
 *     </ul>
 *   );
 * }
 * ```
 */
export function useCampaigns(
  options?: Omit<UseQueryOptions<ModelsStandardResponse, Error>, 'queryKey' | 'queryFn'>
): UseQueryResult<ModelsStandardResponse, Error> {
  return useQuery({
    queryKey: campaignsKeys.list(),
    queryFn: async () => {
      const response = await campaignsApi.campaignsGetCampaigns();
      return response.data;
    },
    ...options,
  });
}

/**
 * Hook to fetch a single campaign by ID
 * 
 * @param id - Campaign ID
 * 
 * @example
 * ```tsx
 * function CampaignDetail({ id }: { id: string }) {
 *   const { data, isLoading } = useCampaign(id);
 *   
 *   if (isLoading) return <div>Loading...</div>;
 *   
 *   return <h1>{data?.data?.campaign?.title}</h1>;
 * }
 * ```
 */
export function useCampaign(
  id: string,
  options?: Omit<UseQueryOptions<ModelsStandardResponse, Error>, 'queryKey' | 'queryFn'>
): UseQueryResult<ModelsStandardResponse, Error> {
  return useQuery({
    queryKey: campaignsKeys.detail(id),
    queryFn: async () => {
      const response = await campaignsApi.campaignsGetCampaign(id);
      return response.data;
    },
    enabled: !!id, // Only run query if id is provided
    ...options,
  });
}

/**
 * Hook to create a new campaign
 * 
 * @example
 * ```tsx
 * function CreateCampaignForm() {
 *   const createCampaign = useCreateCampaign();
 *   
 *   const handleSubmit = (formData: any) => {
 *     createCampaign.mutate(formData, {
 *       onSuccess: (data) => {
 *         console.log('Campaign created:', data);
 *       },
 *       onError: (error) => {
 *         console.error('Failed to create campaign:', error);
 *       }
 *     });
 *   };
 *   
 *   return <form onSubmit={handleSubmit}>...</form>;
 * }
 * ```
 */
export function useCreateCampaign(
  options?: UseMutationOptions<ModelsStandardResponse, Error, any>
): UseMutationResult<ModelsStandardResponse, Error, any> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (campaignData: any) => {
      const response = await campaignsApi.campaignsCreateCampaign(campaignData);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch campaigns list
      queryClient.invalidateQueries({ queryKey: campaignsKeys.lists() });
    },
    ...options,
  });
}

/**
 * Hook to update an existing campaign
 * 
 * @example
 * ```tsx
 * function EditCampaignForm({ campaignId }: { campaignId: string }) {
 *   const updateCampaign = useUpdateCampaign();
 *   
 *   const handleUpdate = (updates: any) => {
 *     updateCampaign.mutate({ id: campaignId, data: updates }, {
 *       onSuccess: () => {
 *         console.log('Campaign updated successfully');
 *       }
 *     });
 *   };
 *   
 *   return <form onSubmit={handleUpdate}>...</form>;
 * }
 * ```
 */
export function useUpdateCampaign(
  options?: UseMutationOptions<ModelsStandardResponse, Error, { id: string; data: any }>
): UseMutationResult<ModelsStandardResponse, Error, { id: string; data: any }> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await campaignsApi.campaignsUpdateCampaign(id, data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      // Invalidate specific campaign and list
      queryClient.invalidateQueries({ queryKey: campaignsKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: campaignsKeys.lists() });
    },
    ...options,
  });
}

/**
 * Hook to delete a campaign
 * 
 * @example
 * ```tsx
 * function DeleteCampaignButton({ campaignId }: { campaignId: string }) {
 *   const deleteCampaign = useDeleteCampaign();
 *   
 *   const handleDelete = () => {
 *     if (confirm('Are you sure?')) {
 *       deleteCampaign.mutate(campaignId, {
 *         onSuccess: () => {
 *           console.log('Campaign deleted');
 *         }
 *       });
 *     }
 *   };
 *   
 *   return <button onClick={handleDelete}>Delete</button>;
 * }
 * ```
 */
export function useDeleteCampaign(
  options?: UseMutationOptions<ModelsStandardResponse, Error, string>
): UseMutationResult<ModelsStandardResponse, Error, string> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await campaignsApi.campaignsDeleteCampaign(id);
      return response.data;
    },
    onSuccess: (_, id) => {
      // Remove from cache and refetch list
      queryClient.removeQueries({ queryKey: campaignsKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: campaignsKeys.lists() });
    },
    ...options,
  });
}
