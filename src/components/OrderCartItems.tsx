export type OrderCartItem = {
  id: string;
  title: string;
  image: string;
  href?: string;
  badge?: string;
  attributes: string[];
  quantity?: number;
  price: string;
  totalText?: string;
  actions?: string[];
};

function Price({ value }: { value: string }) {
  return value.toLowerCase() === 'бесплатно' ? (
    <span className="text-sm font-bold uppercase text-accent">{value}</span>
  ) : (
    <span className="text-xl font-medium text-ink">{value} ₽</span>
  );
}

export function OrderCartItems({ items }: { items: OrderCartItem[] }) {
  return (
    <div className="space-y-4">
      {items.map((item) => {
        const image = (
          <div className="relative aspect-[4/3] bg-[#f7f7f4] p-4">
            <img src={item.image} alt={item.title} className="h-full w-full object-contain" />
            {item.badge && <img src={item.badge} alt="" className="absolute right-3 top-3 size-11 object-contain" />}
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
              {item.quantity && (
                <input
                  type="text"
                  defaultValue={item.quantity}
                  aria-label="Количество"
                  className="h-10 w-16 border border-black/15 text-center text-sm outline-none focus:border-accent"
                />
              )}
              <Price value={item.price} />
              {item.totalText && <em className="text-xs not-italic text-black/45">{item.totalText} ₽</em>}
              {item.actions && (
                <div className="mt-auto space-y-1 text-sm">
                  {item.actions.map((action) => (
                    <button key={action} type="button" className="block text-left text-black/45 transition hover:text-accent sm:text-right">
                      {action}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}
