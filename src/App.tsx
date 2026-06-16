import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CatalogMosaics, Footer } from './components/Sections';

export default function App() {
  return (
    <div className="min-h-screen bg-white text-ink">
      <Header />
      <main>
        <Hero />
        <CatalogMosaics />
      </main>
      <Footer />
    </div>
  );
}
