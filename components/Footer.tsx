'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { LanguageSelector } from '@/components/LanguageSelector';
import { FooterSignupForm } from '@/components/FooterSignupForm';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const socialLinks = [
  { name: 'Facebook', icon: 'facebook', href: 'https://www.facebook.com/profile.php?id=61577485322627&mibextid=wwXIfr&rdid=16XIHv5v2uXCkiGV#' },
  { name: 'X', icon: 'x', href: 'https://x.com/huerray_de' },
  { name: 'Instagram', icon: 'instagram', href: 'https://www.instagram.com/huerray_de/' },
  { name: 'TikTok', icon: 'tiktok', href: 'https://www.tiktok.com/@huerray' },
];

export function Footer( { className }: { className?: string; } ) {
  const t = useTranslations( 'footer' );

  const footerLinks = {
    services: [
      { label: t( 'links.prices' ), href: '/pricing' },
      // { label: t( 'links.creditPacks' ), href: '#' },
      { label: t( 'links.managedService' ), href: '#' },
    ],
    faq: [
      { label: t( 'links.faqBrands' ), href: '/brands-faq' },
      { label: t( 'links.faqCreators' ), href: '/creators-faq' },
      // { label: t( 'links.caseStudies' ), href: '#' },
      // { label: t( 'links.helpCenter' ), href: '#' },
    ],
    platform: [
      { label: t( 'links.aboutHuerray' ), href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: t( 'links.siteNotice' ), href: 'site-notice' },
      { label: t( 'links.privacyPolicy' ), href: '/privacy-policy' },
      { label: t( 'links.tcCreators' ), href: '/creator-terms' },
      { label: t( 'links.tcBrands' ), href: '#' },
    ],
  };

  return (
    <footer className={ cn( 'footer', className ) }>
      {/* Left: CTA */ }
      <div className='footer__cta'>
        <h2 className='footer__cta-title gradient-text'>{ t( 'cta.title' ) }</h2>
        <Button variant='heroAlt' className='min-w-70'>
          <Link href="/signup" title={ t( 'cta.button' ) } className='flex-1'>{ t( 'cta.button' ) }</Link>
        </Button>
      </div>

      {/* Right: Navigation  */ }
      <div className='footer__links'>
        {/* Navigation Links */ }
        <div className='footer__links-grid'>
          {/* Services */ }
          <div className='footer__links-column'>
            <h4 className='footer__links-title'>{ t( 'sections.services' ) }</h4>
            <ul className='footer__links-list'>
              { footerLinks.services.map( ( link ) => (
                <li key={ link.label }>
                  <a href={ link.href } title={ link.label }>
                    { link.label }
                  </a>
                </li>
              ) ) }
            </ul>
          </div>

          {/* FAQ */ }
          <div className='footer__links-column'>
            <h4 className='footer__links-title'>{ t( 'sections.faq' ) }</h4>
            <ul className='footer__links-list'>
              { footerLinks.faq.map( ( link ) => (
                <li key={ link.label }>
                  <a href={ link.href } title={ link.label }>
                    { link.label }
                  </a>
                </li>
              ) ) }
            </ul>
          </div>

          {/* Platform */ }
          <div className='footer__links-column'>
            <h4 className='footer__links-title'>{ t( 'sections.platform' ) }</h4>
            <ul className='footer__links-list'>
              { footerLinks.platform.map( ( link ) => (
                <li key={ link.label }>
                  <a href={ link.href } title={ link.label }>
                    { link.label }
                  </a>
                </li>
              ) ) }
            </ul>
          </div>
        </div>

        {/* Email Signup */ }
        <FooterSignupForm />
      </div>

      {/* Divider */ }
      <div className='footer__divider' />

      {/* Bottom Section */ }
      <div className='footer__bottom'>
        {/* Logo and Copyright */ }
        <div className='footer__bottom-info'>
          <Image
            src='/images/logo/huerray-logo.svg'
            alt='Huerray'
            width={ 215 }
            height={ 60 }
            className='footer__logo'
          />
          <p className='footer__copyright'>{ t( 'copyright' ) }</p>
        </div>

        {/* Language Selector and Social Icons */ }
        <div className='footer__bottom-right'>
          {/* Language Selector */ }
          <LanguageSelector />

          {/* Social Icons */ }
          <div className='footer__social'>
            { socialLinks.map( ( social ) => (
              <a
                key={ social.name }
                href={ social.href }
                className='footer__social-link'
                aria-label={ social.name }
                target='_blank'
              >
                <span className={ `icon icon-${ social.icon }` }></span>
              </a>
            ) ) }
          </div>
        </div>
      </div>
    </footer>
  );
}
