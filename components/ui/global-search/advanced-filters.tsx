'use client';

import { motion } from 'motion/react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Calendar04Icon, Cancel01Icon } from '@hugeicons/core-free-icons';
import { Input } from '@/components/dashboard-ui/input';
import { Button } from '@/components/dashboard-ui/button';
import { STATUS_OPTIONS } from './constants';
import type { EntityType, SearchFilters } from '@/lib/api/hooks/search';

interface AdvancedFiltersProps {
  filters: SearchFilters;
  onChange: ( filters: SearchFilters ) => void;
  entityTypes: Set<EntityType>;
}

export function AdvancedFilters( { filters, onChange, entityTypes }: AdvancedFiltersProps ) {
  const statusOptions = Array.from( entityTypes ).flatMap( ( t ) => STATUS_OPTIONS[ t ] ?? [] );
  const uniqueStatuses = Array.from(
    new Map( statusOptions.map( ( s ) => [ s.value, s ] ) ).values(),
  );

  return (
    <motion.div
      initial={ { height: 0, opacity: 0 } }
      animate={ { height: 'auto', opacity: 1 } }
      exit={ { height: 0, opacity: 0 } }
      transition={ { duration: 0.22, ease: 'easeOut' } }
      className="overflow-hidden"
    >
      <div className="border-t border-border bg-muted/30 px-4 py-3">
        <div className="flex flex-wrap items-end gap-3">
          {/* Date after */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
              After
            </label>
            <div className="relative">
              <HugeiconsIcon
                icon={ Calendar04Icon }
                className="absolute left-2 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground pointer-events-none"
                strokeWidth={ 2 }
              />
              <Input
                type="date"
                value={ filters.createdAfter ?? '' }
                onChange={ ( e ) =>
                  onChange( { ...filters, createdAfter: e.target.value || undefined } )
                }
                className="h-8 w-36 pl-7 text-xs"
              />
            </div>
          </div>

          {/* Date before */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
              Before
            </label>
            <div className="relative">
              <HugeiconsIcon
                icon={ Calendar04Icon }
                className="absolute left-2 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground pointer-events-none"
                strokeWidth={ 2 }
              />
              <Input
                type="date"
                value={ filters.createdBefore ?? '' }
                onChange={ ( e ) =>
                  onChange( { ...filters, createdBefore: e.target.value || undefined } )
                }
                className="h-8 w-36 pl-7 text-xs"
              />
            </div>
          </div>

          {/* Status */}
          { uniqueStatuses.length > 0 && (
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
                Status
              </label>
              <select
                value={ filters.status ?? '' }
                onChange={ ( e ) =>
                  onChange( { ...filters, status: e.target.value || undefined } )
                }
                className="h-8 rounded-md border border-input bg-background px-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              >
                <option value="">Any status</option>
                { uniqueStatuses.map( ( s ) => (
                  <option key={ s.value } value={ s.value }>
                    { s.label }
                  </option>
                ) ) }
              </select>
            </div>
          ) }

          {/* Clear */}
          { ( filters.createdAfter || filters.createdBefore || filters.status ) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={ () => onChange( {} ) }
              className="h-8 text-xs text-muted-foreground"
            >
              <HugeiconsIcon icon={ Cancel01Icon } className="size-3 mr-1" strokeWidth={ 2 } />
              Clear filters
            </Button>
          ) }
        </div>
      </div>
    </motion.div>
  );
}
