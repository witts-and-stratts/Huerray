import Link from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import generateSEO from '@/components/seo/SEO';

export async function generateMetadata() {
  const locale = await getLocale();
  const t = await getTranslations( { locale, namespace: 'metadata.website' } );

  return generateSEO( locale, 'metadata.website', {
    title: t( 'notFoundTitle' ),
    description: t( 'notFoundBody' ),
    noIndex: true,
  } );
}

export default async function NotFound() {
  const t = await getTranslations( 'metadata.website' );

  return (
    <>
      <Header />
      <main className='body-content'>
        <section className='px-4 lg:px-10 py-32 md:py-40 text-center'>
          <p className='text-h1 font-heading gradient-text mb-4'>404</p>
          <h1 className='text-h3 font-heading mb-4'>{ t( 'notFoundHeading' ) }</h1>
          <p className='text-h6 text-slate-700 max-w-[520px] mx-auto mb-10'>
            { t( 'notFoundBody' ) }
          </p>
          <div className='flex flex-wrap justify-center items-center gap-4'>
            <Link href='/' title={ t( 'notFoundHomeLink' ) }>
              <Button variant='gradient'>{ t( 'notFoundHomeLink' ) }</Button>
            </Link>
            <Link href='/brands' title={ t( 'notFoundBrandsLink' ) }>
              <Button variant='outlineBrand'>{ t( 'notFoundBrandsLink' ) }</Button>
            </Link>
            <Link href='/creators' title={ t( 'notFoundCreatorsLink' ) }>
              <Button variant='outlineBrand'>{ t( 'notFoundCreatorsLink' ) }</Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
