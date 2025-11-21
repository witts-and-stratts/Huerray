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
    },
  };
});
