"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "motion/react";
import { cn } from "@/lib/dashboard-utils";

interface CampaignsTableSkeletonProps {
  className?: string;
  rowCount?: number;
  showToolbar?: boolean;
}

function AvatarCollageSkeleton() {
  return (
    <div className="flex items-center">
      { [ 0, 1, 2 ].map( ( i ) => (
        <Skeleton
          key={ i }
          className={ cn( "size-7 rounded-full border-2 border-background", i > 0 && "-ml-2" ) }
        />
      ) ) }
    </div>
  );
}

export function CampaignsTableSkeleton( {
  className,
  rowCount = 10,
  showToolbar = true,
}: CampaignsTableSkeletonProps ) {
  return (
    <motion.div
      initial={ { opacity: 0 } }
      animate={ { opacity: 1 } }
      transition={ { duration: 0.2 } }
      className={ cn( "w-full space-y-2 md:space-y-4", className ) }
    >
      { showToolbar && (
        <div className="flex items-center justify-between gap-3 bg-background py-2 px-2 md:px-4">
          <div className="flex items-center gap-2 flex-1">
            <Skeleton className="h-9 w-[220px] max-w-full md:w-[500px]" />
            <Skeleton className="h-9 w-[110px]" />
            <Skeleton className="h-9 w-[110px]" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-[90px]" />
            <Skeleton className="h-9 w-[72px]" />
          </div>
        </div>
      ) }

      { /* Table */ }
      <div className="rounded-md border mx-2 md:mx-4">
        { /* Header */ }
        <div className="border-b bg-muted/50 px-4 py-1 flex items-center gap-4 py-2">
          <Skeleton className="size-4 shrink-0 rounded-sm" />
          <Skeleton className="h-4 w-[180px]" />
          <div className="ml-auto flex items-center gap-8 pr-2">
            <Skeleton className="h-4 w-[90px]" />
            <Skeleton className="h-4 w-[80px]" />
            <Skeleton className="h-4 w-[90px]" />
            <Skeleton className="h-4 w-[60px]" />
          </div>
        </div>

        { /* Rows */ }
        { Array.from( { length: rowCount } ).map( ( _, i ) => (
          <div key={ i } className="border-b last:border-0 px-4 py-3 flex items-start gap-4 bg-white">
            { /* Checkbox */ }
            <Skeleton className="size-4 shrink-0 rounded-sm mt-3" />

            { /* Details: avatar + text */ }
            <div className="flex gap-4 pl-0 flex-1 min-w-0">
              <Skeleton className="size-10 shrink-0 rounded-full" />
              <div className="flex flex-col gap-2 min-w-0 flex-1">
                <Skeleton className="h-4 w-[160px]" />
                <Skeleton className="h-3 w-[240px]" />
                <Skeleton className="h-3 w-[180px]" />
                <div className="mt-1 flex flex-col gap-1.5">
                  <Skeleton className="h-3 w-[120px]" />
                  <Skeleton className="h-5 w-[70px] rounded-full" />
                </div>
              </div>
            </div>

            { /* Applications */ }
            <div className="w-[100px] shrink-0 flex items-center pt-2">
              <AvatarCollageSkeleton />
            </div>

            { /* Invitations */ }
            <div className="w-[100px] shrink-0 flex items-center pt-2">
              <AvatarCollageSkeleton />
            </div>

            { /* Submissions */ }
            <div className="w-[100px] shrink-0 flex items-center pt-2">
              <AvatarCollageSkeleton />
            </div>

            { /* Actions */ }
            <div className="flex items-center gap-2 shrink-0 justify-end pt-1">
              <Skeleton className="h-8 w-[60px] rounded-md" />
              <Skeleton className="h-8 w-[56px] rounded-md" />
              <Skeleton className="h-8 w-8 rounded-md" />
            </div>
          </div>
        ) ) }
      </div>
    </motion.div>
  );
}
