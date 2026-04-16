import { expect, test } from '@playwright/test';
import { brandCampaignsKeys } from '@/lib/api/hooks/campaigns';

test.describe('Dashboards - Brand Query Keys', () => {
  test('brand campaign query keys stay separate from global campaign keys', () => {
    const listParams = { status: 'draft' };

    expect(brandCampaignsKeys.all).toEqual(['brand-campaigns']);
    expect(brandCampaignsKeys.lists()).toEqual(['brand-campaigns', 'list']);
    expect(brandCampaignsKeys.list(listParams)).toEqual(['brand-campaigns', 'list', listParams]);
  });
});
