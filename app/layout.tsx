import type { Metadata } from 'next';
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
        <div className="flex h-dvh flex-col overflow-hidden bg-white text-ink">
          <Header />
          <main className="flex min-h-0 flex-1 flex-col overflow-hidden">{children}</main>
        </div>
      </body>
    </html>
  );
}
