'use client';

import {
  Store01Icon,
  ChartLineData01Icon,
  AiUserIcon,
  Task02Icon,
  FileScriptIcon,
  Mail01Icon,
  CreditCardAcceptIcon,
  FileUploadIcon,
} from '@hugeicons/core-free-icons';
import type { EntityType } from '@/lib/api/hooks/search';
export { buildUrl } from './routing';

// ─── Icon map ─────────────────────────────────────────────────────────────────

export const ENTITY_ICONS: Record<EntityType, any> = {
  brands: Store01Icon,
  campaigns: ChartLineData01Icon,
  cases: FileScriptIcon,
  creators: AiUserIcon,
  gigs: Task02Icon,
  invoices: FileScriptIcon,
  newsletter: Mail01Icon,
  payments: CreditCardAcceptIcon,
  submissions: FileUploadIcon,
};

// ─── Status options per entity type ──────────────────────────────────────────

export const STATUS_OPTIONS: Record<EntityType, { value: string; label: string }[]> = {
  brands: [
    { value: 'created', label: 'Created' },
    { value: 'pending_approval', label: 'Pending Approval' },
    { value: 'approved', label: 'Approved' },
    { value: 'suspended', label: 'Suspended' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'deleted', label: 'Deleted' },
  ],
  campaigns: [
    { value: 'draft', label: 'Draft' },
    { value: 'pending_approval', label: 'Pending Approval' },
    { value: 'returned', label: 'Returned' },
    { value: 'gigs_approved', label: 'Gigs Approved' },
    { value: 'running', label: 'Running' },
    { value: 'completed', label: 'Completed' },
    { value: 'deactivated', label: 'Deactivated' },
  ],
  cases: [
    { value: 'open', label: 'Open' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'resolved', label: 'Resolved' },
    { value: 'closed', label: 'Closed' },
  ],
  creators: [
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'suspended', label: 'Suspended' },
    { value: 'rejected', label: 'Rejected' },
  ],
  gigs: [
    { value: 'draft', label: 'Draft' },
    { value: 'pending_approval', label: 'Pending Approval' },
    { value: 'running', label: 'Running' },
    { value: 'completed', label: 'Completed' },
    { value: 'deactivated', label: 'Deactivated' },
  ],
  invoices: [
    { value: 'pending', label: 'Pending' },
    { value: 'paid', label: 'Paid' },
    { value: 'overdue', label: 'Overdue' },
    { value: 'cancelled', label: 'Cancelled' },
  ],
  newsletter: [
    { value: 'subscribed', label: 'Subscribed' },
    { value: 'unsubscribed', label: 'Unsubscribed' },
  ],
  payments: [
    { value: 'pending', label: 'Pending' },
    { value: 'processing', label: 'Processing' },
    { value: 'completed', label: 'Completed' },
    { value: 'failed', label: 'Failed' },
    { value: 'refunded', label: 'Refunded' },
  ],
  submissions: [
    { value: 'created', label: 'Created' },
    { value: 'pending_approval', label: 'Pending Approval' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'accepted', label: 'Accepted' },
    { value: 'returned', label: 'Returned' },
  ],
};

// ─── Status badge variant ─────────────────────────────────────────────────────

export function getStatusVariant(
  status?: string,
): 'default' | 'secondary' | 'destructive' | 'outline' {
  if ( !status ) return 'outline';
  const s = status.toLowerCase();
  if (
    s.includes( 'approved' ) ||
    s.includes( 'completed' ) ||
    s.includes( 'paid' ) ||
    s.includes( 'accepted' ) ||
    s.includes( 'running' )
  )
    return 'default';
  if ( s.includes( 'pending' ) || s.includes( 'processing' ) || s.includes( 'draft' ) )
    return 'secondary';
  if (
    s.includes( 'rejected' ) ||
    s.includes( 'suspended' ) ||
    s.includes( 'deactivated' ) ||
    s.includes( 'failed' ) ||
    s.includes( 'deleted' )
  )
    return 'destructive';
  return 'outline';
}
