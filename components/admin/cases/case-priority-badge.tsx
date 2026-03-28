import { StatusBadge } from '@/components/dashboard-ui/status-badge';
import {
  ArrowDown01Icon,
  ArrowUp01Icon,
  ArrowRight01Icon,
  Alert01Icon,
} from '@hugeicons/core-free-icons';
import { cn } from '@/lib/dashboard-utils';

const casePriorityConfig = {
  low: {
    label: 'Low',
    color: 'bg-slate-500/10 text-slate-600 border-slate-500/20',
    icon: ArrowDown01Icon,
  },
  medium: {
    label: 'Medium',
    color: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
    icon: ArrowRight01Icon,
  },
  high: {
    label: 'High',
    color: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
    icon: ArrowUp01Icon,
  },
  urgent: {
    label: 'Urgent',
    color: 'bg-red-500/10 text-red-600 border-red-500/20',
    icon: Alert01Icon,
  },
};

interface CasePriorityBadgeProps {
  priority: string;
  className?: string;
}

export function CasePriorityBadge( { priority, className }: CasePriorityBadgeProps ) {
  return (
    <StatusBadge
      status={ priority }
      className={ cn( className ) }
      configOverride={ casePriorityConfig }
    />
  );
}
