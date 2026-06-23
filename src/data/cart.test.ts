import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  addToCart,
  cartChangeEventName,
  cartStorageKey,
  clearCart,
  getCartCount,
  readCart,
  removeFromCart,
  writeCart,
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
});
