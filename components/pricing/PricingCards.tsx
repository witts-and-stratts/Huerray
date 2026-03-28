'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { getCalApi } from '@calcom/embed-react';
import { PricingCard } from './PricingCard';
import { Badge } from '../ui/badge';
import { Check } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';

export function PricingCards() {
  const tCards = useTranslations( 'pricing.cards' );
  const tExtra = useTranslations( 'pricing.extra' );

  useEffect( () => {
    ( async function () {
      const cal = await getCalApi( { namespace: 'enterprise-booking' } );
      cal( 'init', {
        origin: 'https://www.cal.eu',
      } );
      cal( 'ui', {
        hideEventTypeDetails: false,
        layout: 'month_view',
      } );
    } )();
  }, [] );

  const cards = [
    {
      key: 'short',
      highlight: false,
    },
    {
      key: 'medium',
      highlight: true,
    },
    {
      key: 'long',
      highlight: false,
    },
  ];

  const enterpriseFeatures =
    ( tExtra.raw( 'enterprise.features' ) as string[] ) || [];

  return (
    <>
      <section className='pricing-cards'>
        { cards.map( ( card ) => {
          const features =
            ( tCards.raw( `${ card.key }.features` ) as string[] ) || [];
          return (
            <PricingCard
              key={ card.key }
              tag={ tCards( `${ card.key }.tag` ) }
              title={ tCards( `${ card.key }.title` ) }
              price={ tCards( `${ card.key }.price` ) }
              features={ features }
              buttonText={ tCards( 'buttonText' ) }
              disclaimer={ tCards( 'disclaimer' ) }
              highlight={ card.highlight }
            />
          );
        } ) }
      </section>
      <section className='pricing-extra'>
        <div className='pricing-extra__video-card'>
          <video
            className='pricing-extra__video'
            autoPlay
            muted
            loop
            playsInline
          >
            <source src='/videos/ai-generated-content.mp4' type='video/mp4' />
            <source src='/videos/ai-generated-content.webm' type='video/webm' />
          </video>
          <div className='pricing-extra__video-overlay'>
            <h3 className='pricing-extra__video-subtitle'>
              { tExtra( 'ai.subtitle' ) }
            </h3>
            <h2 className='pricing-extra__video-title'>{ tExtra( 'ai.title' ) }</h2>
            <div className='pricing-extra__video-price-wrapper'>
              <span>{ tExtra( 'ai.priceLabel' ) }</span>
              <div className='pricing-card__price'>{ tExtra( 'ai.price' ) }</div>
            </div>

            <Link href="/signup?role=brand" title={ tExtra( 'ai.buttonText' ) } className='cursor-pointer'>
              <Button
                variant='hero'
                className='w-full rounded-full py-6 text-lg font-medium'
              >
                { tExtra( 'ai.buttonText' ) }
              </Button>
            </Link>
          </div>
        </div>
        <div className='pricing-extra__enterprise-wrapper'>
          <div className='pricing-card pricing-card--highlight bg-orange-way'>
            <Badge variant='pill'>{ tExtra( 'enterprise.badge' ) }</Badge>
            <h1 className='pricing-card__title'>
              { tExtra( 'enterprise.title' ) }
            </h1>
            <div className='pricing-card__features'>
              <h6 className='pricing-extra__enterprise-description'>
                { tExtra( 'enterprise.description' ) }
              </h6>
              <ul className='pricing-extra__enterprise-list'>
                { enterpriseFeatures.map( ( feature, index ) => (
                  <li key={ index } className='pricing-card__feature'>
                    <Check className='w-5 h-5 text-white' />
                    <span>{ feature }</span>
                  </li>
                ) ) }
              </ul>
            </div>

            <Button
              variant='hero'
              className='w-full rounded-full py-6 text-lg font-medium'
              data-cal-link='huerray/book-a-free-call'
              data-cal-namespace='enterprise-booking'
              data-cal-origin='https://www.cal.eu'
            >
              { tExtra( 'enterprise.buttonText' ) }
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
