'use client';

import { useTranslations } from 'next-intl';
import { FAQs } from '../ui/FAQs';

export function BrandsFAQ() {
  const t = useTranslations('brands.faq');

  const faqs = [
    { question: t('q1.question'), answer: t('q1.answer') },
    { question: t('q2.question'), answer: t('q2.answer') },
    { question: t('q3.question'), answer: t('q3.answer') },
    { question: t('q4.question'), answer: t('q4.answer') },
    { question: t('q5.question'), answer: t('q5.answer') },
    { question: t('q6.question'), answer: t('q6.answer') },
    { question: t('q7.question'), answer: t('q7.answer') },
    { question: t('q8.question'), answer: t('q8.answer') },
    { question: t('q9.question'), answer: t('q9.answer') },
    { question: t('q10.question'), answer: t('q10.answer') },
    { question: t('q11.question'), answer: t('q11.answer') },
  ];

  return (
    <section className='creators-faq'>
      <div className='creators-faq__container'>
        <h2 className='gradient-text creators-faq__heading'>{t('heading')}</h2>

        <FAQs faqs={faqs} />
      </div>
    </section>
  );
}
