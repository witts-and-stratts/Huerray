'use client';

import { useTranslations } from 'next-intl';
import { FAQs } from '../ui/FAQs';
import { generateFAQPageJsonLd } from '@/components/seo/SEO';

export function PricingFAQs() {
  const t = useTranslations('pricing.faqs');

  const faqs =
    (t.raw('items') as Array<{ question: string; answer: string }>) || [];

  return (
    <section className='creators-faq'>
      <div className='creators-faq__container'>
        <h2 className='gradient-text creators-faq__heading'>{t('title')}</h2>

        <FAQs faqs={faqs} />
      </div>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={ { __html: JSON.stringify( generateFAQPageJsonLd( faqs ) ) } }
      />
    </section>
  );
}
