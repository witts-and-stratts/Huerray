"use client";

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
import { AuthenticationApi } from "@/lib/api/generated/api/authentication-api";
import { apiClient } from "@/lib/api/client";

export function ForgotPasswordForm( {
  className,
  ...props
}: React.ComponentProps<"div"> ) {
  const [ isLoading, setIsLoading ] = useState( false );
  const [ error, setError ] = useState<string | null>( null );
  const [ success, setSuccess ] = useState( false );
  const [ email, setEmail ] = useState( "" );

  const authApi = new AuthenticationApi( undefined, undefined, apiClient );

  const handleSubmit = async ( e: React.FormEvent ) => {
    e.preventDefault();
    setError( null );
    setIsLoading( true );

    try {
      await authApi.authPasswordResetPost( {
        email: {
          email: email,
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
  };

  if ( success ) {
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
            <CardTitle className="text-2xl font-primary">Check your email</CardTitle>
            <CardDescription>
              We've sent password reset instructions to <strong>{ email }</strong>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground text-center">
                Didn't receive the email? Check your spam folder or try again.
              </p>
              <Button
                variant="outline"
                className="w-full"
                onClick={ () => setSuccess( false ) }
              >
                Try another email
              </Button>
              <FieldDescription className="text-center">
                Remember your password?{ " " }
                <Link href="/login" className="font-medium text-primary hover:underline">
                  Sign in
                </Link>
              </FieldDescription>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

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
          <CardTitle className="text-2xl font-primary">Forgot password?</CardTitle>
          <CardDescription>
            Enter your email and we'll send you a link to reset your password
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
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={ email }
                  onChange={ ( e ) => setEmail( e.target.value ) }
                  required
                />
              </Field>

              <Field>
                <Button type="submit" className="w-full" disabled={ isLoading }>
                  { isLoading ? "Sending..." : "Send reset link" }
                </Button>
                <FieldDescription className="text-center">
                  Remember your password?{ " " }
                  <Link href="/login" className="font-medium text-primary hover:underline">
                    Sign in
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
