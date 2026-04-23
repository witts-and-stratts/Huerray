import type { Metadata } from 'next';
import { ManagedServicesClient } from '@/components/ManagedServicesClient';

export const metadata: Metadata = {
  title: 'Managed Services - Huerray',
};

export default function ManagedServicesPage() {
  return <ManagedServicesClient />;
}
