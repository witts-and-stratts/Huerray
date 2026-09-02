'use client';

import {
  FieldGroup
} from '@/components/dashboard-ui/field';
import { SuperField } from '@/components/dashboard-ui/super-field';
import { creatorBankSchema } from './creator-bank-schema';
import { Separator } from '../dashboard-ui/separator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/dashboard-ui/card';

/**
 * TanStack Form's per-cause errorMap (onChange/onBlur/onSubmit) doesn't
 * self-reconcile across causes — e.g. blurring an empty Tax Country sets
 * its `onBlur` error, and then selecting a value only clears the
 * `onChange` entry, leaving the stale `onBlur` "required" message in
 * `field.state.meta.errors` forever (until the field blurs again). Validate
 * directly against the field's current value instead, so the displayed
 * error always matches what's actually in the field right now.
 */
function fieldError( field: any, schema: { safeParse: ( value: unknown ) => { success: boolean; error?: { issues: { message: string; }[]; }; }; } ): string | undefined {
  if ( !field.state.meta.isTouched ) return undefined;
  const result = schema.safeParse( field.state.value );
  return result.success ? undefined : result.error?.issues[ 0 ]?.message;
}

export function CreatorBankSection( { form }: { form: any; } ) {
  return (
    <Card className='max-w-5xl'>
      <CardContent>
        <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <form.Field
            name="bankName"
            validators={ {
              onBlur: creatorBankSchema.shape.bankName,
            } }
            children={ ( field: any ) => (
              <SuperField
                name={ field.name }
                label="Bank Name"
                type="text"
                value={ field.state.value }
                onChange={ ( e: any ) => field.handleChange( e.target.value ) }
                onBlur={ field.handleBlur }
                required
                error={ fieldError( field, creatorBankSchema.shape.bankName ) }
              />
            ) }
          />

          <form.Field
            name="bankAccountName"
            validators={ {
              onBlur: creatorBankSchema.shape.bankAccountName,
            } }
            children={ ( field: any ) => (
              <SuperField
                name={ field.name }
                label="Account Holder Name"
                type="text"
                value={ field.state.value }
                onChange={ ( e: any ) => field.handleChange( e.target.value ) }
                onBlur={ field.handleBlur }
                required
                error={ fieldError( field, creatorBankSchema.shape.bankAccountName ) }
              />
            ) }
          />

          <form.Field
            name="bankAccountNumber"
            validators={ {
              onBlur: creatorBankSchema.shape.bankAccountNumber,
            } }
            children={ ( field: any ) => (
              <SuperField
                name={ field.name }
                label="Account Number"
                type="text"
                value={ field.state.value }
                onChange={ ( e: any ) => field.handleChange( e.target.value ) }
                onBlur={ field.handleBlur }
                required
                error={ fieldError( field, creatorBankSchema.shape.bankAccountNumber ) }
              />
            ) }
          />

          <form.Field
            name="bankRoutingNumber"
            validators={ {
              onBlur: creatorBankSchema.shape.bankRoutingNumber,
            } }
            children={ ( field: any ) => (
              <SuperField
                name={ field.name }
                label="Routing Number / SWIFT"
                type="text"
                value={ field.state.value }
                onChange={ ( e: any ) => field.handleChange( e.target.value ) }
                onBlur={ field.handleBlur }
                required
                error={ fieldError( field, creatorBankSchema.shape.bankRoutingNumber ) }
              />
            ) }
          />

          <div className="col-span-1 md:col-span-2">
            <form.Field
              name="bankAddress"
              validators={ {
                onBlur: creatorBankSchema.shape.bankAddress,
              } }
              children={ ( field: any ) => (
                <SuperField
                  name={ field.name }
                  label="Bank Address"
                  type="text"
                  value={ field.state.value }
                  onChange={ ( e: any ) => field.handleChange( e.target.value ) }
                  onBlur={ field.handleBlur }
                  error={ fieldError( field, creatorBankSchema.shape.bankAddress ) }
                />
              ) }
            />
          </div>
        </FieldGroup>

        <Separator className="my-6" />

        <div className="col-span-1 md:col-span-2">
          <h4 className="text-sm font-medium tracking-widest uppercase mb-3">Tax Information</h4>
        </div>

        <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <form.Field
            name="taxId"
            validators={ {
              onBlur: creatorBankSchema.shape.taxId,
            } }
            children={ ( field: any ) => (
              <SuperField
                name={ field.name }
                label="Tax ID / EIN"
                type="text"
                value={ field.state.value }
                onChange={ ( e: any ) => field.handleChange( e.target.value ) }
                onBlur={ field.handleBlur }
                required
                error={ fieldError( field, creatorBankSchema.shape.taxId ) }
              />
            ) }
          />
          <form.Field
            name="taxCountry"
            validators={ {
              onChange: creatorBankSchema.shape.taxCountry,
              onBlur: creatorBankSchema.shape.taxCountry,
            } }
            children={ ( field: any ) => (
              <SuperField
                name={ field.name }
                label="Tax Country"
                value={ field.state.value }
                type="country"
                onValueChange={ ( val: any ) => field.handleChange( val || "" ) }
                onBlur={ field.handleBlur }
                required
                error={ fieldError( field, creatorBankSchema.shape.taxCountry ) }
              />
            ) }
          />
        </FieldGroup>
      </CardContent>
    </Card>
  );
}
