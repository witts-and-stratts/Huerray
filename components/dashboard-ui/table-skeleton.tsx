"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "motion/react";
import { cn } from "@/lib/dashboard-utils";

interface TableSkeletonProps {
  className?: string;
  cardCount?: number;
  cardHeight?: string;
}

export function TableSkeleton( {
  className,
  cardCount = 8,
  cardHeight = "h-[200px]",
}: TableSkeletonProps ) {
  return (
    <motion.div
      initial={ { opacity: 0 } }
      animate={ { opacity: 1 } }
      exit={ { opacity: 0 } }
      transition={ { duration: 0.5 } }
      className={ cn( "w-full space-y-4 px-2 md:px-5 py-2 md:py-4", className ) }
    >
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-[250px]" />
        <Skeleton className="h-10 w-[100px]" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        { Array.from( { length: cardCount } ).map( ( _, i ) => (
          <Skeleton key={ i } className={ cn( "w-full rounded-xl", cardHeight ) } />
        ) ) }
      </div>
    </motion.div>
  );
}
