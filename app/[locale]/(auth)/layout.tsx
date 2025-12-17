import type { Metadata } from "next";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { AuthProvider } from "@/lib/auth/auth-context";
import "@/app/[locale]/dashboard/globals.css";

export const metadata: Metadata = {
  title: "Sign In - Huerray",
  description: "Sign in to your Huerray account",
};

export default async function AuthLayout( {
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string; };
} ) {
  const messages = await getMessages();

  return (
    <html lang={ params.locale } suppressHydrationWarning>
      <body>
        <NextIntlClientProvider messages={ messages }>
          <AuthProvider>
            { children }
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
