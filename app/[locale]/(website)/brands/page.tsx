import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { BrandsPageClient } from '@/components/BrandsPageClient';
import type { Locale } from '@/i18n';

type Props = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations( 'metadata' );
  return {
    title: `${ t( 'website.forBrands' ) } - Huerray`,
  };
}

export default async function BrandsPage({ params }: Props) {
  await params;

  return <BrandsPageClient />;
}
