"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import type { LucideIcon } from 'lucide-react';
import { ActionCenterItem } from './action-center/action-center-item';
import { cn } from '@/lib/dashboard-utils';
import { useTranslations } from 'next-intl';

export interface ActionItem {
  label: string;
  href: string;
  detail: string;
  icon: LucideIcon;
  priority: 'high' | 'medium' | 'low' | 'normal';
  image?: string;
  fullBackground?: boolean;
  elem?: React.ReactNode;
}

interface ActionCenterCardProps {
  actions: ActionItem[];
  description: string;
  className?: string;
  noShell?: boolean;
}

export function ActionCenterCard( { actions, description, className, noShell }: ActionCenterCardProps ) {
  const t = useTranslations( 'dashboard.common.cards' );
  return (
    <Card className={ cn( "ad-summary-card", { 'rounded-none p-0 bg-transparent border-0 ring-0 shadow-none': noShell } ) }>
      <CardHeader className={ cn( "pb-2", { '!p-0 mb-2': noShell } ) }>
        <CardTitle className="ad-card-title">{ t( 'actionCenterTitle' ) }</CardTitle>
        <CardDescription className="ad-card-description">{ description }</CardDescription>
      </CardHeader>
      <CardContent className={ cn( "action-center-card__content", className, { 'p-0': noShell } ) }>
        { actions.map( ( item ) => (
          <ActionCenterItem key={ item.label } item={ item } />
        ) ) }
      </CardContent>
    </Card>
  );
}
