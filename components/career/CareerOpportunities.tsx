'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';

export function CareerOpportunities() {
  const t = useTranslations( 'career.opportunities' );

  const opportunities = [
    {
      category: t( 'jobs.0.category' ),
      title: t( 'jobs.0.title' ),
      location: t( 'jobs.0.location' ),
    },
    {
      category: t( 'jobs.1.category' ),
      title: t( 'jobs.1.title' ),
      location: t( 'jobs.1.location' ),
    },
    {
      category: t( 'jobs.2.category' ),
      title: t( 'jobs.2.title' ),
      location: t( 'jobs.2.location' ),
    },
  ];

  return (
    <section className="career-opportunities">
      <div className="career-opportunities__container">
        <h2 className="career-opportunities__title gradient-text">
          { t( 'title' ) }
        </h2>
        <p className="career-opportunities__subtitle">
          { t( 'subtitle' ) }
        </p>

        <div className="career-opportunities__list">
          { opportunities.map( ( opportunity, index ) => (
            <div key={ index } className="career-opportunity-card">
              <div className="career-opportunity-card__content">
                <h3 className="career-opportunity-card__category gradient-text">
                  { opportunity.category }
                </h3>
                <h4 className="career-opportunity-card__title">
                  { opportunity.title }
                </h4>
                <p className="career-opportunity-card__location">
                  { opportunity.location }
                </p>
              </div>
              <Button variant="heroAlt" className="career-opportunity-card__button" size="lg">
                { t( 'button' ) }
              </Button>
            </div>
          ) ) }
        </div>
      </div>
    </section>
  );
}
