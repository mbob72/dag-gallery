import { Container } from './Container';

export type BreadcrumbItem = {
  label: string;
  href: string;
};

const href = (path: string) => path;

export function ProductBreadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <section className="shrink-0 border-b border-black/10 bg-white py-5">
      <Container>
        <div className="flex flex-col gap-4 text-sm text-black/55 lg:flex-row lg:items-center">
          <a href="/" className="w-fit font-medium text-ink transition hover:text-accent">
            Назад
          </a>
          <nav aria-label="Хлебные крошки">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
              {items.map((item, index) => (
                <li key={item.label} className="flex items-center gap-2">
                  {index > 0 && <span className="text-black/25">/</span>}
                  <a href={href(item.href)} className="transition hover:text-accent">
                    {item.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </Container>
    </section>
  );
}
