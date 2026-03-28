'use client';

import * as React from 'react';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/dashboard-ui/button';
import { ConfirmDialog } from '@/components/dashboard-ui/confirm-dialog';
import { SuperField } from '@/components/dashboard-ui/super-field';
import { useCampaigns } from '@/lib/api/hooks/campaigns';
import { useCreateInvoice } from '@/lib/api/hooks/invoices';
import type { ApiError } from '@/lib/api/hooks/types';
import { CampaignsSearchGetStatusEnum } from '@/lib/api/generated/api';
import type { ModelsCampaignResponse } from '@/lib/api/generated/models';
import { useTranslations } from 'next-intl';

interface NewInvoiceDialogProps {
  onCreated?: () => void;
}

export function NewInvoiceDialog( { onCreated }: NewInvoiceDialogProps ) {
  const t = useTranslations( 'dashboard.admin.invoicesPage.createInvoice' );
  const [ open, setOpen ] = React.useState( false );
  const [ campaignId, setCampaignId ] = React.useState<string | undefined>();
  const [ dueDate, setDueDate ] = React.useState<Date | undefined>();
  const [ notes, setNotes ] = React.useState( '' );

  const { data: campaignsResponse, isLoading: isCampaignsLoading } = useCampaigns( {
    status: CampaignsSearchGetStatusEnum.CampaignStatusCompleted,
    limit: 100,
    page: 1,
  }, {
    enabled: open,
  } );

  const campaigns = React.useMemo( () => {
    const data = campaignsResponse?.data;
    return Array.isArray( data ) ? data : [] as ModelsCampaignResponse[];
  }, [ campaignsResponse ] );

  const campaignOptions = React.useMemo( () => campaigns
    .filter( ( campaign ) => campaign.id && campaign.campaign_name )
    .map( ( campaign ) => ( {
      value: campaign.id as string,
      label: campaign.brand_name
        ? `${ campaign.campaign_name } · ${ campaign.brand_name }`
        : campaign.campaign_name as string,
    } ) ), [ campaigns ] );

  const createInvoice = useCreateInvoice( {
    onSuccess: () => {
      toast.success( t( 'success' ) );
      setOpen( false );
      setCampaignId( undefined );
      setDueDate( undefined );
      setNotes( '' );
      onCreated?.();
    },
    onError: ( error ) => {
      const apiError = error as ApiError;
      toast.error( t( 'error' ), {
        description: apiError.response?.data?.error?.message || t( 'errorDescription' ),
        richColors: true,
      } );
    },
  } );

  const handleOpenChange = ( nextOpen: boolean ) => {
    setOpen( nextOpen );

    if ( !nextOpen ) {
      setCampaignId( undefined );
      setDueDate( undefined );
      setNotes( '' );
    }
  };

  const handleCreate = () => {
    if ( !campaignId ) return;

    createInvoice.mutate( {
      campaign_id: campaignId,
      due_date: dueDate?.toISOString() || undefined,
      notes: notes.trim() || undefined,
    } );
  };

  return (
    <>
      <Button onClick={ () => setOpen( true ) }>
        <Plus className='size-4' />
        { t( 'trigger' ) }
      </Button>

      <ConfirmDialog
        open={ open }
        onOpenChange={ handleOpenChange }
        title={ t( 'title' ) }
        description={ t( 'description' ) }
        confirmLabel={ t( 'confirm' ) }
        cancelLabel={ t( 'cancel' ) }
        onConfirm={ handleCreate }
        confirmDisabled={ !campaignId }
        isLoading={ createInvoice.isPending }
        loadingText={ t( 'creating' ) }
      >
        <SuperField
          type='searchable-select'
          label={ t( 'campaignLabel' ) }
          placeholder={ isCampaignsLoading ? t( 'campaignLoading' ) : t( 'campaignPlaceholder' ) }
          value={ campaignId }
          onValueChange={ ( value ) => setCampaignId( value ?? undefined ) }
          options={ campaignOptions }
          disabled={ isCampaignsLoading || campaignOptions.length === 0 }
          required
        />
        <SuperField
          type='datepicker'
          label={ t( 'dueDateLabel' ) }
          value={ dueDate }
          onChange={ ( value ) => setDueDate( value as Date ) }
        />
        <SuperField
          type='textarea'
          label={ t( 'notesLabel' ) }
          placeholder={ t( 'notesPlaceholder' ) }
          value={ notes }
          onChange={ ( event ) => setNotes( event.target.value ) }
          rows={ 4 }
        />
      </ConfirmDialog>
    </>
  );
}
