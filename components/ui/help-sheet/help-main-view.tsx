'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { HugeiconsIcon } from '@hugeicons/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CustomerSupportIcon, Search01Icon } from '@hugeicons/core-free-icons';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/dashboard-ui/button';
import { SuperField } from '@/components/dashboard-ui/super-field';
import { TOPIC_IDS_BY_ROLE } from './help-routing';
import type { HelpRole } from './help-routing';
import { cardIcons, getTopicHref } from './help-content';

export function HelpMainView( {
  role,
  baseHelpPath,
}: {
  role: HelpRole;
  baseHelpPath: string;
} ) {
  const t = useTranslations( 'dashboard.common' );
  const router = useRouter();
  const [ search, setSearch ] = useState( '' );

  const cards = t.raw( `helpSheet.cards.${ role }` ) as Array<{ title: string; description: string; }>;
  const faqs = t.raw( `helpSheet.faq.${ role }` ) as Array<{ q: string; a: string; }>;
  const icons = cardIcons[ role ];
  const filteredFaqs = search.trim()
    ? faqs.filter(
      ( f ) =>
        f.q.toLowerCase().includes( search.toLowerCase() ) ||
        f.a.toLowerCase().includes( search.toLowerCase() )
    )
    : faqs;

  return (
    <div className="help-main">
      <div className="help-main__hero">
        <h2 className="page-title">
          { t( 'helpSheet.hero.title' ) }
        </h2>
        <p className="help-main__hero-subtitle">
          { t( 'helpSheet.hero.subtitle' ) }
        </p>
        <div className="help-main__search">
          <SuperField
            type="search"
            value={ search }
            onValueChange={ setSearch }
            placeholder={ t( 'helpSheet.hero.searchPlaceholder' ) }
            prefix={ <HugeiconsIcon icon={ Search01Icon } className="help-main__search-button-icon" /> }
            className="help-main__search-field"
          />
          <Button
            className="help-main__search-button"
            onClick={ () => router.push( `${ baseHelpPath }/faq` ) }
          >
            { t( 'search.title' ).split( ' ' )[ 1 ] }
          </Button>
        </div>
      </div>

      <div className="help-main__cards">
        { cards.map( ( card, i ) => {
          const topicId = TOPIC_IDS_BY_ROLE[ role ][ i ] ?? TOPIC_IDS_BY_ROLE[ role ][ 0 ];
          return (
            <div key={ i } className="help-main__card">
              <div className="help-main__card-icon-wrap">
                <HugeiconsIcon icon={ icons[ i ] } className="help-main__card-icon" />
              </div>
              <div className="help-main__card-body">
                <p className="help-main__card-title">{ card.title }</p>
                <p className="help-main__card-description">{ card.description }</p>
              </div>
              <Link
                href={ getTopicHref( role, topicId ) }
                className="help-main__card-link"
              >
                { t( 'helpSheet.learnMore' ) }
              </Link>
            </div>
          );
        } ) }
      </div>

      <div className="help-main__cta-row">
        <Button
          variant="outline"
          size="sm"
          className="help-main__cta-button"
          onClick={ () => router.push( `${ baseHelpPath }/submit` ) }
        >
          <HugeiconsIcon icon={ CustomerSupportIcon } className="help-main__search-button-icon" />
          { t( 'helpSheet.submitCta' ) }
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="help-main__cta-button--ghost"
          onClick={ () => router.push( `${ baseHelpPath }/tickets` ) }
        >
          { t( 'helpSheet.myCasesLink' ) }
        </Button>
      </div>

      <div className="help-main__faq">
        <div className="help-main__faq-header">
          <h3 className="header-2">{ t( 'helpSheet.faqSection.title' ) }</h3>
          <p className="help-main__faq-description">{ t( 'helpSheet.faqSection.description' ) }</p>
        </div>
        { filteredFaqs.length === 0 ? (
          <p className="help-faq__empty">No results found.</p>
        ) : (
          <Accordion type="single" collapsible className="w-full">
            { filteredFaqs.map( ( item, index ) => (
              <AccordionItem key={ index } value={ `main-faq-${ index }` }>
                <AccordionTrigger className="question-header">
                  { item.q }
                </AccordionTrigger>
                <AccordionContent className="help-faq__answer">
                  { item.a }
                </AccordionContent>
              </AccordionItem>
            ) ) }
          </Accordion>
        ) }
      </div>
    </div>
  );
}
