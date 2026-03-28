'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/dashboard-ui/card';
import { Button } from '@/components/dashboard-ui/button';
import { NewsletterApi } from '@/lib/api/generated/api/newsletter-api';
import { apiClient } from '@/lib/api/client';

type State = 'loading' | 'success' | 'error';

const newsletterApi = new NewsletterApi(undefined, undefined, apiClient);

export function NewsletterUnsubscribe({ token }: { token: string }) {
  const t = useTranslations('footer.newsletter');
  const [state, setState] = useState<State>('loading');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    newsletterApi.newsletterUnsubscribeGet({ token })
      .then(() => {
        if (cancelled) return;
        setState('success');
      })
      .catch((err: any) => {
        if (cancelled) return;
        setErrorMessage(
          err?.response?.data?.message || err?.message || t('error.description')
        );
        setState('error');
      });

    return () => { cancelled = true; };
  }, [token]);

  return (
    <div className="flex flex-col gap-6 w-full max-w-[500px]">
      <Card className="py-10 min-h-100 flex flex-col justify-between rounded-2xl md:px-8">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Image
              src="/images/huerray-symbol.svg"
              alt="Huerray"
              width={60}
              height={60}
              className="dark:invert"
            />
          </div>

          {state === 'loading' && (
            <>
              <div className="flex justify-center mb-3">
                <Loader2 className="size-10 text-primary animate-spin" strokeWidth={1} />
              </div>
              <CardTitle className="text-2xl font-primary">{t('loading.title')}</CardTitle>
              <CardDescription>{t('loading.description')}</CardDescription>
            </>
          )}

          {state === 'success' && (
            <>
              <div className="flex justify-center mb-3">
                <CheckCircle2 className="size-10 text-emerald-500" strokeWidth={1} />
              </div>
              <CardTitle className="text-2xl font-primary">{t('success.title')}</CardTitle>
              <CardDescription>{t('success.description')}</CardDescription>
            </>
          )}

          {state === 'error' && (
            <>
              <div className="flex justify-center mb-3">
                <XCircle className="size-10 text-destructive" strokeWidth={1} />
              </div>
              <CardTitle className="text-2xl font-primary">{t('error.title')}</CardTitle>
              <CardDescription>{errorMessage}</CardDescription>
            </>
          )}
        </CardHeader>

        {state !== 'loading' && (
          <CardContent className="flex flex-col gap-4 mt-4">
            <Button
              className="w-full"
              size="lg"
              render={<Link href="/">{t('backHome')}</Link>}
            />
          </CardContent>
        )}
      </Card>
    </div>
  );
}
