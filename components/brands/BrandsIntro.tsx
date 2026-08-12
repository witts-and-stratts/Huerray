'use client';

import { useTranslations } from 'next-intl';

export function BrandsIntro() {
  const t = useTranslations( 'brands.intro' );

  return (
    <section className='creators-intro'>
      <p className='creators-intro__eyebrow'>{ t( 'eyebrow' ) }</p>
      <h2 className='gradient-text creators-intro__title'>{ t( 'title' ) }</h2>
    </section>
  );
}
