import Image from 'next/image';
import { SmartImage } from './SmartImage';

export type OrderCartItem = {
  id: string;
  title: string;
  image: string;
  href?: string;
  badge?: string;
  attributes: string[];
  price: string;
};

function Price({ value }: { value: string }) {
  if (value.toLowerCase() === 'бесплатно') {
    return (
      <span className="text-sm font-bold uppercase text-accent">{value}</span>
    );
  }

  if (value.toLowerCase() === 'по запросу') {
    return <span className="text-sm font-medium text-ink">{value}</span>;
  }

  return <span className="text-xl font-medium text-ink">{value} ₽</span>;
}

export function OrderCartItems({
  items,
  onRemove,
  onMoveToFavorites,
}: {
  items: OrderCartItem[];
  onRemove?: (id: string) => void;
  onMoveToFavorites?: (id: string) => void;
}) {
  if (items.length === 0) {
    return (
      <div className="border border-black/10 bg-white p-8 text-sm text-black/60">
        В корзине пока нет работ.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => {
        const image = (
          <div className="relative aspect-[4/3] bg-[#f7f7f4]">
            <SmartImage src={item.image} alt={item.title} fill sizes="190px" className="object-contain p-4" />
            {item.badge && <Image src={item.badge} alt="" width={44} height={44} className="absolute right-3 top-3 size-11 object-contain" />}
          </div>
        );

        return (
          <article key={item.id} className="grid gap-5 border border-black/10 bg-white p-4 sm:grid-cols-[190px_minmax(0,1fr)_150px]">
            {item.href ? <a href={item.href}>{image}</a> : image}

            <div className="min-w-0">
              {item.href ? (
                <a href={item.href} className="text-xl font-medium leading-tight text-ink transition hover:text-accent">
                  {item.title}
                </a>
              ) : (
                <h2 className="text-xl font-medium leading-tight text-ink">{item.title}</h2>
              )}

              <ul className="mt-4 space-y-1 text-sm leading-6 text-black/55">
                {item.attributes.map((attribute) => (
                  <li key={attribute}>{attribute}</li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3 sm:items-end sm:text-right">
              <Price value={item.price} />
              <div className="mt-auto space-y-1 text-sm">
                <button
                  type="button"
                  className="block text-left text-black/45 transition hover:text-accent sm:text-right"
                  onClick={() => onMoveToFavorites?.(item.id)}
                >
                  отложить в избранное
                </button>
                <button
                  type="button"
                  className="block text-left text-black/45 transition hover:text-accent sm:text-right"
                  onClick={() => onRemove?.(item.id)}
                >
                  Удалить
                </button>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
