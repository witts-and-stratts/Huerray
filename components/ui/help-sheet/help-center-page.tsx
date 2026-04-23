'use client';

import { useTranslations } from 'next-intl';
import { HugeiconsIcon } from '@hugeicons/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/dashboard-ui/button';
import { SubmitCaseTab } from './submit-case-tab';
import { MyCasesTab } from './my-cases-tab';
import type { HelpRole, HelpSection, HelpTopicId } from './help-routing';
import { cn } from '@/lib/dashboard-utils';
import { HelpMainView } from './help-main-view';
import { TopicDetailView } from './topic-detail-view';
import { HelpFaqView } from './help-faq-view';
import { baseHelpPathByRole, getTopicForRole, navItems, type HelpNavSection } from './help-content';
import '@/app/styles/components/help-center.css';

export function HelpCenterPage( {
  role,
  section = 'home',
  topicId,
  className,
}: {
  role: HelpRole;
  section?: HelpSection;
  topicId?: HelpTopicId;
  className?: string;
} ) {
  const t = useTranslations( 'dashboard.common' );
  const router = useRouter();
  const cards = t.raw( `helpSheet.cards.${ role }` ) as Array<{ title: string; description: string; }>;
  const baseHelpPath = baseHelpPathByRole[ role ];
  const activeSection: HelpNavSection =
    section === 'faq' || section === 'tickets' ? section : 'home';

  const topic = section === 'topic' && topicId
    ? getTopicForRole( role, topicId, cards )
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
            { section === 'topic' && topic && <TopicDetailView role={ role } topic={ topic } baseHelpPath={ baseHelpPath } /> }
            { section === 'home' && <HelpMainView role={ role } baseHelpPath={ baseHelpPath } /> }
            { section === 'faq' && <HelpFaqView role={ role } /> }
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
