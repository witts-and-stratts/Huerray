'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { LanguageSelector } from '@/components/LanguageSelector';
import { FooterSignupForm } from '@/components/FooterSignupForm';

const socialLinks = [
  { name: 'Facebook', icon: 'facebook', href: '#' },
  { name: 'X', icon: 'x', href: '#' },
  { name: 'Instagram', icon: 'instagram', href: '#' },
  { name: 'TikTok', icon: 'tiktok', href: '#' },
];

export function Footer() {
  const t = useTranslations('footer');

  const footerLinks = {
    services: [
      { label: t('links.prices'), href: '#' },
      { label: t('links.creditPacks'), href: '#' },
      { label: t('links.managedService'), href: '#' },
    ],
    faq: [
      { label: t('links.faqBrands'), href: '#' },
      { label: t('links.faqCreators'), href: '#' },
      { label: t('links.caseStudies'), href: '#' },
      { label: t('links.helpCenter'), href: '#' },
    ],
    platform: [
      { label: t('links.aboutHuerray'), href: '#' },
      { label: t('links.siteNotice'), href: '#' },
      { label: t('links.privacyPolicy'), href: '#' },
      { label: t('links.tcCreators'), href: '#' },
      { label: t('links.tcBrands'), href: '#' },
    ],
  };

  return (
    <footer className='footer'>
      {/* Left: CTA */}
      <div className='footer__cta'>
        <h2 className='footer__cta-title gradient-text'>
          {t('cta.title')}
        </h2>
        <Button variant='hero' className='min-w-60'>
          {t('cta.button')}
        </Button>
      </div>

      {/* Right: Navigation  */}
      <div className='footer__links'>
        {/* Navigation Links */}
        <div className='footer__links-grid'>
          {/* Services */}
          <div className='footer__links-column'>
            <h4 className='footer__links-title'>{t('sections.services')}</h4>
            <ul className='footer__links-list'>
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a href={link.href} title={link.label}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* FAQ */}
          <div className='footer__links-column'>
            <h4 className='footer__links-title'>{t('sections.faq')}</h4>
            <ul className='footer__links-list'>
              {footerLinks.faq.map((link) => (
                <li key={link.label}>
                  <a href={link.href} title={link.label}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform */}
          <div className='footer__links-column'>
            <h4 className='footer__links-title'>{t('sections.platform')}</h4>
            <ul className='footer__links-list'>
              {footerLinks.platform.map((link) => (
                <li key={link.label}>
                  <a href={link.href} title={link.label}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Email Signup */}
        <FooterSignupForm />
      </div>

      {/* Divider */}
      <div className='footer__divider' />

      {/* Bottom Section */}
      <div className='footer__bottom'>
        {/* Logo and Copyright */}
        <div className='footer__bottom-info'>
          <Image
            src='/images/logo/huerray-logo.svg'
            alt='Huerray'
            width={215}
            height={60}
            className='footer__logo'
          />
          <p className='footer__copyright'>
            {t('copyright')}
          </p>
        </div>

        {/* Language Selector and Social Icons */}
        <div className='footer__bottom-right'>
          {/* Language Selector */}
          <LanguageSelector />

          {/* Social Icons */}
          <div className='footer__social'>
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className='footer__social-link'
                aria-label={social.name}
              >
                <span className={`icon icon-${social.icon}`}></span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
