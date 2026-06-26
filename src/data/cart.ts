export type CartEntry = {
  id: string;
  quantity: number;
};

export const cartStorageKey = 'cab-cart-items';
export const cartChangeEventName = 'cab-cart-change';
export const favoriteStorageKey = 'cab-favorite-items';
export const favoriteChangeEventName = 'cab-favorite-change';

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

function readEntries(storageKey: string): CartEntry[] {
  if (!isBrowser()) {
    return [];
  }

  try {
    return normalizeEntries(JSON.parse(window.localStorage.getItem(storageKey) ?? '[]'));
  } catch {
    return [];
  }
}

function writeEntries(storageKey: string, changeEventName: string, entries: CartEntry[]) {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(storageKey, JSON.stringify(normalizeEntries(entries)));
  window.dispatchEvent(new Event(changeEventName));
}

function addEntry(entries: CartEntry[], id: string) {
  const existingEntry = entries.find((entry) => entry.id === id);

  if (!existingEntry) {
    entries.push({ id, quantity: 1 });
  }

  return entries;
}

export function readCart(): CartEntry[] {
  return readEntries(cartStorageKey);
}

export function writeCart(entries: CartEntry[]) {
  writeEntries(cartStorageKey, cartChangeEventName, entries);
}

export function addToCart(id: string) {
  writeCart(addEntry(readCart(), id));
}

export function removeFromCart(id: string) {
  writeCart(readCart().filter((entry) => entry.id !== id));
}

export function toggleCart(id: string) {
  const entries = readCart();

  if (entries.some((entry) => entry.id === id)) {
    removeFromCart(id);
    return false;
  }

  addToCart(id);
  return true;
}

export function getCartCount(entries = readCart()) {
  return entries.length;
}

export function clearCart() {
  writeCart([]);
}

export function readFavorites(): CartEntry[] {
  return readEntries(favoriteStorageKey);
}

export function writeFavorites(entries: CartEntry[]) {
  writeEntries(favoriteStorageKey, favoriteChangeEventName, entries);
}

export function addToFavorites(id: string) {
  writeFavorites(addEntry(readFavorites(), id));
}

export function removeFromFavorites(id: string) {
  writeFavorites(readFavorites().filter((entry) => entry.id !== id));
}

export function toggleFavorite(id: string) {
  const entries = readFavorites();

  if (entries.some((entry) => entry.id === id)) {
    removeFromFavorites(id);
    return false;
  }

  addToFavorites(id);
  return true;
}

export function getFavoriteCount(entries = readFavorites()) {
  return entries.length;
}

export function clearFavorites() {
  writeFavorites([]);
}
