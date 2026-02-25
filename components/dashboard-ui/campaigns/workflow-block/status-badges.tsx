'use client';

import { Badge } from '@/components/dashboard-ui/badge';

export function InvitationStatusBadge( { status }: { status?: string; } ) {
  const normalized = String( status || 'pending' ).toLowerCase();
  const variant = normalized === 'accepted'
    ? 'secondary'
    : [ 'rejected', 'declined' ].includes( normalized )
      ? 'destructive'
      : 'outline';

  return (
    <Badge variant={ variant } className="h-5 px-1.5 py-0 text-[10px] font-medium capitalize">
      { normalized.replace( /_/g, ' ' ) }
    </Badge>
  );
}

export function ApplicationStatusBadge( { status }: { status?: string; } ) {
  const normalized = String( status || 'pending' ).toLowerCase();
  const variant = [ 'accepted', 'approved', 'shortlisted' ].includes( normalized )
    ? 'secondary'
    : [ 'rejected', 'declined' ].includes( normalized )
      ? 'destructive'
      : 'outline';

  return (
    <Badge variant={ variant } className="h-5 px-1.5 py-0 text-[10px] font-medium capitalize">
      { normalized.replace( /_/g, ' ' ) }
    </Badge>
  );
}
