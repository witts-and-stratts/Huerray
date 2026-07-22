import '@/app/styles/dashboard-globals.css';
import { Toaster } from '@/components/dashboard-ui/sonner';
import { GoogleTagManager, GtmConsentDefault } from '@/components/GoogleTagManager';
import { CookieBanner } from '@/components/CookieBanner';
import { QueryProvider } from '@/lib/api/query-provider';
import { AuthProvider } from '@/lib/auth/auth-context';
import { cn } from '@/lib/dashboard-utils';
import StoreProvider from '@/lib/redux/store-provider';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { Inter } from 'next/font/google';

const inter = Inter( { subsets: [ 'latin' ] } );

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations( 'metadata' );
  return {
    title: {
      default: `${ t( 'admin.dashboardDefault' ) } - Huerray`,
      template: '%s - Huerray',
    },
    robots: { index: false, follow: false },
  };
}

export default async function AdminLayout( {
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string; }>;
} ) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={ locale } suppressHydrationWarning>
      <head>
        <GtmConsentDefault />
      </head>
      <body className={ cn( 'h-screen! overflow-y-hidden!', inter.className ) } suppressHydrationWarning>
        <GoogleTagManager />
        <NextIntlClientProvider messages={ messages }>
          <AuthProvider>
            <StoreProvider>
              <QueryProvider>
                { children }
                <Toaster />
              </QueryProvider>
            </StoreProvider>
          </AuthProvider>
          <CookieBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
