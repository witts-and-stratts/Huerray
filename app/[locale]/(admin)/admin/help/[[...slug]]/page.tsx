import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { HelpCenterPage } from '@/components/ui/help-sheet/help-center-page';
import { resolveHelpRoute } from '@/components/ui/help-sheet/help-routing';
import { getFaqs } from '@/sanity/lib/faq';
import { getHelpCenterData } from '@/sanity/lib/help';

interface AdminHelpPageProps {
  params: Promise<{ slug?: string[]; }>;
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations( 'metadata' );
  return {
    title: t( 'admin.help' ),
  };
}

export default async function AdminHelpPage( { params }: AdminHelpPageProps ) {
  const { slug } = await params;
  const route = resolveHelpRoute( 'admin', slug );

  if ( !route ) {
    notFound();
  }

  const [ faqs, helpData ] = await Promise.all( [
    getFaqs( 'admin' ),
    getHelpCenterData( 'admin' )
  ] );

  if ( route.section === 'topic' ) {
    return <div className='py-5'><HelpCenterPage role="admin" section="topic" topicId={ route.topicId } faqs={ faqs } helpData={ helpData } /></div>;
  }

  return <div className='py-5'><HelpCenterPage role="admin" section={ route.section } faqs={ faqs } helpData={ helpData } /></div>;
}
