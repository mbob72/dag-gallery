import { HeartIcon } from './icons';
import { Container } from './Container';

export type ArtworkProduct = {
  article: string;
  title: string;
  author: string;
  image: string;
  favoriteCount?: number;
  category?: string;
  series?: string;
  medium?: string;
  dimensions?: string;
  year?: number | null;
  priceRub?: number | null;
};

const src = (path: string) => path.startsWith('http') ? path : path;
const formatPrice = (value: number) => new Intl.NumberFormat('ru-RU').format(value);

export function ProductArtwork({ product }: { product: ArtworkProduct }) {
  const specs = [
    product.category && ['Категория', product.category],
    product.series && ['Серия', product.series],
    product.medium && ['Материал', product.medium],
    product.dimensions && ['Размер', product.dimensions],
    product.year && ['Год', product.year],
  ].filter(Boolean) as [string, string | number][];

  return (
    <section className="bg-white py-8 sm:py-12">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:items-start">
          <aside className="lg:sticky lg:top-6">
            <button
              type="button"
              className="flex w-full items-center justify-center gap-3 border border-black/15 bg-white px-5 py-4 text-sm font-medium text-ink transition hover:border-accent hover:text-accent lg:justify-start"
            >
              <HeartIcon className="size-5" />
              <span>Добавить в избранное</span>
              {typeof product.favoriteCount === 'number' && (
                <span className="ml-auto hidden text-black/35 lg:inline">{product.favoriteCount}</span>
              )}
            </button>
          </aside>

          <article>
            <div className="mb-7">
              <p className="mb-3 text-sm text-black/50">Артикул: {product.article}</p>
              <h1 className="max-w-4xl text-3xl font-light leading-tight text-ink sm:text-5xl">
                {product.title}
              </h1>
              <p className="mt-4 text-base text-black/60">
                Автор: <span className="text-ink">{product.author}</span>
              </p>
            </div>

            <div className="max-w-[760px] bg-[#f7f7f4] p-4 sm:p-8">
              <img
                src={src(product.image)}
                alt={product.title}
                className="mx-auto h-auto max-h-[680px] w-full object-contain"
              />
            </div>

            {(specs.length > 0 || product.priceRub) && (
              <div className="mt-8 grid max-w-[760px] gap-6 border-t border-black/10 pt-6 md:grid-cols-[1fr_220px]">
                {specs.length > 0 && (
                  <dl className="grid gap-3 text-sm sm:grid-cols-2">
                    {specs.map(([label, value]) => (
                      <div key={label}>
                        <dt className="text-black/45">{label}</dt>
                        <dd className="mt-1 text-ink">{value}</dd>
                      </div>
                    ))}
                  </dl>
                )}

                {product.priceRub && (
                  <div className="md:text-right">
                    <p className="text-sm text-black/45">Цена</p>
                    <p className="mt-1 text-2xl font-light text-ink">{formatPrice(product.priceRub)} ₽</p>
                  </div>
                )}
              </div>
            )}
          </article>
        </div>
      </Container>
    </section>
  );
}
