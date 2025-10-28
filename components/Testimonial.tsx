'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useTranslations } from 'next-intl';

export function Testimonial() {
  const t = useTranslations('home.testimonial');

  return (
    <section className='px-2 md:px-10 py-20 relative text-center'>
      <div className='mx-auto rounded-4xl p-8 md:p-16 relative bg-burgundy-50 flex flex-col gap-10 border-4 border-white border-t-0 border-l-0'>
        <p className='h6 font-bold text-dark-burgundy'>{t('company')}</p>
        <p className='h6 md:max-w-3/4 mx-auto text-slate'>
          &ldquo;{t('quote')}&rdquo;
        </p>
        <div className='flex flex-col items-center gap-4'>
          <Avatar className='w-16 h-16'>
            <AvatarImage
              src='/images/testimonials/jorens-avatar.jpg'
              alt={t('author')}
            />
            <AvatarFallback>JN</AvatarFallback>
          </Avatar>
          <div>
            <p className='font-secondary font-normal text-base'>
              {t('author')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
