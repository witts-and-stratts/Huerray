'use client';
/* eslint-disable react/no-children-prop */

import { Button } from '@/components/dashboard-ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/dashboard-ui/card';
import {
  Field,
  FieldDescription,
  FieldGroup
} from '@/components/dashboard-ui/field';
import { InputGroupButton } from '@/components/dashboard-ui/input-group';
import { SuperField } from '@/components/dashboard-ui/super-field';
import { apiClient } from '@/lib/api/client';
import { AuthenticationApi } from '@/lib/api/generated/api/authentication-api';
import { useAuth } from '@/lib/auth/auth-context';
import { DASHBOARD_PATHS, getUserRole } from '@/lib/constants';
import { cn } from '@/lib/dashboard-utils';
import { ViewIcon, ViewOffIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useForm } from '@tanstack/react-form';
import { AxiosError } from 'axios';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import { z } from 'zod';

type LoginFormValues = {
  identifier: string;
  password: string;
  rememberMe: boolean;
};

type TranslationFunction = ReturnType<typeof useTranslations>;

type ValidationError = string | { message?: string; } | undefined;
function getErrorMessage( error: ValidationError ): string {
  if ( typeof error === 'string' ) return error;
  if ( error && typeof error === 'object' && 'message' in error ) return error.message || '';
  return String( error ?? '' );
}

interface FormFieldApi<T> {
  name: string;
  state: {
    value: T;
    meta: {
      isTouched: boolean;
      errors: ValidationError[] | null;
    };
  };
  handleChange: ( value: T ) => void;
  handleBlur: () => void;
}

interface FieldComponentProps<T> {
  field: FormFieldApi<T>;
  t: TranslationFunction;
}

interface ApiErrorResponse {
  message?: string;
  error?: {
    message?: string;
  };
}

function getFieldError( field: { state: { meta: { isTouched: boolean; errors: ValidationError[] | null; }; }; } ): string | undefined {
  const { isTouched, errors } = field.state.meta;
  return isTouched && errors ? errors.map( getErrorMessage ).join( ', ' ) : undefined;
}

function IdentifierField( { field, t }: FieldComponentProps<string> ) {
  return (
    <SuperField
      id='identifier'
      name={ field.name }
      label={ t( 'usernameOrEmailLabel' ) }
      type='text'
      placeholder={ t( 'usernameOrEmailPlaceholder' ) }
      value={ field.state.value }
      onChange={ ( e: React.ChangeEvent<HTMLInputElement> ) => field.handleChange( e.target.value ) }
      onBlur={ field.handleBlur }
      required
      error={ getFieldError( field ) }
    />
  );
}

function RememberMeField( { field, t }: FieldComponentProps<boolean> ) {
  return (
    <SuperField
      type="checkbox"
      id="remember-me"
      label={ t( 'keepMeLoggedIn' ) }
      checked={ field.state.value }
      onCheckedChange={ ( checked ) => field.handleChange( checked as boolean ) }
    />
  );
}

function PasswordField( { field, t }: FieldComponentProps<string> ) {
  const [ showPassword, setShowPassword ] = useState( false );
  const handleTogglePassword = useCallback( () => setShowPassword( ( prev ) => !prev ), [] );

  return (
    <SuperField
      id='password'
      name={ field.name }
      label={ t( 'passwordLabel' ) }
      type={ showPassword ? 'text' : 'password' }
      value={ field.state.value }
      onChange={ ( e: React.ChangeEvent<HTMLInputElement> ) => field.handleChange( e.target.value ) }
      onBlur={ field.handleBlur }
      required
      error={ getFieldError( field ) }
      headerExtra={
        <Link
          href='/forgot-password'
          className='text-sm text-muted-foreground underline-offset-4 hover:underline hover:text-foreground transition-colors'
        >
          { t( 'forgotPassword' ) }
        </Link>
      }
      suffix={
        <InputGroupButton
          type="button"
          onClick={ handleTogglePassword }
          className="h-full px-3 text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5 font-normal"
          aria-label={ showPassword ? t( 'hide' ) : t( 'show' ) }
        >
          <HugeiconsIcon icon={ showPassword ? ViewOffIcon : ViewIcon } size={ 18 } strokeWidth={ 2 } />
          <span className="text-xs font-medium">{ showPassword ? t( 'hide' ) : t( 'show' ) }</span>
        </InputGroupButton>
      }
      suffixAlign="inline-end"
    />
  );
}

