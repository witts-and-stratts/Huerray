import { getRequestConfig } from 'next-intl/server';

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

  return {
    locale: validLocale,
    messages: {
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
      // Dashboard translations
      dashboard: {
        common: (await import(`./locales/${validLocale}/dashboard/common.json`)).default,
        navigation: (await import(`./locales/${validLocale}/dashboard/navigation.json`)).default,
        brand: (await import(`./locales/${validLocale}/dashboard/brand.json`)).default,
        creator: (await import(`./locales/${validLocale}/dashboard/creator.json`)).default,
        admin: (await import(`./locales/${validLocale}/dashboard/admin.json`)).default,
      },
    },
  };
});
