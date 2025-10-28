'use client';

import { AnimatedSlide } from '@/components/AnimatedSlide';
import { Badge } from '@/components/ui/badge';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { Activity, useEffect, useEffectEvent, useRef, useState } from 'react';

// Content grid images organized by category
const imagesByCategory: Record<string, string[]> = {
  'Product Shots': [
    '/images/content/product-1.jpg',
    '/images/content/product-2.jpg',
    '/images/content/product-3.jpg',
    '/images/content/product-4.jpg',
    '/images/content/product-5.jpg',
    '/images/content/product-6.jpg',
    '/images/content/product-7.jpg',
    '/images/content/product-8.jpg',
    '/images/content/product-9.jpg',
    '/images/content/product-10.jpg',
    '/images/content/product-11.jpg',
    '/images/content/product-12.jpg',
    '/images/content/product-13.jpg',
    '/images/content/product-14.jpg',
    '/images/content/product-15.jpg',
  ],
  'Testimonial Videos': [
    '/images/content/testimonial-1.jpg',
    '/images/content/testimonial-2.jpg',
    '/images/content/testimonial-3.jpg',
    '/images/content/testimonial-4.jpg',
    '/images/content/testimonial-5.jpg',
    '/images/content/testimonial-6.jpg',
    '/images/content/testimonial-7.jpg',
    '/images/content/testimonial-8.jpg',
    '/images/content/testimonial-9.jpg',
    '/images/content/testimonial-10.jpg',
    '/images/content/testimonial-11.jpg',
    '/images/content/testimonial-12.jpg',
    '/images/content/testimonial-13.jpg',
    '/images/content/testimonial-14.jpg',
    '/images/content/testimonial-15.jpg',
  ],
  'Unboxing Videos': [
    '/images/content/unboxing-1.jpg',
    '/images/content/unboxing-2.jpg',
    '/images/content/unboxing-3.jpg',
    '/images/content/unboxing-4.jpg',
    '/images/content/unboxing-5.jpg',
    '/images/content/unboxing-6.jpg',
    '/images/content/unboxing-7.jpg',
    '/images/content/unboxing-8.jpg',
    '/images/content/unboxing-9.jpg',
    '/images/content/unboxing-10.jpg',
    '/images/content/unboxing-11.jpg',
    '/images/content/unboxing-12.jpg',
    '/images/content/unboxing-13.jpg',
    '/images/content/unboxing-14.jpg',
    '/images/content/unboxing-15.jpg',
  ],
  'Lifestyle Shots': [
    '/images/content/lifestyle-1.jpg',
    '/images/content/lifestyle-2.jpg',
    '/images/content/lifestyle-3.jpg',
    '/images/content/lifestyle-4.jpg',
    '/images/content/lifestyle-5.jpg',
    '/images/content/lifestyle-6.jpg',
    '/images/content/lifestyle-7.jpg',
    '/images/content/lifestyle-8.jpg',
    '/images/content/lifestyle-9.jpg',
    '/images/content/lifestyle-10.jpg',
    '/images/content/lifestyle-11.jpg',
    '/images/content/lifestyle-12.jpg',
    '/images/content/lifestyle-13.jpg',
    '/images/content/lifestyle-14.jpg',
    '/images/content/lifestyle-15.jpg',
  ],
  'Food & Beverage': [
    '/images/content/content-9.jpg',
    '/images/content/content-6.jpg',
    '/images/content/content-13.jpg',
    '/images/content/content-3.jpg',
    '/images/content/content-1.jpg',
    '/images/content/content-8.jpg',
    '/images/content/content-4.jpg',
    '/images/content/content-12.jpg',
    '/images/content/content-7.jpg',
    '/images/content/content-15.jpg',
    '/images/content/content-2.jpg',
    '/images/content/content-11.jpg',
    '/images/content/content-5.jpg',
    '/images/content/content-14.jpg',
    '/images/content/content-10.jpg',
  ],
  'Travel & Hospitality': [
    '/images/content/travel-1.jpg',
    '/images/content/travel-2.jpg',
    '/images/content/travel-3.jpg',
    '/images/content/travel-4.jpg',
    '/images/content/travel-5.jpg',
    '/images/content/travel-6.jpg',
    '/images/content/travel-7.jpg',
    '/images/content/travel-8.jpg',
    '/images/content/travel-9.jpg',
    '/images/content/travel-10.jpg',
    '/images/content/travel-11.jpg',
    '/images/content/travel-12.jpg',
    '/images/content/travel-13.jpg',
    '/images/content/travel-14.jpg',
    '/images/content/travel-15.jpg',
  ],
};

const contentCategories = Object.keys(imagesByCategory);

// Helper to get initial unique images (client-side only)
function getInitialImages(count: number, totalImages: number): number[] {
  const shuffled = Array.from({ length: totalImages }, (_, i) => i).sort(
    () => Math.random() - 0.5
  );
  return shuffled.slice(0, count);
}

