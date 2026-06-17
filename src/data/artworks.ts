import artworksData from '../../public/artworks/manifest.json';
import categoriesData from '../../public/artworks/categories.json';
import supercategoriesData from '../../public/artworks/supercategories.json';

export type ArtworkCategoryId = string;

export type ArtworkCategory = {
  id: ArtworkCategoryId;
  title: string;
  collection: 'painting' | 'graphics';
};

export type ArtworkSupercategory = {
  id: string;
  title: string;
  description: string;
  category: ArtworkCategoryId[];
};

export type ArtworkItem = {
  id: string;
  source_id: string;
  title: string;
  artist: string;
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

type ArtworkManifestItem = Omit<ArtworkItem, 'artist' | 'category_labels' | 'category_label'>;

export const categories = categoriesData as ArtworkCategory[];
export const supercategories = supercategoriesData as ArtworkSupercategory[];

const categoryById = new Map(categories.map((category) => [category.id, category]));

export const artworks = (artworksData as ArtworkManifestItem[]).map((artwork) => {
  const categoryLabels = artwork.category.map((categoryId) => categoryById.get(categoryId)?.title ?? categoryId);

  return {
    ...artwork,
    artist: 'Наталья Савельева',
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

export const supercategoryHeroItems = supercategories.map((supercategory) => {
  const childCategories = supercategory.category
    .map((categoryId) => categoryById.get(categoryId))
    .filter((category): category is ArtworkCategory => Boolean(category));
  const featuredArtworks = artworks
    .filter((artwork) => artwork.category.some((categoryId) => supercategory.category.includes(categoryId)))
    .slice(0, 3);

  return {
    ...supercategory,
    href: `/supercategory/${supercategory.id}`,
    childCategories: childCategories.map((category) => ({
      id: category.id,
      title: category.title,
      href: `/category/${category.id}`,
    })),
    featuredArtworks,
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

export function getSupercategoryById(id: string) {
  return supercategories.find((supercategory) => supercategory.id === id);
}

export function getArtworksBySupercategoryId(id: string) {
  const supercategory = getSupercategoryById(id);

  if (!supercategory) {
    return [];
  }

  return artworks.filter((artwork) => artwork.category.some((categoryId) => supercategory.category.includes(categoryId)));
}
