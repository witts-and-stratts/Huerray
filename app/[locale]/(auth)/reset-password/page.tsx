import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { redirect } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations( "metadata" );
  return {
    title: t( "auth.resetPassword" ),
  };
}

export default async function ResetPasswordPage( {
  searchParams,
}: {
  searchParams: Promise<{ token?: string; }>;
} ) {
  const params = await searchParams;
  const token = params.token;

  // Redirect to forgot password if no token
  if ( !token ) {
    redirect( "/forgot-password" );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <ResetPasswordForm token={ token } />
    </div>
  );
}
