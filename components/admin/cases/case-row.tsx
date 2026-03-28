'use client';

import { ModelsCaseResponse } from '@/lib/api/generated/models';
import { CaseStatusBadge } from './case-status-badge';
import { CasePriorityBadge } from './case-priority-badge';
import { cn } from '@/lib/dashboard-utils';
import { timeAgo } from '@/lib/utils';

interface CaseRowProps {
  case_: ModelsCaseResponse;
  isSelected: boolean;
  onClick: () => void;
}

export function CaseRow( { case_, isSelected, onClick }: CaseRowProps ) {
  const isOpen = case_.status === 'open' || case_.status === 'in_progress';
  const reporterName = case_.reporter
    ? `${ case_.reporter.first_name || '' } ${ case_.reporter.last_name || '' }`.trim() || case_.reporter.email || 'Unknown'
    : 'Unknown';

  return (
    <button
      type="button"
      onClick={ onClick }
      className={ cn(
        'w-full text-left px-4 py-3 border-b border-border/50 transition-colors cursor-pointer',
        'hover:bg-primary/5',
        isSelected && 'bg-primary/10 border-l-2 border-l-primary',
        isOpen && !isSelected && 'bg-card',
        !isOpen && !isSelected && 'bg-muted/20',
      ) }
    >
      <div className="flex items-start gap-3">
        <div className="mt-1.5 shrink-0">
          { isOpen
            ? <span className="block w-2 h-2 rounded-full bg-primary" />
            : <span className="block w-2 h-2 rounded-full bg-transparent" />
          }
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-0.5">
            <p className={ cn(
              'text-sm truncate',
              isOpen ? 'font-medium text-foreground' : 'font-normal text-muted-foreground'
            ) }>
              { case_.title || 'Untitled Case' }
            </p>
            <span className="text-[11px] text-muted-foreground shrink-0">
              { case_.created_at ? timeAgo( case_.created_at ) : '' }
            </span>
          </div>

          { case_.description && (
            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-1.5">
              { case_.description }
            </p>
          ) }

          <div className="flex items-center gap-1.5 flex-wrap mt-1">
            <CaseStatusBadge status={ case_.status || 'open' } />
            <CasePriorityBadge priority={ case_.priority || 'medium' } />
            <span className="text-[10px] text-muted-foreground ml-auto">{ reporterName }</span>
          </div>
        </div>
      </div>
    </button>
  );
}
