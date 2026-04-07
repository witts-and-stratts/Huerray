import { notFound } from 'next/navigation';
import { HelpCenterPage } from '@/components/ui/help-sheet/help-center-page';
import { resolveHelpRoute } from '@/components/ui/help-sheet/help-routing';

interface CreatorHelpPageProps {
  params: Promise<{ slug?: string[] }>;
}

export default async function CreatorHelpPage( { params }: CreatorHelpPageProps ) {
  const { slug } = await params;
  const route = resolveHelpRoute( 'creator', slug );

  if ( !route ) {
    notFound();
  }

  if ( route.section === 'topic' ) {
    return <HelpCenterPage role="creator" section="topic" topicId={ route.topicId } />;
  }

  return <HelpCenterPage role="creator" section={ route.section } />;
}
