'use client';

import Script from 'next/script';

interface AnalyticsProps {
  gtagId?: string;
  gtmId?: string;
}

export default function Analytics({ gtagId = 'G-XXXXXXXXXX', gtmId = 'GTM-XXXXXXX' }: AnalyticsProps) {
  return (
    <>
      {/* Google Tag Manager */}
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${gtmId}');
        `}
      </Script>

      {/* Google Analytics 4 */}
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-config" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gtagId}', {
            page_title: document.title,
            page_location: window.location.href,
            page_path: window.location.pathname,
            send_page_view: true
          });
        `}
      </Script>

      {/* Google Site Verification Meta Tag */}
      <Script id="google-site-verification" strategy="afterInteractive">
        {`
          // Add Google Site Verification
          const meta = document.createElement('meta');
          meta.name = 'google-site-verification';
          meta.content = 'your-google-site-verification-code';
          document.head.appendChild(meta);
        `}
      </Script>
    </>
  );
}