import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SupercategoryPage } from '../../../src/components/SupercategoryPage';
import {
  getArtworksBySupercategoryId,
  getSupercategoryById,
  supercategories,
} from '../../../src/data/artworks';
import { getSupercategorySeo, toMetadata } from '../../../src/data/seo';

type PageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return supercategories.map((supercategory) => ({
    id: supercategory.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const supercategory = getSupercategoryById(id);

  if (!supercategory) {
    return {
      title: 'Раздел не найден',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return toMetadata(getSupercategorySeo(supercategory, getArtworksBySupercategoryId(id).length));
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const supercategory = getSupercategoryById(id);

  if (!supercategory) {
    notFound();
  }

  return <SupercategoryPage supercategory={supercategory} artworks={getArtworksBySupercategoryId(id)} />;
}
