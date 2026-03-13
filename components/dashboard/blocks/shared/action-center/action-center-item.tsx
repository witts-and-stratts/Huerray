"use client";

import { Badge } from '@/components/dashboard-ui/badge';
import { ArrowRight } from 'lucide-react';
import type { ActionItem } from '../action-center-card';
import Link from 'next/link';

function getPriorityVariant( priority: ActionItem[ 'priority' ] ): 'destructive' | 'secondary' | 'outline' {
  if ( priority === 'high' ) return 'destructive';
  if ( priority === 'medium' ) return 'secondary';
  return 'outline';
}

export function ActionCenterItem( { item }: { item: ActionItem; } ) {
  return (
    <Link href={ item.href } className="action-center-item ad-action-link group">
      <div className="action-center-item__header">
        <div className="action-center-item__identity">
          <span className="action-center-item__icon-wrapper">
            <item.icon className="action-center-item__icon" />
          </span>
          <p className="action-center-item__label">{ item.label }</p>
        </div>
        <Badge variant={ getPriorityVariant( item.priority ) }>
          { item.priority.toUpperCase() }
        </Badge>
      </div>
      <p className="action-center-item__detail">{ item.detail }</p>
      <div className="action-center-item__footer ad-action-link-open">
        Open
        <ArrowRight className="action-center-item__arrow group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
}
