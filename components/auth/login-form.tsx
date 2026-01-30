'use client';
/* eslint-disable react/no-children-prop */
/* eslint-disable @typescript-eslint/no-explicit-any */

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
import { apiClient, setAuthToken, setRefreshToken } from '@/lib/api/client';
import { AuthenticationApi } from '@/lib/api/generated/api/authentication-api';
import { BrandApi } from '@/lib/api/generated/api/brand-api';
import { useAuth } from '@/lib/auth/auth-context';
import { cn } from '@/lib/dashboard-utils';
import { AuthLoginResponse } from '@/types/auth';
import { ViewIcon, ViewOffIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useForm } from '@tanstack/react-form';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import { z } from 'zod';

// Define base types for form values
type LoginFormValues = {
  identifier: string;
  password: string;
  rememberMe: boolean;
};

/**
 * Renders the email input field using SuperField.
 * Extracted to a static function to prevent unnecessary re-renders.
 */
const renderIdentifierField = ( field: any, t: any ) => (
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
    error={ field.state.meta.errors ? field.state.meta.errors.map( ( e: any ) => e.message || String( e ) ).join( ', ' ) : undefined }
  />
);

/**
 * Renders the "Keep me logged in" checkbox.
 * Extracted to a static function for performance optimization.
 */
const renderRememberMeField = ( field: any, t: any ) => (
  <SuperField
    type="checkbox"
    id="remember-me"
    label={ t( 'keepMeLoggedIn' ) }
    checked={ field.state.value }
    onCheckedChange={ ( checked ) => field.handleChange( checked as boolean ) }
  />
);

/**
 * LoginForm Component
 *
 * Handles user authentication via email and password.
 * Features:
 * - TanStack Form for state management and validation.
 * - Zod integration for strict type safety and validation rules.
 * - "Keep me logged in" functionality via cookie expiration control.
 * - Password visibility toggle.
 * - Error handling for network requests and validation failures.
 * - Redirect logic based on user role and URL parameters.
 * - Fully translated via next-intl.
 */
