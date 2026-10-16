'use client';

import { Input } from '@/components/dashboard-ui/input';
import { cn } from '@/lib/dashboard-utils';
import { useRef } from 'react';

interface CodeInputProps {
  value: string;
  onChange: ( value: string ) => void;
  onComplete?: ( value: string ) => void;
  length?: number;
  label: string;
  disabled?: boolean;
  invalid?: boolean;
  autoFocus?: boolean;
  className?: string;
}

const sanitize = ( raw: string ) => raw.replace( /[^a-zA-Z0-9]/g, '' ).toUpperCase();

export function CodeInput( {
  value,
  onChange,
  onComplete,
  length = 6,
  label,
  disabled,
  invalid,
  autoFocus,
  className,
}: CodeInputProps ) {
  const inputs = useRef<( HTMLInputElement | null )[]>( [] );

  const focusCell = ( index: number ) => {
    inputs.current[ Math.min( Math.max( index, 0 ), length - 1 ) ]?.focus();
  };

  const commit = ( next: string, focusIndex: number ) => {
    onChange( next );
    focusCell( focusIndex );
    if ( next.length === length ) onComplete?.( next );
  };

  const insert = ( index: number, raw: string, isPaste = false ) => {
    const chars = sanitize( raw );
    if ( !chars ) return;
    const start = isPaste && chars.length >= length ? 0 : Math.min( index, value.length );
    const next = ( value.slice( 0, start ) + chars + value.slice( start + chars.length ) ).slice( 0, length );
    commit( next, start + chars.length );
  };

  const handleChange = ( index: number, raw: string ) => {
    const current = value[ index ] ?? '';
    // Typing into an already-filled cell yields two characters; keep the new one.
    const currentIndex = current && raw.length === 2 ? raw.toUpperCase().indexOf( current ) : -1;
    const typed = currentIndex >= 0 ? raw.slice( 0, currentIndex ) + raw.slice( currentIndex + 1 ) || current : raw;

    if ( !sanitize( typed ) ) {
      if ( index < value.length ) commit( value.slice( 0, index ) + value.slice( index + 1 ), index );
      return;
    }
    insert( index, typed );
  };

  const handleKeyDown = ( index: number, e: React.KeyboardEvent<HTMLInputElement> ) => {
    if ( e.key === 'Backspace' ) {
      e.preventDefault();
      if ( index < value.length ) {
        commit( value.slice( 0, index ) + value.slice( index + 1 ), index );
      } else if ( value.length > 0 ) {
        commit( value.slice( 0, -1 ), value.length - 1 );
      }
    } else if ( e.key === 'ArrowLeft' ) {
      e.preventDefault();
      focusCell( index - 1 );
    } else if ( e.key === 'ArrowRight' ) {
      e.preventDefault();
      focusCell( index + 1 );
    }
  };

  return (
    <div role="group" aria-label={ label } className={ cn( 'flex justify-center gap-2', className ) }>
      { Array.from( { length }, ( _, index ) => (
        <Input
          key={ index }
          ref={ ( el ) => { inputs.current[ index ] = el; } }
          type="text"
          inputMode="text"
          autoComplete={ index === 0 ? 'one-time-code' : 'off' }
          autoCapitalize="characters"
          autoCorrect="off"
          spellCheck={ false }
          aria-label={ `${ label } ${ index + 1 }` }
          aria-invalid={ invalid || undefined }
          value={ value[ index ] ?? '' }
          disabled={ disabled }
          autoFocus={ autoFocus && index === 0 }
          className="h-12 w-11 px-0 text-center font-mono text-lg md:text-lg"
          onChange={ ( e ) => handleChange( index, e.target.value ) }
          onKeyDown={ ( e ) => handleKeyDown( index, e ) }
          onPaste={ ( e ) => {
            e.preventDefault();
            insert( index, e.clipboardData.getData( 'text' ), true );
          } }
          onFocus={ ( e ) => e.target.select() }
        />
      ) ) }
    </div>
  );
}
