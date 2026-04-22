'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { imgpresets } from '@/lib/utils/imgproxy';
import { SuperField } from '@/components/dashboard-ui/super-field';
import { Button } from '@/components/dashboard-ui/button';
import { WrappedCard } from '@/components/dashboard-ui/wrapped-card';
import { CampaignCard } from '@/components/campaigns/campaign-card';
import { CreatorCard } from '@/components/admin/creators/creator-card';
import { SubmissionCard } from '@/components/campaigns/submission-card';
import { GigCard } from '@/components/campaigns/gig-card';
import { Content } from '@/components/dashboard-ui/content';
import { useBrand, useBrandCreators, useBrandGigs, useBrands, useBrandVideoSubmissions } from '@/lib/api/hooks/brands';
import { useBrandCampaigns, useCampaign, useCampaigns } from '@/lib/api/hooks/campaigns';
import { useCase, useCases, useCreateCase } from '@/lib/api/hooks/cases';
import { useCreator, useCreatorGigs, useCreators } from '@/lib/api/hooks/creators';
import { useGig, useGigs } from '@/lib/api/hooks/gigs';
import { useInvoice, useInvoices } from '@/lib/api/hooks/invoices';
import { useCreatorEarnings, useCreatorPayment, usePayment, usePayments } from '@/lib/api/hooks/payments';
import { useUser, useUsers } from '@/lib/api/hooks/users';
import { useMyVideoSubmissions, useVideoSubmission, useVideoSubmissionsSearch } from '@/lib/api/hooks/video-submissions';
import { ModelsGigResponse, UtilsNotificationEntityType, UtilsPriority } from '@/lib/api/generated/models';
import type { EntityMeta } from '@/components/dashboard-ui/superfield/entity-select';
import type { SelectOption } from '@/components/dashboard-ui/superfield/types';
import type { HelpRole } from './help-routing';
import { stripTags } from '@/lib/utils';

interface SubmitCaseTabProps {
  role: HelpRole;
  onSuccess: () => void;
}

const priorityOptions = [
  { value: UtilsPriority.PriorityLow, label: 'Low' },
  { value: UtilsPriority.PriorityNormal, label: 'Normal' },
  { value: UtilsPriority.PriorityHigh, label: 'High' },
  { value: UtilsPriority.PriorityUrgent, label: 'Urgent' },
];

const NO_RELATED_ENTITY_TYPE = 'none';

const allowedRelatedEntityTypesByRole: Record<HelpRole, UtilsNotificationEntityType[]> = {
  admin: Object.values( UtilsNotificationEntityType ),
  brand: Object.values( UtilsNotificationEntityType ).filter(
    ( value ) =>
      value !== UtilsNotificationEntityType.EntityUser &&
      value !== UtilsNotificationEntityType.EntityBrand &&
      value !== UtilsNotificationEntityType.EntityCase &&
      value !== UtilsNotificationEntityType.EntityPayment
  ),
  creator: Object.values( UtilsNotificationEntityType ).filter(
    ( value ) =>
      value !== UtilsNotificationEntityType.EntityUser &&
      value !== UtilsNotificationEntityType.EntityCreator &&
      value !== UtilsNotificationEntityType.EntityCampaign &&
      value !== UtilsNotificationEntityType.EntityCase &&
      value !== UtilsNotificationEntityType.EntityInvoice
  ),
};

function getEntityLabel( value: UtilsNotificationEntityType ) {
  return value === UtilsNotificationEntityType.EntityVideoSubmission ? 'Video Submission' : value;
}

function getFieldValue( entity: Record<string, unknown>, keys: string[] ) {
  for ( const key of keys ) {
    const value = entity[ key ];
    if ( typeof value === 'string' && value.trim() ) return value.trim();
    if ( typeof value === 'number' ) return String( value );
  }

  return '';
}

function unwrapEntityResponse( response: unknown ) {
  if ( response && typeof response === 'object' && 'data' in response ) {
    return ( response as { data?: unknown; } ).data;
  }

  return response;
}

