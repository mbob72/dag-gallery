import type { ArtworkItem } from '../data/artworks';
import { HeartIcon } from './icons';

const formatPrice = (value: number) => new Intl.NumberFormat('ru-RU').format(value);

function dimensionsText(artwork: ArtworkItem) {
  if (artwork.dimensions) {
    return artwork.dimensions;
  }

  return `${artwork.width_px}x${artwork.height_px} px`;
}

export function CategoryArtworkCard({ artwork, priority = false }: { artwork: ArtworkItem; priority?: boolean }) {
  const price = artwork.price_rub ? `от ${formatPrice(artwork.price_rub)} ₽` : 'по запросу';

  return (
    <article className="group bg-white">
      <div className="relative border border-black/10 bg-white transition group-hover:border-black/20 group-hover:shadow-soft">
        <a href={`/poster/${artwork.id}`} className="block bg-[#f7f7f4] p-4">
          <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden bg-white">
            {priority && (
              <div className="absolute left-3 top-3 z-10 bg-accent px-2.5 py-1 text-xs font-bold text-white">
                Хит
              </div>
            )}
            <img
              src={artwork.image}
              alt={artwork.title}
              loading={priority ? 'eager' : 'lazy'}
              className="max-h-full max-w-full object-contain transition duration-500 group-hover:scale-[1.03]"
            />
          </div>
        </a>

        <button
          type="button"
          aria-label="Добавить в избранное"
          className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-white/90 text-ink shadow-sm transition hover:bg-accent hover:text-white"
        >
          <HeartIcon className="size-5" />
        </button>

        <div className="px-4 pb-4 pt-3">
          <h2 className="min-h-12 text-base font-medium leading-snug text-ink">
            <a href={`/poster/${artwork.id}`} className="transition hover:text-accent">
              {artwork.title}
            </a>
          </h2>

          <dl className="mt-3 space-y-1.5 text-sm text-black/55">
            <div>
              <dt className="inline">Артикул: </dt>
              <dd className="inline font-medium text-ink">{artwork.source_id}</dd>
            </div>
            <div>
              <dt className="inline">Размер: </dt>
              <dd className="inline font-medium text-ink">{dimensionsText(artwork)}</dd>
            </div>
            <div>
              <dt className="inline">Цена: </dt>
              <dd className="inline font-medium text-ink">{price}</dd>
            </div>
          </dl>

          <a
            href={`/poster/${artwork.id}`}
            className="mt-4 inline-flex w-full items-center justify-center bg-accent px-4 py-3 text-sm font-bold text-white transition hover:bg-ink"
          >
            Подробнее
          </a>
        </div>
      </div>
    </article>
  );
}
