'use client';

import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import { useState } from 'react';

interface FAQItemProp {
  question: string;
  answer: string;
}

interface FAQProps {
  faqs: FAQItemProp[];
}

export function FAQs( { faqs }: FAQProps ) {
  const [ openIndex, setOpenIndex ] = useState<number | null>( null );

  return (
    <div className='faq__list'>
      { faqs.map( ( faq, index ) => {
        const isOpen = openIndex === index;

        return (
          <div key={ index } className='faq__item'>
            <button
              className='faq__question'
              onClick={ () => setOpenIndex( isOpen ? null : index ) }
              aria-expanded={ isOpen }
            >
              <span>{ faq.question }</span>
              <span
                className={ cn( 'icon icon-chevron-thin-down faq__icon', {
                  'rotate-180': isOpen,
                } ) }
              ></span>
            </button>
            {/* Always mounted (not conditionally rendered) so answer text is
                present in the initial HTML for crawlers/AI systems that don't
                execute click interactions — only the visual height collapses. */}
            <motion.div
              initial={ false }
              animate={ { height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 } }
              transition={ { duration: 0.3 } }
              className='faq__answer-wrapper text-left'
            >
              <div className='faq__answer'>{ faq.answer }</div>
            </motion.div>
          </div>
        );
      } ) }
    </div>
  );
}
