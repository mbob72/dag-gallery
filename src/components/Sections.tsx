import { benefits, features, footerColumns, heroSlides, popularCategories, type ImageLink } from '../data/content';
import { categoryGalleryItems } from '../data/artworks';
import { SITE_TITLE } from '../data/brand';
import { ArrowRightIcon } from './icons';
import { Container } from './Container';

const url = (path: string) => path;

export function SectionHeading({ eyebrow, title, centered = false }: { eyebrow?: string; title: string; centered?: boolean }) {
  return (
    <div className={`mb-8 sm:mb-10 ${centered ? 'text-center' : ''}`}>
      {eyebrow && <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-accent">{eyebrow}</p>}
      <h2 className="text-3xl font-light leading-tight text-ink sm:text-4xl lg:text-5xl">{title}</h2>
    </div>
  );
}

export function HomeIntro() {
  const [intro] = heroSlides;

  return (
    <section className="bg-white py-12 sm:py-16">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-light leading-tight text-ink sm:text-5xl">{intro.title}</h2>
          <p className="mt-4 text-lg leading-8 text-black/60 sm:text-2xl">{intro.subtitle}</p>
        </div>
      </Container>
    </section>
  );
}

export function BenefitsGrid() {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <SectionHeading title="Интернет-магазин постеров и картин" centered />
        <p className="mx-auto -mt-5 mb-10 max-w-2xl text-center text-sm text-black/55 sm:text-base">Большая коллекция решений для современного и классического интерьера</p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
          {benefits.map((benefit) => (
            <article key={benefit.title} className="text-center">
              <div className="mx-auto mb-4 aspect-square max-w-[150px] overflow-hidden rounded-full bg-paper">
                <img src={url(benefit.image)} alt="" loading="lazy" className="h-full w-full object-cover transition duration-500 hover:scale-105" />
              </div>
              <h3 className="mx-auto max-w-[160px] text-sm font-medium leading-snug sm:text-base">{benefit.title}</h3>
            </article>
          ))}
        </div>
        <div className="mt-10 text-center">
          <a href={url('/catalog/postery-6')} className="inline-flex items-center gap-3 bg-accent px-7 py-3.5 text-sm font-bold text-white shadow-[0_10px_25px_rgba(230,106,44,.25)] transition hover:-translate-y-0.5">
            Смотреть весь каталог <ArrowRightIcon className="size-5" />
          </a>
        </div>
      </Container>
    </section>
  );
}

