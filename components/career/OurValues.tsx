'use client';

import { useTranslations } from 'next-intl';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';

export function OurValues() {
  const t = useTranslations( 'career.ourValues' );

  const ourValues = [
    {
      title: t( 'values.0.title' ),
      text: t( 'values.0.text' ),
    },
    {
      title: t( 'values.1.title' ),
      text: t( 'values.1.text' ),
    },
    {
      title: t( 'values.2.title' ),
      text: t( 'values.2.text' ),
    },
    {
      title: t( 'values.3.title' ),
      text: t( 'values.3.text' ),
    },
  ];

  return (
    <section className="our-values">
      <section className="our-values__container">
        <h3 className="our-values__title-wrapper">
          <span className="our-values__title-text gradient-text">{ t( 'title' ) }</span>
        </h3>
        <Splide options={
          {
            type: 'loop',
            drag: 'free',
            perPage: 4,
            pagination: false,
            arrows: false,
            gap: '1rem',
          } } extensions={ { AutoScroll } } className='our-values__list'>
          { ourValues.map( ( { title, text }, index ) => (
            <SplideSlide key={ index } className="our-values__card mt-2!">
              <div className="our-values__card-content">
                <h4 className="our-values__card-title">{ title }</h4>
                <p className="our-values__card-text">{ text }</p>
              </div>
            </SplideSlide>
          ) ) }
        </Splide>
      </section>
    </section >
  );
}
