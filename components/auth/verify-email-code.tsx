'use client';

import { CodeInput } from '@/components/auth/code-input';
import { Button } from '@/components/dashboard-ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { apiClient } from '@/lib/api/client';
import { AuthenticationApi } from '@/lib/api/generated/api/authentication-api';
import type { ModelsUserResponse } from '@/lib/api/generated/models';
import { UserApi } from '@/lib/api/generated/api/user-api';
import { usersKeys } from '@/lib/api/hooks/users';
import { useAuth } from '@/lib/auth/auth-context';
import { broadcastEmailVerified, subscribeEmailVerified } from '@/lib/auth/email-verification-context';
import { saveSignupDraft } from '@/lib/auth/signup-draft';
import { DASHBOARD_PATHS } from '@/lib/constants';
import { useClearPersistedData } from '@/lib/hooks/use-clear-persisted-data';
import { useQuery } from '@tanstack/react-query';
import type { RawAxiosRequestConfig } from 'axios';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const CODE_LENGTH = 6;
const RESEND_COOLDOWN_SECONDS = 60;
const PROFILE_POLL_INTERVAL = 5_000;
const REDIRECT_DELAY = 1_500;

const authApi = new AuthenticationApi( undefined, undefined, apiClient );
const userApi = new UserApi( undefined, undefined, apiClient );

