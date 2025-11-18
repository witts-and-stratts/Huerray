'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export function CreatorsTestimonial() {
  const t = useTranslations('creators.testimonial');

  return (
    <section className='creators-testimonial relative -z-10'>
      <div className='creators-testimonial__container'>
        <div className='creators-testimonial__content'>
          <blockquote className='creators-testimonial__quote'>
            {t('quote')}
          </blockquote>
          <cite className='creators-testimonial__author'>{t('author')}</cite>
        </div>

        <div className='creators-testimonial__image'>
          <Image
            src='/images/creators/testimonial-baron-mchennnie.jpg'
            alt='Creator testimonial'
            width={545}
            height={571}
            className='creators-testimonial__img'
          />
        </div>
      </div>
    </section>
  );
}
