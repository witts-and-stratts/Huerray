'use client';

import { cn } from '@/lib/dashboard-utils';
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
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from '@/components/dashboard-ui/field';
import { Input } from '@/components/dashboard-ui/input';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthenticationApi } from '@/lib/api/generated/api/authentication-api';
import { apiClient, setAuthToken } from '@/lib/api/client';
import { useAuth } from '@/lib/auth/auth-context';
import { useSearchParams } from 'next/navigation';

export function LoginForm({
  showResetSuccess = false,
  className,
  ...props
}: React.ComponentProps<'div'> & { showResetSuccess?: boolean }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const authApi = new AuthenticationApi(undefined, undefined, apiClient);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await authApi.authLoginPost({
        credentials: {
          username: formData.email,
          password: formData.password,
        },
      });

      console.log('=== LOGIN RESPONSE DEBUG ===');
      console.log('Full response:', response);
      console.log('response.data:', response.data);
      console.log('response.data.data:', response.data?.data);
      console.log('All cookies:', document.cookie);
      console.log('===========================');

      const responseData = response.data?.data as any;

      // Store the auth token if provided in response
      const token = responseData?.token;
      if (token) {
        setAuthToken(token);
      } else {
        // The backend might be using session-based auth
        // Check if any session cookie was set by the backend
        console.log(
          'No token in response - backend may be using session-based auth'
        );
        console.log(
          "Checking for session cookies (httpOnly cookies won't be visible here)"
        );

        // For session-based auth, we'll create a dummy authToken for middleware
        // The real auth is handled by the backend session
        const sessionToken = 'session-authenticated';
        console.log('Setting placeholder authToken for middleware');
        setAuthToken(sessionToken);
      }

      // Store user data if provided
      if (responseData?.user) {
        const userData = responseData.user;
        console.log('Setting user data:', userData);
        setUser({
          id: userData.id || '',
          email: userData.email || formData.email,
          firstName: userData.first_name || '',
          lastName: userData.last_name || '',
          role: userData.role || 'brand',
          avatar: userData.avatar_url,
        });

        // Check for redirect parameter
        const redirectTo = searchParams.get('redirect');

        // Small delay to ensure cookies are fully set before redirect
        setTimeout(() => {
          if (redirectTo) {
            // Use the redirect parameter - full page reload to ensure cookies are sent
            window.location.href = redirectTo;
          } else {
            // Redirect based on user role - full page reload to ensure cookies are sent
            const dashboardPath =
              userData.role === 'admin'
                ? '/admin'
                : userData.role === 'creator'
                ? '/creator-admin'
                : '/brand-admin';

            window.location.href = dashboardPath;
          }
        }, 100);
      } else {
        // Fallback if no user data in response
        setTimeout(() => {
          window.location.href = '/brand-admin';
        }, 100);
      }
    } catch (err: any) {
      console.error('Login error:', err);
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        'Login failed. Please check your credentials.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div
      className={cn('flex flex-col gap-6 w-full max-w-md', className)}
      {...props}
    >
      {/* Logo */}
      <div className='flex justify-center mb-4'>
        <Image
          src='/images/huerray-symbol.svg'
          alt='Huerray'
          width={60}
          height={60}
          className='dark:invert'
        />
      </div>

      <Card>
        <CardHeader className='text-center'>
          <CardTitle className='text-2xl font-primary'>Welcome back</CardTitle>
          <CardDescription>Sign in to your Huerray account</CardDescription>
        </CardHeader>
        <CardContent>
          {showResetSuccess && (
            <div className='mb-4 p-3 bg-green-50 border border-green-200 rounded-md'>
              <p className='text-sm text-green-600'>
                ✓ Password reset successful! You can now sign in with your new
                password.
              </p>
            </div>
          )}
          {error && (
            <div className='mb-4 p-3 bg-red-50 border border-red-200 rounded-md'>
              <p className='text-sm text-red-600'>{error}</p>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <Button variant='outline' type='button' className='w-full'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    className='w-5 h-5'
                  >
                    <path
                      d='M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701'
                      fill='currentColor'
                    />
                  </svg>
                  Continue with Apple
                </Button>
                <Button variant='outline' type='button' className='w-full'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    className='w-5 h-5'
                  >
                    <path
                      d='M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z'
                      fill='currentColor'
                    />
                  </svg>
                  Continue with Google
                </Button>
              </Field>

              <FieldSeparator className='*:data-[slot=field-separator-content]:bg-card'>
                Or continue with email
              </FieldSeparator>

              <Field>
                <FieldLabel htmlFor='email'>Email</FieldLabel>
                <Input
                  id='email'
                  name='email'
                  type='email'
                  placeholder='you@example.com'
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </Field>

              <Field>
                <div className='flex items-center justify-between'>
                  <FieldLabel htmlFor='password'>Password</FieldLabel>
                  <Link
                    href='/forgot-password'
                    className='text-sm text-muted-foreground underline-offset-4 hover:underline hover:text-foreground transition-colors'
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id='password'
                  name='password'
                  type='password'
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </Field>

              <Field>
                <Button type='submit' className='w-full' disabled={isLoading}>
                  {isLoading ? 'Signing in...' : 'Sign in'}
                </Button>
                <FieldDescription className='text-center'>
                  Don&apos;t have an account?{' '}
                  <Link
                    href='/signup'
                    className='font-medium text-primary hover:underline'
                  >
                    Sign up
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      <FieldDescription className='text-center text-xs'>
        By continuing, you agree to our{' '}
        <Link href='/terms' className='underline hover:text-foreground'>
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link href='/privacy' className='underline hover:text-foreground'>
          Privacy Policy
        </Link>
        .
      </FieldDescription>
    </div>
  );
}
