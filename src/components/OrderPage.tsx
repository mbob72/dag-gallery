'use client';

import { useEffect, useMemo, useState } from 'react';
import { ProductBreadcrumbs, type BreadcrumbItem } from './ProductBreadcrumbs';
import { OrderCartItems, type OrderCartItem } from './OrderCartItems';
import { OrderSummary } from './OrderSummary';
import { Container } from './Container';
import { Footer } from './Sections';
import { artworks } from '../data/artworks';
import { cartChangeEventName, clearCart, readCart, removeFromCart, writeCart, type CartEntry } from '../data/cart';

const breadcrumbs: BreadcrumbItem[] = [
  { label: 'Главная', href: '/' },
  { label: 'Корзина', href: '/order' },
];

const formatPrice = (value: number) => new Intl.NumberFormat('ru-RU').format(value);
const artworkById = new Map(artworks.map((artwork) => [artwork.id, artwork]));

function dimensionsText(widthPx: number, heightPx: number, dimensions?: string) {
  return dimensions || `${widthPx}x${heightPx} px`;
}

export function OrderPage() {
  const [cartEntries, setCartEntries] = useState<CartEntry[]>([]);

  useEffect(() => {
    const syncCart = () => setCartEntries(readCart());

    syncCart();
    window.addEventListener(cartChangeEventName, syncCart);
    window.addEventListener('storage', syncCart);

    return () => {
      window.removeEventListener(cartChangeEventName, syncCart);
      window.removeEventListener('storage', syncCart);
    };
  }, []);

  const validEntries = useMemo(() => cartEntries.filter((entry) => artworkById.has(entry.id)), [cartEntries]);
  const cartItems: OrderCartItem[] = useMemo(() => validEntries.map((entry) => {
    const artwork = artworkById.get(entry.id)!;

    const unitPrice = artwork.price_rub;
    const attributes = [
      `Артикул: ${artwork.source_id}`,
      dimensionsText(artwork.width_px, artwork.height_px, artwork.dimensions),
      artwork.medium && `Материал: ${artwork.medium}`,
      artwork.category_label && `Категория: ${artwork.category_label}`,
    ].filter(Boolean) as string[];

    return {
      id: artwork.id,
      title: artwork.title,
      image: artwork.image,
      href: `/poster/${artwork.id}`,
      attributes,
      price: unitPrice ? formatPrice(unitPrice) : 'по запросу',
    };
  }), [validEntries]);
  const totalRub = validEntries.reduce((sum, entry) => {
    const artwork = artworkById.get(entry.id);
    return sum + (artwork?.price_rub ?? 0);
  }, 0);
  const itemCount = validEntries.length;

  useEffect(() => {
    if (cartEntries.length !== validEntries.length) {
      writeCart(validEntries);
    }
  }, [cartEntries, validEntries]);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <ProductBreadcrumbs items={breadcrumbs} />
      <div className="min-h-0 flex-1 overflow-y-auto">
        <section className="bg-white py-8 sm:py-12">
          <Container>
            <h1 className="mb-7 text-3xl font-light leading-tight text-ink sm:text-5xl">Корзина</h1>
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
              <OrderCartItems
                items={cartItems}
                onRemove={removeFromCart}
              />
              <OrderSummary itemCount={itemCount} totalRub={totalRub} onRequestSent={clearCart} />
            </div>
          </Container>
        </section>
        <Footer />
      </div>
    </div>
  );
}
