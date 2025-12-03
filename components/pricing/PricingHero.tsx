'use client';

import { useTranslations } from 'next-intl';

export function PricingHero() {
  const t = useTranslations('pricing.hero');

  return (
    <section className='pricing-hero'>
      <h1 className='pricing-hero__title gradient-text'>{t('title')}</h1>
      <p className='pricing-hero__subtitle'>{t('subtitle')}</p>
    </section>
  );
}
