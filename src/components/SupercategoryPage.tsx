import type { ArtworkItem, ArtworkSupercategory } from '../data/artworks';
import { categories } from '../data/artworks';
import { CategoryArtworkCard } from './CategoryArtworkCard';
import { Container } from './Container';
import { ProductBreadcrumbs } from './ProductBreadcrumbs';
import { Footer } from './Sections';

export function SupercategoryPage({ supercategory, artworks }: { supercategory: ArtworkSupercategory; artworks: ArtworkItem[] }) {
  const childCategories = supercategory.category
    .map((categoryId) => categories.find((category) => category.id === categoryId))
    .filter((category): category is NonNullable<typeof category> => Boolean(category));

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <ProductBreadcrumbs
        items={[
          { label: 'Главная', href: '/' },
          { label: 'Разделы', href: '/' },
          { label: supercategory.title, href: `/supercategory/${supercategory.id}` },
        ]}
      />

      <div className="min-h-0 flex-1 overflow-y-auto">
        <section className="bg-paper py-8 sm:py-12">
          <Container>
            <div className="mb-7 grid gap-5 sm:mb-9 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <h1 className="text-3xl font-light leading-tight text-ink sm:text-5xl">{supercategory.title}</h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-black/60">{supercategory.description}</p>
              </div>
              <p className="text-sm text-black/50">{artworks.length} работ</p>
            </div>

            <div className="mb-7 flex flex-wrap gap-2">
              {childCategories.map((category) => (
                <a
                  key={category.id}
                  href={`/category/${category.id}`}
                  className="border border-black/15 bg-white px-4 py-2 text-sm font-medium text-ink transition hover:border-accent hover:text-accent"
                >
                  {category.title}
                </a>
              ))}
            </div>

            {artworks.length > 0 ? (
              <div id="catalog_posters" className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
                {artworks.map((artwork) => (
                  <CategoryArtworkCard key={artwork.id} artwork={artwork} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-8 text-sm text-black/60">В этом разделе пока нет работ.</div>
            )}
          </Container>
        </section>
        <Footer />
      </div>
    </div>
  );
}
