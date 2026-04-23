import type { Metadata } from 'next';
import { AboutPageClient } from '@/components/AboutPageClient';
import type { Locale } from '@/i18n';

type Props = {
  params: Promise<{ locale: Locale; }>;
};

export const metadata: Metadata = {
  title: 'About - Huerray',
};

export default async function AboutPage( { params }: Props ) {
  await params;

  return <AboutPageClient />;
}
