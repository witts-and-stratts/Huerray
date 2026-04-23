'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { SuperField } from '@/components/dashboard-ui/super-field';
import { Button } from '@/components/dashboard-ui/button';
import { useCreateCase } from '@/lib/api/hooks/cases';
import { UtilsNotificationEntityType, UtilsPriority } from '@/lib/api/generated/models';
import {
  NO_RELATED_ENTITY_TYPE,
  priorityOptions,
  allowedRelatedEntityTypesByRole,
  getEntityLabel,
  HelpRole
} from '@/lib/utils/help-center';
import { useHelpCenterData } from './use-help-center-data';
import { RelatedEntityPreview } from './RelatedEntityPreview';

interface SubmitCaseTabProps {
  role: HelpRole;
  onSuccess: () => void;
}

export function SubmitCaseTab( { role, onSuccess }: SubmitCaseTabProps ) {
  const t = useTranslations( 'dashboard.common' );
  const { mutate: createCase, isPending } = useCreateCase();

  const [ title, setTitle ] = useState( '' );
  const [ description, setDescription ] = useState( '' );
  const [ priority, setPriority ] = useState<UtilsPriority>( UtilsPriority.PriorityNormal );
  const [ relatedEntityId, setRelatedEntityId ] = useState( '' );
  const [ relatedEntityType, setRelatedEntityType ] = useState<UtilsNotificationEntityType | typeof NO_RELATED_ENTITY_TYPE>(
    NO_RELATED_ENTITY_TYPE
  );
  const [ errors, setErrors ] = useState<{ title?: string; description?: string; }>( {} );

  const {
    relatedEntityListQuery,
    relatedEntityOptions,
    relatedEntityQuery,
    relatedEntity,
    relatedEntitySummary,
    getRelatedEntityMeta,
    getInitials,
    hasRelatedEntityType,
    shouldFetchRelatedEntity,
  } = useHelpCenterData( role, relatedEntityType, relatedEntityId );

  const relatedEntityTypeOptions = [
    { value: NO_RELATED_ENTITY_TYPE, label: t( 'helpSheet.submitCase.noRelatedEntityType' ) },
    ...allowedRelatedEntityTypesByRole[ role ].map( ( value ) => ( {
      value,
      label: getEntityLabel( value ),
    } ) ),
  ];

  const validate = () => {
    const next: typeof errors = {};
    if ( !title.trim() ) next.title = t( 'helpSheet.submitCase.titleRequired' );
    if ( !description.trim() ) next.description = t( 'helpSheet.submitCase.descriptionRequired' );
    setErrors( next );
    return Object.keys( next ).length === 0;
  };

  const handleSubmit = () => {
    if ( !validate() ) return;

    createCase( {
      title,
      description,
      priority,
      related_entity_id: relatedEntityId || undefined,
      related_entity_type: relatedEntityType !== NO_RELATED_ENTITY_TYPE ? relatedEntityType : undefined,
    }, {
      onSuccess: () => {
        toast.success( t( 'helpSheet.submitCase.successToast' ) );
        onSuccess();
      },
      onError: () => {
        toast.error( t( 'helpSheet.submitCase.errorToast' ) );
      },
    } );
  };

  const relatedEntityTypeLabel = relatedEntityType !== NO_RELATED_ENTITY_TYPE
    ? getEntityLabel( relatedEntityType ).toLowerCase()
    : 'entity';

  return (
    <div className="help-submit">
      <div className="help-submit__fields">
        <SuperField
          type='text'
          label={ t( 'helpSheet.submitCase.titleLabel' ) }
          placeholder={ t( 'helpSheet.submitCase.titlePlaceholder' ) }
          value={ title }
          onValueChange={ setTitle }
          error={ errors.title }
          fieldClassName="h-12"
        />

        <SuperField
          label={ t( 'helpSheet.submitCase.descriptionLabel' ) }
          placeholder={ t( 'helpSheet.submitCase.descriptionPlaceholder' ) }
          type="textarea"
          value={ description }
          onValueChange={ setDescription }
          error={ errors.description }
          rows={ 4 }
          fieldClassName='min-h-50'
        />

        <SuperField
          label={ t( 'helpSheet.submitCase.priorityLabel' ) }
          type="select"
          options={ priorityOptions }
          value={ priority }
          onValueChange={ ( val ) => setPriority( val as UtilsPriority ) }
          fieldClassName="h-12"
        />

        <SuperField
          label={ t( 'helpSheet.submitCase.relatedToLabel' ) }
          type="select"
          options={ relatedEntityTypeOptions }
          value={ relatedEntityType }
          onValueChange={ ( val ) => {
            setRelatedEntityType( val as any );
            setRelatedEntityId( '' );
          } }
          fieldClassName="h-12"
        />

        { hasRelatedEntityType && (
          <SuperField
            name="relatedEntityId"
            type="entity-select"
            label={ t( 'helpSheet.submitCase.relatedEntityIdDynamicLabel', { entity: getEntityLabel( relatedEntityType as UtilsNotificationEntityType ) } ) }
            placeholder={
              relatedEntityListQuery?.isLoading
                ? t( 'helpSheet.submitCase.relatedEntityOptionsLoading', { entity: relatedEntityTypeLabel } )
                : t( 'helpSheet.submitCase.relatedEntityIdPlaceholder', { entity: relatedEntityTypeLabel } )
            }
            options={ relatedEntityOptions }
            value={ relatedEntityId }
            onValueChange={ ( value ) => setRelatedEntityId( value || '' ) }
            disabled={ relatedEntityListQuery?.isLoading || relatedEntityOptions.length === 0 }
            getEntityMeta={ getRelatedEntityMeta }
            getInitials={ getInitials }
            avatarClassName="size-8"
            fieldClassName="h-12"
          />
        ) }

        { shouldFetchRelatedEntity && (
          <RelatedEntityPreview
            relatedEntityType={ relatedEntityType }
            relatedEntityQuery={ relatedEntityQuery }
            relatedEntity={ relatedEntity }
            relatedEntitySummary={ relatedEntitySummary }
          />
        ) }
      </div>

      <div className="help-submit__footer">
        <Button
          className="help-submit__button"
          onClick={ handleSubmit }
          disabled={ isPending }
        >
          { isPending ? t( 'helpSheet.submitCase.submitting' ) : t( 'helpSheet.submitCase.submit' ) }
        </Button>
      </div>
    </div>
  );
}
