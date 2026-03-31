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
import type {
  ModelsCreateNotificationRequest,
  ModelsStandardGenericResponse,
  ModelsStandardNotificationListResponse,
  ModelsStandardNotificationResponse
} from '../generated/models';
import type { ApiError } from './types';

const notificationsApi = new NotificationsApi(apiConfiguration, undefined, apiClient);

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

/**
 * Hook to create a notification
 */
export function useCreateNotification(
  options?: UseMutationOptions<ModelsStandardNotificationResponse, ApiError, ModelsCreateNotificationRequest>
): UseMutationResult<ModelsStandardNotificationResponse, ApiError, ModelsCreateNotificationRequest> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (notification: ModelsCreateNotificationRequest) => {
      const response = await notificationsApi.notificationsPost({ notification });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationsKeys.all });
    },
    ...options,
  });
}
