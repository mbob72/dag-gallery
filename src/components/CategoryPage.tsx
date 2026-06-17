import type { ArtworkCategory, ArtworkItem } from '../data/artworks';
import { Container } from './Container';
import { ProductBreadcrumbs } from './ProductBreadcrumbs';
import { CategoryArtworkCard } from './CategoryArtworkCard';

export function CategoryPage({ category, artworks }: { category: ArtworkCategory; artworks: ArtworkItem[] }) {
  return (
    <>
      <ProductBreadcrumbs
        items={[
          { label: 'Главная', href: '/' },
          { label: 'Категории', href: '/' },
          { label: category.title, href: `/category/${category.id}` },
        ]}
      />

      <section className="bg-paper py-8 sm:py-12">
        <Container>
          <div className="mb-7 flex flex-col gap-2 sm:mb-9 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-accent">Категория</p>
              <h1 className="text-3xl font-light leading-tight text-ink sm:text-5xl">{category.title}</h1>
            </div>
            <p className="text-sm text-black/50">{artworks.length} работ</p>
          </div>

          {artworks.length > 0 ? (
            <div id="catalog_posters" className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
              {artworks.map((artwork, index) => (
                <CategoryArtworkCard key={artwork.id} artwork={artwork} priority={index < 4} />
              ))}
            </div>
          ) : (
            <div className="bg-white p-8 text-sm text-black/60">В этой категории пока нет работ.</div>
          )}
        </Container>
      </section>
    </>
  );
}
