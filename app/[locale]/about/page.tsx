import { AboutPageClient } from '@/components/AboutPageClient';
import type { Locale } from '@/i18n';

type Props = {
  params: Promise<{ locale: Locale; }>;
};

export default async function AboutPage( { params }: Props ) {
  await params;

  return <AboutPageClient />;
}
