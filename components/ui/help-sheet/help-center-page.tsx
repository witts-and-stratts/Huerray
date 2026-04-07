'use client';

import { useState, type CSSProperties } from 'react';
import { useTranslations } from 'next-intl';
import { HugeiconsIcon } from '@hugeicons/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ChartLineData01Icon,
  UserGroupIcon,
  WalletDone01Icon,
  Task02Icon,
  ImageUpload01Icon,
  UserMultiple02Icon,
  CustomerSupportIcon,
  Settings01Icon,
  Search01Icon,
  Home01Icon,
  QuestionIcon,
} from '@hugeicons/core-free-icons';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/dashboard-ui/button';
import { SubmitCaseTab } from './submit-case-tab';
import { MyCasesTab } from './my-cases-tab';
import { TOPIC_IDS_BY_ROLE, TOPIC_SLUG_BY_ID } from './help-routing';
import type { HelpRole, HelpSection, HelpTopicId } from './help-routing';
import { cn } from '@/lib/dashboard-utils';
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from '@/components/ui/sidebar';

type HelpTopic = {
  id: HelpTopicId;
  title: string;
  description: string;
};

type HugeIcon = Parameters<typeof HugeiconsIcon>[0]['icon'];

const baseHelpPathByRole: Record<HelpRole, string> = {
  admin: '/admin/help',
  brand: '/brand/help',
  creator: '/creator/help',
};

const cardIcons: Record<HelpRole, HugeIcon[]> = {
  brand: [ ChartLineData01Icon, UserGroupIcon, WalletDone01Icon ],
  creator: [ Task02Icon, ImageUpload01Icon, WalletDone01Icon ],
  admin: [ UserMultiple02Icon, CustomerSupportIcon, Settings01Icon ],
};

const topicFaqIndexes: Record<HelpTopicId, number[]> = {
  'admin-users': [ 0, 1 ],
  'admin-cases': [ 2 ],
  'admin-platform': [ 3, 4 ],
  'brand-start': [ 0, 4 ],
  'brand-creators': [ 1, 3 ],
  'brand-billing': [ 2 ],
  'creator-start': [ 0, 4 ],
  'creator-submit': [ 2, 3 ],
  'creator-earnings': [ 1 ],
};

const topicLinks: Record<HelpTopicId, Array<{ label: string; href: string }>> = {
  'admin-users': [
    { label: 'Users', href: '/admin/users' },
    { label: 'Creators', href: '/admin/creators' },
    { label: 'Brands', href: '/admin/brands' },
  ],
  'admin-cases': [
    { label: 'Support Cases', href: '/admin/cases' },
    { label: 'Campaign Cases', href: '/admin/cases' },
    { label: 'Open Tickets', href: '/admin/cases' },
  ],
  'admin-platform': [
    { label: 'Admin Settings', href: '/admin/settings' },
    { label: 'Notifications', href: '/admin/notifications' },
    { label: 'Newsletter', href: '/admin/newsletter' },
  ],
  'brand-start': [
    { label: 'Campaigns', href: '/brand/campaigns' },
    { label: 'New Campaign', href: '/brand/campaigns/new' },
    { label: 'Dashboard', href: '/brand' },
  ],
  'brand-creators': [
    { label: 'Creators', href: '/brand/creators' },
    { label: 'Campaigns', href: '/brand/campaigns' },
    { label: 'Cases', href: '/brand/cases' },
  ],
  'brand-billing': [
    { label: 'Invoices', href: '/brand/invoices' },
    { label: 'Billing Settings', href: '/brand/settings/billing' },
    { label: 'Cases', href: '/brand/cases' },
  ],
  'creator-start': [
    { label: 'Invitations', href: '/creator/invitations' },
    { label: 'Gigs', href: '/creator/gigs' },
    { label: 'Dashboard', href: '/creator' },
  ],
  'creator-submit': [
    { label: 'Active Gigs', href: '/creator/gigs?tab=active' },
    { label: 'My Gigs', href: '/creator/gigs?tab=my-gigs' },
    { label: 'Cases', href: '/creator/cases' },
  ],
  'creator-earnings': [
    { label: 'Earnings', href: '/creator/earnings' },
    { label: 'Bank Settings', href: '/creator/settings/bank' },
    { label: 'Security', href: '/creator/settings/security' },
  ],
};