// Initialize image state for each category (deterministic initial state)
function initializeCategoryImages() {
  const maxSlides = 10;
  const categoryImages: Record<string, number[]> = {};

  contentCategories.forEach((category) => {
    // Use sequential indices for SSR, will be randomized on client
    categoryImages[category] = Array.from({ length: maxSlides }, (_, i) => i);
  });

  return categoryImages;
}

const gridVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.05,
    },
  },
} as const;

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 100,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1] as const, // Custom easing for smooth motion
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.6,
      opacity: { duration: 1 },
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export function ContentObjectives() {
  const [selectedCategory, setSelectedCategory] = useState(
    contentCategories[0]
  );

  // Each category has its own independent image state
  const [categorySlides, setCategorySlides] = useState<
    Record<string, number[]>
  >(initializeCategoryImages);

  const setSlides = useEffectEvent(
    (randomizedImages: Record<string, number[]>) => {
      setCategorySlides(randomizedImages);
    }
  );

  // Randomize images on client mount only
  useEffect(() => {
    const maxSlides = 10;
    const randomizedImages: Record<string, number[]> = {};

    contentCategories.forEach((category) => {
      randomizedImages[category] = getInitialImages(
        maxSlides,
        imagesByCategory[category].length
      );
    });

    setSlides(randomizedImages);
  }, []);

  const animatingCount = useRef(0);
  const maxConcurrentAnimations = 2;

  // Track which slides have swiped in the current round
  const swipedInRound = useRef<Set<number>>(new Set());

  const canAnimate = () => {
    return animatingCount.current < maxConcurrentAnimations;
  };

  const startAnimation = () => {
    animatingCount.current += 1;
  };

  const endAnimation = () => {
    animatingCount.current -= 1;
  };

  const handleImageChange = (index: number, category: string) => {
    if (!canAnimate()) return;

    // Check if this slide has already swiped in this round
    if (swipedInRound.current.has(index)) return;

    setCategorySlides((prev) => {
      const currentCategorySlides = prev[category];
      const categoryImages = imagesByCategory[category];

      // Filter out images already displayed in the grid
      const availableImages = Array.from(
        { length: categoryImages.length },
        (_, i) => i
      ).filter((imgIndex) => !currentCategorySlides.includes(imgIndex));

      if (availableImages.length === 0) return prev;

      startAnimation();

      // Mark this slide as having swiped
      swipedInRound.current.add(index);

      // If all slides have swiped, reset the round
      if (swipedInRound.current.size >= currentCategorySlides.length) {
        swipedInRound.current.clear();
      }

      const randomIndex = Math.floor(Math.random() * availableImages.length);
      const randomImage = availableImages[randomIndex];
      const newSlides = [...currentCategorySlides];
      newSlides[index] = randomImage;

      return {
        ...prev,
        [category]: newSlides,
      };
    });
  };

  const t = useTranslations('home.contentObjectives');

  return (
    <section className='content-objectives'>
      <h2 className='content-objectives__title gradient-text'>{t('title')}</h2>
      <h4 className='content-objectives__subtitle'>{t('subtitle')}</h4>

      {/* Category Pills */}
      <div className='content-objectives__pills'>
        {contentCategories.map((category) => (
          <Badge
            key={category}
            variant='pill'
            onClick={() => setSelectedCategory(category)}
            className={`content-objectives__pill ${
              selectedCategory === category
                ? 'content-objectives__pill--active'
                : ''
            }`}
          >
            {t(
              `categories.${category
                .toLowerCase()
                .replace(/\s+/g, '_')
                .replace('&', 'and')}`
            )}
          </Badge>
        ))}
      </div>

      {/* Grid with all categories loaded but hidden/visible based on selection */}
      {contentCategories.map((category) => {
        const slides = categorySlides[category];
        const images = imagesByCategory[category];

        return (
          <Activity
            key={category}
            mode={selectedCategory === category ? 'visible' : 'hidden'}
          >
            <motion.div
              variants={gridVariants}
              initial='hidden'
              animate='show'
              className='content-objectives__grid'
            >
              {slides.map((imageIndex, i) => (
                <motion.div
                  key={`${category}-${i}`}
                  variants={itemVariants}
                  className={`content-objectives__item ${
                    i >= 9
                      ? 'content-objectives__item--desktop-only'
                      : i === 8
                      ? 'content-objectives__item--mobile-desktop'
                      : ''
                  }`}
                >
                  <AnimatedSlide
                    images={images}
                    index={i}
                    currentImageIndex={imageIndex}
                    onImageChange={() => {
                      if (category === selectedCategory) {
                        handleImageChange(i, category);
                      }
                    }}
                    onAnimationEnd={endAnimation}
                  />
                </motion.div>
              ))}
            </motion.div>
          </Activity>
        );
      })}
    </section>
  );
}
