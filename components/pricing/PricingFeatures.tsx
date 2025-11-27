'use client';

import { useTranslations } from 'next-intl';

export function PricingFeatures() {
  const t = useTranslations('pricing.features');

  const cards = (t.raw('items') as Array<{ title: string; text: string }>) || [];

  return (
    <>
      <section className='pricing-features'>
        <h2 className='pricing-features__title gradient-text'>{t('title')}</h2>

        <div className='pricing-features__grid'>
          {cards.map(({ title, text }) => (
            <div className='pricing-features__card' key={title}>
              <h3 className='pricing-features__card-title'>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
