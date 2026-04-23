'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import type { HelpRole } from './help-routing';
import { topicActionCopy, topicFaqIndexes, topicLinks } from './help-content';
import type { HelpTopic } from './help-content';

export function TopicDetailView( {
  role,
  topic,
  baseHelpPath,
}: {
  role: HelpRole;
  topic: HelpTopic;
  baseHelpPath: string;
} ) {
  const t = useTranslations( 'dashboard.common' );
  const faqs = t.raw( `helpSheet.faq.${ role }` ) as Array<{ q: string; a: string; }>;
  const relatedFaqs = ( topicFaqIndexes[ topic.id ] ?? [] )
    .map( ( index ) => faqs[ index ] )
    .filter( Boolean );
  const links = topicLinks[ topic.id ] ?? [];
  const actions = topicActionCopy[ topic.id ] ?? [];

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
        <h3 className="header-2">How to use this area</h3>
        <ul className="help-topic__list">
          { actions.map( ( action ) => (
            <li key={ action }>{ action }</li>
          ) ) }
        </ul>
      </div>

      <div className="help-topic__section">
        <h3 className="header-2">Quick Links</h3>
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
        <h3 className="header-2">Related FAQ</h3>
        <Accordion type="single" collapsible className="w-full">
          { relatedFaqs.map( ( item, index ) => (
            <AccordionItem key={ `${ topic.id }-${ index }` } value={ `topic-faq-${ index }` }>
              <AccordionTrigger className="question-header">
                { item.q }
              </AccordionTrigger>
              <AccordionContent className="help-faq__answer">
                { item.a }
              </AccordionContent>
            </AccordionItem>
          ) ) }
        </Accordion>
      </div>
    </div>
  );
}
