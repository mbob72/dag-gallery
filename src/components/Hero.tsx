import { useEffect, useState } from 'react';
import { heroSlides, SITE_URL } from '../data/content';
import { ArrowRightIcon } from './icons';
import { Container } from './Container';

export function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setActive((value) => (value + 1) % heroSlides.length), 6500);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="pt-4 sm:pt-6">
      <Container>
        <div className="relative isolate min-h-[410px] overflow-hidden bg-zinc-200 sm:min-h-[500px] lg:min-h-[560px]">
          {heroSlides.map((slide, index) => (
            <div key={slide.image} className={`absolute inset-0 transition-opacity duration-700 ${active === index ? 'opacity-100' : 'pointer-events-none opacity-0'}`}>
              <img src={`${SITE_URL}${slide.image}`} alt="" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/25 to-transparent" />
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-2xl px-7 text-white sm:px-12 lg:px-16">
                  <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] sm:text-sm">{slide.eyebrow}</p>
                  <h1 className="max-w-xl text-4xl font-light leading-[1.05] sm:text-6xl lg:text-7xl">{slide.title}</h1>
                  <a href={`${SITE_URL}${slide.href}`} className="mt-8 inline-flex items-center gap-3 border border-white bg-white px-6 py-3 text-sm font-bold text-ink transition hover:bg-transparent hover:text-white">
                    {slide.button}<ArrowRightIcon className="size-5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
          <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2">
            {heroSlides.map((slide, index) => (
              <button key={slide.image} onClick={() => setActive(index)} aria-label={`Слайд ${index + 1}`} className={`h-1.5 transition-all ${active === index ? 'w-10 bg-white' : 'w-5 bg-white/45'}`} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