export function LoginForm( {
  showResetSuccess = false,
  className,
  ...props
}: React.ComponentProps<'div'> & { showResetSuccess?: boolean; } ) {
  const t = useTranslations( 'auth.login' );
  const tValidation = useTranslations( 'auth.validation' );
  const searchParams = useSearchParams();
  const { setUser } = useAuth();
  const [ isLoading, setIsLoading ] = useState( false );
  const [ formError, setFormError ] = useState<string | null>( null );

  const authApi = useMemo( () => new AuthenticationApi( undefined, undefined, apiClient ), [] );

  const loginSchema = useMemo( () => z.object( {
    identifier: z.string().min( 1, tValidation( 'usernameRequired' ) ),
    password: z.string().min( 1, tValidation( 'passwordRequired' ) ),
    rememberMe: z.boolean(),
  } ), [ tValidation ] );

  const form = useForm( {
    defaultValues: {
      identifier: '',
      password: '',
      rememberMe: false,
    } as LoginFormValues,
    validators: {
      onChange: loginSchema,
    },
    onSubmit: async ( { value } ) => {
      setFormError( null );
      setIsLoading( true );

      try {
        const response = await authApi.authLoginPost( {
          credentials: {
            username: value.identifier,
            password: value.password,
          },
        } );

        const responseData = response.data;

        if ( !responseData.success || !responseData.data ) {
          setFormError( responseData.message || t( 'errors.default' ) );
          return;
        }

        const user = responseData.data.user;

        if ( !user ) return;

        const userRole = getUserRole( user );

        setUser( {
          id: user.id!,
          email: user.email || value.identifier,
          firstName: user.first_name!,
          lastName: user.last_name!,
          role: userRole,
          emailVerified: user.email_verified ?? false,
        } );

        // Redirect to dashboard or custom redirect URL
        const redirectTo = searchParams.get( 'redirect' );
        window.location.href = redirectTo || DASHBOARD_PATHS[ userRole ];
      } catch ( err ) {
        const axiosError = err as AxiosError<ApiErrorResponse>;
        const errorMessage =
          axiosError.response?.data?.message ||
          axiosError.message ||
          t( 'errors.default' );

        const messageSuffix = axiosError.response?.status === 401 ? t( 'errors.suffixInvalid' ) : axiosError.response?.data?.error?.message;

        setFormError( messageSuffix ? `${ errorMessage }. ${ messageSuffix }` : errorMessage );
      } finally {
        setIsLoading( false );
      }
    },
  } );


  const handleFormSubmit = useCallback( ( e: React.FormEvent ) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  }, [ form ] );

  return (
    <div
      className={ cn( 'flex flex-col gap-6 w-full max-w-md', className ) }
      { ...props }
    >

      <Card>
        <CardHeader className='text-center'>
          {/* Logo */ }
          <Link className='flex justify-center mb-4' href="/" title="Huerray">
            <Image
              src='/images/huerray-symbol.svg'
              alt='Huerray'
              width={ 60 }
              height={ 60 }
              className='dark:invert'
            />
          </Link>

          <CardTitle className='text-2xl font-primary text-primary'>{ t( 'title' ) }</CardTitle>
          <CardDescription className='my-2 text-balance'>{ t( 'description' ) }</CardDescription>
        </CardHeader>
        <CardContent>
          { showResetSuccess && (
            <div className='mb-4 p-3 bg-green-50 border border-green-200 rounded-md'>
              <p className='text-sm text-green-600'>
                ✓ { t( 'resetSuccess' ) }
              </p>
            </div>
          ) }
          { formError && (
            <div className='mb-4 p-3 bg-red-50 border border-red-200 rounded-md'>
              <p className='text-sm text-red-600'>{ formError }</p>
            </div>
          ) }
          <form onSubmit={ handleFormSubmit }>
            <FieldGroup>
              <form.Field
                name="identifier"
                children={ ( field ) => <IdentifierField field={ field } t={ t } /> }
              />

              <form.Field
                name="password"
                children={ ( field ) => <PasswordField field={ field } t={ t } /> }
              />

              <form.Field
                name="rememberMe"
                children={ ( field ) => <RememberMeField field={ field } t={ t } /> }
              />

              <Field>
                <form.Subscribe
                  selector={ ( state ) => [ state.canSubmit, state.isSubmitting ] }
                  children={ ( [ canSubmit, isSubmitting ] ) => {
                    const isPending = isSubmitting || isLoading;
                    return (
                      <Button type='submit' className='w-full' disabled={ !canSubmit || isPending }>
                        { isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" /> }
                        { isPending ? t( 'submittingButton' ) : t( 'submitButton' ) }
                      </Button>
                    );
                  } }
                />

                <FieldDescription className='text-center'>
                  { t( 'signUpPrompt' ) }{ ' ' }
                  <Link
                    href='/signup'
                    className='font-medium text-primary hover:underline'
                  >
                    { t( 'signUpLink' ) }
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      <FieldDescription className='text-center text-xs'>
        { t( 'termsText' ) }{ ' ' }
        <Link href='/terms-and-conditions' className='underline hover:text-foreground'>
          { t( 'termsLink' ) }
        </Link>{ ' ' }
        { t( 'and' ) }{ ' ' }
        <Link href='/privacy-policy' className='underline hover:text-foreground'>
          { t( 'privacyLink' ) }
        </Link>
        .
      </FieldDescription>
    </div>
  );
}
