"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "motion/react";
import { cn } from "@/lib/dashboard-utils";

interface DataTableSkeletonProps {
  className?: string;
  rowCount?: number;
  showToolbar?: boolean;
}

export function DataTableSkeleton( {
  className,
  rowCount = 10,
  showToolbar = true,
}: DataTableSkeletonProps ) {
  return (
    <motion.div
      initial={ { opacity: 0 } }
      animate={ { opacity: 1 } }
      transition={ { duration: 0.2 } }
      className={ cn( "w-full space-y-4", className ) }
    >
      { showToolbar && (
        <div className="flex items-center justify-between bg-white px-2 md:px-5 py-2">
          <Skeleton className="h-10 w-[250px]" />
          <Skeleton className="h-10 w-[100px]" />
        </div>
      ) }
      <div className="rounded-md border mx-2 md:mx-5 pt-2 md:pt-4">
        <div className="border-b bg-muted/50 p-4 flex gap-4">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
        </div>
        { Array.from( { length: rowCount } ).map( ( _, i ) => (
          <div key={ i } className="border-b p-4 last:border-0 flex gap-4">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        ) ) }
      </div>
    </motion.div>
  );
}
