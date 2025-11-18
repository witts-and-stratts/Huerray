import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';

interface FAQItemProp {
  question: string;
  answer: string;
}

interface FAQProps {
  faqs: FAQItemProp[];
}

export function FAQs({ faqs }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className='faq__list'>
      {faqs.map((faq, index) => (
        <div key={index} className='faq__item'>
          <button
            className='faq__question'
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            aria-expanded={openIndex === index}
          >
            <span>{faq.question}</span>
            <span
              className={cn('icon icon-chevron-thin-down faq__icon', {
                'rotate-180': openIndex === index,
              })}
            ></span>
          </button>
          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className='faq__answer-wrapper'
              >
                <div className='faq__answer'>{faq.answer}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
