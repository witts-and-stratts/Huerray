"use client";

import { cn } from "@/lib/dashboard-utils";
import { Button } from "@/components/dashboard-ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/dashboard-ui/card";
import {
  FieldDescription,
  FieldGroup,
} from "@/components/dashboard-ui/field";
import { SuperField } from "@/components/dashboard-ui/super-field";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AuthenticationApi } from "@/lib/api/generated/api/authentication-api";
import { apiClient } from "@/lib/api/client";
import { useForm } from '@tanstack/react-form';
import { useTranslations } from "next-intl";
import { createForgotPasswordSchema } from "./schemas";

export function ForgotPasswordForm( {
  className,
  ...props
}: React.ComponentProps<"div"> ) {
  const t = useTranslations( 'auth.forgotPassword' );
  const tValidation = useTranslations( 'auth.validation' );
  const [ isLoading, setIsLoading ] = useState( false );
  const [ error, setError ] = useState<string | null>( null );
  const [ success, setSuccess ] = useState( false );

  const authApi = new AuthenticationApi( undefined, undefined, apiClient );

  const form = useForm( {
    defaultValues: {
      email: "",
    },
    validators: {
      onChange: createForgotPasswordSchema( tValidation ),
    },
    onSubmit: async ( { value } ) => {
      setError( null );
      setIsLoading( true );

      try {
        await authApi.authPasswordResetPost( {
          email: {
            email: value.email,
          }
        } );

        setSuccess( true );
      } catch ( err: any ) {
        console.error( "Password reset error:", err );
        const errorMessage = err.response?.data?.message || err.message || "Failed to send reset email. Please try again.";
        setError( errorMessage );
      } finally {
        setIsLoading( false );
      }
    },
  } );

  if ( success ) {
    return (
      <div className={ cn( "flex flex-col gap-6 w-full max-w-md", className ) } { ...props }>
        <Card>
          <CardHeader className="text-center">
            {/* Logo */ }
            <div className="flex justify-center mb-4">
              <Image
                src="/images/huerray-symbol.svg"
                alt="Huerray"
                width={ 60 }
                height={ 60 }
                className="dark:invert"
              />
            </div>

            <CardTitle className="text-2xl font-primary">{ t( 'success.title' ) }</CardTitle>
            <CardDescription>
              { t( 'success.description' ) } <strong>{ form.getFieldValue( "email" ) }</strong>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground text-center">
                { t( 'success.notReceived' ) }
              </p>
              <Button
                variant="outline"
                className="w-full"
                onClick={ () => setSuccess( false ) }
              >
                { t( 'success.tryAgain' ) }
              </Button>

            </div>
          </CardContent>
          <CardFooter className="justify-center">
            <FieldDescription className="text-center">
              { t( 'rememberPassword' ) }{ " " }
              <Link href="/login" className="font-medium text-primary hover:underline">
                { t( 'signIn' ) }
              </Link>
            </FieldDescription>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className={ cn( "flex flex-col gap-6 w-full max-w-md", className ) } { ...props }>
      <Card>
        <CardHeader className="text-center">
          {/* Logo */ }
          <div className="flex justify-center mb-4">
            <Image
              src="/images/huerray-symbol.svg"
              alt="Huerray"
              width={ 60 }
              height={ 60 }
              className="dark:invert"
            />
          </div>
          <CardTitle className="text-2xl font-primary">{ t( 'title' ) }</CardTitle>
          <CardDescription>
            { t( 'description' ) }
          </CardDescription>
        </CardHeader>
        <CardContent>
          { error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{ error }</p>
            </div>
          ) }
          <form onSubmit={ ( e ) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          } }>
            <FieldGroup>
              <form.Field
                name="email"
                children={ ( field ) => (
                  <SuperField
                    id="email"
                    name={ field.name }
                    type="email"
                    placeholder={ t( 'emailPlaceholder' ) }
                    value={ field.state.value }
                    onChange={ ( e: React.ChangeEvent<HTMLInputElement> ) => field.handleChange( e.target.value ) }
                    onBlur={ field.handleBlur }
                    error={ field.state.meta.isTouched && field.state.meta.errors ? field.state.meta.errors.map( ( e ) => e?.message ).join( ", " ) : undefined }
                    required
                    label={ t( 'emailLabel' ) }
                  />
                ) }
              />

              <div className="mt-4">
                <Button type="submit" className="w-full" disabled={ isLoading }>
                  { isLoading ? t( 'submittingButton' ) : t( 'submitButton' ) }
                </Button>
              </div>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className="justify-center">
          <FieldDescription className="text-center">
            { t( 'rememberPassword' ) }{ " " }
            <Link href="/login" className="font-medium text-primary hover:underline">
              { t( 'signIn' ) }
            </Link>
          </FieldDescription>
        </CardFooter>
      </Card>
    </div>
  );
}
