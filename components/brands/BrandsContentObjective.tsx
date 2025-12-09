'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { TextListItem } from '../ui/TextListItem';
import { TextList } from '../ui/TextList';

export function BrandsContentObjective() {
  const t = useTranslations('brands.contentObjective');

  const listItems = [
    t('listItems.item1'),
    t('listItems.item2'),
    t('listItems.item3'),
  ];

  return (
    <section className='section-card section-card--pink mt-10 z-100'>
      <div className='section-card__container'>
        {/* Left - Image Collage */ }
        <div className='section-card__image flex flex-col gap-4'>
          <Image
            src='/images/brands/content-objective/ff36e4040fea432abfe66356bcfa58ee12e20e25.webp'
            alt='Creator content'
            width={ 545 }
            height={ 282 }
            className='section-card__img'
          />
          <div className='grid grid-cols-6 gap-4 h-40'>
            <div className='rounded-[64px] overflow-hidden col-span-4'>
              <Image
                src='/images/brands/content-objective/orange-products.webp'
                alt='Beauty products'
                width={ 262 }
                height={ 172 }
                className='object-cover w-full h-full'
              />
            </div>
            <div className='rounded-[64px] overflow-hidden col-span-2'>
              <Image
                src='/images/brands/content-objective/woman-yellow.webp'
                alt='Creator'
                width={ 262 }
                height={ 172 }
                className='object-cover w-full h-full'
              />
            </div>
          </div>
        </div>
        <div className='section-card__content'>

          {/* Right - Content */ }
          <div className='section-card__content section-card__content--right'>
            <span className='section-card__pill'>{t('pill')}</span>

            <h2 className='section-card__title gradient-text'>
              {t('title')}
            </h2>

            <p className='section-card__description'>
              {t('description')}
            </p>

            <TextList list={ listItems } />
          </div>
        </div>
      </div>
    </section>
  );
}
