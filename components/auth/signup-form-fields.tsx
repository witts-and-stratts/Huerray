/* eslint-disable react/no-children-prop */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/dashboard-ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/dashboard-ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
} from "@/components/dashboard-ui/field";
import { SuperField } from "@/components/dashboard-ui/super-field";
import { UtilsBrandCategory } from "@/lib/api/generated/models/utils-brand-category";
import { UtilsCompanySize } from "@/lib/api/generated/models/utils-company-size";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useTranslations } from "next-intl";

type UserRole = "brand" | "creator" | "admin" | null;

const formatEnumLabel = ( value: string ) => {
  return value
    .split( /[_\- ]+/ )
    .map( ( word ) => word.charAt( 0 ).toUpperCase() + word.slice( 1 ).toLowerCase() )
    .join( " " );
};

interface RoleSelectionProps extends React.ComponentProps<"div"> {
  roles: { value: UserRole, title: string, description: string; }[];
  onRoleSelect: ( role: UserRole ) => void;
}

export function RoleSelection( { roles, onRoleSelect, className, ...props }: RoleSelectionProps ) {
  const t = useTranslations( 'auth.signup' );

  return (
    <div className={ className } { ...props }>
      <Link href="/" title="Huerray" className="signup-form__role-logo-link">
        <Image
          src="/images/huerray-symbol.svg"
          alt="Huerray"
          width={ 60 }
          height={ 60 }
          className="signup-form__logo"
        />
      </Link>

      <div className="signup-form__role-heading">
        <h1 className="signup-form__role-title">
          { t( 'roleSelection.title' ) }
        </h1>
      </div>

      <div className="signup-form__role-grid">
        { roles.filter( r => r.value !== 'admin' ).map( ( role ) => (
          <Card
            key={ role.value }
            className="signup-form__role-card"
            onClick={ () => onRoleSelect( role.value ) }
          >
            <CardHeader className="signup-form__role-card-header">
              <CardTitle className="signup-form__role-card-title">{ t( `roleSelection.${ role.value }.title` ) }</CardTitle>
              <CardDescription>{ t( `roleSelection.${ role.value }.description` ) }</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="signup-form__role-button">
                { t( 'roleSelection.button', { role: t( `roleSelection.${ role.value }.title` ) } ) }
              </Button>
            </CardContent>
          </Card>
        ) ) }
      </div>

      <FieldDescription className="signup-form__description">
        { t( 'actions.haveAccount' ) }{ " " }
        <Link href="/login" className="signup-form__signin-link">
          { t( 'actions.signIn' ) }
        </Link>
      </FieldDescription>

      <FieldDescription className="signup-form__terms">
        { t( 'terms.prefix' ) }{ " " }
        <Link href="/terms-and-conditions" className="signup-form__terms-link">
          { t( 'terms.tos' ) }
        </Link>{ " " }
        { t( 'terms.and' ) }{ " " }
        <Link href="/privacy-policy" className="signup-form__terms-link">
          { t( 'terms.privacy' ) }
        </Link>
        { t( 'terms.suffix' ) }
      </FieldDescription>
    </div>
  );
}

interface FieldsProps {
  form: any;
}

export function CommonFields( { form }: FieldsProps ) {
  const t = useTranslations( 'auth.signup.fields' );
  return (
    <div className="signup-form__name-grid">
      <form.Field
        name="firstName"
        children={ ( field: any ) => (
          <SuperField
            id="first-name"
            name={ field.name }
            type="text"
            placeholder={ t( 'firstName.placeholder' ) }
            value={ field.state.value }
            onChange={ ( e: React.ChangeEvent<HTMLInputElement> ) => field.handleChange( e.target.value ) }
            onBlur={ field.handleBlur }
            error={ field.state.meta.isTouched && field.state.meta.errors ? field.state.meta.errors.map( ( e: any ) => e.message ).join( ", " ) : undefined }
            required
            label={ t( 'firstName.label' ) }
          />
        ) }
      />
      <form.Field
        name="middleName"
        children={ ( field: any ) => (
          <SuperField
            id="middle-name"
            name={ field.name }
            type="text"
            placeholder={ t( 'middleName.placeholder' ) }
            value={ field.state.value }
            onChange={ ( e: React.ChangeEvent<HTMLInputElement> ) => field.handleChange( e.target.value ) }
            onBlur={ field.handleBlur }
            error={ field.state.meta.isTouched && field.state.meta.errors ? field.state.meta.errors.map( ( e: any ) => e.message ).join( ", " ) : undefined }
            label={ t( 'middleName.label' ) }
          />
        ) }
      />
      <form.Field
        name="lastName"
        children={ ( field: any ) => (
          <SuperField
            id="last-name"
            name={ field.name }
            type="text"
            placeholder={ t( 'lastName.placeholder' ) }
            value={ field.state.value }
            onChange={ ( e: React.ChangeEvent<HTMLInputElement> ) => field.handleChange( e.target.value ) }
            onBlur={ field.handleBlur }
            error={ field.state.meta.isTouched && field.state.meta.errors ? field.state.meta.errors.map( ( e: any ) => e.message ).join( ", " ) : undefined }
            required
            label={ t( 'lastName.label' ) }
          />
        ) }
      />
    </div>
  );
}

