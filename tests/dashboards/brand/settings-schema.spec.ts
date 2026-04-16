import { expect, test } from '@playwright/test';
import { brandSettingsSchema } from '@/components/settings/brand-settings-schema';

const validBrandSettings = {
  companyName: 'Acme GmbH',
  websiteUrl: 'https://example.com',
  companyDescription: 'Brand description',
  category: undefined,
  companySize: undefined,
  registrationNumber: '',
  city: 'Berlin',
  country: 'DE',
  building_number: '12',
  preferredContactEmail: 'team@example.com',
  preferredContactPhone: '+49123456789',
  state: 'Berlin',
  street: 'Main Street',
  vatId: '',
  postalCode: '10115',
  profilePhotoUrl: '',
};

test.describe('Dashboards - Brand Settings Schema', () => {
  test('brand settings accept a complete brand profile', () => {
    expect(brandSettingsSchema.safeParse(validBrandSettings).success).toBe(true);
  });

  test('brand settings reject missing company name/state and invalid urls or emails', () => {
    const result = brandSettingsSchema.safeParse({
      ...validBrandSettings,
      companyName: '',
      websiteUrl: 'not-a-url',
      preferredContactEmail: 'not-an-email',
      state: '',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      const paths = result.error.issues.map((issue) => issue.path.join('.'));
      expect(paths).toContain('companyName');
      expect(paths).toContain('websiteUrl');
      expect(paths).toContain('preferredContactEmail');
      expect(paths).toContain('state');
    }
  });
});
