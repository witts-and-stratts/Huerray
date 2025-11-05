'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

const benefitImages = [
  '/images/content/content-1.jpg',
  '/images/content/content-2.jpg',
  '/images/content/content-3.jpg',
  '/images/content/content-4.jpg',
  '/images/content/content-5.jpg',
  '/images/content/content-6.jpg',
];

export function CreatorsBenefits() {
  const t = useTranslations('creators.benefits');

  const benefits = [
    {
      title: t('authentic.title'),
      description: t('authentic.description'),
      image: benefitImages[0],
    },
    {
      title: t('collaboration.title'),
      description: t('collaboration.description'),
      image: benefitImages[1],
    },
    {
      title: t('monetize.title'),
      description: t('monetize.description'),
      image: benefitImages[2],
    },
    {
      title: t('creative.title'),
      description: t('creative.description'),
      image: benefitImages[3],
    },
    {
      title: t('support.title'),
      description: t('support.description'),
      image: benefitImages[4],
    },
    {
      title: t('grow.title'),
      description: t('grow.description'),
      image: benefitImages[5],
    },
  ];

  return (
    <section className='creators-benefits'>
      <div className='creators-benefits__container'>
        <h2 className='gradient-text creators-benefits__heading'>
          {t('heading')}
        </h2>

        <div className='creators-benefits__grid'>
          {benefits.map((benefit, index) => (
            <div key={index} className='creators-benefits__card'>
              <div className='creators-benefits__card-image'>
                <Image
                  src={benefit.image}
                  alt={benefit.title}
                  width={400}
                  height={300}
                  className='creators-benefits__image'
                />
              </div>
              <div className='creators-benefits__card-content'>
                <h3 className='creators-benefits__card-title'>
                  {benefit.title}
                </h3>
                <p className='creators-benefits__card-description'>
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
