'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/lib/auth/auth-context';
import { useRouter, useParams, usePathname } from 'next/navigation';
import { useState, useEffect, useCallback, useEffectEvent, useRef } from 'react';
import {
  ENTITIES_BY_ROLE,
  useGlobalSearch,
  type EntityType,
  type SearchFilters,
  type SearchGroup,
  type SearchResult,
} from '@/lib/api/hooks/search';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/dashboard-ui/dialog';
import { ScrollArea } from '@/components/dashboard-ui/scroll-area';
import { Kbd, KbdGroup } from '@/components/dashboard-ui/kbd';
import { SuperField } from '@/components/dashboard-ui/super-field';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  SearchIcon,
  FilterHorizontalIcon,
  Tick01Icon,
} from '@hugeicons/core-free-icons';
import { cn } from '@/lib/dashboard-utils';
import { buildUrl } from './constants';
import { EntityChip } from './entity-chip';
import { AdvancedFilters } from './advanced-filters';
import { ResultGroup } from './result-group';

// ─── Empty / Hint state ───────────────────────────────────────────────────────

function SearchPlaceholderState( {
  children,
  isLoading = false,
}: {
  children: React.ReactNode;
  isLoading?: boolean;
} ) {
  return (
    <motion.div
      className="flex min-h-[300px] w-full flex-col items-center justify-center px-6 py-10 text-center"
      initial={ { opacity: 0, y: 4 } }
      animate={ { opacity: 1, y: 0 } }
      exit={ { opacity: 0, y: -4 } }
      transition={ { duration: 0.16, ease: 'easeOut' } }
    >
      <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-muted">
        { isLoading ? (
          <div className="size-5 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
        ) : (
          <HugeiconsIcon icon={ SearchIcon } className="size-5 text-muted-foreground" strokeWidth={ 1.5 } />
        ) }
      </div>
      { children }
    </motion.div>
  );
}

// ─── Search Dialog ────────────────────────────────────────────────────────────

interface SearchDialogProps {
  open: boolean;
  onOpenChange: ( open: boolean ) => void;
}

function areGroupsEqual( a: SearchGroup[], b: SearchGroup[] ) {
  if ( a === b ) return true;
  if ( a.length !== b.length ) return false;

  return a.every( ( group, index ) => {
    const other = b[ index ];

    if ( !other ) return false;
    if ( group.type !== other.type ) return false;
    if ( group.isLoading !== other.isLoading || group.isError !== other.isError ) return false;
    if ( group.items.length !== other.items.length ) return false;

    return group.items.every( ( item, itemIndex ) => {
      const otherItem = other.items[ itemIndex ];

      return (
        otherItem != null
        && item.id === otherItem.id
        && item.type === otherItem.type
        && item.title === otherItem.title
        && item.subtitle === otherItem.subtitle
        && item.status === otherItem.status
        && item.createdAt === otherItem.createdAt
      );
    } );
  } );
}

