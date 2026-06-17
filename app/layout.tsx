import type { Metadata } from 'next';
import { Header } from '../src/components/Header';
import '../src/styles.css';

export const metadata: Metadata = {
  title: 'Caspian Art Bureau',
  description: 'Современное и коллекционное искусство Дагестана',
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
