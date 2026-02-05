'use client';

import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '@/lib/api/client';
import { BrandApi } from '@/lib/api/generated/api/brand-api';

// Brand profile interface based on API response
export interface BrandProfile {
  id?: string;
  company_name: string;
  website_url: string;
  company_description?: string;
  category?: string;
  company_size?: string;
  registration_number?: string;
  city?: string;
  country?: string;
  number?: string;
  preferred_contact_email?: string;
  preferred_contact_phone?: string;
  state?: string;
  street?: string;
  vat_id?: string;
  postal_code?: string;
  profile_photo_url?: string;
  logo_url?: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

interface BrandState {
  profile: BrandProfile | null;
  profiles: BrandProfile[];
  isLoading: boolean;
  hasProfile: boolean | null; // null = not checked yet, true/false = checked
  lastFetchedAt: number | null; // Timestamp of last fetch
  error: string | null;
}

const initialState: BrandState = {
  profile: null,
  profiles: [],
  isLoading: false,
  hasProfile: null,
  lastFetchedAt: null,
  error: null,
};

// Async thunk to fetch brand profile
export const fetchBrandProfile = createAsyncThunk(
  'brand/fetchProfile',
  async ( _, { rejectWithValue } ) => {
    try {
      const brandApi = new BrandApi( undefined, undefined, apiClient );
      const response = await brandApi.brandsGet();
      const brands = ( response.data as any )?.data;
      
      if ( !brands || ( Array.isArray( brands ) && brands.length === 0 ) ) {
        return { profiles: [], profile: null, hasProfile: false };
      }
      
      // Return the first brand as the active profile
      const profile = Array.isArray( brands ) ? brands[ 0 ] : brands;
      return { 
        profiles: Array.isArray( brands ) ? brands : [ brands ],
        profile, 
        hasProfile: true 
      };
    } catch ( error: any ) {
      if ( error.response?.status === 404 ) {
        return { profiles: [], profile: null, hasProfile: false };
      }
      return rejectWithValue( error.message || 'Failed to fetch brand profile' );
    }
  }
);

// Cache duration in milliseconds (30 minutes)
const CACHE_DURATION = 30 * 60 * 1000;

const brandSlice = createSlice( {
  name: 'brand',
  initialState,
  reducers: {
    setBrandProfile: ( state, action: PayloadAction<BrandProfile | null> ) => {
      state.profile = action.payload;
      state.hasProfile = action.payload !== null;
      state.lastFetchedAt = Date.now();
    },
    updateBrandProfile: ( state, action: PayloadAction<Partial<BrandProfile>> ) => {
      if ( state.profile ) {
        state.profile = { ...state.profile, ...action.payload };
      }
    },
    clearBrandProfile: ( state ) => {
      state.profile = null;
      state.profiles = [];
      state.hasProfile = null;
      state.lastFetchedAt = null;
      state.error = null;
    },
    invalidateCache: ( state ) => {
      state.lastFetchedAt = null;
    },
  },
  extraReducers: ( builder ) => {
    builder
      .addCase( fetchBrandProfile.pending, ( state ) => {
        state.isLoading = true;
        state.error = null;
      } )
      .addCase( fetchBrandProfile.fulfilled, ( state, action ) => {
        state.isLoading = false;
        state.profile = action.payload.profile;
        state.profiles = action.payload.profiles;
        state.hasProfile = action.payload.hasProfile;
        state.lastFetchedAt = Date.now();
        state.error = null;
      } )
      .addCase( fetchBrandProfile.rejected, ( state, action ) => {
        state.isLoading = false;
        state.error = action.payload as string || 'Failed to fetch profile';
      } );
  },
} );

// Selector to check if cache is valid
export const selectIsCacheValid = ( state: { brand: BrandState } ) => {
  const { lastFetchedAt } = state.brand;
  if ( !lastFetchedAt ) return false;
  return Date.now() - lastFetchedAt < CACHE_DURATION;
};

// Selector to check if profile needs fetching
export const selectShouldFetchProfile = ( state: { brand: BrandState } ) => {
  const { hasProfile, lastFetchedAt, isLoading } = state.brand;
  if ( isLoading ) return false;
  if ( hasProfile === null ) return true; // Never checked
  if ( !lastFetchedAt ) return true;
  return Date.now() - lastFetchedAt >= CACHE_DURATION;
};

// Selector to get the brand profile
export const selectBrandProfile = ( state: { brand: BrandState } ) => state.brand.profile;

// Selector to get the brand status
export const selectBrandStatus = ( state: { brand: BrandState } ) => state.brand.profile?.status ?? null;

// Selector to check if brand has a profile
export const selectHasBrandProfile = ( state: { brand: BrandState } ) => state.brand.hasProfile;

// Selector to check if brand profile is loading
export const selectBrandIsLoading = ( state: { brand: BrandState } ) => state.brand.isLoading;

export const { setBrandProfile, updateBrandProfile, clearBrandProfile, invalidateCache } = brandSlice.actions;
export default brandSlice.reducer;
