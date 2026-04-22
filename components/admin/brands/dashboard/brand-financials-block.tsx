import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { Skeleton } from '@/components/dashboard-ui/skeleton';
import type { BrandStatRow } from './brand-dashboard-utils';
import { useTranslations } from "next-intl";

interface BrandFinancialsBlockProps {
  rows: BrandStatRow[];
  isLoading?: boolean;
}

export function BrandFinancialsBlock( { rows, isLoading = false }: BrandFinancialsBlockProps ) {
  const t = useTranslations('dashboard.admin');
  return (
    <Card className="ad-summary-card flex-1">
      <CardHeader className="pb-2">
        <CardTitle className="ad-card-title">{t('brandFinancialsBlock.financials')}</CardTitle>
        <CardDescription className="ad-card-description">{t('brandFinancialsBlock.spendPerformanceForThis')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        { isLoading ? Array.from( { length: 2 } ).map( ( _, index ) => (
          <div key={ `brand-financials-skeleton-${ index }` } className="rounded-lg border border-border/60 bg-white p-2.5">
            <Skeleton className="mb-2 h-3 w-24" />
            <Skeleton className="h-7 w-20" />
          </div>
        ) ) : rows.map( ( item ) => (
          <div key={ item.label } className="rounded-lg border border-border/60 bg-white p-2.5">
            <div className="mb-1.5 flex items-end justify-between gap-3">
              <p className="ad-stat-label">{ item.label }</p>
            </div>
            <p className="mb-1.5 text-2xl leading-none font-primary font-medium">{ item.value }</p>
          </div>
        ) ) }
      </CardContent>
    </Card>
  );
}
