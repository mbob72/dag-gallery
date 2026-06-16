import { ProductArtwork, type ArtworkProduct } from './ProductArtwork';
import { ProductBreadcrumbs, type BreadcrumbItem } from './ProductBreadcrumbs';
import type { ArtworkItem } from '../data/artworks';

const author = 'Caspian Art Bureau';

function getBreadcrumbs(artwork: ArtworkItem): BreadcrumbItem[] {
  return [
    { label: 'Главная', href: '/' },
    { label: 'Постеры', href: '#' },
    { label: artwork.category, href: '#' },
    { label: artwork.title, href: `/poster/${artwork.id}` },
  ];
}

function getProduct(artwork: ArtworkItem): ArtworkProduct {
  return {
    article: artwork.source_id,
    title: artwork.title,
    author,
    image: artwork.image,
    category: artwork.category,
    series: artwork.series,
    medium: artwork.medium,
    dimensions: artwork.dimensions,
    year: artwork.year,
    priceRub: artwork.price_rub,
  };
}

export function ProductPage({ artwork }: { artwork: ArtworkItem }) {
  return (
    <>
      <ProductBreadcrumbs items={getBreadcrumbs(artwork)} />
      <ProductArtwork product={getProduct(artwork)} />
    </>
  );
}
