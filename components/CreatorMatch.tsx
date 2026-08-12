'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

const tiles = [
  { key: 'beauty', src: '/images/creators/making-presentation-new-facial-cream.webp' },
  { key: 'food', src: '/images/content/content-1.webp' },
  { key: 'fitness', src: '/images/creators/woman-training-outdoors.webp' },
  { key: 'lifestyle', src: '/images/content/lifestyle-1.webp' },
  { key: 'product', src: '/images/content/product-1.webp' },
];

export function CreatorMatch() {
  const t = useTranslations( 'home.creatorMatch' );

  return (
    <section className='creator-match'>
      <h2 className='creator-match__title gradient-text'>{ t( 'title' ) }</h2>
      <div className='creator-match__strip'>
        { tiles.map( ( tile ) => (
          <div key={ tile.key } className='creator-match__tile'>
            <Image src={ tile.src } alt={ t( `categories.${ tile.key }` ) } fill className='object-cover' />
            <span className='creator-match__tag'>{ t( `categories.${ tile.key }` ) }</span>
          </div>
        ) ) }
      </div>
    </section>
  );
}
