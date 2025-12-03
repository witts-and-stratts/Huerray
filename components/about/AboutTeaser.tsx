import Image from 'next/image';

export default function AboutTeaser() {
  return (
    <div className='w-full pt-20 md:py-20 grid grid-cols-1 md:grid-cols-12 gap-8 md:h-180'>
      <video
        className='md:col-span-8 md:rounded-br-4xl md:rounded-tr-4xl h-full object-cover max-md:h-160'
        autoPlay
        muted
        loop
        playsInline
      >
        <source
          src='/videos/young-woman-showcasing-fashion.mp4'
          type='video/mp4'
        />
        <source
          src='/videos/young-woman-showcasing-fashion.webm'
          type='video/webm'
        />
      </video>
      <div className='md:col-span-4 md:rounded-bl-4xl md:rounded-tl-4xl overflow-hidden h-full'>
        <Image
          src='/images/about-teaser.jpg'
          alt='Creator content'
          width={545}
          height={282}
          className='object-cover w-full h-full'
        />
      </div>
    </div>
  );
}
