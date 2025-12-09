'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Button } from '../ui/button';

export function CareerHero() {
  const t = useTranslations( 'career.hero' );

  return (
    <div className="career-hero bg-textured-gradient-background ">
      <section className="career-hero__section about-hero__section">
        <div className="career-hero__content">
          <h1 className="career-hero__title hero__title about-hero__title ">
            { t( 'title' ) }
          </h1>
          <h2 className="career-hero__subtitle">
            { t( 'subtitle' ) }
          </h2>

          <Button variant="hero" className="career-hero__button">
            { t( 'buttonText' ) }
          </Button>
        </div>
      </section>

      <div className="career-hero__media-grid">
        <div className="career-hero__video-wrapper">
          <video
            className="career-hero__video"
            autoPlay
            muted
            loop
            playsInline
          >
            <source
              src="/videos/young-woman-showcasing-fashion.mp4"
              type="video/mp4"
            />
            <source
              src="/videos/young-woman-showcasing-fashion.webm"
              type="video/webm"
            />
          </video>
        </div>
        <div className="career-hero__images-grid">
          <div className="career-hero__main-column">
            <Image
              src="/images/about/28060ca24f97badeac0a79aa1e519e59cd2f957a.webp"
              alt={ t( 'imageAlt1' ) }
              width={ 700 }
              height={ 700 }
              className="career-hero__main-image about-hero__main-image"
            />
          </div>
          <div className="career-hero__side-column">
            <Image
              src="/images/about/15164edd8d903dd9c6ac790fe7b93b7d1ce68751.webp"
              alt={ t( 'imageAlt2' ) }
              width={ 400 }
              height={ 400 }
              className="career-hero__tall-image"
            />
            <Image
              src="/images/about/2b4fcd641a40b38ac8c0c0baee83f57ee33e4134.webp"
              alt={ t( 'imageAlt3' ) }
              width={ 400 }
              height={ 300 }
              className="career-hero__circle-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
