import { Skeleton } from "@/components/dashboard-ui/skeleton";

export function NotificationsSkeleton() {
  return (
    <div className="px-5 space-y-4">
      { [ 1, 2, 3, 4, 5 ].map( ( i ) => (
        <div key={ i } className="flex items-start gap-4 p-4 border rounded-lg">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      ) ) }
    </div>
  );
}
