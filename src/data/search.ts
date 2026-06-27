import { artworks, type ArtworkItem } from './artworks';

export type SearchableArtworkItem = Pick<
  ArtworkItem,
  | 'id'
  | 'source_id'
  | 'title'
  | 'artist'
  | 'status'
  | 'category_label'
  | 'category_labels'
  | 'collection'
  | 'series'
  | 'medium'
  | 'dimensions'
  | 'year'
  | 'price_rub'
>;

type RankedResult<T extends SearchableArtworkItem> = {
  item: T;
  score: number;
  index: number;
};

const maxQueryLength = 120;

function normalizeText(value: string | number | null | undefined) {
  return String(value ?? '')
    .toLowerCase()
    .replaceAll('ё', 'е')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

function tokenize(query: string) {
  return normalizeText(query)
    .slice(0, maxQueryLength)
    .split(' ')
    .filter((token) => token.length > 1);
}

function searchableText(item: SearchableArtworkItem) {
  return normalizeText([
    item.id,
    item.source_id,
    item.title,
    item.artist,
    item.status,
    item.status === 'sold' ? 'продано' : '',
    item.status === 'reserved' ? 'бронь' : '',
    item.category_label,
    ...item.category_labels,
    item.collection === 'graphics' ? 'графика graphics' : 'живопись painting',
    item.series,
    item.medium,
    item.dimensions,
    item.year,
    item.price_rub,
  ].join(' '));
}

function scoreArtwork(item: SearchableArtworkItem, normalizedQuery: string, tokens: string[]) {
  const title = normalizeText(item.title);
  const sourceId = normalizeText(item.source_id);
  const categories = normalizeText(item.category_label);
  const text = searchableText(item);

  if (tokens.length === 0) {
    return 0;
  }

  if (!tokens.every((token) => text.includes(token))) {
    return 0;
  }

  let score = 10;

  if (title === normalizedQuery || sourceId === normalizedQuery) {
    score += 120;
  } else if (title.startsWith(normalizedQuery) || sourceId.startsWith(normalizedQuery)) {
    score += 80;
  } else if (title.includes(normalizedQuery) || sourceId.includes(normalizedQuery)) {
    score += 55;
  }

  if (categories.includes(normalizedQuery)) {
    score += 20;
  }

  score += tokens.reduce((sum, token) => {
    if (title.includes(token)) {
      return sum + 12;
    }

    if (sourceId.includes(token)) {
      return sum + 10;
    }

    if (categories.includes(token)) {
      return sum + 5;
    }

    return sum + 1;
  }, 0);

  return score;
}

export function normalizeSearchQuery(query: string | string[] | undefined) {
  const value = Array.isArray(query) ? query[0] : query;

  return String(value ?? '').trim().slice(0, maxQueryLength);
}

export function searchArtworkItems<T extends SearchableArtworkItem>(query: string, items: readonly T[]): T[] {
  const normalizedQuery = normalizeText(query).slice(0, maxQueryLength);
  const tokens = tokenize(query);

  return items
    .map((item, index): RankedResult<T> => ({
      item,
      index,
      score: scoreArtwork(item, normalizedQuery, tokens),
    }))
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .map((result) => result.item);
}

export function searchArtworks(query: string) {
  return searchArtworkItems(query, artworks);
}
