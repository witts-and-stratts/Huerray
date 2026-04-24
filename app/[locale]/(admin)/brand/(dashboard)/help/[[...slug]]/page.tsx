import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { HelpCenterPage } from '@/components/ui/help-sheet/help-center-page';
import { resolveHelpRoute } from '@/components/ui/help-sheet/help-routing';
import { getFaqs } from '@/sanity/lib/faq';
import { getHelpCenterData } from '@/sanity/lib/help';

interface BrandHelpPageProps {
  params: Promise<{ slug?: string[] }>;
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations( 'metadata' );
  return {
    title: t( 'brand.help' ),
  };
}

export default async function BrandHelpPage( { params }: BrandHelpPageProps ) {
  const { slug } = await params;
  const helpData = await getHelpCenterData( 'brand' );
  const route = resolveHelpRoute( 'brand', slug, helpData );

  if ( !route ) {
    notFound();
  }

  const faqs = await getFaqs( 'brand' );

  if ( route.section === 'topic' ) {
    return <HelpCenterPage role="brand" section="topic" topicId={ route.topicId } faqs={ faqs } helpData={ helpData } />;
  }

  return <HelpCenterPage role="brand" section={ route.section } faqs={ faqs } helpData={ helpData } />;
}
