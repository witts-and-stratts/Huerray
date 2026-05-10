import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { FAQs } from '@/components/ui/FAQs';
import type { Locale } from '@/i18n';
import { getTranslations } from 'next-intl/server';
import generateSEO from '@/components/seo/SEO';

type Props = {
  params: Promise<{ locale: Locale; }>;
};

export async function generateMetadata( { params }: Props ) {
  const { locale } = await params;
  return generateSEO( locale, 'brands-faq', { pathname: '/brands-faq' } );
}

// Type for FAQ section data from translations
interface FAQSection {
  section: string;
  faqs: { question: string; answer: string; }[];
}

export default async function BrandsFAQ( { params }: Props ) {
  const { locale } = await params;
  const t = await getTranslations( { locale, namespace: 'brands-faq' } );
  const sections = t.raw( 'sections' ) as FAQSection[];

  return (
    <>
      <Header />
      <main className='relative z-30 bg-white overflow-y-hidden'>
        <div className="padded-container md:pb-10 border-b border-b-gray-200 text-center bg-orange-50/50 py-30 rounded-tl-4xl rounded-tr-4xl">
          <h1 className="text-h2 gradient-text">
            { t( 'title' ) }
          </h1>
          <h2 className="text-h5 mt-8 text-slate-800 mb-4 md:mb-12">{ t( 'subtitle' ) }</h2>
          <div className='max-w-200 mx-auto mt-8 px-4'>
            {
              sections.map( ( section, index ) => (
                <div key={ index } className='py-10'>
                  <h3 className='text-h4 text-dark-burgundy mb-4'>{ section.section }</h3>
                  <FAQs faqs={ section.faqs } />
                </div>
              ) )
            }
          </div>
        </div>
      </main>
      <Footer className='footer-normal' />
    </>
  );
}
