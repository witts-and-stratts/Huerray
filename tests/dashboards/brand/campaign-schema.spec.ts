import { expect, test } from '@playwright/test';
import { createCampaignSchema } from '@/components/campaigns/schema';
import { UtilsCampaignCategory } from '@/lib/api/generated/models/utils-campaign-category';
import { UtilsContentType } from '@/lib/api/generated/models/utils-content-type';
import { UtilsVideoFormat } from '@/lib/api/generated/models/utils-video-format';

const validCampaign = {
  campaign_name: 'Spring Launch',
  description: 'A creator campaign for a product launch.',
  category: UtilsCampaignCategory.CampaignCategorySoftware,
  content_type: UtilsContentType.ContentTypeHumanGenerated,
  keywords: ['launch'],
  product_url: 'https://example.com/product',
  product_image: 'https://example.com/product.jpg',
  number_of_creators_wanted: 2,
  number_of_videos_wanted: 4,
  video_duration_in_seconds: 30,
  video_format: UtilsVideoFormat.VideoFormatMP4,
  allow_multiple_videos: false,
  tone_of_voice: '',
  dos: '',
  donts: '',
  documents: [],
  images: [],
  videos: [],
};

test.describe('Dashboards - Brand Campaign Schema', () => {
  test('accepts a complete campaign payload', () => {
    expect(createCampaignSchema().safeParse(validCampaign).success).toBe(true);
  });

  test('allows empty optional product URLs', () => {
    expect(createCampaignSchema().safeParse({
      ...validCampaign,
      product_url: '',
      product_image: '',
    }).success).toBe(true);
  });

  test('rejects missing required campaign fields', () => {
    const result = createCampaignSchema().safeParse({
      ...validCampaign,
      campaign_name: '',
      description: '',
      number_of_creators_wanted: 0,
      number_of_videos_wanted: 0,
      video_duration_in_seconds: 0,
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      const paths = result.error.issues.map((issue) => issue.path.join('.'));
      expect(paths).toContain('campaign_name');
      expect(paths).toContain('description');
      expect(paths).toContain('number_of_creators_wanted');
      expect(paths).toContain('number_of_videos_wanted');
      expect(paths).toContain('video_duration_in_seconds');
    }
  });

  test('rejects invalid product URLs and enum values', () => {
    const result = createCampaignSchema().safeParse({
      ...validCampaign,
      category: 'invalid-category',
      content_type: 'invalid-content-type',
      product_url: 'not-a-url',
      product_image: 'not-a-url',
      video_format: 'invalid-format',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      const paths = result.error.issues.map((issue) => issue.path.join('.'));
      expect(paths).toContain('category');
      expect(paths).toContain('content_type');
      expect(paths).toContain('product_url');
      expect(paths).toContain('product_image');
      expect(paths).toContain('video_format');
    }
  });
});
