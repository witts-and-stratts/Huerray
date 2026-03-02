'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import { ENTITY_ICONS } from './constants';
import { ENTITY_LABELS, type EntityType } from '@/lib/api/hooks/search';
import { cn } from '@/lib/dashboard-utils';

interface EntityChipProps {
  type: EntityType;
  active: boolean;
  onToggle: ( type: EntityType ) => void;
}

export function EntityChip( { type, active, onToggle }: EntityChipProps ) {
  return (
    <button
      onClick={ () => onToggle( type ) }
      className={ cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-normal border transition-colors shrink-0',
        active
          ? 'bg-primary/10 text-primary border-primary/10'
          : 'bg-background text-muted-foreground border-input hover:border-primary/20 hover:text-primary',
      ) }
    >
      {/* <HugeiconsIcon icon={ ENTITY_ICONS[ type ] } className="size-3" strokeWidth={ 2 } /> */ }
      { ENTITY_LABELS[ type ] }
    </button>
  );
}
