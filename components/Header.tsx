'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'motion/react';
import { useTranslations, useLocale } from 'next-intl';
import { LanguageSelector } from '@/components/LanguageSelector';
import { UserMenu } from '@/components/UserMenu';
import Link from 'next/link';

const imgLogo = '/images/logo/huerray-logo.svg';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations('header');
  const locale = useLocale();

  const navLinks = [
    { href: `/${locale}/creators`, label: t('nav.forCreators') },
    { href: `/${locale}/brands`, label: t('nav.forBrands') },
    { href: `/${locale}/pricing`, label: t('nav.pricing') },
    { href: '#resources', label: t('nav.resources') },
  ];

  return (
    <header className='header'>
      <Link href={`/${locale}`}>
        <Image
          alt='Huerray Logo'
          className='logo'
          src={imgLogo}
          width={160}
          height={45}
          priority={true}
        />
      </Link>

      {/* Desktop Navigation */}
      <nav className='header__nav'>
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} title={link.label}>
            {link.label}
          </Link>
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
          className='header__hamburger'
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label='Toggle menu'
        >
          <span
            className={`header__hamburger-line ${
              isMenuOpen ? 'header__hamburger-line--top-open' : ''
            }`}
          />
          <span
            className={`header__hamburger-line ${
              isMenuOpen ? 'header__hamburger-line--middle-open' : ''
            }`}
          />
          <span
            className={`header__hamburger-line ${
              isMenuOpen ? 'header__hamburger-line--bottom-open' : ''
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
          className='header__mobile-nav'
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
              className='header__mobile-nav-link'
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
