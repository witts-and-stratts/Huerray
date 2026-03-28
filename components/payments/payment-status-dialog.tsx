'use client';

import { useEffect } from 'react';
import { useForm } from '@tanstack/react-form';
import { useTranslations } from 'next-intl';

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
  UtilsPaymentStatus,
} from '@/lib/api/generated/models';

interface PaymentStatusDialogProps {
  open: boolean;
  onOpenChange: ( open: boolean ) => void;
  payment: ModelsPaymentResponse;
  isSubmitting: boolean;
  onSubmit: ( request: ModelsUpdatePaymentStatusRequest ) => void;
}

export function PaymentStatusDialog( {
  open,
  onOpenChange,
  payment,
  isSubmitting,
  onSubmit,
}: PaymentStatusDialogProps ) {
  const t = useTranslations( 'dashboard.common' );

  const form = useForm( {
    defaultValues: {
      status: ( payment.payment_status as UtilsPaymentStatus ) || 'pending',
      paymentMethod: payment.payment_method || '',
      paymentDate: payment.payment_date ? payment.payment_date.slice( 0, 10 ) : '',
      notes: payment.notes || '',
    },
    onSubmit: async ( { value } ) => {
      onSubmit( {
        payment_status: value.status,
        payment_method: value.paymentMethod.trim() || undefined,
        payment_date: value.paymentDate || undefined,
        notes: value.notes.trim() || undefined,
      } );
    },
  } );

  useEffect( () => {
    if ( !open ) return;

    form.reset( {
      status: ( payment.payment_status as UtilsPaymentStatus ) || 'pending',
      paymentMethod: payment.payment_method || '',
      paymentDate: payment.payment_date ? payment.payment_date.slice( 0, 10 ) : '',
      notes: payment.notes || '',
    } );
  }, [ open, payment.notes, payment.payment_date, payment.payment_method, payment.payment_status, form ] );

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
                value={ field.state.value }
                onValueChange={ ( value ) => field.handleChange( ( value as UtilsPaymentStatus ) || 'pending' ) }
                options={ statusOptions }
              />
            ) }
          />
          <form.Field
            name="paymentMethod"
            children={ ( field ) => (
              <SuperField
                type="text"
                label={ t( 'payments.table.method' ) }
                value={ field.state.value }
                onChange={ ( e ) => field.handleChange( e.target.value ) }
                placeholder={ t( 'payments.actions.methodPlaceholder' ) }
              />
            ) }
          />
          <form.Field
            name="paymentDate"
            children={ ( field ) => (
              <SuperField
                type="date"
                label={ t( 'payments.table.date' ) }
                value={ field.state.value }
                onChange={ ( e ) => field.handleChange( e.target.value ) }
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
              />
            ) }
          />
          <DialogFooter>
            <Button variant="outline" type="button" onClick={ () => onOpenChange( false ) } disabled={ isSubmitting }>
              { t( 'cancel' ) }
            </Button>
            <Button type="submit" disabled={ isSubmitting }>
              { isSubmitting ? t( 'payments.actions.statusUpdating' ) : t( 'payments.actions.saveStatus' ) }
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
