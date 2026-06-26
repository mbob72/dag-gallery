import { Container } from './Container';
import { SmartImage } from './SmartImage';

type UserArtworkAction = {
  label: string;
  onClick: (id: string) => void;
};

export type UserArtworkItem = {
  id: string;
  image: string;
  title: string;
  href: string;
  attributes: string[];
  price: string;
};

function Price({ value }: { value: string }) {
  if (value.toLowerCase() === 'по запросу') {
    return <span className="text-sm font-medium text-ink">{value}</span>;
  }

  return <span className="text-xl font-medium text-ink">{value} ₽</span>;
}

export function UserArtworkList({
  title,
  items,
  emptyMessage = 'Список пока пуст.',
  actionLabel,
  onAction,
  itemActions = [],
}: {
  title: string;
  items: UserArtworkItem[];
  emptyMessage?: string;
  actionLabel?: string;
  onAction?: () => void;
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
                disabled={items.length === 0}
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
                <Price value={item.price} />
                <div className="mt-auto space-y-1 text-sm">
                  {itemActions.map((action) => (
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
