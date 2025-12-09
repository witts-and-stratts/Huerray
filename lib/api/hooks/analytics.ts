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
  ModelsBrandAnalyticsResponse,
  ModelsCreatorAnalyticsResponse,
  ModelsStandardResponse 
} from '../generated/models';

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
 * 
 * @example
 * ```tsx
 * function BrandDashboard() {
 *   const { data, isLoading, error } = useBrandAnalytics();
 *   
 *   if (isLoading) return <div>Loading...</div>;
 *   if (error) return <div>Error loading analytics</div>;
 *   
 *   return <div>Total Campaigns: {data?.data?.totalCampaigns}</div>;
 * }
 * ```
 */
export function useBrandAnalytics(
  options?: Omit<UseQueryOptions<ModelsStandardResponse, Error>, 'queryKey' | 'queryFn'>
): UseQueryResult<ModelsStandardResponse, Error> {
  return useQuery({
    queryKey: analyticsKeys.brand(),
    queryFn: async () => {
      const response = await analyticsApi.analyticsGetBrandAnalytics();
      return response.data;
    },
    ...options,
  });
}

/**
 * Hook to fetch brand analytics for a specific period
 * 
 * @param period - Time period: 'last_week', 'last_month', 'last_three_months', 'last_year'
 * 
 * @example
 * ```tsx
 * function MonthlyReport() {
 *   const { data } = useBrandAnalyticsByPeriod('last_month');
 *   return <div>{data?.data?.totalRevenue}</div>;
 * }
 * ```
 */
export function useBrandAnalyticsByPeriod(
  period: 'last_week' | 'last_month' | 'last_three_months' | 'last_year',
  options?: Omit<UseQueryOptions<ModelsStandardResponse, Error>, 'queryKey' | 'queryFn'>
): UseQueryResult<ModelsStandardResponse, Error> {
  return useQuery({
    queryKey: analyticsKeys.brandByPeriod(period),
    queryFn: async () => {
      const response = await analyticsApi.analyticsGetBrandAnalyticsPeriod(period);
      return response.data;
    },
    ...options,
  });
}

/**
 * Hook to fetch creator analytics
 * 
 * @example
 * ```tsx
 * function CreatorDashboard() {
 *   const { data, isLoading, error } = useCreatorAnalytics();
 *   
 *   if (isLoading) return <div>Loading...</div>;
 *   if (error) return <div>Error loading analytics</div>;
 *   
 *   return <div>Total Gigs: {data?.data?.totalGigs}</div>;
 * }
 * ```
 */
export function useCreatorAnalytics(
  options?: Omit<UseQueryOptions<ModelsStandardResponse, Error>, 'queryKey' | 'queryFn'>
): UseQueryResult<ModelsStandardResponse, Error> {
  return useQuery({
    queryKey: analyticsKeys.creator(),
    queryFn: async () => {
      const response = await analyticsApi.analyticsGetCreatorAnalytics();
      return response.data;
    },
    ...options,
  });
}

/**
 * Hook to fetch creator analytics for a specific period
 * 
 * @param period - Time period: 'last_week', 'last_month', 'last_three_months', 'last_year'
 * 
 * @example
 * ```tsx
 * function WeeklyStats() {
 *   const { data } = useCreatorAnalyticsByPeriod('last_week');
 *   return <div>This week's earnings: ${data?.data?.earnings}</div>;
 * }
 * ```
 */
export function useCreatorAnalyticsByPeriod(
  period: 'last_week' | 'last_month' | 'last_three_months' | 'last_year',
  options?: Omit<UseQueryOptions<ModelsStandardResponse, Error>, 'queryKey' | 'queryFn'>
): UseQueryResult<ModelsStandardResponse, Error> {
  return useQuery({
    queryKey: analyticsKeys.creatorByPeriod(period),
    queryFn: async () => {
      const response = await analyticsApi.analyticsGetCreatorAnalyticsPeriod(period);
      return response.data;
    },
    ...options,
  });
}
