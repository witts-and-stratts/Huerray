import { expect, test } from '@playwright/test';
import { campaignsKeys } from '@/lib/api/hooks/campaigns';
import { notificationsKeys } from '@/lib/api/hooks/notifications';

test.describe('Dashboards - Admin Query Keys', () => {
  test('campaign query keys are stable and scoped by resource', () => {
    const listParams = { page: 2, perPage: 20 };

    expect(campaignsKeys.all).toEqual(['campaigns']);
    expect(campaignsKeys.lists()).toEqual(['campaigns', 'list']);
    expect(campaignsKeys.list(listParams)).toEqual(['campaigns', 'list', listParams]);
    expect(campaignsKeys.detail('campaign-1')).toEqual(['campaigns', 'detail', 'campaign-1']);
    expect(campaignsKeys.applications('campaign-1')).toEqual(['campaigns', 'detail', 'campaign-1', 'applications']);
    expect(campaignsKeys.invitations('campaign-1')).toEqual(['campaigns', 'detail', 'campaign-1', 'invitations']);
    expect(campaignsKeys.submissions('campaign-1')).toEqual(['campaigns', 'detail', 'campaign-1', 'submissions']);
  });

  test('notification query keys include filters and stats scope', () => {
    const filters = { page: 1, perPage: 10, unreadOnly: true };

    expect(notificationsKeys.all).toEqual(['notifications']);
    expect(notificationsKeys.lists()).toEqual(['notifications', 'list']);
    expect(notificationsKeys.list(filters)).toEqual(['notifications', 'list', filters]);
    expect(notificationsKeys.stats()).toEqual(['notifications', 'stats']);
  });
});
