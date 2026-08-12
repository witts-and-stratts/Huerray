'use client';

import { useTranslations } from 'next-intl';
import { PlatformLogos } from '@/components/PlatformLogos';

export function Intro() {
  const t = useTranslations( 'home.intro' );

  return (
    <section className='intro'>
      <h2 className='intro__title'>{ t( 'title' ) }</h2>
      <p className='intro__description'>{ t( 'description' ) }</p>
      <PlatformLogos />
    </section>
  );
}
