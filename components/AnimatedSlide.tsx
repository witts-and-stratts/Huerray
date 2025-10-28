'use client';

import { useEffect, useState, useEffectEvent } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';

interface AnimatedSlideProps {
  images: string[];
  index: number;
  currentImageIndex: number;
  onImageChange: () => void;
  onAnimationEnd?: () => void;
  className?: string;
}

export function AnimatedSlide({
  images,
  index,
  currentImageIndex,
  onImageChange,
  onAnimationEnd,
  className = '',
}: AnimatedSlideProps) {
  const [previousImageIndex, setPreviousImageIndex] =
    useState(currentImageIndex);
  const [swipeDirection, setSwipeDirection] = useState<'top' | 'bottom'>(
    'bottom'
  );

  const [trigger, setTrigger] = useState(0);

  const handleImageChangeEvent = useEffectEvent(() => {
    // Randomly choose swipe direction
    setSwipeDirection(Math.random() > 0.5 ? 'top' : 'bottom');
    onImageChange();
  });

  useEffect(() => {
    // Random interval between 5-10 seconds
    const randomInterval = Math.random() * 5000 + 5000;

    const timer = setTimeout(() => {
      handleImageChangeEvent();
      // Trigger next attempt regardless of whether the change succeeded
      setTrigger((t) => t + 1);
    }, randomInterval);

    return () => clearTimeout(timer);
  }, [currentImageIndex, trigger]);

  const handleAnimationComplete = () => {
    setPreviousImageIndex(currentImageIndex);
    onAnimationEnd?.();
  };

  return (
    <div
      className={`aspect-3/4 w-full rounded-lg md:rounded-4xl overflow-hidden relative ${className}`}
    >
      {/* Previous/Background Image */}
      <div className='w-full h-full absolute inset-0'>
        <Image
          src={images[previousImageIndex]}
          alt={`Content ${index + 1}`}
          width={229}
          height={285}
          className='w-full h-full object-cover'
        />
      </div>

      {/* New Image Swiping In */}
      <AnimatePresence initial={false}>
        <motion.div
          key={currentImageIndex}
          initial={{ height: 0 }}
          animate={{ height: '100%' }}
          onAnimationComplete={handleAnimationComplete}
          transition={{
            duration: 2,
            ease: 'easeOut',
          }}
          className={`w-full absolute left-0 overflow-hidden ${
            swipeDirection === 'bottom' ? 'bottom-0' : 'top-0'
          }`}
        >
          <div
            className={`w-full aspect-3/4 absolute ${
              swipeDirection === 'bottom' ? 'bottom-0' : 'top-0'
            }`}
          >
            <Image
              src={images[currentImageIndex]}
              alt={`Content ${index + 1}`}
              width={229}
              height={285}
              className='w-full h-full object-cover'
              priority={false}
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
