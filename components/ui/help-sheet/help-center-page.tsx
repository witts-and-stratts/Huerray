'use client';

import { useLocale, useTranslations } from 'next-intl';
import { HugeiconsIcon } from '@hugeicons/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/dashboard-ui/button';
import { SubmitCaseTab } from './submit-case-tab';
import { MyCasesTab } from './my-cases-tab';
import type { HelpRole, HelpSection, HelpTopicId, SanityHelpCenterData } from './help-routing';
import { cn } from '@/lib/dashboard-utils';
import { HelpMainView } from './help-main-view';
import { TopicDetailView } from './topic-detail-view';
import { HelpFaqView } from './help-faq-view';
import { baseHelpPathByRole, getLocalizedValue, navItems, type HelpNavSection } from './help-content';
import '@/app/styles/components/help-center.css';

export function HelpCenterPage( {
  role,
  section = 'home',
  topicId,
  className,
  faqs,
  helpData,
}: {
  role: HelpRole;
  section?: HelpSection;
  topicId?: HelpTopicId;
  className?: string;
  faqs?: any[];
  helpData?: SanityHelpCenterData | null;
} ) {
  const t = useTranslations( 'dashboard.common' );
  const locale = useLocale();
  const router = useRouter();
  const baseHelpPath = baseHelpPathByRole[ role ];
  const activeSection: HelpNavSection =
    section === 'faq' || section === 'tickets' ? section : 'home';

  const sanityTopic = section === 'topic' && topicId
    ? helpData?.topics?.find( ( item ) => item.topicId === topicId )
    : null;
  const topic = section === 'topic' && topicId
    ? sanityTopic && {
      id: topicId,
      title: getLocalizedValue( sanityTopic.title, locale ),
      description: getLocalizedValue( sanityTopic.description, locale ),
    }
    : null;

  const navigateToSection = ( target: HelpNavSection ) =>
    router.push( target === 'home' ? baseHelpPath : `${ baseHelpPath }/${ target }` );

  return (
    <div className={ cn( 'help-center', className ) }>
      <div className="help-center__frame">
        <div className="help-center__layout">
          <div className="help-center__nav">
            { navItems.map( ( item ) => (
              <Button
                key={ item.section }
                variant={ activeSection === item.section ? "secondary" : "ghost" }
                size="sm"
                onClick={ () => navigateToSection( item.section ) }
                className={ cn(
                  "help-center__nav-button",
                  activeSection === item.section && "help-center__nav-button--active"
                ) }
              >
                <HugeiconsIcon icon={ item.icon } className="help-center__nav-icon" />
                <span>{ t( item.labelKey as Parameters<typeof t>[ 0 ] ) }</span>
              </Button>
            ) ) }
          </div>

          <div className="help-center__inset">
            { section === 'topic' && topic && <TopicDetailView topic={ topic } sanityTopic={ sanityTopic } baseHelpPath={ baseHelpPath } /> }
            { section === 'home' && <HelpMainView role={ role } baseHelpPath={ baseHelpPath } sanityFaqs={ faqs } helpData={ helpData } /> }
            { section === 'faq' && <HelpFaqView role={ role } sanityFaqs={ faqs } /> }
            { section === 'submit' && (
              <div className="help-center__panel">
                <h2 className="page-title">{ t( 'helpSheet.submitCta' ) }</h2>
                <p className="help-center__panel-subtitle">{ t( 'helpSheet.hero.subtitle' ) }</p>
                <SubmitCaseTab role={ role } onSuccess={ () => navigateToSection( 'tickets' ) } />
              </div>
            ) }
            { section === 'tickets' && (
              <div>
                <h2 className="page-title">{ t( 'helpSheet.myCasesLink' ) }</h2>
                <p className="help-center__panel-subtitle">{ t( 'helpSheet.faqSection.description' ) }</p>
                <MyCasesTab role={ role } />
              </div>
            ) }
          </div>
        </div>
      </div>
    </div>
  );
}
