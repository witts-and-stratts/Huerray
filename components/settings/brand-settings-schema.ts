
import { UtilsBrandCategory, UtilsCompanySize } from '@/lib/api/generated';
import { z } from 'zod';
import { FormApi } from '@tanstack/react-form';

export type ReactFormApi<TData> = FormApi<TData, any, any, any, any, any, any, any, any, any, any, any> & {
  Field: any;
  Subscribe: any;
};

export const brandSettingsSchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  websiteUrl: z.string().url('Invalid URL'),
  companyDescription: z.string(),
  category: z.nativeEnum(UtilsBrandCategory).optional(),
  companySize: z.nativeEnum(UtilsCompanySize).optional(),
  registrationNumber: z.string(),
  city: z.string(),
  country: z.string(),
  building_number: z.string(),
  preferredContactEmail: z.email().or(z.literal('')),
  preferredContactPhone: z.string(),
  state: z.string().min(1, 'State/Province is required'),
  street: z.string(),
  vatId: z.string(),
  postalCode: z.string(),
  profilePhotoUrl: z.string().optional(),
});

export type BrandSettings = z.infer<typeof brandSettingsSchema>;
