'use client';

import * as React from 'react';
import { type Table } from '@tanstack/react-table';

export function useTableScrollBorder<T>( table: Table<T> ) {
  const scrollRef = React.useRef<HTMLDivElement>( null );
  const [ isScrolled, setIsScrolled ] = React.useState( false );

  React.useEffect( () => {
    const scrollEl = scrollRef.current;
    if ( !scrollEl ) return;
    const onScroll = () => setIsScrolled( scrollEl.scrollLeft > 0 );
    scrollEl.addEventListener( 'scroll', onScroll, { passive: true } );
    return () => scrollEl.removeEventListener( 'scroll', onScroll );
  }, [] );

  const lastPinnedId = React.useMemo( () => {
    const cols = table.getLeftLeafColumns();
    return cols[ cols.length - 1 ]?.id;
  }, [ table ] );

  return { scrollRef, isScrolled, lastPinnedId };
}
