import '@/app/[locale]/(admin)/globals.css';
import { Toaster } from '@/components/dashboard-ui/sonner';
import { QueryProvider } from '@/lib/api/query-provider';
import { AuthProvider } from '@/lib/auth/auth-context';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Inter } from 'next/font/google';

const inter = Inter( { subsets: [ 'latin' ] } );

import { cn } from '@/lib/dashboard-utils';
import StoreProvider from '@/lib/redux/store-provider';

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
        <title>Dashboard - Huerray</title>
        <meta name='robots' content='noindex, nofollow' />
      </head>
      <body className={ cn( 'h-screen! overflow-y-hidden!', inter.className ) } suppressHydrationWarning>
        <NextIntlClientProvider messages={ messages }>
          <AuthProvider>
            <StoreProvider>
              <QueryProvider>
                { children }
                <Toaster />
              </QueryProvider>
            </StoreProvider>
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
