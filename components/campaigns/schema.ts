import { z } from 'zod';
import { UtilsCampaignCategory } from '@/lib/api/generated/models/utils-campaign-category';
import { UtilsContentType } from '@/lib/api/generated/models/utils-content-type';
import { UtilsVideoFormat } from '@/lib/api/generated/models/utils-video-format';

export const createCampaignSchema = z.object({
  campaign_name: z.string().min(1, 'Campaign name is required'),
  description: z.string().min(1, 'Description is required'),
  category: z.enum(UtilsCampaignCategory),
  product_url: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  product_image: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  number_of_creators_wanted: z.number().min(1, 'At least 1 creator is required'),
  number_of_videos_wanted: z.number().min(1, 'At least 1 video is required'),
  content_type: z.enum(UtilsContentType),
  video_duration_in_seconds: z.number().min(1, 'Duration is required'),
  video_format: z.enum(UtilsVideoFormat),
  documents: z.array(z.string()),
  images: z.array(z.string()),
});

export type CreateCampaignSchema = z.infer<typeof createCampaignSchema>;

import { ReactFormExtendedApi } from '@tanstack/react-form';

export type CampaignFormApi = ReactFormExtendedApi<CreateCampaignSchema, any, any, any, any, any, any, any, any, any, any, any>;
