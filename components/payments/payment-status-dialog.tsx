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
  ModelsPaymentResponse,
  ModelsUpdatePaymentStatusRequest,
  UtilsPaymentMethod,
  UtilsPaymentStatus,
} from '@/lib/api/generated/models';
import { getPaymentMethodOptions } from './payment-method-options';

interface PaymentStatusDialogProps {
  open: boolean;
  onOpenChange: ( open: boolean ) => void;
  payment: ModelsPaymentResponse;
  isSubmitting: boolean;
  onSubmit: ( request: ModelsUpdatePaymentStatusRequest ) => void;
}

function parsePaymentDate( value?: string ): Date | undefined {
  if ( !value ) return undefined;
  const [ year, month, day ] = value.slice( 0, 10 ).split( '-' ).map( Number );
  if ( !year || !month || !day ) return undefined;
  return new Date( year, month - 1, day );
}

function formatPaymentDate( value?: Date ): string | undefined {
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

function normalizePaymentMethod( value?: string ): UtilsPaymentMethod | undefined {
  if ( !value ) return undefined;
  return Object.values( UtilsPaymentMethod ).includes( value as UtilsPaymentMethod )
    ? value as UtilsPaymentMethod
    : undefined;
}

export function PaymentStatusDialog( {
  open,
  onOpenChange,
  payment,
  isSubmitting,
  onSubmit,
}: PaymentStatusDialogProps ) {
  const t = useTranslations( 'dashboard.common' );
  const paymentMethodOptions = getPaymentMethodOptions( t );
  const initialStatus = ( payment.payment_status as UtilsPaymentStatus ) || 'pending';
  const statusValues = Object.values( UtilsPaymentStatus ) as [ UtilsPaymentStatus, ...UtilsPaymentStatus[] ];
  const paymentMethodValues = Object.values( UtilsPaymentMethod ) as [ UtilsPaymentMethod, ...UtilsPaymentMethod[] ];
  const paymentMethodRequiredMessage = 'Payment method is required';
  const paymentDateRequiredMessage = 'Payment date is required';
  const statusChangedMessage = 'Select a different status';
  const formSchema = useMemo( () => z.object( {
    status: z.enum( statusValues, {
      message: t( 'sheets.statusRequired' ),
    } ),
    paymentMethod: z.string().min( 1, paymentMethodRequiredMessage ).refine(
      ( value ): value is UtilsPaymentMethod => paymentMethodValues.includes( value as UtilsPaymentMethod ),
      paymentMethodRequiredMessage
    ),
    paymentDate: z.custom<Date>(
      ( value ) => value instanceof Date && !Number.isNaN( value.getTime() ),
      paymentDateRequiredMessage
    ),
    notes: z.string(),
  } ).refine( ( value ) => value.status !== initialStatus, {
    message: statusChangedMessage,
    path: [ 'status' ],
  } ), [
    initialStatus,
    paymentMethodRequiredMessage,
    paymentDateRequiredMessage,
    paymentMethodValues,
    statusChangedMessage,
    statusValues,
    t
  ] );

  const form = useForm( {
    defaultValues: {
      status: initialStatus,
      paymentMethod: payment.payment_method || '',
      paymentDate: parsePaymentDate( payment.payment_date ),
      notes: payment.notes || '',
    },
    validators: {
      onChange: formSchema,
      onSubmit: formSchema,
    },
    onSubmit: async ( { value } ) => {
      onSubmit( {
        payment_status: value.status,
        payment_method: normalizePaymentMethod( value.paymentMethod ),
        payment_date: formatPaymentDate( value.paymentDate ),
        notes: value.notes.trim() || undefined,
      } );
    },
  } );

  useEffect( () => {
    if ( !open ) return;

    form.reset( {
      status: initialStatus,
      paymentMethod: payment.payment_method || '',
      paymentDate: parsePaymentDate( payment.payment_date ),
      notes: payment.notes || '',
    } );
  }, [ open, initialStatus, payment.notes, payment.payment_date, payment.payment_method, form ] );

  const statusOptions = [
    { value: UtilsPaymentStatus.PaymentStatusPending, label: t( 'payments.status.pending' ) },
    { value: UtilsPaymentStatus.PaymentStatusProcessing, label: t( 'payments.status.processing' ) },
    { value: UtilsPaymentStatus.PaymentStatusCompleted, label: t( 'payments.status.completed' ) },
    { value: UtilsPaymentStatus.PaymentStatusFailed, label: t( 'payments.status.failed' ) },
    { value: UtilsPaymentStatus.PaymentStatusCancelled, label: t( 'payments.status.cancelled' ) },
  ];

  return (
    <Dialog open={ open } onOpenChange={ onOpenChange }>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="font-primary text-h5 font-normal text-primary!">
            { t( 'payments.actions.setStatus' ) }
          </DialogTitle>
          <DialogDescription>{ t( 'payments.actions.setStatusDescription' ) }</DialogDescription>
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
                label={ t( 'status' ) }
                required
                value={ field.state.value }
                onValueChange={ ( value ) => {
                  field.handleChange( ( value as UtilsPaymentStatus ) || 'pending' );
                  field.handleBlur();
                } }
                options={ statusOptions }
                error={ getFieldError( field.state.meta.errors ) }
              />
            ) }
          />
          <form.Field
            name="paymentMethod"
            children={ ( field ) => (
              <SuperField
                type="select"
                label={ t( 'payments.table.method' ) }
                required
                value={ field.state.value }
                onValueChange={ ( value ) => {
                  field.handleChange( value || '' );
                  field.handleBlur();
                } }
                placeholder={ t( 'payments.actions.methodPlaceholder' ) }
                options={ paymentMethodOptions }
                error={ getFieldError( field.state.meta.errors ) }
              />
            ) }
          />
          <form.Field
            name="paymentDate"
            children={ ( field ) => (
              <SuperField
                type="datepicker"
                label={ t( 'payments.table.date' ) }
                required
                value={ field.state.value }
                onChange={ ( value ) => {
                  field.handleChange( value as Date | undefined );
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
                label={ t( 'payments.details.notes' ) }
                value={ field.state.value }
                onChange={ ( e ) => field.handleChange( e.target.value ) }
                placeholder={ t( 'payments.actions.notesPlaceholder' ) }
                error={ getFieldError( field.state.meta.errors ) }
              />
            ) }
          />
          <DialogFooter>
            <Button variant="outline" type="button" onClick={ () => onOpenChange( false ) } disabled={ isSubmitting }>
              { t( 'cancel' ) }
            </Button>
            <form.Subscribe
              selector={ ( state ) => [ state.canSubmit, state.isSubmitting ] }
              children={ ( [ canSubmit, isFormSubmitting ] ) => (
                <Button type="submit" disabled={ !canSubmit || isSubmitting || isFormSubmitting }>
                  { isSubmitting || isFormSubmitting ? t( 'payments.actions.statusUpdating' ) : t( 'payments.actions.saveStatus' ) }
                </Button>
              ) }
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
