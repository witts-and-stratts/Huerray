'use client';

import { useTranslations } from 'next-intl';
import { FAQs } from '../ui/FAQs';

export function ManagedServicesFAQ() {
  const t = useTranslations( 'managed-services.faqs' );

  const faqs =
    ( t.raw( 'items' ) as Array<{ question: string; answer: string }> ) || [];

  return (
    <section className='creators-faq'>
      <div className='creators-faq__container'>
        <h2 className='gradient-text creators-faq__heading'>{ t( 'title' ) }</h2>
        <FAQs faqs={ faqs } />
      </div>
    </section>
  );
}
