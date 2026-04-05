'use client';

import * as React from 'react';
import { keepPreviousData } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Loader2, Search } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/lib/navigation';
import { useCases } from '@/lib/api/hooks/cases';
import { ModelsCaseResponse } from '@/lib/api/generated/models';
import { ScrollArea } from '@/components/dashboard-ui/scroll-area';
import { Sheet, SheetContent } from '@/components/dashboard-ui/sheet';
import { Badge } from '@/components/dashboard-ui/badge';
import { Button } from '@/components/dashboard-ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/dashboard-ui/select';
import { SuperField } from '@/components/dashboard-ui/super-field';
import { Tabs, TabsList, TabsTrigger } from '@/components/dashboard-ui/tabs';
import { CasesSkeleton } from './cases-skeleton';
import { CaseRow } from './case-row';
import { CaseDetail } from './case-detail';
import { HeadphonesIcon } from 'lucide-react';

type StatusFilter = 'all' | 'open' | 'in_progress' | 'resolved' | 'closed';

interface CasesShellProps {
  listHref: string;
  children?: React.ReactNode;
}

function CasesEmptyState() {
  const t = useTranslations( 'dashboard.admin.casesPage' );

  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3 text-muted-foreground select-none">
      <HeadphonesIcon className="size-10 opacity-20" strokeWidth={ 1 } />
      <p className="text-sm">{ t( 'empty' ) }</p>
    </div>
  );
}

