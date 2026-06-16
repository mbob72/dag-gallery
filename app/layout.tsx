import type { Metadata } from 'next';
import { Header } from '../src/components/Header';
import { Footer } from '../src/components/Sections';
import '../src/styles.css';

export const metadata: Metadata = {
  title: 'Caspian Art Bureau',
  description: 'Современное и коллекционное искусство Дагестана',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>
        <div className="min-h-screen bg-white text-ink">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
