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
import { ModelsInvoiceResponse, ModelsUpdateInvoiceRequest } from '@/lib/api/generated/models';

interface InvoiceMarkAsPaidDialogProps {
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
      errors.map( ( error ) => {
        if ( typeof error === 'string' ) return error;
        if ( error && typeof error === 'object' && 'message' in error ) {
          const message = ( error as { message?: unknown; } ).message;
          return typeof message === 'string' ? message : String( message );
        }
        return String( error );
      } ).filter( Boolean )
    )
  );
  return uniqueMessages.join( ', ' );
}

export function InvoiceMarkAsPaidDialog( {
  open,
  onOpenChange,
  invoice,
  isSubmitting,
  onSubmit,
}: InvoiceMarkAsPaidDialogProps ) {
  const t = useTranslations( 'dashboard.brand.invoicesPage' );

  const formSchema = useMemo( () => z.object( {
    paidDate: z.date(),
    notes: z.string(),
  } ), [] );

  const form = useForm( {
    defaultValues: {
      paidDate: parseDate( invoice.paid_date ) ?? new Date(),
      notes: invoice.notes || '',
    },
    validators: {
      onChange: formSchema,
      onSubmit: formSchema,
    },
    onSubmit: async ( { value } ) => {
      onSubmit( {
        invoice_status: 'paid',
        paid_date: formatDate( value.paidDate ) ?? new Date().toISOString(),
        notes: value.notes.trim() || undefined,
      } );
    },
  } );

  const resetValues = useMemo( () => ( {
    paidDate: parseDate( invoice.paid_date ) ?? new Date(),
    notes: invoice.notes || '',
  } ), [ invoice.paid_date, invoice.notes ] );

  useEffect( () => {
    if ( !open ) return;
    form.reset( resetValues );
  }, [ open, form, resetValues ] );

  return (
    <Dialog open={ open } onOpenChange={ onOpenChange }>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="font-primary text-h5 font-normal text-primary!">
            { t( 'dialogs.invoicePaid.title' ) }
          </DialogTitle>
          <DialogDescription>{ t( 'dialogs.invoicePaid.description' ) }</DialogDescription>
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
            name="paidDate"
            children={ ( field ) => (
              <SuperField
                type="datepicker"
                label={ t( 'dialogs.invoicePaid.paidDateLabel' ) }
                value={ field.state.value }
                onChange={ ( value ) => {
                  field.handleChange( ( value as Date | undefined ) ?? new Date() );
                  field.handleBlur();
                } }
                error={ getFieldError( field.state.meta.errors ) }
              />
            ) }
          />
          <form.Field
            name="notes"
            children={ ( field ) => (
              <SuperField
                type="textarea"
                label={ t( 'dialogs.invoicePaid.notesLabel' ) }
                value={ field.state.value }
                onChange={ ( e ) => field.handleChange( e.target.value ) }
                placeholder={ t( 'dialogs.invoicePaid.notesPlaceholder' ) }
                error={ getFieldError( field.state.meta.errors ) }
              />
            ) }
          />
          <DialogFooter>
            <Button variant="outline" type="button" onClick={ () => onOpenChange( false ) } disabled={ isSubmitting }>
              { t( 'dialogs.invoicePaid.cancel' ) }
            </Button>
            <form.Subscribe
              selector={ ( state ) => [ state.canSubmit, state.isSubmitting ] }
              children={ ( [ canSubmit, isFormSubmitting ] ) => (
                <Button type="submit" disabled={ !canSubmit || isSubmitting || isFormSubmitting }>
                  { isSubmitting || isFormSubmitting
                    ? t( 'dialogs.invoicePaid.loading' )
                    : t( 'dialogs.invoicePaid.confirmLabel' ) }
                </Button>
              ) }
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
