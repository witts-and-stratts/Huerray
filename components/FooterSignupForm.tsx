'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';

export function FooterSignupForm() {
  const [email, setEmail] = useState('');
  const t = useTranslations('footer.signup');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email submission
    console.log('Email submitted:', email);
  };

  return (
    <div className='footer__signup'>
      <h3 className='footer__signup-title h6'>{t('title')}</h3>
      <form onSubmit={handleSubmit} className='footer__signup-form'>
        <Input
          type='email'
          placeholder={t('placeholder')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='footer__signup-input'
        />
        <button
          type='submit'
          className='footer__signup-button'
          aria-label='Submit'
        >
          <span className='icon icon-right-arrow' />
        </button>
      </form>
    </div>
  );
}
