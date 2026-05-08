"use client";

import { Badge } from '@/components/dashboard-ui/badge';
import { ArrowRight, ChevronRight } from 'lucide-react';
import type { ActionItem } from '../action-center-card';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/dashboard-ui/button';
import { cn } from '@/lib/dashboard-utils';

function getPriorityVariant( priority: ActionItem[ 'priority' ] ): 'destructive' | 'secondary' | 'outline' {
  if ( priority === 'high' ) return 'destructive';
  if ( priority === 'medium' ) return 'secondary';
  return 'outline';
}

function ActionCenterItemWithImage( { item }: { item: ActionItem; } ) {
  if ( item.elem ) {
    return (
      <div className="action-center-item ad-action-link group p-0 overflow-hidden relative block">
        { item.elem }
      </div>
    );
  }

  return (
    <Link href={ item.href } className="action-center-item ad-action-link group p-0 overflow-hidden group relative">
      { item.image && <div className={ cn( 'w-full', { 'relative w-full h-full': item.fullBackground, 'aspect-4/3': !item.fullBackground, } ) }>
        <Image src={ item.image } alt={ item.label } width={ 1600 } height={ 900 } className='w-full h-full object-cover' />
      </div> }
      <div className={ cn( 'p-4 pt-15 transition-all duration-300', { 'absolute bg-gradient-to-t from-primary/80 via-primary/80 to-transparent bottom-0 left-0 w-full': item.fullBackground, } ) }>
        <div className="action-center-item__header">
          <div className="action-center-item__identity mt-1">
            <p className={ cn( "card__title ad-card-title", { 'text-white': item.fullBackground } ) }>{ item.label }</p>
          </div>
        </div>
        <p className={ cn( "action-center-item__detail text-base font-light", { 'text-white/70': item.fullBackground } ) }>{ item.detail }</p>
        <Button variant="outline" size="icon-lg" className={ cn( 'mt-2 rounded-full opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:height-auto transition-all', { 'bg-transparent border-white/5 group-hover:bg-primary/30 text-white size-0 group-hover:size-10 transition-all duration-300': item.fullBackground } ) }>
          <ChevronRight className="action-center-item__arrow size-6 ml-1" strokeWidth={ 1.5 } />
        </Button>
      </div>
    </Link>
  );
}

function ActionCenterItemWithoutImage( { item }: { item: ActionItem; } ) {
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

export function ActionCenterItem( { item }: { item: ActionItem; } ) {
  if ( item.elem || item.image ) return <ActionCenterItemWithImage item={ item } />;
  return <ActionCenterItemWithoutImage item={ item } />;
}