export function VerifyEmailCode() {
  const router = useRouter();
  const t = useTranslations( 'auth.verifyEmailCode' );
  const { user, setUser } = useAuth();
  const clearPersistedData = useClearPersistedData();

  const [ code, setCode ] = useState( '' );
  const [ isVerifying, setIsVerifying ] = useState( false );
  const [ isResending, setIsResending ] = useState( false );
  const [ isChangingEmail, setIsChangingEmail ] = useState( false );
  const [ destination, setDestination ] = useState<'dashboard' | 'login' | null>( null );
  const [ error, setError ] = useState<string | null>( null );
  const [ cooldown, setCooldown ] = useState( RESEND_COOLDOWN_SECONDS );
  const isVerified = destination !== null;

  // Registration normally starts a session, but it can be missing (blocked or
  // expired cookies). A 401 here must not trigger the global logout redirect.
  const { data: profile, refetch: refetchProfile } = useQuery( {
    queryKey: [ ...usersKeys.all, 'profile', 'verification-check' ],
    queryFn: async () => {
      const response = await userApi.usersProfileGet( { skipAuthRedirect: true } as RawAxiosRequestConfig );
      const raw = response.data as { data?: ModelsUserResponse; };
      return ( raw.data || raw ) as ModelsUserResponse;
    },
    enabled: !!user && !isVerified,
    retry: false,
    refetchInterval: ( query ) => query.state.status === 'error' ? false : PROFILE_POLL_INTERVAL,
    refetchOnWindowFocus: true,
  } );

  useEffect( () => {
    if ( !user && !isVerified ) router.replace( '/login' );
  }, [ user, isVerified, router ] );

  useEffect( () => subscribeEmailVerified( () => { refetchProfile(); } ), [ refetchProfile ] );

  useEffect( () => {
    if ( cooldown <= 0 ) return;
    const timer = setTimeout( () => setCooldown( ( seconds ) => seconds - 1 ), 1000 );
    return () => clearTimeout( timer );
  }, [ cooldown ] );

  // A session exists and the profile says verified (verified on another device or tab).
  useEffect( () => {
    if ( !user || destination || !profile?.email_verified ) return;
    setDestination( 'dashboard' );
    setUser( { ...user, emailVerified: true } );
  }, [ profile?.email_verified, destination, user, setUser ] );

  useEffect( () => {
    if ( !destination || !user ) return;
    const target = destination === 'dashboard' ? DASHBOARD_PATHS[ user.role ] : '/login?verified=1';
    const timer = setTimeout( () => {
      // Without a session the pending signup cookie must not look like a signed-in user.
      if ( destination === 'login' ) setUser( null );
      // Full reload so React Query and Redux state are rebuilt under the verified session.
      window.location.href = target;
    }, REDIRECT_DELAY );
    return () => clearTimeout( timer );
  }, [ destination, user, setUser ] );

  async function verifyCode( token: string ) {
    if ( token.length !== CODE_LENGTH || isVerifying ) return;

    setIsVerifying( true );
    setError( null );
    try {
      await authApi.authVerifyEmailPost( { request: { token } } );
      broadcastEmailVerified();
      const { data: latest } = await refetchProfile();
      if ( latest?.email_verified ) return;
      // No session (new signup): the account is verified, but the user still has to sign in.
      setDestination( 'login' );
    } catch ( err: any ) {
      setError( err?.response?.data?.message || err?.message || t( 'invalidCode' ) );
    } finally {
      setIsVerifying( false );
    }
  }

  async function handleResend() {
    if ( !user?.email || cooldown > 0 || isResending ) return;

    setIsResending( true );
    try {
      await authApi.authResendVerificationPost( { request: { email: user.email } } );
      setCooldown( RESEND_COOLDOWN_SECONDS );
      setError( null );
      toast.success( t( 'resent.title' ), {
        description: t( 'resent.description', { email: user.email } ),
        richColors: true,
      } );
    } catch ( err: any ) {
      toast.error( t( 'resendFailed.title' ), {
        description: err?.response?.data?.message || t( 'resendFailed.description' ),
        richColors: true,
      } );
    } finally {
      setIsResending( false );
    }
  }

  async function handleChangeEmail() {
    if ( !user || isChangingEmail ) return;

    setIsChangingEmail( true );
    const { role, email, firstName, lastName } = user;
    try {
      // Best-effort: end the unverified session so the user can register again.
      try {
        await authApi.authLogoutPost();
      } catch {
        // No active session to clear.
      }
      await clearPersistedData();
      saveSignupDraft( { firstName, lastName, email } );
      window.location.href = `/signup?role=${ role }`;
    } catch {
      setIsChangingEmail( false );
    }
  }

  if ( !user ) return null;

  return (
    <div className="flex flex-col gap-6 w-full max-w-[500px]">
      <Card className="py-10 flex flex-col rounded-2xl md:px-8">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Image
              src="/images/huerray-symbol.svg"
              alt="Huerray"
              width={ 60 }
              height={ 60 }
              className="dark:invert"
            />
          </div>

          { isVerified ? (
            <>
              <div className="flex justify-center mb-3">
                <CheckCircle2 className="size-10 text-emerald-500" strokeWidth={ 1 } />
              </div>
              <CardTitle className="text-2xl font-primary">{ t( 'success.title' ) }</CardTitle>
              <CardDescription>{ t( destination === 'login' ? 'success.signInDescription' : 'success.description' ) }</CardDescription>
            </>
          ) : (
            <>
              <CardTitle className="text-2xl font-primary">{ t( 'title' ) }</CardTitle>
              <CardDescription>
                { t.rich( 'description', {
                  email: user.email,
                  strong: ( chunks ) => <strong className="text-foreground break-all">{ chunks }</strong>,
                } ) }
              </CardDescription>
            </>
          ) }
        </CardHeader>

        { !isVerified && (
          <CardContent className="flex flex-col gap-4 mt-4">
            <form
              onSubmit={ ( e ) => {
                e.preventDefault();
                verifyCode( code );
              } }
              className="flex flex-col gap-4"
            >
              <p className="text-sm text-muted-foreground text-center">{ t( 'codeDescription' ) }</p>
              <CodeInput
                length={ CODE_LENGTH }
                label={ t( 'codeLabel' ) }
                value={ code }
                onChange={ ( value ) => {
                  setCode( value );
                  if ( error ) setError( null );
                } }
                onComplete={ verifyCode }
                disabled={ isVerifying }
                invalid={ !!error }
                autoFocus
              />
              { error && <p role="alert" className="text-sm text-destructive text-center">{ error }</p> }
              <Button type="submit" className="w-full" size="lg" disabled={ isVerifying || code.length !== CODE_LENGTH }>
                { isVerifying
                  ? <><Loader2 className="size-4 animate-spin mr-2" />{ t( 'verifying' ) }</>
                  : t( 'verify' ) }
              </Button>
            </form>

            <div className="flex flex-col items-center gap-1 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <span>{ t( 'notReceived' ) }</span>
                <Button
                  type="button"
                  variant="link"
                  className="h-auto p-0"
                  onClick={ handleResend }
                  disabled={ cooldown > 0 || isResending }
                >
                  { cooldown > 0 ? t( 'resendIn', { seconds: cooldown } ) : t( 'resend' ) }
                </Button>
              </div>
              <div className="flex items-center gap-1">
                <span>{ t( 'verifiedElsewhere' ) }</span>
                <Button
                  type="button"
                  variant="link"
                  className="h-auto p-0"
                  onClick={ () => { setUser( null ); window.location.href = '/login?verified=1'; } }
                >
                  { t( 'signIn' ) }
                </Button>
              </div>
              <div className="flex items-center gap-1">
                <span>{ t( 'wrongEmail' ) }</span>
                <Button
                  type="button"
                  variant="link"
                  className="h-auto p-0"
                  onClick={ handleChangeEmail }
                  disabled={ isChangingEmail }
                >
                  { t( 'changeEmail' ) }
                </Button>
              </div>
            </div>
          </CardContent>
        ) }
      </Card>
    </div>
  );
}
