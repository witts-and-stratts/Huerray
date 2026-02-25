'use client';

import { MegaphoneOff } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function NotificationsEmptyState() {
  const t = useTranslations( 'dashboard.notifications' );

  return (
    <div className="rounded-xl border border-dashed border-border bg-muted/20 p-10 text-center">
      <MegaphoneOff className="mx-auto mb-3 h-10 w-10 text-muted-foreground/40" strokeWidth={ 1 } />
      <p className="text-sm font-medium text-foreground">{ t( 'empty.title' ) }</p>
      <p className="mt-1 text-xs text-muted-foreground">{ t( 'empty.description' ) }</p>
    </div>
  );
}
