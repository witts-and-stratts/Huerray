
import { keepPreviousData, useQuery, useMutation, useQueryClient, type UseQueryOptions } from '@tanstack/react-query';
import { UserApi, UsersSearchGetUserTypeEnum } from '../generated/api/user-api';
import { AuthenticationApi } from '../generated/api/authentication-api';
import { apiClient, apiConfiguration } from '../client';
import type { ApiError } from './types';

// Create API instance
const userApi = new UserApi(apiConfiguration, undefined, apiClient);
const authApi = new AuthenticationApi(apiConfiguration, undefined, apiClient);

import { ModelsUserResponse, ModelsEditUserRequestUserTypeEnum, ModelsEditUserRequest, ModelsCreateAdminRequest } from '../generated/models';

export const usersKeys = {
  all: ['users'] as const,
  lists: () => [...usersKeys.all, 'list'] as const,
  list: (filters: Record<string, any>) => [...usersKeys.lists(), { ...filters }] as const,
  details: () => [...usersKeys.all, 'detail'] as const,
  detail: (id: string) => [...usersKeys.details(), id] as const,
};

export function useUsers(
  {
    q,
    userType,
    status,
    withoutProfile,
    page = 1,
    limit = 10
  }: {
    q?: string;
    userType?: UsersSearchGetUserTypeEnum | 'admin_user';
    status?: string;
    withoutProfile?: boolean;
    page?: number;
    limit?: number;
  } = {},
  options?: Omit<UseQueryOptions<any, ApiError>, 'queryKey' | 'queryFn'>
) {
  // Backend ignores this filter for admin users; keep the query key/request consistent with that.
  const effectiveWithoutProfile = userType === 'admin_user' ? undefined : withoutProfile;

  return useQuery<any, ApiError>({
    queryKey: usersKeys.list({ q, userType, status, withoutProfile: effectiveWithoutProfile, page, limit }),
    queryFn: async () => {
      const response = await userApi.usersSearchGet({
        q,
        userType: userType as UsersSearchGetUserTypeEnum | undefined,
        status,
        withoutProfile: effectiveWithoutProfile,
        page,
        limit
      });
      return response;
    },
    placeholderData: keepPreviousData,
    ...options,
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      const response = await userApi.usersIdDelete({ id: userId });
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: usersKeys.lists() });
    },
  });
}

export function useResendVerification() {
  return useMutation({
    mutationFn: async (email: string) => {
      const response = await authApi.authResendVerificationPost({ request: { email } });
      return response.data;
    },
  });
}

export function useUser(
  id: string,
  options?: Omit<UseQueryOptions<ModelsUserResponse | undefined, ApiError>, 'queryKey' | 'queryFn'>
) {
  return useQuery<ModelsUserResponse | undefined, ApiError>({
    queryKey: usersKeys.detail(id),
    queryFn: async () => {
      const response = await userApi.usersIdGet({ id });
      return response.data.data;
    },
    enabled: !!id,
    ...options,
  });
}

export function useUpdateUserStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status, user }: { id: string; status: string; user: ModelsUserResponse; comment?: string }) => {
      // We need to construct the full edit request because the API requires all fields
      // Ensure we map the string type to the Enum correctly if needed, though they match string values 'creator', 'brand_user', 'admin'
      const userType = user.user_type as unknown as ModelsEditUserRequestUserTypeEnum;

      const request: ModelsEditUserRequest = {
        email: user.email || '',
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        username: user.username || '',
        user_type: userType,
        user_status: status,
        middle_name: user.middle_name,
        phone_number: user.phone_number,
      };

      const response = await userApi.usersIdPut({ id, request });
      return response.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: usersKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: usersKeys.lists() });
    },
  });
}

export function useUpdateUserById() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ( { id, request }: { id: string; request: ModelsEditUserRequest } ) => {
      const response = await userApi.usersIdPut( { id, request } );
      const raw = response.data as any;
      return raw.data || raw;
    },
    onSuccess: ( _data, variables ) => {
      queryClient.invalidateQueries( { queryKey: usersKeys.detail( variables.id ) } );
      queryClient.invalidateQueries( { queryKey: usersKeys.lists() } );
      queryClient.invalidateQueries( { queryKey: [...usersKeys.all, 'profile'] } );
    },
  } );
}

export function useUserProfile(
  options?: Omit<UseQueryOptions<ModelsUserResponse, ApiError>, 'queryKey' | 'queryFn'>
) {
  return useQuery<ModelsUserResponse, ApiError>({
    queryKey: [...usersKeys.all, 'profile'],
    queryFn: async () => {
      const response = await userApi.usersProfileGet();
      const raw = response.data as any;
      return raw.data || raw;
    },
    ...options,
  });
}

export function useUpdateUserProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (request: import('../generated/models').ModelsUpdateUserRequest) => {
      const response = await userApi.usersProfilePut({ request });
      const raw = response.data as any;
      return raw.data || raw;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...usersKeys.all, 'profile'] });
    },
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (request: ModelsCreateAdminRequest) => {
      const response = await userApi.usersPost({ request });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: usersKeys.lists() });
    },
  });
}
