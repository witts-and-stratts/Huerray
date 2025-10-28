'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { LanguageSelector } from '@/components/LanguageSelector';
import { UserMenu } from '@/components/UserMenu';

const imgLogo = '/images/logo/huerray-logo.svg';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations('header');

  const navLinks = [
    { href: '#creators', label: t('nav.forCreators') },
    { href: '#brands', label: t('nav.forBrands') },
    { href: '#pricing', label: t('nav.pricing') },
    { href: '#resources', label: t('nav.resources') },
  ];

  return (
    <header className='header'>
      <Image
        alt='Huerray Logo'
        className='logo'
        src={imgLogo}
        width={160}
        height={45}
        priority={true}
      />

      {/* Desktop Navigation */}
      <nav className='header__nav'>
        {navLinks.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>

      {/* Right side: User Menu, Language Selector + Hamburger */}
      <div className='header__actions'>
        {/* User Menu */}
        <UserMenu />

        {/* Language Selector */}
        <div className='header__language'>
          <LanguageSelector showLabel={false} />
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className='md:hidden flex flex-col gap-1.5 w-8 h-8 justify-center items-center'
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label='Toggle menu'
        >
          <span
            className={`block w-6 h-0.5 bg-deep-maroon transition-transform ${
              isMenuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-deep-maroon transition-opacity ${
              isMenuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-deep-maroon transition-transform ${
              isMenuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.nav
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className='absolute top-full left-0 right-0 bg-violet-100 md:hidden flex flex-col px-4 gap-4 border-t border-deep-maroon/10 shadow-2xl shadow-dark-burgundy/30 overflow-hidden'
        >
          {navLinks.map((link, index) => (
            <motion.a
              key={link.href}
              href={link.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.05,
                ease: 'easeOut',
              }}
              className='text-deep-maroon font-secondary text-lg py-2 first-of-type:mt-4 last-of-type:mb-4'
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </motion.a>
          ))}
        </motion.nav>
      )}
    </header>
  );
}
