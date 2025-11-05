'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export function CreatorsScroller() {
  const t = useTranslations('creators.categories');

  const creators = [
    { nameKey: 'fashion', image: '/images/creators/creator-1.jpg' },
    { nameKey: 'lifestyle', image: '/images/creators/creator-2.jpg' },
    { nameKey: 'beauty', image: '/images/creators/creator-3.jpg' },
    { nameKey: 'fitness', image: '/images/creators/creator-4.jpg' },
    { nameKey: 'food', image: '/images/creators/creator-5.jpg' },
    { nameKey: 'travel', image: '/images/creators/creator-6.jpg' },
    { nameKey: 'tech', image: '/images/creators/creator-7.jpg' },
    { nameKey: 'healthWellness', image: '/images/creators/creator-8.jpg' },
  ];

  // Duplicate array for seamless infinite scroll
  const scrollItems = Array(3).fill(creators).flat();

  return (
    <section className='creators-scroller'>
      <div className='creators-scroller__track'>
        {scrollItems.map((creator, index) => (
          <div key={index} className='creators-scroller__item'>
            <div className='creators-scroller__avatar'>
              <Image
                src={creator.image}
                alt={t(creator.nameKey)}
                width={120}
                height={120}
                className='creators-scroller__image'
              />
            </div>
            <span className='creators-scroller__label'>{t(creator.nameKey)}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
