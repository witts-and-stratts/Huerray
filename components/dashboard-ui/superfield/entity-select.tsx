'use client';

import React from 'react';
import { Check } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/dashboard-ui/avatar';
import { cn } from '@/lib/dashboard-utils';
import { SearchableSelect } from './searchable-select';
import { BaseFieldProps, SelectOption } from './types';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface EntityMeta {
  /** URL for the avatar image */
  avatarUrl?: string;
  /** Primary display name */
  name?: string;
  /** Optional secondary line shown below the name in the dropdown */
  subtitle?: string;
}

export interface EntitySelectProps {
  id?: string;
  name?: string;
  value?: string;
  onValueChange?: ( value: string | null ) => void;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  /** Resolve display metadata for an option value */
  getEntityMeta?: ( value: string ) => EntityMeta | undefined;
  /** Override initials derivation (defaults to first letter of each word, max 2) */
  getInitials?: ( name: string | undefined ) => string;
  /** Extra classes applied to each Avatar */
  avatarClassName?: string;
}

export interface EntitySelectFieldProps
  extends BaseFieldProps,
  Omit<EntitySelectProps, keyof BaseFieldProps> {
  type: 'entity-select';
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function defaultGetInitials( name?: string ): string {
  if ( !name ) return '?';
  return name.split( ' ' ).map( w => w[ 0 ] ).join( '' ).toUpperCase().slice( 0, 2 );
}

// ── Component ─────────────────────────────────────────────────────────────────

export const EntitySelect = ( {
  id,
  value,
  onValueChange,
  options,
  placeholder,
  disabled,
  required,
  className,
  getEntityMeta,
  getInitials = defaultGetInitials,
  avatarClassName,
}: EntitySelectProps ) => {

  const resolveMeta = ( optValue: string ): EntityMeta =>
    getEntityMeta?.( optValue ) ?? {};

  const renderTrigger = ( selected: SelectOption | undefined ) => {
    if ( !selected || typeof selected !== 'object' || !( 'value' in selected ) ) {
      return <span className="text-muted-foreground">{ placeholder }</span>;
    }
    const meta = resolveMeta( selected.value );
    const name = meta.name ?? ( typeof selected.label === 'string' ? selected.label : selected.value );
    return (
      <div className="flex items-center gap-2 min-w-0">
        <Avatar className={ cn( 'size-7 shrink-0', avatarClassName ) }>
          { meta.avatarUrl && <AvatarImage src={ meta.avatarUrl } alt={ name } /> }
          <AvatarFallback className="text-[9px]">{ getInitials( name ) }</AvatarFallback>
        </Avatar>
        <span className="min-w-0">
          <span className="block truncate font-normal">{ name }</span>
          {/* { meta.subtitle && (
            <span className="block text-xs text-muted-foreground truncate leading-tight">{ meta.subtitle }</span>
          ) } */}
        </span>
      </div>
    );
  };

  const renderOption = ( option: SelectOption, isSelected: boolean ) => {
    if ( typeof option !== 'object' || !( 'value' in option ) ) {
      return <span className="px-2 py-1.5">{ String( option ) }</span>;
    }
    const meta = resolveMeta( option.value );
    const name = meta.name ?? ( typeof option.label === 'string' ? option.label : option.value );
    return (
      <div className={ cn(
        'flex items-center gap-2.5 w-full px-2 py-2 transition-colors rounded-lg group/option',
        isSelected
          ? 'bg-primary/10 ring-1 ring-inset ring-primary/30'
          : 'hover:bg-primary/8 hover:ring-1 hover:ring-inset hover:ring-primary/20'
      ) }>
        <Avatar className={ cn( 'size-7 shrink-0', avatarClassName ) }>
          { meta.avatarUrl && <AvatarImage src={ meta.avatarUrl } alt={ name } /> }
          <AvatarFallback className="text-[10px]">{ getInitials( name ) }</AvatarFallback>
        </Avatar>
        <span className="flex-1 min-w-0">
          <span className="block text-sm truncate font-normal">{ name }</span>
          { meta.subtitle && (
            <span className="block text-xs text-muted-foreground truncate">{ meta.subtitle }</span>
          ) }
        </span>
        <span className={ cn(
          'opacity-0 size-5 rounded-full bg-white border border-primary/30 shadow-sm shrink-0 flex items-center justify-center group-hover/option:bg-primary group-hover/option:opacity-100 transition-all duration-100',
          isSelected && 'opacity-100 bg-white'
        ) }>
          <Check className="size-3 text-primary group-hover/option:text-white!" />
        </span>
      </div>
    );
  };

  return (
    <SearchableSelect
      id={ id }
      value={ value }
      onValueChange={ onValueChange }
      options={ options }
      placeholder={ placeholder }
      disabled={ disabled }
      required={ required }
      className={ className }
      renderTrigger={ renderTrigger }
      renderOption={ renderOption }
    />
  );
};
