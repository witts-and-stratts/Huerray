
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { UserApi, UsersSearchGetUserTypeEnum } from '../generated/api/user-api';
import { AuthenticationApi } from '../generated/api/authentication-api';
import { apiClient, apiConfiguration } from '../client';

// Create API instance
const userApi = new UserApi(apiConfiguration, undefined, apiClient);
const authApi = new AuthenticationApi(apiConfiguration, undefined, apiClient);

import { ModelsUserResponse, ModelsEditUserRequestUserTypeEnum, ModelsEditUserRequest } from '../generated/models';

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
    page = 1,
    limit = 10
  }: {
    q?: string;
    userType?: UsersSearchGetUserTypeEnum;
    status?: string;
    page?: number;
    limit?: number;
  } = {}
) {
  return useQuery({
    queryKey: usersKeys.list({ q, userType, status, page, limit }),
    queryFn: async () => {
      const response = await userApi.usersSearchGet({
        q,
        userType,
        status,
        page,
        limit
      });
      return response;
    },
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

export function useUser(id: string) {
  return useQuery({
    queryKey: usersKeys.detail(id),
    queryFn: async () => {
      const response = await userApi.usersIdGet({ id });
      return response.data.data;
    },
    enabled: !!id,
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
