/**
 * API Hooks Index
 * 
 * Barrel export file for all API hooks.
 * Import hooks from here for cleaner imports in your components.
 * 
 * @example
 * ```tsx
 * import { useBrandAnalytics, useCampaigns } from '@/lib/api/hooks';
 * ```
 */

// Analytics hooks
export {
  useBrandAnalytics,
  useBrandAnalyticsByPeriod,
  useCreatorAnalytics,
  useCreatorAnalyticsByPeriod,
  analyticsKeys,
} from './analytics';

// Campaign hooks
export {
  useCampaigns,
  useCampaign,
  useCreateCampaign,
  useUpdateCampaign,
  useDeleteCampaign,
  campaignsKeys,
} from './campaigns';

// Brand hooks
export {
  useBrand,
  useSuspenseBrand,
  brandsKeys,
} from './brands';

/**
 * Add more exports here as you create hooks for other endpoints:
 * 
 * export { ... } from './gigs';
 * export { ... } from './auth';
 * export { ... } from './users';
 * etc.
 */
