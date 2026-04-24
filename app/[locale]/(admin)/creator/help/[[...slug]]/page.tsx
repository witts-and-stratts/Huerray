import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { HelpCenterPage } from '@/components/ui/help-sheet/help-center-page';
import { resolveHelpRoute } from '@/components/ui/help-sheet/help-routing';
import { getFaqs } from '@/sanity/lib/faq';
import { getHelpCenterData } from '@/sanity/lib/help';

interface CreatorHelpPageProps {
  params: Promise<{ slug?: string[] }>;
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations( 'metadata' );
  return {
    title: t( 'creator.help' ),
  };
}

export default async function CreatorHelpPage( { params }: CreatorHelpPageProps ) {
  const { slug } = await params;
  const helpData = await getHelpCenterData( 'creator' );
  const route = resolveHelpRoute( 'creator', slug, helpData );

  if ( !route ) {
    notFound();
  }

  const faqs = await getFaqs( 'creator' );

  if ( route.section === 'topic' ) {
    return <HelpCenterPage role="creator" section="topic" topicId={ route.topicId } faqs={ faqs } helpData={ helpData } />;
  }

  return <HelpCenterPage role="creator" section={ route.section } ticketId={ route.section === 'tickets' ? route.ticketId : undefined } faqs={ faqs } helpData={ helpData } />;
}
