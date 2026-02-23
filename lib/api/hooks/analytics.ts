/**
 * Analytics Query Hooks
 * 
 * Custom hooks for fetching analytics data using Tanstack Query.
 * These hooks provide type-safe, cached data fetching for analytics endpoints.
 */

import { useQuery, type UseQueryResult, type UseQueryOptions } from '@tanstack/react-query';
import { AnalyticsApi } from '../generated/api';
import { apiClient, apiConfiguration } from '../client';
import type { 
  ModelsStandardBrandAnalyticsResponse,
  ModelsStandardCreatorAnalyticsResponse
} from '../generated/models';
import type { ApiError } from './types';

// Create analytics API instance
const analyticsApi = new AnalyticsApi(apiConfiguration, undefined, apiClient);

/**
 * Query key factory for analytics endpoints
 * This helps with cache invalidation and organization
 */
export const analyticsKeys = {
  all: ['analytics'] as const,
  brand: () => [...analyticsKeys.all, 'brand'] as const,
  brandByPeriod: (period: string) => [...analyticsKeys.brand(), period] as const,
  creator: () => [...analyticsKeys.all, 'creator'] as const,
  creatorByPeriod: (period: string) => [...analyticsKeys.creator(), period] as const,
};

/**
 * Hook to fetch brand analytics
 */
export function useBrandAnalytics(
  options?: Omit<UseQueryOptions<ModelsStandardBrandAnalyticsResponse, ApiError>, 'queryKey' | 'queryFn'>
): UseQueryResult<ModelsStandardBrandAnalyticsResponse, ApiError> {
  return useQuery({
    queryKey: analyticsKeys.brand(),
    queryFn: async () => {
      const response = await analyticsApi.analyticsBrandGet();
      return response.data;
    },
    ...options,
  });
}

/**
 * Hook to fetch brand analytics for a specific period
 */
export function useBrandAnalyticsByPeriod(
  period: 'last_week' | 'last_month' | 'last_three_months' | 'last_year',
  options?: Omit<UseQueryOptions<ModelsStandardBrandAnalyticsResponse, ApiError>, 'queryKey' | 'queryFn'>
): UseQueryResult<ModelsStandardBrandAnalyticsResponse, ApiError> {
  return useQuery({
    queryKey: analyticsKeys.brandByPeriod(period),
    queryFn: async () => {
      const response = await analyticsApi.analyticsBrandPeriodGet({ period });
      return response.data;
    },
    ...options,
  });
}

/**
 * Hook to fetch creator analytics
 */
export function useCreatorAnalytics(
  options?: Omit<UseQueryOptions<ModelsStandardCreatorAnalyticsResponse, ApiError>, 'queryKey' | 'queryFn'>
): UseQueryResult<ModelsStandardCreatorAnalyticsResponse, ApiError> {
  return useQuery({
    queryKey: analyticsKeys.creator(),
    queryFn: async () => {
      const response = await analyticsApi.analyticsCreatorGet();
      return response.data;
    },
    ...options,
  });
}

/**
 * Hook to fetch creator analytics for a specific period
 */
export function useCreatorAnalyticsByPeriod(
  period: 'last_week' | 'last_month' | 'last_three_months' | 'last_year',
  options?: Omit<UseQueryOptions<ModelsStandardCreatorAnalyticsResponse, ApiError>, 'queryKey' | 'queryFn'>
): UseQueryResult<ModelsStandardCreatorAnalyticsResponse, ApiError> {
  return useQuery({
    queryKey: analyticsKeys.creatorByPeriod(period),
    queryFn: async () => {
      const response = await analyticsApi.analyticsCreatorPeriodGet({ period });
      return response.data;
    },
    ...options,
  });
}
