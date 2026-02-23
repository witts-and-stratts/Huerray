import { CampaignsTable } from '@/components/campaigns/campaigns-table';
import type { ModelCampaign } from '@/components/campaigns/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';

interface BrandCampaignsTableBlockProps {
  brandId: string;
  campaigns: ModelCampaign[];
  isLoading: boolean;
}

export function BrandCampaignsTableBlock({ brandId, campaigns, isLoading }: BrandCampaignsTableBlockProps) {
  return (
    <Card className="ad-summary-card">
      <CardHeader className="pb-2">
        <CardTitle className="ad-card-title">Campaigns</CardTitle>
        <CardDescription className="ad-card-description">Brand campaign activity and status</CardDescription>
      </CardHeader>
      <CardContent>
        <CampaignsTable
          campaigns={campaigns}
          isLoading={isLoading}
          basePath={`/admin/brands/${brandId}/campaigns`}
          emptyTitle="No campaigns yet"
          simpleEmptyState
        />
      </CardContent>
    </Card>
  );
}
