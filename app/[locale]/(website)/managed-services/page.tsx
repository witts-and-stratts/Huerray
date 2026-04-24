import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { ManagedServicesClient } from '@/components/ManagedServicesClient';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations( 'metadata' );
  return {
    title: `${ t( 'website.managedServices' ) } - Huerray`,
  };
}

export default function ManagedServicesPage() {
  return <ManagedServicesClient />;
}
