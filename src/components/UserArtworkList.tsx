import { Container } from './Container';
import { SmartImage } from './SmartImage';
import type { ArtworkStatus } from '../data/artworks';

type UserArtworkAction = {
  label: string;
  onClick: (id: string) => void;
  isVisible?: (item: UserArtworkItem) => boolean;
};

export type UserArtworkItem = {
  id: string;
  image: string;
  title: string;
  href: string;
  attributes: string[];
  priceRub: number | null;
  status: ArtworkStatus;
  canOrder: boolean;
};

const statusLabelByStatus: Record<ArtworkStatus, string | null> = {
  available: null,
  sold: 'Продано',
  reserved: 'Бронь',
};

const formatPrice = (value: number) => new Intl.NumberFormat('ru-RU').format(value);

function Price({ priceRub, status }: { priceRub: number | null; status: ArtworkStatus }) {
  const statusLabel = statusLabelByStatus[status];

  if (statusLabel || priceRub === null) {
    return <span className="text-sm font-medium text-ink">{statusLabel ?? 'по запросу'}</span>;
  }

  return <span className="text-xl font-medium text-ink">{formatPrice(priceRub)} ₽</span>;
}

export function UserArtworkList({
  title,
  items,
  emptyMessage = 'Список пока пуст.',
  actionLabel,
  onAction,
  actionDisabled,
  itemActions = [],
}: {
  title: string;
  items: UserArtworkItem[];
  emptyMessage?: string;
  actionLabel?: string;
  onAction?: () => void;
  actionDisabled?: boolean;
  itemActions?: UserArtworkAction[];
}) {
  return (
    <section className="bg-white py-8 sm:py-10">
      <Container>
        <div className="mb-5 flex flex-wrap items-end justify-between gap-4 border-b border-black/10 pb-4">
          <h1 className="text-2xl font-light leading-tight text-ink sm:text-3xl">{title}</h1>
          <div className="flex items-center gap-4">
            {actionLabel && (
              <button
                type="button"
                className="bg-accent px-4 py-2 text-sm font-bold text-white transition hover:bg-ink disabled:cursor-not-allowed disabled:bg-black/25"
                disabled={actionDisabled ?? items.length === 0}
                onClick={onAction}
              >
                {actionLabel}
              </button>
            )}
            <span className="text-sm text-black/45">{items.length}</span>
          </div>
        </div>

        {items.length === 0 && (
          <div className="border border-black/10 bg-white p-8 text-sm text-black/60">
            {emptyMessage}
          </div>
        )}

        <div className="space-y-4">
          {items.map((item) => (
            <article key={item.id} className="grid gap-5 border border-black/10 bg-white p-4 sm:grid-cols-[190px_minmax(0,1fr)_170px]">
              <a href={item.href}>
                <div className="relative aspect-[4/3] bg-[#f7f7f4]">
                  <SmartImage
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="190px"
                    className="object-contain p-4"
                  />
                </div>
              </a>

              <div className="min-w-0">
                <a href={item.href} className="text-xl font-medium leading-tight text-ink transition hover:text-accent">
                  {item.title}
                </a>

                <ul className="mt-4 space-y-1 text-sm leading-6 text-black/55">
                  {item.attributes.map((attribute) => (
                    <li key={attribute}>{attribute}</li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-3 sm:items-end sm:text-right">
                <Price priceRub={item.priceRub} status={item.status} />
                <div className="mt-auto space-y-1 text-sm">
                  {itemActions.filter((action) => action.isVisible?.(item) ?? true).map((action) => (
                    <button
                      key={action.label}
                      type="button"
                      className="block text-left text-black/45 transition hover:text-accent sm:text-right"
                      onClick={() => action.onClick(item.id)}
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
