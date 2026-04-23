import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { HelpCenterPage } from '@/components/ui/help-sheet/help-center-page';
import { resolveHelpRoute } from '@/components/ui/help-sheet/help-routing';
import { getFaqs } from '@/sanity/lib/faq';
import { getHelpCenterData } from '@/sanity/lib/help';

interface CreatorHelpPageProps {
  params: Promise<{ slug?: string[] }>;
}

export const metadata: Metadata = {
  title: 'Help Center',
};

export default async function CreatorHelpPage( { params }: CreatorHelpPageProps ) {
  const { slug } = await params;
  const route = resolveHelpRoute( 'creator', slug );

  if ( !route ) {
    notFound();
  }

  const [faqs, helpData] = await Promise.all([
    getFaqs( 'creator' ),
    getHelpCenterData( 'creator' )
  ]);

  if ( route.section === 'topic' ) {
    return <HelpCenterPage role="creator" section="topic" topicId={ route.topicId } faqs={ faqs } helpData={ helpData } />;
  }

  return <HelpCenterPage role="creator" section={ route.section } faqs={ faqs } helpData={ helpData } />;
}
