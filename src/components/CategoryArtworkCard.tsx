import type { ArtworkItem } from '../data/artworks';
import { HeartIcon } from './icons';
import { AddToCartButton } from './AddToCartButton';
import { SmartImage } from './SmartImage';

const formatPrice = (value: number) => new Intl.NumberFormat('ru-RU').format(value);

function dimensionsText(artwork: ArtworkItem) {
  if (artwork.dimensions) {
    return artwork.dimensions;
  }

  return `${artwork.width_px}x${artwork.height_px} px`;
}

export function CategoryArtworkCard({ artwork }: { artwork: ArtworkItem }) {
  const price = artwork.price_rub ? `от ${formatPrice(artwork.price_rub)} ₽` : 'по запросу';

  return (
    <article className="group bg-white">
      <div className="relative border border-black/10 bg-white transition group-hover:border-black/20 group-hover:shadow-soft">
        <div className="bg-[#f7f7f4] p-4">
          <a href={`/poster/${artwork.id}`} className="block">
            <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden bg-white">
              <SmartImage
                src={artwork.image}
                alt={artwork.title}
                blurDataURL={artwork.blur_data_url}
                fill
                sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 50vw"
                className="object-contain p-3 transition duration-500 group-hover:scale-[1.03]"
              />
            </div>
          </a>
        </div>

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

          <div className="mt-4 flex items-center gap-3">
            <a
              href={`/poster/${artwork.id}`}
              className="inline-flex min-w-0 flex-1 items-center justify-center bg-accent px-4 py-3 text-sm font-bold text-white transition hover:bg-ink"
            >
              Подробнее
            </a>
            <AddToCartButton
              artworkId={artwork.id}
              analyticsItem={{
                id: artwork.id,
                title: artwork.title,
                category: artwork.category_label,
                priceRub: artwork.price_rub,
              }}
              className="grid size-11 shrink-0 place-items-center border border-black/15 bg-white text-ink transition hover:border-accent hover:bg-accent hover:text-white"
            />
          </div>
        </div>
      </div>
    </article>
  );
}
