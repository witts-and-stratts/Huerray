'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

const whatWeDo = [
  {
    title: 'Creator-led UGC',
    text: 'Authentic testimonials, reviews, lifestyle',
  },
  {
    title: 'Campaigns for ads & e-commerce',
    text: 'Short-form ads, product shots',
  },
  {
    title: 'Managed service & creative direction',
    text: 'for brands who want a hands-off end-to-end experience',
  },
  {
    title: 'AI-assisted storytelling tools',
    text: 'Amplify, never replace, human creativity',
  },
];

const ourPromise = [
  {
    title: 'Diverse, vetted creators',
    text: 'Opt-in network that reflects real communities',
  },
  {
    title: 'Clear pricing',
    text: 'Pay for content, not hidden platform fees',
  },
  {
    title: 'Full rights & multi-channel use',
    text: 'Use content on social, web, ads, and beyond.',
  },
  {
    title: 'Fast delivery',
    text: 'Creative assets ready to deploy in days, not weeks',
  },
];

export function AboutWhatWeDo() {
  const t = useTranslations('about.whatWeDo');

  return (
    <section className='section-card section-card--spaced section-card--pink overflow-visible! mb-20'>
      <h2 className='h3 gradient-text'>What We Do</h2>

      <h3 className='text-h3 font-secondary mt-20 gradient-text'>
        We connect brands with creators who reflect the world they want to
        reach. Across Germany, Austria and Switzerland
      </h3>

      <p className='text-h5 text-dark-burgundy max-w-7/10 mt-4'>
        We match brands with real creators who make scroll-stopping videos,
        unboxings, testimonials and lifestyle content for TikTok, Reels and ads.
        Whether you need lo-fi authenticity or polished product showcases,
        Huerray curates creators, manages the process, and delivers licenced
        assets ready for all channels.
      </p>

      <div className='grid md:grid-cols-12 mt-8'>
        <div className='col-span-5'>
          {whatWeDo.map(({ title, text }, index) => (
            <div
              key={index}
              className='bg-white rounded-2xl p-4 inline-block mb-2'
            >
              <h4 className='text-h6c text-dark-burgundy font-medium'>
                {title}
              </h4>
              <p>{text}</p>
            </div>
          ))}
        </div>

        <div className='col-span-7'>
          <Image
            src='/images/what-wedo-collage.png'
            alt='What We Do'
            width={800}
            height={800}
            className='max-md:scale-120 md:w-[40000px]! mx:max-w-auto! translate-x-[20%]'
          />
        </div>
      </div>

      <div className='w-full p-6 border border-dark-burgundy rounded-3xl mt-20 relative'>
        <h3 className='absolute -top-8 -left-4 px-4 py-2 bg-fuchsia-100'>
          <span className='gradient-text text-h5'>Our Promise</span>
        </h3>
        <div className='w-full overflow-auto whitespace-nowrap flex gap-2 relative py-4 scroll-smooth'>
          {ourPromise.map(({ title, text }, index) => (
            <div
              key={index}
              className='relative p-4 bg-white rounded-xl min-h-40 min-w-80 flex flex-col border-burgundy-300 border before:content-[""] before:absolute before:w-[101%] before:ml-[-1px] before:h-full before:-mt-2 before:top-0 before:bg-white before:rounded-xl before:left-0 before:border before:border-burgundy-300 z-20'
            >
              <div className='z-100'>
                <h4 className='text-dark-burgundy text-h6 mb-1'>{title}</h4>
                <p className='whitespace-normal'>{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
