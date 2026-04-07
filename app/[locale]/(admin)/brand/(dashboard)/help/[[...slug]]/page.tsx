import { notFound } from 'next/navigation';
import { HelpCenterPage } from '@/components/ui/help-sheet/help-center-page';
import { resolveHelpRoute } from '@/components/ui/help-sheet/help-routing';

interface BrandHelpPageProps {
  params: Promise<{ slug?: string[] }>;
}

export default async function BrandHelpPage( { params }: BrandHelpPageProps ) {
  const { slug } = await params;
  const route = resolveHelpRoute( 'brand', slug );

  if ( !route ) {
    notFound();
  }

  if ( route.section === 'topic' ) {
    return <HelpCenterPage role="brand" section="topic" topicId={ route.topicId } />;
  }

  return <HelpCenterPage role="brand" section={ route.section } />;
}
