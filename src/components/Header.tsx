'use client';

import { useState, type ReactNode } from 'react';
import { catalogNav, SITE_URL } from '../data/content';
import { CartIcon, ChevronDownIcon, CloseIcon, HeartIcon, MenuIcon, ReactLogoIcon, SearchIcon } from './icons';
import { Container } from './Container';

const absolute = (href: string) => href === '#' || href.startsWith('http') ? href : `${SITE_URL}${href}`;

function Badge({ children }: { children: ReactNode }) {
  return <span className="absolute -right-2 -top-2 min-w-5 rounded-full bg-accent px-1 text-center text-[11px] font-bold leading-5 text-white">{children}</span>;
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative z-50 bg-white text-ink">
      <Container className="hidden h-24 items-center justify-between gap-8 lg:flex">
        <a href="/" className="inline-flex shrink-0 items-center gap-3 text-sky-500" aria-label="На главную">
          <ReactLogoIcon className="size-14" />
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
          <a href={absolute('/user')} className="relative flex items-center gap-2 px-2 text-sm font-medium">
            <HeartIcon className="size-6" /> Избранное <Badge>0</Badge>
          </a>
          <a href={absolute('/order')} className="relative flex items-center gap-2 px-2 text-sm font-medium">
            <CartIcon className="size-6" /> Корзина <Badge>0</Badge>
          </a>
        </Container>
      </div>

      <div className="hidden border-b border-black/10 lg:block">
        <Container>
          <nav className="grid grid-cols-6">
            {catalogNav.map((item) => (
              <div key={item.label} className="group relative">
                <a href={absolute(item.href)} className="flex h-16 items-center justify-center border-r border-black/10 px-3 text-center text-sm font-medium leading-tight transition first:border-l hover:bg-paper">
                  {item.label}
                </a>
                {item.children && (
                  <div className="invisible absolute left-0 top-full w-[520px] translate-y-2 border border-black/10 bg-white p-7 opacity-0 shadow-soft transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="mb-4 text-lg font-bold">{item.label}</p>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                      {item.children.map((child) => (
                        <a key={child.label} href={absolute(child.href)} className="text-sm text-black/65 hover:text-accent">
                          {child.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
        </Container>
      </div>

      <div className="flex h-16 items-center justify-between border-b border-black/10 px-4 lg:hidden">
        <button onClick={() => setMenuOpen(true)} aria-label="Открыть меню" className="p-2">
          <MenuIcon className="size-7" />
        </button>
        <a href="/" className="text-sky-500" aria-label="На главную">
          <ReactLogoIcon className="size-10" />
        </a>
        <div className="flex items-center gap-3">
          <button aria-label="Поиск"><SearchIcon className="size-6" /></button>
          <a href={absolute('/order')} className="relative"><CartIcon className="size-6" /><Badge>0</Badge></a>
        </div>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <button className="absolute inset-0 bg-black/45" onClick={() => setMenuOpen(false)} aria-label="Закрыть меню" />
          <aside className="relative h-full w-[88%] max-w-sm overflow-y-auto bg-white p-5 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <strong className="text-lg">Каталог</strong>
              <button onClick={() => setMenuOpen(false)} aria-label="Закрыть"><CloseIcon className="size-7" /></button>
            </div>
            <div className="space-y-1">
              {catalogNav.map((item) => (
                <div key={item.label} className="border-b border-black/10 py-2">
                  <a href={absolute(item.href)} className="block py-2 font-medium">{item.label}</a>
                  {item.children && (
                    <div className="pb-2 pl-3">
                      {item.children.slice(0, 4).map((child) => (
                        <a key={child.label} href={absolute(child.href)} className="block py-1.5 text-sm text-black/60">{child.label}</a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </aside>
        </div>
      )}
    </header>
  );
}
