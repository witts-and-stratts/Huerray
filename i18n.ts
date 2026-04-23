import { getRequestConfig } from 'next-intl/server';

type MessageTree = Record<string, unknown>;

function isPlainObject( value: unknown ): value is MessageTree {
  return !!value && typeof value === 'object' && !Array.isArray( value );
}

function deepMergeMessages( fallback: MessageTree, override: MessageTree ): MessageTree {
  const result: MessageTree = { ...fallback };

  for ( const [ key, value ] of Object.entries( override ) ) {
    const fallbackValue = result[ key ];

    if ( isPlainObject( fallbackValue ) && isPlainObject( value ) ) {
      result[ key ] = deepMergeMessages( fallbackValue, value );
    } else {
      result[ key ] = value;
    }
  }

  return result;
}

const adminMessageModules = [
  'core',
  'dashboard',
  'users',
  'newsletter',
  'gigs',
  'invoices',
  'payments',
  'brands',
  'campaigns',
  'creators',
  'cases',
] as const;

const brandMessageModules = [
  'core',
  'landing',
  'campaigns',
  'submissions',
  'creators',
  'gigs',
  'billing',
  'settings',
] as const;

const commonMessageModules = [
  'core',
  'navigation',
  'tables',
  'emptyStates',
  'cards',
  'sheets',
  'submissions',
  'finance',
  'campaigns',
] as const;

const creatorMessageModules = [
  'core',
  'earnings',
  'navigation',
  'invitations',
  'submissions',
  'gigs',
  'settings',
  'profile',
] as const;

async function loadDashboardAdminMessages( locale: Locale ): Promise<MessageTree> {
  const modules = await Promise.all(
    adminMessageModules.map( ( moduleName ) =>
      import( `./locales/${locale}/dashboard/admin/${moduleName}.json` )
        .then( ( module ) => module.default as MessageTree )
    )
  );

  return modules.reduce<MessageTree>(
    ( merged, moduleMessages ) => deepMergeMessages( merged, moduleMessages as MessageTree ),
    {}
  );
}

async function loadDashboardBrandMessages( locale: Locale ): Promise<MessageTree> {
  const modules = await Promise.all(
    brandMessageModules.map( ( moduleName ) =>
      import( `./locales/${locale}/dashboard/brand/${moduleName}.json` )
        .then( ( module ) => module.default as MessageTree )
    )
  );

  return modules.reduce<MessageTree>(
    ( merged, moduleMessages ) => deepMergeMessages( merged, moduleMessages as MessageTree ),
    {}
  );
}

async function loadDashboardCommonMessages( locale: Locale ): Promise<MessageTree> {
  const modules = await Promise.all(
    commonMessageModules.map( ( moduleName ) =>
      import( `./locales/${locale}/dashboard/common/${moduleName}.json` )
        .then( ( module ) => module.default as MessageTree )
    )
  );

  return modules.reduce<MessageTree>(
    ( merged, moduleMessages ) => deepMergeMessages( merged, moduleMessages as MessageTree ),
    {}
  );
}

async function loadDashboardCreatorMessages( locale: Locale ): Promise<MessageTree> {
  const modules = await Promise.all(
    creatorMessageModules.map( ( moduleName ) =>
      import( `./locales/${locale}/dashboard/creator/${moduleName}.json` )
        .then( ( module ) => module.default as MessageTree )
    )
  );

  return modules.reduce<MessageTree>(
    ( merged, moduleMessages ) => deepMergeMessages( merged, moduleMessages as MessageTree ),
    {}
  );
}

