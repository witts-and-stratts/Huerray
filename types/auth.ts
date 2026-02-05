export type UserType = 'admin_user' | 'creator' | 'brand_user' | string;
export type UserStatus = 'active' | 'inactive' | 'pending' | string;

export interface AuthUser {
  id: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  username: string;
  email: string;
  user_type: UserType;
  user_status: UserStatus;
  email_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface AuthTokenData {
  access_token: string;
  refresh_token: string;
  user: AuthUser;
}

export interface AuthLoginResponse {
  success: boolean;
  message: string;
  data: AuthTokenData;
}
