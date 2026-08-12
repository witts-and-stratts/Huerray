'use client';

import { useTranslations } from 'next-intl';

export function BrandsSupportSteps() {
  const t = useTranslations( 'brands.support' );

  const steps = [
    { number: '01', title: t( 'step1.title' ), description: t( 'step1.description' ) },
    { number: '02', title: t( 'step2.title' ), description: t( 'step2.description' ) },
    { number: '03', title: t( 'step3.title' ), description: t( 'step3.description' ) },
    { number: '04', title: t( 'step4.title' ), description: t( 'step4.description' ) },
  ];

  return (
    <section id='support' className='brands-support'>
      <div className='brands-support__intro'>
        <span className='brands-support__eyebrow'>{ t( 'eyebrow' ) }</span>
        <h2 className='gradient-text brands-support__title'>{ t( 'title' ) }</h2>
        <p className='brands-support__description'>{ t( 'description' ) }</p>
      </div>
      <div className='brands-support__steps'>
        { steps.map( ( step ) => (
          <article key={ step.number } className='brands-support__step'>
            <b className='brands-support__step-number'>{ step.number }</b>
            <h3 className='brands-support__step-title'>{ step.title }</h3>
            <p className='brands-support__step-description'>{ step.description }</p>
          </article>
        ) ) }
      </div>
    </section>
  );
}
