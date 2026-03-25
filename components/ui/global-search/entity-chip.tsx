'use client';

import { useTranslations } from 'next-intl';
import { type EntityType } from '@/lib/api/hooks/search';
import { cn } from '@/lib/dashboard-utils';

interface EntityChipProps {
  type: EntityType;
  active: boolean;
  onToggle: ( type: EntityType ) => void;
}

export function EntityChip( { type, active, onToggle }: EntityChipProps ) {
  const t = useTranslations( 'dashboard.common' );

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
      { t( `searchEntities.${ type }` ) }
    </button>
  );
}
