import type { Metadata } from 'next';
import { Header } from '../src/components/Header';
import { SITE_URL } from '../src/data/content';
import { getHomeSeo, toMetadata } from '../src/data/seo';
import '../src/styles.css';

export const metadata: Metadata = {
  ...toMetadata(getHomeSeo()),
  metadataBase: new URL(SITE_URL),
  title: {
    default: getHomeSeo().title,
    template: `%s | Caspian Art Bureau`,
  },
  applicationName: 'Caspian Art Bureau',
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
