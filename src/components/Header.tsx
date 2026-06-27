'use client';

import { useEffect, useState, type ReactNode } from 'react';
import categoriesData from '../../public/artworks/categories.json';
import { SITE_SUBTITLE, SITE_TITLE } from '../data/brand';
import {
  cartChangeEventName,
  favoriteChangeEventName,
  getCartCount,
  getFavoriteCount,
  readCart,
  readFavorites,
} from '../data/cart';
import { CartIcon, CloseIcon, HeartIcon, MenuIcon, SearchIcon, TelegramIcon } from './icons';
import { Container } from './Container';
import { SmartImage } from './SmartImage';

const categories = categoriesData as { id: string; title: string }[];
const telegramChannelUrl = 'https://t.me/kavkazartburau';

function Badge({ children }: { children: ReactNode }) {
  return <span className="absolute -right-2 -top-2 min-w-5 rounded-full bg-accent px-1 text-center text-[11px] font-bold leading-5 text-white">{children}</span>;
}

function BrandLockup({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex min-w-0 items-center gap-2 sm:gap-3">
      <SmartImage
        src="/brand/logo-kavkaz-art-bureau.png"
        alt=""
        width={80}
        height={80}
        priority
        className={compact ? 'size-11 shrink-0 object-contain sm:size-12' : 'size-20 shrink-0 object-contain'}
      />
      <span className="min-w-0 leading-none">
        <span className={compact ? 'block truncate text-sm font-semibold tracking-wide sm:text-base' : 'block text-2xl font-semibold tracking-wide'}>
          {SITE_TITLE}
        </span>
        <span className={compact ? 'mt-1 block truncate text-[10px] font-medium leading-tight text-black/55 sm:text-xs' : 'mt-2 block text-sm font-medium text-black/55'}>
          {SITE_SUBTITLE}
        </span>
      </span>
    </span>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [favoriteCount, setFavoriteCount] = useState(0);

  useEffect(() => {
    const syncCounts = () => {
      setCartCount(getCartCount(readCart()));
      setFavoriteCount(getFavoriteCount(readFavorites()));
    };

    syncCounts();
    window.addEventListener(cartChangeEventName, syncCounts);
    window.addEventListener(favoriteChangeEventName, syncCounts);
    window.addEventListener('storage', syncCounts);

    return () => {
      window.removeEventListener(cartChangeEventName, syncCounts);
      window.removeEventListener(favoriteChangeEventName, syncCounts);
      window.removeEventListener('storage', syncCounts);
    };
  }, []);

  return (
    <header className="relative z-50 shrink-0 bg-white text-ink">
      <Container className="hidden h-24 items-center justify-between gap-8 lg:flex">
        <a href="/" className="inline-flex shrink-0 items-center" aria-label={`${SITE_TITLE} — на главную`}>
          <BrandLockup />
        </a>
        <a
          href={telegramChannelUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Telegram канал"
          className="ml-auto inline-flex size-11 items-center justify-center rounded-full text-ink transition hover:bg-black/5 hover:text-[#229ED9]"
        >
          <TelegramIcon className="size-7" />
        </a>
      </Container>

      <div className="border-y border-black/10 bg-[#f6f6f4]">
        <Container className="hidden h-16 items-center gap-5 lg:flex">
          <form action="/search" method="get" className="flex h-11 flex-1 overflow-hidden rounded-sm border border-black/15 bg-white">
            <input
              type="search"
              name="q"
              placeholder="Поиск по названию, автору или артикулу"
              className="min-w-0 flex-1 px-4 text-sm outline-none placeholder:text-black/35"
            />
            <button type="submit" className="flex items-center gap-2 bg-ink px-6 text-sm font-medium text-white transition hover:bg-black">
              <SearchIcon className="size-5" />
              Поиск
            </button>
          </form>
          <a href="/user" className="relative flex items-center gap-2 px-2 text-sm font-medium">
            <HeartIcon className="size-6" /> Избранное <Badge>{favoriteCount}</Badge>
          </a>
          <a href="/order" className="relative flex items-center gap-2 px-2 text-sm font-medium">
            <CartIcon className="size-6" /> Корзина <Badge>{cartCount}</Badge>
          </a>
        </Container>
      </div>

      <div className="flex h-16 items-center gap-2 border-b border-black/10 px-3 lg:hidden">
        <button onClick={() => setMenuOpen(true)} aria-label="Открыть меню" className="shrink-0 p-2">
          <MenuIcon className="size-7" />
        </button>
        <a href="/" aria-label={`${SITE_TITLE} — на главную`} className="min-w-0 flex-1">
          <BrandLockup compact />
        </a>
        <div className="flex shrink-0 items-center gap-3">
          <a href="/user" className="relative"><HeartIcon className="size-6" /><Badge>{favoriteCount}</Badge></a>
          <a href="/order" className="relative"><CartIcon className="size-6" /><Badge>{cartCount}</Badge></a>
        </div>
      </div>

      <div className="border-b border-black/10 bg-[#f6f6f4] px-3 py-3 lg:hidden">
        <form action="/search" method="get" className="flex h-11 overflow-hidden border border-black/15 bg-white">
          <input
            type="search"
            name="q"
            placeholder="Поиск"
            className="min-w-0 flex-1 px-3 text-sm outline-none placeholder:text-black/35"
          />
          <button type="submit" className="grid w-12 shrink-0 place-items-center bg-ink text-white" aria-label="Искать">
            <SearchIcon className="size-5" />
          </button>
        </form>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <button className="absolute inset-0 bg-black/45" onClick={() => setMenuOpen(false)} aria-label="Закрыть меню" />
          <aside className="absolute left-0 top-0 h-full w-[88%] max-w-sm overflow-y-auto bg-white p-5 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <strong className="text-lg">Категории</strong>
              <button onClick={() => setMenuOpen(false)} aria-label="Закрыть"><CloseIcon className="size-7" /></button>
            </div>
            <nav className="space-y-1">
              {categories.map((category) => (
                <a
                  key={category.id}
                  href={`/category/${category.id}`}
                  className="block border-b border-black/10 py-3 text-base font-medium text-ink transition hover:text-accent"
                  onClick={() => setMenuOpen(false)}
                >
                  {category.title}
                </a>
              ))}
            </nav>
          </aside>
        </div>
      )}
    </header>
  );
}
