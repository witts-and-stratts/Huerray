"use client";
import { roles } from "@/components/auth/roles";
import { createBrandSchema, createCreatorSchema } from "@/components/auth/schemas";
import {
  CommonFields,
  ContactAuthFields,
  FormActions,
  RoleSelection
} from "@/components/auth/signup-form-fields";
import { UserRole } from "@/components/auth/types";
import { Button } from "@/components/dashboard-ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/dashboard-ui/card";
import {
  FieldDescription
} from "@/components/dashboard-ui/field";
import { apiClient } from "@/lib/api/client";
import { AuthenticationApi } from "@/lib/api/generated/api/authentication-api";
import { ModelsRegisterRequestUserTypeEnum } from "@/lib/api/generated/models/models-register-request";
import { useAuth } from "@/lib/auth/auth-context";
import { useClearPersistedData } from "@/lib/hooks/use-clear-persisted-data";
import { cn } from "@/lib/dashboard-utils";
import { useForm } from '@tanstack/react-form';
import Cookies from 'js-cookie';
import { ChevronLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState, useRef } from "react";
import { toast } from "sonner";
import { Turnstile, TurnstileRef } from "@/components/auth/turnstile";
import '@/app/styles/signup.css';

interface SignupFormProps extends React.ComponentProps<"div"> {
  initialRole?: UserRole;
}

const defaultValues = {
  firstName: "",
  lastName: "",
  middleName: "",
  email: "",
  password: "",
  confirmPassword: "",
  username: "",
};