export function LoginForm( {
  showResetSuccess = false,
  className,
  ...props
}: React.ComponentProps<'div'> & { showResetSuccess?: boolean; } ) {
  const t = useTranslations( 'auth.login' );
  const searchParams = useSearchParams();
  const { setUser } = useAuth();
  const [ isLoading, setIsLoading ] = useState( false );
  const [ formError, setFormError ] = useState<string | null>( null );
  const [ showPassword, setShowPassword ] = useState( false );

  const authApi = new AuthenticationApi( undefined, undefined, apiClient );

  /**
   * Zod schema for login form validation.
   * Defined inside component/useMemo to support translated error messages.
   */
  const loginSchema = useMemo( () => z.object( {
    identifier: z.string().min( 1, t( 'validation.usernameRequired' ) ),
    password: z.string().min( 1, t( 'validation.passwordRequired' ) ),
    rememberMe: z.boolean(),
  } ), [ t ] );

  /**
   * Toggles the visibility of the password input field.
   * Memoized to prevent re-creation on every render.
   */
  const handleTogglePassword = useCallback( () => {
    setShowPassword( ( prev ) => !prev );
  }, [] );

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

        const responseData = response.data as unknown as AuthLoginResponse;

        /* Review: Debug logging preserved for development/troubleshooting */
        console.log( '=== LOGIN RESPONSE DEBUG ===' );
        console.log( 'Full response:', response );
        console.log( 'responseData:', responseData );
        console.log( '===========================' );

        if ( responseData.success && responseData.data ) {
          const authData = responseData.data;
          const token = authData.access_token;
          const refreshToken = authData.refresh_token;

          if ( token ) {
            setAuthToken( token, value.rememberMe );
            if ( refreshToken ) {
              setRefreshToken( refreshToken, value.rememberMe );
            }
          }

          if ( authData.user ) {
            const userData = authData.user;
            console.log( 'Setting user data:', userData );

            // Determine user role with robust fallback logic
            const rawType = userData.user_type || ( userData as any ).userType || ( userData as any ).role;
            let userRole: 'brand' | 'creator' | 'admin' = 'brand';

            if ( rawType === 'admin' || rawType === 'admin_user' || userData.username === 'admin' ) {
              userRole = 'admin';
            } else if ( rawType === 'creator' ) {
              userRole = 'creator';
            } else if ( rawType === 'brand_user' || rawType === 'brand' ) {
              userRole = 'brand';
            }

            setUser( {
              id: userData.id,
              email: userData.email || value.identifier,
              firstName: userData.first_name,
              lastName: userData.last_name,
              role: userRole,
            } );

            // Determine default dashboard path based on role
            let targetPath = '/brand-admin';
            if ( userRole === 'admin' ) {
              targetPath = '/admin';
            } else if ( userRole === 'creator' ) {
              targetPath = '/creator-admin';
            } else if ( userRole === 'brand' ) {
              // Check if brand profile exists
              try {
                const brandApi = new BrandApi( undefined, undefined, apiClient );
                const response = await brandApi.brandsGet();

                const data: any = response.data;
                // Check if data is array or has data property that is array, or if it's just a single object
                // Based on GeneralSettingsForm usage: const brands = Array.isArray( data.data ) ? data.data : [ data.data ];
                const brands = Array.isArray( data.data ) ? data.data : ( data.data ? [ data.data ] : [] );

                if ( !brands || brands.length === 0 ) {
                  targetPath = '/brand-admin/complete-profile';
                } else {
                  targetPath = '/brand-admin';
                }
              } catch ( e: any ) {
                if ( e.response && e.response.status === 404 ) {
                  targetPath = '/brand-admin/complete-profile';
                }
              }
            }

            // Redirect Logic
            const redirectTo = searchParams.get( 'redirect' );

            setTimeout( () => {
              if ( redirectTo ) {
                window.location.href = redirectTo;
              } else {
                window.location.href = targetPath;
              }
            }, 100 );
          }
        } else {
          setFormError( responseData.message || t( 'errors.default' ) );
        }
      } catch ( err: any ) {
        console.error( 'Login error:', err );
        const errorMessage =
          err.response?.data?.message ||
          err.message ||
          t( 'errors.default' );

        // Enhance error message with details if available (e.g. 401 specific or backend error message)
        const messageSuffix = err.response?.status === 401 ? t( 'errors.suffixInvalid' ) : err.response?.data?.error?.message;

        // If messageSuffix is present, append it. Otherwise just show errorMessage.
        setFormError( messageSuffix ? `${ errorMessage }. ${ messageSuffix }` : errorMessage );
      } finally {
        setIsLoading( false );
      }
    },
  } );

  /**
   * Renders the password field with a visibility toggle.
   * Memoized with useCallback because it depends on 'showPassword' state.
   */
  const renderPasswordField = useCallback( ( field: any ) => (
    <SuperField
      id='password'
      name={ field.name }
      label={ t( 'passwordLabel' ) }
      type={ showPassword ? 'text' : 'password' }
      value={ field.state.value }
      onChange={ ( e: React.ChangeEvent<HTMLInputElement> ) => field.handleChange( e.target.value ) }
      onBlur={ field.handleBlur }
      required
      // Map error objects to strings to avoid [object Object] rendering issues
      error={ field.state.meta.errors ? field.state.meta.errors.map( ( e: any ) => e.message || String( e ) ).join( ', ' ) : undefined }
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
  ), [ showPassword, handleTogglePassword, t ] );

  /**
   * Wrapper for form submission to prevent default browser behavior
   * and propagation before triggering TanStack Form's handler.
   */
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
          <div className='flex justify-center mb-4'>
            <Image
              src='/images/huerray-symbol.svg'
              alt='Huerray'
              width={ 60 }
              height={ 60 }
              className='dark:invert'
            />
          </div>

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
                children={ ( field ) => renderIdentifierField( field, t ) }
              />

              <form.Field
                name="password"
                children={ renderPasswordField }
              />

              <form.Field
                name="rememberMe"
                children={ ( field ) => renderRememberMeField( field, t ) }
              />

              <Field>
                <form.Subscribe
                  selector={ ( state ) => [ state.canSubmit, state.isSubmitting ] }
                  children={ ( [ canSubmit, isSubmitting ] ) => (
                    <Button type='submit' className='w-full' disabled={ !canSubmit || isSubmitting || isLoading }>
                      { isSubmitting || isLoading ? t( 'submittingButton' ) : t( 'submitButton' ) }
                    </Button>
                  ) }
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
