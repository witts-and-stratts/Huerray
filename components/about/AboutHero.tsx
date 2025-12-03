'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export function AboutHero() {
  const t = useTranslations('about.hero');

  return (
    <div className='about-hero bg-textured-gradient-background'>
      <section className='about-hero__section'>
        <div className='about-hero__container'>
          <div className='about-hero__content'>
            <h1 className='hero__title about-hero__title'>
              Huerray <br />
              Every Hue. Every Story
            </h1>
            <h2 className='hero__subtitle about-hero__subtitle'>
              We connect brands with creators from underrepresented communities
              to build authentic UGC that converts — culturally rich,
              emotionally real, and designed for today’s social feeds.
            </h2>
          </div>

          {/* Hero Image Grid */}
          <div className='about-hero__images'>
            <div className='about-hero__main-column'>
              <Image
                src='/images/about/28060ca24f97badeac0a79aa1e519e59cd2f957a.png'
                alt='Main creator'
                width={700}
                height={700}
                className='about-hero__main-image'
              />
            </div>
            <div className='about-hero__side-column'>
              <Image
                src='/images/about/15164edd8d903dd9c6ac790fe7b93b7d1ce68751.png'
                alt='Creator content'
                width={400}
                height={400}
                className='about-hero__tall-image'
              />
              <Image
                src='/images/about/2b4fcd641a40b38ac8c0c0baee83f57ee33e4134.png'
                alt='Creator portrait'
                width={400}
                height={300}
                className='about-hero__circle-image'
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
