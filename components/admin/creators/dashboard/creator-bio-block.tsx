import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { Badge } from '@/components/dashboard-ui/badge';
import type { ModelsCreatorResponse } from '@/lib/api/generated/models';
import { Content } from '@/components/dashboard-ui/content';
import { Separator } from '@/components/dashboard-ui/separator';
import { WrappedCard } from '@/components/dashboard-ui/wrapped-card';
import { useTranslations } from 'next-intl';

interface CreatorBioBlockProps {
  creator: ModelsCreatorResponse;
}

export function CreatorBioBlock( { creator }: CreatorBioBlockProps ) {
  const t = useTranslations( 'dashboard.admin' );
  const tc = useTranslations( 'dashboard.common' );
  return (
    <Card className='pt-4'>
      <CardHeader>
        <CardTitle>{ t( 'creatorDashboard.blocks.bio' ) }</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Content content={ creator.bio ?? tc( 'sheets.noBioAvailable' ) } className='pb-4' />

        { creator.preferred_categories && creator.preferred_categories.length > 0 && (
          <div className="space-y-2">
            <WrappedCard className="bg-slate-50/30" title={ tc( 'sheets.preferredCategories' ) }>
              <div className="flex flex-wrap gap-1.5">
                { creator.preferred_categories.map( ( cat ) => (
                  <Badge key={ cat } variant="secondary" className="font-normal capitalize">
                    { String( cat ).replace( /_/g, ' ' ) }
                  </Badge>
                ) ) }
              </div>
            </WrappedCard>
          </div>
        ) }
      </CardContent>
    </Card>
  );
}
