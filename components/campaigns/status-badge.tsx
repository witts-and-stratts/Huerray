'use client';

import * as React from 'react';
import { cn } from '@/lib/dashboard-utils';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  PlayIcon,
  CircleIcon,
  CheckmarkCircle01Icon,
  Clock01Icon
} from '@hugeicons/core-free-icons';

type CampaignStatus = 'running' | 'created' | 'completed' | 'pending_approval' | string;

interface StatusBadgeProps {
  status: CampaignStatus;
  className?: string;
}

const statusConfig: Record<string, { label: string, color: string, icon: any; }> = {
  running: {
    label: 'Running',
    color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
    icon: PlayIcon
  },
  created: {
    label: 'Created',
    color: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
    icon: CircleIcon
  },
  completed: {
    label: 'Completed',
    color: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
    icon: CheckmarkCircle01Icon
  },
  pending_approval: {
    label: 'Pending Approval',
    color: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
    icon: Clock01Icon
  }
};

export function StatusBadge( { status, className }: StatusBadgeProps ) {
  const config = statusConfig[ status ] || {
    label: status,
    color: 'bg-gray-500/10 text-gray-600 border-gray-500/20',
    icon: CircleIcon
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