export function AdminFields( { form }: FieldsProps ) {
  const t = useTranslations( 'auth.signup.fields' );
  return (
    <form.Field
      name="username"
      children={ ( field: any ) => (
        <SuperField
          id="username"
          name={ field.name }
          type="text"
          placeholder={ t( 'username.placeholder' ) }
          value={ field.state.value }
          onChange={ ( e: React.ChangeEvent<HTMLInputElement> ) => field.handleChange( e.target.value ) }
          onBlur={ field.handleBlur }
          error={ field.state.meta.isTouched && field.state.meta.errors ? field.state.meta.errors.map( ( e: any ) => e.message ).join( ", " ) : undefined }
          required
          label={ t( 'username.label' ) }
        />
      ) }
    />
  );
}

export function BrandFields( { form }: FieldsProps ) {
  const t = useTranslations( 'auth.signup.fields' );
  return (
    <>
      <div className="signup-form__field-row">
        <form.Field
          name="companyName"
          children={ ( field: any ) => (
            <SuperField
              id="company-name"
              name={ field.name }
              type="text"
              placeholder={ t( 'companyName.placeholder' ) }
              value={ field.state.value }
              onChange={ ( e: React.ChangeEvent<HTMLInputElement> ) => field.handleChange( e.target.value ) }
              onBlur={ field.handleBlur }
              error={ field.state.meta.isTouched && field.state.meta.errors ? field.state.meta.errors.map( ( e: any ) => e.message ).join( ", " ) : undefined }
              required
              label={ t( 'companyName.label' ) }
            />
          ) }
        />
        <form.Field
          name="website"
          children={ ( field: any ) => (
            <SuperField
              id="website"
              name={ field.name }
              type="url"
              placeholder={ t( 'website.placeholder' ) }
              value={ field.state.value }
              onChange={ ( e: React.ChangeEvent<HTMLInputElement> ) => field.handleChange( e.target.value ) }
              onBlur={ field.handleBlur }
              error={ field.state.meta.isTouched && field.state.meta.errors ? field.state.meta.errors.map( ( e: any ) => e.message ).join( ", " ) : undefined }
              required
              label={ t( 'website.label' ) }
            />
          ) }
        />
      </div>

      <div className="signup-form__field-row">
        <form.Field
          name="registrationNumber"
          children={ ( field: any ) => (
            <SuperField
              id="registration-number"
              name={ field.name }
              type="text"
              placeholder={ t( 'registrationNumber.placeholder' ) }
              value={ field.state.value }
              onChange={ ( e: React.ChangeEvent<HTMLInputElement> ) => field.handleChange( e.target.value ) }
              onBlur={ field.handleBlur }
              error={ field.state.meta.isTouched && field.state.meta.errors ? field.state.meta.errors.map( ( e: any ) => e.message ).join( ", " ) : undefined }
              required
              label={ t( 'registrationNumber.label' ) }
            />
          ) }
        />
        <form.Field
          name="vatId"
          children={ ( field: any ) => (
            <SuperField
              id="vat-id"
              name={ field.name }
              type="text"
              placeholder={ t( 'vatId.placeholder' ) }
              value={ field.state.value }
              onChange={ ( e: React.ChangeEvent<HTMLInputElement> ) => field.handleChange( e.target.value ) }
              onBlur={ field.handleBlur }
              error={ field.state.meta.isTouched && field.state.meta.errors ? field.state.meta.errors.map( ( e: any ) => e.message ).join( ", " ) : undefined }
              label={ t( 'vatId.label' ) }
            />
          ) }
        />
      </div>

      <div className="signup-form__field-row">
        <form.Field
          name="category"
          children={ ( field: any ) => (
            <SuperField
              id="category"
              name={ field.name }
              type="select"
              placeholder={ t( 'industry.placeholder' ) }
              options={ Object.values( UtilsBrandCategory ).map( ( val ) => ( {
                label: formatEnumLabel( val ),
                value: val,
              } ) ) }
              value={ field.state.value }
              onValueChange={ ( val ) => field.handleChange( val || "" ) }
              error={ field.state.meta.isTouched && field.state.meta.errors ? field.state.meta.errors.map( ( e: any ) => e.message ).join( ", " ) : undefined }
              required
              label={ t( 'industry.label' ) }
            />
          ) }
        />
        <form.Field
          name="companySize"
          children={ ( field: any ) => (
            <SuperField
              id="company-size"
              name={ field.name }
              type="select"
              placeholder={ t( 'companySize.placeholder' ) }
              options={ Object.values( UtilsCompanySize ).map( ( val ) => ( {
                label: formatEnumLabel( val ),
                value: val,
              } ) ) }
              value={ field.state.value }
              onValueChange={ ( val ) => field.handleChange( val || "" ) }
              error={ field.state.meta.isTouched && field.state.meta.errors ? field.state.meta.errors.map( ( e: any ) => e.message ).join( ", " ) : undefined }
              required
              label={ t( 'companySize.label' ) }
            />
          ) }
        />
      </div>

      <form.Field
        name="description"
        children={ ( field: any ) => (
          <SuperField
            id="description"
            name={ field.name }
            type="textarea"
            placeholder={ t( 'description.placeholder' ) }
            value={ field.state.value }
            onChange={ ( e: React.ChangeEvent<HTMLTextAreaElement> ) => field.handleChange( e.target.value ) }
            onBlur={ field.handleBlur }
            error={ field.state.meta.isTouched && field.state.meta.errors ? field.state.meta.errors.map( ( e: any ) => e.message ).join( ", " ) : undefined }
            label={ t( 'description.label' ) }
          />
        ) }
      />

      <div className="signup-form__field-row">
        <form.Field
          name="country"
          children={ ( field: any ) => (
            <SuperField
              id="country"
              name={ field.name }
              type="country"
              value={ field.state.value }
              onValueChange={ ( val ) => field.handleChange( val || "" ) }
              error={ field.state.meta.isTouched && field.state.meta.errors ? field.state.meta.errors.map( ( e: any ) => e.message ).join( ", " ) : undefined }
              required
              label={ t( 'country.label' ) }
            />
          ) }
        />
        <form.Field
          name="state"
          children={ ( field: any ) => (
            <SuperField
              id="state"
              name={ field.name }
              type="text"
              placeholder={ t( 'state.placeholder' ) }
              value={ field.state.value }
              onChange={ ( e: React.ChangeEvent<HTMLInputElement> ) => field.handleChange( e.target.value ) }
              onBlur={ field.handleBlur }
              error={ field.state.meta.isTouched && field.state.meta.errors ? field.state.meta.errors.map( ( e: any ) => e.message ).join( ", " ) : undefined }
              required
              label={ t( 'state.label' ) }
            />
          ) }
        />
      </div>

      <div className="signup-form__field-row">
        <form.Field
          name="city"
          children={ ( field: any ) => (
            <SuperField
              id="city"
              name={ field.name }
              type="text"
              placeholder={ t( 'city.placeholder' ) }
              value={ field.state.value }
              onChange={ ( e: React.ChangeEvent<HTMLInputElement> ) => field.handleChange( e.target.value ) }
              onBlur={ field.handleBlur }
              error={ field.state.meta.isTouched && field.state.meta.errors ? field.state.meta.errors.map( ( e: any ) => e.message ).join( ", " ) : undefined }
              required
              label={ t( 'city.label' ) }
            />
          ) }
        />
        <form.Field
          name="postalCode"
          children={ ( field: any ) => (
            <SuperField
              id="postal-code"
              name={ field.name }
              type="text"
              placeholder={ t( 'postalCode.placeholder' ) }
              value={ field.state.value }
              onChange={ ( e: React.ChangeEvent<HTMLInputElement> ) => field.handleChange( e.target.value ) }
              onBlur={ field.handleBlur }
              error={ field.state.meta.isTouched && field.state.meta.errors ? field.state.meta.errors.map( ( e: any ) => e.message ).join( ", " ) : undefined }
              label={ t( 'postalCode.label' ) }
            />
          ) }
        />
      </div>

      <div className="signup-form__field-row">
        <form.Field
          name="street"
          children={ ( field: any ) => (
            <SuperField
              id="street"
              name={ field.name }
              type="text"
              placeholder={ t( 'street.placeholder' ) }
              value={ field.state.value }
              onChange={ ( e: React.ChangeEvent<HTMLInputElement> ) => field.handleChange( e.target.value ) }
              onBlur={ field.handleBlur }
              error={ field.state.meta.isTouched && field.state.meta.errors ? field.state.meta.errors.map( ( e: any ) => e.message ).join( ", " ) : undefined }
              label={ t( 'street.label' ) }
            />
          ) }
        />
        <form.Field
          name="phone"
          children={ ( field: any ) => (
            <SuperField
              id="phone"
              name={ field.name }
              type="tel"
              placeholder={ t( 'phone.placeholder' ) }
              value={ field.state.value }
              onChange={ ( e: React.ChangeEvent<HTMLInputElement> ) => field.handleChange( e.target.value ) }
              onBlur={ field.handleBlur }
              error={ field.state.meta.isTouched && field.state.meta.errors ? field.state.meta.errors.map( ( e: any ) => e.message ).join( ", " ) : undefined }
              label={ t( 'phone.label' ) }
            />
          ) }
        />
      </div>
    </>
  );
}

