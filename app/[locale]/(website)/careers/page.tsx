import type { Metadata } from 'next';
import { CareerPageClient } from '@/components/CareerPageClient';
import type { Locale } from '@/i18n';

type Props = {
  params: Promise<{ locale: Locale; }>;
};

export const metadata: Metadata = {
  title: 'Careers - Huerray',
};

export default async function CareerPage( { params }: Props ) {
  await params;

  return <CareerPageClient />;
}
