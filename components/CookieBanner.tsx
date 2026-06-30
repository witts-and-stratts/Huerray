'use client';

import { useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import * as CookieConsent from 'vanilla-cookieconsent';

declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

function gtag(...args: unknown[]) {
  window.dataLayer = window.dataLayer || [];
  // vanilla-cookieconsent consent mode requires the `arguments` object
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments);
}

function updateGtmConsent() {
  gtag('consent', 'update', {
    analytics_storage: CookieConsent.acceptedCategory('analytics') ? 'granted' : 'denied',
    ad_storage: CookieConsent.acceptedCategory('marketing') ? 'granted' : 'denied',
    ad_user_data: CookieConsent.acceptedCategory('marketing') ? 'granted' : 'denied',
    ad_personalization: CookieConsent.acceptedCategory('marketing') ? 'granted' : 'denied',
  });
}

export function CookieBanner() {
  const locale = useLocale();
  const t = useTranslations('cookie-consent');
  const privacyUrl = `/${locale}/privacy-policy`;

  useEffect(() => {
    CookieConsent.run({
      guiOptions: {
        consentModal: {
          layout: 'box',
          position: 'bottom left',
          equalWeightButtons: false,
          flipButtons: false,
        },
        preferencesModal: {
          layout: 'box',
          equalWeightButtons: true,
          flipButtons: false,
        },
      },

      categories: {
        necessary: {
          enabled: true,
          readOnly: true,
        },
        analytics: {
          autoClear: {
            cookies: [
              { name: /^_ga/ },
              { name: '_gid' },
              { name: '_gat' },
            ],
          },
          services: {
            ga4: { label: 'Google Analytics 4' },
          },
        },
        marketing: {
          services: {
            gtm: { label: 'Google Tag Manager' },
          },
        },
      },

      language: {
        default: locale,
        translations: {
          [locale]: {
            consentModal: {
              title: t('consentModal.title'),
              description: t('consentModal.description'),
              acceptAllBtn: t('consentModal.acceptAllBtn'),
              acceptNecessaryBtn: t('consentModal.acceptNecessaryBtn'),
              showPreferencesBtn: t('consentModal.showPreferencesBtn'),
              footer: t('consentModal.footer', { privacyUrl }),
            },
            preferencesModal: {
              title: t('preferencesModal.title'),
              acceptAllBtn: t('preferencesModal.acceptAllBtn'),
              acceptNecessaryBtn: t('preferencesModal.acceptNecessaryBtn'),
              savePreferencesBtn: t('preferencesModal.savePreferencesBtn'),
              closeIconLabel: t('preferencesModal.closeIconLabel'),
              serviceCounterLabel: t('preferencesModal.serviceCounterLabel'),
              sections: [
                {
                  title: t('preferencesModal.sections.intro.title'),
                  description: t('preferencesModal.sections.intro.description'),
                },
                {
                  title: t('preferencesModal.sections.necessary.title'),
                  description: t('preferencesModal.sections.necessary.description'),
                  linkedCategory: 'necessary',
                },
                {
                  title: t('preferencesModal.sections.analytics.title'),
                  description: t('preferencesModal.sections.analytics.description'),
                  linkedCategory: 'analytics',
                },
                {
                  title: t('preferencesModal.sections.marketing.title'),
                  description: t('preferencesModal.sections.marketing.description'),
                  linkedCategory: 'marketing',
                },
                {
                  title: t('preferencesModal.sections.more.title'),
                  description: t('preferencesModal.sections.more.description', { privacyUrl }),
                },
              ],
            },
          },
        },
      },

      onConsent: () => {
        updateGtmConsent();
      },

      onChange: () => {
        updateGtmConsent();
      },
    });
    // locale drives re-init if user switches language; t is stable per locale
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  return null;
}
