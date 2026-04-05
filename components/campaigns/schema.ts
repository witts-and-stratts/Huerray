/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import { UtilsCampaignCategory } from '@/lib/api/generated/models/utils-campaign-category';
import { UtilsVideoFormat } from '@/lib/api/generated/models';
import { UtilsContentType } from '@/lib/api/generated/models/utils-content-type';

// Helper to extract values for z.enum
function getEnumValues<T extends Record<string, any>>(obj: T) {
  return Object.values(obj) as [string, ...string[]];
}

export interface CampaignValidationMessages {
  campaignNameRequired: string;
  descriptionRequired: string;
  categoryRequired: string;
  contentTypeRequired: string;
  productUrlInvalid: string;
  productImageInvalid: string;
  creatorsNeededRequired: string;
  videosPerCreatorRequired: string;
  videoDurationRequired: string;
  videoFormatRequired: string;
}

type CampaignValidationTranslator = (key: string) => string;

const defaultCampaignValidationMessages: CampaignValidationMessages = {
  campaignNameRequired: 'Campaign name is required',
  descriptionRequired: 'Description is required',
  categoryRequired: 'Category is required',
  contentTypeRequired: 'Content type is required',
  productUrlInvalid: 'Enter a valid product URL',
  productImageInvalid: 'Enter a valid product image URL',
  creatorsNeededRequired: 'Enter the number of creators needed',
  videosPerCreatorRequired: 'Enter the total number of videos',
  videoDurationRequired: 'Select a video duration',
  videoFormatRequired: 'Video format is required',
};

export function getCampaignValidationMessages(t: CampaignValidationTranslator): CampaignValidationMessages {
  return {
    campaignNameRequired: t( 'validation.campaignNameRequired' ),
    descriptionRequired: t( 'validation.descriptionRequired' ),
    categoryRequired: t( 'validation.categoryRequired' ),
    contentTypeRequired: t( 'validation.contentTypeRequired' ),
    productUrlInvalid: t( 'validation.productUrlInvalid' ),
    productImageInvalid: t( 'validation.productImageInvalid' ),
    creatorsNeededRequired: t( 'validation.creatorsNeededRequired' ),
    videosPerCreatorRequired: t( 'validation.videosPerCreatorRequired' ),
    videoDurationRequired: t( 'validation.videoDurationRequired' ),
    videoFormatRequired: t( 'validation.videoFormatRequired' ),
  };
}

export function createTranslatedCampaignSchema(t: CampaignValidationTranslator) {
  return createCampaignSchema( getCampaignValidationMessages( t ) );
}

export function createCampaignSchema(messages: CampaignValidationMessages = defaultCampaignValidationMessages) {
  return z.object({
    campaign_name: z.string().trim().min(1, messages.campaignNameRequired),
    description: z.string().trim().min(1, messages.descriptionRequired),
    category: z.enum( getEnumValues( UtilsCampaignCategory ), {
      error: messages.categoryRequired,
    }),
    content_type: z.enum( getEnumValues( UtilsContentType ), {
      error: messages.contentTypeRequired,
    } ),
    keywords: z.array( z.string() ).default( [] ),
    product_url: z.url( { error: messages.productUrlInvalid } ).optional().or( z.literal( '' ) ),
    product_image: z.url( { error: messages.productImageInvalid } ).optional().or( z.literal( '' ) ),
    number_of_creators_wanted: z.number( { error: messages.creatorsNeededRequired } ).min( 1, messages.creatorsNeededRequired ),
    number_of_videos_wanted: z.number( { error: messages.videosPerCreatorRequired } ).min( 1, messages.videosPerCreatorRequired ),
    video_duration_in_seconds: z.number( { error: messages.videoDurationRequired } ).min( 1, messages.videoDurationRequired ),
    video_format: z.enum( getEnumValues( UtilsVideoFormat ), {
      error: messages.videoFormatRequired,
    } ),
    allow_multiple_videos: z.boolean().default( false ),
    tone_of_voice: z.string().optional(),
    dos: z.string().optional(),
    donts: z.string().optional(),
    documents: z.array( z.string() ),
    images: z.array( z.string() ),
    videos: z.array( z.string() ),
  });
}

const campaignSchema = createCampaignSchema();

export type CreateCampaignSchema = z.infer<typeof campaignSchema>;

import { ReactFormExtendedApi } from '@tanstack/react-form';

export type CampaignFormApi = ReactFormExtendedApi<CreateCampaignSchema, any, any, any, any, any, any, any, any, any, any, any>;
