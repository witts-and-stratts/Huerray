'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { HugeiconsIcon } from '@hugeicons/react';
import { Search01Icon } from '@hugeicons/core-free-icons';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { PortableText } from '@portabletext/react';
import type { HelpRole, SanityFaq } from './help-routing';

export function HelpFaqView( { 
  role,
  sanityFaqs
}: { 
  role: HelpRole;
  sanityFaqs?: SanityFaq[];
} ) {
  const t = useTranslations( 'dashboard.common' );
  const locale = useLocale();
  const [ search, setSearch ] = useState( '' );

  const faqs = ( sanityFaqs || [] ).map( ( f: any ) => ( {
    q: f.question[ locale ] || f.question[ 'en' ] || '',
    a: f.answer[ locale ] || f.answer[ 'en' ] || [],
    isSanity: true
  } ) );

  const filtered = search.trim()
    ? faqs.filter(
      ( f ) =>
        f.q.toLowerCase().includes( search.toLowerCase() ) ||
        (typeof f.a === 'string' 
          ? f.a.toLowerCase().includes( search.toLowerCase() )
          : JSON.stringify(f.a).toLowerCase().includes( search.toLowerCase() ))
    )
    : faqs;

  return (
    <div className="help-faq">
      <div>
        <h2 className="page-title">{ t( 'helpSheet.faqSection.title' ) }</h2>
        <p className="help-faq__description">{ t( 'helpSheet.faqSection.description' ) }</p>
      </div>
      <div className="help-faq__search">
        <HugeiconsIcon
          icon={ Search01Icon }
          className="help-faq__search-icon"
        />
        <input
          type="text"
          value={ search }
          onChange={ ( e ) => setSearch( e.target.value ) }
          placeholder={ t( 'helpSheet.hero.searchPlaceholder' ) }
          className="help-faq__search-input"
        />
      </div>
      { filtered.length === 0 ? (
        <p className="help-faq__empty">No results found.</p>
      ) : (
        <Accordion type="single" collapsible className="w-full">
          { filtered.map( ( item, index ) => (
            <AccordionItem key={ index } value={ `faq-${ index }` }>
              <AccordionTrigger className="question-header">
                { item.q }
              </AccordionTrigger>
              <AccordionContent className="help-faq__answer">
                <div className="portable-text">
                  <PortableText value={ item.a as any } />
                </div>
              </AccordionContent>
            </AccordionItem>
          ) ) }
        </Accordion>
      ) }
      <p className="help-faq__contact">
        { t( 'helpSheet.faqSection.contactText' ) }{ ' ' }
        <a
          href={ `mailto:${ t( 'helpSheet.faqSection.contactEmail' ) }` }
          className="help-faq__contact-link"
        >
          { t( 'helpSheet.faqSection.contactEmail' ) }
        </a>
      </p>
    </div>
  );
}
