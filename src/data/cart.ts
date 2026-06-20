export type CartEntry = {
  id: string;
  quantity: number;
};

export const cartStorageKey = 'cab-cart-items';
export const cartChangeEventName = 'cab-cart-change';

function isBrowser() {
  return typeof window !== 'undefined';
}

function normalizeEntries(value: unknown): CartEntry[] {
  if (!Array.isArray(value)) {
    return [];
  }

  const seenIds = new Set<string>();

  return value.flatMap((entry) => {
    if (!entry || typeof entry !== 'object') {
      return [];
    }

    const id = 'id' in entry ? entry.id : undefined;

    if (typeof id !== 'string' || !id || seenIds.has(id)) {
      return [];
    }

    seenIds.add(id);

    return {
      id,
      quantity: 1,
    };
  });
}

export function readCart(): CartEntry[] {
  if (!isBrowser()) {
    return [];
  }

  try {
    return normalizeEntries(JSON.parse(window.localStorage.getItem(cartStorageKey) ?? '[]'));
  } catch {
    return [];
  }
}

export function writeCart(entries: CartEntry[]) {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(cartStorageKey, JSON.stringify(normalizeEntries(entries)));
  window.dispatchEvent(new Event(cartChangeEventName));
}

export function addToCart(id: string) {
  const entries = readCart();
  const existingEntry = entries.find((entry) => entry.id === id);

  if (!existingEntry) {
    entries.push({ id, quantity: 1 });
  }

  writeCart(entries);
}

export function removeFromCart(id: string) {
  writeCart(readCart().filter((entry) => entry.id !== id));
}

export function getCartCount(entries = readCart()) {
  return entries.length;
}

export function clearCart() {
  writeCart([]);
}
