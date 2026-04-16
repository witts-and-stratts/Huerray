'use client';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';


import { useTranslations } from 'next-intl';
import Image from 'next/image';

type TextCard = {
  title: string;
  text: string;
};

export function AboutWhatWeDo() {
  const t = useTranslations( 'about.whatWeDo' );
  const whatWeDo = t.raw( 'items' ) as TextCard[];
  const ourPromise = t.raw( 'promise.items' ) as TextCard[];

  return (
    <section className='section-card section-card--spaced section-card--pink overflow-visible! mb-20'>
      <h2 className='h3 gradient-text'>{ t( 'pill' ) }</h2>

      <h3 className='text-h3 font-secondary mt-20 gradient-text'>
        { t( 'title' ) }
      </h3>

      <p className='text-h5 text-dark-burgundy md:max-w-7/10 mt-4'>
        { t( 'description' ) }
      </p>

      <div className='grid md:grid-cols-12 mt-8'>
        <div className='col-span-5'>
          { whatWeDo.map( ( { title, text }, index ) => (
            <div
              key={ index }
              className='bg-white rounded-2xl p-4 inline-block mb-2'
            >
              <h4 className='text-h6c text-dark-burgundy font-medium'>
                { title }
              </h4>
              <p>{ text }</p>
            </div>
          ) ) }
        </div>

        <div className='col-span-7'>
          <Image
            src='/images/what-wedo-collage.webp'
            alt={ t( 'imageAlt' ) }
            width={ 800 }
            height={ 800 }
            className='max-md:scale-120 md:w-[40000px]! mx:max-w-auto! translate-x-[20%]'
          />
        </div>
      </div>

      <div className='w-full p-6 border border-dark-burgundy rounded-3xl mt-20 relative'>
        <h3 className='absolute -top-8 -left-4 px-4 py-2 bg-fuchsia-100'>
          <span className='gradient-text text-h5'>{ t( 'promise.title' ) }</span>
        </h3>
        <Splide options={
          {
            type: 'loop',
            drag: 'free',
            perPage: 1,
            pagination: false,
            arrows: false,
            gap: '0.75rem',
            autoScroll: {
              speed: 1,
              pauseOnHover: false,
              pauseOnFocus: false,
            },
            breakpoints: {
              768: {
                perPage: 1,
                gap: '1.5rem',
              },
              1024: {
                perPage: 2,
                perMove: 2,
                gap: '1rem',
              },
              1280: {
                perPage: 3,
                perMove: 3,
                gap: '1rem',
              },
            },
          } } extensions={ { AutoScroll } } className='w-full overflow-auto whitespace-nowrap flex gap-2 relative py-4 scroll-smooth'>
          { ourPromise.map( ( { title, text }, index ) => (
            <SplideSlide
              key={ index }
              className='relative p-4 bg-white rounded-xl flex flex-col border-burgundy-300 border before:content-[""] before:absolute before:w-[101%] before:ml-[-1px] before:h-full before:-mt-2 before:top-0 before:bg-white before:rounded-xl before:left-0 before:border before:border-burgundy-300 z-20 mt-2!'
            >
              <div className='z-100'>
                <h4 className='text-dark-burgundy text-h6 mb-1'>{ title }</h4>
                <p className='whitespace-normal'>{ text }</p>
              </div>
            </SplideSlide>
          ) ) }
        </Splide>
      </div>
    </section >
  );
}
