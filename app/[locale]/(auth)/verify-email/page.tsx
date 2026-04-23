import type { Metadata } from 'next';
import { VerifyEmail } from '@/components/auth/verify-email';
import { LanguageSelector } from '@/components/LanguageSelector';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Verify Email',
};

export default async function VerifyEmailPage( {
  searchParams,
}: {
  searchParams: Promise<{ token?: string; }>;
} ) {
  const { token } = await searchParams;

  if ( !token ) {
    redirect( '/login' );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 relative">
      <div className="absolute top-4 right-4 z-300"><LanguageSelector showLabel={ false } /></div>
      <VerifyEmail token={ token } />
    </div>
  );
}
