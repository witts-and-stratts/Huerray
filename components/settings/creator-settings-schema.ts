import { UtilsBrandCategory, UtilsCompanySize, UtilsCountryCode } from '@/lib/api/generated';
import { z } from 'zod';
import { FormApi } from '@tanstack/react-form';

export type ReactFormApi<TData> = FormApi<TData, any, any, any, any, any, any, any, any, any, any, any> & {
  Field: any;
  Subscribe: any;
};

export type CreatorSettingsMessages = {
  zipcodeRequired: string;
  applicationVideoRequired: string;
  creatorMustBeAdult: string;
};

const MINIMUM_CREATOR_AGE = 18;

function isAtLeastMinimumAge( dateOfBirth: string, minimumAge: number ) {
  if ( !dateOfBirth ) return true;

  const birthDate = new Date( dateOfBirth );
  if ( Number.isNaN( birthDate.getTime() ) ) return false;

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthOffset = today.getMonth() - birthDate.getMonth();

  if ( monthOffset < 0 || ( monthOffset === 0 && today.getDate() < birthDate.getDate() ) ) {
    age--;
  }

  return age >= minimumAge;
}

export const getCreatorSettingsSchema = ( messages: CreatorSettingsMessages ) => z.object({
  // Profile
  bio: z.string(),
  preferredCategories: z.array(z.string()).optional(),
  dateOfBirth: z.string().refine(
    ( value ) => isAtLeastMinimumAge( value, MINIMUM_CREATOR_AGE ),
    messages.creatorMustBeAdult
  ),
  gender: z.string(),
  phoneNumber: z.string(),
  street: z.string(),
  city: z.string(),
  state: z.string(),
  zipcode: z.string( messages.zipcodeRequired ),
  country: z.string(),

  // Social
  instagramHandle: z.string().optional(),
  tiktokHandle: z.string().optional(),
  youtubeHandle: z.string().optional(),
  twitterHandle: z.string().optional(),
  portfolio: z.string().optional(),
  applicationVideo: z.string().min( 1, messages.applicationVideoRequired ),
  applicationVideoThumbnail: z.string().optional(),
  profileImageUrl: z.string().optional(),

  // Bank
  bankName: z.string().optional(),
  bankAccountNumber: z.string().optional(),
  bankRoutingNumber: z.string().optional(),
  taxId: z.string().optional(),
  taxCountry: z.string().optional(),
  bankAccountName: z.string().optional(),
  bankAddress: z.string().optional(),
} );

export const creatorSettingsSchema = getCreatorSettingsSchema( {
  zipcodeRequired: 'Zipcode is required',
  applicationVideoRequired: 'Application video is required',
  creatorMustBeAdult: 'Creators must be at least 18 years old',
} );

export type CreatorSettings = z.infer<typeof creatorSettingsSchema>;
