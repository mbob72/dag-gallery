import { Container } from './Container';
import { SmartImage } from './SmartImage';

export type UserArtworkItem = {
  id: string;
  image: string;
  title: string;
  article: string;
  author: string;
  href: string;
};

export function UserArtworkList({ title, items }: { title: string; items: UserArtworkItem[] }) {
  return (
    <section className="bg-white py-8 sm:py-10">
      <Container>
        <div className="mb-5 flex items-end justify-between border-b border-black/10 pb-4">
          <h1 className="text-2xl font-light leading-tight text-ink sm:text-3xl">{title}</h1>
          <span className="text-sm text-black/45">{items.length}</span>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <a key={item.id} href={item.href} className="group block border border-black/10 bg-white transition hover:-translate-y-0.5 hover:shadow-soft">
              <div className="relative aspect-[4/3] bg-[#f7f7f4]">
                <SmartImage
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-contain p-4 transition duration-500 group-hover:scale-[1.02]"
                />
              </div>
              <div className="space-y-2 border-t border-black/10 p-4">
                <h2 className="text-base font-medium leading-snug text-ink">{item.title}</h2>
                <dl className="space-y-1 text-sm text-black/55">
                  <div className="flex justify-between gap-4">
                    <dt>Артикул</dt>
                    <dd className="text-ink">{item.article}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt>Автор</dt>
                    <dd className="text-right text-ink">{item.author}</dd>
                  </div>
                </dl>
              </div>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