function getRelatedEntitySummary( entity: unknown, fallbackId: string ) {
  const record = ( entity ?? {} ) as Record<string, unknown>;
  const user = ( record.user && typeof record.user === 'object' ? record.user : {} ) as Record<string, unknown>;
  const creator = ( record.creator && typeof record.creator === 'object' ? record.creator : {} ) as Record<string, unknown>;
  const firstName = getFieldValue( record, [ 'first_name' ] ) || getFieldValue( user, [ 'first_name' ] );
  const lastName = getFieldValue( record, [ 'last_name' ] ) || getFieldValue( user, [ 'last_name' ] );
  const creatorName = [
    getFieldValue( creator, [ 'first_name' ] ),
    getFieldValue( creator, [ 'last_name' ] ),
  ].filter( Boolean ).join( ' ' );
  const personName = [ firstName, lastName ].filter( Boolean ).join( ' ' );
  const title = getFieldValue( record, [
    'title',
    'campaign_name',
    'company_name',
    'creator_name',
    'brand_name',
    'invoice_number',
    'reference',
    'case_number',
    'video_filename',
    'username',
    'email',
  ] ) || personName || creatorName || fallbackId;
  const subtitle = getFieldValue( record, [
    'description',
    'company_description',
    'brand_name',
    'campaign_name',
    'creator_name',
    'email',
    'preferred_contact_email',
    'notes',
  ] ) || getFieldValue( user, [ 'email' ] ) || getFieldValue( creator, [ 'email' ] );
  const status = getFieldValue( record, [
    'status',
    'user_status',
    'creator_status',
    'brand_status',
    'campaign_status',
    'gig_status',
    'invoice_status',
    'payment_status',
  ] );

  return {
    title,
    subtitle,
    status,
    id: getFieldValue( record, [ 'id', 'brand_id', 'creator_id', 'campaign_id', 'payment_id', 'invoice_id' ] ) || fallbackId,
  };
}

function getInitials( name?: string ) {
  if ( !name ) return '?';
  return name.split( ' ' ).map( word => word[ 0 ] ).join( '' ).toUpperCase().slice( 0, 2 );
}

