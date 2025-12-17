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
  FieldSeparator,
} from "@/components/dashboard-ui/field";
import { Input } from "@/components/dashboard-ui/input";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthenticationApi } from "@/lib/api/generated/api/authentication-api";
import { apiClient, setAuthToken } from "@/lib/api/client";
import { ModelsRegisterRequestUserTypeEnum } from "@/lib/api/generated/models/models-register-request";
import { useAuth } from "@/lib/auth/auth-context";

type UserRole = "brand" | "creator" | "admin" | null;

export function SignupForm( {
  className,
  ...props
}: React.ComponentProps<"div"> ) {
  const router = useRouter();
  const { setUser } = useAuth();
  const [ selectedRole, setSelectedRole ] = useState<UserRole>( null );
  const [ isLoading, setIsLoading ] = useState( false );
  const [ error, setError ] = useState<string | null>( null );
  const [ formData, setFormData ] = useState( {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
  } );

  const authApi = new AuthenticationApi( undefined, undefined, apiClient );

  const handleSubmit = async ( e: React.FormEvent ) => {
    e.preventDefault();
    setError( null );
    setIsLoading( true );

    // Validation
    if ( formData.password !== formData.confirmPassword ) {
      setError( "Passwords do not match" );
      setIsLoading( false );
      return;
    }

    if ( formData.password.length < 8 ) {
      setError( "Password must be at least 8 characters" );
      setIsLoading( false );
      return;
    }

    try {
      // Map role to API user type
      const userType = selectedRole === "creator"
        ? ModelsRegisterRequestUserTypeEnum.Creator
        : ModelsRegisterRequestUserTypeEnum.BrandUser;

      const response = await authApi.authRegisterPost( {
        user: {
          email: formData.email,
          first_name: formData.firstName,
          last_name: formData.lastName,
          password: formData.password,
          verify_password: formData.confirmPassword,
          user_type: userType,
        }
      } );

      // Store the auth token if provided
      if ( response.data?.data?.token ) {
        setAuthToken( response.data.data.token );
      }

      // Store user data
      setUser( {
        id: response.data?.data?.user?.id || '',
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        role: selectedRole as 'brand' | 'creator' | 'admin',
        avatar: response.data?.data?.user?.avatar_url,
      } );

      // On success, redirect to appropriate dashboard
      if ( response.data ) {
        const dashboardPath = selectedRole === "admin"
          ? "/dashboard/admin"
          : selectedRole === "creator"
            ? "/dashboard/creator"
            : "/dashboard/brand";

        router.push( dashboardPath );
      }
    } catch ( err: any ) {
      console.error( "Registration error:", err );
      const errorMessage = err.response?.data?.message || err.message || "Registration failed. Please try again.";
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

  const roles = [
    {
      value: "brand" as const,
      title: "Brand",
      description: "Create campaigns and collaborate with creators",
      icon: "🏢",
    },
    {
      value: "creator" as const,
      title: "Creator",
      description: "Find gigs and grow your portfolio",
      icon: "🎨",
    },
    {
      value: "admin" as const,
      title: "Admin",
      description: "Manage platform and moderate content",
      icon: "⚙️",
    },
  ];

  if ( !selectedRole ) {
    return (
      <div className={ cn( "flex flex-col gap-6 w-full max-w-3xl", className ) } { ...props }>
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

        <div className="text-center mb-4">
          <h1 className="text-3xl font-primary font-medium tracking-tight mb-2">
            Join Huerray
          </h1>
          <p className="text-muted-foreground">
            Choose your account type to get started
          </p>
        </div>

        {/* Role Selection Cards */ }
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          { roles.map( ( role ) => (
            <Card
              key={ role.value }
              className="cursor-pointer transition-all hover:border-primary hover:shadow-md"
              onClick={ () => setSelectedRole( role.value ) }
            >
              <CardHeader className="text-center">
                <div className="text-4xl mb-2">{ role.icon }</div>
                <CardTitle className="text-xl">{ role.title }</CardTitle>
                <CardDescription>{ role.description }</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Sign up as { role.title }
                </Button>
              </CardContent>
            </Card>
          ) ) }
        </div>

        <FieldDescription className="text-center">
          Already have an account?{ " " }
          <Link href="/login" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </FieldDescription>

        <FieldDescription className="text-center text-xs">
          By continuing, you agree to our{ " " }
          <Link href="/terms" className="underline hover:text-foreground">
            Terms of Service
          </Link>{ " " }
          and{ " " }
          <Link href="/privacy" className="underline hover:text-foreground">
            Privacy Policy
          </Link>
          .
        </FieldDescription>
      </div>
    );
  }

  const selectedRoleInfo = roles.find( ( r ) => r.value === selectedRole )!;

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
          <div className="text-3xl mb-2">{ selectedRoleInfo.icon }</div>
          <CardTitle className="text-2xl font-primary">
            Sign up as { selectedRoleInfo.title }
          </CardTitle>
          <CardDescription>
            { selectedRoleInfo.description }
          </CardDescription>
          <Button
            variant="ghost"
            size="sm"
            onClick={ () => setSelectedRole( null ) }
            className="mt-2"
          >
            ← Change account type
          </Button>
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
                <Button variant="outline" type="button" className="w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5">
                    <path
                      d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                      fill="currentColor"
                    />
                  </svg>
                  Continue with Apple
                </Button>
                <Button variant="outline" type="button" className="w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Continue with Google
                </Button>
              </Field>

              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or create with email
              </FieldSeparator>

              <div className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="first-name">First name</FieldLabel>
                  <Input
                    id="first-name"
                    name="firstName"
                    type="text"
                    placeholder="John"
                    value={ formData.firstName }
                    onChange={ handleInputChange }
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="last-name">Last name</FieldLabel>
                  <Input
                    id="last-name"
                    name="lastName"
                    type="text"
                    placeholder="Doe"
                    value={ formData.lastName }
                    onChange={ handleInputChange }
                    required
                  />
                </Field>
              </div>

              { selectedRole === "brand" && (
                <Field>
                  <FieldLabel htmlFor="company-name">Company name</FieldLabel>
                  <Input
                    id="company-name"
                    name="companyName"
                    type="text"
                    placeholder="Acme Corp"
                    value={ formData.companyName }
                    onChange={ handleInputChange }
                    required
                  />
                </Field>
              ) }

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={ formData.email }
                  onChange={ handleInputChange }
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Create a strong password"
                  value={ formData.password }
                  onChange={ handleInputChange }
                  required
                />
                <FieldDescription>
                  Must be at least 8 characters
                </FieldDescription>
              </Field>

              <Field>
                <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
                <Input
                  id="confirm-password"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={ formData.confirmPassword }
                  onChange={ handleInputChange }
                  required
                />
              </Field>

              <input type="hidden" name="role" value={ selectedRole } />

              <Field>
                <Button type="submit" className="w-full" disabled={ isLoading }>
                  { isLoading ? "Creating account..." : `Create ${ selectedRoleInfo.title } account` }
                </Button>
                <FieldDescription className="text-center">
                  Already have an account?{ " " }
                  <Link href="/login" className="font-medium text-primary hover:underline">
                    Sign in
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      <FieldDescription className="text-center text-xs">
        By continuing, you agree to our{ " " }
        <Link href="/terms" className="underline hover:text-foreground">
          Terms of Service
        </Link>{ " " }
        and{ " " }
        <Link href="/privacy" className="underline hover:text-foreground">
          Privacy Policy
        </Link>
        .
      </FieldDescription>
    </div>
  );
}
