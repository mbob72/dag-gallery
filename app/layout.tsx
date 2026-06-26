import type { Metadata } from 'next';
import Script from 'next/script';
import { Header } from '../src/components/Header';
import { SITE_TITLE } from '../src/data/brand';
import { getHomeSeo, toMetadata } from '../src/data/seo';
import '../src/styles.css';

const homeSeo = getHomeSeo();

export const metadata: Metadata = {
  ...toMetadata(homeSeo),
  title: {
    default: homeSeo.title,
    template: `%s | ${SITE_TITLE}`,
  },
  applicationName: SITE_TITLE,
  category: 'art',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-C6YEGNN10T" strategy="beforeInteractive" />
        <Script id="google-analytics" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-C6YEGNN10T');
          `}
        </Script>
        <Script id="yandex-metrika" strategy="beforeInteractive">
          {`
            (function(m,e,t,r,i,k,a){
                m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
            })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=110180836', 'ym');

            ym(110180836, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});
          `}
        </Script>
        <noscript>
          <div>
            <img src="https://mc.yandex.ru/watch/110180836" style={{ position: 'absolute', left: '-9999px' }} alt="" />
          </div>
        </noscript>
        <div className="flex h-dvh flex-col overflow-hidden bg-white text-ink">
          <Header />
          <main className="flex min-h-0 flex-1 flex-col overflow-hidden">{children}</main>
        </div>
      </body>
    </html>
  );
}