const topicActionCopy: Record<HelpTopicId, string[]> = {
  'admin-users': [
    'Review user verification status and account completeness.',
    'Use the profile views to update status, notes, or approvals.',
    'Escalate edge cases via support tickets when data is incomplete.',
  ],
  'admin-cases': [
    'Open new cases and triage by priority and status.',
    'Assign cases to the right admin owner.',
    'Track replies and close only after confirmed resolution.',
  ],
  'admin-platform': [
    'Configure account-level and platform-level preferences.',
    'Use notifications for targeted operational announcements.',
    'Keep operational messaging aligned across newsletters and notifications.',
  ],
  'brand-start': [
    'Create a campaign and define goals, budget, and requirements.',
    'Invite relevant creators or review incoming applications.',
    'Track submissions and approvals directly from campaign views.',
  ],
  'brand-creators': [
    'Filter creators by fit before inviting to campaigns.',
    'Review submissions against brief requirements.',
    'Use case threads for revisions and issue resolution.',
  ],
  'brand-billing': [
    'Review invoice status and payment history regularly.',
    'Keep billing details updated in settings.',
    'Contact support through cases for invoice disputes.',
  ],
  'creator-start': [
    'Review invitations and accept relevant gigs quickly.',
    'Check requirements before applying to avoid rework.',
    'Keep profile and portfolio details current for better matching.',
  ],
  'creator-submit': [
    'Follow brief requirements exactly before uploading content.',
    'Submit through the active gig workflow for tracking.',
    'Use case messages for clarification when feedback is unclear.',
  ],
  'creator-earnings': [
    'Monitor payout status from your earnings page.',
    'Ensure bank details are complete and accurate.',
    'Use support cases for delayed payout investigations.',
  ],
};

function getTopicForRole( role: HelpRole, topicId: HelpTopicId, cards: Array<{ title: string; description: string }> ): HelpTopic {
  const topicIndex = TOPIC_IDS_BY_ROLE[ role ].indexOf( topicId );
  const fallback = cards[ 0 ] ?? { title: '', description: '' };
  const card = cards[ topicIndex ] ?? fallback;

  return {
    id: topicId,
    title: card.title,
    description: card.description,
  };
}

function getTopicHref( role: HelpRole, topicId: HelpTopicId ) {
  return `${ baseHelpPathByRole[ role ] }/${ TOPIC_SLUG_BY_ID[ topicId ] }`;
}

