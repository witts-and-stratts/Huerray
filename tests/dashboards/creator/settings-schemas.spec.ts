import { expect, test } from '@playwright/test';
import { creatorSettingsSchema } from '@/components/settings/creator-settings-schema';

const validCreatorSettings = {
  bio: 'Creator bio',
  preferredCategories: ['technology'],
  dateOfBirth: '1990-01-01',
  gender: 'female',
  phoneNumber: '+49123456789',
  street: 'Main Street',
  city: 'Berlin',
  state: 'Berlin',
  zipcode: '10115',
  country: 'DE',
  instagramHandle: '',
  tiktokHandle: '',
  youtubeHandle: '',
  twitterHandle: '',
  portfolio: '',
  applicationVideo: 'https://example.com/video.mp4',
  applicationVideoThumbnail: '',
  profileImageUrl: '',
  bankName: '',
  bankAccountNumber: '',
  bankRoutingNumber: '',
  taxId: '',
  taxCountry: '',
  bankAccountName: '',
  bankAddress: '',
};

test.describe('Dashboards - Creator Settings Schema', () => {
  test('creator settings accept a complete adult creator profile', () => {
    expect(creatorSettingsSchema.safeParse(validCreatorSettings).success).toBe(true);
  });

  test('creator settings reject minors, invalid dates, and missing application video', () => {
    const result = creatorSettingsSchema.safeParse({
      ...validCreatorSettings,
      dateOfBirth: 'not-a-date',
      applicationVideo: '',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      const paths = result.error.issues.map((issue) => issue.path.join('.'));
      expect(paths).toContain('dateOfBirth');
      expect(paths).toContain('applicationVideo');
    }

    const minorBirthYear = new Date().getFullYear() - 17;
    expect(creatorSettingsSchema.safeParse({
      ...validCreatorSettings,
      dateOfBirth: `${minorBirthYear}-01-01`,
    }).success).toBe(false);
  });

});
