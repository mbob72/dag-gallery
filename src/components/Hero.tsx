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
        <div className="relative isolate min-h-[520px] overflow-hidden bg-ink sm:min-h-[600px]">
          {activeItem.featuredArtworks.map((artwork, index) => (
            <a
              key={artwork.id}
              href={`/poster/${artwork.id}`}
              className={`absolute overflow-hidden bg-white/95 shadow-soft transition duration-500 hover:-translate-y-1 ${
                index === 0
                  ? '-right-[24%] top-[10%] h-[54%] w-[82%] sm:-right-[3%] sm:top-[8%] sm:h-[64%] sm:w-[48%] lg:right-[7%] lg:w-[38%]'
                  : index === 1
                    ? 'bottom-[10%] right-[4%] h-[28%] w-[48%] sm:bottom-[8%] sm:right-[34%] sm:h-[34%] sm:w-[26%] lg:right-[38%] lg:w-[20%]'
                    : 'bottom-[8%] right-[18%] h-[22%] w-[42%] sm:bottom-[12%] sm:right-[7%] sm:h-[30%] sm:w-[28%] lg:w-[22%]'
              }`}
            >
              <img src={artwork.image} alt={artwork.title} className="h-full w-full object-contain p-3 sm:p-4" />
            </a>
          ))}

          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

          <div className="relative z-10 flex min-h-[520px] max-w-2xl flex-col justify-center px-6 py-12 text-white sm:min-h-[600px] sm:px-10 lg:px-14">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-orange-300">Наталья Савельева</p>
            <h1 className="min-h-[84px] max-w-xl text-4xl font-light leading-[1.05] sm:min-h-[126px] sm:text-6xl">
              {activeItem.title}
            </h1>
            <p className="mt-5 min-h-[84px] max-w-lg text-base leading-7 text-white/75 sm:text-xl">
              {activeItem.description}
            </p>
            <a
              href={activeItem.href}
              className="mt-8 inline-flex w-fit items-center gap-3 bg-accent px-6 py-3 text-sm font-bold text-white transition hover:bg-white hover:text-ink"
            >
              {activeItem.title} <ArrowRightIcon className="size-5" />
            </a>
          </div>

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
      </Container>
    </section>
  );
}
