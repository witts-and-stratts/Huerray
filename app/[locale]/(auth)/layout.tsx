import type { Metadata } from "next";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { QueryProvider } from "@/lib/api/query-provider";
import { AuthProvider } from "@/lib/auth/auth-context";
import StoreProvider from "@/lib/redux/store-provider";
import "@/app/styles/dashboard-globals.css";

export const metadata: Metadata = {
  title: "Sign In - Huerray",
  description: "Sign in to your Huerray account",
};

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
      <body>
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
