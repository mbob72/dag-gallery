import { ProductArtwork, type ArtworkProduct } from './ProductArtwork';
import { ProductBreadcrumbs, type BreadcrumbItem } from './ProductBreadcrumbs';
import type { ArtworkItem } from '../data/artworks';
import { Footer } from './Sections';

function getBreadcrumbs(artwork: ArtworkItem): BreadcrumbItem[] {
  return [
    { label: 'Главная', href: '/' },
    { label: 'Постеры', href: '#' },
    { label: artwork.category_label, href: '#' },
    { label: artwork.title, href: `/poster/${artwork.id}` },
  ];
}

function getProduct(artwork: ArtworkItem): ArtworkProduct {
  return {
    id: artwork.id,
    article: artwork.source_id,
    title: artwork.title,
    author: artwork.artist,
    status: artwork.status,
    image: artwork.image,
    imageWidth: artwork.width_px,
    imageHeight: artwork.height_px,
    blurDataURL: artwork.blur_data_url,
    category: artwork.category_label,
    series: artwork.series,
    medium: artwork.medium,
    dimensions: artwork.dimensions,
    year: artwork.year,
    priceRub: artwork.price_rub,
  };
}

export function ProductPage({ artwork }: { artwork: ArtworkItem }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <ProductBreadcrumbs items={getBreadcrumbs(artwork)} />
      <div className="min-h-0 flex-1 overflow-y-auto">
        <ProductArtwork product={getProduct(artwork)} />
        <Footer />
      </div>
    </div>
  );
}
