'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/lib/auth/auth-context';
import { HugeiconsIcon } from '@hugeicons/react';
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
import { Dialog as DialogPrimitive } from '@base-ui/react/dialog';
import {
  Dialog,
  DialogOverlay,
  DialogPortal,
} from '@/components/dashboard-ui/dialog';
import { Button } from '@/components/dashboard-ui/button';
import { Cancel01Icon } from '@hugeicons/core-free-icons';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { SubmitCaseTab } from './submit-case-tab';
import { MyCasesTab } from './my-cases-tab';
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

type Role = 'admin' | 'brand' | 'creator';
type View = 'main' | 'faq' | 'submit' | 'cases';

type HugeIcon = Parameters<typeof HugeiconsIcon>[0]['icon'];

const cardIcons: Record<Role, HugeIcon[]> = {
  brand: [ ChartLineData01Icon, UserGroupIcon, WalletDone01Icon ],
  creator: [ Task02Icon, ImageUpload01Icon, WalletDone01Icon ],
  admin: [ UserMultiple02Icon, CustomerSupportIcon, Settings01Icon ],
};

function HelpMainView( {
  role,
  onViewChange,
}: {
  role: Role;
  onViewChange: ( view: View ) => void;
} ) {
  const t = useTranslations( 'dashboard.common' );
  const [ search, setSearch ] = useState( '' );

  const cards = t.raw( `helpSheet.cards.${ role }` ) as Array<{ title: string; description: string }>;
  const icons = cardIcons[ role ];

  return (
    <div className="flex flex-col gap-8">
      { /* Hero */ }
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
            onClick={ () => onViewChange( 'faq' ) }
          >
            <HugeiconsIcon icon={ Search01Icon } className="size-4" />
            { t( 'search.title' ).split( ' ' )[ 0 ] }
          </Button>
        </div>
      </div>

      { /* Category cards */ }
      <div className="grid grid-cols-3 gap-3">
        { cards.map( ( card, i ) => (
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
            <button
              className="text-xs font-medium underline underline-offset-2 text-left text-foreground hover:text-primary transition-colors w-fit"
              onClick={ () => onViewChange( 'faq' ) }
            >
              { t( 'helpSheet.learnMore' ) }
            </button>
          </div>
        ) ) }
      </div>

      { /* Quick actions */ }
      <div className="flex gap-3 border-t border-border pt-6">
        <Button variant="outline" size="sm" className="gap-2" onClick={ () => onViewChange( 'submit' ) }>
          <HugeiconsIcon icon={ CustomerSupportIcon } className="size-4" />
          { t( 'helpSheet.submitCta' ) }
        </Button>
        <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground" onClick={ () => onViewChange( 'cases' ) }>
          { t( 'helpSheet.myCasesLink' ) }
        </Button>
      </div>
    </div>
  );
}

function FaqView( { role }: { role: Role } ) {
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

const navItems: Array<{ view: View; labelKey: string; icon: HugeIcon }> = [
  { view: 'main', labelKey: 'helpSheet.nav.home', icon: Home01Icon },
  { view: 'faq', labelKey: 'helpSheet.nav.faq', icon: QuestionIcon },
  { view: 'cases', labelKey: 'helpSheet.nav.tickets', icon: CustomerSupportIcon },
];

export function HelpSheet() {
  const t = useTranslations( 'dashboard.common' );
  const { user } = useAuth();
  const role = ( user?.role ?? 'brand' ) as Role;

  const [ open, setOpen ] = useState( false );
  const [ view, setView ] = useState<View>( 'main' );

  useEffect( () => {
    const handler = () => setOpen( true );
    document.addEventListener( 'open-help-sheet', handler );
    return () => document.removeEventListener( 'open-help-sheet', handler );
  }, [] );

  const handleOpenChange = ( next: boolean ) => {
    setOpen( next );
    if ( !next ) setView( 'main' );
  };

  return (
    <Dialog open={ open } onOpenChange={ handleOpenChange }>
      <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Popup
          className={ cn(
            'bg-background ring-foreground/10 ring-1 rounded-xl shadow-lg',
            'fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 outline-none',
            'w-[90vw] max-w-[800px] h-[90vh] max-h-[600px] flex flex-col overflow-hidden',
            'data-open:animate-in data-closed:animate-out',
            'data-closed:fade-out-0 data-open:fade-in-0',
            'data-closed:zoom-out-95 data-open:zoom-in-95',
            'duration-100'
          ) }
        >
          { /* Close button */ }
          <div className="absolute top-3 right-3 z-10">
            <DialogPrimitive.Close
              render={
                <Button
                  variant="ghost"
                  size="icon-sm"
                />
              }
            >
              <HugeiconsIcon icon={ Cancel01Icon } strokeWidth={ 2 } />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          </div>

          { /* Sidebar layout */ }
          <SidebarProvider
            defaultOpen={ true }
            style={ { '--sidebar-width': '180px' } as React.CSSProperties }
            className="flex flex-row flex-1 min-h-0 overflow-hidden rounded-xl"
          >
            <Sidebar
              collapsible="none"
              className="border-r border-border bg-muted/30 shrink-0 flex flex-col"
            >
              <SidebarContent className="pt-10 px-2">
                <SidebarMenu>
                  { navItems.map( ( item ) => (
                    <SidebarMenuItem key={ item.view }>
                      <SidebarMenuButton
                        isActive={ view === item.view }
                        onClick={ () => setView( item.view ) }
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

            <SidebarInset className="flex-1 overflow-y-auto p-6 min-h-0">
              { view === 'main' && (
                <HelpMainView role={ role } onViewChange={ setView } />
              ) }
              { view === 'faq' && (
                <FaqView role={ role } />
              ) }
              { view === 'submit' && (
                <div className="max-w-md">
                  <h2 className="text-lg font-semibold mb-1">{ t( 'helpSheet.submitCta' ) }</h2>
                  <p className="text-sm text-muted-foreground mb-5">{ t( 'helpSheet.hero.subtitle' ) }</p>
                  <SubmitCaseTab onSuccess={ () => setView( 'cases' ) } />
                </div>
              ) }
              { view === 'cases' && (
                <div>
                  <h2 className="text-lg font-semibold mb-1">{ t( 'helpSheet.myCasesLink' ) }</h2>
                  <p className="text-sm text-muted-foreground mb-5">{ t( 'helpSheet.faqSection.description' ) }</p>
                  <MyCasesTab role={ role } />
                </div>
              ) }
            </SidebarInset>
          </SidebarProvider>
        </DialogPrimitive.Popup>
      </DialogPortal>
    </Dialog>
  );
}
