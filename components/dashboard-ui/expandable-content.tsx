'use client';

import * as React from 'react';
import { cn } from '@/lib/dashboard-utils';
import { ChevronDown } from 'lucide-react';

export interface ExpandableContentProps {
  children: React.ReactNode;
  /**
   * Tailwind max-height class applied when collapsed. Defaults to max-h-24 (6rem).
   */
  maxHeightClass?: string;
  /**
   * Tailwind max-height class applied when expanded. Defaults to max-h-[800px].
   */
  expandedMaxHeightClass?: string;
  className?: string;
}

export function ExpandableContent( {
  children,
  maxHeightClass = 'max-h-24',
  expandedMaxHeightClass = 'max-h-[800px]',
  className
}: ExpandableContentProps ) {
  const [ expanded, setExpanded ] = React.useState( false );
  const [ overflows, setOverflows ] = React.useState( false );
  const ref = React.useRef<HTMLDivElement>( null );

  React.useLayoutEffect( () => {
    const el = ref.current;
    if ( el ) {
      // Check if the scrollHeight is strictly greater than the clientHeight to avoid false positives.
      setOverflows( el.scrollHeight > el.clientHeight );
    }
  }, [ children ] );

  return (
    <div className={ cn( "space-y-1.5", className ) }>
      <div
        ref={ ref }
        className={ cn( 'overflow-hidden transition-all duration-300', expanded ? expandedMaxHeightClass : maxHeightClass ) }
      >
        { children }
      </div>
      { ( overflows || expanded ) && (
        <button
          onClick={ () => setExpanded( p => !p ) }
          className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-primary transition-colors"
        >
          <ChevronDown className={ cn( 'size-3 transition-transform duration-300', expanded && 'rotate-180' ) } />
          { expanded ? 'Show less' : 'Show more' }
        </button>
      ) }
    </div>
  );
}
