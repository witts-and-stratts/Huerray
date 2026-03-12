/**
 * Notifications Query & Mutation Hooks
 * 
 * Custom hooks for managing notifications using Tanstack Query.
 */

import { 
  useQuery, 
  useMutation, 
  useQueryClient,
  type UseQueryResult, 
  type UseMutationResult,
  type UseQueryOptions,
  type UseMutationOptions
} from '@tanstack/react-query';
import { NotificationsApi } from '../generated/api';
import { apiClient, apiConfiguration } from '../client';
import type { ModelsNotificationResponse, ModelsStandardGenericResponse, ModelsStandardNotificationListResponse } from '../generated/models';
import type { ApiError } from './types';

// Create notifications API instance
const notificationsApi = new NotificationsApi(apiConfiguration, undefined, apiClient);

export interface Notification {
  id: string;
  event_name: string;
  event_type: string;
  entity_id: string;
  title: string;
  message: string;
  is_read: boolean;
  priority: string; // 'normal' | 'high' | 'low' ?
  action_url: string;
  metadata: string;
  created_at: string;
}

export interface NotificationsData {
  notifications: Notification[];
  total: number;
  page: number;
  per_page: number;
  unread_count: number;
}

export interface NotificationsResponse {
  data?: NotificationsData;
}

/**
 * Query key factory for notifications endpoints
 */
export const notificationsKeys = {
  all: ['notifications'] as const,
  lists: () => [...notificationsKeys.all, 'list'] as const,
  list: (filters?: Record<string, unknown>) => [...notificationsKeys.lists(), filters] as const,
  stats: () => [...notificationsKeys.all, 'stats'] as const,
};

/**
 * Hook to fetch notifications
 */
export function useNotifications(
  page: number = 1,
  perPage: number = 10,
  unreadOnly: boolean = false,
  options?: Omit<UseQueryOptions<ModelsStandardNotificationListResponse, ApiError>, 'queryKey' | 'queryFn'>
): UseQueryResult<ModelsStandardNotificationListResponse, ApiError> {
  return useQuery({
    queryKey: notificationsKeys.list({ page, perPage, unreadOnly }),
    queryFn: async () => {
      const response = await notificationsApi.notificationsGet({ page, perPage, unreadOnly });
      // Casting because the generated client returns ModelsStandardGenericResponse where data is object
      return response.data;
    },
    ...options,
  });
}

/**
 * Hook to mark a notification as read
 */
export function useMarkNotificationAsRead(
  options?: UseMutationOptions<ModelsStandardGenericResponse, ApiError, string | number>
): UseMutationResult<ModelsStandardGenericResponse, ApiError, string | number> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string | number) => {
      // @ts-expect-error: API definition expects number but we support string UUIDs
      const response = await notificationsApi.notificationsIdReadPut({ id });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationsKeys.lists() });
    },
    ...options,
  });
}

/**
 * Hook to mark all notifications as read
 */
export function useMarkAllNotificationsAsRead(
  options?: UseMutationOptions<ModelsStandardGenericResponse, ApiError, void>
): UseMutationResult<ModelsStandardGenericResponse, ApiError, void> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await notificationsApi.notificationsReadAllPut();
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationsKeys.lists() });
    },
    ...options,
  });
}

/**
 * Hook to delete a notification
 */
export function useDeleteNotification(
  options?: UseMutationOptions<ModelsStandardGenericResponse, ApiError, string>
): UseMutationResult<ModelsStandardGenericResponse, ApiError, string> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await notificationsApi.notificationsIdDelete({ id });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationsKeys.lists() });
    },
    ...options,
  });
}
