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
  ModelsStandardCreatorAnalyticsResponse,
  ModelsStandardPlatformAnalyticsResponse
} from '../generated/models';
import type { ApiError } from './types';

// Create analytics API instance
const analyticsApi = new AnalyticsApi(apiConfiguration, undefined, apiClient);

export type AnalyticsPeriodFilter = 'last_week' | 'last_month' | 'last_three_months' | 'last_year';

export type AnalyticsFilters = {
  period?: AnalyticsPeriodFilter;
  startDate?: string;
  endDate?: string;
};

type AnalyticsQueryOptions<TResponse> = Omit<UseQueryOptions<TResponse, ApiError>, 'queryKey' | 'queryFn'>;

function isAnalyticsFilters( value: unknown ): value is AnalyticsFilters {
  if ( !value || typeof value !== 'object' ) return false;
  return 'period' in value || 'startDate' in value || 'endDate' in value;
}

function resolveAnalyticsArgs<TResponse>(
  filtersOrOptions?: AnalyticsFilters | AnalyticsQueryOptions<TResponse>,
  options?: AnalyticsQueryOptions<TResponse>
) {
  if ( isAnalyticsFilters( filtersOrOptions ) ) {
    return { filters: filtersOrOptions, options };
  }

  return {
    filters: undefined,
    options: ( options ?? filtersOrOptions ) as AnalyticsQueryOptions<TResponse> | undefined,
  };
}

/**
 * Query key factory for analytics endpoints
 * This helps with cache invalidation and organization
 */
export const analyticsKeys = {
  all: ['analytics'] as const,
  brand: (filters?: AnalyticsFilters) => [...analyticsKeys.all, 'brand', filters] as const,
  brandByPeriod: (period: string) => analyticsKeys.brand({ period: period as AnalyticsPeriodFilter }),
  creator: (filters?: AnalyticsFilters) => [...analyticsKeys.all, 'creator', filters] as const,
  creatorByPeriod: (period: string) => analyticsKeys.creator({ period: period as AnalyticsPeriodFilter }),
  platform: (filters?: AnalyticsFilters) => [...analyticsKeys.all, 'platform', filters] as const,
  platformByPeriod: (period: string) => analyticsKeys.platform({ period: period as AnalyticsPeriodFilter }),
};

/**
 * Hook to fetch brand analytics
 */
export function useBrandAnalytics(
  options?: AnalyticsQueryOptions<ModelsStandardBrandAnalyticsResponse>
): UseQueryResult<ModelsStandardBrandAnalyticsResponse, ApiError>;
export function useBrandAnalytics(
  filters?: AnalyticsFilters,
  options?: AnalyticsQueryOptions<ModelsStandardBrandAnalyticsResponse>
): UseQueryResult<ModelsStandardBrandAnalyticsResponse, ApiError>;
export function useBrandAnalytics(
  filtersOrOptions?: AnalyticsFilters | AnalyticsQueryOptions<ModelsStandardBrandAnalyticsResponse>,
  options?: AnalyticsQueryOptions<ModelsStandardBrandAnalyticsResponse>
): UseQueryResult<ModelsStandardBrandAnalyticsResponse, ApiError> {
  const queryArgs = resolveAnalyticsArgs( filtersOrOptions, options );
  return useQuery({
    queryKey: analyticsKeys.brand(queryArgs.filters),
    queryFn: async () => {
      const response = await analyticsApi.analyticsBrandGet(queryArgs.filters);
      return response.data;
    },
    ...queryArgs.options,
  });
}

/**
 * Hook to fetch brand analytics for a specific period
 */
export function useBrandAnalyticsByPeriod(
  period: AnalyticsPeriodFilter,
  options?: AnalyticsQueryOptions<ModelsStandardBrandAnalyticsResponse>
): UseQueryResult<ModelsStandardBrandAnalyticsResponse, ApiError> {
  return useBrandAnalytics({ period }, options);
}

/**
 * Hook to fetch creator analytics
 */
export function useCreatorAnalytics(
  options?: AnalyticsQueryOptions<ModelsStandardCreatorAnalyticsResponse>
): UseQueryResult<ModelsStandardCreatorAnalyticsResponse, ApiError>;
export function useCreatorAnalytics(
  filters?: AnalyticsFilters,
  options?: AnalyticsQueryOptions<ModelsStandardCreatorAnalyticsResponse>
): UseQueryResult<ModelsStandardCreatorAnalyticsResponse, ApiError>;
export function useCreatorAnalytics(
  filtersOrOptions?: AnalyticsFilters | AnalyticsQueryOptions<ModelsStandardCreatorAnalyticsResponse>,
  options?: AnalyticsQueryOptions<ModelsStandardCreatorAnalyticsResponse>
): UseQueryResult<ModelsStandardCreatorAnalyticsResponse, ApiError> {
  const queryArgs = resolveAnalyticsArgs( filtersOrOptions, options );
  return useQuery({
    queryKey: analyticsKeys.creator(queryArgs.filters),
    queryFn: async () => {
      const response = await analyticsApi.analyticsCreatorGet(queryArgs.filters);
      return response.data;
    },
    ...queryArgs.options,
  });
}

/**
 * Hook to fetch creator analytics for a specific period
 */
export function useCreatorAnalyticsByPeriod(
  period: AnalyticsPeriodFilter,
  options?: AnalyticsQueryOptions<ModelsStandardCreatorAnalyticsResponse>
): UseQueryResult<ModelsStandardCreatorAnalyticsResponse, ApiError> {
  return useCreatorAnalytics({ period }, options);
}

/**
 * Hook to fetch platform-wide analytics (admin only)
 */
export function usePlatformAnalytics(
  options?: AnalyticsQueryOptions<ModelsStandardPlatformAnalyticsResponse>
): UseQueryResult<ModelsStandardPlatformAnalyticsResponse, ApiError>;
export function usePlatformAnalytics(
  filters?: AnalyticsFilters,
  options?: AnalyticsQueryOptions<ModelsStandardPlatformAnalyticsResponse>
): UseQueryResult<ModelsStandardPlatformAnalyticsResponse, ApiError>;
export function usePlatformAnalytics(
  filtersOrOptions?: AnalyticsFilters | AnalyticsQueryOptions<ModelsStandardPlatformAnalyticsResponse>,
  options?: AnalyticsQueryOptions<ModelsStandardPlatformAnalyticsResponse>
): UseQueryResult<ModelsStandardPlatformAnalyticsResponse, ApiError> {
  const queryArgs = resolveAnalyticsArgs( filtersOrOptions, options );
  return useQuery({
    queryKey: analyticsKeys.platform(queryArgs.filters),
    queryFn: async () => {
      const response = await analyticsApi.analyticsPlatformGet(queryArgs.filters);
      return response.data;
    },
    ...queryArgs.options,
  });
}

/**
 * Hook to fetch platform analytics for a specific period (admin only)
 */
export function usePlatformAnalyticsByPeriod(
  period: AnalyticsPeriodFilter,
  options?: AnalyticsQueryOptions<ModelsStandardPlatformAnalyticsResponse>
): UseQueryResult<ModelsStandardPlatformAnalyticsResponse, ApiError> {
  return usePlatformAnalytics({ period }, options);
}
