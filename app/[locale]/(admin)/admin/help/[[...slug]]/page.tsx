import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { HelpCenterPage } from '@/components/ui/help-sheet/help-center-page';
import { resolveHelpRoute } from '@/components/ui/help-sheet/help-routing';

interface AdminHelpPageProps {
  params: Promise<{ slug?: string[] }>;
}

export const metadata: Metadata = {
  title: 'Help Center',
};

export default async function AdminHelpPage( { params }: AdminHelpPageProps ) {
  const { slug } = await params;
  const route = resolveHelpRoute( 'admin', slug );

  if ( !route ) {
    notFound();
  }

  if ( route.section === 'topic' ) {
    return <HelpCenterPage role="admin" section="topic" topicId={ route.topicId } />;
  }

  return <HelpCenterPage role="admin" section={ route.section } />;
}
