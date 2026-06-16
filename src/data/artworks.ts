import artworksData from '../../public/artworks/manifest.json';

export type ArtworkCategory = 'Живопись' | 'Графика' | 'Объекты' | string;

export type ArtworkItem = {
  id: string;
  source_id: string;
  title: string;
  slug: string;
  category: ArtworkCategory;
  collection: 'painting' | 'graphics';
  series: string;
  medium: string;
  dimensions: string;
  year: number | null;
  price_rub: number | null;
  image: string;
  original_file: string;
  pdf_page: number | null;
  printed_page: number | null;
  width_px: number;
  height_px: number;
  format: string;
};

export const artworks = artworksData as ArtworkItem[];

export function getArtworkById(id: string) {
  return artworks.find((artwork) => artwork.id === id);
}
