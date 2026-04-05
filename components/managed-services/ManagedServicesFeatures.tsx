'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

const featureImages = [
  [
    '/images/creators/creator-1.webp',
    '/images/creators/creator-2.webp',
    '/images/creators/creator-3.webp',
  ],
  [
    '/images/creators/creator-4.webp',
    '/images/creators/creator-5.webp',
    '/images/creators/makeup-girl.webp',
  ],
  [
    '/images/creators/expressive-young-girl-posing-indoor.webp',
    '/images/creators/happy-black-female-influencer-unpacking-box-with-clothes-recording-video-cellphone-camera.webp',
    '/images/creators/main-girl-2.webp',
  ],
];

export function ManagedServicesFeatures() {
  const t = useTranslations( 'managed-services.features' );

  const items =
    ( t.raw( 'items' ) as Array<{ title: string; description: string }> ) || [];

  return (
    <section className='creators-benefits'>
      <div className='creators-benefits__container'>
        <h2 className='gradient-text creators-benefits__heading'>
          { t( 'title' ) }
        </h2>

        <div className='creators-benefits__grid'>
          { items.map( ( item, i ) => (
            <div key={ i } className='creators-benefits__card'>
              <div className='creators-benefits__card-image'>
                <div className='flex gap-1 h-full'>
                  { featureImages[ i ].map( ( src, j ) => (
                    <div key={ j } className='relative flex-1 overflow-hidden'>
                      <Image
                        src={ src }
                        alt='Creator'
                        fill
                        className='object-cover'
                      />
                    </div>
                  ) ) }
                </div>
              </div>
              <div className='creators-benefits__card-content'>
                <h3 className='creators-benefits__card-title'>{ item.title }</h3>
                <p className='creators-benefits__card-description'>
                  { item.description }
                </p>
              </div>
            </div>
          ) ) }
        </div>
      </div>
    </section>
  );
}
