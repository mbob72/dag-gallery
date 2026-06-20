'use client';

import { useEffect, useState } from 'react';
import { CloseIcon, HeartIcon, MaximizeIcon } from './icons';
import { Container } from './Container';
import { AddToCartButton } from './AddToCartButton';

export type ArtworkProduct = {
  id: string;
  article: string;
  title: string;
  author: string;
  image: string;
  favoriteCount?: number;
  category?: string;
  series?: string;
  medium?: string;
  dimensions?: string;
  year?: number | null;
  priceRub?: number | null;
};

const src = (path: string) => path.startsWith('http') ? path : path;
const formatPrice = (value: number) => new Intl.NumberFormat('ru-RU').format(value);
const lightboxScale = 1.5;

type ImageSize = {
  width: number;
  height: number;
};

export function ProductArtwork({ product }: { product: ArtworkProduct }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImageSize, setLightboxImageSize] = useState<ImageSize | null>(null);
  const [viewportSize, setViewportSize] = useState<ImageSize | null>(null);
  const imageSrc = src(product.image);
  const specs = [
    product.category && ['Категория', product.category],
    product.series && ['Серия', product.series],
    product.medium && ['Материал', product.medium],
    product.dimensions && ['Размер', product.dimensions],
    product.year && ['Год', product.year],
  ].filter(Boolean) as [string, string | number][];

  useEffect(() => {
    if (!lightboxOpen) {
      return;
    }

    const syncViewportSize = () => {
      setViewportSize({ width: window.innerWidth, height: window.innerHeight });
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLightboxOpen(false);
      }
    };

    syncViewportSize();
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', syncViewportSize);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', syncViewportSize);
    };
  }, [lightboxOpen]);

  const lightboxImageStyle = (() => {
    if (!lightboxImageSize || !viewportSize) {
      return undefined;
    }

    const edgePadding = viewportSize.width >= 640 ? 64 : 32;
    const availableWidth = Math.max(240, viewportSize.width - edgePadding);
    const availableHeight = Math.max(240, viewportSize.height - edgePadding);
    const scale = Math.min(
      lightboxScale,
      availableWidth / lightboxImageSize.width,
      availableHeight / lightboxImageSize.height,
    );

    return {
      width: `${Math.round(lightboxImageSize.width * scale)}px`,
      height: `${Math.round(lightboxImageSize.height * scale)}px`,
    };
  })();

  return (
    <section className="bg-white py-8 sm:py-12">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:items-start">
          <aside className="grid gap-3 lg:sticky lg:top-6">
            <button
              type="button"
              className="flex w-full items-center justify-center gap-3 border border-black/15 bg-white px-5 py-4 text-sm font-medium text-ink transition hover:border-accent hover:text-accent lg:justify-start"
            >
              <HeartIcon className="size-5" />
              <span>Добавить в избранное</span>
              {typeof product.favoriteCount === 'number' && (
                <span className="ml-auto hidden text-black/35 lg:inline">{product.favoriteCount}</span>
              )}
            </button>
            <AddToCartButton
              artworkId={product.id}
              className="flex w-full items-center justify-center gap-3 border border-black/15 bg-white px-5 py-4 text-sm font-medium text-ink transition hover:border-accent hover:text-accent lg:justify-start"
              showAddedText
            />
          </aside>

          <article>
            <div className="mb-7">
              <p className="mb-3 text-sm text-black/50">Артикул: {product.article}</p>
              <h1 className="max-w-4xl text-3xl font-light leading-tight text-ink sm:text-5xl">
                {product.title}
              </h1>
              <p className="mt-4 text-base text-black/60">
                Автор: <span className="text-ink">{product.author}</span>
              </p>
            </div>

            <button
              type="button"
              onClick={() => setLightboxOpen(true)}
              className="group relative block max-w-[760px] bg-[#f7f7f4] p-4 text-left outline-none transition hover:bg-[#f1f1ec] focus-visible:ring-2 focus-visible:ring-accent sm:p-8"
              aria-label="Развернуть изображение во весь экран"
            >
              <img
                src={imageSrc}
                alt={product.title}
                className="mx-auto h-auto max-h-[680px] w-full object-contain"
              />
              <span className="absolute right-4 top-4 flex size-10 items-center justify-center bg-white/90 text-ink shadow-sm transition group-hover:bg-ink group-hover:text-white sm:right-6 sm:top-6">
                <MaximizeIcon className="size-5" />
              </span>
            </button>

            {(specs.length > 0 || product.priceRub) && (
              <div className="mt-8 grid max-w-[760px] gap-6 border-t border-black/10 pt-6 md:grid-cols-[1fr_220px]">
                {specs.length > 0 && (
                  <dl className="grid gap-3 text-sm sm:grid-cols-2">
                    {specs.map(([label, value]) => (
                      <div key={label}>
                        <dt className="text-black/45">{label}</dt>
                        <dd className="mt-1 text-ink">{value}</dd>
                      </div>
                    ))}
                  </dl>
                )}

                {product.priceRub && (
                  <div className="md:text-right">
                    <p className="text-sm text-black/45">Цена</p>
                    <p className="mt-1 text-2xl font-light text-ink">{formatPrice(product.priceRub)} ₽</p>
                  </div>
                )}
              </div>
            )}
          </article>
        </div>
      </Container>

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Просмотр изображения"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            className="absolute right-4 top-4 z-10 flex size-11 items-center justify-center bg-white text-ink transition hover:bg-accent hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            onClick={() => setLightboxOpen(false)}
            aria-label="Закрыть просмотр"
          >
            <CloseIcon className="size-6" />
          </button>
          <img
            src={imageSrc}
            alt={product.title}
            className="max-h-full max-w-full object-contain"
            style={lightboxImageStyle}
            onLoad={(event) => {
              setLightboxImageSize({
                width: event.currentTarget.naturalWidth,
                height: event.currentTarget.naturalHeight,
              });
            }}
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
