"use client";

import { cn } from '@/lib/utils';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  CircleIcon,
  CheckmarkCircle01Icon,
  Clock01Icon,
  WalletDone01Icon,
  CancelCircleIcon,
  SentIcon,
  Alert02Icon,
  FileEditIcon,
} from '@hugeicons/core-free-icons';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
  draft: {
    label: 'Draft',
    color: 'bg-slate-500/10 text-slate-600 border-slate-500/20',
    icon: FileEditIcon,
  },
  issued: {
    label: 'Issued',
    color: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
    icon: CircleIcon,
  },
  sent: {
    label: 'Sent',
    color: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
    icon: SentIcon,
  },
  paid: {
    label: 'Paid',
    color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
    icon: WalletDone01Icon,
  },
  overdue: {
    label: 'Overdue',
    color: 'bg-red-500/10 text-red-600 border-red-500/20',
    icon: Alert02Icon,
  },
  cancelled: {
    label: 'Cancelled',
    color: 'bg-gray-500/10 text-gray-500 border-gray-500/20',
    icon: CancelCircleIcon,
  },
};

interface InvoiceStatusBadgeProps {
  status: string | undefined;
  className?: string;
}

export function InvoiceStatusBadge( { status, className }: InvoiceStatusBadgeProps ) {
  const config = statusConfig[ status || '' ] || {
    label: status || 'Unknown',
    color: 'bg-gray-500/10 text-gray-600 border-gray-500/20',
    icon: CircleIcon,
  };

  return (
    <div className={ cn(
      "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border scale-90 origin-left whitespace-nowrap",
      config.color,
      className
    ) }>
      <HugeiconsIcon icon={ config.icon } className="w-3 h-3" />
      { config.label }
    </div>
  );
}
