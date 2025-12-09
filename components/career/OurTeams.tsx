'use client';

import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

export function OurTeams() {
  const t = useTranslations( 'career.ourTeams' );

  const teams = [
    {
      title: t( 'teams.0.title' ),
      text: t( 'teams.0.text' ),
      flex: 'flex-2'
    },
    {
      title: t( 'teams.1.title' ),
      text: t( 'teams.1.text' ),
      flex: 'flex-2'
    },
    {
      title: t( 'teams.2.title' ),
      text: t( 'teams.2.text' ),
      flex: 'flex-1'
    },
    {
      title: t( 'teams.3.title' ),
      text: t( 'teams.3.text' ),
      flex: 'flex-1'
    },
    {
      title: t( 'teams.4.title' ),
      text: t( 'teams.4.text' ),
      flex: 'flex-1'
    },
    {
      title: t( 'teams.5.title' ),
      text: t( 'teams.5.text' ),
      flex: 'flex-1'
    },
    {
      title: t( 'teams.6.title' ),
      text: t( 'teams.6.text' ),
      flex: 'flex-1'
    },
    {
      title: t( 'teams.7.title' ),
      text: t( 'teams.7.text' ),
      flex: 'flex-1'
    }
  ];

  return (
    <section className="our-teams bg-stone-orange">
      <h2 className="our-teams__title">{ t( 'title' ) }</h2>
      <div className="our-teams__grid">
        { teams.map( ( { title, text, flex }, index ) => (
          <div
            key={ index }
            className={ cn(
              'our-teams__card',
              flex === 'flex-2' ? 'our-teams__card--flex-2' : 'our-teams__card--flex-1'
            ) }
          >
            <div className="our-teams__card-content">
              <h4 className="our-teams__card-title">{ title }</h4>
              <p className="our-teams__card-text">{ text }</p>
            </div>
          </div>
        ) ) }
      </div>
    </section>
  );
}
