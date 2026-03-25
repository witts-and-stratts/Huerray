
import { UtilsBrandCategory, UtilsCompanySize } from '@/lib/api/generated';
import { z } from 'zod';
import { FormApi } from '@tanstack/react-form';

export type ReactFormApi<TData> = FormApi<TData, any, any, any, any, any, any, any, any, any, any, any> & {
  Field: any;
  Subscribe: any;
};

export type BrandSettingsMessages = {
  companyNameRequired: string;
  invalidUrl: string;
  stateRequired: string;
};

export const getBrandSettingsSchema = ( messages: BrandSettingsMessages ) => z.object({
  companyName: z.string().min( 1, messages.companyNameRequired ),
  websiteUrl: z.string().url( messages.invalidUrl ),
  companyDescription: z.string(),
  category: z.nativeEnum( UtilsBrandCategory ).optional(),
  companySize: z.nativeEnum( UtilsCompanySize ).optional(),
  registrationNumber: z.string(),
  city: z.string(),
  country: z.string(),
  building_number: z.string(),
  preferredContactEmail: z.email().or( z.literal( '' ) ),
  preferredContactPhone: z.string(),
  state: z.string().min( 1, messages.stateRequired ),
  street: z.string(),
  vatId: z.string(),
  postalCode: z.string(),
  profilePhotoUrl: z.string().optional(),
} );

export const brandSettingsSchema = getBrandSettingsSchema( {
  companyNameRequired: 'Company name is required',
  invalidUrl: 'Invalid URL',
  stateRequired: 'State/Province is required',
} );

export type BrandSettings = z.infer<typeof brandSettingsSchema>;
