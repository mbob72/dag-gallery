'use client';

import { useEffect, useState } from 'react';
import { supercategoryHeroItems } from '../data/artworks';
import { ArrowRightIcon } from './icons';
import { Container } from './Container';

export function Hero() {
  const [active, setActive] = useState(0);
  const activeItem = supercategoryHeroItems[active] ?? supercategoryHeroItems[0];

  useEffect(() => {
    const timer = window.setInterval(
      () => setActive((value) => (value + 1) % supercategoryHeroItems.length),
      6500,
    );
    return () => window.clearInterval(timer);
  }, []);

  if (!activeItem) {
    return null;
  }

  return (
    <section className="pt-4 sm:pt-6">
      <Container>
        <div className="grid min-h-[560px] overflow-hidden bg-[#efe7da] lg:grid-cols-2">
          <div className="flex min-h-[360px] flex-col justify-center bg-[#efe7da] px-6 py-9 sm:px-10 lg:min-h-[560px] lg:px-14">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-accent">Наталья Савельева</p>
            <h1 className="min-h-[84px] max-w-xl text-4xl font-light leading-[1.05] text-ink sm:min-h-[126px] sm:text-6xl">
              {activeItem.title}
            </h1>
            <p className="mt-5 min-h-[84px] max-w-lg text-base leading-7 text-black/60 sm:text-xl">
              {activeItem.description}
            </p>
            <a
              href={activeItem.href}
              className="mt-8 inline-flex w-fit items-center gap-3 bg-accent px-6 py-3 text-sm font-bold text-white transition hover:bg-ink"
            >
              {activeItem.title} <ArrowRightIcon className="size-5" />
            </a>
          </div>

          <div className="relative min-h-[420px] overflow-hidden bg-ink lg:min-h-[560px]">
            {activeItem.featuredArtworks.map((artwork, index) => (
              <a
                key={artwork.id}
                href={`/poster/${artwork.id}`}
                className={`absolute overflow-hidden bg-white shadow-soft transition duration-500 hover:-translate-y-1 ${
                  index === 0
                    ? 'left-[7%] top-[8%] h-[58%] w-[52%]'
                    : index === 1
                      ? 'right-[7%] top-[18%] h-[40%] w-[34%]'
                      : 'bottom-[8%] right-[14%] h-[32%] w-[44%]'
                }`}
              >
                <img src={artwork.image} alt={artwork.title} className="h-full w-full object-contain p-4" />
              </a>
            ))}
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/30 to-transparent" />

            <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2">
              {supercategoryHeroItems.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActive(index)}
                  aria-label={`Слайд ${index + 1}: ${item.title}`}
                  className={`h-1.5 transition-all ${active === index ? 'w-10 bg-white' : 'w-5 bg-white/45'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
