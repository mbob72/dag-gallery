'use client';

import { useEffect, useMemo, useState } from 'react';
import { ProductBreadcrumbs, type BreadcrumbItem } from './ProductBreadcrumbs';
import { Footer } from './Sections';
import { UserArtworkList, type UserArtworkItem } from './UserArtworkList';
import { artworks, canOrderArtwork } from '../data/artworks';
import {
  addToCart,
  addToFavorites,
  cartChangeEventName,
  favoriteChangeEventName,
  readCart,
  readFavorites,
  removeFromCart,
  removeFromFavorites,
  writeCart,
  writeFavorites,
  type CartEntry,
} from '../data/cart';

const breadcrumbs: BreadcrumbItem[] = [
  { label: 'Главная', href: '/' },
  { label: 'Личный кабинет', href: '/user' },
];

const artworkById = new Map(artworks.map((artwork) => [artwork.id, artwork]));

function dimensionsText(widthPx: number, heightPx: number, dimensions?: string) {
  return dimensions || `${widthPx}x${heightPx} px`;
}

function toUserArtworkItems(entries: CartEntry[]): UserArtworkItem[] {
  return entries.flatMap((entry) => {
    const artwork = artworkById.get(entry.id);

    if (!artwork) {
      return [];
    }

    return {
      id: artwork.id,
      image: artwork.image,
      title: artwork.title,
      href: `/poster/${artwork.id}`,
      attributes: [
        `Артикул: ${artwork.source_id}`,
        `Автор: ${artwork.artist}`,
        dimensionsText(artwork.width_px, artwork.height_px, artwork.dimensions),
        artwork.medium && `Материал: ${artwork.medium}`,
        artwork.category_label && `Категория: ${artwork.category_label}`,
      ].filter(Boolean) as string[],
      priceRub: artwork.price_rub,
      status: artwork.status,
      canOrder: canOrderArtwork(artwork),
    };
  });
}

export function UserCollectionPage() {
  const [cartEntries, setCartEntries] = useState<CartEntry[]>([]);
  const [favoriteEntries, setFavoriteEntries] = useState<CartEntry[]>([]);

  useEffect(() => {
    const syncCollections = () => {
      setCartEntries(readCart());
      setFavoriteEntries(readFavorites());
    };

    syncCollections();
    window.addEventListener(cartChangeEventName, syncCollections);
    window.addEventListener(favoriteChangeEventName, syncCollections);
    window.addEventListener('storage', syncCollections);

    return () => {
      window.removeEventListener(cartChangeEventName, syncCollections);
      window.removeEventListener(favoriteChangeEventName, syncCollections);
      window.removeEventListener('storage', syncCollections);
    };
  }, []);

  const validCartEntries = useMemo(
    () => cartEntries.filter((entry) => {
      const artwork = artworkById.get(entry.id);
      return artwork ? canOrderArtwork(artwork) : false;
    }),
    [cartEntries],
  );
  const validFavoriteEntries = useMemo(() => favoriteEntries.filter((entry) => artworkById.has(entry.id)), [favoriteEntries]);
  const cartItems = useMemo(() => toUserArtworkItems(validCartEntries), [validCartEntries]);
  const favoriteItems = useMemo(() => toUserArtworkItems(validFavoriteEntries), [validFavoriteEntries]);
  const hasAvailableFavorites = favoriteItems.some((item) => item.canOrder);

  useEffect(() => {
    if (cartEntries.length !== validCartEntries.length) {
      writeCart(validCartEntries);
    }
  }, [cartEntries, validCartEntries]);

  useEffect(() => {
    if (favoriteEntries.length !== validFavoriteEntries.length) {
      writeFavorites(validFavoriteEntries);
    }
  }, [favoriteEntries, validFavoriteEntries]);

  const addAllFavoritesToCart = () => {
    writeCart([...readCart(), ...validFavoriteEntries.filter((entry) => {
      const artwork = artworkById.get(entry.id);
      return artwork ? canOrderArtwork(artwork) : false;
    })]);
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <ProductBreadcrumbs items={breadcrumbs} />
      <div className="min-h-0 flex-1 overflow-y-auto">
        <UserArtworkList
          title="У вас в корзине"
          items={cartItems}
          emptyMessage="В корзине пока нет работ."
          itemActions={[
            { label: 'Добавить в избранное', onClick: addToFavorites },
            { label: 'Удалить', onClick: removeFromCart },
          ]}
        />
        <UserArtworkList
          title="У вас в избранном"
          items={favoriteItems}
          emptyMessage="В избранном пока нет работ."
          actionLabel="Добавить все в корзину"
          onAction={addAllFavoritesToCart}
          actionDisabled={!hasAvailableFavorites}
          itemActions={[
            { label: 'Добавить в корзину', onClick: addToCart, isVisible: (item) => item.canOrder },
            { label: 'Удалить', onClick: removeFromFavorites },
          ]}
        />
        <Footer />
      </div>
    </div>
  );
}
