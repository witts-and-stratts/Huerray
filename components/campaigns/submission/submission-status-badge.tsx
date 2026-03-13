"use client";

import { TextCapitalize } from '@/components/text-case';
import { cn } from '@/lib/dashboard-utils';

interface SubmissionStatusBadgeProps {
  status: string;
  compact?: boolean;
}

export function SubmissionStatusBadge( { status, compact = false }: SubmissionStatusBadgeProps ) {
  const normalizedStatus = status.toLowerCase().replace( /_/g, '-' );

  return (
    <span className={ cn(
      "submission-status-badge",
      compact ? "submission-status-badge--compact" : "submission-status-badge--standard",
      `submission-status-badge--${ normalizedStatus }`
    ) }>
      <TextCapitalize>{ status.replace( /_/g, ' ' ) }</TextCapitalize>
    </span>
  );
}
