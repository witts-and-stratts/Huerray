'use client';

import { useTranslations } from 'next-intl';
import { CreatorsScroller } from '../creators/CreatorsScroller';

export function AboutWhy() {
  const t = useTranslations( 'about.why' );

  return (
    <section className="section-card section-card--spaced section-card--light mt-10">
      <div className="section-card__container">
        <div className="section-card__content">
          <h2 className="about-why__pill">
            { t( 'pill' ) }
          </h2>
          <h2 className="about-why__title gradient-text">
            { t( 'title' ) }
          </h2>
          <p className="section-card__description">
            { t( 'description' ) }
          </p>
        </div>
        <div>
          <CreatorsScroller perPageDesktop={ 1.5 } />
        </div>
      </div>
    </section>
  );
}
