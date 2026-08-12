'use client';

import { useTranslations } from 'next-intl';

export function CreatorsHowItWorks() {
  const t = useTranslations( 'creators.howItWorks' );

  const steps = [
    { number: '01', title: t( 'step1.title' ), description: t( 'step1.description' ) },
    { number: '02', title: t( 'step2.title' ), description: t( 'step2.description' ) },
    { number: '03', title: t( 'step3.title' ), description: t( 'step3.description' ) },
    { number: '04', title: t( 'step4.title' ), description: t( 'step4.description' ) },
  ];

  return (
    <section id='how-creators' className='creators-how'>
      <div className='creators-how__intro'>
        <span className='creators-how__eyebrow'>{ t( 'eyebrow' ) }</span>
        <h2 className='gradient-text creators-how__title'>{ t( 'title' ) }</h2>
        <p className='creators-how__description'>{ t( 'description' ) }</p>
      </div>
      <div className='creators-how__steps'>
        { steps.map( ( step ) => (
          <article key={ step.number } className='creators-how__step'>
            <b className='creators-how__step-number'>{ step.number }</b>
            <h3 className='creators-how__step-title'>{ step.title }</h3>
            <p className='creators-how__step-description'>{ step.description }</p>
          </article>
        ) ) }
      </div>
    </section>
  );
}
