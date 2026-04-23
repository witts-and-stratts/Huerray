import { useMemo } from 'react';
import { useBrand, useBrandCreators, useBrandGigs, useBrands, useBrandVideoSubmissions } from '@/lib/api/hooks/brands';
import { useBrandCampaigns, useCampaign, useCampaigns } from '@/lib/api/hooks/campaigns';
import { useCase, useCases } from '@/lib/api/hooks/cases';
import { useCreator, useCreatorGigs, useCreators } from '@/lib/api/hooks/creators';
import { useGig, useGigs } from '@/lib/api/hooks/gigs';
import { useInvoice, useInvoices } from '@/lib/api/hooks/invoices';
import { useCreatorEarnings, useCreatorPayment, usePayment, usePayments } from '@/lib/api/hooks/payments';
import { useUser, useUsers } from '@/lib/api/hooks/users';
import { useMyVideoSubmissions, useVideoSubmission, useVideoSubmissionsSearch } from '@/lib/api/hooks/video-submissions';
import { UtilsNotificationEntityType } from '@/lib/api/generated/models';
import type { EntityMeta } from '@/components/dashboard-ui/superfield/entity-select';
import type { SelectOption } from '@/components/dashboard-ui/superfield/types';
import { 
  NO_RELATED_ENTITY_TYPE, 
  getEntityLabel, 
  getRelatedEntitySummary, 
  unwrapEntityResponse,
  getInitials,
  HelpRole
} from '@/lib/utils/help-center';
import { imgpresets } from '@/lib/utils/imgproxy';
import { stripTags } from '@/lib/utils';

