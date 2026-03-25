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
  return generateSEO( locale, 'terms-and-conditions' );
}

export default async function TermsAndConditions( { params }: Props ) {
  const { locale } = await params;
  const t = await getTranslations( { locale, namespace: 'terms-and-conditions' } );

  // The sections are already in the translation file
  // We just need to get them and pass them through
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rawSections = t.raw( 'sections' );
  const sections = Array.isArray( rawSections ) ? rawSections : Object.values( rawSections as any );

  return (
    <>
      <Header />
      <main className='relative z-30 bg-white  mb-40 overflow-y-hidden -mt-40'>
        <div className="padded-container pb-6 md:pb-10 border-b border-b-gray-200 text-center bg-orange-50/50 -mt-40 pt-100">
          <h1 className="text-h2 gradient-text">
            { t( 'page.title' ) }
          </h1>
          <Typography className="text-sm mt-8">
            <strong>{ t( 'effectiveDateTitle' ) }</strong>: { t( 'effectiveDate' ) }
            <br />
          </Typography>
        </div>
        <div className="padded-container grid md:grid-cols-12 md:mb-20 gap-8 p-2 md:p-10">
          <div className="sidebar md:col-span-5 lg:col-span-4 relative">
            <LegalPageSidebarWrapper
              title={ t( 'tableOfContents' ) }
              sections={ sections }
            />
          </div>
          <div className="content md:col-span-7 lg:col-span-8">
            <LegalPageContentWrapper sections={ sections } />
          </div>
        </div>
      </main>
      <Footer className='footer-normal' />
    </>
  );
}
