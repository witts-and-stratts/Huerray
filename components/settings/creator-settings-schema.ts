import { UtilsBrandCategory, UtilsCompanySize, UtilsCountryCode } from '@/lib/api/generated';
import { z } from 'zod/v4';
import { FormApi } from '@tanstack/react-form';

export type ReactFormApi<TData> = FormApi<TData, any, any, any, any, any, any, any, any, any, any, any> & {
  Field: any;
  Subscribe: any;
};

export type CreatorSettingsMessages = {
  bioRequired: string;
  dateOfBirthRequired: string;
  genderRequired: string;
  phoneNumberRequired: string;
  streetRequired: string;
  cityRequired: string;
  stateRequired: string;
  zipcodeRequired: string;
  countryRequired: string;
  applicationVideoRequired: string;
  creatorMustBeAdult: string;
  portfolioInvalidUrl?: string;
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

// Allow users to omit the scheme (e.g. "example.com"); default to https://.
const ensureUrlScheme = ( value: string ) =>
  /^https?:\/\//i.test( value.trim() ) ? value.trim() : `https://${ value.trim() }`;

const isValidUrl = ( value: string ) => {
  try {
    new URL( ensureUrlScheme( value ) );
    return true;
  } catch {
    return false;
  }
};

// Portfolio may be a JSON array of URLs or a comma-separated list of URLs.
function parsePortfolioEntries( value: string ): string[] {
  const trimmed = value.trim();
  if ( !trimmed ) return [];

  try {
    const parsed = JSON.parse( trimmed );
    if ( Array.isArray( parsed ) ) {
      return parsed.map( ( entry ) => String( entry ).trim() ).filter( Boolean );
    }
  } catch {
    // Not JSON — fall back to comma-separated parsing.
  }

  return trimmed.split( ',' ).map( ( entry ) => entry.trim() ).filter( Boolean );
}

// Only validates when a value is provided; empty portfolio stays valid (optional).
function isValidPortfolio( value?: string ) {
  if ( !value || !value.trim() ) return true;
  const entries = parsePortfolioEntries( value );
  if ( entries.length === 0 ) return true;
  return entries.every( isValidUrl );
}

export const getCreatorSettingsSchema = ( messages: CreatorSettingsMessages ) => z.object({
  // Profile
  bio: z.string().min( 1, messages.bioRequired ),
  preferredCategories: z.array(z.string()).optional(),
  dateOfBirth: z.string().min( 1, messages.dateOfBirthRequired ).refine(
    ( value ) => isAtLeastMinimumAge( value, MINIMUM_CREATOR_AGE ),
    messages.creatorMustBeAdult
  ),
  gender: z.string().min( 1, messages.genderRequired ),
  phoneNumber: z.string().min( 1, messages.phoneNumberRequired ),
  street: z.string().min( 1, messages.streetRequired ),
  city: z.string().min( 1, messages.cityRequired ),
  state: z.string().min( 1, messages.stateRequired ),
  zipcode: z.string().min( 1, messages.zipcodeRequired ),
  country: z.string().min( 1, messages.countryRequired ),

  // Social
  instagramHandle: z.string().optional(),
  tiktokHandle: z.string().optional(),
  youtubeHandle: z.string().optional(),
  twitterHandle: z.string().optional(),
  portfolio: z.string().optional().refine(
    isValidPortfolio,
    messages.portfolioInvalidUrl ?? 'Please enter valid portfolio URLs'
  ),
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
  bioRequired: 'Bio is required',
  dateOfBirthRequired: 'Date of birth is required',
  genderRequired: 'Gender is required',
  phoneNumberRequired: 'Phone number is required',
  streetRequired: 'Street is required',
  cityRequired: 'City is required',
  stateRequired: 'State/Province is required',
  zipcodeRequired: 'Zipcode is required',
  countryRequired: 'Country is required',
  applicationVideoRequired: 'Application video is required',
  creatorMustBeAdult: 'Creators must be at least 18 years old',
  portfolioInvalidUrl: 'Please enter valid portfolio URLs',
} );

export type CreatorSettings = z.infer<typeof creatorSettingsSchema>;