export function SearchDialog( { open, onOpenChange }: SearchDialogProps ) {
  const t = useTranslations( 'dashboard.common' );
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const locale = ( params?.locale as string ) ?? 'en';
  const role = ( user?.role ?? 'admin' ) as 'admin' | 'brand' | 'creator';
  const availableEntities = ENTITIES_BY_ROLE[ role ] ?? [];

  const [ inputValue, setInputValue ] = useState( '' );
  const [ debouncedQuery, setDebouncedQuery ] = useState( '' );
  const [ selectedEntities, setSelectedEntities ] = useState<Set<EntityType>>(
    new Set( availableEntities ),
  );
  const [ showAdvanced, setShowAdvanced ] = useState( false );
  const [ filters, setFilters ] = useState<SearchFilters>( {} );
  const [ settledGroups, setSettledGroups ] = useState<SearchGroup[]>( [] );
  const inputRef = useRef<HTMLInputElement>( null );
  const previousPathnameRef = useRef( pathname );

  // Debounce
  useEffect( () => {
    const timer = setTimeout( () => setDebouncedQuery( inputValue ), 350 );
    return () => clearTimeout( timer );
  }, [ inputValue ] );

  // Focus on open. Intentionally do NOT reset query/filters/groups on close
  // so reopening the dialog after a navigation shows the previous results.
  const focusSearchInput = useEffectEvent( () => {
    setTimeout( () => inputRef.current?.focus(), 50 );
  } );

  useEffect( () => {
    if ( open ) focusSearchInput();
  }, [ open ] );

  useEffect( () => {
    if ( open && previousPathnameRef.current !== pathname ) {
      onOpenChange( false );
    }
    previousPathnameRef.current = pathname;
  }, [ open, onOpenChange, pathname ] );

  const toggleEntity = useCallback( ( type: EntityType ) => {
    setSelectedEntities( ( prev ) => {
      const next = new Set( prev );
      if ( next.has( type ) ) {
        if ( next.size === 1 ) return prev;
        next.delete( type );
      } else {
        next.add( type );
      }
      return next;
    } );
  }, [] );

  const selectAllEntities = () => setSelectedEntities( new Set( availableEntities ) );
  const allSelected = selectedEntities.size === availableEntities.length;
  const hasActiveFilters = !!( filters.createdAfter || filters.createdBefore || filters.status );

  const { groups, isAnyLoading, hasResults } = useGlobalSearch( {
    role,
    query: debouncedQuery,
    entityTypes: selectedEntities,
    filters,
    enabled: open,
  } );

  useEffect( () => {
    if ( debouncedQuery.length < 2 ) {
      setSettledGroups( ( previousGroups ) => ( previousGroups.length === 0 ? previousGroups : [] ) );
      return;
    }

    if ( !isAnyLoading ) {
      setSettledGroups( ( previousGroups ) => (
        areGroupsEqual( previousGroups, groups ) ? previousGroups : groups
      ) );
    }
  }, [ debouncedQuery, groups, isAnyLoading ] );

  const handleSelect = useCallback(
    ( result: SearchResult ) => {
      onOpenChange( false );
      router.push( buildUrl( locale, role, result ) );
    },
    [ locale, onOpenChange, role, router ],
  );

  const settledHasResults = settledGroups.some( ( group ) => group.items.length > 0 );
  const visibleGroups = isAnyLoading && settledHasResults ? settledGroups : groups;
  const visibleResultCount = visibleGroups.reduce( ( sum, group ) => sum + group.items.length, 0 );
  const showHint = debouncedQuery.length < 2;
  const showResults = debouncedQuery.length >= 2 && visibleResultCount > 0;
  const showEmpty = debouncedQuery.length >= 2 && !isAnyLoading && !hasResults;
  const showLoading = debouncedQuery.length >= 2 && isAnyLoading && !settledHasResults;
  const placeholderState = showHint
    ? 'hint'
    : showLoading
      ? 'loading'
      : showEmpty
        ? 'empty'
        : null;

  return (
    <Dialog open={ open } onOpenChange={ onOpenChange }>
      <DialogHeader className="sr-only">
        <DialogTitle>{ t( 'search.title' ) }</DialogTitle>
        <DialogDescription>{ t( 'search.description' ) }</DialogDescription>
      </DialogHeader>
      <DialogContent className="max-w-[90%] overflow-hidden p-0 rounded-xl! gap-1">

        <motion.div
          className="flex items-center gap-2 border-b border-border px-4 py-3"
          initial={ { opacity: 0, y: -6 } }
          animate={ { opacity: 1, y: 0 } }
          transition={ { duration: 0.2, ease: 'easeOut', delay: 0.05 } }
        >
          <SuperField
            type="search"
            ref={ inputRef }
            value={ inputValue }
            prefix={
              <HugeiconsIcon
                icon={ SearchIcon }
                className="size-4 md:size-5 shrink-0 text-muted-foreground md:ml-2"
                strokeWidth={ 2 }
              />
            }
            onChange={ ( e ) => setInputValue( e.target.value ) }
            placeholder={ t( 'search.placeholder' ) }
            className="max-w-xl self-center"
            fieldClassName="placeholder:text-gray-400 cursor-pointer md:h-12 md:text-base!"
            suffix={
              isAnyLoading ? (
                <div className="size-4 animate-spin rounded-full border-2 border-muted border-t-foreground shrink-0" />
              ) : null
            }
          />
        </motion.div>

        {/* ── Entity Filter Chips ── */ }
        <motion.div
          className="flex items-center gap-2 border-b border-border px-4 py-2.5 overflow-x-auto no-scrollbar"
          initial={ { opacity: 0, y: -4 } }
          animate={ { opacity: 1, y: 0 } }
          transition={ { duration: 0.2, ease: 'easeOut', delay: 0.1 } }
        >
          <button
            onClick={ allSelected ? () => { } : selectAllEntities }
            className={ cn(
              'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium border transition-colors shrink-0',
              allSelected
                ? 'bg-primary text-white border-primary'
                : 'bg-background text-muted-foreground border-input hover:border-primary hover:text-primary',
            ) }
          >
            { allSelected && <HugeiconsIcon icon={ Tick01Icon } className="size-3" strokeWidth={ 2 } /> }
            { t( 'search.all' ) }
          </button>
          <div className="h-4 w-px bg-border shrink-0" />
          { availableEntities.map( ( type ) => (
            <EntityChip
              key={ type }
              type={ type }
              active={ selectedEntities.has( type ) && !allSelected }
              onToggle={ toggleEntity }
            />
          ) ) }
          <div className="ml-auto shrink-0">
            <button
              onClick={ () => setShowAdvanced( ( v ) => !v ) }
              className={ cn(
                'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium border transition-colors',
                showAdvanced || hasActiveFilters
                  ? 'bg-foreground text-background border-foreground'
                  : 'bg-background text-muted-foreground border-input hover:border-foreground hover:text-foreground',
              ) }
            >
              <HugeiconsIcon icon={ FilterHorizontalIcon } className="size-3" strokeWidth={ 2 } />
              { t( 'search.filters' ) }
              { hasActiveFilters && (
                <span className="flex size-4 items-center justify-center rounded-full bg-background text-foreground text-[9px] font-bold">
                  { [ filters.createdAfter, filters.createdBefore, filters.status ].filter( Boolean ).length }
                </span>
              ) }
            </button>
          </div>
        </motion.div>

        {/* ── Advanced Filters (animated) ── */ }
        <AnimatePresence>
          { showAdvanced && (
            <AdvancedFilters
              filters={ filters }
              onChange={ setFilters }
              entityTypes={ selectedEntities }
            />
          ) }
        </AnimatePresence>

        {/* ── Results ── */ }
        <ScrollArea className="h-[460px]" scrollbar={ {
          style: {
            width: '12px',
            padding: '4px'
          }
        } }>
          <motion.div
            className="relative min-h-full py-2"
            transition={ { duration: 0.18, ease: 'easeOut' } }
          >
            <AnimatePresence mode="wait" initial={ false }>
              { placeholderState && (
                <SearchPlaceholderState key="placeholder" isLoading={ placeholderState === 'loading' }>
                  <AnimatePresence mode="wait" initial={ false }>
                    { placeholderState === 'hint' && (
                      <motion.div
                        key="hint-copy"
                        initial={ { opacity: 0, y: 3 } }
                        animate={ { opacity: 1, y: 0 } }
                        exit={ { opacity: 0, y: -3 } }
                        transition={ { duration: 0.14, ease: 'easeOut' } }
                      >
                        <p className="text-sm font-medium text-foreground">{ t( 'search.description' ) }</p>
                        <p className="mt-1 text-xs text-muted-foreground uppercase tracking-wider text-[10px]">
                          { t( 'search.typeToSearch' ) }
                        </p>
                      </motion.div>
                    ) }
                    { placeholderState === 'loading' && (
                      <motion.p
                        key="loading-copy"
                        className="text-sm text-muted-foreground"
                        initial={ { opacity: 0, y: 3 } }
                        animate={ { opacity: 1, y: 0 } }
                        exit={ { opacity: 0, y: -3 } }
                        transition={ { duration: 0.14, ease: 'easeOut' } }
                      >
                        { t( 'search.searching' ) }
                      </motion.p>
                    ) }
                    { placeholderState === 'empty' && (
                      <motion.div
                        key="empty-copy"
                        initial={ { opacity: 0, y: 3 } }
                        animate={ { opacity: 1, y: 0 } }
                        exit={ { opacity: 0, y: -3 } }
                        transition={ { duration: 0.14, ease: 'easeOut' } }
                      >
                        <p className="text-sm font-medium text-foreground">
                          { t( 'search.noResultsFor', { query: debouncedQuery } ) }
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          { t( 'search.noResultsDesc' ) }
                        </p>
                      </motion.div>
                    ) }
                  </AnimatePresence>
                </SearchPlaceholderState>
              ) }
              { showResults && (
                <motion.div
                  key="results"
                  className={ cn( "space-y-3 transition-opacity duration-200", isAnyLoading && "opacity-50 pointer-events-none" ) }
                  initial={ { opacity: 0, y: 6 } }
                  animate={ { opacity: 1, y: 0 } }
                  exit={ { opacity: 0, y: -6 } }
                  transition={ { duration: 0.18, ease: 'easeOut' } }
                >
                  { visibleGroups.map( ( group, i ) => (
                    <ResultGroup key={ group.type } group={ group } groupIndex={ i } onSelect={ handleSelect } />
                  ) ) }
                </motion.div>
              ) }
            </AnimatePresence>
          </motion.div>
        </ScrollArea>

        {/* ── Footer ── */ }
        <motion.div
          className="flex items-center justify-between border-t border-border px-4 py-2 bg-muted/50"
          initial={ { opacity: 0, y: 4 } }
          animate={ { opacity: 1, y: 0 } }
          transition={ { duration: 0.2, ease: 'easeOut', delay: 0.15 } }
        >
          <p className="text-sm text-muted-foreground font-regular">
            { showResults && visibleResultCount > 0
              ? t( 'search.showingTop', { count: visibleResultCount } )
              : t( 'search.pressEnter' ) }
          </p>
          <div className="flex items-center gap-2">
            <KbdGroup>
              <Kbd className='text-sm font-regular'>↑</Kbd>
              <Kbd className='text-sm font-regular'>↓</Kbd>
            </KbdGroup>
            <span className="text-xs text-muted-foreground">{ t( 'search.navigate' ) }</span>
            <KbdGroup>
              <Kbd className='text-sm font-regular'>↵</Kbd>
            </KbdGroup>
            <span className="text-xs text-muted-foreground">{ t( 'search.select' ) }</span>
            <KbdGroup>
              <Kbd className='text-sm font-regular'>Esc</Kbd>
            </KbdGroup>
            <span className="text-xs text-muted-foreground">{ t( 'search.close' ) }</span>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
