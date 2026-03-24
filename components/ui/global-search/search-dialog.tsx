'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useAuth } from '@/lib/auth/auth-context';
import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect, useCallback, useRef } from 'react';
import {
  ENTITIES_BY_ROLE,
  ENTITY_LABELS,
  useGlobalSearch,
  type EntityType,
  type SearchFilters,
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

function SearchPlaceholderState( { children }: { children: React.ReactNode; } ) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-10 text-center w-full"
      initial={ { opacity: 0, scale: 0.98 } }
      animate={ { opacity: 1, scale: 1 } }
      exit={ { opacity: 0, scale: 0.98, position: 'absolute', top: 0, left: 0, right: 0 } }
      transition={ { duration: 0.2, ease: 'easeInOut' } }
    >
      <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-muted">
        <HugeiconsIcon icon={ SearchIcon } className="size-5 text-muted-foreground" strokeWidth={ 1.5 } />
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

export function SearchDialog( { open, onOpenChange }: SearchDialogProps ) {
  const { user } = useAuth();
  const router = useRouter();
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
  const inputRef = useRef<HTMLInputElement>( null );

  // Debounce
  useEffect( () => {
    const timer = setTimeout( () => setDebouncedQuery( inputValue ), 350 );
    return () => clearTimeout( timer );
  }, [ inputValue ] );

  // Focus / reset on open
  useEffect( () => {
    if ( open ) {
      setTimeout( () => inputRef.current?.focus(), 50 );
    } else {
      setInputValue( '' );
      setDebouncedQuery( '' );
      setFilters( {} );
      setShowAdvanced( false );
    }
  }, [ open ] );

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

  const handleSelect = useCallback(
    ( result: SearchResult ) => {
      router.push( buildUrl( locale, role, result ) );
    },
    [ locale, role, router ],
  );

  const showHint = debouncedQuery.length < 2;
  const showResults = debouncedQuery.length >= 2 && hasResults;
  const showEmpty = debouncedQuery.length >= 2 && !isAnyLoading && !hasResults;
  const showLoading = debouncedQuery.length >= 2 && isAnyLoading && !hasResults;

  return (
    <Dialog open={ open } onOpenChange={ onOpenChange }>
      <DialogHeader className="sr-only">
        <DialogTitle>Global Search</DialogTitle>
        <DialogDescription>Search across your dashboard</DialogDescription>
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
            placeholder="Search campaigns, creators, gigs…"
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
            All
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
              Filters
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
        <ScrollArea className="max-h-[460px]" scrollbar={ {
          style: {
            width: '12px',
            padding: '4px'
          }
        } }>
          <motion.div
            layout="position"
            className="py-2 relative min-h-[100px]"
            transition={ { duration: 0.2, ease: 'easeInOut' } }
          >
            <AnimatePresence>
              { showHint && (
                <SearchPlaceholderState key="hint">
                  <p className="text-sm font-medium text-foreground">Search across your dashboard</p>
                  <p className="mt-1 text-xs text-muted-foreground uppercase tracking-wider text-[10px]">
                    Type at least 2 characters to search
                  </p>
                </SearchPlaceholderState>
              ) }
              { showLoading && (
                <SearchPlaceholderState key="loading">
                  <div className="flex flex-col items-center gap-3">
                    <div className="size-6 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
                    <p className="text-sm text-muted-foreground">Searching...</p>
                  </div>
                </SearchPlaceholderState>
              ) }
              { showEmpty && (
                <SearchPlaceholderState key="empty">
                  <p className="text-sm font-medium text-foreground">
                    No results for "{ debouncedQuery }"
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Try a different search term or adjust your filters
                  </p>
                </SearchPlaceholderState>
              ) }
              { showResults && (
                <motion.div
                  key="results"
                  className={ cn( "space-y-3 transition-opacity duration-200", isAnyLoading && "opacity-50 pointer-events-none" ) }
                  initial={ { opacity: 0, y: 4 } }
                  animate={ { opacity: 1, y: 0 } }
                  exit={ { opacity: 0, y: -4, position: 'absolute', top: 0, left: 0, right: 0 } }
                  transition={ { duration: 0.22, ease: 'easeOut' } }
                >
                  { groups.map( ( group, i ) => (
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
            { showResults && hasResults
              ? `Showing top ${ groups.reduce( ( sum, g ) => sum + g.items.length, 0 ) } results`
              : 'Press Enter to search' }
          </p>
          <div className="flex items-center gap-2">
            <KbdGroup>
              <Kbd className='text-sm font-regular'>↑</Kbd>
              <Kbd className='text-sm font-regular'>↓</Kbd>
            </KbdGroup>
            <span className="text-xs text-muted-foreground">navigate</span>
            <KbdGroup>
              <Kbd className='text-sm font-regular'>↵</Kbd>
            </KbdGroup>
            <span className="text-xs text-muted-foreground">select</span>
            <KbdGroup>
              <Kbd className='text-sm font-regular'>Esc</Kbd>
            </KbdGroup>
            <span className="text-xs text-muted-foreground">close</span>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
