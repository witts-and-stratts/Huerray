'use client';

import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { HugeiconsIcon } from '@hugeicons/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CustomerSupportIcon, Search01Icon } from '@hugeicons/core-free-icons';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { PortableText } from '@portabletext/react';
import { AnimatePresence, motion } from 'motion/react';
import { Button } from '@/components/dashboard-ui/button';
import { SuperField } from '@/components/dashboard-ui/super-field';
import type { HelpRole, SanityFaq, SanityHelpCenterData, SanityHelpTopic } from './help-routing';
import { cardIcons, getLocalizedValue, iconMap } from './help-content';

interface HelpCard {
  title: string;
  description: string;
  iconName?: string;
}

type SearchResult =
  | {
    id: string;
    type: 'topic';
    title: string;
    description: string;
    href: string;
  }
  | {
    id: string;
    type: 'faq';
    title: string;
    description: string;
    href: string;
  };

function portableTextToText( value: unknown ): string {
  if ( !value ) return '';
  if ( typeof value === 'string' ) return value;
  if ( Array.isArray( value ) ) return value.map( portableTextToText ).filter( Boolean ).join( ' ' );
  if ( typeof value === 'object' ) {
    const item = value as { text?: unknown; children?: unknown; [key: string]: unknown };
    if ( typeof item.text === 'string' ) return item.text;
    if ( item.children ) return portableTextToText( item.children );
  }

  return '';
}

function matchesQuery( query: string, values: string[] ) {
  const normalizedQuery = query.toLowerCase();
  return values.some( ( value ) => value.toLowerCase().includes( normalizedQuery ) );
}

function buildTopicSearchValues( topic: SanityHelpTopic, locale: string ) {
  return [
    getLocalizedValue( topic.title, locale ),
    getLocalizedValue( topic.description, locale ),
    ...( topic.actionItems ?? [] ).map( ( item ) => getLocalizedValue( item.text, locale ) ),
    ...( topic.quickLinks ?? [] ).flatMap( ( link ) => [
      getLocalizedValue( link.label, locale ),
      link.href ?? '',
    ] ),
    ...( topic.relatedFaqs ?? [] ).flatMap( ( faq ) => [
      getLocalizedValue( faq.question, locale ),
      portableTextToText( faq.answer?.[ locale ] || faq.answer?.en ),
    ] ),
  ].filter( Boolean );
}

