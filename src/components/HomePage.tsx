import { Hero } from './Hero';
import { ArtistMenu, CatalogMosaics, Footer } from './Sections';

export function HomePage() {
  return (
    <div className="min-h-0 flex-1 overflow-y-auto">
      <ArtistMenu />
      <Hero />
      {/* <HomeIntro /> */}
      <CatalogMosaics />
      <Footer />
    </div>
  );
}
