import React from 'react';
import { useTranslations } from 'next-intl';
import { Loader2 } from 'lucide-react';
import { WrappedCard } from '@/components/dashboard-ui/wrapped-card';
import { CampaignCard } from '@/components/campaigns/campaign-card';
import { CreatorCard } from '@/components/admin/creators/creator-card';
import { SubmissionCard } from '@/components/campaigns/submission-card';
import { GigCard } from '@/components/campaigns/gig-card';
import { Content } from '@/components/dashboard-ui/content';
import { ModelsGigResponse, UtilsNotificationEntityType } from '@/lib/api/generated/models';
import { getEntityLabel } from '@/lib/utils/help-center';
import { useFormatCurrency } from '@/lib/hooks/format';

interface RelatedEntityPreviewProps {
  relatedEntityType: UtilsNotificationEntityType | 'none';
  relatedEntityQuery: any;
  relatedEntity: any;
  relatedEntitySummary: any;
}

export const RelatedEntityPreview: React.FC<RelatedEntityPreviewProps> = ( {
  relatedEntityType,
  relatedEntityQuery,
  relatedEntity,
  relatedEntitySummary,
} ) => {
  const t = useTranslations( 'dashboard.common' );
  const formatCurrency = useFormatCurrency();

  const hasRelatedEntityType = relatedEntityType !== 'none';

  return (
    <WrappedCard
      title={
        hasRelatedEntityType
          ? t( 'helpSheet.submitCase.relatedEntityDetailsDynamicTitle', { entity: getEntityLabel( relatedEntityType as UtilsNotificationEntityType ) } )
          : t( 'helpSheet.submitCase.relatedEntityDetailsTitle' )
      }
      className="shadow-none"
      contentClass="gap-2 bg-muted-foreground/5"
    >
      { relatedEntityQuery?.isLoading ? (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="size-4 animate-spin" />
          <p>{ t( 'helpSheet.submitCase.relatedEntityLoadingDynamic', { entity: getEntityLabel( relatedEntityType as UtilsNotificationEntityType ) } ) }</p>
        </div>
      ) : relatedEntityQuery?.isError ? (
        <p className="text-sm text-destructive">{ t( 'helpSheet.submitCase.relatedEntityErrorDynamic', { entity: getEntityLabel( relatedEntityType as UtilsNotificationEntityType ) } ) }</p>
      ) : relatedEntitySummary ? (
        relatedEntityType === UtilsNotificationEntityType.EntityCampaign && relatedEntity ? (
          <CampaignCard campaign={ relatedEntity as any } />
        ) : relatedEntityType === UtilsNotificationEntityType.EntityCreator && relatedEntity ? (
          <div className="w-[200px] max-w-full">
            <CreatorCard creator={ relatedEntity as any } onViewDetails={ () => { } } />
          </div>
        ) : relatedEntityType === UtilsNotificationEntityType.EntityVideoSubmission && relatedEntity ? (
          <SubmissionCard submission={ relatedEntity as any } layout="media-overlay" />
        ) : relatedEntityType === UtilsNotificationEntityType.EntityGig && relatedEntity ? (
          <GigCard gig={ relatedEntity as ModelsGigResponse } onViewGig={ () => { } } />
        ) : relatedEntityType === UtilsNotificationEntityType.EntityPayment && relatedEntity ? (
          <div className="min-w-0 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium truncate">{ relatedEntitySummary.title }</p>
              { relatedEntitySummary.status && (
                <span className="shrink-0 rounded-full border px-2 py-0.5 text-[11px] text-muted-foreground capitalize">
                  { relatedEntitySummary.status.replace( /_/g, ' ' ) }
                </span>
              ) }
            </div>
            { ( relatedEntity as any ).payment_items?.length > 0 && (
              <div className="space-y-2 border-t border-border/50 pt-3">
                <p className="text-xs font-semibold text-foreground">{ t( 'helpSheet.submitCase.paymentItemsLabel' ) }</p>
                <ul className="space-y-1.5">
                  { ( relatedEntity as any ).payment_items.map( ( item: any, idx: number ) => (
                    <li key={ item.id || idx } className="text-xs text-muted-foreground flex justify-between gap-2">
                      <span className="truncate flex-1">{ item.description || item.gig_title || 'Payment Item' }</span>
                      <span className="shrink-0 font-medium">{ formatCurrency( item.amount?.amount, item.amount?.currency ) }</span>
                    </li>
                  ) ) }
                </ul>
              </div>
            ) }
            <p className="text-xs text-muted-foreground pt-2 mt-1 border-t border-border/50">
              { getEntityLabel( relatedEntityType as UtilsNotificationEntityType ) } - { relatedEntitySummary.id }
            </p>
          </div>
        ) : (
          <div className="min-w-0 space-y-1">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium truncate">{ relatedEntitySummary.title }</p>
              { relatedEntitySummary.status && (
                <span className="shrink-0 rounded-full border px-2 py-0.5 text-[11px] text-muted-foreground">
                  { relatedEntitySummary.status.replace( /_/g, ' ' ) }
                </span>
              ) }
            </div>
            { relatedEntitySummary.subtitle && (
              <Content content={ relatedEntitySummary.subtitle } className="text-xs text-muted-foreground line-clamp-2" stripTags={ [ 'p' ] } />
            ) }
            <p className="text-xs text-muted-foreground">
              { getEntityLabel( relatedEntityType as UtilsNotificationEntityType ) } - { relatedEntitySummary.id }
            </p>
          </div>
        )
      ) : (
        <p className="text-sm text-muted-foreground">{ t( 'helpSheet.submitCase.relatedEntityEmptyDynamic', { entity: getEntityLabel( relatedEntityType as UtilsNotificationEntityType ) } ) }</p>
      ) }
    </WrappedCard>
  );
};
