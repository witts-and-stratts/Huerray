import { CreatorSidebar } from '@/components/dashboard/creator-sidebar';
import {
  SidebarInset,
  SidebarProvider,
} from '@/components/dashboard-ui/sidebar';
import { DashboardHeader } from '@/components/dashboard-header';
import { AuthProvider } from '@/lib/auth/auth-context';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Inter } from 'next/font/google';
import '@/app/[locale]/dashboard/globals.css';

const inter = Inter({ subsets: ['latin'] });

export default async function CreatorAdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <title>Creator Dashboard - Huerray</title>
        <meta name='robots' content='noindex, nofollow' />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <AuthProvider>
            <SidebarProvider data-dashboard-theme='creator'>
              <CreatorSidebar />
              <SidebarInset>
                <DashboardHeader />
                <main className='bg-background flex flex-1 flex-col gap-4 overflow-y-auto p-4'>
                  {children}
                </main>
              </SidebarInset>
            </SidebarProvider>
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
