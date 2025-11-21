'use client';

import Image from 'next/image';
import { TextList } from '../ui/TextList';

const listItems = [
  'Track your campaign and see how it performs',
  'Campaign walkthroughs and insights on all your projects/briefs',
];

export function BrandsStopAssuming() {
  return (
    <section className='section-card section-card--pink'>
      <div className='section-card__container'>
        {/* Left - Content */ }
        <div className='section-card__content section-card__content--left'>
          <span className='section-card__pill'>Measurement</span>

          <h2 className='section-card__title gradient-text'>
            Stop assuming what&apos;s working
          </h2>

          <p className='section-card__description'>
            Keep a pulse on what&apos;s happening during the creative process,
            with constant feedback and updates.
          </p>

          <TextList list={ listItems } />
        </div>

        {/* Right - Image with Performance Chart */ }
        <div className='section-card__image'>
          <Image
            src='/images/brands/stop-assuming/720fff0e9e69deca65f0dd3975902e605144008a.png'
            alt='Professional'
            width={ 545 }
            height={ 634 }
            className='aspect-8/9! object-cover rounded-[128px]'
          />
          <div className='brands-stop__chart'>
            <div className='brands-stop__chart-title'>
              Content Performance
            </div>
            <div className='brands-stop__chart-value'>
              89%
              <svg width="10" height="20" viewBox="0 0 10 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.63437 1.43921L0.661182 6.53742C0.51493 6.70818 0.295552 6.73257 0.149299 6.6106C-0.0213285 6.48864 -0.0457038 6.2447 0.0761731 6.09834L4.68312 0.170754C4.75625 0.0731801 4.87812 0 5 0C5.12188 0 5.24375 0.0731801 5.31688 0.170754L9.92383 6.09834C10.0457 6.2447 10.0213 6.48864 9.8507 6.6106C9.70445 6.73257 9.48507 6.70818 9.33882 6.53742L5.36563 1.43921V19.4171C5.36563 19.6123 5.195 19.783 5 19.783C4.805 19.783 4.63437 19.6123 4.63437 19.4171V1.43921Z" fill="#CE3D96" />
              </svg>

            </div>
            <div className='brands-stop__chart-bars'>
              <div className='brands-stop__chart-bar brands-stop__chart-bar--small' />
              <div className='brands-stop__chart-bar brands-stop__chart-bar--large' />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
