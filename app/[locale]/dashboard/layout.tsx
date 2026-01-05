import './globals.css';

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Locale, locales } from '@/i18n';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/lib/auth/auth-context';
import { DashboardLayoutClient } from './dashboard-layout-client';
import { Toaster } from '@/components/dashboard-ui/sonner';

const inter = Inter( { subsets: [ 'latin' ] } );

export default async function DashboardRootLayout( {
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string; }>;
} ) {
  const { locale } = ( await params ) as { locale: Locale; };

  // Validate locale
  if ( !locales.includes( locale ) ) {
    notFound();
  }

  // Get messages for this locale (including dashboard translations)
  const messages = await getMessages();

  return (
    <html lang={ locale }>
      <head>
        <title>Dashboard - Huerray</title>
        <meta name="robots" content="noindex, nofollow" />
      </head>
      <body className={ inter.className } suppressHydrationWarning>
        <NextIntlClientProvider messages={ messages }>
          <AuthProvider>
            <DashboardLayoutClient>
              { children }
            </DashboardLayoutClient>
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
