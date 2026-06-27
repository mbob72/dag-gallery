import { describe, expect, it } from 'vitest';
import { normalizeSearchQuery, searchArtworkItems, type SearchableArtworkItem } from './search';

const baseArtwork: SearchableArtworkItem = {
  id: 'base',
  source_id: 'BASE-1',
  title: 'Базовая работа',
  artist: 'Наталья Савельева',
  status: 'available',
  category_label: 'Пейзажи',
  category_labels: ['Пейзажи'],
  collection: 'painting',
  series: '',
  medium: 'холст, масло',
  dimensions: '60x80 см',
  year: 2024,
  price_rub: 100000,
};

function artwork(overrides: Partial<SearchableArtworkItem>): SearchableArtworkItem {
  return {
    ...baseArtwork,
    ...overrides,
  };
}

describe('searchArtworkItems', () => {
  it('returns nothing for empty and one-letter queries', () => {
    const items = [baseArtwork];

    expect(searchArtworkItems('', items)).toEqual([]);
    expect(searchArtworkItems('п', items)).toEqual([]);
  });

  it('finds artworks by title, source id, and normalized text', () => {
    const items = [
      artwork({ id: 'belaya-skazka', source_id: 'P-01', title: 'Белая сказка' }),
      artwork({ id: 'serebryanoe-i-zolotoe', source_id: 'P-14', title: 'Серебряное и золотое' }),
    ];

    expect(searchArtworkItems('белая', items).map((item) => item.id)).toEqual(['belaya-skazka']);
    expect(searchArtworkItems('p 14', items).map((item) => item.id)).toEqual(['serebryanoe-i-zolotoe']);
    expect(searchArtworkItems('серебрянОе', items).map((item) => item.id)).toEqual(['serebryanoe-i-zolotoe']);
  });

  it('finds artworks by category, medium, year, and dimensions', () => {
    const items = [
      artwork({ id: 'landscape', title: 'Горы', category_label: 'Пейзажи', category_labels: ['Пейзажи'] }),
      artwork({
        id: 'graphics',
        title: 'Лист',
        category_label: 'Графика',
        category_labels: ['Графика'],
        collection: 'graphics',
        medium: 'бумага, сангина',
        dimensions: '42x30 см',
        year: 2021,
      }),
    ];

    expect(searchArtworkItems('графика сангина 2021', items).map((item) => item.id)).toEqual(['graphics']);
    expect(searchArtworkItems('42 30', items).map((item) => item.id)).toEqual(['graphics']);
  });

  it('ranks exact and prefix title matches before broad matches', () => {
    const items = [
      artwork({ id: 'broad', source_id: 'A-1', title: 'Горная вода', category_label: 'Белая серия', category_labels: ['Белая серия'] }),
      artwork({ id: 'prefix', source_id: 'A-2', title: 'Белая сказка' }),
      artwork({ id: 'exact', source_id: 'A-3', title: 'Белая' }),
    ];

    expect(searchArtworkItems('белая', items).map((item) => item.id)).toEqual(['exact', 'prefix', 'broad']);
  });
});

describe('normalizeSearchQuery', () => {
  it('trims arrays and limits query length', () => {
    expect(normalizeSearchQuery(['  Белая  ', 'ignored'])).toBe('Белая');
    expect(normalizeSearchQuery('x'.repeat(140))).toHaveLength(120);
  });
});
