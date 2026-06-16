import { SITE_URL } from '../data/content';
import { HeartIcon } from './icons';
import { Container } from './Container';

export type ArtworkProduct = {
  article: string;
  title: string;
  author: string;
  image: string;
  favoriteCount: number;
};

const src = (path: string) => path.startsWith('http') ? path : `${SITE_URL}${path}`;

export function ProductArtwork({ product }: { product: ArtworkProduct }) {
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
              <span className="ml-auto hidden text-black/35 lg:inline">{product.favoriteCount}</span>
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
          </article>
        </div>
      </Container>
    </section>
  );
}
