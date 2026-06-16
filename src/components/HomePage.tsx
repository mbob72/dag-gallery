import { Hero } from './Hero';
import { CatalogMosaics, HomeIntro } from './Sections';

export function HomePage() {
  return (
    <>
      <Hero />
      <HomeIntro />
      <CatalogMosaics />
    </>
  );
}
