import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BenefitsGrid, CatalogMosaics, CustomArtBanner, FeatureSections, Footer, PopularCategories } from './components/Sections';

export default function App() {
  return (
    <div className="min-h-screen bg-white text-ink">
      <Header />
      <main>
        <Hero />
        <BenefitsGrid />
        <PopularCategories />
        <FeatureSections />
        <CatalogMosaics />
        <CustomArtBanner />
      </main>
      <Footer />
    </div>
  );
}
