export type UserRole = 'admin' | 'creator' | 'brand';

export const DASHBOARD_PATHS: Record<UserRole, string> = {
  admin: '/admin',
  creator: '/creator',
  brand: '/brand',
};

export interface UserData {
  user_type?: string;
  userType?: string;
  role?: string;
  username?: string;
}

export function getUserRole( userData: UserData ): UserRole {
  const rawType = userData.user_type || userData.userType || userData.role;

  if ( rawType === 'admin' || rawType === 'admin_user' || userData.username === 'admin' ) {
    return 'admin';
  }
  if ( rawType === 'creator' ) {
    return 'creator';
  }
  return 'brand';
}
