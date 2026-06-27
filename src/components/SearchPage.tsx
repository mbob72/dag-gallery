import { normalizeSearchQuery, searchArtworks } from '../data/search';
import { CategoryArtworkCard } from './CategoryArtworkCard';
import { Container } from './Container';
import { ProductBreadcrumbs } from './ProductBreadcrumbs';
import { Footer } from './Sections';

export function SearchPage({ query }: { query?: string | string[] }) {
  const searchQuery = normalizeSearchQuery(query);
  const results = searchArtworks(searchQuery);
  const hasQuery = searchQuery.length > 0;

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <ProductBreadcrumbs
        items={[
          { label: 'Главная', href: '/' },
          { label: 'Поиск', href: `/search${hasQuery ? `?q=${encodeURIComponent(searchQuery)}` : ''}` },
        ]}
      />

      <div className="min-h-0 flex-1 overflow-y-auto">
        <section className="bg-paper py-8 sm:py-12">
          <Container>
            <div className="mb-7 border-b border-black/10 pb-6 sm:mb-9">
              <h1 className="text-3xl font-light leading-tight text-ink sm:text-5xl">Поиск</h1>
              <p className="mt-3 text-sm leading-6 text-black/55">
                {hasQuery ? `Результаты по запросу «${searchQuery}»` : 'Введите запрос в поле поиска в шапке.'}
              </p>
            </div>

            {hasQuery && (
              <p className="mb-5 text-sm text-black/50">
                Найдено: <span className="font-medium text-ink">{results.length}</span>
              </p>
            )}

            {hasQuery && results.length > 0 && (
              <div id="catalog_posters" className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
                {results.map((artwork) => (
                  <CategoryArtworkCard key={artwork.id} artwork={artwork} />
                ))}
              </div>
            )}

            {hasQuery && results.length === 0 && (
              <div className="border border-black/10 bg-white p-8 text-sm leading-6 text-black/60">
                Ничего не найдено. Попробуйте искать по названию работы, артикулу, жанру или материалу.
              </div>
            )}
          </Container>
        </section>
        <Footer />
      </div>
    </div>
  );
}
