import type { MetadataRoute } from 'next';
import { artworks, categories, supercategories } from '../src/data/artworks';
import { SITE_URL } from '../src/data/content';

function url(path: string) {
  return new URL(path, SITE_URL).toString();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: url('/'),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...supercategories.map((supercategory) => ({
      url: url(`/supercategory/${supercategory.id}`),
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    ...categories.map((category) => ({
      url: url(`/category/${category.id}`),
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.75,
    })),
    ...artworks.map((artwork) => ({
      url: url(`/poster/${artwork.id}`),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.65,
      images: [url(artwork.image)],
    })),
  ];
}
