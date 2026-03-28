'use client';

import { motion } from 'motion/react';
import { Skeleton } from '@/components/dashboard-ui/skeleton';

interface CardGridSkeletonProps {
  count?: number;
  cardHeight?: string;
  columns?: string;
}

export function CardGridSkeleton( {
  count = 6,
  cardHeight = 'h-[300px]',
  columns = 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
}: CardGridSkeletonProps ) {
  return (
    <motion.div
      initial={ { opacity: 0 } }
      animate={ { opacity: 1 } }
      transition={ { duration: 0.2 } }
      className="w-full space-y-4 px-2 md:px-5 py-2 md:py-5"
    >
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-[600px] max-w-full" />
        <Skeleton className="h-10 w-[100px]" />
      </div>
      <div className={ `grid ${ columns } gap-4` }>
        { Array.from( { length: count } ).map( ( _, i ) => (
          <Skeleton key={ i } className={ `${ cardHeight } w-full rounded-xl` } />
        ) ) }
      </div>
    </motion.div>
  );
}
