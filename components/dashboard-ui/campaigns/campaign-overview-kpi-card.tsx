'use client';

import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/dashboard-ui/card';

interface KpiMetricCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  progress?: number;
  children?: ReactNode;
}

export function KpiMetricCard( { label, value, icon: Icon, progress, children }: KpiMetricCardProps ) {
  return (
    <Card className="ad-summary-card border-border/70 py-0">
      <CardContent className="p-3">
        <div className="mb-2 flex items-center justify-between gap-2">
          <p className="ad-total-label">{ label }</p>
          <Icon className="size-3.5 text-muted-foreground/70" />
        </div>
        { children ? children : <p className="text-[2rem] leading-none font-primary font-medium">{ value }</p> }
        { typeof progress === 'number' ? (
          <div className="mt-2 h-1.5 w-full rounded-full bg-muted">
            <div className="h-1.5 rounded-full bg-primary/80" style={ { width: `${ Math.min( 100, Math.max( 0, progress ) ) }%` } } />
          </div>
        ) : null }
      </CardContent>
    </Card>
  );
}
