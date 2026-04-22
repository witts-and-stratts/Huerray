"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { cn } from "@/lib/dashboard-utils";
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
  FieldLabel,
} from "@/components/dashboard-ui/field";
import { Input } from "@/components/dashboard-ui/input";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthenticationApi } from "@/lib/api/generated/api/authentication-api";
import { apiClient } from "@/lib/api/client";
import { useTranslations } from "next-intl";

interface ResetPasswordFormProps extends React.ComponentProps<"div"> {
  token: string;
}

export function ResetPasswordForm( {
  token,
  className,
  ...props
}: ResetPasswordFormProps ) {
  const t = useTranslations( 'auth.resetPassword' );
  const tValidation = useTranslations( 'auth.validation' );
  const router = useRouter();
  const [ isLoading, setIsLoading ] = useState( false );
  const [ error, setError ] = useState<string | null>( null );
  const [ formData, setFormData ] = useState( {
    password: "",
    confirmPassword: "",
  } );

  const authApi = new AuthenticationApi( undefined, undefined, apiClient );

  const handleSubmit = async ( e: React.FormEvent ) => {
    e.preventDefault();
    setError( null );
    setIsLoading( true );

    // Validation
    if ( formData.password !== formData.confirmPassword ) {
      setError( tValidation( 'passwordsDoNotMatch' ) );
      setIsLoading( false );
      return;
    }

    if ( formData.password.length < 8 ) {
      setError( tValidation( 'passwordMin' ) );
      setIsLoading( false );
      return;
    }

    try {
      await authApi.authPasswordResetConfirmPost( {
        reset: {
          token: token,
          password: formData.password,
        }
      } );

      // Success - redirect to login
      router.push( "/login?reset=success" );
    } catch ( err: any ) {
      console.error( "Password reset error:", err );
      const errorMessage = err.response?.data?.message || err.message || t( 'errors.default' );
      setError( errorMessage );
    } finally {
      setIsLoading( false );
    }
  };

  const handleInputChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
    setFormData( {
      ...formData,
      [ e.target.name ]: e.target.value,
    } );
  };

  return (
    <div className={ cn( "flex flex-col gap-6 w-full max-w-md", className ) } { ...props }>
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

      <Card>
        <CardHeader className="text-center">
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
          <form onSubmit={ handleSubmit }>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="password">{ t( 'newPasswordLabel' ) }</FieldLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder={ t( 'newPasswordPlaceholder' ) }
                  value={ formData.password }
                  onChange={ handleInputChange }
                  required
                />
                <FieldDescription>
                  { t( 'passwordHelp' ) }
                </FieldDescription>
              </Field>

              <Field>
                <FieldLabel htmlFor="confirmPassword">{ t( 'confirmPasswordLabel' ) }</FieldLabel>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder={ t( 'confirmPasswordPlaceholder' ) }
                  value={ formData.confirmPassword }
                  onChange={ handleInputChange }
                  required
                />
              </Field>

              <Field>
                <Button type="submit" className="w-full" disabled={ isLoading }>
                  { isLoading ? t( 'submittingButton' ) : t( 'submitButton' ) }
                </Button>
                <FieldDescription className="text-center">
                  { t( 'rememberPassword' ) }{ " " }
                  <Link href="/login" className="font-medium text-primary hover:underline">
                    { t( 'signIn' ) }
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
