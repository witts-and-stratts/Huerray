import type { Metadata } from 'next';
import { BrandsPageClient } from '@/components/BrandsPageClient';
import type { Locale } from '@/i18n';

type Props = {
  params: Promise<{ locale: Locale }>;
};

export const metadata: Metadata = {
  title: 'For Brands - Huerray',
};

export default async function BrandsPage({ params }: Props) {
  await params;

  return <BrandsPageClient />;
}
