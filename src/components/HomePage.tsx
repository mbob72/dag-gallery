import { Hero } from './Hero';
import { CatalogMosaics, Footer, HomeIntro } from './Sections';

export function HomePage() {
  return (
    <div className="min-h-0 flex-1 overflow-y-auto">
      <Hero />
      <HomeIntro />
      <CatalogMosaics />
      <Footer />
    </div>
  );
}
