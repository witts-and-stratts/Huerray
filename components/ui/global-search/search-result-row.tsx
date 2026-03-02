'use client';

import { motion } from 'motion/react';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowRight01Icon } from '@hugeicons/core-free-icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/dashboard-ui/avatar';
import { Badge } from '@/components/dashboard-ui/badge';
import { ENTITY_ICONS, getStatusVariant } from './constants';
import { getCountryFlag, getCountryName } from '@/lib/country-flags';
import { formatDate } from '@/lib/utils';
import type { SearchResult } from '@/lib/api/hooks/search';

interface SearchResultRowProps {
  result: SearchResult;
  index: number;
  onSelect: ( result: SearchResult ) => void;
}

export function SearchResultRow( { result, index, onSelect }: SearchResultRowProps ) {
  const hasAvatar =
    ( result.type === 'brands' || result.type === 'creators' ) ||
    ( result.type === 'campaigns' && !!result.avatarUrl );
  const flagName = ( result.type === 'brands' || result.type === 'creators' ) && result.country
    ? getCountryFlag( result.country )
    : null;
  const countryName = ( result.type === 'brands' || result.type === 'creators' ) && result.country
    ? getCountryName( result.country )
    : null;

  return (
    <motion.button
      onClick={ () => onSelect( result ) }
      className="group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-primary/5 focus-visible:bg-primary/5 focus-visible:outline-none group/item hover:cursor-pointer"
      initial={ { opacity: 0 } }
      animate={ { opacity: 1 } }
      transition={ { duration: 0.15, delay: index * 0.02 } }
    >
      { hasAvatar ? (
        <Avatar className="size-8 shrink-0 rounded-md">
          <AvatarImage
            src={ result.avatarUrl }
            alt={ result.title }
            className={ result.type === 'campaigns' ? 'object-contain' : 'object-cover' }
          />
          <AvatarFallback className="rounded-md text-xs">
            { result.title.substring( 0, 2 ).toUpperCase() }
          </AvatarFallback>
        </Avatar>
      ) : (
        <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted">
          <HugeiconsIcon
            icon={ ENTITY_ICONS[ result.type ] }
            className="size-4 text-muted-foreground"
            strokeWidth={ 2 }
          />
        </div>
      ) }

      <div className="min-w-0 flex-1">
        <p className="truncate text-base font-normal text-foreground group-hover/item:text-primary">{ result.title }</p>
        { result.subtitle && (
          <p className="truncate text-sm text-muted-foreground/80 font-regular">{ result.subtitle }</p>
        ) }
      </div>

      <div className="flex shrink-0 items-center gap-2">
        { hasAvatar && result.country && (
          <span className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
            { flagName && (
              <img
                src={ `/images/flags/${ flagName }.svg` }
                alt={ countryName ?? result.country }
                className="h-3.5 w-auto"
              />
            ) }
            { countryName ?? result.country }
          </span>
        ) }
        { result.tags?.map( ( tag ) => (
          <span key={ tag.label } className="text-sm text-muted-foreground">
            { tag.value }
          </span>
        ) ) }
        { result.status && (
          <Badge variant={ getStatusVariant( result.status ) } className="text-[10px]!">
            { result.status.replace( /_/g, ' ' ) }
          </Badge>
        ) }
        { result.createdAt && (
          <span className="hidden text-xs text-muted-foreground sm:block">
            { formatDate( result.createdAt ) }
          </span>
        ) }
        <HugeiconsIcon
          icon={ ArrowRight01Icon }
          className="size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
          strokeWidth={ 2 }
        />
      </div>
    </motion.button>
  );
}
