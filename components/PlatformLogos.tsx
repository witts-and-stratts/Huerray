'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

const platformLogos = [
  {
    src: '/images/platforms/shopify.svg',
    alt: 'Shopify',
    width: 44,
    height: 51,
  },
  {
    src: '/images/platforms/instagram.svg',
    alt: 'Instagram',
    width: 44,
    height: 44,
  },
  {
    src: '/images/platforms/tiktok.svg',
    alt: 'TikTok',
    width: 150,
    height: 37,
  },
  {
    src: '/images/platforms/youtube.svg',
    alt: 'YouTube',
    width: 144,
    height: 32,
  },
  {
    src: '/images/platforms/snapchat.svg',
    alt: 'Snapchat',
    width: 63,
    height: 63,
  },
  {
    src: '/images/platforms/whatsapp.svg',
    alt: 'WhatsApp',
    width: 67,
    height: 67,
  },
  {
    src: '/images/platforms/linkedin.svg',
    alt: 'LinkedIn',
    width: 147,
    height: 36,
  },
  {
    src: '/images/platforms/telegram.svg',
    alt: 'Telegram',
    width: 51,
    height: 51,
  },
];

export function PlatformLogos() {
  const t = useTranslations('home.platformLogos');

  return (
    <section className='px-4 lg:px-10 py-16 bg-white overflow-hidden'>
      <h5 className='h5 text-center mb-8 text-slate'>{t('title')}</h5>
      <div className='relative'>
        <div className='flex gap-16 animate-scroll-platforms'>
          {/* Duplicate logos for seamless loop */}
          {Array(3)
            .fill(platformLogos)
            .flat()
            .map((logo, index) => (
              <div
                key={`${logo.alt}-${index}`}
                className='flex items-center justify-center shrink-0'
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
                  className='object-contain'
                />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
