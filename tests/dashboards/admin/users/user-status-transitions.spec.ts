import { expect, test } from '@playwright/test';
import { canTransitionUserStatus, getAvailableUserStatusActions } from '@/lib/admin/user-status';

test.describe('Dashboards - Admin user status actions', () => {
  test('an active user can be suspended or rejected, but not "approved"', () => {
    expect(getAvailableUserStatusActions('active')).toEqual(['suspended', 'rejected']);
  });

  test('pending users can be approved, suspended or rejected', () => {
    expect(getAvailableUserStatusActions('pending')).toEqual(['approved', 'suspended', 'rejected']);
  });

  test('blocked users can be reactivated', () => {
    expect(getAvailableUserStatusActions('suspended')).toContain('active');
    expect(getAvailableUserStatusActions('rejected')).toEqual(['active']);
  });

  test('deleted users have no actions', () => {
    expect(getAvailableUserStatusActions('deleted')).toEqual([]);
  });

  test('transitions match the backend rules', () => {
    expect(canTransitionUserStatus('active', 'suspended')).toBe(true);
    expect(canTransitionUserStatus('active', 'rejected')).toBe(true);
    expect(canTransitionUserStatus('rejected', 'suspended')).toBe(false);
    expect(canTransitionUserStatus('deleted', 'active')).toBe(false);
  });
});