export function PopularCategories() {
  return (
    <section className="bg-paper py-14 sm:py-20">
      <Container>
        <SectionHeading eyebrow="Навигация" title="Популярные категории" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {popularCategories.map((item) => (
            <a key={item.title} href={url(item.href)} className="group bg-white p-2 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
              <div className="aspect-square overflow-hidden bg-zinc-100">
                <img src={url(item.image)} alt={item.title} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <div className="min-h-14 px-1 py-3 text-center text-xs font-medium leading-snug sm:text-sm">{item.title}</div>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function FeatureSections() {
  return (
    <section className="py-14 sm:py-24">
      <Container className="space-y-14 sm:space-y-24">
        {features.map((feature, index) => (
          <article key={feature.title} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
            <div className={index % 2 ? 'lg:order-2' : ''}>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-accent">0{index + 1}</p>
              <h2 className="text-3xl font-light leading-tight sm:text-4xl">{feature.title}</h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-black/60">{feature.body}</p>
              <a href={url('/page/about')} className="mt-6 inline-flex items-center gap-2 text-sm font-bold underline decoration-black/20 underline-offset-8 hover:text-accent">
                Подробнее <ArrowRightIcon className="size-4" />
              </a>
            </div>
            <div className={`overflow-hidden bg-zinc-100 ${index % 2 ? 'lg:order-1' : ''}`}>
              <img src={url(feature.image)} alt={feature.title} loading="lazy" className="aspect-[4/3] h-full w-full object-cover" />
            </div>
          </article>
        ))}
      </Container>
    </section>
  );
}

function MosaicCard({ item, featured = false }: { item: ImageLink; featured?: boolean }) {
  return (
    <a href={item.href} className={`group relative isolate min-h-[240px] overflow-hidden bg-zinc-200 ${featured ? 'sm:row-span-2 sm:min-h-[500px]' : ''}`}>
      <img src={item.image} alt={item.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-white sm:p-6">
        <h3 className="text-xl font-medium sm:text-2xl">{item.title}</h3>
        <span className="grid size-10 shrink-0 place-items-center rounded-full border border-white/60 transition group-hover:bg-white group-hover:text-ink"><ArrowRightIcon className="size-5" /></span>
      </div>
    </a>
  );
}

export function ArtMosaic({ title, items }: { title: string; items: ImageLink[] }) {
  return (
    <section id="artist-savelyeva" className="scroll-mt-8 py-14 sm:scroll-mt-10 sm:py-20">
      <Container>
        <SectionHeading title={title} />
        <div className="grid auto-rows-fr gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => (
            <MosaicCard key={item.title} item={item} featured={index === 0} />
          ))}
        </div>
      </Container>
    </section>
  );
}

export function ArtistMenu() {
  return (
    <nav className="border-b border-black/10 bg-white" aria-label="Художники">
      <Container>
        <div className="flex gap-2 overflow-x-auto py-3">
          <a href="#artist-savelyeva" className="shrink-0 border border-black/15 px-4 py-2 text-sm font-medium transition hover:border-accent hover:text-accent">
            Савельева
          </a>
          <a href="#artist-mallakaev" className="shrink-0 border border-black/15 px-4 py-2 text-sm font-medium transition hover:border-accent hover:text-accent">
            Маллакаев
          </a>
        </div>
      </Container>
    </nav>
  );
}

export function MagomedMallakaevSection() {
  return (
    <section id="artist-mallakaev" className="scroll-mt-8 bg-white py-14 sm:scroll-mt-10 sm:py-20">
      <Container>
        <SectionHeading title="Художник Магомед Маллакаев (Маг Хазар)" />
        <div className="max-w-sm overflow-hidden bg-zinc-100">
          <img
            src="/artists/magomed-mallakaev.jpeg"
            alt="Магомед Маллакаев (Маг Хазар)"
            loading="lazy"
            className="aspect-[342/426] w-full object-cover"
          />
        </div>
      </Container>
    </section>
  );
}

export function CatalogMosaics() {
  return (
    <div className="bg-paper"><ArtMosaic title="Художник Наталья Савельева" items={categoryGalleryItems} /><MagomedMallakaevSection /></div>
  );
}

export function CustomArtBanner() {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <div className="relative isolate min-h-[390px] overflow-hidden bg-ink">
          <img src={url('/userdata/page_block/preview/33/ec/33ec53be22ce4f6bd224e03ab6f4e282_webp.webp')} alt="Картина по фотографии" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-75" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
          <div className="relative flex min-h-[390px] max-w-2xl flex-col justify-center p-7 text-white sm:p-12 lg:p-16">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-orange-300">Персональный заказ</p>
            <h2 className="text-4xl font-light leading-tight sm:text-5xl">Создайте картину из вашей фотографии</h2>
            <p className="mt-5 max-w-xl text-white/75">Печать на холсте, художественная обработка и оформление в раму в едином конструкторе.</p>
            <a href={url('/photoart')} className="mt-7 inline-flex w-fit items-center gap-3 bg-white px-6 py-3 text-sm font-bold text-ink transition hover:bg-accent hover:text-white">
              Создать картину <ArrowRightIcon className="size-5" />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="mt-8 bg-[#202020] py-14 text-white">
      <Container>
        <div className="grid gap-10 border-b border-white/15 pb-12 md:grid-cols-[1.25fr_2fr]">
          <div>
            <a href="tel:+78000000000" className="block text-2xl font-light">8 800 000 00 00</a>
            <a href="mailto:info@example.com" className="mt-2 block text-sm text-white/60 hover:text-white">info@example.com</a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.16em]">{column.title}</h3>
                <ul className="space-y-3 text-sm text-white/55">
                  {column.links.map((link) => <li key={link}><a href="#" className="transition hover:text-white">{link}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3 pt-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} {SITE_TITLE}</span>
          <span>Все права защищены</span>
        </div>
      </Container>
    </footer>
  );
}