// Can be imported from a shared config
export const locales = ['en', 'de', 'fr', 'es'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale = 'en';

export default getRequestConfig(async ({ locale, requestLocale }) => {
  // Try locale from setRequestLocale first, then requestLocale, then default
  let validLocale = locale || (await requestLocale) || defaultLocale;

  // Ensure it's a valid locale
  if (!locales.includes(validLocale as Locale)) {
    validLocale = defaultLocale;
  }

  const englishMessages = {
    common: (await import(`./locales/en/common.json`)).default,
    header: (await import(`./locales/en/header.json`)).default,
    footer: (await import(`./locales/en/footer.json`)).default,
    home: (await import(`./locales/en/home.json`)).default,
    creators: (await import(`./locales/en/creators.json`)).default,
    brands: (await import(`./locales/en/brands.json`)).default,
    pricing: (await import(`./locales/en/pricing.json`)).default,
    about: (await import(`./locales/en/about.json`)).default,
    career: (await import(`./locales/en/career.json`)).default,
    'privacy-policy': (await import(`./locales/en/privacy-policy.json`)).default,
    'terms-and-conditions': (await import(`./locales/en/terms-and-conditions.json`)).default,
    'creator-terms': (await import(`./locales/en/creator-terms.json`)).default,
    'site-notice': (await import(`./locales/en/site-notice.json`)).default,
    'brands-faq': (await import(`./locales/en/brands-faq.json`)).default,
    'creators-faq': (await import(`./locales/en/creators-faq.json`)).default,
    'managed-services': (await import(`./locales/en/managed-services.json`)).default,
    auth: (await import(`./locales/en/auth.json`)).default,
    metadata: (await import(`./locales/en/metadata.json`)).default,
    dashboard: {
      common: await loadDashboardCommonMessages( 'en' ),
      navigation: (await import(`./locales/en/dashboard/navigation.json`)).default,
      brand: await loadDashboardBrandMessages( 'en' ),
      creator: await loadDashboardCreatorMessages( 'en' ),
      admin: await loadDashboardAdminMessages( 'en' ),
      notifications: (await import(`./locales/en/dashboard/notifications.json`)).default,
    },
  };

  const localeMessages = validLocale === 'en' ? englishMessages : {
    common: (await import(`./locales/${validLocale}/common.json`)).default,
    header: (await import(`./locales/${validLocale}/header.json`)).default,
    footer: (await import(`./locales/${validLocale}/footer.json`)).default,
    home: (await import(`./locales/${validLocale}/home.json`)).default,
    creators: (await import(`./locales/${validLocale}/creators.json`)).default,
    brands: (await import(`./locales/${validLocale}/brands.json`)).default,
    pricing: (await import(`./locales/${validLocale}/pricing.json`)).default,
    about: (await import(`./locales/${validLocale}/about.json`)).default,
    career: (await import(`./locales/${validLocale}/career.json`)).default,
    'privacy-policy': (await import(`./locales/${validLocale}/privacy-policy.json`)).default,
    'terms-and-conditions': (await import(`./locales/${validLocale}/terms-and-conditions.json`)).default,
    'creator-terms': (await import(`./locales/${validLocale}/creator-terms.json`)).default,
    'site-notice': (await import(`./locales/${validLocale}/site-notice.json`)).default,
    'brands-faq': (await import(`./locales/${validLocale}/brands-faq.json`)).default,
    'creators-faq': (await import(`./locales/${validLocale}/creators-faq.json`)).default,
    'managed-services': (await import(`./locales/${validLocale}/managed-services.json`)).default,
    auth: (await import(`./locales/${validLocale}/auth.json`)).default,
    metadata: (await import(`./locales/${validLocale}/metadata.json`)).default,
    dashboard: {
      common: await loadDashboardCommonMessages( validLocale as Locale ),
      navigation: (await import(`./locales/${validLocale}/dashboard/navigation.json`)).default,
      brand: await loadDashboardBrandMessages( validLocale as Locale ),
      creator: await loadDashboardCreatorMessages( validLocale as Locale ),
      admin: await loadDashboardAdminMessages( validLocale as Locale ),
      notifications: (await import(`./locales/${validLocale}/dashboard/notifications.json`)).default,
    },
  };

  return {
    locale: validLocale,
    messages: deepMergeMessages( englishMessages, localeMessages ),
  };
});
