'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import Link from 'next/link';
import { useAuth } from '@/lib/auth/auth-context';

export function UserMenu() {
  const [ open, setOpen ] = useState( false );
  const [ mounted, setMounted ] = useState( false );
  const t = useTranslations( 'header.userMenu' );
  const locale = useLocale();
  const { user } = useAuth();

  useEffect( () => {
    setMounted( true );
  }, [] );

  if ( !mounted ) {
    return (
      <div className='user-menu' aria-label='Loading user menu'>
        <span className='icon icon-user'></span>
      </div>
    );
  }

  if ( user ) {
    return (
      <Link href={ `/${ locale }/${ user.role }` } className='user-menu' aria-label='Dashboard'>
        <span className='icon icon-user'></span>
      </Link>
    );
  }

  const menuItems = [
    { label: t( 'login' ), href: `/${ locale }/login` },
    { label: t( 'signup' ), href: `/${ locale }/signup` },
  ];

  return (
    <Popover open={ open } onOpenChange={ setOpen }>
      <PopoverTrigger asChild>
        <button className='user-menu' aria-label='User menu'>
          <span className='icon icon-user'></span>
          <span className='icon icon-chevron-thin-down user-menu__chevron'></span>
        </button>
      </PopoverTrigger>
      <PopoverContent className='user-menu__dropdown' align='end'>
        <div className='user-menu__list'>
          { menuItems.map( ( item ) => (
            <Link
              key={ item.label }
              href={ item.href }
              className='user-menu__item'
              onClick={ () => setOpen( false ) }
            >
              { item.label }
            </Link>
          ) ) }
        </div>
      </PopoverContent>
    </Popover>
  );
}
