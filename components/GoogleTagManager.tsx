import Script from 'next/script';

export const GTM_ID = 'GTM-WKHDCCNF';

// Google Consent Mode v2 — must fire before GTM initializes, so this has to
// render in <head>, ahead of the GTM script in <body>.
export function GtmConsentDefault() {
  return (
    <script
      dangerouslySetInnerHTML={ {
        __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{'ad_storage':'denied','ad_user_data':'denied','ad_personalization':'denied','analytics_storage':'denied','wait_for_update':10000});`,
      } }
    />
  );
}

export function GoogleTagManager() {
  return (
    <>
      <noscript>
        <iframe
          src={ `https://www.googletagmanager.com/ns.html?id=${ GTM_ID }` }
          height='0'
          width='0'
          style={ { display: 'none', visibility: 'hidden' } }
        />
      </noscript>
      <Script
        id='gtm-script'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={ {
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${ GTM_ID }');`,
        } }
      />
    </>
  );
}
