import type { Metadata } from 'next';
import { ManagedServicesClient } from '@/components/ManagedServicesClient';
import generateSEO from '@/components/seo/SEO';
import type { Locale } from '@/i18n';

type Props = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return generateSEO(locale, 'managed-services', { pathname: '/managed-services' });
}

export default function ManagedServicesPage() {
  return <ManagedServicesClient />;
}