export function SignupForm( {
  className,
  initialRole = null,
  ...props
}: SignupFormProps ) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { setUser } = useAuth();
  const clearPersistedData = useClearPersistedData();
  const t = useTranslations( 'auth.signup' );
  const tValidation = useTranslations( 'auth.validation' );

  const roleFromUrl = searchParams.get( 'role' ) as UserRole;
  const selectedRole = initialRole || ( roleFromUrl === 'brand' || roleFromUrl === 'creator' ? roleFromUrl : null );

  const updateRole = useCallback( ( role: UserRole ) => {
    if ( initialRole ) return; // Don't allow changing role if fixed via props

    const params = new URLSearchParams( searchParams.toString() );
    if ( role ) {
      params.set( 'role', role );
    } else {
      params.delete( 'role' );
    }
    router.push( `${ pathname }?${ params.toString() }` );
  }, [ initialRole, pathname, router, searchParams ] );

  const [ isLoading, setIsLoading ] = useState( false );
  const [ error, setError ] = useState<string | null>( null );
  const [ turnstileToken, setTurnstileToken ] = useState<string | null>( null );
  const turnstileRef = useRef<TurnstileRef>( null );

  const authApi = new AuthenticationApi( undefined, undefined, apiClient );
  const handleBack = useCallback( () => updateRole( null ), [ updateRole ] );

  useEffect( () => {
    if ( selectedRole === 'creator' ) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push( { event: 'creator_signup_started', user_type: 'creator' } );
    }
  }, [ selectedRole ] );

  // Determine the schema based on selected role
  const signupSchema = useMemo( () => {
    switch ( selectedRole ) {
      case "brand":
        return createBrandSchema( tValidation );
      default:
        return createCreatorSchema( tValidation );
    }
  }, [ selectedRole, tValidation ] );

  const form = useForm( {
    defaultValues,
    validators: {
      onChange: signupSchema as any,
    },
    onSubmit: async ( { value }: { value: any; } ) => {
      if ( !turnstileToken ) {
        const turnstileMsg = 'Please complete the security check.';
        setError( turnstileMsg );
        toast.error( t( 'toast.errorTitle' ), {
          description: turnstileMsg,
          richColors: true,
        } );
        return;
      }
      setError( null );
      setIsLoading( true );

      try {
        // Invalidate any lingering session server-side before registering.
        // The backend session is an httpOnly cookie that clearPersistedData()
        // cannot remove, so without this a stale session (e.g. a previous
        // creator whose logout failed) would still be sent on the new
        // brand's requests, leaking the prior user's data and triggering
        // permission errors. Best-effort: ignore failures (no active session).
        try {
          await authApi.authLogoutPost();
        } catch {
          // No active session to clear — safe to proceed with registration.
        }

        const userType = selectedRole === 'brand'
          ? ModelsRegisterRequestUserTypeEnum.BrandUser
          : ModelsRegisterRequestUserTypeEnum.Creator;

        const response = await authApi.authRegisterPost( {
          user: {
            email: value.email,
            first_name: value.firstName,
            last_name: value.lastName,
            middle_name: value.middleName || undefined,
            password: value.password,
            verify_password: value.confirmPassword,
            user_type: userType,
          }
        }, {
          headers: {
            'x-turnstile-token': turnstileToken,
          },
        } );

        if ( selectedRole === 'creator' ) {
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push( { event: 'creator_signup_complete', user_type: 'creator' } );
        }

        // Cast to access properties
        const responseData = response.data?.data as any;

        // Clear all persisted data from any previous session before
        // establishing the new one.
        await clearPersistedData();

        // Store auth tokens as cookies for middleware auth checks
        if ( responseData?.access_token ) {
          Cookies.set( 'authToken', responseData.access_token, {
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
          } );
        }
        if ( responseData?.refresh_token ) {
          Cookies.set( 'refreshToken', responseData.refresh_token, {
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
          } );
        }

        // Store user data
        setUser( {
          id: responseData?.user?.id || '',
          email: value.email,
          firstName: value.firstName,
          lastName: value.lastName,
          role: selectedRole as 'brand' | 'creator',
          avatar: responseData?.user?.avatar_url,
        } );

        if ( response.data ) {
          // Route to the appropriate dashboard based on the selected role
          const dashboardPath = selectedRole === 'brand' ? "/brand" : "/creator";

          toast.success( t( 'toast.successTitle' ), {
            action: {
              label: t( 'toast.continue' ),
              // Full reload (not router.push) so in-memory React Query and
              // Redux state are rebuilt fresh under the new session, matching
              // the login flow. SPA navigation would carry over stale caches.
              onClick: () => { window.location.href = dashboardPath; },
            },
            cancel: {
              label: t( 'toast.cancel' ),
              onClick: () => toast.dismiss(),
            },
            dismissible: false,
            duration: Infinity,
            richColors: true,
          } );
        }
      } catch ( err: any ) {
        // Reset Turnstile on registration failure so user can try again
        turnstileRef.current?.reset();
        setTurnstileToken( null );

        const errorMessage = err.response?.data?.message || err.message || t( 'toast.errorDefault' );
        const fullError = `${ errorMessage }; ${ err.response?.data?.error?.message || '' }`;
        setError( fullError );
        toast.error( t( 'toast.errorTitle' ), {
          description: fullError,
          cancel: { label: t( 'toast.cancel' ), onClick: () => toast.dismiss() },
          dismissible: true,
          richColors: true,
        } );
      } finally {
        setIsLoading( false );
      }
    },
  } );

  if ( !selectedRole ) {
    return (
      <RoleSelection
        roles={ roles }
        onRoleSelect={ updateRole }
        className={ cn( "signup-form signup-form--role-selection", className ) }
        { ...props }
      />
    );
  }

  return (
    <div className={ cn( "signup-form", className ) } { ...props }>
      <Card className="signup-form__card">
        <CardHeader className="signup-form__header">
          { !initialRole && (
            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              onClick={ handleBack }
              className="signup-form__back-button"
            >
              <ChevronLeft className="signup-form__back-icon" />
            </Button>
          ) }

          <Link className="signup-form__logo-link" title="Huerray" href="/">
            <Image
              src="/images/huerray-symbol.svg"
              alt="Huerray"
              width={ 60 }
              height={ 60 }
              className="signup-form__logo"
            />
          </Link>
          <CardTitle className="signup-form__title">{ t( `titles.${ selectedRole }` ) }</CardTitle>
          <CardDescription>{ t( `descriptions.${ selectedRole }` ) }</CardDescription>
        </CardHeader>
        <CardContent className="signup-form__content">
          <form onSubmit={ ( e ) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          } } className="signup-form__form">

            <CommonFields form={ form } />



            <div className="signup-form__divider" />

            <ContactAuthFields form={ form } />

            <input type="hidden" name="role" value={ selectedRole } />

            <Turnstile 
              ref={ turnstileRef } 
              onSuccess={ setTurnstileToken } 
              onExpire={ () => setTurnstileToken( null ) } 
              onError={ () => setTurnstileToken( null ) } 
            />

            <div className="signup-form__actions">
              <FormActions form={ form } isLoading={ isLoading } selectedRoleInfo={ { title: t( `titles.${ selectedRole }` ) } } disabled={ !turnstileToken } />
            </div>

          </form>
        </CardContent>
      </Card>

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
};
