import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

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
}

const baseUrl =
  process.env.NODE_ENV === 'development' ? DEV_URL : SITE_URL;
const defaultImageUrl = `${ baseUrl }/images/og-image.png`;

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

  // Try to get SEO data from translations, fallback to defaults
  const title = overrides?.title || ( t.has( 'seo.title' ) ? t( 'seo.title' ) : SITE_NAME );
  const description = overrides?.description || ( t.has( 'seo.description' ) ? t( 'seo.description' ) : '' );
  const keywords = overrides?.keywords || ( t.has( 'seo.keywords' ) ? t( 'seo.keywords' ).split( ',' ).map( k => k.trim() ) : [] );

  const imageUrl = overrides?.imageUrl || defaultImageUrl;
  const imageWidth = overrides?.imageWidth || 1200;
  const imageHeight = overrides?.imageHeight || 630;
  const url = overrides?.url || baseUrl;

  const fullTitle = title === SITE_NAME ? title : `${ title } | ${ SITE_NAME }`;

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
      locale: lang === 'en' ? 'en_US' : `${ lang }_${ lang.toUpperCase() }`,
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
    robots: 'index, follow',
  };
}
