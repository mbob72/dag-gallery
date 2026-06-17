import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SupercategoryPage } from '../../../src/components/SupercategoryPage';
import {
  getArtworksBySupercategoryId,
  getSupercategoryById,
  supercategories,
} from '../../../src/data/artworks';

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
    };
  }

  return {
    title: `${supercategory.title} | Caspian Art Bureau`,
    description: supercategory.description,
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const supercategory = getSupercategoryById(id);

  if (!supercategory) {
    notFound();
  }

  return <SupercategoryPage supercategory={supercategory} artworks={getArtworksBySupercategoryId(id)} />;
}
