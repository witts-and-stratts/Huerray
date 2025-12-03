'use client';

import { useTranslations } from 'next-intl';
import { CreatorsScroller } from '../creators/CreatorsScroller';

export function AboutWhy() {
  const t = useTranslations('about.why');

  return (
    <section className='section-card section-card--spaced section-card--light mt-10'>
      <div className='section-card__container'>
        <div className='section-card__content'>
          <h2 className='text-h3 font-secondary text-purple-900! mb-1!'>
            Our Why
          </h2>
          <h2 className='text-h2 font-heading gradient-text'>
            Marketing that represents real people performs and feels better
          </h2>
          <p className='section-card__description'>
            At Huerray we believe inclusion isn’t a checkbox: it’s the creative
            standard. We help brands reach diverse audiences through content
            that’s human, relatable and rooted in lived experience.
          </p>
        </div>
        <div>
          <CreatorsScroller perPageDesktop={1.5} />
        </div>
      </div>
    </section>
  );
}