function HelpMainView( {
  role,
  baseHelpPath,
}: {
  role: HelpRole;
  baseHelpPath: string;
} ) {
  const t = useTranslations( 'dashboard.common' );
  const router = useRouter();
  const [ search, setSearch ] = useState( '' );

  const cards = t.raw( `helpSheet.cards.${ role }` ) as Array<{ title: string; description: string }>;
  const faqs = t.raw( `helpSheet.faq.${ role }` ) as Array<{ q: string; a: string }>;
  const icons = cardIcons[ role ];
  const filteredFaqs = search.trim()
    ? faqs.filter(
      ( f ) =>
        f.q.toLowerCase().includes( search.toLowerCase() ) ||
        f.a.toLowerCase().includes( search.toLowerCase() )
    )
    : faqs;

  return (
    <div className="flex flex-col gap-8">
      <div className="text-center pt-2">
        <h2 className="text-2xl font-semibold tracking-tight mb-2">
          { t( 'helpSheet.hero.title' ) }
        </h2>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed mb-5">
          { t( 'helpSheet.hero.subtitle' ) }
        </p>
        <div className="flex gap-2 max-w-sm mx-auto">
          <div className="relative flex-1">
            <HugeiconsIcon
              icon={ Search01Icon }
              className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none"
            />
            <input
              type="text"
              value={ search }
              onChange={ ( e ) => setSearch( e.target.value ) }
              placeholder={ t( 'helpSheet.hero.searchPlaceholder' ) }
              className="w-full rounded-lg border border-border bg-background pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <Button
            size="sm"
            className="shrink-0 gap-1.5 px-4"
            onClick={ () => router.push( `${ baseHelpPath }/faq` ) }
          >
            <HugeiconsIcon icon={ Search01Icon } className="size-4" />
            { t( 'search.title' ).split( ' ' )[ 0 ] }
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        { cards.map( ( card, i ) => {
          const topicId = TOPIC_IDS_BY_ROLE[ role ][ i ] ?? TOPIC_IDS_BY_ROLE[ role ][ 0 ];
          return (
            <div
              key={ i }
              className="border border-border rounded-xl p-4 flex flex-col gap-3 hover:border-primary/40 hover:bg-primary/[0.02] transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <HugeiconsIcon icon={ icons[ i ] } className="size-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold mb-1">{ card.title }</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{ card.description }</p>
              </div>
              <Link
                href={ getTopicHref( role, topicId ) }
                className="text-xs font-medium underline underline-offset-2 text-left text-foreground hover:text-primary transition-colors w-fit"
              >
                { t( 'helpSheet.learnMore' ) }
              </Link>
            </div>
          );
        } ) }
      </div>

      <div className="flex gap-3 border-t border-border pt-6">
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={ () => router.push( `${ baseHelpPath }/submit` ) }
        >
          <HugeiconsIcon icon={ CustomerSupportIcon } className="size-4" />
          { t( 'helpSheet.submitCta' ) }
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 text-muted-foreground"
          onClick={ () => router.push( `${ baseHelpPath }/tickets` ) }
        >
          { t( 'helpSheet.myCasesLink' ) }
        </Button>
      </div>

      <div className="border-t border-border pt-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-1">{ t( 'helpSheet.faqSection.title' ) }</h3>
          <p className="text-sm text-muted-foreground">{ t( 'helpSheet.faqSection.description' ) }</p>
        </div>
        { filteredFaqs.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">No results found.</p>
        ) : (
          <Accordion type="single" collapsible className="w-full">
            { filteredFaqs.map( ( item, index ) => (
              <AccordionItem key={ index } value={ `main-faq-${ index }` }>
                <AccordionTrigger className="text-sm font-medium text-left py-3.5">
                  { item.q }
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
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

function TopicDetailView( {
  role,
  topic,
  baseHelpPath,
}: {
  role: HelpRole;
  topic: HelpTopic;
  baseHelpPath: string;
} ) {
  const t = useTranslations( 'dashboard.common' );
  const faqs = t.raw( `helpSheet.faq.${ role }` ) as Array<{ q: string; a: string }>;
  const relatedFaqs = ( topicFaqIndexes[ topic.id ] ?? [] )
    .map( ( index ) => faqs[ index ] )
    .filter( Boolean );
  const links = topicLinks[ topic.id ] ?? [];
  const actions = topicActionCopy[ topic.id ] ?? [];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link
          href={ baseHelpPath }
          className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-2 mb-2 inline-block"
        >
          { t( 'helpSheet.backToHelp' ) }
        </Link>
        <h2 className="text-2xl font-semibold tracking-tight">{ topic.title }</h2>
        <p className="text-sm text-muted-foreground mt-2 max-w-2xl">{ topic.description }</p>
      </div>

      <div className="rounded-lg border border-border p-4">
        <h3 className="text-sm font-semibold mb-3">How to use this area</h3>
        <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
          { actions.map( ( action ) => (
            <li key={ action }>{ action }</li>
          ) ) }
        </ul>
      </div>

      <div className="rounded-lg border border-border p-4">
        <h3 className="text-sm font-semibold mb-3">Quick Links</h3>
        <div className="flex flex-wrap gap-2">
          { links.map( ( link ) => (
            <Link
              key={ link.href + link.label }
              href={ link.href }
              className="text-xs px-3 py-1.5 rounded-full border border-border hover:border-primary/40 hover:bg-primary/[0.04] transition-colors"
            >
              { link.label }
            </Link>
          ) ) }
        </div>
      </div>

      <div className="rounded-lg border border-border p-4">
        <h3 className="text-sm font-semibold mb-3">Related FAQ</h3>
        <Accordion type="single" collapsible className="w-full">
          { relatedFaqs.map( ( item, index ) => (
            <AccordionItem key={ `${ topic.id }-${ index }` } value={ `topic-faq-${ index }` }>
              <AccordionTrigger className="text-sm font-medium text-left py-3.5">
                { item.q }
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                { item.a }
              </AccordionContent>
            </AccordionItem>
          ) ) }
        </Accordion>
      </div>
    </div>
  );
}

function FaqView( { role }: { role: HelpRole } ) {
  const t = useTranslations( 'dashboard.common' );
  const [ search, setSearch ] = useState( '' );
  const faqs = t.raw( `helpSheet.faq.${ role }` ) as Array<{ q: string; a: string }>;

  const filtered = search.trim()
    ? faqs.filter(
      ( f ) =>
        f.q.toLowerCase().includes( search.toLowerCase() ) ||
        f.a.toLowerCase().includes( search.toLowerCase() )
    )
    : faqs;

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="text-lg font-semibold mb-1">{ t( 'helpSheet.faqSection.title' ) }</h2>
        <p className="text-sm text-muted-foreground">{ t( 'helpSheet.faqSection.description' ) }</p>
      </div>
      <div className="relative">
        <HugeiconsIcon
          icon={ Search01Icon }
          className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none"
        />
        <input
          type="text"
          value={ search }
          onChange={ ( e ) => setSearch( e.target.value ) }
          placeholder={ t( 'helpSheet.hero.searchPlaceholder' ) }
          className="w-full rounded-lg border border-border bg-background pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>
      { filtered.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-8">No results found.</p>
      ) : (
        <Accordion type="single" collapsible className="w-full">
          { filtered.map( ( item, index ) => (
            <AccordionItem key={ index } value={ `faq-${ index }` }>
              <AccordionTrigger className="text-sm font-medium text-left py-3.5">
                { item.q }
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                { item.a }
              </AccordionContent>
            </AccordionItem>
          ) ) }
        </Accordion>
      ) }
      <p className="text-xs text-muted-foreground border-t border-border pt-4">
        { t( 'helpSheet.faqSection.contactText' ) }{ ' ' }
        <a
          href={ `mailto:${ t( 'helpSheet.faqSection.contactEmail' ) }` }
          className="text-primary underline underline-offset-2"
        >
          { t( 'helpSheet.faqSection.contactEmail' ) }
        </a>
      </p>
    </div>
  );
}

const navItems: Array<{ section: 'home' | 'faq' | 'tickets'; labelKey: string; icon: HugeIcon }> = [
  { section: 'home', labelKey: 'helpSheet.nav.home', icon: Home01Icon },
  { section: 'faq', labelKey: 'helpSheet.nav.faq', icon: QuestionIcon },
  { section: 'tickets', labelKey: 'helpSheet.nav.tickets', icon: CustomerSupportIcon },
];

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
  const cards = t.raw( `helpSheet.cards.${ role }` ) as Array<{ title: string; description: string }>;
  const baseHelpPath = baseHelpPathByRole[ role ];
  const activeSection: 'home' | 'faq' | 'tickets' =
    section === 'faq' || section === 'tickets' ? section : 'home';

  const topic = section === 'topic' && topicId
    ? getTopicForRole( role, topicId, cards )
    : null;

  return (
    <div className={ cn( 'p-4 md:p-6 h-full min-h-0', className ) }>
      <div className="bg-background ring-foreground/10 ring-1 rounded-xl shadow-sm h-full min-h-[560px] overflow-hidden">
        <SidebarProvider
          defaultOpen={ true }
          style={ { '--sidebar-width': '180px' } as CSSProperties }
          className="flex flex-row h-full min-h-0 overflow-hidden rounded-xl"
        >
          <Sidebar
            collapsible="none"
            className="border-r border-border bg-muted/30 shrink-0 flex flex-col"
          >
            <SidebarContent className="pt-6 md:pt-10 px-2">
              <SidebarMenu>
                { navItems.map( ( item ) => (
                  <SidebarMenuItem key={ item.section }>
                    <SidebarMenuButton
                      isActive={ activeSection === item.section }
                      onClick={ () => router.push( item.section === 'home' ? baseHelpPath : `${ baseHelpPath }/${ item.section }` ) }
                      className="gap-2.5"
                    >
                      <HugeiconsIcon icon={ item.icon } className="size-4 shrink-0" />
                      <span>{ t( item.labelKey as Parameters<typeof t>[ 0 ] ) }</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ) ) }
              </SidebarMenu>
            </SidebarContent>
          </Sidebar>

          <SidebarInset className="flex-1 overflow-y-auto p-5 md:p-6 min-h-0">
            { section === 'topic' && topic && <TopicDetailView role={ role } topic={ topic } baseHelpPath={ baseHelpPath } /> }
            { section === 'home' && <HelpMainView role={ role } baseHelpPath={ baseHelpPath } /> }
            { section === 'faq' && <FaqView role={ role } /> }
            { section === 'submit' && (
              <div className="max-w-md">
                <h2 className="text-lg font-semibold mb-1">{ t( 'helpSheet.submitCta' ) }</h2>
                <p className="text-sm text-muted-foreground mb-5">{ t( 'helpSheet.hero.subtitle' ) }</p>
                <SubmitCaseTab onSuccess={ () => {} } />
              </div>
            ) }
            { section === 'tickets' && (
              <div>
                <h2 className="text-lg font-semibold mb-1">{ t( 'helpSheet.myCasesLink' ) }</h2>
                <p className="text-sm text-muted-foreground mb-5">{ t( 'helpSheet.faqSection.description' ) }</p>
                <MyCasesTab role={ role } />
              </div>
            ) }
          </SidebarInset>
        </SidebarProvider>
      </div>
    </div>
  );
}
