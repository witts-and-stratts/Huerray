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
import { CampaignsApi, BrandApi, type CampaignsApiCampaignsSearchGetRequest, type BrandApiBrandsSearchCampaignsGetRequest } from '../generated/api';
import { apiClient, apiConfiguration } from '../client';
import type { 
  ModelsStandardResponse, 
  ModelsPaginatedResponse, 
  ModelsCampaignResponse,
  ModelsBrandCampaignDecisionRequest,
  ModelsCreateCampaignRequest,
} from '../generated/models';
import { ModelsStandardCampaignResponse } from '@/scripts/lib/api/generated/models';

/**
 * Hook to submit a brand decision for a campaign
 */
export function useCampaignDecision(
  options?: UseMutationOptions<ModelsStandardCampaignResponse, Error, { id: string; decision: ModelsBrandCampaignDecisionRequest }>
): UseMutationResult<ModelsStandardCampaignResponse, Error, { id: string; decision: ModelsBrandCampaignDecisionRequest }> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, decision }) => {
      const response = await campaignsApi.campaignsIdDecisionPut({ id, request: decision });
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: campaignsKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: campaignsKeys.lists() });
    },
    ...options,
  });
}

// Create API instances
const campaignsApi = new CampaignsApi(apiConfiguration, undefined, apiClient);
const brandApi = new BrandApi(apiConfiguration, undefined, apiClient);

/**
 * Query key factory for campaigns endpoints
 */
export const campaignsKeys = {
  all: ['campaigns'] as const,
  lists: () => [...campaignsKeys.all, 'list'] as const,
  list: (params?: CampaignsApiCampaignsSearchGetRequest) => [...campaignsKeys.lists(), params] as const,
  details: () => [...campaignsKeys.all, 'detail'] as const,
  detail: (id: string) => [...campaignsKeys.details(), id] as const,
};

/**
 * Query key factory for brand campaigns endpoints (/brands/search/campaigns)
 */
export const brandCampaignsKeys = {
  all: ['brand-campaigns'] as const,
  lists: () => [...brandCampaignsKeys.all, 'list'] as const,
  list: (params?: BrandApiBrandsSearchCampaignsGetRequest) => [...brandCampaignsKeys.lists(), params] as const,
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
  params?: CampaignsApiCampaignsSearchGetRequest,
  options?: Omit<UseQueryOptions<ModelsPaginatedResponse, Error>, 'queryKey' | 'queryFn'>
): UseQueryResult<ModelsPaginatedResponse, Error> {
  return useQuery({
    queryKey: campaignsKeys.list(params),
    queryFn: async () => {
      const response = await campaignsApi.campaignsSearchGet(params);
      return response.data;
    },
    ...options,
  });
}

/**
 * Hook to fetch campaigns for the current brand (/brands/search/campaigns)
 * This should be used in brand-admin pages instead of useCampaigns
 * 
 * @example
 * ```tsx
 * function BrandCampaignsList() {
 *   const { data, isLoading } = useBrandCampaigns();
 *   
 *   if (isLoading) return <div>Loading campaigns...</div>;
 *   
 *   return (
 *     <ul>
 *       {data?.data?.map(campaign => (
 *         <li key={campaign.id}>{campaign.campaign_name}</li>
 *       ))}
 *     </ul>
 *   );
 * }
 * ```
 */
export function useBrandCampaigns(
  params?: BrandApiBrandsSearchCampaignsGetRequest,
  options?: Omit<UseQueryOptions<ModelsPaginatedResponse, Error>, 'queryKey' | 'queryFn'>
): UseQueryResult<ModelsPaginatedResponse, Error> {
  return useQuery({
    queryKey: brandCampaignsKeys.list(params),
    queryFn: async () => {
      const response = await brandApi.brandsSearchCampaignsGet(params);
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
  options?: Omit<UseQueryOptions<ModelsCampaignResponse, Error>, 'queryKey' | 'queryFn'>
): UseQueryResult<ModelsCampaignResponse, Error> {
  return useQuery({
    queryKey: campaignsKeys.detail(id),
    queryFn: async () => {
      const response = await campaignsApi.campaignsIdGet({ id });
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
      const response = await campaignsApi.campaignsPost({ request: campaignData });
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
      const response = await campaignsApi.campaignsIdPut({ id, request: data });
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
      const response = await campaignsApi.campaignsIdDelete({ id });
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

/**
 * Hook to replicate an existing campaign
 * 
 * @example
 * ```tsx
 * function ReplicateButton({ id }: { id: string }) {
 *   const replicateCampaign = useReplicateCampaign();
 *   
 *   const handleReplicate = () => {
 *     replicateCampaign.mutate(id, {
 *       onSuccess: () => toast.success('Campaign replicated!')
 *     });
 *   };
 *   
 *   return <button onClick={handleReplicate}>Replicate</button>;
 * }
 * ```
 */
export function useReplicateCampaign(
  options?: UseMutationOptions<ModelsStandardResponse, Error, string>
): UseMutationResult<ModelsStandardResponse, Error, string> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (campaignId: string) => {
      // 1. Fetch the campaign details
      const { data: campaign } = await campaignsApi.campaignsIdGet({ id: campaignId });
      
      if (!campaign) {
        throw new Error('Campaign not found');
      }

      // 2. Prepare the creation payload
      const payload: ModelsCreateCampaignRequest = {
        campaign_name: `${campaign.campaign_name} (Copy)`,
        category: campaign.category!,
        content_type: campaign.content_type!,
        description: campaign.description || '',
        number_of_creators_wanted: campaign.number_of_creators_wanted || 1,
        number_of_videos_wanted: campaign.number_of_videos_wanted || 1,
        video_duration_in_seconds_in_seconds: campaign.video_duration_in_seconds || 60,
        video_format: campaign.video_format!,
        
        // Optional fields
        allow_multiple_videos: campaign.allow_multiple_videos,
        campaign_documents: campaign.campaign_documents || [],
        campaign_images: campaign.campaign_images || [],
        donts: campaign.donts,
        dos: campaign.dos,
        keywords: campaign.keywords,
        product_image_url: campaign.product_image_url,
        product_url: campaign.product_url,
        tone_of_voice: campaign.tone_of_voice,
      };

      // 3. Create the new campaign
      const response = await campaignsApi.campaignsPost({ request: payload });
      return response.data;
    },
    onSuccess: (data, variables, context) => {
      // Invalidate campaigns list
      queryClient.invalidateQueries({ queryKey: campaignsKeys.lists() });
      options?.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      options?.onError?.(error, variables, context);
    },
    ...options,
  });
}
