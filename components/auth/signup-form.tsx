"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { roles } from "@/components/auth/roles";
import { createBrandSchema, createCreatorSchema } from "@/components/auth/schemas";
import {
  AdminFields,
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
import { cn } from "@/lib/dashboard-utils";
import { useForm } from '@tanstack/react-form';
import Cookies from 'js-cookie';
import { ChevronLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

import { toast } from "sonner";

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

  const authApi = new AuthenticationApi( undefined, undefined, apiClient );
  const handleBack = useCallback( () => updateRole( null ), [ updateRole ] );

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
      setError( null );
      setIsLoading( true );

      try {
        // Map role to API user type
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
        } );



        // Cast to access properties
        const responseData = response.data?.data as any;

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

          toast.success( "Signup successful. Continue to Login", {
            action: {
              label: "Continue",
              onClick: () => router.push( dashboardPath ),
            },
            cancel: {
              label: "Cancel",
              onClick: () => toast.dismiss(),
            },
            dismissible: false,
            duration: Infinity,
            richColors: true,
          } );
        }
      } catch ( err: any ) {
        console.error( "Registration error:", err );
        const errorMessage = err.response?.data?.message || err.message || "Registration failed. Please try again.";
        const fullError = `${ errorMessage }; ${ err.response?.data?.error?.message || '' }`;
        setError( fullError );
        toast.error( "Registeration error", {
          description: fullError,
          cancel: { label: "Cancel", onClick: () => toast.dismiss() },
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
        className={ cn( "flex flex-col gap-6 w-full max-w-3xl md:px-4", className ) }
        { ...props }
      />
    );
  }

  return (
    <div className={ cn( "flex flex-col gap-6 w-full max-w-3xl md:px-4 my-10", className ) } { ...props }>
      <Card className="rounded-4xl relative overflow-hidden bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <CardHeader className="text-center pb-2 relative">
          { !initialRole && (
            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              onClick={ handleBack }
              className="absolute top-4 left-4 z-10"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
          ) }

          <Link className="flex justify-center py-4" title="Huerray" href="/">
            <Image
              src="/images/huerray-symbol.svg"
              alt="Huerray"
              width={ 60 }
              height={ 60 }
              className="dark:invert"
            />
          </Link>
          <CardTitle className="text-2xl font-primary text-primary">{ t( `titles.${ selectedRole }` ) }</CardTitle>
          <CardDescription>{ t( `descriptions.${ selectedRole }` ) }</CardDescription>
        </CardHeader>
        <CardContent className="px-6 md:px-10 py-6">
          <form onSubmit={ ( e ) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          } } className="space-y-6">

            <CommonFields form={ form } />

            { selectedRole === 'brand' && <AdminFields form={ form } /> }

            <div className="my-6 border-t" />

            <ContactAuthFields form={ form } />

            <input type="hidden" name="role" value={ selectedRole } />

            <div className="mt-8">
              <FormActions form={ form } isLoading={ isLoading } selectedRoleInfo={ { title: t( `titles.${ selectedRole }` ) } } />
            </div>

          </form>
        </CardContent>
      </Card>

      <FieldDescription className="text-center text-xs">
        { t( 'terms.prefix' ) }{ " " }
        <Link href="/terms-and-conditions" className="underline hover:text-foreground">
          { t( 'terms.tos' ) }
        </Link>{ " " }
        { t( 'terms.and' ) }{ " " }
        <Link href="/privacy-policy" className="underline hover:text-foreground">
          { t( 'terms.privacy' ) }
        </Link>
        { t( 'terms.suffix' ) }
      </FieldDescription>
    </div>
  );
};
