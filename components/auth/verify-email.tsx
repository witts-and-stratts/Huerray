'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { Button } from '@/components/dashboard-ui/button';
import { SuperField } from '@/components/dashboard-ui/super-field';
import { AuthenticationApi } from '@/lib/api/generated/api/authentication-api';
import { apiClient } from '@/lib/api/client';

type State = 'loading' | 'success' | 'error';

const authApi = new AuthenticationApi( undefined, undefined, apiClient );

async function verify( token: string ) {
  await authApi.authVerifyEmailPost( { request: { token } } );
}

export function VerifyEmail( { token }: { token: string; } ) {
  const router = useRouter();
  const t = useTranslations( 'auth.verifyEmail' );
  const [ state, setState ] = useState<State>( 'loading' );
  const [ errorMessage, setErrorMessage ] = useState<string | null>( null );
  const [ manualCode, setManualCode ] = useState( '' );
  const [ isRetrying, setIsRetrying ] = useState( false );

  useEffect( () => {
    let cancelled = false;

    verify( token )
      .then( () => {
        if ( cancelled ) return;
        setState( 'success' );
        setTimeout( () => router.push( '/login?verified=1' ), 3000 );
      } )
      .catch( ( err: any ) => {
        if ( cancelled ) return;
        setErrorMessage(
          err?.response?.data?.message || err?.message || t( 'defaultError' )
        );
        setState( 'error' );
      } );

    return () => { cancelled = true; };
  }, [ token, router ] );

  async function handleManualSubmit( e: React.FormEvent<HTMLFormElement> ) {
    e.preventDefault();
    if ( !manualCode.trim() ) return;
    setIsRetrying( true );
    setErrorMessage( null );

    try {
      await verify( manualCode.trim() );
      setState( 'success' );
      setTimeout( () => router.push( '/login?verified=1' ), 3000 );
    } catch ( err: any ) {
      setErrorMessage(
        err?.response?.data?.message || err?.message || t( 'retryError' )
      );
    } finally {
      setIsRetrying( false );
    }
  }

  const GotoSigninButton = ( { variant = 'default' }: { variant?: Parameters<typeof Button>[ 0 ][ 'variant' ]; } ) => (
    <Button className="w-full" size={ 'lg' }
      variant={ variant }
      render={ <Link href="/login">{ t( 'goToSignIn' ) }</Link> } />
  );

  return (
    <div className="flex flex-col gap-6 w-full max-w-[500px]">
      <Card className="py-10 min-h-100 flex flex-col justify-between rounded-2xl md:px-8">
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

          { state === 'loading' && (
            <>
              <div className="flex justify-center mb-3">
                <Loader2 className="size-10 text-primary animate-spin" strokeWidth={ 1 } />
              </div>
              <CardTitle className="text-2xl font-primary">{ t( 'loading.title' ) }</CardTitle>
              <CardDescription>{ t( 'loading.description' ) }</CardDescription>
            </>
          ) }

          { state === 'success' && (
            <>
              <div className="flex justify-center mb-3">
                <CheckCircle2 className="size-10 text-emerald-500" strokeWidth={ 1 } />
              </div>
              <CardTitle className="text-2xl font-primary">{ t( 'success.title' ) }</CardTitle>
              <CardDescription>{ t( 'success.description' ) }</CardDescription>
            </>
          ) }

          { state === 'error' && (
            <>
              <CardTitle className="text-2xl font-primary">{ t( 'error.title' ) }</CardTitle>
              <CardDescription>{ errorMessage }</CardDescription>
            </>
          ) }
        </CardHeader>

        { state !== 'loading' && (
          <CardContent className="flex flex-col gap-4 mt-4">
            { state === 'success' && <GotoSigninButton /> }

            { state === 'error' && (
              <>
                <form onSubmit={ handleManualSubmit } className="flex flex-col gap-4">
                  <SuperField
                    type="text"
                    label={ t( 'error.codeLabel' ) }
                    description={ t( 'error.codeDescription' ) }
                    placeholder={ t( 'error.codePlaceholder' ) }
                    value={ manualCode }
                    onChange={ ( e ) => setManualCode( e.target.value ) }
                    disabled={ isRetrying }
                    autoFocus
                  />
                  <Button type="submit" className="w-full" size="lg" disabled={ isRetrying || !manualCode.trim() }>
                    { isRetrying ? <><Loader2 className="size-4 animate-spin mr-2" />{ t( 'error.verifyingButton' ) }</> : t( 'error.verifyButton' ) }
                  </Button>
                </form>

                <p className="text-muted-foreground text-sm text-center -mt-3">
                  <GotoSigninButton variant="link" />
                </p>
                <p className="text-muted-foreground text-sm text-center">
                  { t( 'error.notReceived' ) }{ ' ' }
                  <Link href="/login" className="font-medium text-primary hover:underline">
                    { t( 'error.resendLink' ) }
                  </Link>
                </p>
              </>
            ) }
          </CardContent>
        ) }
      </Card>
    </div>
  );
}
