'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CreateCampaignSchema } from '@/components/campaigns/schema';
import { UtilsCampaignCategory } from '@/lib/api/generated/models/utils-campaign-category';
import { UtilsVideoFormat } from '@/lib/api/generated/models';

const initialState: CreateCampaignSchema = {
  campaign_name: '',
  description: '',
  category: undefined as unknown as UtilsCampaignCategory,
  keywords: [],
  product_url: '',
  product_image: '',
  number_of_creators_wanted: 1,
  number_of_videos_wanted: 1,
  video_duration_in_seconds: 15,
  video_format: UtilsVideoFormat.VideoFormatMP4,
  allow_multiple_videos: false,
  tone_of_voice: '',
  dos: '',
  donts: '',
  documents: [],
  images: [],
  videos: [],
};

const campaignSlice = createSlice({
  name: 'campaign',
  initialState,
  reducers: {
    updateCampaign: (state, action: PayloadAction<Partial<CreateCampaignSchema>>) => {
      return { ...state, ...action.payload };
    },
    setField: <K extends keyof CreateCampaignSchema>(
      state: CreateCampaignSchema,
      action: PayloadAction<{ field: K; value: CreateCampaignSchema[K] }>
    ) => {
      state[action.payload.field] = action.payload.value;
    },
    resetCampaign: () => initialState,
  },
});

export const { updateCampaign, setField, resetCampaign } = campaignSlice.actions;
export default campaignSlice.reducer;