export function SubmitCaseTab( { role, onSuccess }: SubmitCaseTabProps ) {
  const t = useTranslations( 'dashboard.common' );
  const { mutate: createCase, isPending } = useCreateCase();
  const relatedEntityTypeOptions = [
    { value: NO_RELATED_ENTITY_TYPE, label: t( 'helpSheet.submitCase.noRelatedEntityType' ) },
    ...allowedRelatedEntityTypesByRole[ role ].map( ( value ) => ( {
      value,
      label: getEntityLabel( value ),
    } ) ),
  ];

  const [ title, setTitle ] = useState( '' );
  const [ description, setDescription ] = useState( '' );
  const [ priority, setPriority ] = useState<UtilsPriority>( UtilsPriority.PriorityNormal );
  const [ relatedEntityId, setRelatedEntityId ] = useState( '' );
  const [ relatedEntityType, setRelatedEntityType ] = useState<UtilsNotificationEntityType | typeof NO_RELATED_ENTITY_TYPE>(
    NO_RELATED_ENTITY_TYPE
  );
  const [ errors, setErrors ] = useState<{ title?: string; description?: string; }>( {} );
  const normalizedRelatedEntityId = relatedEntityId.trim();
  const shouldFetchRelatedEntity = relatedEntityType !== NO_RELATED_ENTITY_TYPE && !!normalizedRelatedEntityId;
  const relatedEntityIdForQuery = shouldFetchRelatedEntity ? normalizedRelatedEntityId : '';
  const hasRelatedEntityType = relatedEntityType !== NO_RELATED_ENTITY_TYPE;
  const isRelatedEntityType = ( type: UtilsNotificationEntityType ) => hasRelatedEntityType && relatedEntityType === type;

  const adminBrandsQuery = useBrands(
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
  const relatedEntityTypeLabel = relatedEntityType !== NO_RELATED_ENTITY_TYPE
    ? getEntityLabel( relatedEntityType ).toLowerCase()
    : 'entity';
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

  const brandQuery = useBrand( relatedEntityIdForQuery, {
    enabled: shouldFetchRelatedEntity && relatedEntityType === UtilsNotificationEntityType.EntityBrand,
  } );
  const campaignQuery = useCampaign( relatedEntityIdForQuery, {
    enabled: shouldFetchRelatedEntity && relatedEntityType === UtilsNotificationEntityType.EntityCampaign,
  } );
  const caseQuery = useCase( relatedEntityIdForQuery, {
    enabled: shouldFetchRelatedEntity && relatedEntityType === UtilsNotificationEntityType.EntityCase,
  } );
  const selectedRecord = relatedEntityRecordById.get( relatedEntityIdForQuery ) as Record<string, any> | undefined;
  const creatorSearchQuery = selectedRecord
    ? [ selectedRecord.first_name, selectedRecord.last_name ].filter( Boolean ).join( ' ' ) || selectedRecord.username || relatedEntityIdForQuery
    : relatedEntityIdForQuery;

  const creatorQuery = useCreator( relatedEntityIdForQuery, {
    enabled: shouldFetchRelatedEntity && relatedEntityType === UtilsNotificationEntityType.EntityCreator && role !== 'brand',
  } );
  const brandCreatorQuery = useBrandCreators( { q: creatorSearchQuery, limit: 1 }, {
    enabled: shouldFetchRelatedEntity && relatedEntityType === UtilsNotificationEntityType.EntityCreator && role === 'brand',
  } );
  const gigQuery = useGig( relatedEntityIdForQuery, {
    enabled: shouldFetchRelatedEntity && relatedEntityType === UtilsNotificationEntityType.EntityGig && role !== 'brand',
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
          : relatedEntityType === UtilsNotificationEntityType.EntityGig ? ( role === 'brand' ? brandGigQuery : gigQuery )
            : relatedEntityType === UtilsNotificationEntityType.EntityInvoice ? invoiceQuery
              : relatedEntityType === UtilsNotificationEntityType.EntityPayment ? ( role === 'creator' ? creatorPaymentQuery : paymentQuery )
                : relatedEntityType === UtilsNotificationEntityType.EntityUser ? userQuery
                  : relatedEntityType === UtilsNotificationEntityType.EntityVideoSubmission ? videoSubmissionQuery
                    : undefined;
  const relatedEntityRaw = unwrapEntityResponse( relatedEntityQuery?.data );
  const relatedEntityFromQuery = Array.isArray( relatedEntityRaw ) ? relatedEntityRaw[ 0 ] : relatedEntityRaw;
  const relatedEntity = selectedRecord || relatedEntityFromQuery;
  const relatedEntitySummary = relatedEntity
    ? getRelatedEntitySummary( relatedEntity, normalizedRelatedEntityId )
    : null;

  const validate = () => {
    const next: typeof errors = {};
    if ( !title.trim() ) next.title = t( 'helpSheet.submitCase.titleRequired' );
    if ( !description.trim() ) next.description = t( 'helpSheet.submitCase.descriptionRequired' );
    setErrors( next );
    return Object.keys( next ).length === 0;
  };

  const handleSubmit = ( e: React.FormEvent ) => {
    e.preventDefault();
    if ( !validate() ) return;

    const request = {
      title: title.trim(),
      description: description.trim(),
      priority,
      ...( relatedEntityId.trim() ? { related_entity_id: relatedEntityId.trim() } : {} ),
      ...( relatedEntityType !== NO_RELATED_ENTITY_TYPE ? { related_entity_type: relatedEntityType } : {} ),
    };

    createCase(
      request,
      {
        onSuccess: () => {
          toast.success( t( 'helpSheet.submitCase.successToast' ) );
          setTitle( '' );
          setDescription( '' );
          setPriority( UtilsPriority.PriorityNormal );
          setRelatedEntityId( '' );
          setRelatedEntityType( NO_RELATED_ENTITY_TYPE );
          setErrors( {} );
          onSuccess();
        },
        onError: () => toast.error( t( 'helpSheet.submitCase.errorToast' ) ),
      }
    );
  };

  return (
    <form onSubmit={ handleSubmit } className="flex flex-col gap-4" noValidate>
      <SuperField
        name="title"
        type="text"
        label={ t( 'helpSheet.submitCase.titleLabel' ) }
        placeholder={ t( 'helpSheet.submitCase.titlePlaceholder' ) }
        required
        value={ title }
        onChange={ ( e ) => {
          setTitle( e.target.value );
          if ( errors.title ) setErrors( prev => ( { ...prev, title: undefined } ) );
        } }
        error={ errors.title }
      />

      <SuperField
        name="description"
        type="textarea"
        label={ t( 'helpSheet.submitCase.descriptionLabel' ) }
        placeholder={ t( 'helpSheet.submitCase.descriptionPlaceholder' ) }
        required
        value={ description }
        onChange={ ( e ) => {
          setDescription( e.target.value );
          if ( errors.description ) setErrors( prev => ( { ...prev, description: undefined } ) );
        } }
        error={ errors.description }
        fieldClassName="min-h-[120px]"
      />

      <SuperField
        name="priority"
        type="select"
        label={ t( 'helpSheet.submitCase.priorityLabel' ) }
        options={ priorityOptions }
        value={ priority }
        onValueChange={ ( v ) => setPriority( v as UtilsPriority ) }
      />

      <SuperField
        name="relatedEntityType"
        type="select"
        label={ t( 'helpSheet.submitCase.relatedEntityTypeLabel' ) }
        options={ relatedEntityTypeOptions }
        value={ relatedEntityType }
        onValueChange={ ( v ) => {
          setRelatedEntityType(
            ( v || NO_RELATED_ENTITY_TYPE ) as UtilsNotificationEntityType | typeof NO_RELATED_ENTITY_TYPE
          );
          setRelatedEntityId( '' );
        } }
      />

      <SuperField
        name="relatedEntityId"
        type="entity-select"
        label={ t( 'helpSheet.submitCase.relatedEntityIdLabel' ) }
        placeholder={
          relatedEntityListQuery?.isLoading
            ? t( 'helpSheet.submitCase.relatedEntityOptionsLoading', { entity: relatedEntityTypeLabel } )
            : t( 'helpSheet.submitCase.relatedEntityIdPlaceholder', { entity: relatedEntityTypeLabel } )
        }
        options={ relatedEntityOptions }
        value={ relatedEntityId }
        onValueChange={ ( value ) => setRelatedEntityId( value || '' ) }
        disabled={ !hasRelatedEntityType || relatedEntityListQuery?.isLoading || relatedEntityOptions.length === 0 }
        getEntityMeta={ getRelatedEntityMeta }
        getInitials={ getInitials }
        avatarClassName="size-8"
        fieldClassName="h-12"
      />

      { shouldFetchRelatedEntity && (
        <WrappedCard
          title={ t( 'helpSheet.submitCase.relatedEntityDetailsTitle' ) }
          className="shadow-none"
          contentClass="gap-2 bg-muted-foreground/5"
        >
          { relatedEntityQuery?.isLoading ? (
            <p className="text-sm text-muted-foreground">{ t( 'helpSheet.submitCase.relatedEntityLoading' ) }</p>
          ) : relatedEntityQuery?.isError ? (
            <p className="text-sm text-destructive">{ t( 'helpSheet.submitCase.relatedEntityError' ) }</p>
          ) : relatedEntitySummary ? (
            relatedEntityType === UtilsNotificationEntityType.EntityCampaign && relatedEntity ? (
              <CampaignCard campaign={ relatedEntity as any } />
            ) : relatedEntityType === UtilsNotificationEntityType.EntityCreator && relatedEntity ? (
              <div className="w-[200px] max-w-full"><CreatorCard creator={ relatedEntity as any } onViewDetails={ () => { } } /></div>
            ) : relatedEntityType === UtilsNotificationEntityType.EntityVideoSubmission && relatedEntity ? (
              <SubmissionCard submission={ relatedEntity as any } layout="media-overlay" />
            ) : relatedEntityType === UtilsNotificationEntityType.EntityGig && relatedEntity ? (
              <GigCard gig={ relatedEntity as ModelsGigResponse } onViewGig={ () => { } } />
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
                  { getEntityLabel( relatedEntityType ) } - { relatedEntitySummary.id }
                </p>
              </div>
            )
          ) : (
            <p className="text-sm text-muted-foreground">{ t( 'helpSheet.submitCase.relatedEntityEmpty' ) }</p>
          ) }
        </WrappedCard>
      ) }

      <Button type="submit" disabled={ isPending } className="w-full">
        { isPending ? t( 'helpSheet.submitCase.submitting' ) : t( 'helpSheet.submitCase.submit' ) }
      </Button>
    </form>
  );
}
