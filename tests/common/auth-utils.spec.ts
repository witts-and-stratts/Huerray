import { expect, test } from '@playwright/test';
import { getUserRole } from '@/lib/constants';
import { getUserDisplayName } from '@/lib/auth/auth-context';

test.describe('Common - Auth Utilities', () => {
  test('maps backend user role variants to dashboard roles', () => {
    expect(getUserRole({ user_type: 'admin' })).toBe('admin');
    expect(getUserRole({ user_type: 'admin_user' })).toBe('admin');
    expect(getUserRole({ username: 'admin' })).toBe('admin');
    expect(getUserRole({ userType: 'creator' })).toBe('creator');
    expect(getUserRole({ role: 'brand' })).toBe('brand');
    expect(getUserRole({})).toBe('brand');
  });

  test('formats user display names with sensible fallbacks', () => {
    expect(getUserDisplayName(null)).toBe('Guest');
    expect(getUserDisplayName({
      id: '1',
      email: 'creator@example.com',
      firstName: 'Maya',
      lastName: 'Jones',
      role: 'creator',
    })).toBe('Maya Jones');
    expect(getUserDisplayName({
      id: '2',
      email: 'brand@example.com',
      firstName: '',
      lastName: '',
      role: 'brand',
    })).toBe('brand@example.com');
  });
});
