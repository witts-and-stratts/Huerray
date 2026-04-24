import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { InvitationsView } from '@/components/creator/invitations-view';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations( 'metadata' );
  return {
    title: t( 'creator.invitations' ),
  };
}

export default function InvitationsPage() {
  return <InvitationsView />;
}
