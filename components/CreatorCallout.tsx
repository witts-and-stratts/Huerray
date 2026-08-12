'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';

export function CreatorCallout() {
  const t = useTranslations( 'home.creatorCallout' );

  return (
    <section className='creator-callout'>
      <div className='creator-callout__content'>
        <p className='creator-callout__eyebrow'>{ t( 'eyebrow' ) }</p>
        <h2 className='creator-callout__title'>{ t( 'title' ) }</h2>
        <p className='creator-callout__description'>{ t( 'description' ) }</p>
        <Button variant='hero' size='lg' className='min-w-70' asChild>
          <Link href='/signup?role=creator' title={ t( 'button' ) }>{ t( 'button' ) }</Link>
        </Button>
      </div>
      <div className='creator-callout__photo'>
        <Image src='/images/creators/main-girl-2.webp' alt='Creator' fill className='object-cover' />
      </div>
    </section>
  );
}
