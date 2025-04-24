import { getDeviceInfo } from '@/utils/device';
import { Partytown } from '@qwik.dev/partytown/react';
import Head from 'next/head';
import Script from 'next/script';

export const TrackingScripts = async () => {
  const deviceInfo = await getDeviceInfo();

  if (deviceInfo.isOldPhone) return null;

  // Define events/functions to forward to web workers via Partytown
  const forwardList = ['dataLayer.push', 'gtag', 'ga', 'fbq'];

  return (
    <>
      <Head>
        {/* Configure Partytown to forward events to web workers */}
        <Partytown
          debug={process.env.NODE_ENV === 'development'}
          logCalls={process.env.NODE_ENV === 'development'}
          forward={forwardList.map((item) => [
            item,
            { preserveBehavior: true },
          ])}
        />
      </Head>

      {!deviceInfo.isMobile && (
        <Script id="liveChat" strategy="lazyOnload">
          {`window.__lc = window.__lc || {};
            window.__lc.license = ${process.env.NEXT_PUBLIC_LIVE_CHAT_LICENSE};
          (function () {
            const lc = document.createElement('script');
            lc.type = 'text/javascript';
            lc.async = true;
            lc.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'cdn.livechatinc.com/tracking.js';
            const s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(lc, s);
          })();
        `}
        </Script>
      )}

      {process.env.NEXT_PUBLIC_GTM_ID && (
        <Script
          src={`https://www.googletagmanager.com/gtm.js?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
          strategy="worker"
        />
      )}

      {process.env.NEXT_PUBLIC_GTAG_ID && (
        <>
          <Script
            strategy="lazyOnload"
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GTAG_ID}`}
          />
          <Script id="gtag-init" strategy="lazyOnload">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GTAG_ID}', {
              page_path: window.location.pathname,
              });
          `}
          </Script>
        </>
      )}
      {process.env.NEXT_PUBLIC_SHOW_LIVE_STREAM_VIDEO && (
        <Script
          src={process.env.NEXT_PUBLIC_NANO_PLAYER_URL}
          strategy="lazyOnload"
        />
      )}
    </>
  );
};