export function useHelpCenterData( role: HelpRole, relatedEntityType: UtilsNotificationEntityType | typeof NO_RELATED_ENTITY_TYPE, relatedEntityId: string ) {
  const isRelatedEntityType = ( type: UtilsNotificationEntityType ) => relatedEntityType === type;
  const hasRelatedEntityType = relatedEntityType !== NO_RELATED_ENTITY_TYPE;
  const shouldFetchRelatedEntity = Boolean( hasRelatedEntityType && relatedEntityId );
  const normalizedRelatedEntityId = relatedEntityId || '';
  const relatedEntityIdForQuery = normalizedRelatedEntityId;

  // Search/List Queries
  const adminBrandsQuery = useBrands(
    { limit: 100, page: 1 },
    { enabled: role === 'admin' && isRelatedEntityType( UtilsNotificationEntityType.EntityBrand ) }
  );
  const brandBrandsQuery = useBrands(
    { limit: 100, page: 1 },
    { enabled: role !== 'brand' && isRelatedEntityType( UtilsNotificationEntityType.EntityBrand ) }
  );
  const adminCreatorsQuery = useCreators(
    { limit: 100, page: 1 },
    { enabled: role === 'admin' && isRelatedEntityType( UtilsNotificationEntityType.EntityCreator ) }
  );
  const brandCreatorsQuery = useBrandCreators(
    { limit: 100, page: 1 },
    { enabled: role === 'brand' && isRelatedEntityType( UtilsNotificationEntityType.EntityCreator ) }
  );
  const adminCampaignsQuery = useCampaigns(
    { limit: 100, page: 1 },
    { enabled: role === 'admin' && isRelatedEntityType( UtilsNotificationEntityType.EntityCampaign ) }
  );
  const brandCampaignsQuery = useBrandCampaigns(
    { limit: 100, page: 1 },
    { enabled: role === 'brand' && isRelatedEntityType( UtilsNotificationEntityType.EntityCampaign ) }
  );
  const adminGigsQuery = useGigs(
    { limit: 100, page: 1 },
    { enabled: role === 'admin' && isRelatedEntityType( UtilsNotificationEntityType.EntityGig ) }
  );
  const brandGigsQuery = useBrandGigs(
    { limit: 100, page: 1 },
    { enabled: role === 'brand' && isRelatedEntityType( UtilsNotificationEntityType.EntityGig ) }
  );
  const creatorGigsQuery = useCreatorGigs(
    { limit: 100, page: 1 },
    { enabled: role === 'creator' && isRelatedEntityType( UtilsNotificationEntityType.EntityGig ) }
  );
  const invoicesQuery = useInvoices(
    { limit: 100, page: 1 },
    { enabled: role !== 'creator' && isRelatedEntityType( UtilsNotificationEntityType.EntityInvoice ) }
  );
  const casesQuery = useCases(
    { limit: 100, page: 1 },
    { enabled: role === 'admin' && isRelatedEntityType( UtilsNotificationEntityType.EntityCase ) }
  );
  const adminPaymentsQuery = usePayments(
    { limit: 100, page: 1 },
    { enabled: role === 'admin' && isRelatedEntityType( UtilsNotificationEntityType.EntityPayment ) }
  );
  const creatorPaymentsQuery = useCreatorEarnings(
    { limit: 100, page: 1 },
    { enabled: role === 'creator' && isRelatedEntityType( UtilsNotificationEntityType.EntityPayment ) }
  );
  const usersQuery = useUsers(
    { limit: 100, page: 1 },
    { enabled: role === 'admin' && isRelatedEntityType( UtilsNotificationEntityType.EntityUser ) }
  );
  const adminSubmissionsQuery = useVideoSubmissionsSearch(
    { limit: 100, page: 1 },
    { enabled: role === 'admin' && isRelatedEntityType( UtilsNotificationEntityType.EntityVideoSubmission ) }
  );
  const brandSubmissionsQuery = useBrandVideoSubmissions(
    { limit: 100, page: 1 },
    { enabled: role === 'brand' && isRelatedEntityType( UtilsNotificationEntityType.EntityVideoSubmission ) }
  );
  const creatorSubmissionsQuery = useMyVideoSubmissions(
    undefined,
    { enabled: role === 'creator' && isRelatedEntityType( UtilsNotificationEntityType.EntityVideoSubmission ) }
  );

  const relatedEntityListQuery = relatedEntityType === UtilsNotificationEntityType.EntityBrand ? adminBrandsQuery
    : relatedEntityType === UtilsNotificationEntityType.EntityCreator ? ( role === 'brand' ? brandCreatorsQuery : adminCreatorsQuery )
      : relatedEntityType === UtilsNotificationEntityType.EntityCampaign ? ( role === 'brand' ? brandCampaignsQuery : adminCampaignsQuery )
        : relatedEntityType === UtilsNotificationEntityType.EntityGig ? ( role === 'creator' ? creatorGigsQuery : role === 'brand' ? brandGigsQuery : adminGigsQuery )
          : relatedEntityType === UtilsNotificationEntityType.EntityInvoice ? invoicesQuery
            : relatedEntityType === UtilsNotificationEntityType.EntityCase ? casesQuery
              : relatedEntityType === UtilsNotificationEntityType.EntityPayment ? ( role === 'creator' ? creatorPaymentsQuery : adminPaymentsQuery )
                : relatedEntityType === UtilsNotificationEntityType.EntityUser ? usersQuery
                  : relatedEntityType === UtilsNotificationEntityType.EntityVideoSubmission
                    ? ( role === 'creator' ? creatorSubmissionsQuery : role === 'brand' ? brandSubmissionsQuery : adminSubmissionsQuery )
                    : undefined;

  const users = ( usersQuery.data?.data?.data ?? [] ) as unknown[];
  const relatedEntityRecords = useMemo( () => {
    if ( relatedEntityType === UtilsNotificationEntityType.EntityUser ) return users;
    return ( relatedEntityListQuery?.data?.data ?? [] ) as unknown[];
  }, [ relatedEntityListQuery?.data, relatedEntityType, users ] );

  const relatedEntityRecordById = useMemo( () => {
    const records = new Map<string, unknown>();
    relatedEntityRecords.forEach( ( record ) => {
      const summary = getRelatedEntitySummary( record, '' );
      if ( summary.id ) records.set( summary.id, record );
    } );
    return records;
  }, [ relatedEntityRecords ] );

  const relatedEntityOptions = useMemo<SelectOption[]>( () =>
    relatedEntityRecords.map( ( record ) => {
      const summary = getRelatedEntitySummary( record, '' );
      return {
        value: summary.id,
        label: summary.title,
        disabled: !summary.id,
      };
    } ).filter( ( option ) => option.value ),
    [ relatedEntityRecords ]
  );

  const selectedRecord = relatedEntityRecordById.get( relatedEntityIdForQuery ) as Record<string, any> | undefined;
  
  // Detail Queries
  const brandQuery = useBrand( relatedEntityIdForQuery, {
    enabled: shouldFetchRelatedEntity && relatedEntityType === UtilsNotificationEntityType.EntityBrand,
  } );
  const campaignQuery = useCampaign( relatedEntityIdForQuery, {
    enabled: shouldFetchRelatedEntity && relatedEntityType === UtilsNotificationEntityType.EntityCampaign,
  } );
  const caseQuery = useCase( relatedEntityIdForQuery, {
    enabled: shouldFetchRelatedEntity && relatedEntityType === UtilsNotificationEntityType.EntityCase,
  } );
  
  const creatorSearchQuery = selectedRecord
    ? [ selectedRecord.first_name, selectedRecord.last_name ].filter( Boolean ).join( ' ' ) || selectedRecord.username || relatedEntityIdForQuery
    : relatedEntityIdForQuery;

  const creatorQuery = useCreator( relatedEntityIdForQuery, {
    enabled: shouldFetchRelatedEntity && relatedEntityType === UtilsNotificationEntityType.EntityCreator && role !== 'brand',
  } );
  const brandCreatorQuery = useBrandCreators( { q: creatorSearchQuery, limit: 1 }, {
    enabled: shouldFetchRelatedEntity && relatedEntityType === UtilsNotificationEntityType.EntityCreator && role === 'brand',
  } );
  const creatorGigQuery = useCreatorGigs( { q: relatedEntityIdForQuery, limit: 1 }, {
    enabled: shouldFetchRelatedEntity && relatedEntityType === UtilsNotificationEntityType.EntityGig && role === 'creator',
  } );
  const gigQuery = useGig( relatedEntityIdForQuery, {
    enabled: shouldFetchRelatedEntity && relatedEntityType === UtilsNotificationEntityType.EntityGig && role === 'admin',
  } );
  const brandGigQuery = useBrandGigs( { q: relatedEntityIdForQuery, limit: 1 }, {
    enabled: shouldFetchRelatedEntity && relatedEntityType === UtilsNotificationEntityType.EntityGig && role === 'brand',
  } );
  const invoiceQuery = useInvoice( relatedEntityIdForQuery, {
    enabled: shouldFetchRelatedEntity && relatedEntityType === UtilsNotificationEntityType.EntityInvoice,
  } );
  const paymentQuery = usePayment( relatedEntityIdForQuery, {
    enabled: shouldFetchRelatedEntity && role !== 'creator' && relatedEntityType === UtilsNotificationEntityType.EntityPayment,
  } );
  const creatorPaymentQuery = useCreatorPayment( relatedEntityIdForQuery, {
    enabled: shouldFetchRelatedEntity && role === 'creator' && relatedEntityType === UtilsNotificationEntityType.EntityPayment,
  } );
  const userQuery = useUser( relatedEntityIdForQuery, {
    enabled: shouldFetchRelatedEntity && relatedEntityType === UtilsNotificationEntityType.EntityUser,
  } );
  const videoSubmissionQuery = useVideoSubmission( relatedEntityIdForQuery, {
    enabled: shouldFetchRelatedEntity && relatedEntityType === UtilsNotificationEntityType.EntityVideoSubmission,
  } );

  const relatedEntityQuery = relatedEntityType === UtilsNotificationEntityType.EntityBrand ? brandQuery
    : relatedEntityType === UtilsNotificationEntityType.EntityCampaign ? campaignQuery
      : relatedEntityType === UtilsNotificationEntityType.EntityCase ? caseQuery
        : relatedEntityType === UtilsNotificationEntityType.EntityCreator ? ( role === 'brand' ? brandCreatorQuery : creatorQuery )
          : relatedEntityType === UtilsNotificationEntityType.EntityGig ? ( role === 'creator' ? creatorGigQuery : role === 'brand' ? brandGigQuery : gigQuery )
            : relatedEntityType === UtilsNotificationEntityType.EntityInvoice ? invoiceQuery
              : relatedEntityType === UtilsNotificationEntityType.EntityPayment ? ( role === 'creator' ? creatorPaymentQuery : paymentQuery )
                : relatedEntityType === UtilsNotificationEntityType.EntityUser ? userQuery
                  : relatedEntityType === UtilsNotificationEntityType.EntityVideoSubmission ? videoSubmissionQuery
                    : undefined;

  const relatedEntityRaw = unwrapEntityResponse( relatedEntityQuery?.data );
  const relatedEntityFromQuery = Array.isArray( relatedEntityRaw ) ? relatedEntityRaw[ 0 ] : relatedEntityRaw;
  const relatedEntity = relatedEntityFromQuery || selectedRecord;
  
  const relatedEntitySummary = relatedEntity
    ? getRelatedEntitySummary( relatedEntity, normalizedRelatedEntityId )
    : null;

  const getRelatedEntityMeta = ( value: string ): EntityMeta | undefined => {
    const record = relatedEntityRecordById.get( value ) as Record<string, any>;
    if ( !record ) return undefined;
    const summary = getRelatedEntitySummary( record, value );

    const asset = record?.video?.thumbnail
      || record?.product_image?.asset
      || record?.campaign_images?.[ 0 ]?.asset
      || record?.campaign?.product_image?.asset
      || record?.campaign?.campaign_images?.[ 0 ]?.asset
      || record?.profile_image?.asset
      || record?.logo?.asset
      || record?.brand?.logo?.asset
      || record?.creator?.profile_image?.asset
      || record?.user?.profile_image?.asset
      || record?.thumbnail?.asset
      || record?.cover_image?.asset;

    return {
      name: summary.title,
      subtitle: [ stripTags( summary.subtitle ), summary.status ].filter( Boolean ).join( ' - ' ),
      avatarUrl: asset ? imgpresets.avatar( asset ) : undefined,
    };
  };

  return {
    relatedEntityListQuery,
    relatedEntityOptions,
    relatedEntityQuery,
    relatedEntity,
    relatedEntitySummary,
    getRelatedEntityMeta,
    getInitials,
    hasRelatedEntityType,
    shouldFetchRelatedEntity,
  };
}
