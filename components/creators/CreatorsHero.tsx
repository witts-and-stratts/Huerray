'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export function CreatorsHero() {
  const tCommon = useTranslations('common');
  const t = useTranslations('creators.hero');

  return (
    <div className='hero creators-hero'>
      {/* Hero Section */}
      <section className='hero__section creators-hero__section'>
        <div className='hero__container'>
          <div className='hero__content'>
            <h1 className='gradient-text hero__title'>{t('title')}</h1>
            <h2 className='hero__subtitle'>{t('subtitle')}</h2>
            <Button variant='hero' size='xl'>
              {t('buttonText')}
            </Button>
          </div>

          <Image
            src='/images/confetti.svg'
            alt='Confetti Decoration'
            width={1000}
            height={1000}
            className='creators-hero__decoration'
          />

          {/* Hero Image Grid - Horizontal rows on mobile, vertical columns on desktop */}
          <div className='creators-hero__images'>
            {/* Creator Images */}
            {/* Main girl image */}
            <div className='creators-hero__main-image'>
              <Image
                src='/images/creators/main-girl.jpg'
                alt='Creator'
                width={800}
                height={800}
              />
            </div>
            {/* Makeup girl image - top right */}
            <div className='creators-hero__secondary-image'>
              <Image
                src='/images/creators/makeup-girl.jpg'
                alt='Creator'
                width={177}
                height={153}
              />
            </div>
            {/* Payment Card */}
            <div className='creators-hero__payment-card'>
              <div className='creators-hero__payment-avatar'>
                <Image
                  src='/images/creators/payment-avatar.jpg'
                  alt='Avatar'
                  width={93}
                  height={93}
                />
              </div>
              <div className='creators-hero__payment-content'>
                <p className='creators-hero__payment-title'>Payment made</p>
                <div className='creators-hero__payment-bar' />
                <div className='creators-hero__payment-bar--short' />
              </div>
            </div>
            {/* Sample teaser card - right side */}
            <div className='creators-hero__teaser-card'>
              <Image
                src={'/images/creators/sample-teaser.svg'}
                alt='Teaser'
                width={246}
                height={150}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  // return (
  // <section className='creators-hero__section'>
  //   <div className='creators-hero__container'>
  //     {/* Content */}
  //     <div className='creators-hero__content'>
  //       <h1 className='gradient-text creators-hero__title'>{t('title')}</h1>
  //       <p className='creators-hero__subtitle'>{t('subtitle')}</p>
  //       <Button variant='hero' size='xl'>
  //         {t('buttonText')}
  //       </Button>
  //     </div>

  //     {/* Images */}
  //     <div className='creators-hero__images'>
  //       {/* Decorative SVG shapes */}
  //       <svg className='creators-hero__decoration creators-hero__decoration--1' viewBox='0 0 100 100'>
  //         <path d='M10,50 Q30,20 50,50 T90,50' stroke='#FFD700' strokeWidth='4' fill='none' />
  //       </svg>
  //       <svg className='creators-hero__decoration creators-hero__decoration--2' viewBox='0 0 50 50'>
  //         <circle cx='25' cy='25' r='20' fill='#00BFFF' />
  //       </svg>
  //       <svg className='creators-hero__decoration creators-hero__decoration--3' viewBox='0 0 50 50'>
  //         <polygon points='25,5 45,45 5,45' fill='#32CD32' />
  //       </svg>
  //       <svg className='creators-hero__decoration creators-hero__decoration--4' viewBox='0 0 100 50'>
  //         <path d='M10,25 Q30,5 50,25 T90,25' stroke='#FF69B4' strokeWidth='3' fill='none' />
  //       </svg>
  //       <svg className='creators-hero__decoration creators-hero__decoration--5' viewBox='0 0 50 50'>
  //         <polygon points='25,10 40,25 25,40 10,25' fill='#FFD700' />
  //       </svg>
  //       <svg className='creators-hero__decoration creators-hero__decoration--6' viewBox='0 0 60 60'>
  //         <path d='M10,30 L50,30 M30,10 L30,50' stroke='#00BFFF' strokeWidth='4' />
  //       </svg>
  //       <svg className='creators-hero__decoration creators-hero__decoration--7' viewBox='0 0 80 80'>
  //         <path d='M20,40 Q40,10 60,40' stroke='#FF6B35' strokeWidth='4' fill='none' />
  //       </svg>
  //       <svg className='creators-hero__decoration creators-hero__decoration--8' viewBox='0 0 60 60'>
  //         <circle cx='30' cy='30' r='20' fill='#FFD700' opacity='0.6' />
  //       </svg>

  //       {/* Main creator image */}
  //       <div className='creators-hero__main-image'>
  //         <Image
  //           src='/images/creators/creator-1.jpg'
  //           alt='Creator'
  //           width={545}
  //           height={470}
  //           className='creators-hero__image'
  //         />
  //       </div>

  //       {/* Secondary creator image - makeup girl */}
  //       <div className='creators-hero__secondary-image creators-hero__secondary-image--makeup'>
  //         <Image
  //           src='/images/creators/creator-2.jpg'
  //           alt='Creator'
  //           width={177}
  //           height={153}
  //           className='creators-hero__image'
  //         />
  //       </div>

  //       {/* Secondary image - sample teaser */}
  //       <div className='creators-hero__secondary-image creators-hero__secondary-image--sample'>
  //         <Image
  //           src='/images/creators/creator-3.jpg'
  //           alt='Creator content'
  //           width={254}
  //           height={126}
  //           className='creators-hero__image'
  //         />
  //       </div>

  //       {/* Payment notification mockup */}
  //       <div className='creators-hero__payment-card'>
  //         <div className='creators-hero__payment-avatar'>
  //           <Image
  //             src='/images/creators/creator-4.jpg'
  //             alt='User'
  //             width={93}
  //             height={93}
  //             className='creators-hero__payment-avatar-img'
  //           />
  //         </div>
  //         <div className='creators-hero__payment-info'>
  //           <span className='creators-hero__payment-title'>
  //             {t('paymentMade')}
  //           </span>
  //           <div className='creators-hero__payment-line' />
  //           <div className='creators-hero__payment-line creators-hero__payment-line--short' />
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // </section>
  // );
}
