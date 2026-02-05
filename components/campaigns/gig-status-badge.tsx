"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import * as React from 'react';
import { cn } from '@/lib/utils';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  CircleIcon,
  CheckmarkCircle01Icon,
  Clock01Icon,
  WalletDone01Icon,
  CancelCircleIcon,
  Loading01Icon,
  SentIcon,
  Alert02Icon,
  CheckmarkCircle02Icon,
  Money03Icon,
  Video01Icon
} from '@hugeicons/core-free-icons';
import { Badge } from '@/components/dashboard-ui/badge';

interface GigStatusBadgeProps {
  status: string | undefined;
  className?: string;
}

const statusConfig: Record<string, { label: string, color: string, icon: any; }> = {
  pending: {
    label: 'Pending',
    color: 'bg-gray-500/10 text-gray-600 border-gray-500/20',
    icon: CircleIcon
  },
  in_progress: {
    label: 'In Progress',
    color: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
    icon: Loading01Icon
  },
  submitted: {
    label: 'Submitted',
    color: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
    icon: SentIcon
  },
  approved: {
    label: 'Approved',
    color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
    icon: CheckmarkCircle01Icon
  },
  rejected: {
    label: 'Rejected',
    color: 'bg-red-500/10 text-red-600 border-red-500/20',
    icon: CancelCircleIcon
  },
  paid: {
    label: 'Paid',
    color: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
    icon: WalletDone01Icon
  },
  draft: {
    label: 'Draft',
    color: 'bg-slate-500/10 text-slate-600 border-slate-500/20',
    icon: CircleIcon
  },
  open: {
    label: 'Open',
    color: 'bg-green-500/10 text-green-600 border-green-500/20',
    icon: CheckmarkCircle01Icon
  }
};

export function GigStatusBadge( { status, className }: GigStatusBadgeProps ) {
  const config = statusConfig[ status || '' ] || {
    label: status,
    color: 'bg-gray-500/10 text-gray-600 border-gray-500/20',
    icon: CircleIcon
  };

  // Rotating animation for in_progress status
  const iconClass = status === 'in_progress' ? 'animate-spin' : '';

  return (
    <div className={ cn(
      "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border scale-90 origin-left whitespace-nowrap",
      config.color,
      className
    ) }>
      <HugeiconsIcon icon={ config.icon } className={ cn( "w-3 h-3", iconClass ) } />
      { config.label }
    </div>
  );
}
