'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export function CareerWhy() {
  const t = useTranslations( 'career.careerWhy' );

  return (
    <section className="career-why section-card section-card--spaced section-card--light">
      <div>
        <h2 className="career-why__main-title gradient-text">
          { t( 'mainTitle' ) }
        </h2>
        <div className="career-why__grid">
          <div className="career-why__content">
            <h3 className="career-why__subtitle gradient-text">
              { t( 'subtitle' ) }
            </h3>
            <div>
              <p className="career-why__description">
                { t( 'description1' ) }
              </p>
              <p className="career-why__description--last">
                { t( 'description2' ) }
              </p>
            </div>
          </div>
          <div className="career-why__image-wrapper">
            <Image
              src="/images/7d276a19cd69b3c1a8c1f90f9d7393131ea00d7e.webp"
              alt={ t( 'imageAlt' ) }
              width={ 400 }
              height={ 400 }
              className="career-why__image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
