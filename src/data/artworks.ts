import artworksData from '../../public/artworks/manifest.json';
import categoriesData from '../../public/artworks/categories.json';

export type ArtworkCategoryId = string;

export type ArtworkCategory = {
  id: ArtworkCategoryId;
  title: string;
  collection: 'painting' | 'graphics';
};

export type ArtworkItem = {
  id: string;
  source_id: string;
  title: string;
  slug: string;
  category: ArtworkCategoryId[];
  category_labels: string[];
  category_label: string;
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

type ArtworkManifestItem = Omit<ArtworkItem, 'category_labels' | 'category_label'>;

export const categories = categoriesData as ArtworkCategory[];

const categoryById = new Map(categories.map((category) => [category.id, category]));

export const artworks = (artworksData as ArtworkManifestItem[]).map((artwork) => {
  const categoryLabels = artwork.category.map((categoryId) => categoryById.get(categoryId)?.title ?? categoryId);

  return {
    ...artwork,
    category_labels: categoryLabels,
    category_label: categoryLabels.join(', '),
  };
});

export const categoryGalleryItems = categories.flatMap((category) => {
  const artwork = artworks.find((item) => item.category.includes(category.id));

  if (!artwork) {
    return [];
  }

  return {
    title: category.title,
    href: `/category/${category.id}`,
    image: artwork.image,
  };
});

export function getArtworkById(id: string) {
  return artworks.find((artwork) => artwork.id === id);
}

export function getCategoryById(id: string) {
  return categories.find((category) => category.id === id);
}

export function getArtworksByCategoryId(id: string) {
  return artworks.filter((artwork) => artwork.category.includes(id));
}
