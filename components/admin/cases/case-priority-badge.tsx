import { StatusBadge } from '@/components/dashboard-ui/status-badge';
import {
  ArrowDown01Icon,
  ArrowUp01Icon,
  ArrowRight01Icon,
  Alert01Icon,
} from '@hugeicons/core-free-icons';
import { cn } from '@/lib/dashboard-utils';
import { useTranslations } from 'next-intl';

interface CasePriorityBadgeProps {
  priority: string;
  className?: string;
}

export function CasePriorityBadge( { priority, className }: CasePriorityBadgeProps ) {
  const t = useTranslations( 'dashboard.admin.casesPage.priorities' );
  const casePriorityConfig = {
    low: {
      label: t( 'low' ),
      color: 'bg-slate-500/10 text-slate-600 border-slate-500/20',
      icon: ArrowDown01Icon,
    },
    normal: {
      label: t( 'normal' ),
      color: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
      icon: ArrowRight01Icon,
    },
    high: {
      label: t( 'high' ),
      color: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
      icon: ArrowUp01Icon,
    },
    urgent: {
      label: t( 'urgent' ),
      color: 'bg-red-500/10 text-red-600 border-red-500/20',
      icon: Alert01Icon,
    },
  };

  return (
    <StatusBadge
      status={ priority }
      className={ cn( className ) }
      configOverride={ casePriorityConfig }
    />
  );
}
