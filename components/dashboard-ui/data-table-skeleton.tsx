"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "motion/react";
import { cn } from "@/lib/dashboard-utils";

interface DataTableSkeletonProps {
  className?: string;
  rowCount?: number;
}

export function DataTableSkeleton( {
  className,
  rowCount = 10,
}: DataTableSkeletonProps ) {
  return (
    <motion.div
      initial={ { opacity: 0 } }
      animate={ { opacity: 1 } }
      exit={ { opacity: 0 } }
      transition={ { duration: 0.5 } }
      className={ cn( "w-full space-y-4 px-5 pt-4", className ) }
    >
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-[250px]" />
        <Skeleton className="h-10 w-[100px]" />
      </div>
      <div className="rounded-md border">
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
