import { Header } from './Header';
import { Hero } from './Hero';
import { CatalogMosaics, Footer, HomeIntro } from './Sections';

export function HomePage() {
  return (
    <div className="min-h-screen bg-white text-ink">
      <Header />
      <main>
        <Hero />
        <HomeIntro />
        <CatalogMosaics />
      </main>
      <Footer />
    </div>
  );
}
