'use client';

import {
  FieldGroup
} from '@/components/dashboard-ui/field';
import { SuperField } from '@/components/dashboard-ui/super-field';
import { creatorSettingsSchema } from './creator-settings-schema';
import { Separator } from '../dashboard-ui/separator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/dashboard-ui/card';

export function CreatorBankSection( { form }: { form: any; } ) {
  return (
    <Card className='max-w-5xl'>
      <CardContent>
        <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <form.Field
            name="bankName"
            validators={ {
              onBlur: creatorSettingsSchema.shape.bankName,
            } }
            children={ ( field: any ) => (
              <SuperField
                name={ field.name }
                label="Bank Name"
                type="text"
                value={ field.state.value }
                onChange={ ( e: any ) => field.handleChange( e.target.value ) }
                onBlur={ field.handleBlur }
                error={ field.state.meta.errors ? field.state.meta.errors.map( ( e: any ) => e.message || String( e ) ).join( ', ' ) : undefined }
              />
            ) }
          />

          <form.Field
            name="bankAccountName"
            validators={ {
              onBlur: creatorSettingsSchema.shape.bankAccountName,
            } }
            children={ ( field: any ) => (
              <SuperField
                name={ field.name }
                label="Account Holder Name"
                type="text"
                value={ field.state.value }
                onChange={ ( e: any ) => field.handleChange( e.target.value ) }
                onBlur={ field.handleBlur }
                error={ field.state.meta.errors ? field.state.meta.errors.map( ( e: any ) => e.message || String( e ) ).join( ', ' ) : undefined }
              />
            ) }
          />

          <form.Field
            name="bankAccountNumber"
            validators={ {
              onBlur: creatorSettingsSchema.shape.bankAccountNumber,
            } }
            children={ ( field: any ) => (
              <SuperField
                name={ field.name }
                label="Account Number"
                type="text"
                value={ field.state.value }
                onChange={ ( e: any ) => field.handleChange( e.target.value ) }
                onBlur={ field.handleBlur }
                error={ field.state.meta.errors ? field.state.meta.errors.map( ( e: any ) => e.message || String( e ) ).join( ', ' ) : undefined }
              />
            ) }
          />

          <form.Field
            name="bankRoutingNumber"
            validators={ {
              onBlur: creatorSettingsSchema.shape.bankRoutingNumber,
            } }
            children={ ( field: any ) => (
              <SuperField
                name={ field.name }
                label="Routing Number / SWIFT"
                type="text"
                value={ field.state.value }
                onChange={ ( e: any ) => field.handleChange( e.target.value ) }
                onBlur={ field.handleBlur }
                error={ field.state.meta.errors ? field.state.meta.errors.map( ( e: any ) => e.message || String( e ) ).join( ', ' ) : undefined }
              />
            ) }
          />

          <div className="col-span-1 md:col-span-2">
            <form.Field
              name="bankAddress"
              validators={ {
                onBlur: creatorSettingsSchema.shape.bankAddress,
              } }
              children={ ( field: any ) => (
                <SuperField
                  name={ field.name }
                  label="Bank Address"
                  type="text"
                  value={ field.state.value }
                  onChange={ ( e: any ) => field.handleChange( e.target.value ) }
                  onBlur={ field.handleBlur }
                  error={ field.state.meta.errors ? field.state.meta.errors.map( ( e: any ) => e.message || String( e ) ).join( ', ' ) : undefined }
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
              onBlur: creatorSettingsSchema.shape.taxId,
            } }
            children={ ( field: any ) => (
              <SuperField
                name={ field.name }
                label="Tax ID / EIN"
                type="text"
                value={ field.state.value }
                onChange={ ( e: any ) => field.handleChange( e.target.value ) }
                onBlur={ field.handleBlur }
                error={ field.state.meta.errors ? field.state.meta.errors.map( ( e: any ) => e.message || String( e ) ).join( ', ' ) : undefined }
              />
            ) }
          />
          <form.Field
            name="taxCountry"
            validators={ {
              onBlur: creatorSettingsSchema.shape.taxCountry,
            } }
            children={ ( field: any ) => (
              <SuperField
                name={ field.name }
                label="Tax Country"
                value={ field.state.value }
                type="country"
                onValueChange={ ( val: any ) => field.handleChange( val || "" ) }
                error={ field.state.meta.errors ? field.state.meta.errors.map( ( e: any ) => e.message || String( e ) ).join( ', ' ) : undefined }
              />
            ) }
          />
        </FieldGroup>
      </CardContent>
    </Card>
  );
}
