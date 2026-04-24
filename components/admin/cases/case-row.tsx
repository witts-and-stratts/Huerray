'use client';

import { ModelsCaseResponse } from '@/lib/api/generated/models';
import { cn } from '@/lib/dashboard-utils';
import { useTimeAgo } from '@/lib/hooks/format';
import { Link } from '@/lib/navigation';
import { useTranslations } from 'next-intl';

interface CaseRowProps {
  case_: ModelsCaseResponse;
  isSelected: boolean;
  onClick: () => void;
  href?: string;
}

const statusDotColor: Record<string, string> = {
  open: 'bg-blue-500',
  in_progress: 'bg-amber-500',
  resolved: 'bg-emerald-500',
  closed: 'bg-slate-400',
};

const priorityDotColor: Record<string, string> = {
  low: 'bg-slate-400',
  normal: 'bg-blue-500',
  medium: 'bg-blue-500',
  high: 'bg-amber-500',
  urgent: 'bg-red-500',
};

const statusKeyMap = {
  open: 'open',
  in_progress: 'inProgress',
  resolved: 'resolved',
  closed: 'closed',
} as const;

const priorityKeyMap = {
  low: 'low',
  normal: 'normal',
  medium: 'normal',
  high: 'high',
  urgent: 'urgent',
} as const;

export function CaseRow( { case_, isSelected, onClick, href }: CaseRowProps ) {
  const formatTimeAgo = useTimeAgo();
  const tStatus = useTranslations( 'dashboard.admin.casesPage.statuses' );
  const tPriority = useTranslations( 'dashboard.admin.casesPage.priorities' );
  const status = case_.status || 'open';
  const priority = case_.priority || 'normal';
  const isOpen = status === 'open' || status === 'in_progress';
  const statusKey = ( statusKeyMap[ status as keyof typeof statusKeyMap ] ?? 'open' ) as Parameters<typeof tStatus>[ 0 ];
  const priorityKey = ( priorityKeyMap[ priority as keyof typeof priorityKeyMap ] ?? 'normal' ) as Parameters<typeof tPriority>[ 0 ];

  const className = cn(
    'w-full text-left px-4 py-3 border-b border-border/50 transition-colors cursor-pointer block',
    'hover:bg-primary/5',
    isSelected && 'bg-primary/10 border-l-2 border-l-primary',
    isOpen && !isSelected && 'bg-card',
    !isOpen && !isSelected && 'bg-muted/20',
  );

  const content = (
    <div className="flex items-start gap-3">
      <div className="flex-1 min-w-0">
        <p className={ cn(
          'text-base truncate font-primary -mt-1',
          isOpen ? 'font-medium text-foreground' : 'font-normal text-muted-foreground'
        ) }>
          { case_.title || 'Untitled Case' }
        </p>

        { case_.description && (
          <p className="text-[14px] font-light text-muted-foreground/70 line-clamp-2 leading-relaxed mb-1.5">
            { case_.description }
          </p>
        ) }

        <span className="block text-[11px] text-muted-foreground mt-3">
          { case_.created_at ? formatTimeAgo( case_.created_at ) : '' }
        </span>
      </div>

      <div className="flex shrink-0 items-center gap-0.5 mt-1.5">
        <span
          className={ cn( 'block size-[5px] rounded-full', statusDotColor[ status ] ?? 'bg-slate-400' ) }
          title={ tStatus( statusKey ) }
          aria-label={ tStatus( statusKey ) }
        />
        <span
          className={ cn( 'block size-[5px] rounded-full', priorityDotColor[ priority ] ?? 'bg-slate-400' ) }
          title={ tPriority( priorityKey ) }
          aria-label={ tPriority( priorityKey ) }
        />
      </div>
    </div>
  );

  if ( href ) {
    return (
      <Link href={ href } onClick={ onClick } className={ className }>
        { content }
      </Link>
    );
  }

  return (
    <button type="button" onClick={ onClick } className={ className }>
      { content }
    </button>
  );
}