export function HelpMainView( {
  role,
  baseHelpPath,
  sanityFaqs,
  helpData,
}: {
  role: HelpRole;
  baseHelpPath: string;
  sanityFaqs?: SanityFaq[];
  helpData?: SanityHelpCenterData | null;
} ) {
  const t = useTranslations( 'dashboard.common' );
  const locale = useLocale();
  const router = useRouter();
  const [ search, setSearch ] = useState( '' );
  const [ debouncedSearch, setDebouncedSearch ] = useState( '' );

  useEffect( () => {
    const timeout = window.setTimeout( () => {
      setDebouncedSearch( search );
    }, 220 );

    return () => window.clearTimeout( timeout );
  }, [ search ] );

  const topics = helpData?.topics ?? [];
  const cards: HelpCard[] = topics.map((topic) => ({
    title: getLocalizedValue( topic.title, locale ),
    description: getLocalizedValue( topic.description, locale ),
    iconName: topic.icon,
  }));
  
  const heroTitle = getLocalizedValue( helpData?.heroTitle, locale, t( 'helpSheet.hero.title' ) );
  const heroSubtitle = getLocalizedValue( helpData?.heroSubtitle, locale, t( 'helpSheet.hero.subtitle' ) );
  
  const faqs = ( sanityFaqs || [] ).map( ( f: SanityFaq ) => ( {
    id: f._id,
    q: getLocalizedValue( f.question, locale ),
    a: f.answer?.[ locale ] || f.answer?.en || [],
    isSanity: true
  } ) );

  const icons = cardIcons[ role ];
  const searchQuery = debouncedSearch.trim();
  const searchResults: SearchResult[] = searchQuery
    ? [
      ...topics
        .filter( ( topic ) => matchesQuery( searchQuery, buildTopicSearchValues( topic, locale ) ) )
        .map( ( topic ) => ( {
          id: topic._id || topic.topicId,
          type: 'topic' as const,
          title: getLocalizedValue( topic.title, locale ),
          description: getLocalizedValue( topic.description, locale ),
          href: topic.slug ? `${ baseHelpPath }/${ topic.slug }` : baseHelpPath,
        } ) ),
      ...faqs
        .filter( ( faq ) => matchesQuery( searchQuery, [
          faq.q,
          portableTextToText( faq.a ),
        ] ) )
        .map( ( faq ) => ( {
          id: faq.id,
          type: 'faq' as const,
          title: faq.q,
          description: portableTextToText( faq.a ),
          href: `${ baseHelpPath }/faq`,
        } ) ),
    ]
    : [];
  const resultListVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.045,
      },
    },
  };
  const resultItemVariants = {
    hidden: { opacity: 0, y: 8, scale: 0.985 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <div className="help-main">
      <div className="help-main__hero">
        <h2 className="page-title">
          { heroTitle }
        </h2>
        <p className="help-main__hero-subtitle">
          { heroSubtitle }
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
            onClick={ () => setDebouncedSearch( search ) }
          >
            { t( 'helpSheet.hero.searchButton' ) }
          </Button>
        </div>
        <AnimatePresence>
          { searchQuery && (
            <motion.div
              key="help-search-results"
              className="help-main__results"
              initial={ { opacity: 0, y: -6, height: 0 } }
              animate={ { opacity: 1, y: 0, height: 'auto' } }
              exit={ { opacity: 0, y: -6, height: 0 } }
              transition={ { duration: 0.2, ease: 'easeOut' } }
            >
              <div className="help-main__faq-header">
                <h3 className="header-2">{ t( 'helpSheet.searchResults.title' ) }</h3>
                <p className="help-main__faq-description">
                  { t( 'helpSheet.searchResults.description' ) }
                </p>
              </div>
              { searchResults.length === 0 ? (
                <motion.p
                  key="empty"
                  className="help-faq__empty"
                  initial={ { opacity: 0, y: 6 } }
                  animate={ { opacity: 1, y: 0 } }
                  transition={ { duration: 0.16 } }
                >
                  { t( 'helpSheet.searchResults.empty' ) }
                </motion.p>
              ) : (
                <motion.div
                  className="help-main__result-list"
                  variants={ resultListVariants }
                  initial="hidden"
                  animate="visible"
                >
                  <AnimatePresence initial={ false }>
                    { searchResults.map( ( result ) => (
                      <motion.div
                        key={ `${ result.type }-${ result.id }` }
                        variants={ resultItemVariants }
                        initial="hidden"
                        animate="visible"
                        exit={ { opacity: 0, y: -4, scale: 0.99 } }
                        transition={ { duration: 0.16, ease: 'easeOut' } }
                        layout
                      >
                        <Link
                          href={ result.href }
                          className="help-main__result"
                        >
                          <span className="help-main__result-type">
                            { result.type === 'topic'
                              ? t( 'helpSheet.searchResults.topicType' )
                              : t( 'helpSheet.searchResults.faqType' ) }
                          </span>
                          <span className="help-main__result-title">{ result.title }</span>
                          { result.description && (
                            <span className="help-main__result-description">
                              { result.description }
                            </span>
                          ) }
                        </Link>
                      </motion.div>
                    ) ) }
                  </AnimatePresence>
                </motion.div>
              ) }
            </motion.div>
          ) }
        </AnimatePresence>
      </div>

      <div className="help-main__cards">
        { cards.map( ( card, i ) => {
          const sanityTopic = topics[ i ];
          const topicHref = sanityTopic?.slug ? `${ baseHelpPath }/${ sanityTopic.slug }` : baseHelpPath;

          return (
            <div key={ i } className="help-main__card">
              <div className="help-main__card-icon-wrap">
                <HugeiconsIcon 
                  icon={ card.iconName && iconMap[card.iconName] ? iconMap[card.iconName] : icons[ i ] } 
                  className="help-main__card-icon" 
                />
              </div>
              <div className="help-main__card-body">
                <p className="help-main__card-title">{ card.title }</p>
                <p className="help-main__card-description">{ card.description }</p>
              </div>
              <Link
                href={ topicHref }
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

      { !searchQuery && (
        <div className="help-main__faq">
          <div className="help-main__faq-header">
            <h3 className="header-2">{ t( 'helpSheet.faqSection.title' ) }</h3>
            <p className="help-main__faq-description">{ t( 'helpSheet.faqSection.description' ) }</p>
          </div>
          { faqs.length === 0 ? (
            <p className="help-faq__empty">{ t( 'helpSheet.searchResults.empty' ) }</p>
          ) : (
            <Accordion type="single" collapsible className="w-full">
              { faqs.map( ( item, index ) => (
                <AccordionItem key={ index } value={ `main-faq-${ index }` }>
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
        </div>
      ) }
    </div>
  );
}
