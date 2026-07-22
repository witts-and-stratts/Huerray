import type { Metadata } from "next";
import { getMessages, getTranslations } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { QueryProvider } from "@/lib/api/query-provider";
import { AuthProvider } from "@/lib/auth/auth-context";
import StoreProvider from "@/lib/redux/store-provider";
import { GoogleTagManager, GtmConsentDefault } from "@/components/GoogleTagManager";
import { CookieBanner } from "@/components/CookieBanner";
import "@/app/styles/dashboard-globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations( "metadata" );
  return {
    title: {
      default: `${ t( "auth.signIn" ) } - Huerray`,
      template: "%s - Huerray",
    },
    description: "Sign in to your Huerray account",
    robots: { index: false, follow: false },
  };
}

import { Toaster } from "@/components/ui/sonner";

export default async function AuthLayout( {
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
      <body>
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
