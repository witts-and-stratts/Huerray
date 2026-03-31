'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { SuperField } from '@/components/dashboard-ui/super-field';
import { Button } from '@/components/dashboard-ui/button';
import { useCreateCase } from '@/lib/api/hooks/cases';
import { UtilsPriority } from '@/lib/api/generated/models';

interface SubmitCaseTabProps {
  onSuccess: () => void;
}

const priorityOptions = [
  { value: UtilsPriority.PriorityLow, label: 'Low' },
  { value: UtilsPriority.PriorityNormal, label: 'Normal' },
  { value: UtilsPriority.PriorityHigh, label: 'High' },
  { value: UtilsPriority.PriorityUrgent, label: 'Urgent' },
];

export function SubmitCaseTab( { onSuccess }: SubmitCaseTabProps ) {
  const t = useTranslations( 'dashboard.common' );
  const { mutate: createCase, isPending } = useCreateCase();

  const [ title, setTitle ] = useState( '' );
  const [ description, setDescription ] = useState( '' );
  const [ priority, setPriority ] = useState<UtilsPriority>( UtilsPriority.PriorityNormal );
  const [ errors, setErrors ] = useState<{ title?: string; description?: string }>( {} );

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

    createCase(
      { title: title.trim(), description: description.trim(), priority },
      {
        onSuccess: () => {
          toast.success( t( 'helpSheet.submitCase.successToast' ) );
          setTitle( '' );
          setDescription( '' );
          setPriority( UtilsPriority.PriorityNormal );
          setErrors( {} );
          onSuccess();
        },
        onError: () => toast.error( t( 'helpSheet.submitCase.errorToast' ) ),
      }
    );
  };

  return (
    <form onSubmit={ handleSubmit } className="flex flex-col gap-4">
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

      <Button type="submit" disabled={ isPending } className="w-full">
        { isPending ? t( 'helpSheet.submitCase.submitting' ) : t( 'helpSheet.submitCase.submit' ) }
      </Button>
    </form>
  );
}
