import type { PropsWithChildren } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { JSON_LD_BREADCRUMB, JSON_LD_DEFAULT } from '@/constant/metadata';
import { DefaultLayout } from '@/containers/layout';
import {
  GameProvider,
  ModalStoreProvider,
  QueryProvider,
  SocketProvider,
  UserStoreProvider,
} from '@/providers';

import { getDeviceInfo } from '@/utils/device';
import { getSEOMetadata } from '@/utils/seo';
import { getUser } from '@/utils/user';
import { clsx } from 'clsx';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import Script from 'next/script';
import '@/styles/global.css';
import '@/styles/app.scss';
import '@/styles/layout/layout.scss';
import '@/assets/icomoon/style.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export async function generateMetadata() {
  return await getSEOMetadata();
}

const RootLayout = async ({ children }: PropsWithChildren) => {
  const [locale, messages, user, deviceInfo, seo] = await Promise.all([
    getLocale(),
    getMessages(),
    getUser(),
    getDeviceInfo(),
    getSEOMetadata(),
  ]);

  return (
    <html lang={locale} className={clsx(inter.className, inter.variable)}>
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://analytics.google.com" />
        <link rel="dns-prefetch" href="https://analytics.google.com" />
        <link rel="preconnect" href="https://cdn.livechatinc.com" />
        <link rel="dns-prefetch" href="https://cdn.livechatinc.com" />
      </Head>
      {/* <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID!} />
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GTAG_ID!} /> */}
      <Script
        id="json-ld-default"
        strategy="afterInteractive"
        type="application/ld+json"
      >
        {JSON.stringify(JSON_LD_DEFAULT)}
      </Script>
      <Script
        id="json-ld-breadcrumb"
        strategy="afterInteractive"
        type="application/ld+json"
      >
        {JSON.stringify(JSON_LD_BREADCRUMB)}
      </Script>
      <body className="hide-scrollbar" suppressHydrationWarning>
        <h1 className="sr-only">{seo?.h1}</h1>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <QueryProvider>
            <ModalStoreProvider>
              <UserStoreProvider user={user}>
                <GameProvider
                  isMobile={deviceInfo.isMobile}
                  isSafari={deviceInfo.isSafari}
                >
                  <SocketProvider>
                    <DefaultLayout user={user}>{children}</DefaultLayout>
                  </SocketProvider>
                </GameProvider>
                <Toaster />
              </UserStoreProvider>
            </ModalStoreProvider>
          </QueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
