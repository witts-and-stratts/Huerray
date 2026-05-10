'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import type { OpenPosition } from '@/sanity/lib/careers';
import { CareerOpportunityDialog } from './CareerOpportunityDialog';

type CareerOpportunitiesProps = {
  openPositions?: OpenPosition[];
};

function getLocalizedValue<T>(
  value: Record<string, T | undefined> | undefined,
  locale: string,
  fallback: T,
) {
  if ( !value ) return fallback;

  return value[ locale ] ?? value.en ?? Object.values( value ).find( ( item ): item is T => item !== undefined ) ?? fallback;
}

export function CareerOpportunities( { openPositions }: CareerOpportunitiesProps ) {
  const t = useTranslations( 'career.opportunities' );
  const locale = useLocale();
  const [ activeOpportunity, setActiveOpportunity ] = useState<OpenPosition | null>( null );

  const opportunities = openPositions?.map( ( position, index ) => ( {
    key: position._id || `${ index }`,
    position,
    category: getLocalizedValue( position.department, locale, t( `jobs.${ index }.category` ) ),
    title: getLocalizedValue( position.title, locale, t( `jobs.${ index }.title` ) ),
    location: getLocalizedValue( position.location, locale, t( `jobs.${ index }.location` ) ),
    applyUrl: position.applyUrl ?? '#',
  } ) ) ?? [
      {
        key: '0',
        position: null,
        category: t( 'jobs.0.category' ),
        title: t( 'jobs.0.title' ),
        location: t( 'jobs.0.location' ),
        applyUrl: '#',
      },
      {
        key: '1',
        position: null,
        category: t( 'jobs.1.category' ),
        title: t( 'jobs.1.title' ),
        location: t( 'jobs.1.location' ),
        applyUrl: '#',
      },
      {
        key: '2',
        position: null,
        category: t( 'jobs.2.category' ),
        title: t( 'jobs.2.title' ),
        location: t( 'jobs.2.location' ),
        applyUrl: '#',
      },
    ];
  const buttonLabel = t( 'button' );

  return (
    <section className="career-opportunities" id="open-positions">
      <div className="career-opportunities__container">
        <h2 className="career-opportunities__title gradient-text">
          { t( 'title' ) }
        </h2>
        <p className="career-opportunities__subtitle">
          { t( 'subtitle' ) }
        </p>

        <div className="career-opportunities__list">
          { opportunities.map( ( opportunity ) => (
            <div key={ opportunity.key } className="career-opportunity-card">
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
              <Button
                variant="heroAlt"
                className="career-opportunity-card__button"
                size="lg"
                type="button"
                onClick={ () => setActiveOpportunity( opportunity.position ) }
              >
                { buttonLabel }
              </Button>
            </div>
          ) ) }
        </div>
      </div>
      <CareerOpportunityDialog
        open={ !!activeOpportunity }
        onOpenChange={ ( open ) => !open && setActiveOpportunity( null ) }
        opportunity={ activeOpportunity }
      />
    </section>
  );
}
