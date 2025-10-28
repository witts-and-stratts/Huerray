'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

export function HowItWorks() {
  const t = useTranslations('home.howItWorks');

  const howItWorksData = [
    {
      title: t('step1.title'),
      description: t('step1.description'),
    },
    {
      title: t('step2.title'),
      description: t('step2.description'),
    },
    {
      title: t('step3.title'),
      description: t('step3.description'),
    },
    {
      title: t('step4.title'),
      description: t('step4.description'),
    },
  ];

  return (
    <section className='px-4 lg:px-10 py-20 bg-goldenrod-50/40 mx-4 lg:mx-10 rounded-3xl mt-40'>
      <div className='grid md:grid-cols-12 mx-auto'>
        <div className='md:col-span-6 space-y-8 md:pr-10 max-md:order-2 max-md:mt-10'>
          {howItWorksData.map((item, index) => (
            <div
              key={index}
              className='space-y-4 border-b-burgundy-100 border-b pb-4 mb-4 last-of-type:border-b-0'
            >
              <h3 className='h6 mb-2 font-medium'>{item.title}</h3>
              <p className='caption text-gray-600'>{item.description}</p>
            </div>
          ))}
        </div>

        {/* Image Collage Placeholder */}
        <div className='md:col-span-6 relative -mt-30 max-md:order-1'>
          <Image
            src='/images/content/how-it-works.png'
            alt='How It Works'
            width={2000}
            height={2000}
          />
        </div>
      </div>
    </section>
  );
}
