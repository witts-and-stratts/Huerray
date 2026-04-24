'use client';

import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { PortableText } from '@portabletext/react';
import type { SanityHelpTopic } from './help-routing';
import { getLocalizedValue } from './help-content';
import type { HelpTopic } from './help-content';

export function TopicDetailView( {
  topic,
  sanityTopic,
  baseHelpPath,
}: {
  topic: HelpTopic;
  sanityTopic?: SanityHelpTopic | null;
  baseHelpPath: string;
} ) {
  const t = useTranslations( 'dashboard.common' );
  const locale = useLocale();
  const relatedFaqs = sanityTopic?.relatedFaqs?.length
    ? sanityTopic.relatedFaqs.map( ( faq ) => ({
      q: getLocalizedValue( faq.question, locale ),
      a: faq.answer?.[ locale ] || faq.answer?.en || [],
    }))
    : [];
  const links = sanityTopic?.quickLinks?.length
    ? sanityTopic.quickLinks
      .map( ( link ) => ( {
        label: getLocalizedValue( link.label, locale ),
        href: link.href || '#',
      } ) )
      .filter( ( link ) => link.label && link.href )
    : [];
  const actions = sanityTopic?.actionItems?.length
    ? sanityTopic.actionItems.map( ( item ) => getLocalizedValue( item.text, locale ) ).filter( Boolean )
    : [];

  return (
    <div className="help-topic">
      <div>
        <Link
          href={ baseHelpPath }
          className="help-topic__back"
        >
          { t( 'helpSheet.backToHelp' ) }
        </Link>
        <h2 className="page-title">{ topic.title }</h2>
        <p className="help-topic__description">{ topic.description }</p>
      </div>

      <div className="help-topic__section">
        <h3 className="header-2">{ t( 'helpSheet.topicDetail.howToUseTitle' ) }</h3>
        <ul className="help-topic__list">
          { actions.map( ( action ) => (
            <li key={ action }>{ action }</li>
          ) ) }
        </ul>
      </div>

      <div className="help-topic__section">
        <h3 className="header-2">{ t( 'helpSheet.topicDetail.quickLinksTitle' ) }</h3>
        <div className="help-topic__links">
          { links.map( ( link ) => (
            <Link
              key={ link.href + link.label }
              href={ link.href }
              className="help-topic__link"
            >
              { link.label }
            </Link>
          ) ) }
        </div>
      </div>

      <div className="help-topic__section">
        <h3 className="header-2">{ t( 'helpSheet.topicDetail.relatedFaqTitle' ) }</h3>
        <Accordion type="single" collapsible className="w-full">
          { relatedFaqs.map( ( item, index ) => (
            <AccordionItem key={ `${ topic.id }-${ index }` } value={ `topic-faq-${ index }` }>
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
      </div>
    </div>
  );
}