export function ContactAuthFields( { form }: FieldsProps ) {
  const t = useTranslations( 'auth.signup.fields' );
  return (
    <>
      <form.Field
        name="email"
        children={ ( field: any ) => (
          <SuperField
            id="email"
            name={ field.name }
            type="email"
            placeholder={ t( 'email.placeholder' ) }
            value={ field.state.value }
            onChange={ ( e: React.ChangeEvent<HTMLInputElement> ) => field.handleChange( e.target.value ) }
            onBlur={ field.handleBlur }
            error={ field.state.meta.isTouched && field.state.meta.errors ? field.state.meta.errors.map( ( e: any ) => e.message ).join( ", " ) : undefined }
            required
            label={ t( 'email.label' ) }
          />
        ) }
      />

      <form.Field
        name="password"
        children={ ( field: any ) => (
          <SuperField
            id="password"
            name={ field.name }
            type="password"
            placeholder={ t( 'password.placeholder' ) }
            value={ field.state.value }
            onChange={ ( e: React.ChangeEvent<HTMLInputElement> ) => field.handleChange( e.target.value ) }
            onBlur={ field.handleBlur }
            error={ field.state.meta.isTouched && field.state.meta.errors ? field.state.meta.errors.map( ( e: any ) => e.message ).join( ", " ) : undefined }
            required
            label={ t( 'password.label' ) }
          />
        ) }
      />

      <form.Field
        name="confirmPassword"
        children={ ( field: any ) => (
          <SuperField
            id="confirm-password"
            name={ field.name }
            type="password"
            placeholder={ t( 'confirmPassword.placeholder' ) }
            value={ field.state.value }
            onChange={ ( e: React.ChangeEvent<HTMLInputElement> ) => field.handleChange( e.target.value ) }
            onBlur={ field.handleBlur }
            error={ field.state.meta.isTouched && field.state.meta.errors ? field.state.meta.errors.map( ( e: any ) => e.message ).join( ", " ) : undefined }
            required
            label={ t( 'confirmPassword.label' ) }
          />
        ) }
      />
    </>
  );
}

interface FormActionsProps extends FieldsProps {
  isLoading: boolean;
  selectedRoleInfo: { title: string; };
  disabled?: boolean;
}

export function FormActions( { form, isLoading, selectedRoleInfo, disabled }: FormActionsProps ) {
  const t = useTranslations( 'auth.signup.actions' );
  return (
    <Field>
      <form.Subscribe
        selector={ ( state: any ) => [ state.canSubmit, state.isSubmitting ] }
        children={ ( [ canSubmit, isSubmitting ]: [ boolean, boolean ] ) => (
          <Button type="submit" className="signup-form__submit" disabled={ !canSubmit || isSubmitting || isLoading || disabled }>
            { isSubmitting || isLoading ? t( 'submitting' ) : t( 'submit' ) }
          </Button>
        ) }
      />
      <FieldDescription className="signup-form__description">
        { t( 'haveAccount' ) }{ " " }
        <Link href="/login" className="signup-form__signin-link">
          { t( 'signIn' ) }
        </Link>
      </FieldDescription>
    </Field>
  );
}