export function CasesShell( { listHref, children }: CasesShellProps ) {
  const t = useTranslations( 'dashboard.admin.casesPage' );
  const router = useRouter();
  const params = useParams<{ id?: string; }>();
  const selectedId = params.id ?? null;
  const hasDetailRoute = React.Children.count( children ) > 0;
  const [ isMobile, setIsMobile ] = React.useState( false );

  const [ page, setPage ] = React.useState( 1 );
  const [ perPage, setPerPage ] = React.useState( 20 );
  const [ statusFilter, setStatusFilter ] = React.useState<StatusFilter>( 'all' );
  const [ searchTerm, setSearchTerm ] = React.useState( '' );

  React.useEffect( () => {
    const updateViewport = () => {
      setIsMobile( window.innerWidth < 768 );
    };

    updateViewport();
    window.addEventListener( 'resize', updateViewport );

    return () => window.removeEventListener( 'resize', updateViewport );
  }, [] );

  const { data: response, isLoading, isPlaceholderData } = useCases(
    {
      status: statusFilter !== 'all' ? statusFilter : undefined,
      q: searchTerm.trim() || undefined,
      page,
      limit: perPage,
    },
    { placeholderData: keepPreviousData }
  );

  const cases: ModelsCaseResponse[] = React.useMemo( () => response?.data || [], [ response ] );
  const totalCount = ( response as any )?.pagination?.total || cases.length;
  const totalPages = Math.max( Math.ceil( totalCount / perPage ), 1 );
  const startItem = totalCount === 0 ? 0 : ( page - 1 ) * perPage + 1;
  const endItem = totalCount === 0 ? 0 : Math.min( page * perPage, totalCount );

  const openCount = React.useMemo(
    () => cases.filter( c => c.status === 'open' || c.status === 'in_progress' ).length,
    [ cases ]
  );

  const statusTabs: { value: StatusFilter; label: string; }[] = [
    { value: 'all', label: t( 'tabs.all' ) },
    { value: 'open', label: t( 'tabs.open' ) },
    { value: 'in_progress', label: t( 'tabs.inProgress' ) },
    { value: 'resolved', label: t( 'tabs.resolved' ) },
    { value: 'closed', label: t( 'tabs.closed' ) },
  ];

  if ( isLoading ) {
    return <CasesSkeleton />;
  }

  return (
    <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
      <div className="flex flex-1 overflow-hidden min-h-0">
        { isMobile && (
          <Sheet open={ hasDetailRoute } onOpenChange={ ( open ) => {
            if ( !open ) {
              router.push( listHref );
            }
          } }>
            <SheetContent side="right" className="w-full sm:max-w-full p-0 gap-0" showCloseButton={ false }>
              { hasDetailRoute ? children : <CaseDetail case_={ null } /> }
            </SheetContent>
          </Sheet>
        ) }

        <div className="flex flex-col w-full md:w-80 xl:w-96 shrink-0 border-r border-border/60 overflow-hidden">
          <div className="px-3 pt-3 pb-2 shrink-0">
            <Tabs
              value={ statusFilter }
              onValueChange={ ( v ) => {
                setStatusFilter( v as StatusFilter );
                setPage( 1 );
                router.push( listHref );
              } }
            >
              <TabsList variant="default" className="border w-full">
                { statusTabs.slice( 0, 3 ).map( tab => (
                  <TabsTrigger key={ tab.value } value={ tab.value } className="font-normal gap-1.5 flex-1 text-xs">
                    { tab.label }
                    { tab.value === 'all' && (
                      <Badge variant="outline" className="h-4 px-1 text-[10px]">{ totalCount }</Badge>
                    ) }
                    { tab.value === 'open' && openCount > 0 && (
                      <Badge variant="outline" className="h-4 px-1 text-[10px]">{ openCount }</Badge>
                    ) }
                  </TabsTrigger>
                ) ) }
              </TabsList>
            </Tabs>
          </div>

          <div className="pb-2 shrink-0 px-3">
            <SuperField
              name="search"
              type="search"
              placeholder={ t( 'toolbar.searchPlaceholder' ) }
              prefix={ <Search className="size-4" /> }
              value={ searchTerm }
              onChange={ ( e ) => {
                setSearchTerm( e.target.value );
                setPage( 1 );
                if ( selectedId ) {
                  router.push( listHref );
                }
              } }
            />
          </div>

          <div className="flex-1 relative overflow-hidden">
            { isPlaceholderData && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/60 backdrop-blur-[1px]">
                <Loader2 className="size-5 animate-spin text-muted-foreground" />
              </div>
            ) }
            <ScrollArea className="h-full" scrollbar={ { className: 'w-3 p-1' } }>
              { cases.length === 0 ? (
                <CasesEmptyState />
              ) : (
                <AnimatePresence initial={ false } mode="popLayout">
                  { cases.map( ( case_, index ) => (
                    <motion.div
                      key={ case_.id }
                      layout
                      initial={ { opacity: 0, x: -8 } }
                      animate={ { opacity: 1, x: 0 } }
                      exit={ { opacity: 0, x: -8 } }
                      transition={ { duration: 0.15, ease: 'easeOut', delay: Math.min( index * 0.02, 0.1 ) } }
                    >
                      <CaseRow
                        case_={ case_ }
                        isSelected={ selectedId === case_.id }
                        href={ case_.id ? `${ listHref }/${ case_.id }` : undefined }
                        onClick={ () => {
                          if ( case_.id ) {
                            router.push( `${ listHref }/${ case_.id }` );
                          }
                        } }
                      />
                    </motion.div>
                  ) ) }
                </AnimatePresence>
              ) }
            </ScrollArea>
          </div>

          <div className="flex items-center justify-between gap-2 px-3 py-2 border-t border-border/60 shrink-0 bg-muted/20">
            <span className="text-[10px] sm:text-xs text-muted-foreground whitespace-nowrap">
              { startItem }–{ endItem } / { totalCount }
            </span>
            <div className="flex items-center gap-1 sm:gap-1.5">
              <Select value={ String( perPage ) } onValueChange={ ( v ) => {
                setPerPage( Number( v ) );
                setPage( 1 );
              } }>
                <SelectTrigger className="h-7 w-12 sm:w-16 text-[10px] sm:text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent side="top">
                  { [ 10, 20, 30, 50 ].map( size => (
                    <SelectItem key={ size } value={ String( size ) } className="text-xs">{ size }</SelectItem>
                  ) ) }
                </SelectContent>
              </Select>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="sm" className="h-7 w-7 p-0" disabled={ page <= 1 } onClick={ () => setPage( p => Math.max( p - 1, 1 ) ) }>
                  <ChevronLeft className="size-3.5" />
                </Button>
                <Button variant="outline" size="sm" className="h-7 w-7 p-0" disabled={ page >= totalPages } onClick={ () => setPage( p => Math.min( p + 1, totalPages ) ) }>
                  <ChevronRight className="size-3.5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden md:flex flex-1 overflow-hidden bg-background w-full">
          { hasDetailRoute ? children : <CaseDetail case_={ null } /> }
        </div>
      </div>
    </div>
  );
}
