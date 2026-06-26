import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  addToCart,
  cartChangeEventName,
  cartStorageKey,
  clearCart,
  clearFavorites,
  favoriteChangeEventName,
  favoriteStorageKey,
  getCartCount,
  getFavoriteCount,
  readCart,
  readFavorites,
  removeFromCart,
  removeFromFavorites,
  toggleCart,
  toggleFavorite,
  writeCart,
  writeFavorites,
} from './cart';

describe('cart storage', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('normalizes stored cart entries', () => {
    window.localStorage.setItem(cartStorageKey, JSON.stringify([
      { id: 'belaya-skazka', quantity: 3 },
      { id: 'belaya-skazka', quantity: 1 },
      { id: '', quantity: 1 },
      { id: 'sny' },
      null,
    ]));

    expect(readCart()).toEqual([
      { id: 'belaya-skazka', quantity: 1 },
      { id: 'sny', quantity: 1 },
    ]);
  });

  it('writes normalized entries and dispatches cart change events', () => {
    const listener = vi.fn();
    window.addEventListener(cartChangeEventName, listener);

    writeCart([
      { id: 'belaya-skazka', quantity: 4 },
      { id: 'belaya-skazka', quantity: 1 },
    ]);

    expect(readCart()).toEqual([{ id: 'belaya-skazka', quantity: 1 }]);
    expect(listener).toHaveBeenCalledTimes(1);

    window.removeEventListener(cartChangeEventName, listener);
  });

  it('adds, removes, counts, and clears items', () => {
    addToCart('belaya-skazka');
    addToCart('belaya-skazka');
    addToCart('sny');

    expect(getCartCount()).toBe(2);

    removeFromCart('belaya-skazka');
    expect(readCart()).toEqual([{ id: 'sny', quantity: 1 }]);

    clearCart();
    expect(readCart()).toEqual([]);
  });

  it('toggles cart items', () => {
    expect(toggleCart('belaya-skazka')).toBe(true);
    expect(readCart()).toEqual([{ id: 'belaya-skazka', quantity: 1 }]);

    expect(toggleCart('belaya-skazka')).toBe(false);
    expect(readCart()).toEqual([]);
  });

  it('stores favorite items independently from cart items', () => {
    const listener = vi.fn();
    window.addEventListener(favoriteChangeEventName, listener);
    window.localStorage.setItem(favoriteStorageKey, JSON.stringify([
      { id: 'belaya-skazka', quantity: 3 },
      { id: 'belaya-skazka', quantity: 1 },
      { id: 'sny' },
    ]));

    expect(readFavorites()).toEqual([
      { id: 'belaya-skazka', quantity: 1 },
      { id: 'sny', quantity: 1 },
    ]);

    writeFavorites([{ id: 'more', quantity: 4 }]);
    expect(readFavorites()).toEqual([{ id: 'more', quantity: 1 }]);
    expect(listener).toHaveBeenCalledTimes(1);

    addToCart('belaya-skazka');
    expect(getCartCount()).toBe(1);
    expect(getFavoriteCount()).toBe(1);

    removeFromFavorites('more');
    expect(readFavorites()).toEqual([]);

    clearFavorites();
    expect(readFavorites()).toEqual([]);

    window.removeEventListener(favoriteChangeEventName, listener);
  });

  it('toggles favorite items', () => {
    expect(toggleFavorite('belaya-skazka')).toBe(true);
    expect(readFavorites()).toEqual([{ id: 'belaya-skazka', quantity: 1 }]);

    expect(toggleFavorite('belaya-skazka')).toBe(false);
    expect(readFavorites()).toEqual([]);
  });
});
