import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { locales } from '@/i18n';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://huerray.com';
const DEV_URL = 'http://localhost:3000';
const SITE_NAME = 'Huerray';
const TWITTER_URL = 'https://x.com/@huerray';
const TWITTER_HANDLE = '@huerray';

interface SeoProps {
  title?: string;
  description?: string;
  imageUrl?: string;
  keywords?: string[];
  imageWidth?: number;
  imageHeight?: number;
  url?: string;
  lang?: string;
  pathname?: string;
  canonical?: string;
  noIndex?: boolean;
}

const baseUrl =
  process.env.NODE_ENV === 'development' ? DEV_URL : SITE_URL;
const defaultImageUrl = `${ baseUrl }/images/og-image.png`;

function normalizeText(value?: string): string | undefined {
  if (!value) return undefined;
  const normalized = value.replace( /\s+/g, ' ' ).trim();
  return normalized || undefined;
}

function toLocalizedPath(locale: string, pathname?: string): string {
  if (!pathname || pathname === '/' ) {
    return `/${ locale }`;
  }

  return `/${ locale }${ pathname.startsWith( '/' ) ? pathname : `/${ pathname }` }`;
}

/**
 * Generate SEO metadata for a page using translations
 * @param lang - The locale (en, de, es, fr)
 * @param namespace - The translation namespace (e.g., 'home', 'about', 'career')
 * @param overrides - Optional overrides for title, description, etc.
 */
export default async function generateSEO(
  lang: string,
  namespace: string,
  overrides?: Partial<SeoProps>
): Promise<Metadata> {
  const t = await getTranslations( { locale: lang, namespace } );

  const seo = t.has( 'seo' ) ? t.raw( 'seo' ) as { title?: string; description?: string; keywords?: string; } : undefined;
  const pageTitle =
    overrides?.title ||
    normalizeText( seo?.title ) ||
    normalizeText( t.has( 'page.title' ) ? t( 'page.title' ) : undefined ) ||
    normalizeText( t.has( 'hero.title' ) ? t( 'hero.title' ) : undefined ) ||
    normalizeText( t.has( 'title' ) ? t( 'title' ) : undefined ) ||
    SITE_NAME;
  const description =
    overrides?.description ||
    normalizeText( seo?.description ) ||
    normalizeText( t.has( 'page.subtitle' ) ? t( 'page.subtitle' ) : undefined ) ||
    normalizeText( t.has( 'hero.subtitle' ) ? t( 'hero.subtitle' ) : undefined ) ||
    normalizeText( t.has( 'subtitle' ) ? t( 'subtitle' ) : undefined ) ||
    normalizeText( t.has( 'hero.description' ) ? t( 'hero.description' ) : undefined ) ||
    '';
  const keywords =
    overrides?.keywords ||
    ( seo?.keywords ? seo.keywords.split( ',' ).map( ( keyword ) => keyword.trim() ).filter( Boolean ) : [] );

  const imageUrl = overrides?.imageUrl || defaultImageUrl;
  const imageWidth = overrides?.imageWidth || 1200;
  const imageHeight = overrides?.imageHeight || 630;
  const pathname = overrides?.pathname;
  const url = overrides?.canonical || overrides?.url || ( pathname ? `${ baseUrl }${ toLocalizedPath( lang, pathname ) }` : baseUrl );

  const fullTitle = pageTitle === SITE_NAME ? pageTitle : `${ pageTitle } | ${ SITE_NAME }`;
  const locale = locales.includes( lang as (typeof locales)[number] ) ? lang : 'en';
  const alternates = pathname
    ? {
        canonical: overrides?.canonical || `${ baseUrl }${ toLocalizedPath( locale, pathname ) }`,
        languages: Object.fromEntries(
          locales.map( ( localeKey ) => [
            localeKey,
            `${ baseUrl }${ toLocalizedPath( localeKey, pathname ) }`,
          ] ),
        ),
      }
    : undefined;

  const jsonLdScript = {
    __html: JSON.stringify( {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: fullTitle,
      description: description,
      url: url,
      inLanguage: lang,
      publisher: {
        '@type': 'Organization',
        name: SITE_NAME,
        logo: `${ baseUrl }/images/logo.png`,
      },
    } ),
  };

  return {
    metadataBase: new URL( SITE_URL ),
    title: fullTitle,
    description: description,
    alternates,
    applicationName: SITE_NAME,
    icons: {
      icon: `${ baseUrl }/favicon.ico`,
      shortcut: `${ baseUrl }/images/favicons/favicon-32x32.png`,
      apple: `${ baseUrl }/images/favicons/apple-touch-icon.png`,
      other: [
        {
          url: `${ baseUrl }/images/favicons/android-chrome-512x512.png`,
          type: 'image/png',
          sizes: '512x512',
        },
        {
          url: `${ baseUrl }/images/favicons/android-chrome-192x192.png`,
          type: 'image/png',
          sizes: '192x192',
        },
      ],
    },
    openGraph: {
      type: 'website',
      url: url,
      title: fullTitle,
      description: description,
      images: [
        {
          url: imageUrl,
          width: imageWidth,
          height: imageHeight,
          alt: fullTitle,
          type: 'image/png',
        },
      ],
      siteName: SITE_NAME,
      locale: locale === 'en' ? 'en_US' : `${ locale }_${ locale.toUpperCase() }`,
    },
    other: {
      jsonld: jsonLdScript.__html,
    },
    twitter: {
      site: TWITTER_URL,
      card: 'summary_large_image',
      description: description,
      title: fullTitle,
      creator: TWITTER_HANDLE,
      images: [
        {
          url: imageUrl,
          alt: fullTitle,
        },
      ],
      creatorId: TWITTER_HANDLE,
      siteId: TWITTER_HANDLE,
    },
    creator: 'The Huerray Team',
    publisher: 'Huerray',
    authors: [
      { name: SITE_NAME, url: SITE_URL },
    ],
    keywords: keywords,
    robots: overrides?.noIndex ? { index: false, follow: false } : 'index, follow',
  };
}
