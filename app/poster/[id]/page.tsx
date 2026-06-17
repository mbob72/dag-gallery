import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProductPage } from '../../../src/components/ProductPage';
import { artworks, getArtworkById } from '../../../src/data/artworks';

type PageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return artworks.map((artwork) => ({
    id: artwork.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const artwork = getArtworkById(id);

  if (!artwork) {
    return {
      title: 'Постер не найден',
    };
  }

  return {
    title: artwork.title,
    description: [artwork.title, artwork.category_label, artwork.medium, artwork.dimensions]
      .filter(Boolean)
      .join(' · '),
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const artwork = getArtworkById(id);

  if (!artwork) {
    notFound();
  }

  return <ProductPage artwork={artwork} />;
}
