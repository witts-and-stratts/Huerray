'use client';

import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '@/lib/api/client';
import { CreatorApi } from '@/lib/api/generated/api/creator-api';
import { UtilsCountryCode } from '@/lib/api/generated/models/utils-country-code';
import { UtilsBrandCategory } from '@/lib/api/generated/models/utils-brand-category';

// Creator profile interface based on API response
export interface CreatorProfile {
  id?: string;
  creator_id?: string;
  user_id?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  bio?: string;
  gender?: string;
  phone_number?: string;
  street?: string;
  city?: string;
  state?: string;
  zipcode?: string;
  country?: UtilsCountryCode;
  instagram_handle?: string;
  tiktok_handle?: string;
  youtube_handle?: string;
  twitter_handle?: string;
  portfolio?: string;
  application_video?: string;
  profile_image_url?: string;
  creator_status?: string;
  status_comments?: string;
  preferred_categories?: UtilsBrandCategory[];
  // Bank & Tax Details
  bank_account_name?: string;
  bank_account_number?: string;
  bank_name?: string;
  bank_routing_number?: string;
  tax_id?: string;
  tax_country?: UtilsCountryCode;
}

interface CreatorState {
  profile: CreatorProfile | null;
  isLoading: boolean;
  hasProfile: boolean | null; // null = not checked yet, true/false = checked
  lastFetchedAt: number | null; // Timestamp of last fetch
  error: string | null;
}

const initialState: CreatorState = {
  profile: null,
  isLoading: false,
  hasProfile: null,
  lastFetchedAt: null,
  error: null,
};

// Async thunk to fetch creator profile
export const fetchCreatorProfile = createAsyncThunk(
  'creator/fetchProfile',
  async ( _, { rejectWithValue } ) => {
    try {
      const creatorApi = new CreatorApi( undefined, undefined, apiClient );
      const response = await creatorApi.creatorsProfileGet();
      
      // Handle wrapped response - API may return { data: profile } or just profile
      const rawData = response.data as any;
      const profile = rawData?.data || rawData;
      
      // Check if we have a valid profile (has an id or creator_id)
      if ( !profile || ( !profile.id && !profile.creator_id ) ) {
        return { profile: null, hasProfile: false };
      }
      
      return { profile: profile as CreatorProfile, hasProfile: true };
    } catch ( error: any ) {
      if ( error.response?.status === 404 || error.response?.status === 401 ) {
        return { profile: null, hasProfile: false };
      }
      return rejectWithValue( error.message || 'Failed to fetch creator profile' );
    }
  }
);

// Cache duration in milliseconds (30 minutes)
const CACHE_DURATION = 30 * 60 * 1000;

const creatorSlice = createSlice( {
  name: 'creator',
  initialState,
  reducers: {
    setCreatorProfile: ( state, action: PayloadAction<CreatorProfile | null> ) => {
      state.profile = action.payload;
      state.hasProfile = action.payload !== null;
      state.lastFetchedAt = Date.now();
    },
    updateCreatorProfile: ( state, action: PayloadAction<Partial<CreatorProfile>> ) => {
      if ( state.profile ) {
        state.profile = { ...state.profile, ...action.payload };
      }
    },
    clearCreatorProfile: ( state ) => {
      state.profile = null;
      state.hasProfile = null;
      state.lastFetchedAt = null;
      state.error = null;
    },
    invalidateCreatorCache: ( state ) => {
      state.lastFetchedAt = null;
    },
  },
  extraReducers: ( builder ) => {
    builder
      .addCase( fetchCreatorProfile.pending, ( state ) => {
        state.isLoading = true;
        state.error = null;
      } )
      .addCase( fetchCreatorProfile.fulfilled, ( state, action ) => {
        state.isLoading = false;
        state.profile = action.payload.profile;
        state.hasProfile = action.payload.hasProfile;
        state.lastFetchedAt = Date.now();
        state.error = null;
      } )
      .addCase( fetchCreatorProfile.rejected, ( state, action ) => {
        state.isLoading = false;
        state.error = action.payload as string || 'Failed to fetch profile';
      } );
  },
} );

// Selector to check if cache is valid
export const selectIsCreatorCacheValid = ( state: { creator: CreatorState } ) => {
  const { lastFetchedAt } = state.creator;
  if ( !lastFetchedAt ) return false;
  return Date.now() - lastFetchedAt < CACHE_DURATION;
};

// Selector to check if profile needs fetching
export const selectShouldFetchCreatorProfile = ( state: { creator: CreatorState } ) => {
  const { hasProfile, lastFetchedAt, isLoading } = state.creator;
  if ( isLoading ) return false;
  if ( hasProfile === null ) return true; // Never checked
  if ( !lastFetchedAt ) return true;
  return Date.now() - lastFetchedAt >= CACHE_DURATION;
};

// Selector to get the creator profile
export const selectCreatorProfile = ( state: { creator: CreatorState } ) => state.creator.profile;

// Selector to get the creator status
export const selectCreatorStatus = ( state: { creator: CreatorState } ) => state.creator.profile?.creator_status ?? null;

// Selector to check if creator has a profile
export const selectHasCreatorProfile = ( state: { creator: CreatorState } ) => state.creator.hasProfile;

// Selector to check if creator profile is loading
export const selectCreatorIsLoading = ( state: { creator: CreatorState } ) => state.creator.isLoading;

export const { setCreatorProfile, updateCreatorProfile, clearCreatorProfile, invalidateCreatorCache } = creatorSlice.actions;
export default creatorSlice.reducer;
