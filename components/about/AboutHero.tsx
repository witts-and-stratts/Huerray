'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export function AboutHero() {
  const t = useTranslations( 'about.hero' );

  return (
    <div className="about-hero bg-textured-gradient-background">
      <section className="about-hero__section">
        <div className="about-hero__container">
          <div className="about-hero__content">
            <h1 className="hero__title about-hero__title">
              { t( 'title' ) }
            </h1>
            <h2 className="hero__subtitle about-hero__subtitle">
              { t( 'subtitle' ) }
            </h2>
          </div>

          {/* Hero Image Grid */ }
          <div className="about-hero__images">
            <div className="about-hero__main-column">
              <Image
                src="/images/about/main-creator.webp"
                alt="Main creator"
                width={ 700 }
                height={ 700 }
                className="about-hero__main-image"
              />
            </div>
            <div className="about-hero__side-column">
              <Image
                src="/images/about/creator-content.webp"
                alt="Creator content"
                width={ 400 }
                height={ 400 }
                className="about-hero__tall-image"
              />
              <Image
                src="/images/about/creator-portrait.webp"
                alt="Creator portrait"
                width={ 400 }
                height={ 300 }
                className="about-hero__circle-image"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
