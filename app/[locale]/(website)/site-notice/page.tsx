import { getTranslations } from 'next-intl/server';
import { Typography } from '@/components/ui/typography';
import LegalPageSidebarWrapper from '@/components/LegalPageSidebarWrapper';
import LegalPageContentWrapper from '@/components/LegalPageContentWrapper';
import generateSEO from '@/components/seo/SEO';
import type { Locale } from '@/i18n';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';

type Props = {
  params: Promise<{ locale: Locale; }>;
};

export async function generateMetadata( { params }: Props ) {
  const { locale } = await params;
  return generateSEO( locale, 'site-notice' );
}

export default async function SiteNotice( { params }: Props ) {
  const { locale } = await params;
  const t = await getTranslations( { locale, namespace: 'site-notice' } );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sections = t.raw( 'sections' ) as any[];

  return (
    <>
      <Header />
      <main className="relative z-30 bg-white mb-40 overflow-y-hidden -mt-40">
        <div className="padded-container pb-6 md:pb-10 border-b border-b-gray-200 text-center bg-orange-50/50 -mt-40 pt-100">
          <h1 className="text-h2 gradient-text">{ t( 'page.title' ) }</h1>
        </div>
        <div className="padded-container px-10 text-center mt-10">
          <LegalPageContentWrapper sections={ sections } />
        </div>
      </main>
      <Footer className="footer-normal" />
    </>
  );
}
