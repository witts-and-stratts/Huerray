import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Locale, locales } from '@/i18n';
import '@/app/globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Huerray',
  description: 'Connect with authentic creators for impactful UGC',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ff0000' },
    { media: '(prefers-color-scheme: dark)', color: '#ff0000' },
  ],
};

// export const dynamic = 'force-dynamic';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = (await params) as { locale: Locale };

  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <meta name='application-name' content='Huerray' />
        <link rel='icon' type='image/x-icon' href='favicon.ico' />
        <link
          rel='icon'
          type='image/png'
          href='favicon-196x196.png'
          sizes='196x196'
        />
        <link
          rel='icon'
          type='image/png'
          href='favicon-128x128.png'
          sizes='128x128'
        />
        <link
          rel='icon'
          type='image/png'
          href='favicon-96x96.png'
          sizes='96x96'
        />
        <link
          rel='icon'
          type='image/png'
          href='favicon-32x32.png'
          sizes='32x32'
        />
        <link
          rel='icon'
          type='image/png'
          href='favicon-16x16.png'
          sizes='16x16'
        />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='apple-touch-icon-180x180.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='192x192'
          href='apple-touch-icon-192x192.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='57x57'
          href='apple-touch-icon-57x57.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='60x60'
          href='apple-touch-icon-60x60.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='72x72'
          href='apple-touch-icon-72x72.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='76x76'
          href='apple-touch-icon-76x76.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='114x114'
          href='apple-touch-icon-114x114.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='120x120'
          href='apple-touch-icon-120x120.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='144x144'
          href='apple-touch-icon-144x144.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='152x152'
          href='apple-touch-icon-152x152.png'
        />
        <link rel='manifest' href='site.webmanifest' />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>

      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='0'
        height='0'
        className='absolute'
      >
        <defs>
          <clipPath id='rounded-clip' clipPathUnits='objectBoundingBox'>
            <rect width='1' height='1' rx='0.4587' ry='0.3743' />
          </clipPath>
          <clipPath id='square-rounded-clip' clipPathUnits='objectBoundingBox'>
            <path d='M0 0.2723 C0 0.1219 0.1052 0 0.2348 0 H0.7651 C0.8947 0 1 0.1219 1 0.2723 V0.7277 C1 0.8781 0.8947 1 0.7651 1 H0.2348 C0.1052 1 0 0.8781 0 0.7277 V0.2723 Z' />
          </clipPath>
        </defs>
      </svg>
    </html>
  );
}
