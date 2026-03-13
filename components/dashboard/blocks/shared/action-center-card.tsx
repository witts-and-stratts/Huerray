"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import type { LucideIcon } from 'lucide-react';
import { ActionCenterItem } from './action-center/action-center-item';

export interface ActionItem {
  label: string;
  href: string;
  detail: string;
  icon: LucideIcon;
  priority: 'high' | 'medium' | 'low' | 'normal';
}

interface ActionCenterCardProps {
  actions: ActionItem[];
  description: string;
}

export function ActionCenterCard( { actions, description }: ActionCenterCardProps ) {
  return (
    <Card className="ad-summary-card">
      <CardHeader className="pb-2">
        <CardTitle className="ad-card-title">Action Center</CardTitle>
        <CardDescription className="ad-card-description">{ description }</CardDescription>
      </CardHeader>
      <CardContent className="action-center-card__content">
        { actions.map( ( item ) => (
          <ActionCenterItem key={ item.label } item={ item } />
        ) ) }
      </CardContent>
    </Card>
  );
}
