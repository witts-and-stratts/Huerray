'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Loader2, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { NewsletterApi } from '@/lib/api/generated/api/newsletter-api';
import { apiClient } from '@/lib/api/client';
import { AnimatePresence, motion } from 'motion/react';

const newsletterApi = new NewsletterApi( undefined, undefined, apiClient );

type State = 'idle' | 'loading' | 'success' | 'error';

export function FooterSignupForm() {
  const [ email, setEmail ] = useState( '' );
  const [ state, setState ] = useState<State>( 'idle' );
  const t = useTranslations( 'footer.signup' );

  const handleSubmit = async ( e: React.FormEvent ) => {
    e.preventDefault();
    if ( !email || state === 'loading' ) return;
    setState( 'loading' );
    try {
      await newsletterApi.newsletterSignupPost( { request: { email } } );
      setState( 'success' );
      setEmail( '' );
    } catch {
      setState( 'error' );
    }
  };

  const handleCloseSuccess = () => {
    setState( 'idle' );
  };

  return (
    <AnimatePresence>
      { state === 'success' && (
        <motion.div
          className='footer__signup'
          initial={ { opacity: 0, y: -20 } }
          animate={ { opacity: 1, y: 0 } }
          exit={ { opacity: 0, y: -20 } }
          transition={ { duration: 1 } }
        >
          <h3 className='footer__signup-title h6'>{ t( 'title' ) }</h3>
          <p className='footer__signup-success bg-white/30 border-px border-white/80 px-4 py-2 rounded-lg relative'>{ t( 'success' ) }<X className='size-5 absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer' strokeWidth={ 1 } onClick={ handleCloseSuccess } /></p>
        </motion.div>
      )
      }

      { state !== 'success' && (
        <motion.div
          initial={ { opacity: 0, y: -20 } }
          animate={ { opacity: 1, y: 0 } }
          exit={ { opacity: 0, y: -20 } }
          transition={ { duration: 1 } }
          className='footer__signup'>
          <h3 className='footer__signup-title h6'>{ t( 'title' ) }</h3>
          <form onSubmit={ handleSubmit } className='footer__signup-form'>
            <Input
              type='email'
              placeholder={ t( 'placeholder' ) }
              value={ email }
              onChange={ ( e ) => setEmail( e.target.value ) }
              className='footer__signup-input'
              disabled={ state === 'loading' }
              required
            />
            <button
              type='submit'
              className='footer__signup-button'
              aria-label='Submit'
              disabled={ state === 'loading' }
            >
              { state === 'loading'
                ? <Loader2 className='size-6 animate-spin' strokeWidth={ 1.5 } />
                : <span className='icon icon-right-arrow' />
              }
            </button>
          </form>
          { state === 'error' && (
            <p className='footer__signup-error'>{ t( 'error' ) }</p>
          ) }
        </motion.div>
      ) }
    </AnimatePresence>
  );
}
