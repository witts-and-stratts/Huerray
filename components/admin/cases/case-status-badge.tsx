import { StatusBadge } from '@/components/dashboard-ui/status-badge';
import {
  AlertCircleIcon,
  CheckmarkCircle01Icon,
  Clock01Icon,
  Cancel01Icon,
} from '@hugeicons/core-free-icons';
import { cn } from '@/lib/dashboard-utils';

const caseStatusConfig = {
  open: {
    label: 'Open',
    color: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
    icon: AlertCircleIcon,
  },
  in_progress: {
    label: 'In Progress',
    color: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
    icon: Clock01Icon,
  },
  resolved: {
    label: 'Resolved',
    color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
    icon: CheckmarkCircle01Icon,
  },
  closed: {
    label: 'Closed',
    color: 'bg-slate-500/10 text-slate-600 border-slate-500/20',
    icon: Cancel01Icon,
  },
};

interface CaseStatusBadgeProps {
  status: string;
  className?: string;
}

export function CaseStatusBadge( { status, className }: CaseStatusBadgeProps ) {
  return (
    <StatusBadge
      status={ status }
      className={ cn( className ) }
      configOverride={ caseStatusConfig }
    />
  );
}
