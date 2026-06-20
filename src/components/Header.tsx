'use client';

import { useEffect, useState, type ReactNode } from 'react';
import categoriesData from '../../public/artworks/categories.json';
import { cartChangeEventName, getCartCount, readCart } from '../data/cart';
import { CartIcon, CloseIcon, HeartIcon, MenuIcon, SearchIcon } from './icons';
import { Container } from './Container';

const categories = categoriesData as { id: string; title: string }[];

function Badge({ children }: { children: ReactNode }) {
  return <span className="absolute -right-2 -top-2 min-w-5 rounded-full bg-accent px-1 text-center text-[11px] font-bold leading-5 text-white">{children}</span>;
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const syncCartCount = () => setCartCount(getCartCount(readCart()));

    syncCartCount();
    window.addEventListener(cartChangeEventName, syncCartCount);
    window.addEventListener('storage', syncCartCount);

    return () => {
      window.removeEventListener(cartChangeEventName, syncCartCount);
      window.removeEventListener('storage', syncCartCount);
    };
  }, []);

  return (
    <header className="relative z-50 shrink-0 bg-white text-ink">
      <Container className="hidden h-24 items-center justify-between gap-8 lg:flex">
        <a href="/" className="inline-flex shrink-0 items-center gap-3" aria-label="На главную">
          <img src="/brand/logo-cab-monogram.svg" alt="" className="size-28" />
          <span className="sr-only">Caspian Art Bureau</span>
        </a>
        <a href="tel:+78000000000" className="ml-auto block text-lg font-bold tracking-wide">8 800 000 00 00</a>
      </Container>

      <div className="border-y border-black/10 bg-[#f6f6f4]">
        <Container className="hidden h-16 items-center gap-5 lg:flex">
          <form className="flex h-11 flex-1 overflow-hidden rounded-sm border border-black/15 bg-white" onSubmit={(event) => event.preventDefault()}>
            <input
              type="search"
              placeholder="Поиск по названию, автору или артикулу"
              className="min-w-0 flex-1 px-4 text-sm outline-none placeholder:text-black/35"
            />
            <button className="flex items-center gap-2 bg-ink px-6 text-sm font-medium text-white transition hover:bg-black">
              <SearchIcon className="size-5" />
              Поиск
            </button>
          </form>
          <a href="/user" className="relative flex items-center gap-2 px-2 text-sm font-medium">
            <HeartIcon className="size-6" /> Избранное <Badge>0</Badge>
          </a>
          <a href="/order" className="relative flex items-center gap-2 px-2 text-sm font-medium">
            <CartIcon className="size-6" /> Корзина <Badge>{cartCount}</Badge>
          </a>
        </Container>
      </div>

      <div className="flex h-16 items-center justify-between border-b border-black/10 px-4 lg:hidden">
        <button onClick={() => setMenuOpen(true)} aria-label="Открыть меню" className="p-2">
          <MenuIcon className="size-7" />
        </button>
        <a href="/" aria-label="На главную">
          <img src="/brand/logo-cab-monogram.svg" alt="" className="size-20" />
        </a>
        <div className="flex items-center gap-3">
          <button aria-label="Поиск"><SearchIcon className="size-6" /></button>
          <a href="/order" className="relative"><CartIcon className="size-6" /><Badge>{cartCount}</Badge></a>
        </div>
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
