'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function CreatorsFAQ() {
  const t = useTranslations('creators.faq');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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

        <div className='creators-faq__list'>
          {faqs.map((faq, index) => (
            <div key={index} className='creators-faq__item'>
              <button
                className='creators-faq__question'
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                aria-expanded={openIndex === index}
              >
                <span>{faq.question}</span>
                <span className='creators-faq__icon'>
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className='creators-faq__answer-wrapper'
                  >
                    <div className='creators-faq__answer'>{faq.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
