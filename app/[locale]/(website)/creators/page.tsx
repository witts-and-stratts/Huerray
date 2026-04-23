import type { Metadata } from 'next';
import { CreatorsPageClient } from '@/components/CreatorsPageClient';
import type { Locale } from '@/i18n';

type Props = {
  params: Promise<{ locale: Locale }>;
};

export const metadata: Metadata = {
  title: 'For Creators - Huerray',
};

export default async function CreatorsPage({ params }: Props) {
  await params;

  return <CreatorsPageClient />;
}
