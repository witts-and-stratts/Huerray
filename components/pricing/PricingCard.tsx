'use client';

import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Badge } from '../ui/badge';

interface PricingCardProps {
  tag: string;
  title: string;
  price: string;
  features: string[];
  buttonText: string;
  disclaimer: string;
  highlight?: boolean;
}

export function PricingCard({
  tag,
  title,
  price,
  features,
  buttonText,
  disclaimer,
  highlight = false,
}: PricingCardProps) {
  return (
    <div className='pricing-card-wrapper'>
      <div
        className={cn('pricing-card', highlight && 'pricing-card--highlight')}
      >
        <Badge variant='pill'>{tag}</Badge>
        <h3
          className={cn('pricing-card__title', { 'gradient-text': !highlight })}
        >
          {title}
        </h3>
        <div className='flex flex-row gap-2'>
          <span className={cn('text-h6', { 'text-deep-maroon': !highlight })}>
            From
          </span>
          <div
            className={cn(
              'gradient-text',
              'pricing-card__price',
              !highlight && 'pricing-card__price--gradient'
            )}
          >
            {price}
          </div>
        </div>

        <div className='pricing-card__features'>
          <h6
            className={cn('font-medium mb-4 opacity-80 text-h6 text-white', {
              'text-deep-maroon': !highlight,
            })}
          >
            Perfect for
          </h6>
          <ul className='space-y-3'>
            {features.map((feature, index) => (
              <li key={index} className='pricing-card__feature'>
                <Check
                  className={cn(
                    'w-5 h-5',
                    highlight ? 'text-white' : 'text-orange'
                  )}
                />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className='pricing-card__disclaimer'>{disclaimer}</p>

        <Button
          variant='heroAlt'
          className={cn('w-full rounded-full py-6 text-lg font-medium')}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
}
