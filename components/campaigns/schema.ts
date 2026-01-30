/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import { UtilsCampaignCategory } from '@/lib/api/generated/models/utils-campaign-category';
import { UtilsContentType } from '@/lib/api/generated/models/utils-content-type';
import { UtilsVideoFormat } from '@/lib/api/generated/models/utils-video-format';

// Helper to extract values for z.enum
function getEnumValues<T extends Record<string, any>>(obj: T) {
  return Object.values(obj) as [string, ...string[]];
}

export const createCampaignSchema = z.object({
  campaign_name: z.string().min(1, 'Campaign name is required'),
  description: z.string().min(1, 'Description is required'),
  category: z.enum(getEnumValues(UtilsCampaignCategory)),
  keywords: z.array(z.string()).default([]),
  product_url: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  product_image: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  number_of_creators_wanted: z.number().min(1, 'At least 1 creator is required'),
  number_of_videos_wanted: z.number().min(1, 'At least 1 video is required'),
  content_type: z.enum(getEnumValues(UtilsContentType)),
  video_duration_in_seconds: z.number().min(1, 'Duration is required'),
  video_format: z.enum(getEnumValues(UtilsVideoFormat)),
  allow_multiple_videos: z.boolean().default(false),
  tone_of_voice: z.string().optional(),
  dos: z.string().optional(),
  donts: z.string().optional(),
  documents: z.array(z.string()),
  images: z.array(z.string()),
  videos: z.array(z.string()),
});

export type CreateCampaignSchema = z.infer<typeof createCampaignSchema>;

import { ReactFormExtendedApi } from '@tanstack/react-form';

export type CampaignFormApi = ReactFormExtendedApi<CreateCampaignSchema, any, any, any, any, any, any, any, any, any, any, any>;
