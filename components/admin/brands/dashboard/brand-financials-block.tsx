import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import type { BrandStatRow } from './brand-dashboard-utils';

interface BrandFinancialsBlockProps {
  rows: BrandStatRow[];
}

export function BrandFinancialsBlock({ rows }: BrandFinancialsBlockProps) {
  return (
    <Card className="ad-summary-card">
      <CardHeader className="pb-2">
        <CardTitle className="ad-card-title">Financials</CardTitle>
        <CardDescription className="ad-card-description">Spend performance for this brand</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {rows.map((item) => (
          <div key={item.label} className="rounded-lg border border-border/60 bg-white p-2.5">
            <div className="mb-1.5 flex items-end justify-between gap-3">
              <p className="ad-stat-label">{item.label}</p>
            </div>
            <p className="mb-1.5 text-2xl leading-none font-primary font-medium">{item.value}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
