import { Card, CardContent, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { Skeleton } from '@/components/dashboard-ui/skeleton';

interface KpiCardProps {
  title: string;
  value: string;
  caption: string;
  isLoading?: boolean;
}

export function KpiCard( { title, value, caption, isLoading = false }: KpiCardProps ) {
  return (
    <Card className="ad-kpi-card h-full">
      <CardHeader className="pb-2 min-h-12">
        <CardTitle className="ad-card-title flex items-center gap-2 leading-tight">
          { title }
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        { isLoading ? (
          <>
            <Skeleton className="h-9 w-24" />
            <Skeleton className="mt-2 h-4 w-44" />
          </>
        ) : (
          <>
            <p className="ad-stat-value">{ value }</p>
            <p className="mt-1 text-xs text-muted-foreground">{ caption }</p>
          </>
        ) }
      </CardContent>
    </Card>
  );
}
