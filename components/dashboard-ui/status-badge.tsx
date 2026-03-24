'use client';

import { cn } from '@/lib/dashboard-utils';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Alert02Icon,
  CancelCircleIcon,
  CheckmarkCircle01Icon,
  CircleIcon,
  Clock01Icon,
  FileEditIcon,
  Loading01Icon,
  PlayIcon,
  SentIcon,
  WalletDone01Icon,
} from '@hugeicons/core-free-icons';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type IconType = any;

// ─── Shared token definitions ────────────────────────────────────────────────

const COLOR = {
  emerald: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  amber: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
  red: 'bg-red-500/10 text-red-600 border-red-500/20',
  blue: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  purple: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
  slate: 'bg-slate-500/10 text-slate-600 border-slate-500/20',
  gray: 'bg-gray-500/10 text-gray-600 border-gray-500/20',
} as const;

interface StatusConfig {
  label: string;
  color: string;
  icon: IconType;
}

// ─── Global status → config (shared semantic meanings) ───────────────────────

const GLOBAL_STATUS_CONFIG: Record<string, StatusConfig> = {
  // Positive / complete
  active: { label: 'Active', color: COLOR.emerald, icon: CheckmarkCircle01Icon },
  approved: { label: 'Approved', color: COLOR.emerald, icon: CheckmarkCircle01Icon },
  accepted: { label: 'Accepted', color: COLOR.emerald, icon: CheckmarkCircle01Icon },
  completed: { label: 'Completed', color: COLOR.emerald, icon: CheckmarkCircle01Icon },
  running: { label: 'Running', color: COLOR.emerald, icon: PlayIcon },
  open: { label: 'Open', color: COLOR.emerald, icon: CheckmarkCircle01Icon },
  paid: { label: 'Paid', color: COLOR.emerald, icon: WalletDone01Icon },
  shortlisted: { label: 'Shortlisted', color: COLOR.emerald, icon: CheckmarkCircle01Icon },

  // In-progress / awaiting
  pending: { label: 'Pending', color: COLOR.amber, icon: Clock01Icon },
  pending_approval: { label: 'Pending Approval', color: COLOR.amber, icon: Clock01Icon },
  submitted: { label: 'Submitted', color: COLOR.amber, icon: SentIcon },
  sent: { label: 'Sent', color: COLOR.amber, icon: SentIcon },
  issued: { label: 'Issued', color: COLOR.amber, icon: SentIcon },
  processing: { label: 'Processing', color: COLOR.blue, icon: Loading01Icon },

  // Negative / blocked
  rejected: { label: 'Rejected', color: COLOR.red, icon: CancelCircleIcon },
  declined: { label: 'Declined', color: COLOR.red, icon: CancelCircleIcon },
  suspended: { label: 'Suspended', color: COLOR.red, icon: CancelCircleIcon },
  failed: { label: 'Failed', color: COLOR.red, icon: Alert02Icon },
  overdue: { label: 'Overdue', color: COLOR.red, icon: Alert02Icon },

  // Neutral / inactive
  draft: { label: 'Draft', color: COLOR.slate, icon: FileEditIcon },
  created: { label: 'Created', color: COLOR.blue, icon: CircleIcon },
  in_progress: { label: 'In Progress', color: COLOR.blue, icon: Loading01Icon },
  inactive: { label: 'Inactive', color: COLOR.slate, icon: CircleIcon },
  cancelled: { label: 'Cancelled', color: COLOR.slate, icon: CancelCircleIcon },
  gigs_approved: { label: 'Gigs Approved', color: COLOR.purple, icon: CheckmarkCircle01Icon },
  returned: { label: 'Returned', color: COLOR.amber, icon: SentIcon },
};

const DEFAULT_CONFIG: StatusConfig = {
  label: 'Unknown',
  color: COLOR.gray,
  icon: CircleIcon,
};

// ─── Base pill component ──────────────────────────────────────────────────────

interface StatusBadgeProps {
  status?: string;
  className?: string;
  configOverride?: Record<string, StatusConfig>;
}

function getConfig(
  status: string | undefined,
  override?: Record<string, StatusConfig>
): StatusConfig {
  if ( !status ) return DEFAULT_CONFIG;
  const key = status.toLowerCase();
  return override?.[ key ] ?? GLOBAL_STATUS_CONFIG[ key ] ?? {
    ...DEFAULT_CONFIG,
    label: status.replace( /_/g, ' ' ),
  };
}

export function StatusBadge( { status, className, configOverride }: StatusBadgeProps ) {
  const config = getConfig( status, configOverride );
  return (
    <div className={ cn(
      'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border scale-90 origin-left whitespace-nowrap',
      config.color,
      className
    ) }>
      <HugeiconsIcon icon={ config.icon } className="w-3 h-3 shrink-0" />
      { config.label }
    </div>
  );
}

// ─── Named exports for each entity (for clear import ergonomics) ──────────────

export function CampaignStatusBadge( { status, className, configOverride }: StatusBadgeProps ) {
  return <StatusBadge status={ status } className={ className } configOverride={ configOverride } />;
}

export function GigStatusBadge( { status, className, configOverride }: StatusBadgeProps ) {
  return <StatusBadge status={ status } className={ className } configOverride={ configOverride } />;
}

export function BrandStatusBadge( { status, className, configOverride }: StatusBadgeProps ) {
  return <StatusBadge status={ status } className={ className } configOverride={ configOverride } />;
}

export function CreatorStatusBadge( { status, className, configOverride }: StatusBadgeProps ) {
  return <StatusBadge status={ status } className={ className } configOverride={ configOverride } />;
}

export function UserStatusBadge( { status, className, configOverride }: StatusBadgeProps ) {
  return <StatusBadge status={ status } className={ className } configOverride={ configOverride } />;
}

export function InvoiceStatusBadge( { status, className, configOverride }: StatusBadgeProps ) {
  return <StatusBadge status={ status } className={ className } configOverride={ configOverride } />;
}

export function PaymentStatusBadge( { status, className, configOverride }: StatusBadgeProps ) {
  return <StatusBadge status={ status } className={ className } configOverride={ configOverride } />;
}

export function SubmissionStatusBadge( { status, className, configOverride }: StatusBadgeProps ) {
  return <StatusBadge status={ status } className={ className } configOverride={ configOverride } />;
}

export function ApplicationStatusBadge( { status, className, configOverride }: StatusBadgeProps ) {
  return <StatusBadge status={ status } className={ className } configOverride={ configOverride } />;
}

export function InvitationStatusBadge( { status, className, configOverride }: StatusBadgeProps ) {
  return <StatusBadge status={ status } className={ className } configOverride={ configOverride } />;
}

export function EmailStatusBadge( { status, className, configOverride }: StatusBadgeProps ) {
  return <StatusBadge status={ status } className={ className } configOverride={ configOverride } />;
}