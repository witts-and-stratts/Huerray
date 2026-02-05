import { memo } from 'react';
import { cn } from '@/lib/utils';

interface MediaProps {
  url: string;
  alt?: string;
  type?: 'image' | 'video';
  className?: string;
}

/**
 * Media - Renders images and videos
 * 
 * Browser automatically sends auth cookies with img/video requests.
 */
export const Media = memo( ( {
  url,
  alt,
  type = 'image',
  className
}: MediaProps ) => {
  if ( type === 'video' ) {
    return (
      <video
        src={ url }
        className={ cn( className ) }
        controls
        playsInline
      />
    );
  }

  return (
    <img
      src={ url }
      alt={ alt }
      className={ cn( className ) }
    />
  );
} );
