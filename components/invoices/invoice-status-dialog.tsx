'use client';

import { useEffect, useMemo } from 'react';
import { useForm } from '@tanstack/react-form';
import { useTranslations } from 'next-intl';
import { z } from 'zod/v4';

import { Button } from '@/components/dashboard-ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/dashboard-ui/dialog';
import { SuperField } from '@/components/dashboard-ui/super-field';
import {
  ModelsInvoiceResponse,
  ModelsUpdateInvoiceRequest,
  UtilsInvoiceStatus,
} from '@/lib/api/generated/models';

interface InvoiceStatusDialogProps {
  open: boolean;
  onOpenChange: ( open: boolean ) => void;
  invoice: ModelsInvoiceResponse;
  isSubmitting: boolean;
  onSubmit: ( request: ModelsUpdateInvoiceRequest ) => void;
}

function parseDate( value?: string ): Date | undefined {
  if ( !value ) return undefined;
  const [ year, month, day ] = value.slice( 0, 10 ).split( '-' ).map( Number );
  if ( !year || !month || !day ) return undefined;
  return new Date( year, month - 1, day );
}

function formatDate( value?: Date ): string | undefined {
  if ( !value || Number.isNaN( value.getTime() ) ) return undefined;
  return new Date( Date.UTC(
    value.getFullYear(),
    value.getMonth(),
    value.getDate()
  ) ).toISOString();
}

function getFieldError( errors: unknown[] | undefined ) {
  if ( !errors?.length ) return undefined;
  const uniqueMessages = Array.from(
    new Set(
      errors
        .map( ( error ) => {
          if ( typeof error === 'string' ) return error;
          if ( error && typeof error === 'object' && 'message' in error ) {
            const message = ( error as { message?: unknown; } ).message;
            return typeof message === 'string' ? message : String( message );
          }
          return String( error );
        } )
        .filter( Boolean )
    )
  );
  return uniqueMessages.join( ', ' );
}

export function InvoiceStatusDialog( {
  open,
  onOpenChange,
  invoice,
  isSubmitting,
  onSubmit,
}: InvoiceStatusDialogProps ) {
  const t = useTranslations( 'dashboard.brand.invoicesPage' );
  const initialStatus = ( invoice.invoice_status as UtilsInvoiceStatus ) || 'draft';
  const statusValues = Object.values( UtilsInvoiceStatus ) as [ UtilsInvoiceStatus, ...UtilsInvoiceStatus[] ];

  const formSchema = useMemo( () => z.object( {
    status: z.enum( statusValues, { message: t( 'dialogs.setStatus.statusRequired' ) } )
      .refine( ( value ) => value !== initialStatus, {
        message: t( 'dialogs.setStatus.statusChanged' ),
      } ),
    paidDate: z.custom<Date | undefined>(),
    notes: z.string(),
  } ), [ statusValues, initialStatus, t ] );

  const form = useForm( {
    defaultValues: {
      status: initialStatus,
      paidDate: parseDate( invoice.paid_date ),
      notes: invoice.notes || '',
    },
    validators: {
      onChange: formSchema,
      onSubmit: formSchema,
    },
    onSubmit: async ( { value } ) => {
      const isPaid = value.status === 'paid';
      onSubmit( {
        invoice_status: value.status,
        paid_date: isPaid
          ? ( formatDate( value.paidDate ) ?? new Date().toISOString() )
          : undefined,
        notes: value.notes.trim() || undefined,
      } );
    },
  } );

  useEffect( () => {
    if ( !open ) return;
    form.reset( {
      status: initialStatus,
      paidDate: parseDate( invoice.paid_date ),
      notes: invoice.notes || '',
    } );
  }, [ open, initialStatus, invoice.paid_date, invoice.notes, form ] );

  const statusOptions = [
    { value: UtilsInvoiceStatus.InvoiceStatusDraft, label: t( 'dialogs.setStatus.statuses.draft' ) },
    { value: UtilsInvoiceStatus.InvoiceStatusIssued, label: t( 'dialogs.setStatus.statuses.issued' ) },
    { value: UtilsInvoiceStatus.InvoiceStatusSent, label: t( 'dialogs.setStatus.statuses.sent' ) },
    { value: UtilsInvoiceStatus.InvoiceStatusPaid, label: t( 'dialogs.setStatus.statuses.paid' ) },
    { value: UtilsInvoiceStatus.InvoiceStatusOverdue, label: t( 'dialogs.setStatus.statuses.overdue' ) },
    { value: UtilsInvoiceStatus.InvoiceStatusCancelled, label: t( 'dialogs.setStatus.statuses.cancelled' ) },
  ];

  return (
    <Dialog open={ open } onOpenChange={ onOpenChange }>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="font-primary text-h5 font-normal text-primary!">
            { t( 'dialogs.setStatus.title' ) }
          </DialogTitle>
          <DialogDescription>{ t( 'dialogs.setStatus.description' ) }</DialogDescription>
        </DialogHeader>
        <form
          noValidate
          className="grid gap-4 py-4"
          onSubmit={ ( e ) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          } }
        >
          <form.Field
            name="status"
            children={ ( field ) => (
              <SuperField
                type="select"
                label={ t( 'dialogs.setStatus.statusLabel' ) }
                required
                value={ field.state.value }
                onValueChange={ ( value ) => {
                  field.handleChange( ( value as UtilsInvoiceStatus ) || 'draft' );
                  field.handleBlur();
                } }
                options={ statusOptions }
                error={ getFieldError( field.state.meta.errors ) }
              />
            ) }
          />
          <form.Subscribe
            selector={ ( state ) => state.values.status }
            children={ ( watchedStatus ) => watchedStatus === 'paid' ? (
              <form.Field
                name="paidDate"
                children={ ( field ) => (
                  <SuperField
                    type="datepicker"
                    label={ t( 'dialogs.setStatus.paidDateLabel' ) }
                    value={ field.state.value }
                    onChange={ ( value ) => {
                      field.handleChange( value as Date | undefined );
                      field.handleBlur();
                    } }
                    error={ getFieldError( field.state.meta.errors ) }
                  />
                ) }
              />
            ) : null }
          />
          <form.Field
            name="notes"
            children={ ( field ) => (
              <SuperField
                type="textarea"
                label={ t( 'dialogs.setStatus.notesLabel' ) }
                value={ field.state.value }
                onChange={ ( e ) => field.handleChange( e.target.value ) }
                placeholder={ t( 'dialogs.setStatus.notesPlaceholder' ) }
                error={ getFieldError( field.state.meta.errors ) }
              />
            ) }
          />
          <DialogFooter>
            <Button variant="outline" type="button" onClick={ () => onOpenChange( false ) } disabled={ isSubmitting }>
              { t( 'dialogs.setStatus.cancel' ) }
            </Button>
            <form.Subscribe
              selector={ ( state ) => [ state.canSubmit, state.isSubmitting ] }
              children={ ( [ canSubmit, isFormSubmitting ] ) => (
                <Button type="submit" disabled={ !canSubmit || isSubmitting || isFormSubmitting }>
                  { isSubmitting || isFormSubmitting
                    ? t( 'dialogs.setStatus.saving' )
                    : t( 'dialogs.setStatus.saveLabel' ) }
                </Button>
              ) }
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
