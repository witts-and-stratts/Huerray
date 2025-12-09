'use client';

import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export function AboutTeam() {
  const t = useTranslations( 'about.team' );

  // Get team members from translations
  const teamMembers = [
    {
      name: t( 'members.0.name' ),
      bio: t( 'members.0.bio' ),
    },
    {
      name: t( 'members.1.name' ),
      bio: t( 'members.1.bio' ),
    },
    {
      name: t( 'members.2.name' ),
      bio: t( 'members.2.bio' ),
    },
  ];

  return (
    <section className="about-team">
      <h3 className="about-team__subtitle">{ t( 'subtitle' ) }</h3>
      <h2 className="about-team__title">
        { t( 'title' ) }
      </h2>

      <p className="about-team__description">
        { t( 'description' ) }
      </p>

      <div className="about-team__grid">
        <div className="max-lg:hidden"></div>
        { teamMembers.map( ( member, index ) => (
          <div key={ index } className={ cn( 'about-team__member-card' ) }>
            <Image
              src={ `/images/about/team/${ index + 1 }.png` }
              alt={ member.name }
              width={ 300 }
              height={ 300 }
              className="about-team__member-image"
            />
            <h4 className="about-team__member-name">{ member.name }</h4>
            <p className="about-team__member-bio">{ member.bio }</p>
          </div>
        ) ) }
      </div>
    </section>
  );
}
