import type { Metadata } from 'next';
import { NewsletterUnsubscribe } from '@/components/NewsletterUnsubscribe';
import { LanguageSelector } from '@/components/LanguageSelector';

export const metadata: Metadata = {
  title: 'Newsletter Unsubscribe',
};

export default async function NewsletterUnsubscribePage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email } = await searchParams;

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 relative">
      <div className="absolute top-4 right-4 z-300"><LanguageSelector showLabel={false} /></div>
      <NewsletterUnsubscribe email={email ?? ''} />
    </div>
  );
}
