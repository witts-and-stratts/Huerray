'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export function UserMenu() {
  const [open, setOpen] = useState(false);
  const t = useTranslations('header.userMenu');

  const menuItems = [
    { label: t('login'), href: '#login' },
    { label: t('signup'), href: '#signup' },
  ];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className='user-menu' aria-label='User menu'>
          <span className='icon icon-user'></span>
          <span className='icon icon-chevron-thin-down user-menu__chevron'></span>
        </button>
      </PopoverTrigger>
      <PopoverContent className='user-menu__dropdown' align='end'>
        <div className='user-menu__list'>
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className='user-menu__item'
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
