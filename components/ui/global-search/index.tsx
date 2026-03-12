'use client';

import { useState, useEffect, type KeyboardEvent as ReactKeyboardEvent, useEffectEvent } from 'react';
import { SuperField } from '@/components/dashboard-ui/super-field';
import { InputGroupAddon } from '@/components/dashboard-ui/input-group';
import { Kbd, KbdGroup } from '@/components/dashboard-ui/kbd';
import { HugeiconsIcon } from '@hugeicons/react';
import { SearchIcon } from '@hugeicons/core-free-icons';
import { SearchDialog } from './search-dialog';

export function GlobalSearch() {
  const [ open, setOpen ] = useState( false );

  const shortCutEvent = useEffectEvent( ( e: KeyboardEvent ) => {
    if ( e.key === 'k' && ( e.metaKey || e.ctrlKey ) ) {
      e.preventDefault();
      setOpen( ( prev ) => !prev );
    }
  } );

  useEffect( () => {
    const handler = ( e: KeyboardEvent ) => shortCutEvent( e );
    document.addEventListener( 'keydown', handler );
    return () => document.removeEventListener( 'keydown', handler );
  }, [] );

  useEffect( () => {
    const handler = () => setOpen( true );
    document.addEventListener( 'open-global-search', handler );
    return () => document.removeEventListener( 'open-global-search', handler );
  }, [] );

  const ShortcutBtn = (
    <InputGroupAddon align="inline-end">
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>
    </InputGroupAddon>
  );

  const handleClick = () => setOpen( true );
  const handleKeyDown = ( e: ReactKeyboardEvent ) => {
    if ( e.key === 'Enter' ) handleClick();
  };

  return (
    <>
      <SuperField
        type="search"
        placeholder="Search..."
        prefix={ <HugeiconsIcon icon={ SearchIcon } /> }
        suffix={ ShortcutBtn }
        onClick={ handleClick }
        onKeyDown={ handleKeyDown }
        className="max-w-xl self-center"
        readOnly
        fieldClassName="placeholder:text-gray-400 cursor-pointer"
      />
      <SearchDialog open={ open } onOpenChange={ setOpen } />
    </>
  );
}
